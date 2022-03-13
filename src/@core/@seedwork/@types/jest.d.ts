/// <reference types="jest" />

type Expected = { validator: ClassValidatorFields; data: any } | Entity;

declare namespace jest {
  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> {
    containErrorMessages: (expected: Expected) => R;
  }
}
