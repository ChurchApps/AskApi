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
      return { page: pageData };
    });
  }

  /**
   * Generates a lightweight page outline with section descriptions and content hints.
   * This is the first step in the multi-step page generation flow.
   * Uses a fast model (haiku) for quick response.
   */
  @httpPost("/generatePageOutline")
  public async generatePageOutline(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (_au) => {
      const { prompt, churchContext, availableElementTypes, constraints } = req.body;

      // Validation
      if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
        return { error: "Prompt is required and must be at least 10 characters" };
      }

      await OpenAiHelper.initialize();

      // Generate page outline
      const outlineData = await WebsiteHelper.generatePageOutline(
        prompt,
        churchContext,
        availableElementTypes,
        constraints
      );

      return { outline: outlineData };
    });
  }

  /**
   * Generates full content for a single section based on an outline.
   * This is the second step in the multi-step page generation flow.
   * Uses a better model (sonnet) for quality content generation.
   */
  @httpPost("/generateSection")
  public async generateSection(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (_au) => {
      const { sectionOutline, churchContext, availableElementTypes, pageContext } = req.body;

      // Validation
      if (!sectionOutline || typeof sectionOutline !== "object") {
        return { error: "sectionOutline is required and must be an object" };
      }

      if (!sectionOutline.id || !sectionOutline.purpose) {
        return { error: "sectionOutline must have id and purpose fields" };
      }

      await OpenAiHelper.initialize();

      // Generate section content
      const sectionData = await WebsiteHelper.generateSectionContent(
        sectionOutline,
        churchContext,
        availableElementTypes,
        pageContext
      );

      return { section: sectionData };
    });
  }

  /**
   * AI onboarding: generates a full multi-page site plan from church details.
   * One site-outline call followed by per-section generation server-side.
   */
  @httpPost("/generateSite")
  public async generateSite(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (_au) => {
      const { churchName, denomination, description, tone, audiences, serviceTimesText, availableElementTypes, planOnly } = req.body;

      if (!description || typeof description !== "string" || description.trim().length < 10) {
        return { error: "description is required and must be at least 10 characters" };
      }

      await OpenAiHelper.initialize();

      const pages = await WebsiteHelper.generateSite(
        {
          churchName,
          denomination,
          description: description.substring(0, 4000),
          tone,
          audiences: Array.isArray(audiences) ? audiences.slice(0, 10) : undefined,
          serviceTimesText: typeof serviceTimesText === "string" ? serviceTimesText.substring(0, 500) : undefined
        },
        availableElementTypes,
        planOnly === true
      );

      return { pages };
    });
  }

  /**
   * Rewrites only the text-bearing fields of a section, preserving structure.
   */
  @httpPost("/rewriteSection")
  public async rewriteSection(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (_au) => {
      const { section, instruction, churchName, availableElementTypes } = req.body;

      if (!section || typeof section !== "object" || !Array.isArray(section.elements)) {
        return { error: "section is required and must be an object with an elements array" };
      }

      await OpenAiHelper.initialize();

      const result = await WebsiteHelper.rewriteSection(section, instruction, churchName, availableElementTypes);
      return result;
    });
  }

  /**
   * Generates concise alt text for a batch of image urls using a vision model.
   */
  @httpPost("/generateAltText")
  public async generateAltText(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (_au) => {
      const { imageUrls, pageContext } = req.body;

      if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        return { error: "imageUrls is required and must be a non-empty array" };
      }
      const cleanUrls = imageUrls.filter((u) => typeof u === "string" && u.length > 0);
      if (cleanUrls.length === 0) {
        return { error: "imageUrls must contain at least one valid url string" };
      }

      await OpenAiHelper.initialize();

      const results = await WebsiteHelper.generateAltText(cleanUrls, typeof pageContext === "string" ? pageContext : undefined);
      return { results };
    });
  }

  /**
   * Generates a single SEO meta description (<=155 chars) for a page.
   */
  @httpPost("/generateMetaDescription")
  public async generateMetaDescription(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (_au) => {
      const { pageTitle, pageContentText, churchName } = req.body;

      if (!pageTitle || typeof pageTitle !== "string") {
        return { error: "pageTitle is required and must be a string" };
      }
      if (!pageContentText || typeof pageContentText !== "string") {
        return { error: "pageContentText is required and must be a string" };
      }

      await OpenAiHelper.initialize();

      const result = await WebsiteHelper.generateMetaDescription(pageTitle, pageContentText, churchName);
      return result;
    });
  }
}
