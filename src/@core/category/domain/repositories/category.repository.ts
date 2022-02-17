import RepositoryInterface from "../../../@seedwork/domain/repository-interface";
import Category from "../entities/category";

export default interface CategoryRepository
  extends RepositoryInterface<Category> {}
