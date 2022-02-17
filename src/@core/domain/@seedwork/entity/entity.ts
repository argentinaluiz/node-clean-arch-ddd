import UniqueEntityId from "./unique-entity-id";

export default abstract class Entity<Props = any> {
  protected readonly _id: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this._id = id || new UniqueEntityId();
  }

  get id(): string {
    return this._id.value;
  }

  toJSON() {
    return {
      id: this._id.value,
      ...this.props,
    };
  }
}