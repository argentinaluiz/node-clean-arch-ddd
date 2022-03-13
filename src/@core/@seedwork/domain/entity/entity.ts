import ErrorBag from "../errors/error-bag";
import UniqueEntityId from "../value-objects/unique-entity-id";

export default abstract class Entity<Props = any> {
  readonly uniqueEntityId: UniqueEntityId;
  readonly error = new ErrorBag;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  protected abstract validate(): boolean;

  get is_valid(): boolean{
    return this.error.notHasError();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }


  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.uniqueEntityId.value,
      ...this.props,
    } as Required<{id: string} & Props>;
  }
}
