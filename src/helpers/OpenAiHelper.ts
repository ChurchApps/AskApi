import OpenAI from "openai";
import axios from "axios";
import fs from "fs";
import path from "path";
import { Environment } from "./Environment";
import { SwaggerHelper, RouteInfo } from "./SwaggerHelper";

interface ApiTokens {
  attendanceApiToken?: string;
  contentApiToken?: string;
  doingApiToken?: string;
  givingApiToken?: string;
  membershipApiToken?: string;
  messagingApiToken?: string;
  reportingApiToken?: string;
}

interface AskQuestionResult {
  answer: string;
  inputTokens?: number;
  cachedInputTokens?: number;
  outputTokens?: number;
  startTime: number;
  endTime: number;
}

export class OpenAiHelper {
  private static openai: OpenAI | null = null;
  private static provider: string = Environment.aiProvider || "openrouter";
  private static OPENAI_API_KEY = Environment.openAiApiKey || "";
  private static OPENROUTER_API_KEY = Environment.openRouterApiKey || "";
  private static fieldMetadata: any = null;
  private static discoveredValues: Record<string, Set<string>> = {};

  public static async initialize() {
    if (this.provider === "openai") {
      if (!this.OPENAI_API_KEY) {
        throw new Error("Missing ApiKey for OpenAi provider.");
      }
      if (!this.openai) {
        this.openai = new OpenAI({ apiKey: this.OPENAI_API_KEY });
      }
    }

    if (this.provider === "openrouter" && !this.OPENROUTER_API_KEY) {
      throw new Error("Missing ApiKey for OpenRouter provider.");
    }

    // Load all swagger files on startup
    await SwaggerHelper.loadAllSwaggerFiles();

    // Load field metadata
    try {
      const metadataPath = path.join(__dirname, "../../config/field-metadata.json");
      this.fieldMetadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
    } catch (error) {
      this.fieldMetadata = {};
    }

    return this.openai;
  }


