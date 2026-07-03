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

  static getQueryPeopleInstructions(userQuery: string, data: any): string {
    let contents = this.readFile("/config/instructions/queryPeople.md");
    contents = contents.replace("{query}", userQuery);
    contents = contents.replace("{data}", JSON.stringify(data));
    return contents;
  }

  static getPeopleAdvancedSearchInstructions(userQuery: string): string {
    let contents = this.readFile("/config/instructions/peopleAdvancedSearch.md");
    contents = contents.replace("{query}", userQuery);
    return contents;
  }

  static getPeopleAdvancedSearchWithApiCallsInstructions(userQuery: string): string {
    let contents = this.readFile("/config/instructions/peopleAdvancedSearchWithApiCalls.md");
    contents = contents.replace("{query}", userQuery);
    return contents;
  }

  static getCreateWebpageInstructions(description: string, churchId?: string, title?: string, url?: string): string {
    let contents = this.readFile("/config/instructions/createWebpage.md");
    contents = contents.replace("{query}", description);

    let context = "";
    if (churchId) {
      context += `Church ID: ${churchId}\n`;
    }
    if (title) {
      context += `Page Title: ${title}\n`;
    }
    if (url) {
      context += `Page URL: ${url}\n`;
    }

    contents = contents.replace("{context}", context);
    return contents;
  }

  static getGeneratePageInstructions(
    prompt: string,
    churchContext?: any,
    availableBlocks?: any[],
    availableElementTypes?: string[],
    constraints?: any
  ): string {
    let contents = this.readFile("/config/instructions/generatePage.md");

    contents = contents.replace("{prompt}", prompt);

    let contextStr = "## Church Information (USE THROUGHOUT THE PAGE)\n\n";
    if (churchContext) {
      if (churchContext.churchName) {
        contextStr += `**Church Name**: ${churchContext.churchName}\n`;
        contextStr += `IMPORTANT: Use "${churchContext.churchName}" in headings and content, NOT generic "Our Church"\n\n`;
      }
      if (churchContext.subdomain) {
        contextStr += `**Subdomain**: ${churchContext.subdomain}\n\n`;
      }
      if (churchContext.theme) {
        contextStr += "### Brand Colors (USE THESE EXACTLY)\n";
        if (churchContext.theme.primaryColor) {
          contextStr += `**Primary Color**: ${churchContext.theme.primaryColor}\n`;
          contextStr += `- Use for: section backgrounds (at least 1-2), heading colors, button backgrounds\n`;
        }
        if (churchContext.theme.secondaryColor) {
          contextStr += `**Secondary Color**: ${churchContext.theme.secondaryColor}\n`;
          contextStr += `- Use for: accent elements, secondary buttons, links\n`;
        }
        if (churchContext.theme.fonts) {
          contextStr += `**Fonts**: ${churchContext.theme.fonts}\n`;
        }
        contextStr += "\n";
      }
    } else {
      contextStr += "No specific church context provided - use generic church content.\n";
    }
    contents = contents.replace("{churchContext}", contextStr);

    let blocksStr = "";
    if (availableBlocks && availableBlocks.length > 0) {
      blocksStr = "The following reusable blocks are available:\n";
      availableBlocks.forEach((block) => {
        blocksStr += `- ${block.name} (ID: ${block.id}, Type: ${block.blockType})\n`;
      });
    } else {
      blocksStr = "No reusable blocks available.";
    }
    contents = contents.replace("{availableBlocks}", blocksStr);

    let elementTypesStr = "";
    if (availableElementTypes && availableElementTypes.length > 0) {
      elementTypesStr = "ONLY use these element types (any other types will cause errors):\n";
      elementTypesStr += availableElementTypes.join(", ");
    } else {
      elementTypesStr = "No element type restrictions.";
    }
    contents = contents.replace("{availableElementTypes}", elementTypesStr);

    let constraintsStr = "";
    if (constraints) {
      if (constraints.maxSections) {
        constraintsStr += `Maximum sections: ${constraints.maxSections}\n`;
      }
      if (constraints.preferredLayout) {
        constraintsStr += `Preferred layout: ${constraints.preferredLayout}\n`;
      }
    }
    if (!constraintsStr) {
      constraintsStr = "No specific constraints.";
    }
    contents = contents.replace("{constraints}", constraintsStr);

    return contents;
  }

  static getGenerateOutlineInstructions(
    prompt: string,
    churchContext?: any,
    availableElementTypes?: string[],
    constraints?: any
  ): string {
    let contents = this.readFile("/config/instructions/generatePageOutline.md");

    contents = contents.replace("{prompt}", prompt);

    let contextStr = "## Church Information\n\n";
    if (churchContext) {
      if (churchContext.churchName) {
        contextStr += `**Church Name**: ${churchContext.churchName}\n`;
        contextStr += `Use "${churchContext.churchName}" in content, NOT generic "Our Church"\n\n`;
      }
      if (churchContext.subdomain) {
        contextStr += `**Subdomain**: ${churchContext.subdomain}\n\n`;
      }
      if (churchContext.theme) {
        contextStr += "### Brand Colors\n";
        if (churchContext.theme.primaryColor) {
          contextStr += `**Primary Color**: ${churchContext.theme.primaryColor}\n`;
        }
        if (churchContext.theme.secondaryColor) {
          contextStr += `**Secondary Color**: ${churchContext.theme.secondaryColor}\n`;
        }
        contextStr += "\n";
      }
    } else {
      contextStr += "No specific church context provided.\n";
    }
    contents = contents.replace("{churchContext}", contextStr);

    let elementTypesStr = "";
    if (availableElementTypes && availableElementTypes.length > 0) {
      elementTypesStr = "Available element types:\n";
      elementTypesStr += availableElementTypes.join(", ");
    } else {
      elementTypesStr = "No element type restrictions.";
    }
    contents = contents.replace("{availableElementTypes}", elementTypesStr);

    let constraintsStr = "";
    if (constraints) {
      if (constraints.maxSections) {
        constraintsStr += `Maximum sections: ${constraints.maxSections}\n`;
      }
      if (constraints.preferredLayout) {
        constraintsStr += `Preferred layout: ${constraints.preferredLayout}\n`;
      }
    }
    if (!constraintsStr) {
      constraintsStr = "No specific constraints.";
    }
    contents = contents.replace("{constraints}", constraintsStr);

    return contents;
  }

  static getGenerateSiteInstructions(input: any, availableElementTypes?: string[]): string {
    let contents = this.readFile("/config/instructions/generateSite.md");

    let ctx = "";
    if (input?.churchName) ctx += `**Church Name**: ${input.churchName}\n`;
    if (input?.denomination) ctx += `**Denomination**: ${input.denomination}\n`;
    if (input?.description) ctx += `**Description**: ${input.description}\n`;
    if (input?.tone) ctx += `**Tone**: ${input.tone}\n`;
    if (Array.isArray(input?.audiences) && input.audiences.length > 0) {
      ctx += `**Audiences**: ${input.audiences.join(", ")}\n`;
    }
    if (input?.serviceTimesText) ctx += `**Service Times**: ${input.serviceTimesText}\n`;
    if (!ctx) ctx = "No onboarding details provided - use warm, generic church content.\n";
    contents = contents.replace("{siteContext}", ctx);

    let elementTypesStr = "";
    if (availableElementTypes && availableElementTypes.length > 0) {
      elementTypesStr = "Available element types:\n" + availableElementTypes.join(", ");
    } else {
      elementTypesStr = "No element type restrictions.";
    }
    contents = contents.replace("{availableElementTypes}", elementTypesStr);

    return contents;
  }

  static getRewriteSectionInstructions(section: any, instruction?: string, churchName?: string, _availableElementTypes?: string[]): string {
    let contents = this.readFile("/config/instructions/rewriteSection.md");

    contents = contents.replace("{instruction}", instruction && instruction.trim().length > 0 ? instruction.trim() : "No specific instruction - improve clarity and warmth without changing meaning.");

    let ctx = "";
    if (churchName) ctx += `**Church Name**: ${churchName}\n`;
    if (!ctx) ctx = "No specific church context provided.\n";
    contents = contents.replace("{churchContext}", ctx);

    contents = contents.replace("{section}", JSON.stringify(section, null, 2));
    return contents;
  }

  static getGenerateAltTextInstructions(pageContext?: string): string {
    let contents = this.readFile("/config/instructions/generateAltText.md");
    contents = contents.replace("{pageContext}", pageContext && pageContext.trim().length > 0 ? pageContext.trim() : "No page context provided.");
    return contents;
  }

  static getGenerateMetaDescriptionInstructions(pageTitle: string, pageContentText: string, churchName?: string): string {
    let contents = this.readFile("/config/instructions/generateMetaDescription.md");
    contents = contents.replace("{pageTitle}", pageTitle || "Untitled");
    contents = contents.replace("{churchName}", churchName || "the church");
    contents = contents.replace("{pageContentText}", pageContentText || "(no content provided)");
    return contents;
  }

  static getGenerateSectionInstructions(sectionOutline: any, churchContext?: any, availableElementTypes?: string[], pageContext?: any): string {
    let contents = this.readFile("/config/instructions/generateSection.md");

    contents = contents.replace("{sectionOutline}", JSON.stringify(sectionOutline, null, 2));

    let contextStr = "## Church Information\n\n";
    if (churchContext) {
      if (churchContext.churchName) {
        contextStr += `**Church Name**: ${churchContext.churchName}\n\n`;
      }
      if (churchContext.theme) {
        contextStr += "### Brand Colors\n";
        if (churchContext.theme.primaryColor) {
          contextStr += `**Primary Color**: ${churchContext.theme.primaryColor}\n`;
        }
        if (churchContext.theme.secondaryColor) {
          contextStr += `**Secondary Color**: ${churchContext.theme.secondaryColor}\n`;
        }
        contextStr += "\n";
      }
    } else {
      contextStr += "No specific church context provided.\n";
    }
    contents = contents.replace("{churchContext}", contextStr);

    let elementTypesStr = "";
    if (availableElementTypes && availableElementTypes.length > 0) {
      elementTypesStr = "Available element types:\n";
      elementTypesStr += availableElementTypes.join(", ");
    } else {
      elementTypesStr = "No element type restrictions.";
    }
    contents = contents.replace("{availableElementTypes}", elementTypesStr);

    let pageContextStr = "";
    if (pageContext) {
      pageContextStr += `**Page Title**: ${pageContext.title || "Untitled"}\n`;
      pageContextStr += `**Total Sections**: ${pageContext.totalSections || "Unknown"}\n`;
      pageContextStr += `**This Section Index**: ${pageContext.sectionIndex ?? "Unknown"} (0-based)\n`;
    } else {
      pageContextStr = "No page context provided.";
    }
    contents = contents.replace("{pageContext}", pageContextStr);

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

  /** Filters JWT tokens to include only services used in the routes. */
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
    const currentFileUrl = new URL(import.meta.url);
    // Fix Windows drive letter
    const currentDir = path.dirname(currentFileUrl.pathname.replace(/^\/([A-Z]:)/, "$1"));
    const instructionsPath = path.join(currentDir, "../.." + filePath);
    const instructions = fs.readFileSync(instructionsPath, "utf-8");
    return instructions;
  }
}
