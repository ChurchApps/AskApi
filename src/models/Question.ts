export class Question {
  id?: string;
  churchId: string;
  userId: string;
  question: string;
  answer?: string;
  dateAnswered?: Date;
  inputTokens?: number;
  cachedInputTokens?: number;
  outputTokens?: number;
  seconds?: number;
}