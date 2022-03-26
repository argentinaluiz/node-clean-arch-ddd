import EntityValidationError from "../../../../@seedwork/domain/errors/entity-validation.error";
import UniqueEntityId from "../../../../@seedwork/domain/value-objects/unique-entity-id";
import Category, { CategoryProperties } from "../category";
//import { SimpleValidationError } from "./../../@seedwork/errors/validation.error";

describe("Category Integration Tests", () => {
  it("should a valid entity", () => {
    const arrange: CategoryProperties[] = [
      { name: "Movie" },
      { name: "Movie", description: null },
      { name: "Movie", is_active: true },
      { name: "Movie", is_active: false },
      { name: "Movie", description: "description test", is_active: true },
    ];

    arrange.forEach((i) => {
      const [category, error] = Category.create(i);
      expect(error).toBeNull();
      expect(category).toBeInstanceOf(Category);
    });

    arrange.forEach((i) => {
      const [category] = Category.create(i, "5490020a-e866-4229-9adc-aa44b83234c4");
      expect(category).toBeInstanceOf(Category);
    });
  });

  it("should a invalid entity using id field", () => {
    const uniqueEntityIdOrError = UniqueEntityId.create('teste');
    let [, error] = Category.validate({ name: 'Movie', id: uniqueEntityIdOrError});
    expect(error).toBeInstanceOf(EntityValidationError);
    expect(error).containErrorMessages({
      id: [
        "ID must be a valid UUID",
      ],
    });
  });

  it("should a invalid entity using name field", () => {
    let [, error] = Category.validate({ name: null } as any);
    expect(error).toBeInstanceOf(EntityValidationError);
    expect(error).containErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    [, error] = Category.validate({ name: "" });
    expect(error).containErrorMessages({
      name: ["name should not be empty"],
    });

    [, error] = Category.validate({ name: "t".repeat(256) });
    expect(error).containErrorMessages({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  it("should a invalid entity using description field", () => {
    let [, error] = Category.validate({ name: null, description: 5 as any });
    expect(error).containErrorMessages({
      description: ["description must be a string"],
    });
  });

  it("should a invalid entity using is_active field", () => {
    let [, error] = Category.validate({ name: null, is_active: 5 as any });
    expect(error).containErrorMessages({
      is_active: ["is_active must be a boolean value"],
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
  // validar quando é string
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
});

// describe("Category Integration Tests", () => {

//   it("should a valid entity", () => {
//     expect.assertions(0);

//     let category = new Category({
//       name: "Movie",
//     });
//     category._validate();

//     category.props.description = null;
//     category.props.is_active = false;

//     category._validate();
//   });

//   it("should a invalid entity using name field", () => {
//     expect(() => new Category({ name: null })).containErrorMessages({
//       name: [
//         "name should not be empty",
//         "name must be a string",
//         "name must be shorter than or equal to 255 characters",
//       ],
//     });
//     expect(() => new Category({ name: "" })).containErrorMessages({
//       name: ["name should not be empty"],
//     });
//     expect(() => new Category({ name: "t".repeat(256) })).containErrorMessages({
//       name: ["name must be shorter than or equal to 255 characters"],
//     });
//   });

//   it("should a invalid entity using description field", () => {
//     expect(() => new Category({ name: null, description: 5 as any })).containErrorMessages({
//       description: [
//         "description must be a string",
//       ],
//     });
//   });

//   it("should a invalid entity using is_active field", () => {
//     expect(() => new Category({ name: null, is_active: 5 as any })).containErrorMessages({
//       is_active: [
//         "is_active must be a boolean value",
//       ],
//     });
//   });

//   // it("should a invalid entity using name field", () => {
//   //   expect(() => new Category({ name: null })).containErrorMessages({
//   //     name: [
//   //       "name should not be empty",
//   //       "name must be a string",
//   //       "name must be shorter than or equal to 255 characters",
//   //     ],
//   //   });
//   //   expect(() => new Category({ name: "" })).containErrorMessages({
//   //     name: ["name should not be empty"],
//   //   });
//   // });

//   // it("should a invalid entity", () => {
//   //   let category = new Category({
//   //     name: "",
//   //   });
//   //   expect(() => category._validate()).toThrow(
//   //     new SimpleValidationError("The name is required")
//   //   );
//   // validar quando é string
//   //   category = new Category({
//   //     name: "t".repeat(256),
//   //   });
//   //   expect(() => category._validate()).toThrow(
//   //     new SimpleValidationError(
//   //       "The name must be less or equal than 255 characters"
//   //     )
//   //   );

//   //   category = new Category({
//   //     name: 'Movie',
//   //     description: 5 as any,
//   //   });
//   //   expect(() => category._validate()).toThrow(
//   //     new SimpleValidationError(
//   //       "The description must be a string"
//   //     )
//   //   );

//   //   category = new Category({
//   //     name: 'Movie',
//   //   });
//   //   category.props.is_active = 1 as any;
//   //   expect(() => category._validate()).toThrow(
//   //     new SimpleValidationError(
//   //       "The is_active must be a boolean"
//   //     )
//   //   );
//   // });
// });
