import { Either } from "../../domain/utils/either";
import ValueObject from "../../domain/value-objects/value-object";
import { ValueObjectValidator } from "./value-object-validate";

class StubValueObject extends ValueObject {}

describe("ValueObjectValidator Unit Tests", () => {
  let validator = new ValueObjectValidator();
  it("should returns true when value is null, undefined or a ValueObject instance", () => {
    let isValid = validator.validate(null, [] as any);
    expect(isValid).toBeTruthy();

    isValid = validator.validate(undefined, [] as any);
    expect(isValid).toBeTruthy();

    isValid = validator.validate(new StubValueObject("test"), [] as any);
    expect(isValid).toBeTruthy();
  });

  it("should returns true when ValueObject is valid", () => {
    const isValid = validator.validate(
      Either.ok(new StubValueObject("test")),
      [] as any
    );
    expect(isValid).toBeTruthy();
  });

  it("should thrown error when ValueObject error is not an Error instance", () => {
    expect(() =>
      validator.validate(Either.fail("fake error" as any), [] as any)
    ).toThrow(
      new Error(
        "Value object must be returns an Error instance when is invalid. It returns string type"
      )
    );
  });

  test("invalid case", () => {
    const isValid = validator.validate(
      Either.fail(new Error("some error")),
      [] as any
    );
    expect(isValid).toBeFalsy();
    expect(validator.defaultMessage([] as any)).toBe("some error");
  });
});
