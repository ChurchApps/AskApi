import { CommonEnvironmentHelper, ApiHelper } from "@churchapps/apphelper";

export class EnvironmentHelper {
  static initialized = false;

  static init = () => {
    if (this.initialized) return;

    const stage = process.env.REACT_APP_STAGE || process.env.NODE_ENV;

    // CommonEnvironmentHelper now derives all module URLs from REACT_APP_API_BASE
    // (or NEXT_PUBLIC_API_BASE / EXPO_PUBLIC_API_BASE), with stage defaults baked in.
    CommonEnvironmentHelper.init(stage || "development");

    this.populateApiConfigs();
    this.initialized = true;
  };

  static populateApiConfigs = () => {
    const askApiUrl = this.getAskApiUrl();

    ApiHelper.apiConfigs = [
      { keyName: "AttendanceApi", url: CommonEnvironmentHelper.AttendanceApi, jwt: "", permissions: [] },
      { keyName: "GivingApi", url: CommonEnvironmentHelper.GivingApi, jwt: "", permissions: [] },
      { keyName: "MembershipApi", url: CommonEnvironmentHelper.MembershipApi, jwt: "", permissions: [] },
      { keyName: "MessagingApi", url: CommonEnvironmentHelper.MessagingApi, jwt: "", permissions: [] },
      { keyName: "ReportingApi", url: CommonEnvironmentHelper.ReportingApi, jwt: "", permissions: [] },
      { keyName: "DoingApi", url: CommonEnvironmentHelper.DoingApi, jwt: "", permissions: [] },
      { keyName: "ContentApi", url: CommonEnvironmentHelper.ContentApi, jwt: "", permissions: [] },
      { keyName: "AskApi", url: askApiUrl, jwt: "", permissions: [] },
    ];
  };

  static getAskApiUrl = (): string => {
    if (process.env.REACT_APP_ASK_API) return process.env.REACT_APP_ASK_API;

    const stage = process.env.REACT_APP_STAGE || process.env.NODE_ENV;
    switch (stage) {
      case "production": return "https://askapi.churchapps.org";
      case "staging":    return "https://askapi.staging.churchapps.org";
      default:           return "http://localhost:8083";
    }
  };
}
