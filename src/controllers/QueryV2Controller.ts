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

}
