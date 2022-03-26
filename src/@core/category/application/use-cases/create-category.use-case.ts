import { Either } from "../../../@seedwork/domain/utils/either";
import CategoryRepository from "../../domain/repositories/category.repository";
import {
  CategoryOutput,
  CategoryOutputMapper,
} from "./dto/category-output.dto";
import Category from "../../domain/entities/category";
import UseCase from "../../../@seedwork/application/use-case";
import EntityValidationError from "../../../@seedwork/domain/errors/entity-validation.error";
import GenericError from "../../../@seedwork/domain/errors/generic.error";

export class CreateCategoryUseCase implements UseCase<Input, EitherOutput> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<EitherOutput> {
    const [entity, error] = InputMapper.toEntity(input);
    if (error) {
      return Either.fail(error);
    }

    try {
      await this.categoryRepository.insert(entity);
      return this.toEitherOutput(entity);
    } catch (e) {
      return Either.fail(new GenericError(e as Error));
    }
  }

  toEitherOutput(entity: Category): EitherOutput {
    return Either.ok(OutputMapper.from(entity));
  }
}

export default CreateCategoryUseCase;

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export class InputMapper {
  static toEntity(
    input: Input
  ): Either.Either<Category, EntityValidationError> {
    return Category.create(input);
  }
}

export type EitherOutput = Either.Either<
  CategoryOutput,
  EntityValidationError | GenericError
>;

export class OutputMapper {
  static from(entity: Category) {
    return CategoryOutputMapper.fromEntity(entity);
  }
}
