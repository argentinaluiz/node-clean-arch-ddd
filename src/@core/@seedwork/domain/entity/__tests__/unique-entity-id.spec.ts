import UniqueEntityId from "./../unique-entity-id";
import { validate as uuidValidate } from "uuid";
import InvalidArgumentError from "../../errors/invalid-argument.error";

function mockValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateMethodMock = mockValidateMethod();
    expect(() => new UniqueEntityId("fake id")).toThrow(
      new InvalidArgumentError("ID must be a valid UUID")
    );
    expect(validateMethodMock).toHaveBeenCalled();
  });

  it("should accept a uuid passed in contructor", () => {
    const validateMethodMock = mockValidateMethod();
    const uuid = "5490020a-e866-4229-9adc-aa44b83234c4";
    const id = new UniqueEntityId(uuid);
    expect(id.value).toBe(uuid);
    expect(validateMethodMock).toHaveBeenCalled();
  });

  it("should define a id when pass id not defined in constructor", () => {
    const validateMethodMock = mockValidateMethod();
    const id = new UniqueEntityId();
    expect(uuidValidate(id.value)).toBeTruthy();
    expect(validateMethodMock).toHaveBeenCalled();
  });
});
