import CategoryRepository from "../../domain/repositories/category.repository";
import UseCase from "../../../@seedwork/application/use-case";
import NotFoundError from "../../../@seedwork/domain/errors/not-found.error";
import LoadEntityError from "../../../@seedwork/domain/errors/load-entity.error";
import { Either } from "../../../@seedwork/domain/utils/either";
import GenericError from "../../../@seedwork/domain/errors/generic.error";
import createEitherFailFromGeneric from "../../../@seedwork/application/utils/either-fail-from-generic-error";
export class DeleteCategoryUseCase implements UseCase<Input, EitherOutput> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<EitherOutput> {
    try {
      const entity = await this.categoryRepository.findById(input.id);
      await this.categoryRepository.delete(entity.id);
      return Either.ok(null);
    } catch (e) {
      if (e instanceof NotFoundError || e instanceof LoadEntityError) {
        return Either.fail(e);
      }

      return Either.fail(new GenericError(e as Error));
    }
  }
}

export default DeleteCategoryUseCase;

export type Input = {
  id: string;
}

type EitherOutput = Either.Either<
  null,
  NotFoundError | LoadEntityError | GenericError
>;
