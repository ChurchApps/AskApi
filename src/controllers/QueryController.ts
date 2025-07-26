import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController";
import { OpenAiHelper, ArrayHelper } from "../helpers";
import { Question } from "../models";

@controller("/query")
export class QueryController extends AskBaseController {
  @httpPost("/questions")
  public async queryQuestions(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { text, subDomain, siteUrl } = req.body;

      if (text && text !== "") {
        OpenAiHelper.initialize();
        // Process the natural language query
        const apiRequestPrompt = await OpenAiHelper.buildPrompt(text);
        const aiResponse = await OpenAiHelper.getCompletion(apiRequestPrompt, subDomain, siteUrl);

        if (aiResponse && aiResponse.length > 0) {
          let questionsData: any[] = (await this.repositories.question.loadAll(au.churchId)) as any[];

          aiResponse.forEach((resp: { field: string; value: string; operator: string }) => {
            switch (resp.field) {
              case "dateAnswered":
                // Convert date strings to Date objects for comparison
                questionsData.forEach((q) => {
                  if (q.dateAnswered) {
                    q.dateAnsweredForComparison = new Date(q.dateAnswered);
                  }
                });
                questionsData = ArrayHelper.getAllOperator(
                  questionsData,
                  "dateAnsweredForComparison",
                  new Date(resp.value),
                  resp.operator,
                  "date"
                );
                break;
              case "inputTokens":
              case "cachedInputTokens":
              case "outputTokens":
              case "seconds":
                // Handle numeric fields
                questionsData = ArrayHelper.getAllOperator(
                  questionsData,
                  resp.field,
                  resp.value,
                  resp.operator,
                  "number"
                );
                break;
              default:
                // Handle string fields (question, answer, userId, etc.)
                questionsData = ArrayHelper.getAllOperator(questionsData, resp.field, resp.value, resp.operator);
                break;
            }
          });

          // Clean up temporary fields used for comparison
          questionsData.forEach((q) => {
            delete q.dateAnsweredForComparison;
          });

          return questionsData;
        }
      }
    });
  }

  @httpPost("/ask")
  public async askQuestion(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question, tokens } = req.body;

      if (!question || question.trim() === "") {
        return res.status(400).json({ error: "Question is required" });
      }

      try {
        // Initialize OpenAI
        await OpenAiHelper.initialize();

        // Get subdomain and site URL from request
        const subDomain = req.headers["x-subdomain"] as string || "";
        const siteUrl = req.headers["referer"] as string || "";

        // Call OpenAI to process the question
        const result = await OpenAiHelper.askQuestion(question, tokens || {}, subDomain, siteUrl);

        // Calculate duration in seconds
        const seconds = (result.endTime - result.startTime) / 1000;

        // Create question record for logging
        const questionRecord: Question = {
          churchId: au.churchId,
          userId: au.personId,
          question: question,
          answer: result.answer,
          dateAnswered: new Date(),
          inputTokens: result.inputTokens,
          cachedInputTokens: result.cachedInputTokens,
          outputTokens: result.outputTokens,
          seconds: seconds
        };

        // Save to database
        await this.repositories.question.save(questionRecord);

        // Return the answer
        return {
          answer: result.answer,
          questionId: questionRecord.id,
          tokensUsed: {
            input: result.inputTokens,
            cachedInput: result.cachedInputTokens,
            output: result.outputTokens
          },
          processingTime: seconds
        };
      } catch (error) {
        console.error("Error processing question:", error);
        return res.status(500).json({ 
          error: "Failed to process question", 
          details: error.message 
        });
      }
    });
  }
}
