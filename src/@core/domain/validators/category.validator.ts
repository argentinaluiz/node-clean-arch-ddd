import { CategoryProperties } from "../entities/category";
import ClassValidator from "../@seedwork/validators/class.validator";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}

export class CategoryRules {

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean

  constructor(data: CategoryProperties) {
    Object.assign(this, data);
  }
}

export class CategoryValidator extends ClassValidator {
  validate(data: CategoryProperties): void {
    const rules = new CategoryRules(data);
    super._validate(rules);
  }
}
