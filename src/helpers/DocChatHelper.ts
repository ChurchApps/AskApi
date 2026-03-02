import { InstructionsHelper } from "./InstructionsHelper.js";
import { OpenAiHelper } from "./OpenAiHelper.js";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class DocChatHelper {
  private static docsContent: string | null = null;

  private static getDocsContent(): string {
    if (!this.docsContent) {
      this.docsContent = InstructionsHelper.readFile("/config/docs/b1-admin-docs.md");
    }
    return this.docsContent;
  }

  static async answerQuestion(question: string, conversationHistory: ChatMessage[], mode: string = "standard"): Promise<string> {
    const docs = this.getDocsContent();
    const promptFile = mode === "bez" ? "/config/instructions/bezChat.md" : "/config/instructions/docChat.md";
    let systemPrompt = InstructionsHelper.readFile(promptFile);
    systemPrompt = systemPrompt.replace("{docs}", docs);
    return OpenAiHelper.executeDocChat(systemPrompt, question, conversationHistory);
  }
}