  public static async execute(systemRole: string, prompt: string): Promise<AskQuestionResult> {
    const openAiPayload: OpenAI.Chat.ChatCompletionCreateParams = {
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemRole },
        { role: "user", content: prompt }
      ],
      temperature: 0,
      max_tokens: 500
    };


    const response = await this.openai.chat.completions.create(openAiPayload);
    console.log("RESPONSE IS:", response.choices[0]?.message?.content);

    return this.parseAIResponse(response.choices[0]?.message?.content || "");
    /*
    const endTime = Date.now();
    
    return {
      answer: result.answer,
      inputTokens: result.inputTokens,
      cachedInputTokens: result.cachedInputTokens,
      outputTokens: result.outputTokens,
      startTime,
      endTime
    };*/
  }





  /**
   * Discovers valid field values by analyzing actual API responses
   */
  public static async discoverFieldValues(tokens: ApiTokens): Promise<void> {
    try {
      const membershipToken = tokens.membershipApiToken;
      if (!membershipToken) return;

      // Sample people data to discover field values
      const response = await axios.get(
        "https://membershipapi.staging.churchapps.org/people",
        {
          headers: { Authorization: `Bearer ${membershipToken}` },
          timeout: 10000
        }
      );

      const people = Array.isArray(response.data) ? response.data : [];
      const fieldsToAnalyze = ["gender", "maritalStatus", "membershipStatus", "householdRole"];

      fieldsToAnalyze.forEach(field => {
        const key = `membershipapi.person.${field}`;
        if (!this.discoveredValues[key]) {
          this.discoveredValues[key] = new Set();
        }

        people.forEach(person => {
          if (person[field] && typeof person[field] === "string") {
            this.discoveredValues[key].add(person[field]);
          }
        });
      });

    } catch (error) {
      console.warn("Could not discover field values:", error.message);
    }
  }

  /**
   * Gets combined field metadata (static + discovered)
   */
  private static getCombinedFieldMetadata(): any {
    const combined = { ...this.fieldMetadata };

    // Merge discovered values
    Object.entries(this.discoveredValues).forEach(([key, values]) => {
      const parts = key.split(".");
      if (parts.length === 3) {
        const [api, entity, field] = parts;
        if (!combined[api]) combined[api] = {};
        if (!combined[api][entity]) combined[api][entity] = {};

        // Combine static and discovered values
        const staticValues = combined[api][entity][field] || [];
        const discoveredArray = Array.from(values);
        combined[api][entity][field] = [...new Set([...staticValues, ...discoveredArray])];
      }
    });

    return combined;
  }

  public static async getCompletion(prompt: string) {
    if (this.provider === "openai") {
      const openAiPayload: OpenAI.Chat.ChatCompletionCreateParams = {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an API assistant for a church Q&A system."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      };

      const response = await this.openai.chat.completions.create(openAiPayload);

      return this.parseAIResponse(response.choices[0]?.message?.content || "");
    }

    if (this.provider === "openrouter") {
      const openRouterPayload = {
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [
          {
            role: "system",
            content: "You are an API assistant for a church Q&A system."
          },
          { role: "user", content: prompt }
        ]
      };

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        openRouterPayload,
        {
          headers: {
            Authorization: `Bearer ${this.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://chums.org/",
            "X-Title": "Chums"
          }
        }
      );

      return this.parseAIResponse(response.data.choices[0]?.message?.content || "");
    }

    throw new Error(`Unsupported provider: ${this.provider}`);
  }

  public static buildPrompt(query: string) {
    return `
    You are an API assistant for a church Q&A system. 
    Convert the user's natural language query into API parameters for filtering questions.

    Available Question fields:
    - id (string)
    - churchId (string)
    - userId (string)
    - question (string)
    - answer (string)
    - dateAnswered (Date)
    - inputTokens (number)
    - cachedInputTokens (number)
    - outputTokens (number)
    - seconds (number)

    Available Operators:
    - equals
    - startsWith
    - endsWith
    - contains
    - greaterThan
    - greaterThanEqual
    - lessThan
    - lessThanEqual
    - notEqual

    Query: "${query}"

    Respond ONLY with JSON like:
    [
        { "field": "question", "value": "baptism", "operator": "contains" },
        { "field": "dateAnswered", "value": "2024-01-01", "operator": "greaterThan" },
        { "field": "inputTokens", "value": "100", "operator": "lessThan" }
    ]
    `;
  }

  private static parseAIResponse(responseText: string) {
    try {
      const jsonStart = responseText.indexOf("[");
      const jsonEnd = responseText.lastIndexOf("]") + 1;
      const jsonStr = responseText.slice(jsonStart, jsonEnd);
      return JSON.parse(jsonStr);
    } catch (error) {
      throw new Error("Failed to interpret the query results: " + error);
    }
  }

  public static async askQuestion(question: string, tokens: ApiTokens): Promise<AskQuestionResult> {
    const startTime = Date.now();

    try {
      await this.initialize();

      // Read and parse instructions
      const instructionsPath = path.join(__dirname, "../../config/Instructions.md");
      const instructions = fs.readFileSync(instructionsPath, "utf-8");

      // First, try to discover field values if we have tokens
      await this.discoverFieldValues(tokens);

      // Determine which routes are needed based on the question
      const requiredRoutes = await this.determineRequiredRoutes(question, instructions);
      console.log("Debug - AI selected these routes:", requiredRoutes.map(r => `${r.method} ${r.path}`));

      // Call the required routes
      const apiResponses = await this.callRequiredRoutes(requiredRoutes, tokens, question);

      // Process API responses directly to generate answer
      const result = this.processApiResponses(question, apiResponses);

      const endTime = Date.now();

      return {
        answer: result.answer,
        inputTokens: result.inputTokens,
        cachedInputTokens: result.cachedInputTokens,
        outputTokens: result.outputTokens,
        startTime,
        endTime
      };
    } catch (error) {
      const endTime = Date.now();
      throw {
        error: error.message || "Failed to process question",
        startTime,
        endTime
      };
    }
  }

  private static async determineRequiredRoutes(question: string, instructions: string): Promise<RouteInfo[]> {
    const allRoutes = SwaggerHelper.getAllRoutes();

    // Build a comprehensive prompt with all available routes
    const routesInfo = allRoutes.map(route =>
      `${route.apiName} ${route.method} ${route.path} - ${route.summary || route.description || "No description"}`
    ).join("\n");

    // Include relevant field metadata
    const fieldMetadataInfo = this.fieldMetadata ? `\nField Valid Values (for filtering):\n${JSON.stringify(this.fieldMetadata, null, 2)}` : "";

    const prompt = `Based on the following instructions, user question, and available API routes, determine which specific routes need to be called.

Instructions:
${instructions}

Available Routes:
${routesInfo}
${fieldMetadataInfo}

User Question: "${question}"

IMPORTANT: 
- If the question requires filtering people by specific criteria (gender="Male", maritalStatus="Married", membershipStatus="Member", etc.), use POST /people/advancedSearch
- If the question is general like "how many people", "show all people", "list everyone", use GET /people
- Only use POST /people/advancedSearch when you need to filter by specific field values

Respond with ONLY a JSON array of route objects that need to be called. Each route object should have the exact apiName, method, and path from the available routes above, e.g.:
[
  {"apiName": "membershipapi", "method": "GET", "path": "/people"},
  {"apiName": "attendanceapi", "method": "POST", "path": "/visits"}
]

If no routes are needed, return an empty array: []`;

    if (this.provider === "openai") {
      const openAiPayload: OpenAI.Chat.ChatCompletionCreateParams = {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an API routing assistant that selects specific routes based on user questions." },
          { role: "user", content: prompt }
        ],
        temperature: 0,
        max_tokens: 500
      };

      const response = await this.openai.chat.completions.create(openAiPayload);

      const content = response.choices[0]?.message?.content || "[]";
      const routeReferences = this.parseJSONResponse(content);

      // Match the returned route references with actual RouteInfo objects
      return this.matchRoutesToReferences(routeReferences, allRoutes);
    }

    if (this.provider === "openrouter") {
      const openRouterPayload = {
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [
          { role: "system", content: "You are an API routing assistant that selects specific routes based on user questions." },
          { role: "user", content: prompt }
        ],
        temperature: 0,
        max_tokens: 500
      };

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        openRouterPayload,
        {
          headers: {
            Authorization: `Bearer ${this.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const content = response.data.choices[0]?.message?.content || "[]";
      const routeReferences = this.parseJSONResponse(content);

      // Match the returned route references with actual RouteInfo objects
      return this.matchRoutesToReferences(routeReferences, allRoutes);
    }

    return [];
  }

  private static matchRoutesToReferences(routeReferences: any[], allRoutes: RouteInfo[]): RouteInfo[] {
    const matchedRoutes: RouteInfo[] = [];

    for (const ref of routeReferences) {
      const matchedRoute = allRoutes.find(route =>
        route.apiName.toLowerCase() === ref.apiName?.toLowerCase() &&
        route.method.toUpperCase() === ref.method?.toUpperCase() &&
        route.path === ref.path
      );

      if (matchedRoute) {
        matchedRoutes.push(matchedRoute);
      }
    }

    return matchedRoutes;
  }

  private static async determineRouteParameters(routes: RouteInfo[], question: string): Promise<Record<string, any>> {
    const routeParams: Record<string, any> = {};

    // For now, let's focus on the /people/advancedSearch endpoint
    const advancedSearchRoute = routes.find(r =>
      r.apiName === "membershipapi" && r.path === "/people/advancedSearch"
    );

    if (advancedSearchRoute) {
      // Build a prompt to extract search conditions from the question
      const combinedMetadata = this.getCombinedFieldMetadata();
      const prompt = `Extract search conditions from the user's question to filter people records.

Available fields and valid values:
${JSON.stringify(combinedMetadata?.membershipapi?.person || {}, null, 2)}

User Question: "${question}"

Analyze the question and create search conditions using the available fields above. Match user language to the closest valid values (e.g., "staff" → "Staff", "women" → "Female", "men" → "Male").

Return ONLY a JSON array of conditions:
[{"field": "fieldName", "value": "exactValue", "operator": "equals"}]

If no specific filtering is needed, return: []`;

      try {
        console.log(`Debug - Question: "${question}"`);
        console.log("Debug - All static metadata keys:", Object.keys(this.fieldMetadata?.membershipapi || {}));
        console.log("Debug - All discovered values keys:", Object.keys(this.discoveredValues));
        console.log("Debug - Raw static metadata (people):", JSON.stringify(this.fieldMetadata?.membershipapi?.people || {}, null, 2));
        console.log("Debug - Combined metadata (person):", JSON.stringify(combinedMetadata?.membershipapi?.person || {}, null, 2));
        const conditions = await this.getFilterConditions(prompt);
        console.log("Debug - Generated conditions:", conditions);
        if (conditions && conditions.length > 0) {
          const paramKey = `${advancedSearchRoute.apiName}_${advancedSearchRoute.method}_${advancedSearchRoute.path}`;
          routeParams[paramKey] = {
            body: conditions
          };
          console.log(`Debug - Added route params for key: ${paramKey}`, routeParams[paramKey]);
        } else {
          console.log("Debug - No conditions generated - this should use GET /people instead of POST /people/advancedSearch");
        }
      } catch (error) {
        console.error("Error determining route parameters:", error);
      }
    }

    return routeParams;
  }

  private static async getFilterConditions(prompt: string): Promise<any[]> {
    if (this.provider === "openai") {
      const openAiPayload: OpenAI.Chat.ChatCompletionCreateParams = {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Extract search conditions from natural language queries." },
          { role: "user", content: prompt }
        ],
        temperature: 0,
        max_tokens: 300
      };

      const response = await this.openai.chat.completions.create(openAiPayload);

      const content = response.choices[0]?.message?.content || "[]";
      return this.parseJSONResponse(content);
    }

    if (this.provider === "openrouter") {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: "Extract search conditions from natural language queries." },
            { role: "user", content: prompt }
          ],
          temperature: 0,
          max_tokens: 300
        },
        {
          headers: {
            Authorization: `Bearer ${this.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const content = response.data.choices[0]?.message?.content || "[]";
      return this.parseJSONResponse(content);
    }

    return [];
  }

  private static parseJSONResponse(content: string): any[] {
    try {
      // Remove markdown code block formatting if present
      let cleanContent = content.trim();

      // Remove ```json at the beginning
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.substring(7);
      }
      // Remove ``` at the beginning (in case it's just ```)
      else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.substring(3);
      }

      // Remove ``` at the end
      if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.substring(0, cleanContent.length - 3);
      }

      // Trim again after cleanup
      cleanContent = cleanContent.trim();

      // Parse the cleaned JSON
      const result = JSON.parse(cleanContent);
      return result;
    } catch (error) {
      console.log(`Debug - Failed to parse AI response: "${content.substring(0, 100)}..." - ${error.message}`);
      return [];
    }
  }

  private static async callRequiredRoutes(routes: RouteInfo[], tokens: ApiTokens, question: string): Promise<Record<string, any>> {
    const routeResponses: Record<string, any> = {};

    // First, determine if we need any special parameters for the routes
    const routeParameters = await this.determineRouteParameters(routes, question);

    for (const route of routes) {
      // Fix: route.apiName comes as lowercase "membershipapi", but token key needs "membershipApiToken"
      // Convert "membershipapi" -> "membershipApiToken"
      const apiNameParts = route.apiName.toLowerCase().split("api");
      const camelCaseApiName = apiNameParts[0] + "Api";
      const tokenKey = `${camelCaseApiName}Token` as keyof ApiTokens;
      const token = tokens[tokenKey];


      const routeKey = `${route.apiName}_${route.method}_${route.path.replace(/\//g, "_")}`;

      if (!token) {
        routeResponses[routeKey] = {
          error: `No token provided for ${route.apiName}`,
          route: route
        };
        continue;
      }

      // Build the API URL - using correct staging patterns
      const baseUrls = {
        "membershipapi": "https://membershipapi.staging.churchapps.org",
        "attendanceapi": "https://attendanceapi.staging.churchapps.org",
        "contentapi": "https://contentapi.staging.churchapps.org",
        "doingapi": "https://doingapi.staging.churchapps.org",
        "givingapi": "https://givingapi.staging.churchapps.org",
        "messagingapi": "https://messagingapi.staging.churchapps.org"
      };

      const baseUrl = baseUrls[route.apiName.toLowerCase() as keyof typeof baseUrls];
      if (!baseUrl) {
        routeResponses[routeKey] = {
          error: `Unknown API: ${route.apiName}`,
          route: route
        };
        continue;
      }

      const url = `${baseUrl}${route.path}`;
      let actualRoute = route;
      let apiRequest: any;

      try {

        // Check if we have parameters for this route
        const routeParamKey = `${route.apiName}_${route.method}_${route.path}`;
        const routeSpecificParams = routeParameters[routeParamKey];

        if (route.method.toUpperCase() === "POST") {
          console.log(`Debug - routeParamKey: ${routeParamKey}`);
          console.log("Debug - routeSpecificParams:", routeSpecificParams);
          console.log("Debug - routeParameters keys:", Object.keys(routeParameters));
        }

        apiRequest = {
          method: route.method.toLowerCase() as any,
          url: url,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          timeout: 10000 // 10 second timeout
        };

        // Add body data if present
        if (routeSpecificParams?.body) {
          apiRequest.data = routeSpecificParams.body;
        }

        // Safety check: Don't call POST /people/advancedSearch without payload
        // Instead, fallback to GET /people
        if (route.method.toUpperCase() === "POST" &&
          route.path === "/people/advancedSearch" &&
          !apiRequest.data) {
          console.log("Fallback: Using GET /people instead of POST /people/advancedSearch (no conditions)");

          // Modify the request to use GET /people instead
          apiRequest.method = "get";
          apiRequest.url = `${baseUrl}/people`;
          delete apiRequest.data; // Remove any data for GET request

          // Update the route info for response processing
          actualRoute = { ...route, method: "GET", path: "/people" };
        }

        if (actualRoute.method.toUpperCase() === "POST") {
          console.log(`API Call: ${actualRoute.method} ${apiRequest.url}`);
          if (apiRequest.data) {
            console.log("Payload:", JSON.stringify(apiRequest.data, null, 2));
          } else {
            console.log("Payload: (none)");
          }
        } else {
          console.log(`API Call: ${actualRoute.method} ${apiRequest.url}`);
        }

        // Make the actual API call
        const response = await axios(apiRequest);

        console.log(`API Response: ${response.status} - ${Array.isArray(response.data) ? `${response.data.length} items` : typeof response.data}`);

        routeResponses[routeKey] = {
          route: actualRoute,
          status: "success",
          data: response.data,
          dataType: Array.isArray(response.data) ? `array (${response.data.length} items)` : typeof response.data,
          summary: Array.isArray(response.data)
            ? `Retrieved ${response.data.length} ${actualRoute.apiName === "membershipapi" && actualRoute.path === "/people" ? "people/members" : "records"}`
            : `Retrieved ${typeof response.data} data`
        };

      } catch (error: any) {
        console.log(`API Error: ${actualRoute.method} ${apiRequest.url} - ${error.response?.status || "Failed"}: ${error.message}`);
        routeResponses[routeKey] = {
          error: error.response?.data?.message || error.message || "API call failed",
          status: "failed",
          route: actualRoute,
          statusCode: error.response?.status
        };
      }
    }

    return routeResponses;
  }

  private static detectFilteringNeeds(questionLower: string): any {
    const filters: any = {};

    // Membership status filtering
    if (questionLower.includes("staff")) {
      filters.membershipStatus = "Staff";
    } else if (questionLower.includes("member") && !questionLower.includes("staff")) {
      filters.membershipStatus = "Member";
    } else if (questionLower.includes("visitor")) {
      filters.membershipStatus = "Visitor";
    } else if (questionLower.includes("guest")) {
      filters.membershipStatus = "Guest";
    }

    // Gender filtering
    if (questionLower.includes("male") && !questionLower.includes("female")) {
      filters.gender = "Male";
    } else if (questionLower.includes("female") || questionLower.includes("women")) {
      filters.gender = "Female";
    } else if (questionLower.includes("men") && !questionLower.includes("women")) {
      filters.gender = "Male";
    }

    // Marital status filtering
    if (questionLower.includes("married")) {
      filters.maritalStatus = "Married";
    } else if (questionLower.includes("single")) {
      filters.maritalStatus = "Single";
    }

    return Object.keys(filters).length > 0 ? filters : null;
  }

  private static processApiResponses(question: string, apiResponses: Record<string, any>): any {
    const questionLower = question.toLowerCase();
    let answer = "";
    let totalProcessingData = 0;

    // Check if question asks for specific filtering that we should apply post-retrieval
    const needsFiltering = this.detectFilteringNeeds(questionLower);

    // Check if any API calls failed
    const errors = [];
    const successfulResponses = [];

    for (const [key, response] of Object.entries(apiResponses)) {
      if (response.status === "success" && response.data) {
        successfulResponses.push({ key, response });
        totalProcessingData++;
      } else if (response.error) {
        errors.push(`${response.route?.apiName || "Unknown API"}: ${response.error}`);
      }
    }

    // If all calls failed, return error summary
    if (successfulResponses.length === 0) {
      return {
        answer: `I apologize, but I couldn't retrieve the necessary data to answer your question. ${errors.length > 0 ? "Errors encountered: " + errors.join("; ") : ""}`,
        inputTokens: 0,
        outputTokens: 0,
        cachedInputTokens: 0
      };
    }

    // Process successful responses based on question type
    for (const { key, response } of successfulResponses) {
      const route = response.route;
      const data = response.data;

      // Handle people-related questions
      if (route?.apiName === "membershipapi" && (route?.path === "/people" || route?.path === "/people/advancedSearch")) {
        if (Array.isArray(data)) {
          // Apply post-retrieval filtering if needed
          let filteredData = data;
          if (needsFiltering && route?.path === "/people") {
            console.log("Applying post-retrieval filters:", needsFiltering);
            filteredData = data.filter(person => {
              let matches = true;
              if (needsFiltering.membershipStatus && person.membershipStatus !== needsFiltering.membershipStatus) {
                matches = false;
              }
              if (needsFiltering.gender && person.gender !== needsFiltering.gender) {
                matches = false;
              }
              if (needsFiltering.maritalStatus && person.maritalStatus !== needsFiltering.maritalStatus) {
                matches = false;
              }
              return matches;
            });
            console.log(`Filtered from ${data.length} to ${filteredData.length} people`);
          }

          const count = filteredData.length;

          // Count questions
          if (questionLower.includes("how many") || questionLower.includes("count")) {
            if (questionLower.includes("male") || questionLower.includes("female") || questionLower.includes("gender")) {
              const genderCounts = filteredData.reduce((acc, person) => {
                const gender = person.gender || "Unknown";
                acc[gender] = (acc[gender] || 0) + 1;
                return acc;
              }, {});
              answer += `Gender breakdown: ${Object.entries(genderCounts).map(([g, c]) => `${g}: ${c}`).join(", ")}. `;
            } else if (questionLower.includes("staff")) {
              answer += `Found ${count} staff members. `;
            } else if (questionLower.includes("member") && !questionLower.includes("gender") && !questionLower.includes("staff")) {
              const statusCounts = filteredData.reduce((acc, person) => {
                const status = person.membershipStatus || "Unknown";
                acc[status] = (acc[status] || 0) + 1;
                return acc;
              }, {});
              answer += `Membership breakdown: ${Object.entries(statusCounts).map(([s, c]) => `${s}: ${c}`).join(", ")}. `;
            } else {
              answer += `Found ${count} people${needsFiltering ? " matching the criteria" : " in the database"}. `;
            }
          }
          // List questions
          else if (questionLower.includes("list") || questionLower.includes("show") || questionLower.includes("who")) {
            const samplePeople = filteredData.slice(0, 5).map(p => {
              const name = p.name?.display || `${p.name?.first || ""} ${p.name?.last || ""}`.trim() || "Unknown";
              const details = [];
              if (p.gender) details.push(p.gender);
              if (p.membershipStatus) details.push(p.membershipStatus);
              return `${name}${details.length > 0 ? ` (${details.join(", ")})` : ""}`;
            });

            answer += `Found ${count} people${count > 5 ? ", showing first 5" : ""}: ${samplePeople.join(", ")}. `;
          }
          else {
            // General summary
            answer += `Found ${count} people${needsFiltering ? " matching the criteria" : " in the database"}. `;
          }
        }
      }

      // Handle donations
      else if (route?.apiName === "givingapi" && route?.path.includes("donation")) {
        if (Array.isArray(data)) {
          const total = data.reduce((sum, donation) => sum + (parseFloat(donation.amount) || 0), 0);
          const count = data.length;
          answer += `Found ${count} donations totaling $${total.toFixed(2)}. `;
        }
      }

      // Handle other data types
      else if (Array.isArray(data)) {
        answer += `Retrieved ${data.length} records from ${route?.apiName || "API"}. `;
      } else {
        answer += `Retrieved data from ${route?.apiName || "API"}. `;
      }
    }

    // Default fallback if no specific processing matched
    if (!answer) {
      answer = "I retrieved the requested data successfully. ";
      if (successfulResponses.length === 1 && Array.isArray(successfulResponses[0].response.data)) {
        answer += `Found ${successfulResponses[0].response.data.length} records.`;
      }
    }

    return {
      answer: answer.trim(),
      inputTokens: 0, // No AI processing needed
      outputTokens: 0,
      cachedInputTokens: 0
    };
  }

}
