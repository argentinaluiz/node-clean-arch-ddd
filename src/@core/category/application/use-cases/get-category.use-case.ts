import CategoryRepository from "../../domain/repositories/category.repository";
import {
  CategoryOutput,
  CategoryOutputMapper,
} from "./dto/category-output.dto";
import Category from "../../domain/entities/category";
import UseCase from "../../../@seedwork/application/use-case";
import { Either } from "../../../@seedwork/domain/utils/either";
import NotFoundError from "../../../@seedwork/domain/errors/not-found.error";
import LoadEntityError from "../../../@seedwork/domain/errors/load-entity.error";
import GenericError from "../../../@seedwork/domain/errors/generic.error";
import createEitherFailFromGeneric from "../../../@seedwork/application/utils/either-fail-from-generic-error";

export class GetCategoryUseCase implements UseCase<Input, EitherOutput> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<EitherOutput> {
    try {
      const entity = await this.categoryRepository.findById(input.id);
      return this.toOutput(entity);
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

export default GetCategoryUseCase;

export type Input = {
  id: string;
};

type EitherOutput = Either.Either<
  CategoryOutput,
  NotFoundError | LoadEntityError | GenericError
>;
