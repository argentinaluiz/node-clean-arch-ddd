import CategoryRepository from "../../domain/repositories/category.repository";
import {
  CategoryOutput,
  CategoryOutputMapper,
} from "./dto/category-output.dto";
import Category from "../../domain/entities/category";
import UseCase from "../../../@seedwork/application/use-case";
//import BadEntityOperationError from "../../../@seedwork/application/errors/bad-entity-operation.error";
import { Either } from "../../../@seedwork/domain/utils/either";
import EntityValidationError from "../../../@seedwork/domain/errors/entity-validation.error";
import NotFoundError from "../../../@seedwork/domain/errors/not-found.error";
import LoadEntityError from "../../../@seedwork/domain/errors/load-entity.error";
import GenericError from "../../../@seedwork/domain/errors/generic.error";

export class UpdateCategoryUseCase implements UseCase<Input, EitherOutput> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<EitherOutput> {
    const [entity, errorFind] = await this.findCategory(input.id);
    if (errorFind) {
      return Either.fail(errorFind);
    }

    const errorUpdate = entity.update(input.name, input.description);
    if (errorUpdate) {
      return Either.fail(errorUpdate);
    }

    if (input.is_active === true) {
      entity.activate();
    }
    if (input.is_active === false) {
      entity.deactivate();
    }

    try {
      await this.categoryRepository.update(entity);
    } catch (e) {
      return Either.fail(new GenericError(e as Error));
    }

    return this.toOutput(entity);
  }

  async findCategory(id: string) {
    try {
      return Either.ok(await this.categoryRepository.findById(id));
    } catch (e) {
      if (e instanceof NotFoundError || e instanceof LoadEntityError) {
        return Either.fail(e);
      }

      return Either.fail(new GenericError(e as Error));
    }
  }

  toOutput(entity: Category): EitherOutput {
    return Either.ok(CategoryOutputMapper.fromEntity(entity));
  }
}

export default UpdateCategoryUseCase;

export type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
};

type EitherOutput = Either.Either<
  CategoryOutput,
  NotFoundError | LoadEntityError | EntityValidationError | GenericError
>;
