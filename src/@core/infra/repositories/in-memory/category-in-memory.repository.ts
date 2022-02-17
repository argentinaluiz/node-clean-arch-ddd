import UniqueEntityId from "@core/domain/@seedwork/entity/unique-entity-id";
import Category, {
  CategoryProperties,
} from "../../../domain/entities/category";
import { InMemoryRepository } from "./in-memory.repository";

export default class CategoryInMemoryRepository extends InMemoryRepository<
  Category,
  CategoryProperties
> {
  toEntity({ id, ...props }: CategoryProperties & { id: string }): Category {
    return new Category(props, new UniqueEntityId(id));
  }
}
