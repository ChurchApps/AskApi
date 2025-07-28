export class Repositories {
  // Currently no repositories as Question has been removed
  // This class is kept for the base controller infrastructure

  private static _current: Repositories = null;
  public static getCurrent = () => {
    if (Repositories._current === null) Repositories._current = new Repositories();
    return Repositories._current;
  };

  constructor() {
    // No repositories to initialize currently
  }
}
