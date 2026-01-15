import { OpenAiHelper } from "./OpenAiHelper.js";
import { InstructionsHelper } from "./InstructionsHelper.js";

export class WebsiteHelper {
  public static async generatePageFromDescription(
    description: string,
    churchId?: string,
    title?: string,
    url?: string
  ): Promise<any> {
    const maxRetries = 3;
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const systemPrompt = this.buildSystemPrompt(description, churchId, title, url);
        const response = await OpenAiHelper.executeWebsiteGeneration(systemPrompt, "");

        console.log(`Attempt ${attempt} - AI Response (first 200 chars):`, response.substring(0, 200));

        const pageJson = this.extractAndParseJson(response);
        console.log("Parsed JSON structure:", {
          hasId: !!pageJson.id,
          hasSections: !!pageJson.sections,
          sectionsLength: pageJson.sections?.length || 0,
          firstSectionElementsLength: pageJson.sections?.[0]?.elements?.length || 0
        });

        // Replace all IDs with unique generated ones
        this.replaceIdsWithUniqueOnes(pageJson);
        console.log("Replaced IDs with unique generated ones");

        this.validatePageStructure(pageJson);
        this.validateIdStructure(pageJson);

        console.log(`Successfully generated page JSON on attempt ${attempt}`);
        return pageJson;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error.message);
        lastError = error;

        if (attempt === maxRetries) {
          break;
        }

