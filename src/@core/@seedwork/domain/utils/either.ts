export namespace Either {
  export type Either<Ok, Error = any> = [Ok, Error];
  export function ok<T>(value: T): Either<T, null> {
    return [value, null];
  }
  export function fail<T>(error: T): Either<null, T> {
    return [null, error];
  }
  export function getOk<T, E>(eitherOrOk: Either<T, E> | T): T {
    if (Array.isArray(eitherOrOk) && eitherOrOk.length == 2) {
      return eitherOrOk[0];
    }

    return eitherOrOk as T;
  }
  export function isOk<T, E>(either: Either<T, E>) {
    if (Array.isArray(either) && either.length == 2) {
      return either[0] !== null;
    }

    return true;
  }
  export function isFail<T, E>(either: Either<T, E>) {
    return either[1] !== null;
  }
}

//export default Either;

//class-validator - objetos

//use case

//montar - montar objetos
