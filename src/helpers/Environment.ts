import { AwsHelper, EnvironmentBase } from "@churchapps/apihelper";

export class Environment extends EnvironmentBase {
  static membershipApi: string;
  static attendanceApi: string;
  static contentApi: string;
  static doingApi: string;
  static givingApi: string;
  static messagingApi: string;
  static reportingApi: string;
  static aiProvider: string;
  static openAiApiKey: string;
  static openRouterApiKey: string;

  static async init(environment: string) {
    if (!environment) throw new Error("APP_ENV is required");
    // No demo.json in this project; demo runs on the dev config.
    const data = await this.initBase(environment, { appName: "askApi", fileMap: { demo: "dev.json" } });

    this.membershipApi = this.requireHost(data.membershipApi, "membershipApi");
    this.attendanceApi = this.requireHost(data.attendanceApi, "attendanceApi");
    this.contentApi = this.requireHost(data.contentApi, "contentApi");
    this.doingApi = this.requireHost(data.doingApi, "doingApi");
    this.givingApi = this.requireHost(data.givingApi, "givingApi");
    this.messagingApi = this.requireHost(data.messagingApi, "messagingApi");
    this.reportingApi = this.requireHost(data.reportingApi, "reportingApi");
    this.aiProvider = data.aiProvider || "openrouter";
    this.openAiApiKey = process.env.OPENAI_API_KEY || (await AwsHelper.readParameter(`/${environment}/openAIKey`));
    this.openRouterApiKey =
      process.env.OPENROUTER_API_KEY || (await AwsHelper.readParameter(`/${environment}/openRouterApiKey`));
  }

  static apiHosts(): { [key: string]: string } {
    const hosts: { [key: string]: string } = {
      membershipapi: this.membershipApi,
      attendanceapi: this.attendanceApi,
      contentapi: this.contentApi,
      doingapi: this.doingApi,
      givingapi: this.givingApi,
      messagingapi: this.messagingApi,
      reportingapi: this.reportingApi
    };
    for (const name of Object.keys(hosts)) {
      if (!hosts[name]) throw new Error(`API host not configured: ${name}`);
    }
    return hosts;
  }

  private static requireHost(value: unknown, name: string): string {
    if (typeof value !== "string" || !value.trim()) throw new Error(`Missing ${name}`);
    const host = value.trim().replace(/\/$/, "");
    if ((this.appEnv === "prod" || process.env.APP_ENV === "prod") && host.includes(".staging.")) throw new Error(`${name} must not use staging in prod`);
    return host;
  }
}
