import UniqueEntityId from "../../../../@seedwork/domain/value-objects/unique-entity-id";
import CategoryValidatorFactory, {
  CategoryValidator,
} from "./../category.validator";

describe("Category validators tests", () => {
  describe("CategoryValidator Tests", () => {
    let validator: CategoryValidator;
    beforeEach(() => {
      validator = CategoryValidatorFactory.create();
    });

    test("invalidation cases for id field", () => {
      expect(() => validator.validate({ id: "" } as any)).toThrow(
        new Error(
          "Value object must be returns an Error instance when is invalid. It returns undefined type"
        )
      );

      expect({ validator, data: {id: UniqueEntityId.create('fake id')} }).containErrorMessages({
        id: [
          "ID must be a valid UUID",
        ],
      });
    });

    test("invalidation cases for name field", () => {
      expect({ validator, data: null }).containErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect({ validator, data: { name: "" } }).containErrorMessages({
        name: ["name should not be empty"],
      });

      expect({ validator, data: { name: 5 } }).containErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect({
        validator,
        data: { name: "t".repeat(256) },
      }).containErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    test("invalidation cases for description field", () => {
      expect({ validator, data: { description: 5 } }).containErrorMessages({
        description: ["description must be a string"],
      });
    });

    test("invalidation cases for is_active field", () => {
      expect({ validator, data: { is_active: 5 } }).containErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });

      expect({ validator, data: { is_active: 0 } }).containErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });

      expect({ validator, data: { is_active: 1 } }).containErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });

    test("validate cases for fields", () => {
      expect.assertions(0);
      //verificar o resultado do validate quando mudar para a nova forma
      //verificar o ID
      validator.validate({
        //id: new UniqueEntityId(),
        name: "test",
      });
      validator.validate({
        id: UniqueEntityId.create(),
        name: "test",
      });
      validator.validate({
        //id: new UniqueEntityId(),
        name: "test",
        description: undefined,
      });
      validator.validate({
        //id: new UniqueEntityId(),
        name: "test",
        description: null,
      });
      validator.validate({
        //id: new UniqueEntityId(),
        name: "test",
        is_active: true,
      });
      validator.validate({
        //id: new UniqueEntityId(),
        name: "test",
        is_active: false,
      });
    });
  });
});
