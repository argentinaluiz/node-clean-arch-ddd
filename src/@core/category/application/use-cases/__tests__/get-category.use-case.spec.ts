import GetCategoryUseCase, { Input } from "../get-category.use-case";
import CategoryInMemoryRepository from "../../../infra/repositories/category-in-memory.repository";
import Category from "../../../domain/entities/category";

describe("GetCategory Unit Tests", () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  it("should returns the output with a category", async () => {
    const items = [
      new Category({ name: "test 1" }),
    ];
    repository.items = items;

    const output = await useCase.execute({id: items[0].id});
    expect(output).toStrictEqual(items[0].toJSON());
  });
});