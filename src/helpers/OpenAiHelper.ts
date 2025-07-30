import OpenAI from "openai";
import { Environment } from "./Environment";
import { SwaggerHelper } from "./SwaggerHelper";

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
}