        // Wait briefly before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    throw new Error(
      `Failed to generate page from description after ${maxRetries} attempts. Last error: ${lastError.message}`
    );
  }

  public static async generatePageFromPromptWithContext(
    prompt: string,
    churchId: string,
    churchContext?: any,
    availableBlocks?: any[],
    availableElementTypes?: string[],
    constraints?: any
  ): Promise<any> {
    const maxRetries = 2; // Reduced to stay within API Gateway 29s timeout
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Build enhanced system prompt with full context
        const systemPrompt = InstructionsHelper.getGeneratePageInstructions(
          prompt,
          churchContext,
          availableBlocks,
          availableElementTypes,
          constraints
        );

        console.log(`Attempt ${attempt} - Generating page with enhanced context`);
        const response = await OpenAiHelper.executeWebsiteGeneration(systemPrompt, "");

        console.log(`Attempt ${attempt} - AI Response (first 200 chars):`, response.substring(0, 200));

        const pageJson = this.extractAndParseJson(response);
        console.log("Parsed JSON structure:", {
          hasTitle: !!pageJson.title,
          hasLayout: !!pageJson.layout,
          hasSections: !!pageJson.sections,
          sectionsCount: pageJson.sections?.length || 0
        });

        // Validate structure
        this.validateGeneratedPageStructure(pageJson, availableElementTypes);

        // Sanitize and ensure proper data types
        this.sanitizePageData(pageJson);

        console.log(`Successfully generated page on attempt ${attempt}`);
        return pageJson;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error.message);
        lastError = error;

        if (attempt === maxRetries) {
          break;
        }

        // Wait briefly before retrying (reduced delay for timeout constraints)
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    throw new Error(
      `Failed to generate page from prompt after ${maxRetries} attempts. Last error: ${lastError.message}`
    );
  }

  /**
   * Generates a page outline with section descriptions and content hints.
   * This is a lightweight call that returns structure without full element content.
   * Uses Sonnet model for better content strategy and page planning.
   */
  public static async generatePageOutline(
    prompt: string,
    churchContext?: any,
    availableElementTypes?: string[],
    constraints?: any
  ): Promise<any> {
    const maxRetries = 2;
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const systemPrompt = InstructionsHelper.getGenerateOutlineInstructions(
          prompt,
          churchContext,
          availableElementTypes,
          constraints
        );

        console.log(`Outline generation attempt ${attempt}`);
        // Use Claude 3.5 Sonnet for outline - smarter than Haiku but still fast
        // Claude 3.5 Sonnet is faster than Claude Sonnet 4 and stays within 29s timeout
        // The outline is small (~1K tokens), so cost impact is minimal (~$0.01)
        const response = await OpenAiHelper.executeWebsiteGeneration(systemPrompt, "", "anthropic/claude-3.5-sonnet");

        console.log(`Outline response (first 300 chars):`, response.substring(0, 300));

        const outlineJson = this.extractAndParseJson(response);

        // Validate outline structure
        this.validateOutlineStructure(outlineJson);

        console.log(`Successfully generated outline with ${outlineJson.sections?.length || 0} sections`);
        return outlineJson;
      } catch (error) {
        console.error(`Outline attempt ${attempt} failed:`, error.message);
        lastError = error;

        if (attempt === maxRetries) {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    throw new Error(
      `Failed to generate page outline after ${maxRetries} attempts. Last error: ${lastError.message}`
    );
  }

  /**
   * Generates a single section's full content based on the section outline.
   * Uses sonnet model for better quality content generation.
   */
  public static async generateSectionContent(
    sectionOutline: any,
    churchContext?: any,
    availableElementTypes?: string[],
    pageContext?: any
  ): Promise<any> {
    const maxRetries = 2;
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const systemPrompt = InstructionsHelper.getGenerateSectionInstructions(
          sectionOutline,
          churchContext,
          availableElementTypes,
          pageContext
        );

        console.log(`Section generation attempt ${attempt} for section: ${sectionOutline.id}`);
        // Use haiku for section content - fast and cost-effective
        // Haiku: ~$0.25/1M input, $1.25/1M output vs Sonnet: ~$3/1M input, $15/1M output
        const response = await OpenAiHelper.executeWebsiteGeneration(systemPrompt, "");

        console.log(`Section response (first 200 chars):`, response.substring(0, 200));

        const sectionJson = this.extractAndParseJson(response);

        // Validate section structure
        this.validateSectionStructure(sectionJson, availableElementTypes);

        // Sanitize section data
        this.sanitizeSectionData(sectionJson);

        console.log(`Successfully generated section with ${sectionJson.elements?.length || 0} elements`);
        return sectionJson;
      } catch (error) {
        console.error(`Section attempt ${attempt} failed:`, error.message);
        lastError = error;

        if (attempt === maxRetries) {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    throw new Error(
      `Failed to generate section content after ${maxRetries} attempts. Last error: ${lastError.message}`
    );
  }

  /**
   * Validates the outline structure
   */
  private static validateOutlineStructure(outlineJson: any): void {
    if (!outlineJson || typeof outlineJson !== "object") {
      throw new Error("Invalid outline JSON: Not an object");
    }

    if (!outlineJson.title || typeof outlineJson.title !== "string") {
      throw new Error("Invalid outline: Missing or invalid title");
    }

    if (!outlineJson.sections || !Array.isArray(outlineJson.sections)) {
      throw new Error("Invalid outline: Missing or invalid sections array");
    }

    if (outlineJson.sections.length === 0) {
      throw new Error("Invalid outline: Must have at least one section");
    }

    // Validate each section has required outline fields
    outlineJson.sections.forEach((section: any, index: number) => {
      if (!section.id || typeof section.id !== "string") {
        throw new Error(`Invalid outline section ${index}: Missing id`);
      }
      if (!section.purpose || typeof section.purpose !== "string") {
        throw new Error(`Invalid outline section ${index}: Missing purpose`);
      }
    });
  }

  /**
   * Validates a generated section structure
   */
  private static validateSectionStructure(sectionJson: any, availableElementTypes?: string[]): void {
    if (!sectionJson || typeof sectionJson !== "object") {
      throw new Error("Invalid section JSON: Not an object");
    }

    if (!sectionJson.elements || !Array.isArray(sectionJson.elements)) {
      throw new Error("Invalid section: Missing or invalid elements array");
    }

    // Validate element types if available
    if (availableElementTypes && sectionJson.elements.length > 0) {
      sectionJson.elements.forEach((element: any, elemIndex: number) => {
        if (!element.elementType) {
          throw new Error(`Invalid element ${elemIndex}: Missing elementType`);
        }
        if (!availableElementTypes.includes(element.elementType)) {
          console.warn(`Warning: Element ${elemIndex} has unknown type '${element.elementType}'. Replacing with 'text'.`);
          element.elementType = "text";
        }
      });
    }
  }

  /**
   * Sanitizes section data to ensure proper format
   */
  private static sanitizeSectionData(sectionJson: any): void {
    // Ensure zone exists
    if (!sectionJson.zone) {
      sectionJson.zone = "main";
    }

    // Ensure answersJSON and stylesJSON are strings
    if (sectionJson.answersJSON && typeof sectionJson.answersJSON !== "string") {
      sectionJson.answersJSON = JSON.stringify(sectionJson.answersJSON);
    } else if (!sectionJson.answersJSON) {
      sectionJson.answersJSON = "{}";
    }

    if (sectionJson.stylesJSON && typeof sectionJson.stylesJSON !== "string") {
      sectionJson.stylesJSON = JSON.stringify(sectionJson.stylesJSON);
    }

    if (sectionJson.animationsJSON && typeof sectionJson.animationsJSON !== "string") {
      sectionJson.animationsJSON = JSON.stringify(sectionJson.animationsJSON);
    }

    // Sanitize elements and filter out empty rows/containers
    if (Array.isArray(sectionJson.elements)) {
      sectionJson.elements = this.filterAndSanitizeElements(sectionJson.elements);
      // Re-number sort order after filtering
      sectionJson.elements.forEach((element: any, idx: number) => {
        element.sort = idx;
      });
    }
  }

  /**
   * Filters out empty container elements (rows, boxes, carousels) and sanitizes the rest
   */
  private static filterAndSanitizeElements(elements: any[]): any[] {
    return elements.filter((element: any) => {
      // Check if this is a container element (row, box, carousel)
      const isContainer = ["row", "box", "carousel"].includes(element.elementType);

      // If it's a container, check if it has children
      if (isContainer) {
        if (!Array.isArray(element.elements) || element.elements.length === 0) {
          console.warn(`Removing empty ${element.elementType} element`);
          return false; // Filter out empty containers
        }
        // Recursively filter nested elements
        element.elements = this.filterAndSanitizeElements(element.elements);
        // If all children were filtered out, remove this container too
        if (element.elements.length === 0) {
          console.warn(`Removing ${element.elementType} element after all children were filtered`);
          return false;
        }
        // Re-number child sort order
        element.elements.forEach((child: any, idx: number) => {
          child.sort = idx;
        });
      }

      // Sanitize this element
      if (element.sort === undefined || element.sort === null) {
        element.sort = 0;
      }

      if (element.answersJSON && typeof element.answersJSON !== "string") {
        element.answersJSON = JSON.stringify(element.answersJSON);
      } else if (!element.answersJSON) {
        element.answersJSON = "{}";
      }

      if (element.stylesJSON && typeof element.stylesJSON !== "string") {
        element.stylesJSON = JSON.stringify(element.stylesJSON);
      }

      if (element.animationsJSON && typeof element.animationsJSON !== "string") {
        element.animationsJSON = JSON.stringify(element.animationsJSON);
      }

      return true; // Keep non-empty elements
    });
  }

  /**
   * Flattens a hierarchical page structure into separate arrays for page, sections, and elements
   * @param pageData The hierarchical page data with nested sections and elements
   * @returns Object containing flat arrays of page, sections, and elements
   */
  /**
   * Example usage:
   *
   * Input:
   * {
   *   id: "page-123456",
   *   title: "Home Page",
   *   sections: [
   *     {
   *       id: "section-001",
   *       type: "hero",
   *       elements: [
   *         { id: "elem-001", type: "heading", content: "Welcome" },
   *         { id: "elem-002", type: "text", content: "Hello world" }
   *       ],
   *       sections: [
   *         {
   *           id: "section-002",
   *           type: "content",
   *           elements: [
   *             { id: "elem-003", type: "image", src: "image.jpg" }
   *           ]
   *         }
   *       ]
   *     }
   *   ]
   * }
   *
   * Output:
   * {
   *   page: { id: "page-123456", title: "Home Page" },
   *   sections: [
   *     { id: "section-001", type: "hero" },
   *     { id: "section-002", type: "content", parentSectionId: "section-001" }
   *   ],
   *   elements: [
   *     { id: "elem-001", type: "heading", content: "Welcome", sectionId: "section-001" },
   *     { id: "elem-002", type: "text", content: "Hello world", sectionId: "section-001" },
   *     { id: "elem-003", type: "image", src: "image.jpg", sectionId: "section-002" }
   *   ]
   * }
   */

  /**
   * Flattens a hierarchical page structure into separate arrays for page, sections, and elements
   * @param pageData The hierarchical page data with nested sections and elements
   * @returns Object containing flat arrays of page, sections, and elements
   */
  public static flattenPageStructure(pageData: any): { page: any; sections: any[]; elements: any[] } {
    console.log("flattenPageStructure called with type:", typeof pageData);
    console.log("flattenPageStructure called with:", JSON.stringify(pageData).substring(0, 200));

    if (!pageData) {
      throw new Error("Page data is required");
    }

    // If pageData is a string, try to parse it
    if (typeof pageData === "string") {
      try {
        pageData = JSON.parse(pageData);
        console.log("Parsed string to object");
      } catch (e) {
        throw new Error("Page data is a string but not valid JSON");
      }
    }

    // Create a copy of the page without sections
    const page = { ...pageData };
    delete page.sections;

    const sections: any[] = [];
    const elements: any[] = [];

    // Recursive function to process sections and their elements
    const processSections = (sectionsArray: any[], parentSectionId?: string) => {
      if (!Array.isArray(sectionsArray)) {
        console.error("processSections called with non-array:", sectionsArray);
        return;
      }

      sectionsArray.forEach((section: any) => {
        // Create a copy of the section without elements and child sections
        const flatSection = { ...section };
        delete flatSection.elements;
        delete flatSection.sections;

        // Add parent section reference if applicable
        if (parentSectionId) {
          flatSection.parentSectionId = parentSectionId;
        }

        sections.push(flatSection);

        // Process elements in this section
        if (Array.isArray(section.elements)) {
          section.elements.forEach((element: any) => {
            // Create a copy of the element without child elements
            const flatElement = { ...element };
            delete flatElement.elements;

            // Ensure sectionId is set (don't override if already exists)
            if (!flatElement.sectionId) {
              flatElement.sectionId = section.id;
            }

            elements.push(flatElement);

            // Process child elements if they exist
            if (Array.isArray(element.elements)) {
              const processChildElements = (childElements: any[], parentElementId: string) => {
                childElements.forEach((childElement: any) => {
                  const flatChildElement = { ...childElement };
                  delete flatChildElement.elements;

                  flatChildElement.sectionId = section.id;
                  flatChildElement.parentElementId = parentElementId;

                  elements.push(flatChildElement);

                  // Recursively process nested child elements
                  if (Array.isArray(childElement.elements)) {
                    processChildElements(childElement.elements, childElement.id);
                  }
                });
              };

              processChildElements(element.elements, element.id);
            }
          });
        }

        // Process child sections if they exist
        if (Array.isArray(section.sections)) {
          processSections(section.sections, section.id);
        }
      });
    };

    // Start processing from the top-level sections
    try {
      if (Array.isArray(pageData.sections)) {
        console.log("Processing", pageData.sections.length, "top-level sections");
        processSections(pageData.sections);
      } else {
        console.log("pageData.sections is not an array:", typeof pageData.sections);
      }
    } catch (error) {
      console.error("Error during section processing:", error);
      throw error;
    }

    console.log("Final counts - sections:", sections.length, "elements:", elements.length);

    return {
      page,
      sections,
      elements
    };
  }

  private static extractAndParseJson(response: string): any {
    // Strategy 1: Try to find complete JSON object with balanced braces
    const balancedJsonMatch = this.extractBalancedJson(response);
    if (balancedJsonMatch) {
      try {
        return JSON.parse(balancedJsonMatch);
      } catch (error) {
        console.warn("Balanced JSON extraction failed:", error.message);
      }
    }

    // Strategy 2: Simple regex match for JSON-like structure
    const simpleMatch = response.match(/\{[\s\S]*\}/);
    if (simpleMatch) {
      try {
        return JSON.parse(simpleMatch[0]);
      } catch (error) {
        console.warn("Simple regex match failed:", error.message);
      }
    }

    // Strategy 3: Look for JSON between triple backticks or code blocks
    const codeBlockMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      try {
        return JSON.parse(codeBlockMatch[1].trim());
      } catch (error) {
        console.warn("Code block extraction failed:", error.message);
      }
    }

    // Strategy 4: Try to clean the response and extract JSON
    const cleanedResponse = response
      .replace(/^[^{]*/, "") // Remove everything before first {
      .replace(/[^}]*$/, "") // Remove everything after last }
      .trim();

    if (cleanedResponse.startsWith("{") && cleanedResponse.endsWith("}")) {
      try {
        return JSON.parse(cleanedResponse);
      } catch (error) {
        console.warn("Cleaned response parsing failed:", error.message);
      }
    }

    throw new Error("No valid JSON found in AI response. Response content: " + response.substring(0, 500));
  }

  /**
   * Extracts JSON with balanced braces to avoid incomplete JSON
   * @param text Text to search for JSON
   * @returns Extracted JSON string or null
   */
  private static extractBalancedJson(text: string): string | null {
    const start = text.indexOf("{");
    if (start === -1) return null;

    let braceCount = 0;
    let inString = false;
    let escaped = false;

    for (let i = start; i < text.length; i++) {
      const char = text[i];

      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\" && inString) {
        escaped = true;
        continue;
      }

      if (char === '"' && !escaped) {
        inString = !inString;
        continue;
      }

      if (!inString) {
        if (char === "{") {
          braceCount++;
        } else if (char === "}") {
          braceCount--;
          if (braceCount === 0) {
            return text.substring(start, i + 1);
          }
        }
      }
    }

    return null;
  }

  /**
   * Validates the basic structure of the page JSON
   * @param pageJson Parsed page JSON object
   */
  private static validatePageStructure(pageJson: any): void {
    if (!pageJson || typeof pageJson !== "object") {
      throw new Error("Invalid JSON: Not an object");
    }

    if (!pageJson.id || typeof pageJson.id !== "string") {
      throw new Error("Invalid page structure: Missing or invalid id field");
    }

    if (!pageJson.sections || !Array.isArray(pageJson.sections)) {
      throw new Error("Invalid page structure: Missing or invalid sections array");
    }

    if (pageJson.sections.length === 0) {
      throw new Error("Invalid page structure: Page must have at least one section");
    }

    // Validate each section has required fields
    pageJson.sections.forEach((section: any, index: number) => {
      if (!section.id || typeof section.id !== "string") {
        throw new Error(`Invalid section ${index}: Missing or invalid id field`);
      }

      if (!section.elements || !Array.isArray(section.elements)) {
        throw new Error(`Invalid section ${index}: Missing or invalid elements array`);
      }
    });
  }

  /**
   * Validates that all IDs are exactly 11 characters and use valid characters
   * @param pageJson Parsed page JSON object
   */
  private static validateIdStructure(pageJson: any): void {
    const validIdPattern = /^[A-Za-z0-9-_]{11}$/;
    const seenIds = new Set<string>();

    // Validate page ID
    if (!validIdPattern.test(pageJson.id)) {
      throw new Error(
        `Invalid page ID '${pageJson.id}': Must be exactly 11 characters using A-Za-z0-9 and hyphens only`
      );
    }
    seenIds.add(pageJson.id);

    // Validate section and element IDs
    pageJson.sections.forEach((section: any, sectionIndex: number) => {
      if (!validIdPattern.test(section.id)) {
        throw new Error(
          `Invalid section ID '${section.id}' at index ${sectionIndex}: Must be exactly 11 characters using A-Za-z0-9 and hyphens only`
        );
      }

      if (seenIds.has(section.id)) {
        throw new Error(`Duplicate ID '${section.id}' found in section ${sectionIndex}`);
      }
      seenIds.add(section.id);

      // Validate elements recursively
      this.validateElementIds(section.elements, seenIds, `section[${sectionIndex}]`);
    });
  }

  /**
   * Recursively validates element IDs
   * @param elements Array of elements to validate
   * @param seenIds Set of already seen IDs
   * @param context Context string for error messages
   */
  private static validateElementIds(elements: any[], seenIds: Set<string>, context: string): void {
    const validIdPattern = /^[A-Za-z0-9-_]{11}$/;

    elements.forEach((element: any, elementIndex: number) => {
      if (!validIdPattern.test(element.id)) {
        throw new Error(
          `Invalid element ID '${element.id}' at ${context}.elements[${elementIndex}]: Must be exactly 11 characters using A-Za-z0-9 and hyphens only`
        );
      }

      if (seenIds.has(element.id)) {
        throw new Error(`Duplicate ID '${element.id}' found at ${context}.elements[${elementIndex}]`);
      }
      seenIds.add(element.id);

      // Recursively validate nested elements
      if (element.elements && Array.isArray(element.elements)) {
        this.validateElementIds(element.elements, seenIds, `${context}.elements[${elementIndex}]`);
      }
    });
  }

  private static generateIdSet(count: number): string[] {
    const ids: string[] = [];
    const usedIds = new Set<string>();

    while (ids.length < count) {
      const id = this.generateId();
      if (!usedIds.has(id)) {
        usedIds.add(id);
        ids.push(id);
      }
    }

    return ids;
  }

  private static buildSystemPrompt(description: string, churchId?: string, title?: string, url?: string): string {
    return InstructionsHelper.getCreateWebpageInstructions(description, churchId, title, url);
  }

  /**
   * Validates the generated page structure for the new prompt-based generation
   * @param pageJson Parsed page JSON object
   * @param availableElementTypes List of valid element types
   */
  private static validateGeneratedPageStructure(pageJson: any, availableElementTypes?: string[]): void {
    if (!pageJson || typeof pageJson !== "object") {
      throw new Error("Invalid JSON: Not an object");
    }

    if (!pageJson.title || typeof pageJson.title !== "string") {
      throw new Error("Invalid page structure: Missing or invalid title field");
    }

    if (!pageJson.sections || !Array.isArray(pageJson.sections)) {
      throw new Error("Invalid page structure: Missing or invalid sections array");
    }

    if (pageJson.sections.length === 0) {
      throw new Error("Invalid page structure: Page must have at least one section");
    }

    // Validate each section
    pageJson.sections.forEach((section: any, index: number) => {
      if (!section.elements || !Array.isArray(section.elements)) {
        throw new Error(`Invalid section ${index}: Missing or invalid elements array`);
      }

      // Validate element types if available
      if (availableElementTypes && section.elements.length > 0) {
        section.elements.forEach((element: any, elemIndex: number) => {
          if (!element.elementType) {
            throw new Error(`Invalid element ${elemIndex} in section ${index}: Missing elementType`);
          }
          if (!availableElementTypes.includes(element.elementType)) {
            console.warn(
              `Warning: Element ${elemIndex} in section ${index} has unknown type '${element.elementType}'. Will be replaced with 'text'.`
            );
            element.elementType = "text";
          }
        });
      }
    });
  }

  /**
   * Sanitizes page data to ensure proper format and safe content
   * @param pageJson Page JSON object to sanitize
   */
  private static sanitizePageData(pageJson: any): void {
    // Ensure layout is valid
    const validLayouts = ["headerFooter", "cleanCentered", "embed"];
    if (!pageJson.layout || !validLayouts.includes(pageJson.layout)) {
      pageJson.layout = "headerFooter";
    }

    // Sanitize sections
    if (Array.isArray(pageJson.sections)) {
      pageJson.sections.forEach((section: any, index: number) => {
        // Ensure zone exists
        if (!section.zone) {
          section.zone = "main";
        }

        // Ensure sort order
        if (section.sort === undefined || section.sort === null) {
          section.sort = index;
        }

        // Ensure answersJSON and stylesJSON are strings
        if (section.answersJSON && typeof section.answersJSON !== "string") {
          section.answersJSON = JSON.stringify(section.answersJSON);
        }
        if (section.stylesJSON && typeof section.stylesJSON !== "string") {
          section.stylesJSON = JSON.stringify(section.stylesJSON);
        }
        if (section.animationsJSON && typeof section.animationsJSON !== "string") {
          section.animationsJSON = JSON.stringify(section.animationsJSON);
        }

        // Sanitize elements
        if (Array.isArray(section.elements)) {
          section.elements.forEach((element: any, elemIndex: number) => {
            // Ensure sort order
            if (element.sort === undefined || element.sort === null) {
              element.sort = elemIndex;
            }

            // Ensure answersJSON is a string
            if (element.answersJSON && typeof element.answersJSON !== "string") {
              element.answersJSON = JSON.stringify(element.answersJSON);
            } else if (!element.answersJSON) {
              element.answersJSON = "{}";
            }

            // Ensure stylesJSON is a string
            if (element.stylesJSON && typeof element.stylesJSON !== "string") {
              element.stylesJSON = JSON.stringify(element.stylesJSON);
            }

            // Ensure animationsJSON is a string
            if (element.animationsJSON && typeof element.animationsJSON !== "string") {
              element.animationsJSON = JSON.stringify(element.animationsJSON);
            }
          });
        }
      });
    }
  }

  /**
   * Generates a random 11-character ID using A-Za-z0-9 and hyphens
   * @returns A unique 11-character identifier
   */
  public static generateId(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    let result = "";
    for (let i = 0; i < 11; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private static replaceIdsWithUniqueOnes(pageData: any): void {
    const idMap = new Map<string, string>();
    const usedIds = new Set<string>();

    // Helper to get or create a new ID for a given placeholder ID
    const getNewId = (oldId: string): string => {
      if (idMap.has(oldId)) {
        return idMap.get(oldId)!;
      }

      let newId: string;
      do {
        newId = this.generateId();
      } while (usedIds.has(newId));

      usedIds.add(newId);
      idMap.set(oldId, newId);
      return newId;
    };

    // Replace page ID
    if (pageData.id) {
      pageData.id = getNewId(pageData.id);
    }

    // Replace section IDs and update references
    if (Array.isArray(pageData.sections)) {
      pageData.sections.forEach((section: any) => {
        if (section.id) {
          const newSectionId = getNewId(section.id);
          section.id = newSectionId;

          // Update pageId reference
          if (section.pageId) {
            section.pageId = idMap.get(section.pageId) || section.pageId;
          }

          // Replace element IDs and update references
          if (Array.isArray(section.elements)) {
            const processElements = (elements: any[], parentSectionId: string) => {
              elements.forEach((element: any) => {
                if (element.id) {
                  element.id = getNewId(element.id);
                }

                // Update sectionId reference
                if (element.sectionId) {
                  element.sectionId = idMap.get(element.sectionId) || parentSectionId;
                }

                // Update parentId reference for nested elements
                if (element.parentId) {
                  element.parentId = idMap.get(element.parentId) || element.parentId;
                }

                // Process nested elements
                if (Array.isArray(element.elements)) {
                  processElements(element.elements, parentSectionId);
                }
              });
            };

            processElements(section.elements, newSectionId);
          }
        }
      });
    }
  }
}
