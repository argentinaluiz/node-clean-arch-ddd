import {
  SearchableRepositoryInterface,
  SearchProps as DefaultSearchProps,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "../../../@seedwork/domain/repository/repository-contracts";
import Category from "../entities/category";

export type CategorySearchFilter = string;

export interface SearchProps extends DefaultSearchProps<CategorySearchFilter> {}
export class SearchParams extends DefaultSearchParams<CategorySearchFilter> {}
export class SearchResult extends DefaultSearchResult<
  Category,
  CategorySearchFilter
> {}

export interface CategoryRepository
  extends SearchableRepositoryInterface<
    Category,
    CategorySearchFilter,
    SearchParams,
    SearchResult
  > {
  search(props: SearchParams): Promise<SearchResult>;
}

export default CategoryRepository;