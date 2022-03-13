import CategoryRepository from "../../domain/repositories/category.repository";
import { CategoryOutputDto } from "./dto/category.dto";
import Category from "../../domain/entities/category";
import UseCase from '../../../@seedwork/application/use-case';
import BadEntityOperationError from '../../../@seedwork/application/errors/bad-entity-operation.error';

export class UpdateCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output> {

    const entity = await this.categoryRepository.findById(input.id);
    
    entity.update(input.name, input.description);
    
    if(input.is_active === true){
      entity.activate()
    }

    if(input.is_active === false){
      entity.deactivate();
    }

    if(!entity.is_valid){
      throw new BadEntityOperationError(entity.error);
    }

    await this.categoryRepository.update(entity);
    return this.toOutput(entity);
  }

  toOutput(entity: Category): Output {
    return Output.fromEntity(entity);
  }
}

export default UpdateCategoryUseCase;

export class Input {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

export class Output extends CategoryOutputDto {
  
}
