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

  static readFile(filePath: string) {
    const instructionsPath = path.join(__dirname, "../.." + filePath);
    const instructions = fs.readFileSync(instructionsPath, "utf-8");
    return instructions;
  }
}
