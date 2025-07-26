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
      console.log("Loaded field metadata for validation");
    } catch (error) {
      console.warn("Could not load field metadata:", error);
      this.fieldMetadata = {};
    }

    return this.openai;
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
      const fieldsToAnalyze = ['gender', 'maritalStatus', 'membershipStatus', 'householdRole'];
      
      fieldsToAnalyze.forEach(field => {
        const key = `membershipapi.person.${field}`;
        if (!this.discoveredValues[key]) {
          this.discoveredValues[key] = new Set();
        }
        
        people.forEach(person => {
          if (person[field] && typeof person[field] === 'string') {
            this.discoveredValues[key].add(person[field]);
          }
        });
      });

      console.log("Discovered field values:", 
        Object.fromEntries(
          Object.entries(this.discoveredValues).map(([k, v]) => [k, Array.from(v)])
        )
      );
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
      const parts = key.split('.');
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
        model: "gpt-4o-mini",
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
      
      console.log("=== OpenAI API Request (getCompletion) ===");
      console.log("Payload:", JSON.stringify(openAiPayload, null, 2));
      
      const response = await this.openai.chat.completions.create(openAiPayload);
      
      console.log("OpenAI Response:", {
        model: response.model,
        usage: response.usage,
        finishReason: response.choices[0]?.finish_reason
      });

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
      
      console.log("=== OpenRouter API Request (getCompletion) ===");
      console.log("URL:", "https://openrouter.ai/api/v1/chat/completions");
      console.log("Payload:", JSON.stringify(openRouterPayload, null, 2));
      
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
      
      console.log("OpenRouter Response:", {
        status: response.status,
        usage: response.data.usage,
        finishReason: response.data.choices[0]?.finish_reason
      });

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
      console.log("Determined Routes:", requiredRoutes);

      // Call the required routes
      console.log("Tokens provided:", Object.keys(tokens).filter(k => tokens[k as keyof ApiTokens]));
      const apiResponses = await this.callRequiredRoutes(requiredRoutes, tokens, question);
      console.log("API Responses:", apiResponses);

      // Process API responses directly to generate answer
      const result = this.processApiResponses(question, apiResponses);
      console.log("Processed Result:", result);

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
- If the question requires filtering people by specific criteria (gender, marital status, membership status, etc.), use the POST /people/advancedSearch endpoint instead of GET /people
- Use GET /people only when retrieving all people without filters

Respond with ONLY a JSON array of route objects that need to be called. Each route object should have the exact apiName, method, and path from the available routes above, e.g.:
[
  {"apiName": "membershipapi", "method": "GET", "path": "/people"},
  {"apiName": "attendanceapi", "method": "POST", "path": "/visits"}
]

If no routes are needed, return an empty array: []`;

    if (this.provider === "openai") {
      const openAiPayload: OpenAI.Chat.ChatCompletionCreateParams = {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an API routing assistant that selects specific routes based on user questions." },
          { role: "user", content: prompt }
        ],
        temperature: 0,
        max_tokens: 500
      };
      
      console.log("=== OpenAI API Request (determineRequiredRoutes) ===");
      console.log("Payload:", JSON.stringify(openAiPayload, null, 2));
      
      const response = await this.openai.chat.completions.create(openAiPayload);
      
      console.log("OpenAI Response:", {
        model: response.model,
        usage: response.usage,
        content: response.choices[0]?.message?.content
      });

      const content = response.choices[0]?.message?.content || "[]";
      const routeReferences = JSON.parse(content.trim());

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
      
      console.log("=== OpenRouter API Request (determineRequiredRoutes) ===");
      console.log("URL:", "https://openrouter.ai/api/v1/chat/completions");
      console.log("Payload:", JSON.stringify(openRouterPayload, null, 2));
      
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
      
      console.log("OpenRouter Response:", {
        status: response.status,
        usage: response.data.usage,
        content: response.data.choices[0]?.message?.content
      });

      const content = response.data.choices[0]?.message?.content || "[]";
      const routeReferences = JSON.parse(content.trim());

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
      const prompt = `Extract search conditions from the user's question for filtering people records.

Available fields and their valid values:
${JSON.stringify(combinedMetadata?.membershipapi?.person || {}, null, 2)}

User Question: "${question}"

Respond with ONLY a JSON array of search conditions. Each condition should have:
- field: the field name to filter on
- value: the value to search for (use exact valid values from above when applicable)
- operator: one of "equals", "contains", "startsWith", "endsWith", "greaterThan", "lessThan"

Examples:
- "find all male members" → [{"field": "gender", "value": "Male", "operator": "equals"}, {"field": "membershipStatus", "value": "Member", "operator": "equals"}]
- "show me married women" → [{"field": "gender", "value": "Female", "operator": "equals"}, {"field": "maritalStatus", "value": "Married", "operator": "equals"}]

