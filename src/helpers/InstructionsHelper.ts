import fs from "fs";
import path from "path";


export class InstructionsHelper {

  static getDetermineRoutesInstructions(userQuery: string): string {
    let contents = this.readFile("/config/instructions/determineRoutes.md");
    const routeIndex = this.readFile("/config/optimized/route-index.json");
    contents = contents.replace("{query}", userQuery);
    contents = contents.replace("{routes}", routeIndex);
    return contents;
  }

  static getAnswerQuestionInstructions(userQuery: string, jwts: any, routes: any): string {
    let contents = this.readFile("/config/instructions/answerQuestion.md");
    contents = contents.replace("{query}", userQuery);
    contents = contents.replace("{routesDetails}", JSON.stringify(routes));
    contents = contents.replace("{jwts}", JSON.stringify(jwts)); //todo: filter down to relevant jwts
    return contents;
  }

  static readFile(filePath: string) {
    const instructionsPath = path.join(__dirname, "../.." + filePath);
    const instructions = fs.readFileSync(instructionsPath, "utf-8");
    return instructions;
  }
}
