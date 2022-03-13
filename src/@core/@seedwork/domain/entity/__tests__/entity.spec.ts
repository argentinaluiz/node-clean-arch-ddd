import Entity from "../entity";
import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "../../value-objects/unique-entity-id";
import ErrorBag from "../../errors/error-bag";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {
  protected validate(): boolean {
    if (this.error.hasError()) {
      return false;
    }
    if (this.props.prop1 === "invalid") {
      this.error.add("The prop1 is invalid");
    }
    return this.error.notHasError();
  }
}

describe("Entity Unit Tests", () => {
  it("should set props and id", () => {
    const entity = new StubEntity({ prop1: "prop1 value", prop2: 10 });
    expect(entity.props).toMatchObject({ prop1: "prop1 value", prop2: 10 });
    expect(entity.id).not.toBeNull();
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const entity = new StubEntity(
      { prop1: "prop1 value", prop2: 10 },
      new UniqueEntityId("5490020a-e866-4229-9adc-aa44b83234c4")
    );
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe("5490020a-e866-4229-9adc-aa44b83234c4");
  });

  it("should convert id and props to JavaScript Object", () => {
    const entity = new StubEntity(
      { prop1: "prop1 value", prop2: 10 },
      new UniqueEntityId("5490020a-e866-4229-9adc-aa44b83234c4")
    );
    expect(entity.toJSON()).toMatchObject({
      id: "5490020a-e866-4229-9adc-aa44b83234c4",
      prop1: "prop1 value",
      prop2: 10,
    });
  });

  test('is_valid getter', () => {
    let entity = new StubEntity({prop1: 'valid', prop2: 0});
    entity['validate']();
    expect(entity.is_valid).toBeTruthy();

    entity = new StubEntity({prop1: 'invalid', prop2: 0});
    entity['validate']();
    expect(entity.is_valid).toBeFalsy();
  });

  test("validate method and error variable", () => {
    const mockIsValidMethod = jest.spyOn(StubEntity.prototype as any, "validate");
    let entity = new StubEntity({prop1: 'valid', prop2: 0});
    expect(entity['validate']()).toBeTruthy();
    expect(entity.error).toStrictEqual(new ErrorBag);
    expect(mockIsValidMethod).toHaveBeenCalled();

    const errorBag = new ErrorBag();
    errorBag.add("The prop1 is invalid");
    entity = new StubEntity({prop1: 'invalid', prop2: 0});
    expect(entity['validate']()).toBeFalsy();
    expect(entity.error).toStrictEqual(errorBag);
  });
});