Return empty array [] if no filtering is needed.`;

      try {
        const conditions = await this.getFilterConditions(prompt);
        if (conditions && conditions.length > 0) {
          routeParams[`${advancedSearchRoute.apiName}_${advancedSearchRoute.method}_${advancedSearchRoute.path}`] = {
            body: conditions
          };
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
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Extract search conditions from natural language queries." },
          { role: "user", content: prompt }
        ],
        temperature: 0,
        max_tokens: 300
      };
      
      const response = await this.openai.chat.completions.create(openAiPayload);

      const content = response.choices[0]?.message?.content || "[]";
      return JSON.parse(content.trim());
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
      return JSON.parse(content.trim());
    }

    return [];
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

      // Debug logging
      console.log(`Looking for token key: ${tokenKey}, Found: ${token ? "Yes" : "No"}`);
      if (!token) {
        console.log("Available tokens:", Object.keys(tokens));
      }

      const routeKey = `${route.apiName}_${route.method}_${route.path.replace(/\//g, "_")}`;

      if (!token) {
        routeResponses[routeKey] = {
          error: `No token provided for ${route.apiName}`,
          route: route
        };
        continue;
      }

      try {
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
        
        // Check if we have parameters for this route
        const routeParamKey = `${route.apiName}_${route.method}_${route.path}`;
        const routeSpecificParams = routeParameters[routeParamKey];
        
        const apiRequest: any = {
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
        
        console.log(`=== External API Request (${route.apiName}) ===`);
        console.log("URL:", `${route.method} ${url}`);
        console.log("Headers:", {
          ...apiRequest.headers,
          Authorization: "Bearer [REDACTED]"
        });
        if (apiRequest.data) {
          console.log("Body:", JSON.stringify(apiRequest.data, null, 2));
        }

        // Make the actual API call
        const response = await axios(apiRequest);
        
        console.log(`External API Response (${route.apiName}):`, {
          status: response.status,
          statusText: response.statusText,
          dataType: Array.isArray(response.data) ? `array (${response.data.length} items)` : typeof response.data
        });

        routeResponses[routeKey] = {
          route: route,
          status: "success",
          data: response.data,
          dataType: Array.isArray(response.data) ? `array (${response.data.length} items)` : typeof response.data,
          summary: Array.isArray(response.data)
            ? `Retrieved ${response.data.length} ${route.apiName === "membershipapi" && route.path === "/people" ? "people/members" : "records"}`
            : `Retrieved ${typeof response.data} data`
        };

      } catch (error: any) {
        console.error(`API call failed for ${routeKey}:`, error.message);
        routeResponses[routeKey] = {
          error: error.response?.data?.message || error.message || "API call failed",
          status: "failed",
          route: route,
          statusCode: error.response?.status
        };
      }
    }

    return routeResponses;
  }

  private static processApiResponses(question: string, apiResponses: Record<string, any>): any {
    const questionLower = question.toLowerCase();
    let answer = "";
    let totalProcessingData = 0;

    // Check if any API calls failed
    const errors = [];
    const successfulResponses = [];

    for (const [key, response] of Object.entries(apiResponses)) {
      if (response.status === "success" && response.data) {
        successfulResponses.push({ key, response });
        totalProcessingData++;
      } else if (response.error) {
        errors.push(`${response.route?.apiName || 'Unknown API'}: ${response.error}`);
      }
    }

    // If all calls failed, return error summary
    if (successfulResponses.length === 0) {
      return {
        answer: `I apologize, but I couldn't retrieve the necessary data to answer your question. ${errors.length > 0 ? 'Errors encountered: ' + errors.join('; ') : ''}`,
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
          const count = data.length;
          
          // Count questions
          if (questionLower.includes("how many") || questionLower.includes("count")) {
            if (questionLower.includes("male") || questionLower.includes("female") || questionLower.includes("gender")) {
              const genderCounts = data.reduce((acc, person) => {
                const gender = person.gender || "Unknown";
                acc[gender] = (acc[gender] || 0) + 1;
                return acc;
              }, {});
              answer += `Gender breakdown: ${Object.entries(genderCounts).map(([g, c]) => `${g}: ${c}`).join(", ")}. `;
            } else if (questionLower.includes("member") && !questionLower.includes("gender")) {
              const statusCounts = data.reduce((acc, person) => {
                const status = person.membershipStatus || "Unknown";
                acc[status] = (acc[status] || 0) + 1;
                return acc;
              }, {});
              answer += `Membership breakdown: ${Object.entries(statusCounts).map(([s, c]) => `${s}: ${c}`).join(", ")}. `;
            } else {
              answer += `Total people found: ${count}. `;
            }
          }
          // List questions
          else if (questionLower.includes("list") || questionLower.includes("show") || questionLower.includes("who")) {
            const samplePeople = data.slice(0, 5).map(p => {
              const name = p.name?.display || `${p.name?.first || ''} ${p.name?.last || ''}`.trim() || 'Unknown';
              const details = [];
              if (p.gender) details.push(p.gender);
              if (p.membershipStatus) details.push(p.membershipStatus);
              return `${name}${details.length > 0 ? ` (${details.join(', ')})` : ''}`;
            });
            
            answer += `Found ${count} people${count > 5 ? `, showing first 5` : ''}: ${samplePeople.join(', ')}. `;
          }
          else {
            // General summary
            answer += `Found ${count} people in the database. `;
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
        answer += `Retrieved ${data.length} records from ${route?.apiName || 'API'}. `;
      } else {
        answer += `Retrieved data from ${route?.apiName || 'API'}. `;
      }
    }

    // Default fallback if no specific processing matched
    if (!answer) {
      answer = `I retrieved the requested data successfully. `;
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
