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
