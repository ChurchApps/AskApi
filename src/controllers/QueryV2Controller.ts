import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController";
import { OpenAiHelper, InstructionsHelper } from "../helpers";
import { WorkflowHelper } from "../helpers/WorkflowHelper";

@controller("/queryV2")
export class QueryV2Controller extends AskBaseController {
  @httpPost("/getRoutes")
  public async getRoutes(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.determineRoutes(question);
    });
  }

  @httpPost("/formApiCalls")
  public async formApiCalls(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.formApiCalls(question);
    });
  }

  @httpPost("/executeApiCalls")
  public async executeApiCalls(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question, jwts } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.executeApiCalls(question, jwts);
    });
  }

  @httpPost("/answerQuestion")
  public async answerQuestion(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question, jwts } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.answerQuestion(question, jwts);
    });
  }

  @httpPost("/playground/people-search")
  public async peopleSearch(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { query } = req.body;

      if (!query) {
        return { error: "Query is required" };
      }

      await OpenAiHelper.initialize();

      // Get the instruction prompt
      const instructions = InstructionsHelper.getPeopleAdvancedSearchInstructions(query);

      // Call OpenAI to convert the query
      const openAiResponse = await OpenAiHelper.executeText(
        "You are a helpful assistant that converts natural language queries into search filter arrays.",
        instructions
      );

      // Parse the response - it should be a JSON array
      let filters: any[];
      try {
        // Try to extract JSON from the response
        const jsonMatch = openAiResponse.match(/\[.*\]/s);
        const jsonStr = jsonMatch ? jsonMatch[0] : openAiResponse;
        filters = JSON.parse(jsonStr);
        if (!Array.isArray(filters)) {
          throw new Error("Response is not an array");
        }
      } catch (parseError) {
        return {
          error: "Failed to parse OpenAI response",
          rawResponse: openAiResponse,
          parseError: parseError.message
        };
      }

      return {
        query,
        filters,
        debug: {
          instructions: instructions.substring(0, 500) + "...",
          rawResponse: openAiResponse
        }
      };
    });
  }

}
