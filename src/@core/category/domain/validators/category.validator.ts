import { Either } from './../../../@seedwork/domain/utils/either';
import { CategoryProperties } from "../entities/category";
import ClassValidatorFields from "../../../@seedwork/domain/validators/class.validator";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id";
import ValueObjectValidate from "../../../@seedwork/infra/validators/value-object-validate";
import { IsInstanceOf } from '@core/@seedwork/infra/validators/is-instace-of';

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}

export default CategoryValidatorFactory;

export class CategoryRules {
  // @IsInstanceOf(UniqueEntityId)
  // @IsNotEmpty()
  // id: UniqueEntityId;

  @ValueObjectValidate()
  @IsOptional()
  id?: UniqueEntityId | Either.Either<UniqueEntityId>; 

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

  @IsDate()
  @IsOptional()
  created_at: Date

  constructor(data: CategoryProperties & {id?: UniqueEntityId | Either.Either<UniqueEntityId>}) {
    Object.assign(this, data);
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  // validate(data: CategoryProperties & { id: UniqueEntityId }): boolean {
  //   return super._validate(this.makeRules(data));
  // }

  validate(data: CategoryProperties & {id?: UniqueEntityId | Either.Either<UniqueEntityId>}): boolean {
    return super._validate(this.makeRules(data));
  }

  // isValid(data: CategoryProperties & { id: UniqueEntityId }): boolean {
  //   return super._isValid(this.makeRules(data));
  // }

  private makeRules(data: any) {
    return new CategoryRules(data);
  }
}
