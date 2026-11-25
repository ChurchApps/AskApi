import { controller, httpPost } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController.js";
import { OpenAiHelper, InstructionsHelper, Environment } from "../helpers/index.js";
import { WorkflowHelper } from "../helpers/WorkflowHelper.js";
import { DataHelper } from "../helpers/DataHelper.js";
import { selectApiCalls, sessionToken } from "../helpers/ApiCallGuard.js";
import { normalizePeopleSearchFilters } from "../helpers/PeopleSearchFilters.js";
import { groupNameOf, isExcludeCall, LookupCall, LookupResult, mergeLookupFilters, personIdsOf, resolveGroupCall } from "../helpers/PeopleSearchLookups.js";

@controller("/query")
export class QueryController extends AskBaseController {
  @httpPost("/peopleOld")
  public async queryPeopleOld(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      if (!this.hasPeopleView(au)) return this.denyAccess(["Unauthorized"]);
      const { question } = req.body;
      await OpenAiHelper.initialize();
      return WorkflowHelper.queryPeople(question, sessionToken(au, req.body));
    });
  }

  @httpPost("/people")
  public async peopleSearch(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      if (!this.hasPeopleView(au)) return this.denyAccess(["Unauthorized"]);

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
        const lookups = await this.runLookups(result.additionalApiCalls, sessionToken(au, req.body));
        result.filters = mergeLookupFilters(result.filters, lookups);
        result.apiCallResults = lookups;
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

      return normalizePeopleSearchFilters(result.filters);
    });
  }

  // Runs each allowed lookup and turns its rows into one id condition. A /groupmembers call that
  // names the group is resolved to a groupId first. A call that fails or cannot be resolved counts
  // as "no answer", which mergeLookupFilters turns into a match for nobody, never for everyone.
  private async runLookups(apiCalls: LookupCall[], jwt: string): Promise<LookupResult[]> {
    const allowed = selectApiCalls(apiCalls);
    if (allowed.length < apiCalls.length) console.warn(`Rejected ${apiCalls.length - allowed.length} of ${apiCalls.length} API calls`);
    const hosts = Environment.apiHosts();
    const lookups: LookupResult[] = [];
    for (const call of allowed) {
      const exclude = isExcludeCall(call);
      let resolved: LookupCall | null = call;
      if (groupNameOf(call) !== null) {
        const groups = await DataHelper.executeSingleApiCall({ apiName: "MembershipApi", method: "GET", path: "/groups" }, jwt, hosts);
        resolved = groups.success && Array.isArray(groups.data) ? resolveGroupCall(call, groups.data) : null;
        if (!resolved) console.warn("No group matches:", groupNameOf(call));
      }
      if (!resolved) {
        lookups.push({ exclude, personIds: null });
        continue;
      }
      const r = await DataHelper.executeSingleApiCall(resolved, jwt, hosts);
      lookups.push({ exclude, personIds: r.success && Array.isArray(r.data) ? personIdsOf(r.data) : null });
    }
    return lookups;
  }

  @httpPost("/people-test")
  public async peopleSearchTest(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      if (!this.hasPeopleView(au)) return this.denyAccess(["Unauthorized"]);
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
