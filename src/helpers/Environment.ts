import { AwsHelper, EnvironmentBase } from "@churchapps/apihelper";

export class Environment extends EnvironmentBase {
  static membershipApi: string;
  static messagingApi: string;
  static aiProvider: string;
  static openAiApiKey: string;
  static openRouterApiKey: string;

  static async init(environment: string) {
    // No demo.json in this project; demo runs on the dev config.
    const data = await this.initBase(environment, { appName: "askApi", fileMap: { demo: "dev.json" } });

    this.membershipApi = data.membershipApi;
    this.messagingApi = data.messagingApi;
    this.aiProvider = data.aiProvider || "openrouter";
    this.openAiApiKey = process.env.OPENAI_API_KEY || (await AwsHelper.readParameter(`/${environment}/openAIKey`));
    this.openRouterApiKey =
      process.env.OPENROUTER_API_KEY || (await AwsHelper.readParameter(`/${environment}/openRouterApiKey`));
  }
}
