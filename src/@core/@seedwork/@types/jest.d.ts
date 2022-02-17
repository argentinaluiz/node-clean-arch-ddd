/// <reference types="jest" />

declare namespace jest {
  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> {
    containErrorMessages: (expected: { [field: string]: string[] }) => R;
  }
}
