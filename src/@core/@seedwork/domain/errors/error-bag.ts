export type ErrorValue = string | { [key: string]: string[] };

export default class ErrorBag {
  private _errors: ErrorValue[] = [];

  add(error: ErrorValue) {
    this._errors.push(error);
  }

  clear(){
    this._errors = [];
  }

  hasError() {
    return this._errors.length > 0;
  }

  notHasError() {
    return !this.hasError();
  }

  get errors() {
    return this._errors;
  }
}