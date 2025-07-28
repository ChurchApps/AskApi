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

  static getFormApiCallsInstructions(userQuery: string, routes: any): string {
    let contents = this.readFile("/config/instructions/formApiCalls.md");
    contents = contents.replace("{query}", userQuery);
    contents = contents.replace("{routesDetails}", JSON.stringify(routes));
    return contents;
  }

  static getAnswerQuestionInstructions(userQuery: string, data: any): string {
    let contents = this.readFile("/config/instructions/answerQuestion.md");
    contents = contents.replace("{query}", userQuery);
    contents = contents.replace("{data}", JSON.stringify(data));
    console.log("FINAL FULL QUESTION", contents);
    return contents;
  }

  /*
    static getAnswerQuestionInstructions(userQuery: string, jwts: any, routes: any): string {
      let contents = this.readFile("/config/instructions/answerQuestion.md");
      contents = contents.replace("{query}", userQuery);
  
      // Routes should be passed to filterRelevantJwts BEFORE stringifying
      // Filter JWTs to only include tokens for services used in routes
      const filteredJwts = this.filterRelevantJwts(jwts, routes);
      console.log("Debug - Routes type:", typeof routes);
      console.log("Debug - Routes structure:", JSON.stringify(routes).substring(0, 100));
      console.log("Debug - Filtered JWTs:", Object.keys(filteredJwts));
  
      // Now stringify routes for the instruction template
      contents = contents.replace("{routesDetails}", JSON.stringify(routes));
      contents = contents.replace("{jwts}", JSON.stringify(filteredJwts));
  
      return contents;
    }*/

  /**
   * Filters JWT tokens to only include tokens for services that are actually used in the routes
   * @param jwts Object containing all JWT tokens (e.g., { membershipApiToken: "...", attendanceApiToken: "..." })
   * @param routes Array of route objects with service property
   * @returns Filtered JWT object with only relevant tokens
   */
  static filterRelevantJwts(jwts: any, routes: any): any {
    console.log("JWTS are", jwts);
    console.log("filterRelevantJwts - Input routes type:", typeof routes);
    console.log("filterRelevantJwts - Input routes:", JSON.stringify(routes).substring(0, 200));

    if (!jwts || !routes) {
      console.log("filterRelevantJwts - No jwts or routes provided");
      return {};
    }

    // Handle nested array structure (routes might come as [[{...}]] from OpenAI)
    let flatRoutes = routes;
    if (Array.isArray(routes) && routes.length > 0 && Array.isArray(routes[0])) {
      console.log("filterRelevantJwts - Flattening nested array");
      flatRoutes = routes[0]; // Flatten nested array
    }

    if (!Array.isArray(flatRoutes)) {
      console.log("filterRelevantJwts - flatRoutes is not an array:", typeof flatRoutes);
      return {};
    }

    console.log("filterRelevantJwts - Processing", flatRoutes.length, "routes");

    // Extract unique services from routes
    const uniqueServices = new Set<string>();
    flatRoutes.forEach((route) => {
      if (route.service) {
        uniqueServices.add(route.service.toLowerCase());
        console.log("filterRelevantJwts - Found service:", route.service);
      }
    });

    // Filter JWTs based on services used
    const filteredJwts: any = {};
    uniqueServices.forEach((service) => {
      if (jwts[service]) {
        filteredJwts[service] = jwts[service];
        console.log("filterRelevantJwts - Including token:", service);
      } else if (!jwts[service]) {
        console.log("filterRelevantJwts - Token not found in jwts:", service);
      }
    });

    console.log("filterRelevantJwts - Final filtered tokens:", Object.keys(filteredJwts));
    return filteredJwts;
  }

  static readFile(filePath: string) {
    const instructionsPath = path.join(__dirname, "../.." + filePath);
    const instructions = fs.readFileSync(instructionsPath, "utf-8");
    return instructions;
  }
}
