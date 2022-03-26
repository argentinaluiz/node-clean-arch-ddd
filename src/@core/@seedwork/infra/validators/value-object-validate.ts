import { Either } from "../../domain/utils/either";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from "class-validator";
import ValueObject from "../../domain/value-objects/value-object";

type ValueObjectOrError = Either.Either<ValueObject, Error> | ValueObject;

@ValidatorConstraint({ name: "valueObjectValidate", async: false })
export class ValueObjectValidator implements ValidatorConstraintInterface {
  value: ValueObjectOrError;
  validate(value: ValueObjectOrError, args: ValidationArguments) {
    this.value = value;
    if (
      this.value === null ||
      this.value === undefined ||
      this.value instanceof ValueObject
    ) {
      return true;
    }
    const [, error] = value as Either.Either<ValueObject, Error>;

    if (error === null) {
      return true;
    }

    if (!(error instanceof Error)) {
      throw new Error(
        `Value object must be returns an Error instance when is invalid. It returns ${typeof error} type`
      );
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [, error] = this.value as Either.Either<ValueObject, Error>;
    return error.message;
  }
}

export default function ValueObjectValidate(
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "Exists",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ValueObjectValidator,
    });
  };
}
