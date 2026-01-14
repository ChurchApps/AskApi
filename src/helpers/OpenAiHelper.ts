import OpenAI from "openai";
import { Environment } from "./Environment.js";
import { SwaggerHelper } from "./SwaggerHelper.js";

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
  private static openrouter: OpenAI | null = null;
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

    if (this.provider === "openrouter") {
      if (!this.OPENROUTER_API_KEY) {
        throw new Error("Missing ApiKey for OpenRouter provider.");
      }
      if (!this.openrouter) {
        this.openrouter = new OpenAI({
          apiKey: this.OPENROUTER_API_KEY,
          baseURL: "https://openrouter.ai/api/v1"
        });
      }
    }

    // Load all swagger files on startup
    await SwaggerHelper.loadAllSwaggerFiles();

    return this.openai;
  }

  public static async execute(systemRole: string, prompt: string): Promise<AskQuestionResult> {
    const openAiPayload: OpenAI.Chat.ChatCompletionCreateParams = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemRole },
        { role: "user", content: prompt }
      ],
      temperature: 0,
      max_tokens: 500
    };

    const response = await this.openai.chat.completions.create(openAiPayload);
    console.log("RESPONSE IS:", response.choices[0]?.message?.content);

    try {
      const content = response.choices[0]?.message?.content || "";
      const jsonStart = content.indexOf("[");
      const jsonEnd = content.lastIndexOf("]") + 1;
      const jsonStr = content.slice(jsonStart, jsonEnd);
      return JSON.parse(jsonStr);
    } catch (error) {
      throw new Error("Failed to interpret the query results: " + error);
    }
  }

  public static async executeText(systemRole: string, prompt: string) {
    const openAiPayload: OpenAI.Chat.ChatCompletionCreateParams = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemRole },
        { role: "user", content: prompt }
      ],
      temperature: 0,
      max_tokens: 500
    };

    const response = await this.openai.chat.completions.create(openAiPayload);
    console.log("RESPONSE IS:", response.choices[0]?.message?.content);

    return response.choices[0]?.message?.content || "";
  }

  public static async executeWebsiteGeneration(systemRole: string, prompt: string, modelOverride?: string) {
    const client = this.provider === "openrouter" ? this.openrouter : this.openai;
    // Default: claude-3.5-haiku is fast enough for API Gateway's 29s timeout
    // For section generation, can use claude-3.5-sonnet for better quality
    const defaultModel = this.provider === "openrouter" ? "anthropic/claude-3.5-haiku" : "gpt-4o-mini";
    const model = modelOverride || defaultModel;

    console.log(`Using provider: ${this.provider}, model: ${model}`);

    const payload: OpenAI.Chat.ChatCompletionCreateParams = {
      model: model,
      messages: [
        { role: "system", content: systemRole },
        { role: "user", content: prompt || "Generate the page JSON now." }
      ],
      temperature: 0.3,
      max_tokens: 8000
    };

    try {
      const response = await client.chat.completions.create(payload);
      console.log("Website Generation Response:", response.choices[0]?.message?.content);
      return response.choices[0]?.message?.content || "";
    } catch (error: any) {
      console.error("OpenRouter/OpenAI Error Details:", {
        message: error.message,
        status: error.status,
        code: error.code,
        type: error.type,
        error: error.error
      });
      throw error;
    }
  }
}
