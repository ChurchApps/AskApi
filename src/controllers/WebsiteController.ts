import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController.js";
import { OpenAiHelper } from "../helpers/index.js";
import { WebsiteHelper } from "../helpers/WebsiteHelper.js";
import { SiteGenHelper, type SiteGenChurch } from "../helpers/SiteGenHelper.js";

@controller("/website")
export class WebsiteController extends AskBaseController {
  @httpPost("/createPage")
  public async createPage(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (au) => {
      const { description, title, url } = req.body;
      await OpenAiHelper.initialize();
      const pageData = await WebsiteHelper.generatePageFromDescription(description, au.churchId, title, url);
      const flat = WebsiteHelper.flattenPageStructure(pageData);
      flat.page.churchId = au.churchId;
      flat.sections.forEach(s => s.churchId = au.churchId);
      flat.elements.forEach(e => e.churchId = au.churchId);
      return flat;
    });
  }

  @httpPost("/generatePage")
  public async generatePage(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (au) => {
      const { prompt, churchContext, availableBlocks, availableElementTypes, constraints } = req.body;

      if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
        return { error: "Prompt is required and must be at least 10 characters" };
      }

      await OpenAiHelper.initialize();

      const pageData = await WebsiteHelper.generatePageFromPromptWithContext(
        prompt,
        au.churchId,
        churchContext,
        availableBlocks,
        availableElementTypes,
        constraints
      );

      return { page: pageData };
    });
  }

  private static siteGenChurch(body: any): SiteGenChurch | null {
    const { prompt, churchContext } = body || {};
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) return null;
    const theme = churchContext?.theme?.palette || {};
    return {
      name: String(churchContext?.churchName || "").substring(0, 200),
      brief: prompt.trim().substring(0, 4000),
      address: typeof churchContext?.address === "string" ? churchContext.address.substring(0, 300) : undefined,
      palette: { accent: theme.accent, dark: theme.dark, light: theme.light },
      facts: typeof churchContext?.facts === "string" ? churchContext.facts.substring(0, 2000) : undefined,
      hasServiceTimes: churchContext?.hasServiceTimes === true,
      hasGroups: churchContext?.hasGroups === true,
      resolvesPhotos: churchContext?.resolvesPhotos === true,
      assumedDetails: Array.isArray(churchContext?.assumedDetails) ? churchContext.assumedDetails.filter((d: any) => typeof d === "string").slice(0, 10).map((d: string) => d.substring(0, 200)) : undefined,
      nextService: WebsiteController.nextService(churchContext?.nextService)
    };
  }

  private static nextService(value: any) {
    const day = Number(value?.dayOfWeek);
    if (!Number.isInteger(day) || day < 0 || day > 6 || !/^([01]\d|2[0-3]):[0-5]\d$/.test(String(value?.time))) return undefined;
    return { dayOfWeek: day, time: String(value.time) };
  }

  /** Low-cost generation, phase 1: sample and judge candidate layouts. Each phase stays inside the API Gateway timeout. */
  @httpPost("/planPage")
  public async planPage(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (_au) => {
      const church = WebsiteController.siteGenChurch(req.body);
      if (!church) return { error: "Prompt is required and must be at least 10 characters" };
      return await SiteGenHelper.planPage(church);
    });
  }

  /** Low-cost generation, phase 2: write and fact-check copy for one planned layout; returns a builder section tree. */
  @httpPost("/writePage")
  public async writePage(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (_au) => {
      const church = WebsiteController.siteGenChurch(req.body);
      if (!church) return { error: "Prompt is required and must be at least 10 characters" };
      return await SiteGenHelper.writePage(church, req.body.layout, req.body.tone, typeof req.body.pageType === "string" ? req.body.pageType : "home");
    });
  }

  /** Generates lightweight page outline as first step of multi-step page generation. */
  @httpPost("/generatePageOutline")
  public async generatePageOutline(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (_au) => {
      const { prompt, churchContext, availableElementTypes, constraints } = req.body;

      if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
        return { error: "Prompt is required and must be at least 10 characters" };
      }

      await OpenAiHelper.initialize();

      const outlineData = await WebsiteHelper.generatePageOutline(
        prompt,
        churchContext,
        availableElementTypes,
        constraints
      );

      return { outline: outlineData };
    });
  }

  /** Generates full content for a single section based on outline; second step of multi-step generation. */
  @httpPost("/generateSection")
  public async generateSection(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (_au) => {
      const { sectionOutline, churchContext, availableElementTypes, pageContext } = req.body;

      if (!sectionOutline || typeof sectionOutline !== "object") {
        return { error: "sectionOutline is required and must be an object" };
      }

      if (!sectionOutline.id || !sectionOutline.purpose) {
        return { error: "sectionOutline must have id and purpose fields" };
      }

      await OpenAiHelper.initialize();

      const sectionData = await WebsiteHelper.generateSectionContent(
        sectionOutline,
        churchContext,
        availableElementTypes,
        pageContext
      );

      return { section: sectionData };
    });
  }

  /** Generates full multi-page site plan from church details for AI onboarding. */
  @httpPost("/generateSite")
  public async generateSite(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (_au) => {
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

  /** Rewrites text fields of a section, preserving structure. */
  @httpPost("/rewriteSection")
  public async rewriteSection(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (_au) => {
      const { section, instruction, churchName, availableElementTypes } = req.body;

      if (!section || typeof section !== "object" || !Array.isArray(section.elements)) {
        return { error: "section is required and must be an object with an elements array" };
      }

      await OpenAiHelper.initialize();

      return await WebsiteHelper.rewriteSection(section, instruction, churchName, availableElementTypes);
    });
  }

  /** Generates concise alt text for batch of image URLs using vision model. */
  @httpPost("/generateAltText")
  public async generateAltText(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (_au) => {
      const { imageUrls, pageContext } = req.body;

      if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        return { error: "imageUrls is required and must be a non-empty array" };
      }
      const cleanUrls = imageUrls.filter(u => typeof u === "string" && u.length > 0);
      if (cleanUrls.length === 0) {
        return { error: "imageUrls must contain at least one valid url string" };
      }

      await OpenAiHelper.initialize();

      const results = await WebsiteHelper.generateAltText(cleanUrls, typeof pageContext === "string" ? pageContext : undefined);
      return { results };
    });
  }

  /** Generates SEO meta description (<=155 chars) for a page. */
  @httpPost("/generateMetaDescription")
  public async generateMetaDescription(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperEdit(req, res, async (_au) => {
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
