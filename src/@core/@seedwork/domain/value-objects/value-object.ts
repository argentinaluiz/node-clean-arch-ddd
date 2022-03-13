import { deepFreeze } from "../utils/object";
import ErrorBag from '../errors/error-bag';
export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value;
  public readonly error = new ErrorBag;

  constructor(value: Value) {
    this._value = deepFreeze<Value>(value);
    this.validate();
  }

  get value(): Value {
    return this._value;
  }

  protected abstract validate(): boolean;

  get is_valid(): boolean{
    return this.error.notHasError();
  }

  public toString = (): string => {
    if (typeof this._value !== "object") {
      try {
        return (this._value as any).toString();
      } catch (e) {
        return this._value + "";
      }
    }
    const value = (this._value as any).toString();
    return value === "[object Object]" ? JSON.stringify(this._value) : value;
  };
}
