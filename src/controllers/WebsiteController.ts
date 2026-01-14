import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController.js";
import { OpenAiHelper } from "../helpers/index.js";
import { WebsiteHelper } from "../helpers/WebsiteHelper.js";

@controller("/website")
export class WebsiteController extends AskBaseController {
  @httpPost("/createPage")
  public async createPage(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { description, title, url } = req.body;
      await OpenAiHelper.initialize();
      const pageData = await WebsiteHelper.generatePageFromDescription(description, au.churchId, title, url);
      const flat = WebsiteHelper.flattenPageStructure(pageData);
      flat.page.churchId = au.churchId;
      flat.sections.forEach((s) => (s.churchId = au.churchId));
      flat.elements.forEach((e) => (e.churchId = au.churchId));
      return flat;
    });
  }

  @httpPost("/generatePage")
  public async generatePage(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { prompt, churchContext, availableBlocks, availableElementTypes, constraints } = req.body;

      // Validation
      if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
        return { error: "Prompt is required and must be at least 10 characters" };
      }

      await OpenAiHelper.initialize();

      // Generate page structure using WebsiteHelper with enhanced context
      const pageData = await WebsiteHelper.generatePageFromPromptWithContext(
        prompt,
        au.churchId,
        churchContext,
        availableBlocks,
        availableElementTypes,
        constraints
      );

      // Return the structured response expected by B1Admin
      return {
        page: pageData
      };
    });
  }
}
