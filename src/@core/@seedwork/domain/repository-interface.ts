import Entity from "./entity/entity";
import UniqueEntityId from "./entity/unique-entity-id";
//import { PaginatorInputParams, PaginatorResult } from './paginator';

export default interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<E>;
  findById(id: string | UniqueEntityId): Promise<E>;
  //paginate(params: PaginatorInputParams): Promise<PaginatorResult<T>>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<E>;
  delete(id: string | UniqueEntityId): Promise<void>;
  toEntity(model: any): E;
}
