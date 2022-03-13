import CategoryRepository from "../../domain/repositories/category.repository";
import { CategoryOutputDto } from "./dto/category.dto";
import Category from "../../domain/entities/category";
import UseCase from '../../../@seedwork/application/use-case';

export class GetCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepository.findById(input.id);
    return this.toOutput(entity);
  }

  toOutput(entity: Category): Output {
    return Output.fromEntity(entity);
  }
}

export default GetCategoryUseCase;

export class Input {
  id: string;
}

export class Output extends CategoryOutputDto {
  
}
