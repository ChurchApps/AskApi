import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController";
import { OpenAiHelper } from "../helpers";
import { WorkflowHelper } from "../helpers/WorkflowHelper";

@controller("/queryV2")
export class QueryV2Controller extends AskBaseController {

  @httpPost("/getRoutes")
  public async getRoutes(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question, jwts } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.determineRoutes(question);
    });
  }
  /*
  
    @httpPost("/ask")
    public async askQuestion(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
      return this.actionWrapper(req, res, async (au) => {
        const { question, tokens } = req.body;
  
        try {
          // Initialize OpenAI
          await OpenAiHelper.initialize();
  
          // Get subdomain and site URL from request
          //const subDomain = req.headers["x-subdomain"] as string || "";
          //const siteUrl = req.headers["referer"] as string || "";
  
          // Call OpenAI to process the question
          const result = await OpenAiHelper.askQuestion(question, tokens || {});
  
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
  
          const response = {
            answer: result.answer,
            questionId: questionRecord.id,
            tokensUsed: {
              input: result.inputTokens,
              cachedInput: result.cachedInputTokens,
              output: result.outputTokens
            },
            processingTime: seconds
          };
  
  
          // Return the answer
          return response;
        } catch (error) {
          console.error("Error processing question:", error);
          return res.status(500).json({
            error: "Failed to process question",
            details: error.message
          });
        }
      });
    }
      */

}
