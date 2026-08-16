import axios from "axios";
import { executionToken, selectApiCalls, validateApiCall } from "./ApiCallGuard.js";
import { Environment } from "./Environment.js";

export class DataHelper {
  static jsonToCsv(data: any[]): string {
    if (!Array.isArray(data) || data.length === 0) return "";

    // Get all unique keys from all objects
    const allKeys = new Set<string>();
    data.forEach((item) => {
      if (typeof item === "object" && item !== null) {
        this.flattenObjectKeys(item).forEach((key) => allKeys.add(key));
      }
    });

    const headers = Array.from(allKeys).sort();

    // Create CSV content
    const csvRows = [headers.join(",")];

    data.forEach((item) => {
      const row = headers.map((header) => {
        const value = this.getNestedValue(item, header);
        return this.escapeCsvValue(value);
      });
      csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
  }

  private static flattenObjectKeys(obj: any, prefix = ""): string[] {
    let keys: string[] = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];

        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
          // Nested object - flatten recursively
          keys = keys.concat(this.flattenObjectKeys(value, fullKey));
        } else {
          // Simple value or array
          keys.push(fullKey);
        }
      }
    }

    return keys;
  }

  private static getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : "";
    }, obj);
  }

  private static escapeCsvValue(value: any): string {
    if (value === null || value === undefined) return "";

    let stringValue = "";

    if (Array.isArray(value)) {
      // Convert array to comma-separated string
      stringValue = value.map((v) => String(v)).join("; ");
    } else if (typeof value === "object") {
      // Convert object to JSON string
      stringValue = JSON.stringify(value);
    } else {
      stringValue = String(value);
    }

    // Escape CSV special characters
    if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
      stringValue = `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  }

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

  static flattenObject(obj: any): any {
    var toReturn: any = {};

    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;

      if (typeof obj[i] == "object" && obj[i] !== null) {
        var flatObject = this.flattenObject(obj[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[x] = flatObject[x];
        }
      } else {
        toReturn[i] = obj[i];
      }
    }
    return toReturn;
  }

  static async executeSingleApiCall(apiCall: any, jwt: unknown, baseUrls: { [key: string]: string }) {
    const check = validateApiCall(apiCall);
    if (!check.ok) {
      console.error(check.error);
      return { success: false, error: check.error, apiCall: apiCall };
    }

    const baseUrl = baseUrls[check.apiName];
    if (!baseUrl) {
      console.error(`Unknown API: ${apiCall.apiName}`);
      return { success: false, error: `Unknown API: ${apiCall.apiName}`, apiCall: apiCall };
    }

    const token = executionToken(jwt);
    if (!token) {
      console.error(`No token found for ${apiCall.apiName}`);
      return { success: false, error: `No token provided for ${apiCall.apiName}`, apiCall: apiCall };
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
      return { success: false, error: error.response?.data?.message || error.message || "API call failed", apiCall: apiCall, status: error.response?.status };
    }
  }

  static async executeApiCalls(apiCalls: any[], jwt: unknown, resultType: "csv" | "json" = "csv") {
    const results: any[] = [];
    const allowedCalls = selectApiCalls(apiCalls);
    const baseUrls = Environment.apiHosts();

    for (const apiCall of allowedCalls) {
      const result = await DataHelper.executeSingleApiCall(apiCall, jwt, baseUrls);
      results.push(result);
    }

    console.log(`Executed ${allowedCalls.length} API calls, ${results.filter((r) => r.success).length} successful`);

    // Extract just the data arrays from successful calls and convert to CSV
    const dataArrays = results.filter((r) => r.success).map((r) => r.data);

    // Convert each data array to CSV format
    const csvArrays = dataArrays.map((dataArray) => {
      if (Array.isArray(dataArray) && dataArray.length > 0) {
        const csvData = this.jsonToCsv(dataArray);
        console.log(`Converted ${dataArray.length} items to CSV (${csvData.length} characters)`);
        return csvData;
      } else {
        console.log("No data to convert to CSV");
        return "";
      }
    });

    const flattenedDataArrays = dataArrays.map((dataArray) => {
      return dataArray.map((item: any) => this.flattenObject(item));
    });

    return resultType === "csv" ? csvArrays : [...flattenedDataArrays];
  }

  private static buildRequestConfig(apiCall: any, baseUrl: string, token: string) {
    const path = String(apiCall.path || "");
    const url = `${baseUrl}${path}`;
    const requestConfig: any = {
      method: "get",
      url: url,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      timeout: 15000,
      maxContentLength: 1000000,
      maxBodyLength: 0
    };

    console.log(`Executing API call: GET ${url}`);
    return requestConfig;
  }
}
