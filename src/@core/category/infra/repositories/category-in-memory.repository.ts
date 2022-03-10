import Category from "../../domain/entities/category";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import CategoryRepository from "../../domain/repositories/category.repository";
import { SortDirection } from "../../../@seedwork/domain/repository/repository-contracts";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Category[],
    filter?: string
  ): Promise<Category[]> {
    if (filter) {
      return items.filter((i) => {
        return i.props.name.toLowerCase().includes(filter.toLowerCase());
      });
    }
    return items;
  }

  protected async applySort(
    items: Category[],
    sort?: string,
    sort_dir?: SortDirection
  ): Promise<Category[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default CategoryInMemoryRepository;