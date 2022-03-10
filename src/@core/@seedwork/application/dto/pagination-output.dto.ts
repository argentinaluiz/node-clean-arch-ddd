import { SearchResult } from "../../domain/repository/repository-contracts";

export class PaginationOutputDto {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;

  static fromRepoSearchResult(
    result: SearchResult
  ): PaginationOutputDto {
    return {
      total: result.total,
      current_page: result.current_page,
      per_page: result.per_page,
      last_page: result.last_page,
    };
  }
}
