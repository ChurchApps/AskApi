import { InstructionsHelper } from "./InstructionsHelper.js";
import { OpenAiHelper } from "./OpenAiHelper.js";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class DocChatHelper {
  private static topicIndex: string | null = null;
  private static topicCache: Record<string, string> = {};

  private static getTopicIndex(): string {
    if (!this.topicIndex) {
      this.topicIndex = InstructionsHelper.readFile("/config/docs/topic-index.md");
    }
    return this.topicIndex;
  }

  private static getTopicDocs(topicNames: string[]): string {
    const docs: string[] = [];
    for (const name of topicNames) {
      if (!this.topicCache[name]) {
        try {
          this.topicCache[name] = InstructionsHelper.readFile(`/config/docs/topics/${name}.md`);
        } catch {
          continue;
        }
      }
      docs.push(this.topicCache[name]);
    }
    return docs.join("\n\n");
  }

  private static getSystemPrompt(mode: string, docs: string): string {
    const promptFiles: Record<string, string> = {
      bez: "/config/instructions/bezChat.md",
      superbee: "/config/instructions/superBeeChat.md"
    };
    const promptFile = promptFiles[mode] || "/config/instructions/docChat.md";
    let systemPrompt = InstructionsHelper.readFile(promptFile);
    systemPrompt = systemPrompt.replace("{docs}", docs);
    return systemPrompt;
  }

  static async answerQuestion(question: string, conversationHistory: ChatMessage[], mode: string = "standard"): Promise<string> {
    // Step 1: Classify the question to find relevant topics
    const indexPrompt = this.getTopicIndex();
    const topics = await OpenAiHelper.classifyTopics(indexPrompt, question);

    // Step 2: Load only the relevant topic docs
    const docs = this.getTopicDocs(topics);

    // Step 3: Answer with the focused context
    const systemPrompt = this.getSystemPrompt(mode, docs);
    return OpenAiHelper.executeDocChat(systemPrompt, question, conversationHistory);
  }

}
