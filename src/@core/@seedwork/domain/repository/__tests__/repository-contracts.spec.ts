import Entity from "../../entity/entity";
import { SearchParams, SearchResult } from "../repository-contracts";

describe("SearchParams Unit Tests", () => {
  test("page field", () => {
    let input = new SearchParams();
    expect(input.page).toBe(1);

    const arrange = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: "", expected: 1 },
      { page: "fake", expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    arrange.forEach((i) =>
      expect(new SearchParams({ page: i.page as any }).page).toBe(i.expected)
    );
  });

  test("per_page field", () => {
    let input = new SearchParams();
    expect(input.per_page).toBe(15);

    const arrange = [
      { per_page: null as any, expected: 15 },
      { per_page: undefined as any, expected: 15 },
      { per_page: "", expected: 15 },
      { per_page: "fake", expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: -1, expected: 15 },
      { per_page: true, expected: 1 },
      { per_page: false, expected: 15 },
      { per_page: {}, expected: 15 },
      { per_page: 10, expected: 10 },
      { per_page: 20, expected: 20 },
    ];

    arrange.forEach((i) =>
      expect(new SearchParams({ per_page: i.per_page }).per_page).toBe(
        i.expected
      )
    );
  });

  test("sort field", () => {
    let input = new SearchParams();
    expect(input.sort).toBeNull();

    const arrange = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: "", expected: null },
      { sort: "fake", expected: "fake" },
      { sort: 0, expected: "0" },
      { sort: -1, expected: "-1" },
      { sort: true, expected: "true" },
      { sort: false, expected: "false" },
      { sort: {}, expected: "[object Object]" },
    ];

    arrange.forEach((i) =>
      expect(new SearchParams({ sort: i.sort as any }).sort).toBe(i.expected)
    );
  });

  test("sort_dir field", () => {
    let input = new SearchParams();
    expect(input.sort_dir).toBeNull();

    input = new SearchParams({ sort: null });
    expect(input.sort_dir).toBeNull();

    input = new SearchParams({ sort: undefined });
    expect(input.sort_dir).toBeNull();

    // input = new SearchParams({ sort: 0 as any });
    // expect(input.sort_dir).toBeNull();

    input = new SearchParams({ sort: "" });
    expect(input.sort_dir).toBeNull();

    const arrange = [
      { sort_dir: null, expected: "asc" },
      { sort_dir: undefined, expected: "asc" },
      { sort_dir: "", expected: "asc" },
      { sort_dir: "fake", expected: "asc" },
      { sort_dir: "asc", expected: "asc" },
      { sort_dir: "ASC", expected: "asc" },
      { sort_dir: "desc", expected: "desc" },
      { sort_dir: "DESC", expected: "desc" },
    ];

    arrange.forEach((i) =>
      expect(
        new SearchParams({ sort: "name", sort_dir: i.sort_dir as any }).sort_dir
      ).toBe(i.expected)
    );
  });

  test("filter field", () => {
    let input = new SearchParams();
    expect(input.filter).toBeNull();

    const arrange = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: "", expected: null },
      { filter: "fake", expected: "fake" },
      { filter: 0, expected: "0" },
      { filter: -1, expected: "-1" },
      { filter: true, expected: "true" },
      { filter: false, expected: "false" },
      { filter: {}, expected: "[object Object]" },
    ];

    arrange.forEach((i) =>
      expect(new SearchParams({ filter: i.filter as any }).filter).toBe(
        i.expected
      )
    );
  });
});

class StubEntity extends Entity {
  protected validate(){
    return true;
  }
}

describe("SearchResult Unit Tests", () => {
  test("constructor params", () => {
    const entity = new StubEntity({});
    let output = new SearchResult({
      items: [entity, entity] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
    });

    expect(output.toJSON()).toStrictEqual({
      items: [entity, entity],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      sort: null,
      sort_dir: null,
      filter: null
    });

    output = new SearchResult({
      items: [entity, entity] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "asc",
      filter: "test"
    });

    expect(output.toJSON()).toStrictEqual({
      items: [entity, entity],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      sort: "name",
      sort_dir: "asc",
      filter: "test",
    });
  });

  it('should set last_page field 1 when per_page field is greater than total field' , () => {
    const output = new SearchResult({
      items: [],
      total: 4,
      current_page: 1,
      per_page: 15,
    });

    expect(output.last_page).toBe(1);
  })
});
