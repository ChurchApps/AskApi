import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController";
import { OpenAiHelper } from "../helpers";
import { WebsiteHelper } from "../helpers/WebsiteHelper";

@controller("/website")
export class WebsiteController extends AskBaseController {
  @httpPost("/createPage")
  public async createPage(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { description, title, url } = req.body;
      await OpenAiHelper.initialize();
      const pageData = await WebsiteHelper.generatePageFromDescription(description, au.churchId, title, url);
      return WebsiteHelper.flattenPageStructure(pageData);
    });
  }
}
