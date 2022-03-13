import ClassValidatorFields from "../class.validator";
import * as libValidator from "class-validator";
//import ValidationError from "../../errors/validation.error";

class StubClassValidator extends ClassValidatorFields {
  validate(data: any): boolean {
    return super._validate(data);
  }
}

describe("ClassValidator Unit Tests", () => {
  test("_errors variable and errors method", () => {
    const validator = new StubClassValidator();
    expect(validator.errors).toBeNull();

    validator["_errors"] = { field: ["some error"] };
    expect(validator.errors).toMatchObject({ field: ["some error"] });
  });

  it("should validate without errors", () => {
    const validateSyncSpy = jest.spyOn(libValidator, "validateSync");
    const validator = new StubClassValidator();

    expect(validator.validate({ field: "value" })).toBeTruthy();
    expect(validator.errors).toBeNull();
    expect(validateSyncSpy).toHaveBeenCalled();

    validateSyncSpy.mockReturnValue([
      { property: "field", constraints: { isRequired: "some error" } },
    ]);
    expect(validator.validate({ field: "value" })).toBeFalsy();
    expect(validator.errors).toStrictEqual({ field: ["some error"] });
  });

  // it("should validate with throw ValidatorError", () => {
  //   const validateSyncSpy = jest
  //     .spyOn(libValidator, "validateSync")
  //     .mockReturnValue([
  //       {
  //         property: "field",
  //         constraints: {
  //           isRequired: "The field is required",
  //           otherRule: "some error message",
  //         },
  //       },
  //     ]);
  //   const validator = new StubClassValidator();

  //   expect(() => validator.validate({ field: "value" })).toThrow(
  //     new ValidationError({
  //       field: ["The field is required", "some error message"],
  //     })
  //   );
  //   expect(validator.errors).toMatchObject({
  //     field: ["The field is required", "some error message"],
  //   });
  //   expect(validateSyncSpy).toHaveBeenCalled();
  // });
});
