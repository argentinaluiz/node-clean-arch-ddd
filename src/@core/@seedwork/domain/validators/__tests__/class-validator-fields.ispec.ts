import ClassValidatorFields from "../class.validator";
import ValidationError from "../../errors/validation.error";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  money: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassValidator extends ClassValidatorFields {
  validate(data: any): boolean {
    return super._validate(new StubRules(data));
  }
}

describe("ClassValidator Integration Tests", () => {
  it("should throws validation errors", () => {
    const validator = new StubClassValidator();
    //expect(() => validator.validate(null)).toThrow(ValidationError);
    expect(validator.validate(null)).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
      money: [
        "money should not be empty",
        "money must be a number conforming to the specified constraints",
      ],
    });
  });

  it('should be valid', () => {
    const validator = new StubClassValidator();
    expect(validator.validate({name: 'name test', money: 5})).toBeTruthy();
    expect(validator.errors).toBeNull();
  })
});
