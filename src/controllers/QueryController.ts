import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController";
import { OpenAiHelper } from "../helpers";
import { WorkflowHelper } from "../helpers/WorkflowHelper";

@controller("/query")
export class QueryController extends AskBaseController {
  @httpPost("/people")
  public async queryPeople(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question, jwts } = req.body;
      await OpenAiHelper.initialize();

      // Use the natural language query to search for people
      // This will analyze attendance, donations, and other data to filter people
      const result = await WorkflowHelper.queryPeople(question, jwts);

      return result;
    });
  }
}