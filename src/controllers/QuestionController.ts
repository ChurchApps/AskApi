import { controller, httpPost, httpGet, httpPut, httpDelete, requestParam } from "inversify-express-utils";
import express from "express";
import { Permissions } from "../helpers";
import { AskBaseController } from "./AskBaseController";
import { Question } from "../models";

@controller("/questions")
export class QuestionController extends AskBaseController {
  @httpGet("/:id")
  public async get(
    @requestParam("id") id: string,
    req: express.Request<{}, {}, null>,
    res: express.Response
  ): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      return await this.repositories.question.load(au.churchId, id);
    });
  }

  @httpGet("/")
  public async loadAll(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const userId = req.query.userId?.toString();

      let data;
      if (userId) {
        data = await this.repositories.question.loadByUser(au.churchId, userId);
      } else {
        data = await this.repositories.question.loadAll(au.churchId);
      }

      return data;
    });
  }

  @httpPost("/")
  public async save(req: express.Request<{}, {}, Question>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      if (!au.checkAccess(Permissions.ask.edit)) return this.json({}, 401);

      const question: Question = req.body;
      question.churchId = au.churchId;
      question.userId = question.userId || au.id;

      const result = await this.repositories.question.save(question);
      return this.json(result, 200);
    });
  }

  @httpPut("/:id")
  public async update(
    @requestParam("id") id: string,
    req: express.Request<{}, {}, Question>,
    res: express.Response
  ): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      if (!au.checkAccess(Permissions.ask.edit)) return this.json({}, 401);

      const question: Question = req.body;
      question.id = id;
      question.churchId = au.churchId;

      if (question.answer && !question.dateAnswered) {
        question.dateAnswered = new Date();
      }

      const result = await this.repositories.question.save(question);
      return this.json(result, 200);
    });
  }

  @httpDelete("/:id")
  public async delete(@requestParam("id") id: string, req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      if (!au.checkAccess(Permissions.ask.edit)) return this.json({}, 401);

      await this.repositories.question.delete(id, au.churchId);
      return this.json({});
    });
  }
}
