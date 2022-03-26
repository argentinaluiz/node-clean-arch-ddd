import GenericError from "../../domain/errors/generic.error";
import { Either } from "../../domain/utils/either";

export default function createEitherFailFromGeneric(e: Error, exceptErrors: any[]): Either.Either<null, Error> {
  for (const exceptError of exceptErrors) {
    if (e instanceof exceptError) {
      return Either.fail(e);
    }
  }
  return Either.fail(new GenericError(e));
}
