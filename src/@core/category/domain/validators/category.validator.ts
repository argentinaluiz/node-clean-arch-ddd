import { CategoryProperties } from "../entities/category";
import ClassValidatorFields from "../../../@seedwork/domain/validators/class.validator";
import {
  IsBoolean,
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id";

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}

export default CategoryValidatorFactory;

export class CategoryRules {
  @IsInstance(UniqueEntityId)
  @IsNotEmpty()
  id: UniqueEntityId;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  constructor(data: CategoryProperties & { id: UniqueEntityId }) {
    Object.assign(this, data);
  }
}

export class CategoryValidator extends ClassValidatorFields {
  validate(data: CategoryProperties & { id: UniqueEntityId }): boolean {
    return super._validate(this.makeRules(data));
  }

  // isValid(data: CategoryProperties & { id: UniqueEntityId }): boolean {
  //   return super._isValid(this.makeRules(data));
  // }

  private makeRules(data: any) {
    return new CategoryRules(data);
  }
}
