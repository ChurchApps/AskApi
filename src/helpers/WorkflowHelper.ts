
import { InstructionsHelper } from "./InstructionsHelper";
import { OpenAiHelper } from "./OpenAiHelper";


export class WorkflowHelper {

  static async determineRoutes(userQuery: string) {
    const fullQuestion = InstructionsHelper.getDetermineRoutesInstructions(userQuery);
    //console.log("Full Question for WorkflowHelper:", fullQuestion);
    const result = await OpenAiHelper.execute("You are an API routing assistant that selects specific routes based on user questions.", fullQuestion);
    //console.log("Result from OpenAiHelper:", result);
    return result;
  }

  static async answerQuestion(userQuery: string, jwts: any) {
    const routes = await WorkflowHelper.determineRoutes(userQuery);
    const fullQuestion = InstructionsHelper.getAnswerQuestionInstructions(userQuery, jwts, routes);
    console.log("Full Question for answerQuestion:", fullQuestion);
    const result = await OpenAiHelper.executeText("You call API routes to select specific data based on user questions.", fullQuestion);
    console.log("Result from OpenAiHelper for answerQuestion:", result);
    return result;
  }



}
