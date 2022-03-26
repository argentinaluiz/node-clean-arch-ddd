import { SimpleValidationError } from "../errors/entity-validation.error";

//GuardClause
export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: any): ValidatorRules {
    return new ValidatorRules(value, property);
  }

  required(): this {
    if (this.value === null || this.value === undefined || this.value === "") {
      throw new SimpleValidationError(`The ${this.property} is required`);
    }
    return this;
  }

  string(): this {
    if (!isEmpty(this.value) && typeof this.value !== "string") {
      throw new SimpleValidationError(`The ${this.property} must be a string`);
    }
    return this;
  }

  maxLength(max: number): this {
    if (!isEmpty(this.value) && this.value.length > max) {
      throw new SimpleValidationError(
        `The ${this.property} must be less or equal than ${max} characters`
      );
    }
    return this;
  }

  boolean(): typeof this {
    if (!isEmpty(this.value) && typeof this.value !== "boolean") {
      throw new SimpleValidationError(`The ${this.property} must be a boolean`);
    }
    return this;
  }
}

export function isEmpty(value: any) {
  return value === undefined || value === null;
}
