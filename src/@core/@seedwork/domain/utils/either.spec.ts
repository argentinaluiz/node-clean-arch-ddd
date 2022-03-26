import { Either } from './either';
describe("Either Unit Tests", () => {
  test("ok method", () => {
      const either = Either.ok(2);
      expect(either).toStrictEqual([2, null]);
  });

  test("fail", () => {
    const either = Either.fail(new Error('error test'));
    expect(either).toStrictEqual([null, new Error('error test')]);
  });

  test("getOk method", () => {
      const either = Either.ok(2);
      expect(Either.getOk(either)).toBe(2);
  });
});
