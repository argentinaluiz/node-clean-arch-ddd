import { SearchResult } from "../../domain/repository/repository-contracts";
import { PaginationOutputDto } from "./pagination-output.dto";

describe("PaginationOuputDto Unit Tests", () => {
  it("should convert SearchResult to PaginationOutputDto", () => {
    const searchResult = new SearchResult({
      items: [],
      total: 10,
      current_page: 2,
      per_page: 2,
    });

    const dto = PaginationOutputDto.fromRepoSearchResult(searchResult);
    expect(dto).toStrictEqual({
      total: 10,
      current_page: 2,
      per_page: 2,
      last_page: 5,
    });
  });
});
