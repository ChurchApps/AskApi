import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController";
import { OpenAiHelper, ArrayHelper } from "../helpers";

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
}
