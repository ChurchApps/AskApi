import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController.js";
import { OpenAiHelper } from "../helpers/index.js";
import { DocChatHelper } from "../helpers/DocChatHelper.js";

@controller("/docChat")
export class DocChatController extends AskBaseController {

  @httpPost("/ask")
  public async ask(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async () => {
      const { question, conversationHistory, mode } = req.body;

      if (!question || typeof question !== "string" || question.trim().length < 3) {
        return { error: "Question is required and must be at least 3 characters" };
      }

      await OpenAiHelper.initialize();
      const answer = await DocChatHelper.answerQuestion(question.trim(), conversationHistory || [], mode || "standard");
      return { answer };
    });
  }
}
