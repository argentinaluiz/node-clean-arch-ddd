import domainValidators from '../../../@seedwork/domain/value-objects/unique-entity-id';
import { CategoryProperties } from "../entities/category";
import ClassValidator from "../../../@seedwork/domain/validators/class.validator";
import { IsBoolean, IsInstance, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}

export default CategoryValidatorFactory

export class CategoryRules {
  @IsInstance(domainValidators)
  @IsNotEmpty()
  id: domainValidators

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

  constructor(data: CategoryProperties & {id: domainValidators}) {
    Object.assign(this, data);
  }
}

export class CategoryValidator extends ClassValidator {
  validate(data: CategoryProperties & {id: domainValidators}): void {
    const rules = new CategoryRules(data);
    super._validate(rules);
  }
}
