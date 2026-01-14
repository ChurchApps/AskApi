import { Repositories } from "../repositories/index.js";
import { CustomBaseController } from "@churchapps/apihelper";

export class AskBaseController extends CustomBaseController {
  public repositories: Repositories;

  constructor() {
    super();
    this.repositories = Repositories.getCurrent();
  }
}
