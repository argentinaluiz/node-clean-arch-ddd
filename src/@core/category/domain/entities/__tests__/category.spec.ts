import { CategoryProperties } from "./../category";
//import { SimpleValidationError } from "./../../@seedwork/errors/validation.error";
import Category from "../category";
import { Either } from "../../../../@seedwork/domain/utils/either";
import EntityValidationError from "../../../../@seedwork/domain/errors/entity-validation.error";

describe("Category Unit Tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn().mockImplementation((data) => Either.ok(data));
  });

  it("should create a category", () => {
    const [category1] = Category.create({
      name: "Movie",
    });
    expect(Category.validate).toBeCalled();
    expect(category1.props).toMatchObject({
      name: "Movie",
      description: null,
      is_active: true,
      created_at: category1.props.created_at,
    });
    expect(category1.props.created_at).toBeInstanceOf(Date);

    const date = new Date();
    const [category2] = Category.create({
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

    //Category.validate = jest.fn().mockReturnValue([props, null]);
    const [category3] = Category.create({
      name: "Movie",
      is_active: true,
    });
    expect(category3.props.is_active).toBeTruthy();
  });

  it("should returns an EntityValidationError on create when props are invalid", () => {
    Category.validate = jest
      .fn()
      .mockImplementation((data) =>
        Either.fail(
          new EntityValidationError({ name: ["The field is required"] })
        )
      );
    const [category, error] = Category.create({} as any);
    expect(category).toBeNull();
    expect(error).toBeInstanceOf(EntityValidationError);
  });

  it("should active a category", () => {
    let props: CategoryProperties = { name: "Filmes", is_active: false };
    const [category] = Category.create(props);
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("should disable a category", () => {
    let props: CategoryProperties = { name: "Filmes", is_active: true };
    const [category] = Category.create(props);
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });

  test("should be updated props", () => {
    const [category] = Category.create({ name: "Movie" });
    const error = category.update("Documentary", "some description");
    expect(error).toBeUndefined();
    expect(Category.validate).toBeCalled();
    expect(category.name).toBe("Documentary");
    expect(category.description).toBe("some description");
  });

  it("should returns an EntityValidationError on update when props are invalid", () => {
    const [category] = Category.create({ name: "Movie" });
    Category.validate = jest
      .fn()
      .mockImplementation((data) =>
        Either.fail(
          new EntityValidationError({ name: ["The field is required"] })
        )
      );
    const error = category.update("");
    expect(error).toBeInstanceOf(EntityValidationError);
  });

  test("props getters", () => {
    const [category] = Category.create({
      name: "Movie",
      description: "any description",
    });
    category.update("Documentary", "some description");
    expect(category.props.name).toBe("Documentary");
    expect(category.props.description).toBe("some description");
  });

  test("description prop setter", () => {
    const [category] = Category.create({
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

// describe("Category Unit Tests", () => {
//   beforeEach(() => {
//     Category.prototype.validate = jest.fn()
//   })
//   test("constructor of Category", () => {
//     const category1 = new Category({
//       name: "Movie",
//     });
//     expect(Category.prototype.validate).toBeCalled();

//     expect(category1.props).toMatchObject({
//       name: "Movie",
//       description: null,
//       is_active: true,
//       created_at: category1.props.created_at,
//     });
//     expect(category1.props.created_at).toBeInstanceOf(Date);

//     const date = new Date();
//     const category2 = new Category({
//       name: "Movie",
//       description: "some description",
//       is_active: false,
//       created_at: date,
//     });
//     expect(category2.props).toMatchObject({
//       name: "Movie",
//       description: "some description",
//       is_active: false,
//       created_at: date,
//     });

//     const category3 = new Category({
//       name: "Movie",
//       is_active: true,
//     });
//     expect(category3.props.is_active).toBeTruthy();
//   });

//   it("should active a category", () => {
//     const category = new Category({
//       name: "Filmes",
//       is_active: false,
//     });
//     category.activate();
//     expect(Category.prototype.validate).toBeCalled();
//     expect(category.is_active).toBeTruthy();
//   });

//   test("should disable a category", () => {
//     const category = new Category({
//       name: "Filmes",
//       is_active: true,
//     });
//     category.deactivate();
//     expect(Category.prototype.validate).toBeCalled();
//     expect(category.is_active).toBeFalsy();
//   });

//   test("should be updated props", () => {
//     const category = new Category({
//       name: "Movie",
//     });
//     category.update("Documentary", "some description");
//     expect(Category.prototype.validate).toBeCalledTimes(2);
//     expect(category.name).toBe("Documentary");
//     expect(category.description).toBe("some description");
//   });

//   test("props getters", () => {
//     const category = new Category({
//       name: "Movie",
//       description: "any description",
//     });
//     category.update("Documentary", "some description");
//     expect(category.props.name).toBe("Documentary");
//     expect(category.props.description).toBe("some description");
//   });

//   test("description prop setter", () => {
//     const category = new Category({
//       name: "Movie",
//     });
//     category["description"] = undefined;
//     expect(category.props.description).toBe(null);
//     category["description"] = "value";
//     expect(category.props.description).toBe("value");
//     category["description"] = null;
//     expect(category.props.description).toBe(null);
//   });
// });
