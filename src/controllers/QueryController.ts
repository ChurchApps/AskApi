import { controller, httpGet, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController.js";
import { OpenAiHelper, InstructionsHelper, Environment, ArrayHelper } from "../helpers/index.js";
import { WorkflowHelper } from "../helpers/WorkflowHelper.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@controller("/query")
export class QueryController extends AskBaseController {
  @httpGet("/test")
  public async test(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperAnon(req, res, async () => {
      const environment = process.env.APP_ENV;
      let file = "dev.json";
      if (environment === "staging") file = "staging.json";
      if (environment === "prod") file = "prod.json";

      const relativePath = "../../config/" + file;
      const physicalPath = path.resolve(__dirname, relativePath);

      const json = fs.readFileSync(physicalPath, "utf8");
      const jsonData = JSON.parse(json);

      const appName = jsonData.appName as string;
      const appEnv = jsonData.appEnv as string;
      const connectionString = `/${appEnv}/${appName}/connectionString`;

      return { environment, physicalPath, appName, appEnv, connectionString, openAIKey: Environment.openAiApiKey };
    });
  }

  @httpGet("/test2")
  public async test2(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapperAnon(req, res, async () => {
      return { hello: "world" };
    });
  }

  @httpPost("/peopleOld")
  public async queryPeopleOld(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question, jwts } = req.body;
      await OpenAiHelper.initialize();

      // Use the natural language query to search for people
      // This will analyze attendance, donations, and other data to filter people
      const result = await WorkflowHelper.queryPeople(question, jwts);

      return result;
    });
  }

  @httpPost("/people")
  public async peopleSearch(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { query } = req.body;

      if (!query) {
        return { error: "Query is required" };
      }

      await OpenAiHelper.initialize();

      // Get the instruction prompt
      const instructions = InstructionsHelper.getPeopleAdvancedSearchWithApiCallsInstructions(query);

      // Call OpenAI to convert the query
      const openAiResponse = await OpenAiHelper.executeText(
        "You are a helpful assistant that converts natural language queries into search filter and API calls.",
        instructions
      );

      let result: any;
      try {
        // Try to extract JSON from the response
        const jsonMatch = openAiResponse.match(/\{.*\}/s);
        const jsonStr = jsonMatch ? jsonMatch[0] : openAiResponse;
        result = JSON.parse(jsonStr);

        // Validate structure - ensure we have filters
        if (!result.filters || !Array.isArray(result.filters)) {
          throw new Error("Response must include filters array");
        }

        // Ensure additionalApiCalls exists (default to empty array if not present)
        if (!result.additionalApiCalls || !Array.isArray(result.additionalApiCalls)) {
          result.additionalApiCalls = [];
        }
      } catch (parseError) {
        return {
          error: "Failed to parse OpenAI response",
          rawResponse: openAiResponse,
          parseError: parseError.message
        };
      }

      // Initialize apiCallResults to ensure it's always present
      result.apiCallResults = [];

      // If there are additional API calls, execute them
      if (result.additionalApiCalls && result.additionalApiCalls.length > 0) {
        try {
          console.log("Executing additional API calls:", result.additionalApiCalls.length);

          // Validate API call structure
          const validApiCalls = result.additionalApiCalls.filter((apiCall: any) => {
            const isValid = apiCall.apiName && apiCall.method && apiCall.path;
            if (!isValid) {
              console.warn("Invalid API call structure:", apiCall);
            }
            return isValid;
          });

          if (validApiCalls.length === 0) {
            console.warn("No valid API calls found, skipping execution");
            result.apiCallError = {
              message: "No valid API calls found",
              error: "All API calls had invalid structure"
            };
          } else if (validApiCalls.length < result.additionalApiCalls.length) {
            console.warn(`Filtered ${result.additionalApiCalls.length - validApiCalls.length} invalid API calls`);
            result.additionalApiCalls = validApiCalls;
          }

          // Only proceed if we have valid API calls
          if (validApiCalls.length > 0) {
            // Import DataHelper dynamically to avoid circular dependencies
            const { DataHelper } = await import("../helpers/DataHelper");

            // Create JWT tokens object using the current user's JWT for all APIs
            // This assumes the user has access to the APIs they're querying
            // TODO: Get the JWT from the user, currently there are no permissions in the au object
            const jwts = {
              membershipapi: au.jwt,
              attendanceapi: au.jwt,
              contentapi: au.jwt,
              doingapi: au.jwt,
              givingapi: au.jwt,
              messagingapi: au.jwt,
              reportingapi: au.jwt
            };

            // Execute the API calls
            const apiResults = await DataHelper.executeApiCalls(validApiCalls, jwts, "json");

            // Add the API results to the response
            result.apiCallResults = apiResults;

            // Log success/failure summary
            // const successfulCalls = apiResults.filter((r: any) => r.success);
            // const failedCalls = apiResults.filter((r: any) => !r.success);

            // console.log(`API calls executed: ${successfulCalls.length} successful, ${failedCalls.length} failed`);
            if (apiResults.length > 0) {
              const newFilters = [...result.filters];
              const successfullCallsData: any[] = [];
              apiResults.forEach((r: any) => {
                successfullCallsData.push(...r);
              });
              // we need personIds to send to the advanced search in membership api
              const personIds = ArrayHelper.getUniqueValues(successfullCallsData, "personId").filter((f) => f !== null);
              if (personIds.length > 0) {
                newFilters.push({ field: "id", operator: "equals", value: personIds.join(",") });
                result.filters = newFilters;
              }
            }

            if (apiResults.length > 0) {
              console.log(
                "No valid API calls to execute"
                // failedCalls.map((f: any) => ({
                //   api: f.apiCall?.apiName,
                //   path: f.apiCall?.path,
                //   error: f.error
                // }))
              );
            }
          } else {
            console.log("No valid API calls to execute");
            result.apiCallResults = [];
          }
        } catch (apiError) {
          console.error("Error executing additional API calls:", apiError);
          result.apiCallError = {
            message: "Failed to execute additional API calls",
            error: apiError.message,
            note: "This might be due to insufficient permissions or API access. Check if the user has access to the required APIs."
          };
        }
      }

      // Add summary information to the response
      result.summary = {
        query: query,
        hasFilters: result.filters && result.filters.length > 0,
        hasAdditionalApiCalls: result.additionalApiCalls && result.additionalApiCalls.length > 0,
        apiCallsExecuted: result.additionalApiCalls ? result.additionalApiCalls.length : 0,
        hasApiCallResults: result.apiCallResults && result.apiCallResults.length > 0,
        hasApiCallErrors: result.apiCallError ? true : false,
        responseFormat:
          "The response contains both people search filters and results from additional API calls when applicable",
        note: "apiCallResults will always be present - empty array if no API calls were made, or populated with results if API calls were executed"
      };

      // Ensure the response always contains both filters and apiCallResults
      // - filters: array of search conditions for people search
      // - apiCallResults: array of results from additional API calls (empty if none executed)
      console.log("Final response structure:", {
        hasFilters: result.filters && result.filters.length > 0,
        filtersCount: result.filters ? result.filters.length : 0,
        hasApiCallResults: result.apiCallResults && result.apiCallResults.length > 0,
        apiCallResultsCount: result.apiCallResults ? result.apiCallResults.length : 0
      });

      return result.filters;
    });
  }

  @httpPost("/people-test")
  public async peopleSearchTest(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // Test multiple queries
      const testQueries = [
        "Find all men",
        "Show me teenagers",
        "Married women over 40",
        "People in Dallas",
        "Single men under 30",
        "Members with birthdays in January",
        "Find people named John",
        "Young adults who are visitors"
      ];

      await OpenAiHelper.initialize();
      const results = [];

      for (const query of testQueries) {
        const instructions = InstructionsHelper.getPeopleAdvancedSearchInstructions(query);
        const openAiResponse = await OpenAiHelper.executeText(
          "You are a helpful assistant that converts natural language queries into search filter arrays.",
          instructions
        );

        let filters: any[];
        let error: string | null = null;

        try {
          // Try to extract JSON from the response
          const jsonMatch = openAiResponse.match(/\[.*\]/s);
          const jsonStr = jsonMatch ? jsonMatch[0] : openAiResponse;
          filters = JSON.parse(jsonStr);
          if (!Array.isArray(filters)) {
            throw new Error("Response is not an array");
          }
        } catch (parseError) {
          filters = [];
          error = parseError.message;
        }

        results.push({
          query,
          filters,
          error,
          rawResponse: openAiResponse
        });
      }

      return { testResults: results };
    });
  }
}
