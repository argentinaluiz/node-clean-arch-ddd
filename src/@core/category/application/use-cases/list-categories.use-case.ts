import LoadEntityError from "../../../@seedwork/domain/errors/load-entity.error";
import { Either } from "../../../@seedwork/domain/utils/either";
import CategoryRepository, {
  SearchProps,
  SearchParams,
  SearchResult,
} from "../../domain/repositories/category.repository";
import { PaginationOutputDto } from "../../../@seedwork/application/dto/pagination-output.dto";
import {
  CategoryOutput,
  CategoryOutputMapper,
} from "./dto/category-output.dto";
import UseCase from "../../../@seedwork/application/use-case";
import GenericError from "../../../@seedwork/domain/errors/generic.error";

export class ListCategoriesUseCase implements UseCase<Input, EitherOutput> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input = null): Promise<EitherOutput> {
    const searchParams = this.toSearchParams(input ?? {});
    try {
      const searchOutput = await this.categoryRepository.search(searchParams);
      return this.toOutput(searchOutput);
    } catch (e) {
      if (e instanceof LoadEntityError) {
        return Either.fail(e);
      }

      return Either.fail(new GenericError(e as Error));
    }
  }

  private toSearchParams(input: Input) {
    return new SearchParams(input);
  }

  private toOutput(searchResult: SearchResult): EitherOutput {
    return Either.ok({
      items: searchResult.items.map((i) => CategoryOutputMapper.fromEntity(i)),
      ...PaginationOutputDto.fromRepoSearchResult(searchResult),
    });
  }
}

export default ListCategoriesUseCase;

export type Input = SearchProps;

export type Output = PaginationOutputDto & { items: CategoryOutput[] };

type EitherOutput = Either.Either<Output, LoadEntityError | GenericError>;
