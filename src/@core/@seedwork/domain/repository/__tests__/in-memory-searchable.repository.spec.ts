import Entity from "../../entity/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";
import {
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface,
} from "../repository-contracts";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"];

  protected async applyFilter(
    items: StubEntity[],
    filter?: string
  ): Promise<StubEntity[]> {
    if (filter) {
      return items.filter((i) => {
        return (
          i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
          i.props.price.toString() === filter
        );
      });
    }
    return items;
  }
}

describe("InMemorySearchableRepository Unit tests", () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => (repository = new StubInMemorySearchableRepository()));

  describe("applyFilter method tests", () => {
    it("should no filter items when filter object is null", async () => {
      const items = [new StubEntity({ name: "test", price: 5 })];
      const filterSpy = jest.spyOn(items, "filter" as any);

      let itemsFiltered = await repository["applyFilter"](items);
      expect(filterSpy).not.toHaveBeenCalled();
      expect(itemsFiltered).toStrictEqual(itemsFiltered);
    });

    it("should filter items using filter parameter", async () => {
      //buscar por contains
      const items = [
        new StubEntity({ name: "test", price: 5 }),
        new StubEntity({ name: "TEST", price: 5 }),
        new StubEntity({ name: "fake", price: 0 }),
      ];
      const filterSpy = jest.spyOn(items, "filter" as any);

      let itemsFiltered = await repository["applyFilter"](items, "TEST");
      expect(filterSpy).toHaveBeenCalledTimes(1);
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);

      itemsFiltered = await repository["applyFilter"](items, "5");
      expect(filterSpy).toHaveBeenCalledTimes(2);
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
    });
  });

  describe("applyOrder method tests", () => {
    it("should no sort items", async () => {
      const items = [
        new StubEntity({ name: "b", price: 1 }),
        new StubEntity({ name: "a", price: 1 }),
      ];
      const sortSpy = jest.spyOn(items, "sort" as any);

      let itemsSorted = await repository["applySort"](items);
      expect(sortSpy).not.toHaveBeenCalled();
      expect(itemsSorted).toStrictEqual(items);

      itemsSorted = await repository["applySort"](items, "price", "asc");
      expect(sortSpy).not.toHaveBeenCalled();
      expect(itemsSorted).toStrictEqual(items);
    });

    it("should sort items", async () => {
      const items = [
        new StubEntity({ name: "b", price: 1 }),
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "c", price: 1 }),
      ];

      let itemsSorted = await repository["applySort"](items, "name", "asc");
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

      itemsSorted = await repository["applySort"](items, "name", "desc");
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
    });
  });

  describe("applyPaginate method tests", () => {
    it("should paginate items", async () => {
      const items = [
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "b", price: 1 }),
        new StubEntity({ name: "c", price: 1 }),
        new StubEntity({ name: "d", price: 1 }),
        new StubEntity({ name: "e", price: 1 }),
      ];

      let itemsPaginated = await repository["applyPaginate"](items, 1, 2);
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await repository["applyPaginate"](items, 2, 2);
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await repository["applyPaginate"](items, 3, 2);
      expect(itemsPaginated).toStrictEqual([items[4]]);

      itemsPaginated = await repository["applyPaginate"](items, 4, 2);
      expect(itemsPaginated).toStrictEqual([]);
    });
  });

  describe("search method tests", () => {
    it("should apply only paginate when other params is null", async () => {
      const entity = new StubEntity({ name: "b", price: 1 });
      const items = Array(16).fill(entity);
      repository.items = items;

      const searchOutput = await repository.search(new SearchParams());
      expect(searchOutput).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          sort: null,
          sort_dir: null,
          filter: null,
        })
      );
    });

    it("should apply paginate and filter", async () => {
      const items = [
        new StubEntity({ name: "test", price: 1 }),
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "TEST", price: 1 }),
        new StubEntity({ name: "TeSt", price: 1 }),
      ];

      repository.items = items;

      let output = await repository.search(
        new SearchParams({ page: 1, per_page: 2, filter: "TEST" })
      );

      expect(output).toStrictEqual(
        new SearchResult({
          items: [items[0], items[2]],
          total: 3,
          current_page: 1,
          per_page: 2,
          filter: "TEST",
        })
      );

      output = await repository.search(
        new SearchParams({ page: 2, per_page: 2, filter: "TEST" })
      );

      expect(output).toStrictEqual(
        new SearchResult({
          items: [items[3]],
          total: 3,
          current_page: 2,
          per_page: 2,
          filter: "TEST",
        })
      );
    });

    it("should apply paginate and sort", async () => {
      const items = [
        new StubEntity({ name: "b", price: 1 }),
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "d", price: 1 }),
        new StubEntity({ name: "e", price: 1 }),
        new StubEntity({ name: "c", price: 1 }),
      ];
      repository.items = items;

      const arrange = [
        {
          input: new SearchParams({
            per_page: 2,
            sort: "name",
          }),
          output: new SearchResult({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
          }),
        },
        {
          input: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
          }),
          output: new SearchResult({
            items: [items[4], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
          }),
        },
        {
          input: new SearchParams({
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          output: new SearchResult({
            items: [items[3], items[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
        },
        {
          input: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          output: new SearchResult({
            items: [items[4], items[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
        },
      ];

      for (const i of arrange) {
        let searchOutput = await repository.search(i.input);
        expect(searchOutput).toStrictEqual(i.output);
      }
    });

    it("should search using filter, sort and paginate", async () => {
      const items = [
        new StubEntity({ name: "test", price: 1 }),
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "TEST", price: 1 }),
        new StubEntity({ name: "e", price: 1 }),
        new StubEntity({ name: "TeSt", price: 1 }),
      ];
      repository.items = items;

      let output = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "TEST",
        })
      );

      expect(output).toStrictEqual(
        new SearchResult({
          items: [items[2], items[4]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "TEST",
        })
      );

      output = await repository.search(
        new SearchParams({
          page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "TEST",
        })
      );

      expect(output).toStrictEqual(
        new SearchResult({
          items: [items[0]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "TEST",
        })
      );
    });
  });
});
