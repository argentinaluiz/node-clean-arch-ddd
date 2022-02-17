import Entity from "../../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../../@seedwork/domain/entity/unique-entity-id";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import RepositoryInterface from "../../../../@seedwork/domain/repository-interface";

type Model<ModelProps> = { id: string } & ModelProps;

export abstract class InMemoryRepository<E extends Entity<any>, MP>
  implements RepositoryInterface<E>
{
  public items: Model<MP>[] = [];

  async insert(entity: E): Promise<E> {
    this.items.push(entity.toJSON());
    return entity;
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    const item = await this._get(_id);
    return this.toEntity(item);
  }

  async findAll(): Promise<E[]> {
    throw this.items.map((i) => this.toEntity(i));
  }

  async update(entity: E): Promise<E> {
    await this._get(entity.id);
    this.items.push(entity.toJSON());
    return entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    const item = await this._get(_id);
    const indexFound = this.items.findIndex((i) => i.id === item.id);
    this.items.splice(indexFound, 1);
  }

  private async _get(id: string): Promise<M & { id: string }> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return item;
  }

  abstract toEntity(model: any): E;
}
