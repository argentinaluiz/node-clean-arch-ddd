import CategoryRepository, {
  SearchProps,
  SearchParams,
  SearchResult,
} from "../../domain/repositories/category.repository";
import { PaginationOutputDto } from "../../../@seedwork/application/dto/pagination-output.dto";
import { CategoryOutputDto } from "./dto/category.dto";

export class ListCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input = null): Promise<Output> {
    const searchParams = this.toSearchParams(input ?? {});
    const searchOutput = await this.categoryRepository.search(searchParams);

    return this.toOutput(searchOutput);
  }

  private toSearchParams(input: Input) {
    return new SearchParams(input);
  }

  private toOutput(searchResult: SearchResult): Output {
    return {
      items: searchResult.items.map((i) => CategoryOutputDto.fromEntity(i)),
      ...PaginationOutputDto.fromRepoSearchResult(searchResult),
    };
  }
}

export default ListCategoriesUseCase;

export type Input = SearchProps;

export type Output = PaginationOutputDto & { items: CategoryOutputDto[] };
