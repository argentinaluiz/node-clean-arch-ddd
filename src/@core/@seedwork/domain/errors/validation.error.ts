import { ValidationErrorFields } from "../validators/validator-interface";

export class SimpleValidationError extends Error{
  
}

export default class ValidationError extends Error {
  constructor(public error: ValidationErrorFields) {
    super("Validation Error");
    this.name = "EntityValidationError";
  }
}
