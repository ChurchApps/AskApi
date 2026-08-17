import { Repositories } from "../repositories/index.js";
import { AuthenticatedUser, CustomBaseController } from "@churchapps/apihelper";
import express from "express";
import { Permissions } from "../helpers/Permissions.js";

export class AskBaseController extends CustomBaseController {
  public repositories: Repositories;

  constructor() {
    super();
    this.repositories = Repositories.getCurrent();
  }

  public async actionWrapper(req: express.Request, res: express.Response, fetchFunction: (au: AuthenticatedUser) => unknown): Promise<any> {
    return super.actionWrapper(req, res, async (au) => {
      if (!au?.jwt || !au.churchId) return this.denyAccess(["Unauthorized"]);
      if (!this.hasAskView(au)) return this.denyAccess(["Unauthorized"]);
      return fetchFunction(au);
    });
  }

  public async actionWrapperEdit(req: express.Request, res: express.Response, fetchFunction: (au: AuthenticatedUser) => unknown): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      if (!this.hasAskEdit(au)) return this.denyAccess(["Unauthorized"]);
      return fetchFunction(au);
    });
  }

  protected hasAskView(au: AuthenticatedUser) {
    return au.checkAccess(Permissions.ask.view) || au.checkAccess(Permissions.ask.edit) || au.checkAccess(Permissions.people.view) || au.checkAccess(Permissions.content.edit);
  }

  protected hasAskEdit(au: AuthenticatedUser) {
    return au.checkAccess(Permissions.ask.edit) || au.checkAccess(Permissions.content.edit);
  }

  protected hasPeopleView(au: AuthenticatedUser) {
    return au.checkAccess(Permissions.ask.view) || au.checkAccess(Permissions.ask.edit) || au.checkAccess(Permissions.people.view);
  }
}
