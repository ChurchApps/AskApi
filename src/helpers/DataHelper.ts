import axios from "axios";

export class DataHelper {

  private static filterObjectFields(obj: any, fields: string[]): any {
    const filtered: any = {};
    fields.forEach((field: string) => {
      if (obj.hasOwnProperty(field)) {
        filtered[field] = obj[field];
      }
    });
    return filtered;
  }

  static filterResponseFields(data: any, fields?: string[]): any {
    if (!fields || !Array.isArray(fields) || fields.length === 0) {
      return data;
    }

    if (Array.isArray(data)) {
      console.log(`Filtering ${data.length} items to ${fields.length} fields each`);
      return data.map((item) => this.filterObjectFields(item, fields));
    } else if (typeof data === "object" && data !== null) {
      console.log(`Filtering object to ${fields.length} fields`);
      return this.filterObjectFields(data, fields);
    }

    return data;
  }


  static async executeSingleApiCall(apiCall: any, jwts: any, baseUrls: { [key: string]: string }) {
    const apiName = apiCall.apiName.toLowerCase();
    const baseUrl = baseUrls[apiName];

    if (!baseUrl) {
      console.error(`Unknown API: ${apiCall.apiName}`);
      return {
        success: false,
        error: `Unknown API: ${apiCall.apiName}`,
        apiCall: apiCall
      };
    }

    const token = this.getApiToken(apiName, jwts);
    if (!token) {
      console.error(`No token found for ${apiCall.apiName}`);
      return {
        success: false,
        error: `No token provided for ${apiCall.apiName}`,
        apiCall: apiCall
      };
    }

    try {
      const requestConfig = this.buildRequestConfig(apiCall, baseUrl, token);
      const response = await axios(requestConfig);

      console.log(
        `API Response: ${response.status} - ${Array.isArray(response.data) ? `${response.data.length} items` : typeof response.data}`
      );

      const filteredData = DataHelper.filterResponseFields(response.data, apiCall.fields);

      return {
        success: true,
        apiCall: apiCall,
        status: response.status,
        data: filteredData,
        dataType: Array.isArray(filteredData) ? `array (${filteredData.length} items)` : typeof filteredData
      };
    } catch (error: any) {
      console.error(
        `API Error for ${apiCall.apiName} ${apiCall.path}:`,
        error.response?.status || "Failed",
        error.message
      );
      return {
        success: false,
        error: error.response?.data?.message || error.message || "API call failed",
        apiCall: apiCall,
        status: error.response?.status
      };
    }
  }


  private static getApiToken(apiName: string, jwts: any): string {
    console.log("Getting token for API:", apiName);
    const tokenMap: { [key: string]: string } = {
      membershipapi: jwts.membershipapi,
      attendanceapi: jwts.attendanceapi,
      contentapi: jwts.contentapi,
      doingapi: jwts.doingapi,
      givingapi: jwts.givingapi,
      messagingapi: jwts.messagingapi,
      reportingapi: jwts.reportingapi
    };
    return tokenMap[apiName] || "";
  }


  static async executeApiCalls(apiCalls: any[], jwts: any) {

    const results: any[] = [];

    // Base URLs for different APIs
    const baseUrls: { [key: string]: string } = {
      membershipapi: "https://membershipapi.staging.churchapps.org",
      attendanceapi: "https://attendanceapi.staging.churchapps.org",
      contentapi: "https://contentapi.staging.churchapps.org",
      doingapi: "https://doingapi.staging.churchapps.org",
      givingapi: "https://givingapi.staging.churchapps.org",
      messagingapi: "https://messagingapi.staging.churchapps.org",
      reportingapi: "https://reportingapi.staging.churchapps.org"
    };

    // Execute each API call
    for (const apiCall of apiCalls) {
      const result = await DataHelper.executeSingleApiCall(apiCall, jwts, baseUrls);
      results.push(result);
    }

    console.log(`Executed ${apiCalls.length} API calls, ${results.filter((r) => r.success).length} successful`);

    // Extract just the data arrays from successful calls
    const dataArrays = results.filter((r) => r.success).map((r) => r.data);

    return dataArrays;
  }

  private static buildRequestConfig(apiCall: any, baseUrl: string, token: string) {
    const url = `${baseUrl}${apiCall.path}`;
    const requestConfig: any = {
      method: apiCall.method.toLowerCase(),
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      timeout: 15000
    };

    // Add body data if present and it's a POST/PUT/PATCH request
    if (apiCall.body && ["post", "put", "patch"].includes(requestConfig.method)) {
      try {
        requestConfig.data = typeof apiCall.body === "string" ? JSON.parse(apiCall.body) : apiCall.body;
      } catch (error) {
        console.error(`Failed to parse body for ${apiCall.apiName} ${apiCall.path}:`, error);
        requestConfig.data = apiCall.body;
      }
    }

    console.log(`Executing API call: ${apiCall.method} ${url}`);
    if (requestConfig.data) {
      console.log("Request body:", JSON.stringify(requestConfig.data, null, 2));
    }

    return requestConfig;
  }




}