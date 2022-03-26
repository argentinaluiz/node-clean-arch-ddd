import { FieldsErrors } from "../validators/validator-fields-interface";

export class SimpleValidationError extends Error{
  
}

export default class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super("Entity Validation Error");
    this.name = "EntityValidationError";
  }
}
