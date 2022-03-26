import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function IsInstanceOf(
  classRef: any,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isInstanceOf",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [classRef],
      options: {
        message: `${propertyName} must be a ${classRef.name} instance`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [classRef] = args.constraints;
          return (
            value === null || value === undefined || value instanceof classRef
          );
        },
      },
    });
  };
}
