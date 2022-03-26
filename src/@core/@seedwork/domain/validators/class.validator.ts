import ValidatorFieldsInterface, {
  FieldsErrors,
} from "./validator-fields-interface";
import { validateSync } from "class-validator";
//import ValidationError from "../errors/validation.error";

export type Rules = new (...args: any[]) => any;

export default abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null; //talvez fazer publico
  validatedData: PropsValidated = null;
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
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    }else{
      this.validatedData = data;
    }
    return !this.errors;
  }

  abstract validate(data: any): boolean;

}
