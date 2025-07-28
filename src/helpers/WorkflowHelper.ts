import { DataHelper } from "./DataHelper";
import { InstructionsHelper } from "./InstructionsHelper";
import { OpenAiHelper } from "./OpenAiHelper";

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

  private static parseApiCallsJson(apiCallsText: string): any[] {
    try {
      // Clean up the response if it has markdown formatting
      let cleanText = apiCallsText.trim();
      if (cleanText.startsWith("```json")) cleanText = cleanText.substring(7);
      if (cleanText.startsWith("```")) cleanText = cleanText.substring(3);
      if (cleanText.endsWith("```")) cleanText = cleanText.substring(0, cleanText.length - 3);
      cleanText = cleanText.trim();

      const apiCalls = JSON.parse(cleanText);
      console.log("Parsed API calls:", apiCalls);
      return apiCalls;
    } catch (error) {
      console.error("Failed to parse API calls JSON:", error);
      throw new Error("Failed to parse API calls from response");
    }
  }

  static async executeApiCalls(userQuery: string, jwts: any) {
    // Get the formed API calls
    const apiCallsText = await WorkflowHelper.formApiCalls(userQuery);
    const apiCalls = this.parseApiCallsJson(apiCallsText);
    return DataHelper.executeApiCalls(apiCalls, jwts);
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
}
