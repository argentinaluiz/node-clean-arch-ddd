import ErrorBag from "../../domain/errors/error-bag";

export default class BadEntityOperationError extends Error {
  constructor(public error: ErrorBag, message?: string) {
    super(message ?? "An entity operation was executed with error");
    this.name = "BadEntityOperationError";
  }
}
