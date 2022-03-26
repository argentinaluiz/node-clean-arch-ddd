import Category from "../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../infra/repositories/category-in-memory.repository";
import DeleteCategoryUseCase from "../delete-category.use-case";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it("should update a category", async () => {
    const items = [
      Category.create({ name: "test 1" })[0]
    ];
    repository.items = items;
    let [output] = await useCase.execute({
      id: items[0].id,
    });
    expect(output).toBe(null);
    expect(repository.items).toHaveLength(0);
  });
});
