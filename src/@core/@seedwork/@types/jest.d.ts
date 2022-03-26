import EntityValidationError from "../domain/errors/entity-validation.error";
import ClassValidatorFields from "../domain/validators/class.validator";

type Expected = { [field: string]: string[] };

declare global {
  declare namespace jest {
    // noinspection JSUnusedGlobalSymbols
    interface Matchers<R> {
      containErrorMessages: (expected: Expected) => R;
    }
  }
}

export {};