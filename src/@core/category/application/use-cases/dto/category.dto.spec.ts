import UniqueEntityId from "../../../../@seedwork/domain/value-objects/unique-entity-id";
import Category from "../../../domain/entities/category";
import { CategoryOutputMapper } from "./category-output.dto";

describe("CategoryOutputMappter Unit Tests", () => {
  it("should convert Category to CategoryOutput", () => {
    const [id] = UniqueEntityId.create();
    const created_at = new Date();
    const [category] = Category.create(
      {
        name: "name test",
        description: "description test",
        is_active: true,
        created_at,
      },
      id.value
    );

    const dto = CategoryOutputMapper.fromEntity(category);
    expect(dto).toStrictEqual({
      id: id.value,
      name: 'name test',
      description: 'description test',
      is_active: true,
      created_at
    });
  });
});
