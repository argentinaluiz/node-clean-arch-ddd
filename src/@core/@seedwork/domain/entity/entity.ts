import EntityValidationError from "../errors/entity-validation.error";
import UniqueEntityId from "../value-objects/unique-entity-id";

export default abstract class Entity<Props = any> {
  readonly uniqueEntityId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    //this.uniqueEntityId = id || new UniqueEntityId();
    if (!id) {
      const [uniqueEntityId] = UniqueEntityId.create();
      this.uniqueEntityId = uniqueEntityId;
      return;
    }

    this.uniqueEntityId = id;
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      //id: this.uniqueEntityId.value,
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
