import CategoryRepository from "../../../../domain/repositories/category.repository";
import ListCategoriesInput from "./list-categories.input";

export default class ListCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    input: ListCategoriesInput
  ): Promise<ListCategoriesOutput> {
    const categories = await this.categoryRepository.paginate(input);
    const output: ListCategoriesOutput = {
      items: categories.data.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        is_active: category.isActive,
      })),
      currentPage: categories.currentPage,
      lastPage: categories.lastPage,
      perPage: categories.perPage,
      total: categories.total,
    };
    return output;
  }
}
