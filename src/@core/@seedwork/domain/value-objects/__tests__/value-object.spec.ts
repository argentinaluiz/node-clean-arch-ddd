import ErrorBag from "../../errors/error-bag";
import ValueObject from "../../value-objects/value-object";

class StubValueObject extends ValueObject<any> {
  protected validate(): boolean {
    if (this.error.hasError()) {
      return false;
    }
    if (this.value === "invalid") {
      this.error.add("The value is invalid");
    }
    return this.error.notHasError();
  }
}

describe("ValueObject Unit Tests", () => {
  it("should set value", () => {
    const spyValidateMethod = jest.spyOn(StubValueObject.prototype as any, 'validate');
    const vo1 = new StubValueObject("string value");
    expect(vo1.value).toBe("string value");
    expect(spyValidateMethod).toBeCalled();

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

  test('is_valid getter', () => {
    let vo = new StubValueObject("valid");
    expect(vo.is_valid).toBeTruthy();

    vo = new StubValueObject("invalid");
    expect(vo.is_valid).toBeFalsy();
  });

  test("validate method and error variable", () => {
    const mockValidateMethod = jest.spyOn(
      StubValueObject.prototype as any,
      "validate"
    );
    let vo = new StubValueObject("valid");
    expect(vo["validate"]()).toBeTruthy();
    expect(vo.error).toStrictEqual(new ErrorBag());
    expect(mockValidateMethod).toHaveBeenCalled();

    const errorBag = new ErrorBag();
    errorBag.add("The value is invalid");
    vo = new StubValueObject("invalid");
    expect(vo["validate"]()).toBeFalsy();
    expect(vo.error).toStrictEqual(errorBag);
  });
});
