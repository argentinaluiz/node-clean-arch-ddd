import ClassValidatorFields from "../class.validator";
import * as libValidator from "class-validator";
//import ValidationError from "../../errors/validation.error";

class StubClassValidator extends ClassValidatorFields<{field: string}> {
  validate(data: any): boolean {
    return super._validate(data);
  }
}

describe("ClassValidator Unit Tests", () => {
  it("should initialize errors and validatedData variables with null", () => {
    const validator = new StubClassValidator();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it("should validate with errors", () => {
    const validateSyncSpy = jest.spyOn(libValidator, "validateSync");
    validateSyncSpy.mockReturnValue([
      { property: "field", constraints: { isRequired: "some error" } },
    ])
    const validator = new StubClassValidator();

    expect(validator.validate({ field: "value" })).toBeFalsy();
    expect(validator.errors).toStrictEqual({ field: ["some error"] });
    expect(validator.validatedData).toBeNull();
    expect(validateSyncSpy).toHaveBeenCalled();
  });

  it("should validate without errors", () => {
    const validateSyncSpy = jest.spyOn(libValidator, "validateSync").mockReturnValue([]);
    const validator = new StubClassValidator();
    
    expect(validator.validate({ field: "value" })).toBeTruthy();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toStrictEqual({field: 'value'})
    expect(validateSyncSpy).toHaveBeenCalled();
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
