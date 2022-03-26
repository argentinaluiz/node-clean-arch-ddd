import Category from "../../../domain/entities/category";
import CategoryInMemoryRepository from "../category-in-memory.repository";

describe("CategoryInMemoryRepository", () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => (repository = new CategoryInMemoryRepository()));
  it("should no filter items when filter object is null", async () => {
    const items = [
      Category.create({ name: "test" })[0] //gerar uma funcao para ficar mais facil
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(itemsFiltered);
  });

  it("should filter items using filter parameter", async () => {
    const items = [
      Category.create({ name: "test" })[0],
      Category.create({ name: "TEST" })[0],
      Category.create({ name: "fake" })[0],
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, "TEST");
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const created_at = new Date();
    const items = [
      Category.create({ name: "test", created_at: created_at })[0],
      Category.create({
        name: "TEST",
        created_at: new Date(created_at.getTime() + 100),
      })[0],
      Category.create({
        name: "fake",
        created_at: new Date(created_at.getTime() + 200),
      })[0],
    ];

    let itemsSorted = await repository["applySort"](items);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it("should sort by name", async () => {
    const items = [
      Category.create({ name: "c" })[0],
      Category.create({ name: "b" })[0],
      Category.create({ name: "a" })[0],
    ];
    
    let itemsSorted = await repository["applySort"](items, "name", "asc");
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
