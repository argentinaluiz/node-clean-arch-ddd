import UniqueEntityId from "../../../../@seedwork/domain/value-objects/unique-entity-id";
import Category from "../../../domain/entities/category";
import { CategoryOutputDto } from "./category.dto";

describe("CategoryOutputDto Unit Tests", () => {
  it("should convert Category to CategoryDto", () => {
    const id = new UniqueEntityId();
    const created_at = new Date();
    const category = new Category(
      {
        name: "name test",
        description: "description test",
        is_active: true,
        created_at,
      },
      id
    );

    const dto = CategoryOutputDto.fromEntity(category);
    expect(dto).toStrictEqual({
      id: id.value,
      name: 'name test',
      description: 'description test',
      is_active: true,
      created_at
    });
  });
});
