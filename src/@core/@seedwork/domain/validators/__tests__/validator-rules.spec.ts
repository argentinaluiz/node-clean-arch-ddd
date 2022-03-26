import { SimpleValidationError } from "../../errors/entity-validation.error";
import ValidationRules from "../validator-rules";

type PickMatching<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof PickMatching<ValidationRules, Function>;
  messageError: SimpleValidationError;
  params?: any[];
};

function expectIsValid({
  value,
  property,
  rule,
  messageError,
  params = [],
}: ExpectedRule) {
  const validator = ValidationRules.values(value, property);
  expect(() => {
    const method = validator[rule] as any;
    method(...params);
  }).not.toThrow(messageError);
}

function expectIsInvalid({
  value,
  property,
  rule,
  messageError,
  params = [],
}: ExpectedRule) {
  const validator = ValidationRules.values(value, property);
  //@ts-ignore
  expect(() => validator[rule](...params)).toThrow(messageError);
}

describe("ValidatorRules Unit Tests", () => {
  let validator: ValidationRules;
  test("value method", () => {
    validator = ValidationRules.values("test", "field");
    expect(validator).toBeInstanceOf(ValidationRules);
    expect(validator["value"]).toBe("test");
    expect(validator["property"]).toBe("field");
  });

  test("required validation rule", () => {
    const messageError = new SimpleValidationError("The field is required");

    let data: ExpectedRule[] = [
      { value: "test", property: "field", rule: "required", messageError },
      { value: 5, property: "field", rule: "required", messageError },
      { value: 0, property: "field", rule: "required", messageError },
      { value: false, property: "field", rule: "required", messageError },
    ];

    data.forEach((i) => expectIsValid(i));

    validator = ValidationRules.values("test", "field");
    expect(validator.required()).toHaveProperty("required");

    data = [
      { value: null, property: "field", rule: "required", messageError },
      { value: undefined, property: "field", rule: "required", messageError },
      { value: "", property: "field", rule: "required", messageError },
    ];

    data.forEach((i) => expectIsInvalid(i));
  });

  test("string validation rule", () => {
    const messageError = new SimpleValidationError(
      "The field must be a string"
    );
    let data: ExpectedRule[] = [
      { value: null, property: "field", rule: "string", messageError },
      { value: undefined, property: "field", rule: "string", messageError },
      { value: "test", property: "field", rule: "string", messageError },
    ];

    data.forEach((i) => expectIsValid(i));

    validator = ValidationRules.values("test", "field");
    expect(validator.required()).toHaveProperty("string");

    data = [
      { value: 5, property: "field", rule: "string", messageError },
      { value: {}, property: "field", rule: "string", messageError },
      { value: false, property: "field", rule: "string", messageError },
    ];

    data.forEach((i) => expectIsInvalid(i));
  });

  test("maxLength validation rule", () => {
    const messageError = new SimpleValidationError(
      "The field must be less or equal than 10 characters"
    );

    let data: ExpectedRule[] = [
      {
        value: null,
        property: "field",
        rule: "maxLength",
        messageError,
        params: [5],
      },
      {
        value: undefined,
        property: "field",
        rule: "maxLength",
        messageError,
        params: [5],
      },
      {
        value: "t".repeat(10),
        property: "field",
        rule: "maxLength",
        messageError,
        params: [10],
      },
    ];

    data.forEach((i) => expectIsValid(i));

    validator = ValidationRules.values("test", "field");
    expect(validator.maxLength(10)).toHaveProperty("string");

    validator = ValidationRules.values("t".repeat(11), "field");
    expect(() => validator.maxLength(10)).toThrow(messageError);
  });

  test("boolean validation rule", () => {
    const messageError = new SimpleValidationError(
      "The field must be a boolean"
    );

    let data: ExpectedRule[] = [
      { value: null, property: "field", rule: "boolean", messageError },
      { value: undefined, property: "field", rule: "boolean", messageError },
      { value: false, property: "field", rule: "boolean", messageError },
      { value: true, property: "field", rule: "boolean", messageError },
    ];

    data.forEach((i) => expectIsValid(i));

    validator = ValidationRules.values(false, "field");
    expect(validator).toHaveProperty("boolean");

    validator = ValidationRules.values("", "field");
    expect(() => validator.boolean()).toThrow(messageError);
  });

  it("should combine two or more validation rules", () => {
    validator = ValidationRules.values("test", "field");
    expect(() => validator.required().string().maxLength(10)).not.toThrow(
      new SimpleValidationError()
    );

    validator = ValidationRules.values("", "field");
    expect(() => validator.required().string().maxLength(10)).toThrow(
      new SimpleValidationError("The field is required")
    );

    validator = ValidationRules.values(5, "field");
    expect(() => validator.required().string().maxLength(10)).toThrow(
      new SimpleValidationError("The field must be a string")
    );

    validator = ValidationRules.values("t".repeat(11), "field");
    expect(() => validator.required().string().maxLength(10)).toThrow(
      new SimpleValidationError(
        "The field must be less or equal than 10 characters"
      )
    );

    validator = ValidationRules.values(null, "field");
    expect(() => validator.string()).not.toThrow(
      new SimpleValidationError("The field must be a string")
    );

    validator = ValidationRules.values(null, "field");
    expect(() => validator.string().maxLength(10)).not.toThrow(
      new SimpleValidationError(
        "The field must be less or equal than 10 characters"
      )
    );

    validator = ValidationRules.values(null, "field");
    expect(() => validator.boolean()).not.toThrow(
      new SimpleValidationError("The field must be a boolean")
    );
  });
});
