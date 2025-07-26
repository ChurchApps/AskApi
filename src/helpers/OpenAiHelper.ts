import OpenAI from "openai";
import axios from "axios";
import { Environment } from "./Environment";
import fs from "fs";
import path from "path";

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

    return this.openai;
  }

  public static async getCompletion(prompt: string, subDomain?: string, siteUrl?: string) {
    if (this.provider === "openai") {
      const response = await this.openai.chat.completions.create({
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
      });

      return this.parseAIResponse(response.choices[0]?.message?.content || "");
    }

    if (this.provider === "openrouter") {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "tngtech/deepseek-r1t2-chimera:free",
          messages: [
            {
              role: "system",
              content: "You are an API assistant for a church Q&A system."
            },
            { role: "user", content: prompt }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${this.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": siteUrl,
            "X-Title": subDomain
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

      // Determine which APIs are needed based on the question
      const apiDetermination = await this.determineRequiredApis(question, instructions);

      // Call the required APIs
      const apiResponses = await this.callRequiredApis(apiDetermination, tokens);

      // Build the final prompt with API responses
      const finalPrompt = this.buildAnswerPrompt(question, instructions, apiResponses);

      // Get the answer from OpenAI/OpenRouter
      const result = await this.getAnswerCompletion(finalPrompt);

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

  private static async determineRequiredApis(question: string, instructions: string): Promise<string[]> {
    const prompt = `Based on the following instructions and user question, determine which APIs need to be called.

Instructions:
${instructions}

User Question: "${question}"

Respond with ONLY a JSON array of API names that need to be called, e.g.:
["MembershipApi", "AttendanceApi"]

If no APIs are needed, return an empty array: []`;

    if (this.provider === "openai") {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are an API routing assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0,
        max_tokens: 100
      });

      const content = response.choices[0]?.message?.content || "[]";
      return JSON.parse(content.trim());
    }

    if (this.provider === "openrouter") {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "tngtech/deepseek-r1t2-chimera:free",
          messages: [
            { role: "system", content: "You are an API routing assistant." },
            { role: "user", content: prompt }
          ],
          temperature: 0,
          max_tokens: 100
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

  private static async callRequiredApis(apiNames: string[], tokens: ApiTokens): Promise<Record<string, any>> {
    const apiResponses: Record<string, any> = {};

    for (const apiName of apiNames) {
      const lowerApiName = apiName.toLowerCase();
      const tokenKey = `${lowerApiName}Token` as keyof ApiTokens;
      const token = tokens[tokenKey];

      if (!token) {
        apiResponses[apiName] = { error: `No token provided for ${apiName}` };
        continue;
      }

      // Read the swagger file for the API
      const swaggerPath = path.join(__dirname, `../../config/swagger/${lowerApiName}.json`);
      let swaggerContent: any = {};

      try {
        swaggerContent = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
      } catch (error) {
        apiResponses[apiName] = { error: `Could not read swagger for ${apiName}` };
        continue;
      }

      // For now, we'll store the swagger content as available endpoints
      // In a real implementation, you would make actual API calls based on the question context
      apiResponses[apiName] = {
        availableEndpoints: Object.keys(swaggerContent.paths || {}),
        swagger: swaggerContent
      };
    }

    return apiResponses;
  }

  private static buildAnswerPrompt(question: string, instructions: string, apiResponses: Record<string, any>): string {
    return `You are a helpful church management assistant. Answer the user's question based on the following information.

Instructions:
${instructions}

Available API Information:
${JSON.stringify(apiResponses, null, 2)}

User Question: "${question}"

Please provide a helpful and accurate answer based on the available information. If you need to make API calls to get specific data, explain what data would be needed and from which endpoints.`;
  }

  private static async getAnswerCompletion(prompt: string): Promise<any> {
    if (this.provider === "openai") {
      const response = await this.openai.chat.completions.create({
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
      });

      return {
        answer: response.choices[0]?.message?.content || "I couldn't generate an answer.",
        inputTokens: response.usage?.prompt_tokens,
        outputTokens: response.usage?.completion_tokens,
        cachedInputTokens: 0
      };
    }

    if (this.provider === "openrouter") {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
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
        },
        {
          headers: {
            Authorization: `Bearer ${this.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://chums.org",
            "X-Title": "Chums"
          }
        }
      );

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
