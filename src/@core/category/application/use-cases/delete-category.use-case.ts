import CategoryRepository from "../../domain/repositories/category.repository";
import UseCase from "../../../@seedwork/application/use-case";

export class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepository.findById(input.id);
    return this.categoryRepository.delete(entity.id);
  }
}

export default DeleteCategoryUseCase;

export class Input {
  id: string;
}

export type Output = void;
