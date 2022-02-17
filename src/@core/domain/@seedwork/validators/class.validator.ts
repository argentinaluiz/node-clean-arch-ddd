import ValidatorInterface, {
  ValidationErrorFields,
} from "./validator-interface";
import { validateSync } from "class-validator";
import ValidationError from "../errors/validation.error";

export type Rules = new (...args: any[]) => any;

export default abstract class ClassValidator implements ValidatorInterface {
  protected _errors: ValidationErrorFields = null;

  protected _validate(data: object) {
    const errors = validateSync(data, {});

    if (errors.length > 0) {
      this._errors = {};
      for (const error of errors) {
        const field = error.property;
        this._errors[field] = Object.values(error.constraints);
      }
      throw new ValidationError(this._errors);
    }
  }

  get errors(): ValidationErrorFields {
    return this._errors;
  }

  abstract validate(data: any): void;
}
