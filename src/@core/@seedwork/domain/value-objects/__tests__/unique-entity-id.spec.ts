import UniqueEntityId from "../unique-entity-id";
import { validate as uuidValidate } from "uuid";
//import InvalidUuidError from "../../errors/invalid-uuid.error";

function mockValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {

  it("should accept a uuid passed in constructor", () => {
    const isValidMethodMock = mockValidateMethod();
    const uuid = "5490020a-e866-4229-9adc-aa44b83234c4";
    const id = new UniqueEntityId(uuid);
    expect(id.value).toBe(uuid);
    expect(isValidMethodMock).toHaveBeenCalled();
  });

  it("should define a id when pass id not defined in constructor", () => {
    const validateMethodMock = mockValidateMethod();
    const id = new UniqueEntityId();
    expect(uuidValidate(id.value)).toBeTruthy();
    expect(validateMethodMock).toHaveBeenCalled();
  });

  // it("should throw error when uuid is invalid", () => {
  //   const validateMethodMock = mockIsValidMethod();
  //   expect(() => new UniqueEntityId("fake id")).toThrow(
  //     new InvalidUuidError()
  //   );
  //   expect(validateMethodMock).toHaveBeenCalled();
  // });

  test("isValid method", () => {
    let vo = new UniqueEntityId();
    expect(vo['validate']()).toBeTruthy();

    vo = new UniqueEntityId("5490020a-e866-4229-9adc-aa44b83234c4");
    expect(vo['validate']()).toBeTruthy();

    vo = new UniqueEntityId("fake id");
    const spyHasError = jest.spyOn(vo.error, 'hasError');
    expect(vo['validate']()).toBeFalsy();
    expect(vo.error.errors).toStrictEqual(['ID must be a valid UUID']);
    expect(spyHasError).toBeCalled();
    expect(spyHasError.mock.results[0].value).toBeTruthy();

    vo['validate']();
    expect(spyHasError.mock.results[1].value).toBeTruthy();
  });
});
