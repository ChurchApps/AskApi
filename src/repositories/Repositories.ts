import { QuestionRepository } from ".";

export class Repositories {
  public question: QuestionRepository;

  private static _current: Repositories = null;
  public static getCurrent = () => {
    if (Repositories._current === null) Repositories._current = new Repositories();
    return Repositories._current;
  };

  constructor() {
    this.question = new QuestionRepository();
  }
}