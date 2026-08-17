import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController.js";
import { OpenAiHelper } from "../helpers/index.js";
import { WorkflowHelper } from "../helpers/WorkflowHelper.js";
import { sessionToken } from "../helpers/ApiCallGuard.js";

@controller("/queryV2")
export class QueryV2Controller extends AskBaseController {
  @httpPost("/getRoutes")
  public async getRoutes(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (_au) => {
      const { question } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.determineRoutes(question);
    });
  }

  @httpPost("/formApiCalls")
  public async formApiCalls(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (_au) => {
      const { question } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.formApiCalls(question);
    });
  }

  @httpPost("/executeApiCalls")
  public async executeApiCalls(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      if (!this.hasPeopleView(au)) return this.denyAccess(["Unauthorized"]);
      const { question } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.executeApiCalls(question, sessionToken(au, req.body));
    });
  }

  @httpPost("/answerQuestion")
  public async answerQuestion(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      if (!this.hasPeopleView(au)) return this.denyAccess(["Unauthorized"]);
      const { question } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.answerQuestion(question, sessionToken(au, req.body));
    });
  }
}
