import AggregateRoot from "../aggregate-root";
import Entity from "../entity";

class StubAggregateRoot extends AggregateRoot<{
  prop1: string;
  prop2: number;
}> {}

describe("AggregateRoot Unit Tests", () => {
  it("should be a child class of Entity", () => {
    const entity = new StubAggregateRoot({ prop1: "prop1 value", prop2: 10 });
    expect(entity).toBeInstanceOf(Entity);
  });
});
