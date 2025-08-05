import { OpenAiHelper } from "./OpenAiHelper";
import { InstructionsHelper } from "./InstructionsHelper";

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
        const response = await OpenAiHelper.executeText(systemPrompt, "");

        console.log(`Attempt ${attempt} - AI Response (first 200 chars):`, response.substring(0, 200));

        const pageJson = this.extractAndParseJson(response);
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
    if (!pageData) {
      throw new Error("Page data is required");
    }

    // Create a copy of the page without sections
    const page = { ...pageData };
    delete page.sections;

    const sections: any[] = [];
    const elements: any[] = [];

    // Recursive function to process sections and their elements
    const processSections = (sectionsArray: any[], parentSectionId?: string) => {
      if (!Array.isArray(sectionsArray)) {
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

            // Add section reference
            flatElement.sectionId = section.id;

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
    if (Array.isArray(pageData.sections)) {
      processSections(pageData.sections);
    }

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

      if (char === "\"" && !escaped) {
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
    const validIdPattern = /^[A-Za-z0-9-]{11}$/;
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
    const validIdPattern = /^[A-Za-z0-9-]{11}$/;

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

  private static buildSystemPrompt(description: string, churchId?: string, title?: string, url?: string): string {
    return InstructionsHelper.getCreateWebpageInstructions(description, churchId, title, url);
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
}
