import ValidatorFieldsInterface, {
  FieldsErrors,
} from "./validator-fields-interface";
import { validateSync } from "class-validator";
//import ValidationError from "../errors/validation.error";

export type Rules = new (...args: any[]) => any;

export default abstract class ClassValidatorFields
  implements ValidatorFieldsInterface
{
  protected _errors: FieldsErrors = null;

  // protected _isValid(data: any): boolean {
  //   const errors = validateSync(data, {});

  //   if (errors.length > 0) {
  //     this._errors = {};
  //     for (const error of errors) {
  //       const field = error.property;
  //       this._errors[field] = Object.values(error.constraints);
  //     }
  //   }
  //   return !this.errors;
  // }

  protected _validate(data: any) {
    const errors = validateSync(data, {});

    if (errors.length > 0) {
      this._errors = {};
      for (const error of errors) {
        const field = error.property;
        this._errors[field] = Object.values(error.constraints);
      }
    }
    return !this.errors;
  }

  get errors(): FieldsErrors {
    return this._errors;
  }

  abstract validate(data: any): boolean;

}
