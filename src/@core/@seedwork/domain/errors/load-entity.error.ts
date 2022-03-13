import ErrorBag from "./error-bag";

export default class LoadEntityError extends Error {
  constructor(public error: ErrorBag, message?: string) {
    super(message ?? "An entity not be loaded");
    this.name = "LoadEntityError";
  }
}
