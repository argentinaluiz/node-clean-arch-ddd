import ValueObject from "../value-object";

class StubValueObject extends ValueObject<any> {}

describe("ValueObject Unit Tests", () => {
  it("should set value", () => {
    const vo1 = new StubValueObject("string value");
    expect(vo1.value).toBe("string value");

    const vo2 = new StubValueObject({ prop1: "value1" });
    expect(vo2.value).toMatchObject({ prop1: "value1" });
  });

  it("should convert to a string", () => {
    const vo1 = new StubValueObject("string value");
    expect(vo1 + "").toBe("string value");

    const vo2 = new StubValueObject(0);
    expect(vo2 + "").toBe("0");

    const vo3 = new StubValueObject(true);
    expect(vo3 + "").toBe("true");

    const vo4 = new StubValueObject(false);
    expect(vo4 + "").toBe("false");

    const date = new Date();
    const vo5 = new StubValueObject(date);
    expect(vo5 + "").toBe(date.toString());

    const obj = { param1: "value1" };
    const vo6 = new StubValueObject(obj);
    expect(vo6 + "").toBe(JSON.stringify(obj));
  });

  it("should has a immutable props", () => {
    const obj = { param1: "value1", deep: { param2: "value2" } };
    const vo = new StubValueObject(obj);
    //@ts-ignore
    expect(() => (vo.value.param1 = "changed")).toThrow(
      "Cannot assign to read only property 'param1' of object '#<Object>'"
    );
    expect(() => (vo.value.deep.param2 = "changed")).toThrow(
      "Cannot assign to read only property 'param2' of object '#<Object>'"
    );
  });
});
