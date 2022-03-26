import Entity from "../entity";
import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "../../value-objects/unique-entity-id";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity Unit Tests", () => {
  it("should set props and id", () => {
    const entity = new StubEntity({ prop1: "prop1 value", prop2: 10 });
    expect(entity.props).toMatchObject({ prop1: "prop1 value", prop2: 10 });
    expect(entity.id).not.toBeNull();
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const [id] = UniqueEntityId.create("5490020a-e866-4229-9adc-aa44b83234c4");
    const entity = new StubEntity({ prop1: "prop1 value", prop2: 10 }, id);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe("5490020a-e866-4229-9adc-aa44b83234c4");
  });

  it("should convert id and props to JavaScript Object", () => {
    const [id] = UniqueEntityId.create("5490020a-e866-4229-9adc-aa44b83234c4");
    const entity = new StubEntity(
      { prop1: "prop1 value", prop2: 10 },
      id
    );
    expect(entity.toJSON()).toMatchObject({
      id: "5490020a-e866-4229-9adc-aa44b83234c4",
      prop1: "prop1 value",
      prop2: 10,
    });
  });
});
