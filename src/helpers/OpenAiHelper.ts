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

    return this.openai;
  }

  public static async getCompletion(prompt: string) {
    if (this.provider === "openai") {
      const openAiPayload = {
        model: "gpt-4.1-mini",
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

      // Determine which routes are needed based on the question
      const requiredRoutes = await this.determineRequiredRoutes(question, instructions);
      console.log("Determined Routes:", requiredRoutes);

      // Call the required routes
      console.log("Tokens provided:", Object.keys(tokens).filter(k => tokens[k as keyof ApiTokens]));
      const apiResponses = await this.callRequiredRoutes(requiredRoutes, tokens);
      console.log("API Responses:", apiResponses);

      // Build the final prompt with API responses
      const finalPrompt = this.buildAnswerPrompt(question, instructions, apiResponses);
      console.log("Final Prompt:", finalPrompt);

      // Get the answer from OpenAI/OpenRouter
      const result = await this.getAnswerCompletion(finalPrompt);
      console.log("AI Result:", result);

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

    const prompt = `Based on the following instructions, user question, and available API routes, determine which specific routes need to be called.

Instructions:
${instructions}

Available Routes:
${routesInfo}

User Question: "${question}"

Respond with ONLY a JSON array of route objects that need to be called. Each route object should have the exact apiName, method, and path from the available routes above, e.g.:
[
  {"apiName": "membershipapi", "method": "GET", "path": "/people"},
  {"apiName": "attendanceapi", "method": "POST", "path": "/visits"}
]

If no routes are needed, return an empty array: []`;

    if (this.provider === "openai") {
      const openAiPayload = {
        model: "gpt-4.1-mini",
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

  private static async callRequiredRoutes(routes: RouteInfo[], tokens: ApiTokens): Promise<Record<string, any>> {
    const routeResponses: Record<string, any> = {};

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
        
        const apiRequest = {
          method: route.method.toLowerCase() as any,
          url: url,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          timeout: 10000 // 10 second timeout
        };
        
        console.log(`=== External API Request (${route.apiName}) ===`);
        console.log("URL:", `${route.method} ${url}`);
        console.log("Headers:", {
          ...apiRequest.headers,
          Authorization: "Bearer [REDACTED]"
        });

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

  private static buildAnswerPrompt(question: string, instructions: string, apiResponses: Record<string, any>): string {
    // Process API responses to create a more readable summary
    let apiSummary = "";
    let actualData: any = null;

    for (const [key, response] of Object.entries(apiResponses)) {
      if (response.status === "success" && response.data) {
        apiSummary += `\n${key}: ${response.summary}`;

        // For people count questions, store the actual data
        if (response.route?.apiName === "membershipapi" && response.route?.path === "/people") {
          actualData = response.data;
          apiSummary += ` (${Array.isArray(response.data) ? response.data.length : "unknown count"} total)`;
        }
      } else if (response.error) {
        apiSummary += `\n${key}: Error - ${response.error}`;
      }
    }

    return `You are a helpful church management assistant. Answer the user's question based on the following information.

Instructions:
${instructions}

API Data Retrieved:${apiSummary}

User Question: "${question}"

${actualData ? `\nActual Data: ${JSON.stringify(actualData?.slice?.(0, 3) || actualData, null, 2)}${Array.isArray(actualData) && actualData.length > 3 ? "\n... (showing first 3 records)" : ""}` : ""}

Please provide a helpful and accurate answer based on the available information. For questions about counts or numbers, use the actual data counts provided above. Be specific and include relevant numbers when available.`;
  }

  private static async getAnswerCompletion(prompt: string): Promise<any> {
    if (this.provider === "openai") {
      const openAiPayload = {
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful church management assistant with access to various church APIs."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      };
      
      console.log("=== OpenAI API Request (getAnswerCompletion) ===");
      console.log("Payload:", JSON.stringify({
        ...openAiPayload,
        messages: [
          openAiPayload.messages[0],
          { role: "user", content: prompt.substring(0, 200) + "..." }
        ]
      }, null, 2));
      
      const response = await this.openai.chat.completions.create(openAiPayload);
      
      console.log("OpenAI Response:", {
        model: response.model,
        usage: response.usage,
        finishReason: response.choices[0]?.finish_reason,
        answerLength: response.choices[0]?.message?.content?.length
      });

      return {
        answer: response.choices[0]?.message?.content || "I couldn't generate an answer.",
        inputTokens: response.usage?.prompt_tokens,
        outputTokens: response.usage?.completion_tokens,
        cachedInputTokens: 0
      };
    }

    if (this.provider === "openrouter") {
      const openRouterPayload = {
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [
          {
            role: "system",
            content: "You are a helpful church management assistant with access to various church APIs."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      };
      
      console.log("=== OpenRouter API Request (getAnswerCompletion) ===");
      console.log("URL:", "https://openrouter.ai/api/v1/chat/completions");
      console.log("Payload:", JSON.stringify({
        ...openRouterPayload,
        messages: [
          openRouterPayload.messages[0],
          { role: "user", content: prompt.substring(0, 200) + "..." }
        ]
      }, null, 2));
      
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        openRouterPayload,
        {
          headers: {
            Authorization: `Bearer ${this.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://chums.org",
            "X-Title": "Chums"
          }
        }
      );
      
      console.log("OpenRouter Response:", {
        status: response.status,
        usage: response.data.usage,
        finishReason: response.data.choices[0]?.finish_reason,
        answerLength: response.data.choices[0]?.message?.content?.length
      });

      return {
        answer: response.data.choices[0]?.message?.content || "I couldn't generate an answer.",
        inputTokens: response.data.usage?.prompt_tokens,
        outputTokens: response.data.usage?.completion_tokens,
        cachedInputTokens: response.data.usage?.cached_tokens || 0
      };
    }

    throw new Error(`Unsupported provider: ${this.provider}`);
  }
}
