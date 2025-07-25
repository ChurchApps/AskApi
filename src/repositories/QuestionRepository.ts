import { injectable } from "inversify";
import { Question } from "../models";
import { UniqueIdHelper } from "@churchapps/apihelper";
import { TypedDB } from "../helpers";

@injectable()
export class QuestionRepository {
  public loadAll(churchId: string) {
    return TypedDB.query("SELECT * FROM questions WHERE churchId=? ORDER BY id DESC", [churchId]);
  }

  public load(churchId: string, id: string) {
    return TypedDB.queryOne("SELECT * FROM questions WHERE id=? AND churchId=?;", [id, churchId]);
  }

  public loadByUser(churchId: string, userId: string) {
    return TypedDB.query("SELECT * FROM questions WHERE churchId=? AND userId=? ORDER BY id DESC", [churchId, userId]);
  }

  public save(question: Question) {
    return question.id ? this.update(question) : this.create(question);
  }

  private async create(question: Question) {
    question.id = UniqueIdHelper.shortId();

    const query =
      "INSERT INTO questions (id, churchId, userId, question, answer, dateAnswered, inputTokens, cachedInputTokens, outputTokens, seconds) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const params = [
      question.id,
      question.churchId,
      question.userId,
      question.question,
      question.answer,
      question.dateAnswered,
      question.inputTokens,
      question.cachedInputTokens,
      question.outputTokens,
      question.seconds,
    ];
    await TypedDB.query(query, params);
    return question;
  }

  private async update(question: Question) {
    const sql =
      "UPDATE questions SET question=?, answer=?, dateAnswered=?, inputTokens=?, cachedInputTokens=?, outputTokens=?, seconds=? WHERE id=? AND churchId=?;";
    const params = [
      question.question,
      question.answer,
      question.dateAnswered,
      question.inputTokens,
      question.cachedInputTokens,
      question.outputTokens,
      question.seconds,
      question.id,
      question.churchId,
    ];
    await TypedDB.query(sql, params);
    return question;
  }

  public delete(id: string, churchId: string) {
    return TypedDB.query("DELETE FROM questions WHERE id=? AND churchId=?;", [id, churchId]);
  }
}
