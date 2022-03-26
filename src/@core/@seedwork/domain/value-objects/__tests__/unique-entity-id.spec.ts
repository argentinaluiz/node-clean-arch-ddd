import UniqueEntityId from "../unique-entity-id";
import { validate as uuidValidate } from "uuid";
//import InvalidUuidError from "../../errors/invalid-uuid.error";

function mockValidateMethod() {
  return jest.spyOn(UniqueEntityId as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {

  test("validate method", () => {
    let isValid = UniqueEntityId['validate']("fake id");
    expect(isValid).toBeFalsy();

    isValid = UniqueEntityId['validate']("5490020a-e866-4229-9adc-aa44b83234c4");
    expect(isValid).toBeTruthy();
  });

  it("should accept a uuid passed in constructor", () => {
    const isValidateMethodMock = mockValidateMethod();
    const uuid = "5490020a-e866-4229-9adc-aa44b83234c4";
    const [id, error] = UniqueEntityId.create(uuid);
    expect(id.value).toBe(uuid);
    expect(error).toBeNull();
    expect(isValidateMethodMock).toHaveBeenCalled();
  });

  it("should define a id when pass id not defined in constructor", () => {
    const validateMethodMock = mockValidateMethod();
    const [id, error] = UniqueEntityId.create();
    expect(uuidValidate(id.value)).toBeTruthy();
    expect(error).toBeNull();
    expect(validateMethodMock).not.toHaveBeenCalled();
  });

  // it("should throw error when uuid is invalid", () => {
  //   const validateMethodMock = mockIsValidMethod();
  //   expect(() => new UniqueEntityId("fake id")).toThrow(
  //     new InvalidUuidError()
  //   );
  //   expect(validateMethodMock).toHaveBeenCalled();
  // });
});
