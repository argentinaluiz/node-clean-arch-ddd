import Category from "../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../infra/repositories/category-in-memory.repository";
import CreateCategoryUseCase, {
  Input,
  Output,
} from "../create-category.use-case";

describe("CreateCategoryUseCase Unit Tests", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it("should convert input to entity", () => {
    let entity = Input.toEntity({ name: "test" });
    expect(entity.toJSON()).toMatchObject({
      name: "test",
      description: null,
      is_active: true,
    });

    entity = Input.toEntity({
      name: "test",
      description: "description test",
      is_active: false,
    });
    expect(entity.toJSON()).toMatchObject({
      name: "test",
      description: "description test",
      is_active: false,
    });
  });

  it("should convert entity to output", () => {
    let entity = new Category({ name: "test" });
    let output = Output.fromEntity(entity);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: entity.props.created_at,
    });

    entity = new Category({
      name: "test",
      description: "description test",
      is_active: false,
    });
    output = Output.fromEntity(entity);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: "description test",
      is_active: false,
      created_at: entity.props.created_at,
    });
  });

  it("should create a category", async () => {
    let output = await useCase.execute({ name: "test" });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test",
      description: null,
      is_active: true,
      created_at: repository.items[0].props.created_at,
    });

    output = await useCase.execute({
      name: "test",
      description: "test description",
      is_active: false,
    });
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: "test",
      description: "test description",
      is_active: false,
      created_at: repository.items[1].props.created_at,
    });
  });
});
