import ValueObject from "./value-object";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import {Either} from "../utils/either";
import InvalidUuidError from "../errors/invalid-uuid.error";

export default class UniqueEntityId extends ValueObject<string> {
  private constructor(id?: string) {
    super(id ?? uuidv4());
  }

  // private validate() {
  //   const isValid = uuidValidate(this._value);
  //   if (!isValid) {
  //     throw new InvalidUuidError()
  //   }
  // }

  static create(id?: string): Either.Either<UniqueEntityId, InvalidUuidError> {
    if(id){
      const isValid = this.validate(id);
      if(!isValid){
        return Either.fail(new InvalidUuidError)
      }
    }
    return Either.ok(new UniqueEntityId(id));
  }

  protected static validate(value: string): boolean {
    return uuidValidate(value);
  }
}