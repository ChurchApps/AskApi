import { InstructionsHelper } from "./InstructionsHelper";
import { OpenAiHelper } from "./OpenAiHelper";
import axios from "axios";

export class WorkflowHelper {
  /*
  Step 1 - Determine needed routes - Give it a list of available routes and descriptions and have it pick the ones needed for the job
  Step 2 - Read documentation on needed routes and return a list of API calls to be made with parameters
  Step 3 - Manual code to make API calls and return data.
  Step 4 - Parse the data and provide answer.
  */

  static async determineRoutes(userQuery: string) {
    const fullQuestion = InstructionsHelper.getDetermineRoutesInstructions(userQuery);
    //console.log("Full Question for WorkflowHelper:", fullQuestion);
    const result = await OpenAiHelper.execute(
      "You are an API routing assistant that selects specific routes based on user questions.",
      fullQuestion
    );
    //console.log("Result from OpenAiHelper:", result);
    return result;
  }

  static async formApiCalls(userQuery: string) {
    const routes = await WorkflowHelper.determineRoutes(userQuery);
    const fullQuestion = InstructionsHelper.getFormApiCallsInstructions(userQuery, routes);
    const result = await OpenAiHelper.executeText(
      "Determine the exact API calls and data needed to fetch the answer to the user's question.",
      fullQuestion
    );
    console.log("Result from OpenAiHelper for formApiCalls:", result);
    return result;
  }

  static async executeApiCalls(userQuery: string, jwts: any) {
    // Get the formed API calls
    const apiCallsText = await WorkflowHelper.formApiCalls(userQuery);

    // Parse the API calls JSON
    let apiCalls: any[];
    try {
      // Clean up the response if it has markdown formatting
      let cleanText = apiCallsText.trim();
      if (cleanText.startsWith("```json")) cleanText = cleanText.substring(7);
      if (cleanText.startsWith("```")) cleanText = cleanText.substring(3);
      if (cleanText.endsWith("```")) cleanText = cleanText.substring(0, cleanText.length - 3);
      cleanText = cleanText.trim();

      apiCalls = JSON.parse(cleanText);
      console.log("Parsed API calls:", apiCalls);
    } catch (error) {
      console.error("Failed to parse API calls JSON:", error);
      throw new Error("Failed to parse API calls from response");
    }

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
      const apiName = apiCall.apiName.toLowerCase();
      const baseUrl = baseUrls[apiName];

      if (!baseUrl) {
        console.error(`Unknown API: ${apiCall.apiName}`);
        results.push({
          error: `Unknown API: ${apiCall.apiName}`,
          apiCall: apiCall
        });
        continue;
      }

      console.log("Getting Toekn for API:", apiName);
      // Get the appropriate JWT token
      let token = "";
      if (apiName === "membershipapi") token = jwts.membershipapi;
      else if (apiName === "attendanceapi") token = jwts.attendanceapi;
      else if (apiName === "contentapi") token = jwts.contentapi;
      else if (apiName === "doingapi") token = jwts.doingapi;
      else if (apiName === "givingapi") token = jwts.givingapi;
      else if (apiName === "messagingapi") token = jwts.messagingapi;
      else if (apiName === "reportingapi") token = jwts.reportingapi;

      if (!token) {
        console.error(`No token found for ${apiCall.apiName}`);
        results.push({
          error: `No token provided for ${apiCall.apiName}`,
          apiCall: apiCall
        });
        continue;
      }

      try {
        const url = `${baseUrl}${apiCall.path}`;
        const requestConfig: any = {
          method: apiCall.method.toLowerCase(),
          url: url,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          timeout: 15000 // 15 second timeout
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

        const response = await axios(requestConfig);

        console.log(
          `API Response: ${response.status} - ${Array.isArray(response.data) ? `${response.data.length} items` : typeof response.data}`
        );

        results.push({
          success: true,
          apiCall: apiCall,
          status: response.status,
          data: response.data,
          dataType: Array.isArray(response.data) ? `array (${response.data.length} items)` : typeof response.data
        });
      } catch (error: any) {
        console.error(
          `API Error for ${apiCall.apiName} ${apiCall.path}:`,
          error.response?.status || "Failed",
          error.message
        );
        results.push({
          success: false,
          error: error.response?.data?.message || error.message || "API call failed",
          apiCall: apiCall,
          status: error.response?.status
        });
      }
    }

    console.log(`Executed ${apiCalls.length} API calls, ${results.filter((r) => r.success).length} successful`);

    // Extract just the data arrays from successful calls
    const dataArrays = results.filter((r) => r.success).map((r) => r.data);

    return dataArrays;
  }

  static async answerQuestion(userQuery: string, jwts: any) {
    const data = await WorkflowHelper.executeApiCalls(userQuery, jwts);
    const fullQuestion = InstructionsHelper.getAnswerQuestionInstructions(userQuery, data);
    const result = await OpenAiHelper.executeText(
      "Provide a simple short answer to the user's question.  No additional conversation.",
      fullQuestion
    );
    console.log("Result from OpenAiHelper for answerQuestion:", result);
    return result;
  }



  /*
  static async answerQuestion(userQuery: string, jwts: any) {
    const routes = await WorkflowHelper.determineRoutes(userQuery);
    const fullQuestion = InstructionsHelper.getAnswerQuestionInstructions(userQuery, jwts, routes);
    console.log("Full Question for answerQuestion:", fullQuestion);
    const result = await OpenAiHelper.executeText(
      "You call API routes to select specific data based on user questions.",
      fullQuestion
    );
    console.log("Result from OpenAiHelper for answerQuestion:", result);
    return result;
  }*/
}
