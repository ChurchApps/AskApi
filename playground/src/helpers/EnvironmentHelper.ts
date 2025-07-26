import { ApiHelper } from './ApiHelper';
import { CommonEnvironmentHelper } from '@churchapps/helpers';

export class EnvironmentHelper {
  static initialized = false;

  static init = () => {
    if (this.initialized) return;
    
    let stage = process.env.REACT_APP_STAGE || process.env.NODE_ENV;
    
    // First initialize CommonEnvironmentHelper with base URLs
    CommonEnvironmentHelper.init(stage || "development");
    
    // Then apply environment-specific overrides
    if (stage === "production") {
      this.initProd();
    } else if (stage === "staging") {
      this.initStaging();
    } else {
      this.initDev();
    }

    this.populateApiConfigs();
    this.initialized = true;
  };

  static initDev = () => {
    console.log("Initializing development environment");
    
    // Override with environment variables if provided
    if (process.env.REACT_APP_MEMBERSHIP_API) {
      CommonEnvironmentHelper.MembershipApi = process.env.REACT_APP_MEMBERSHIP_API;
    }
    if (process.env.REACT_APP_ASK_API) {
      // Set custom AskApi URL since it's not in CommonEnvironmentHelper
      // We'll handle this in populateApiConfigs
    }
  };

  static initStaging = () => {
    console.log("Initializing staging environment");
    
    // Override with environment variables if provided
    if (process.env.REACT_APP_MEMBERSHIP_API) {
      CommonEnvironmentHelper.MembershipApi = process.env.REACT_APP_MEMBERSHIP_API;
    }
  };

  static initProd = () => {
    console.log("Initializing production environment");
    
    // Override with environment variables if provided  
    if (process.env.REACT_APP_MEMBERSHIP_API) {
      CommonEnvironmentHelper.MembershipApi = process.env.REACT_APP_MEMBERSHIP_API;
    }
  };

  static populateApiConfigs = () => {
    // Use CommonEnvironmentHelper URLs for MembershipApi
    const membershipApiUrl = CommonEnvironmentHelper.MembershipApi;
    const askApiUrl = this.getAskApiUrl();

    ApiHelper.apiConfigs = [
      {
        keyName: "MembershipApi",
        url: membershipApiUrl,
        jwt: "",
        permissionsWithoutChurch: []
      },
      {
        keyName: "AskApi", 
        url: askApiUrl,
        jwt: "",
        permissionsWithoutChurch: []
      }
    ];

    console.log("API Configurations:", {
      MembershipApi: membershipApiUrl,
      AskApi: askApiUrl
    });
  };

  static getMembershipApiUrl = (): string => {
    // First check environment variable override
    if (process.env.REACT_APP_MEMBERSHIP_API) {
      return process.env.REACT_APP_MEMBERSHIP_API;
    }
    
    // Then check CommonEnvironmentHelper
    if (CommonEnvironmentHelper.MembershipApi) {
      return CommonEnvironmentHelper.MembershipApi;
    }
    
    // Fall back to stage-based defaults
    const stage = process.env.REACT_APP_STAGE || process.env.NODE_ENV;
    
    switch (stage) {
      case "production":
        return "https://api.churchapps.org/membership";
      case "staging":
        return "https://api.staging.churchapps.org/membership";
      default:
        return "http://localhost:8082";
    }
  };

  static getAskApiUrl = (): string => {
    // Allow environment variable override
    if (process.env.REACT_APP_ASK_API) {
      return process.env.REACT_APP_ASK_API;
    }

    const stage = process.env.REACT_APP_STAGE || process.env.NODE_ENV;
    
    switch (stage) {
      case "production":
        return "https://askapi.churchapps.org";
      case "staging":
        return "https://askapi.staging.churchapps.org";
      default:
        return "http://localhost:8083";
    }
  };
}