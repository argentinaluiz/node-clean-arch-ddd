import Category from "../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../infra/repositories/category-in-memory.repository";
import UpdateCategoryUseCase from "../update-category.use-case";

describe("UpdateCategoryUseCase Unit Tests", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it("should update a category", async () => {
    const items = [new Category({ name: "test 1" })];
    repository.items = items;
    let output = await useCase.execute({
      id: items[0].id,
      name: "test changed",
    });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test changed",
      description: null,
      is_active: true,
      created_at: repository.items[0].props.created_at,
    });

    output = await useCase.execute({
      id: items[0].id,
      name: "test changed",
      description: "description changed",
    });

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test changed",
      description: "description changed",
      is_active: true,
      created_at: repository.items[0].props.created_at,
    });

    output = await useCase.execute({
      id: items[0].id,
      name: "test changed",
      description: "description changed",
      is_active: false,
    });

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test changed",
      description: "description changed",
      is_active: false,
      created_at: repository.items[0].props.created_at,
    });

    output = await useCase.execute({
      id: items[0].id,
      name: "test changed",
      description: "description changed",
      is_active: true,
    });

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test changed",
      description: "description changed",
      is_active: true,
      created_at: repository.items[0].props.created_at,
    });
  });
});
