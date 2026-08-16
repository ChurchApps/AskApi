import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController.js";
import { OpenAiHelper, InstructionsHelper, ArrayHelper } from "../helpers/index.js";
import { WorkflowHelper } from "../helpers/WorkflowHelper.js";
import { DataHelper } from "../helpers/DataHelper.js";
import { sessionToken, validateApiCall } from "../helpers/ApiCallGuard.js";

@controller("/query")
export class QueryController extends AskBaseController {
  @httpPost("/peopleOld")
  public async queryPeopleOld(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.queryPeople(question, sessionToken(au, req.body));
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

      const instructions = InstructionsHelper.getPeopleAdvancedSearchWithApiCallsInstructions(query);
      const openAiResponse = await OpenAiHelper.executeText(
        "You are a helpful assistant that converts natural language queries into search filter and API calls.",
        instructions
      );

      let result: any;
      try {
        const jsonMatch = openAiResponse.match(/\{.*\}/s);
        const jsonStr = jsonMatch ? jsonMatch[0] : openAiResponse;
        result = JSON.parse(jsonStr);

        if (!result.filters || !Array.isArray(result.filters)) {
          throw new Error("Response must include filters array");
        }

        if (!result.additionalApiCalls || !Array.isArray(result.additionalApiCalls)) {
          result.additionalApiCalls = [];
        }
      } catch (parseError) {
        return { error: "Failed to parse OpenAI response", rawResponse: openAiResponse, parseError: (parseError as Error).message };
      }

      result.apiCallResults = [];

      if (result.additionalApiCalls && result.additionalApiCalls.length > 0) {
        try {
          console.log("Executing additional API calls:", result.additionalApiCalls.length);

          const validApiCalls = result.additionalApiCalls.filter((apiCall: any) => {
            const check = validateApiCall(apiCall);
            if (!check.ok) console.warn("Rejected API call:", check.error, apiCall);
            return check.ok;
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

          if (validApiCalls.length > 0) {
            const apiResults = await DataHelper.executeApiCalls(validApiCalls, sessionToken(au, req.body), "json");

            result.apiCallResults = apiResults;

            if (apiResults.length > 0) {
              const newFilters = [...result.filters];
              const successfullCallsData: any[] = [];
              apiResults.forEach((r: any) => {
                successfullCallsData.push(...r);
              });
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
            error: (apiError as Error).message,
            note: "This might be due to insufficient permissions or API access. Check if the user has access to the required APIs."
          };
        }
      }

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
    return this.actionWrapper(req, res, async (_au) => {
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
          const jsonMatch = openAiResponse.match(/\[.*\]/s);
          const jsonStr = jsonMatch ? jsonMatch[0] : openAiResponse;
          filters = JSON.parse(jsonStr);
          if (!Array.isArray(filters)) {
            throw new Error("Response is not an array");
          }
        } catch (parseError) {
          filters = [];
          error = (parseError as Error).message;
        }

        results.push({ query, filters, error, rawResponse: openAiResponse });
      }

      return { testResults: results };
    });
  }
}
