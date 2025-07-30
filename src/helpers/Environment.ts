import fs from "fs";
import path from "path";

import { AwsHelper, EnvironmentBase } from "@churchapps/apihelper";

export class Environment extends EnvironmentBase {
  static membershipApi: string;
  static messagingApi: string;
  static aiProvider: string;
  static openAiApiKey: string;
  static openRouterApiKey: string;

  static async init(environment: string) {
    let file = "dev.json";
    if (environment === "staging") file = "staging.json";
    if (environment === "prod") file = "prod.json";

    const relativePath = "../../config/" + file;
    const physicalPath = path.resolve(__dirname, relativePath);

    const json = fs.readFileSync(physicalPath, "utf8");
    const data = JSON.parse(json);
    await this.populateBase(data, "askApi", environment);

    this.membershipApi = data.membershipApi;
    this.messagingApi = data.messagingApi;
    this.aiProvider = data.aiProvider || "openai";
    this.openAiApiKey = process.env.OPENAI_API_KEY || await AwsHelper.readParameter(`/${environment}/openAIKey`);;
    this.openRouterApiKey = data.openRouterApiKey || process.env.OPENROUTER_API_KEY;
  }
}
