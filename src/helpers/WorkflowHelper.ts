
import { InstructionsHelper } from "./InstructionsHelper";
import { OpenAiHelper } from "./OpenAiHelper";


export class WorkflowHelper {

  static async determineRoutes(userQuery: string) {
    const fullQuestion = InstructionsHelper.getDetermineRoutesInstructions(userQuery);
    console.log("Full Question for WorkflowHelper:", fullQuestion);
    const result = await OpenAiHelper.execute(fullQuestion);
    console.log("Result from OpenAiHelper:", result);
    return result;
  }



}
