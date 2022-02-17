import ValueObject from './value-object';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import InvalidArgumentError from '../errors/invalid-argument.error';

export default class UniqueEntityId extends ValueObject<string> {
  constructor(id?: string) {
    super(id || uuidv4());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this._value);
    if (!isValid) {
      throw new InvalidArgumentError('ID must be a valid UUID');
    }
  }
}
