//import { SimpleValidationError } from "./../../@seedwork/errors/validation.error";
import Category from "../category";

describe("Category Unit Tests", () => {
  test("constructor of Category", () => {
    const category1 = new Category({
      name: "Movie",
    });

    expect(category1.props).toMatchObject({
      name: "Movie",
      description: null,
      is_active: true,
      created_at: category1.props.created_at,
    });
    expect(category1.props.created_at).toBeInstanceOf(Date);

    const date = new Date();
    const category2 = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at: date,
    });
    expect(category2.props).toMatchObject({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at: date,
    });

    const category3 = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category3.props.is_active).toBeTruthy();
  });

  it("should a valid entity", () => {
    expect.assertions(0);

    let category = new Category({
      name: "Movie",
    });
    category._validate();

    category.props.description = null;
    category.props.is_active = false;

    category._validate();
  });

  it("should a invalid entity using name field", () => {
    expect(() => new Category({ name: null })).containErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });
    expect(() => new Category({ name: "" })).containErrorMessages({
      name: ["name should not be empty"],
    });
    expect(() => new Category({ name: "t".repeat(256) })).containErrorMessages({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  it("should a invalid entity using description field", () => {
    expect(() => new Category({ name: null, description: 5 as any })).containErrorMessages({
      description: [
        "description must be a string",
      ],
    });
  });

  it("should a invalid entity using is_active field", () => {
    expect(() => new Category({ name: null, is_active: 5 as any })).containErrorMessages({
      is_active: [
        "is_active must be a boolean value",
      ],
    });
  });

  // it("should a invalid entity using name field", () => {
  //   expect(() => new Category({ name: null })).containErrorMessages({
  //     name: [
  //       "name should not be empty",
  //       "name must be a string",
  //       "name must be shorter than or equal to 255 characters",
  //     ],
  //   });
  //   expect(() => new Category({ name: "" })).containErrorMessages({
  //     name: ["name should not be empty"],
  //   });
  // });

  // it("should a invalid entity", () => {
  //   let category = new Category({
  //     name: "",
  //   });
  //   expect(() => category._validate()).toThrow(
  //     new SimpleValidationError("The name is required")
  //   );
  //   category = new Category({
  //     name: "t".repeat(256),
  //   });
  //   expect(() => category._validate()).toThrow(
  //     new SimpleValidationError(
  //       "The name must be less or equal than 255 characters"
  //     )
  //   );

  //   category = new Category({
  //     name: 'Movie',
  //     description: 5 as any,
  //   });
  //   expect(() => category._validate()).toThrow(
  //     new SimpleValidationError(
  //       "The description must be a string"
  //     )
  //   );

  //   category = new Category({
  //     name: 'Movie',
  //   });
  //   category.props.is_active = 1 as any;
  //   expect(() => category._validate()).toThrow(
  //     new SimpleValidationError(
  //       "The is_active must be a boolean"
  //     )
  //   );
  // });

  it("should active a category", () => {
    const category = new Category({
      name: "Filmes",
      is_active: false,
    });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("should disable a category", () => {
    const category = new Category({
      name: "Filmes",
      is_active: true,
    });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });

  test("should be updated props", () => {
    const category = new Category({
      name: "Movie",
    });
    category.update("Documentary", "some description");
    expect(category.name).toBe("Documentary");
    expect(category.description).toBe("some description");
  });

  test("props getters", () => {
    const category = new Category({
      name: "Movie",
      description: "any description",
    });
    category.update("Documentary", "some description");
    expect(category.props.name).toBe("Documentary");
    expect(category.props.description).toBe("some description");
  });

  test("description prop setter", () => {
    const category = new Category({
      name: "Movie",
    });
    category["description"] = undefined;
    expect(category.props.description).toBe(null);
    category["description"] = "value";
    expect(category.props.description).toBe("value");
    category["description"] = null;
    expect(category.props.description).toBe(null);
  });
});
