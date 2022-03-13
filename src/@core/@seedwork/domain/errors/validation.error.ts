import { FieldsErrors } from "../validators/validator-fields-interface";

export class SimpleValidationError extends Error{
  
}

export default class ValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super("Validation Error");
    this.name = "EntityValidationError";
  }
}
