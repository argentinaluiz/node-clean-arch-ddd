import ListCategoriesUseCase, { Input } from "../list-categories.use-case";
import CategoryInMemoryRepository from "../../../infra/repositories/category-in-memory.repository";
import Category from "../../../domain/entities/category";
import {
  SearchParams,
  SearchResult,
} from "../../../domain/repositories/category.repository";

describe("ListCategories Unit Tests", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  });

  test("toSearchParams method", () => {
    let input: Input = {};
    let searchParams = useCase["toSearchParams"](input);

    expect(searchParams).toStrictEqual(
      new SearchParams({
        page: 1,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      })
    );

    input = {
      page: 2,
      per_page: 2,
      sort: "name",
      sort_dir: "asc",
      filter: "test",
    };
    searchParams = useCase["toSearchParams"](input);

    expect(searchParams).toStrictEqual(
      new SearchParams({
        page: 2,
        per_page: 2,
        sort: "name",
        sort_dir: "asc",
        filter: "test",
      })
    );
  });

  test("toOutput method", () => {
    let entity = new Category({ name: "test" });
    let searchResult = new SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "asc",
    });
    let output = useCase["toOutput"](searchResult);

    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it("should returns the output with all categories when input is empty", async () => {
    const items = [
      new Category({ name: "test 1" }),
      new Category({ name: "test 2", created_at: new Date(new Date().getTime() + 100) }),
    ];
    repository.items = items;

    const output = await useCase.execute();
    expect(output).toStrictEqual({
      items: [...items].reverse().map((i) => i.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns the output with using paginate, filter and sort", async () => {
    const items = [
      new Category({ name: "a" }),
      new Category({ name: "AAA" }),
      new Category({ name: "AaA" }),
      new Category({ name: "b" }),
      new Category({ name: "c" }),
    ];
    repository.items = items;

    let output = await useCase.execute({page: 1, per_page: 2, sort: 'name', filter: 'a'});
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({page: 2, per_page: 2, sort: 'name', filter: 'a'});
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({page: 1, per_page: 2, sort: 'name', filter: 'a', sort_dir: 'desc'});
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
