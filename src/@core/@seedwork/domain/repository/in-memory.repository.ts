import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id";
import NotFoundError from "../errors/not-found.error";
import LoadEntityError from "../errors/load-entity.error";

import {
  RepositoryInterface,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
  SortDirection,
} from "./repository-contracts";
import EntityValidationError from "../errors/entity-validation.error";
import ErrorBag from "../errors/error-bag";

export default abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    return this.items.map((i) => {
      return i;
    });
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    const index = this.items.findIndex((i) => i.id === entity.id);
    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    const item = await this._get(_id);
    const indexFound = this.items.findIndex((i) => i.id === item.id);
    this.items.splice(indexFound, 1);
  }

  private async _get(id: string): Promise<E> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID '${id}'`);
    }
    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];

  async search(input: SearchParams): Promise<SearchResult<E>> {
    let itemsFiltered = await this.applyFilter(this.items, input.filter);
    let itemsSorted = await this.applySort(
      itemsFiltered,
      input.sort,
      input.sort_dir
    );
    let itemsPaginated = (
      await this.applyPaginate(itemsSorted, input.page, input.per_page)
    ).map((i) => {
      return i;
    });

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: input.page,
      per_page: input.per_page,
      sort: input.sort,
      sort_dir: input.sort_dir,
      filter: input.filter,
    });
  }

  protected abstract applyFilter(items: E[], filter?: string): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort?: string,
    sort_dir?: SortDirection
  ): Promise<E[]> {
    if (sort && this.sortableFields.includes(sort)) {
      return [...items].sort((a, b) => {
        const field = sort as keyof E;

        if (a.props[field] < b.props[field]) {
          return sort_dir === "asc" ? -1 : 1;
        }

        if (a.props[field] > b.props[field]) {
          return sort_dir === "asc" ? 1 : -1;
        }

        return 0;
      });
    }

    return items;
  }

  protected async applyPaginate(
    items: E[],
    page: number,
    per_page: number
  ): Promise<E[]> {
    const offset = (page - 1) * per_page;
    const limit = offset + per_page;

    return items.slice(offset, limit);
  }
}
