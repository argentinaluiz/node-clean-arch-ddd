import Entity from "../../entity/entity";
import LoadEntityError from "../../errors/load-entity.error";
import NotFoundError from "../../errors/not-found.error";
import UniqueEntityId from "../../value-objects/unique-entity-id";
import InMemoryRepository from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {
  constructor(props: StubEntityProps, id?: UniqueEntityId){
    super(props, id);
    this.validate();
  }
  protected validate(): boolean {
    if (this.props.name === "invalid") {
      this.error.add("The name field is invalid");
    }
    return this.error.hasError();
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => (repository = new StubInMemoryRepository()));

  test("validateEntity Method", () => {
    const entity = new StubEntity({ name: "invalid", price: 0 });
    expect(() => repository.validateEntity(entity)).toThrow(
      new LoadEntityError(entity.error)
    );
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error when a entity not found", () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 'fake id'`)
    );

    const id = new UniqueEntityId("0adc23be-b196-4439-a42c-9b0c7c4d1058");
    expect(repository.findById(id)).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID '0adc23be-b196-4439-a42c-9b0c7c4d1058'`
      )
    );
  });

  it("should throws error in findById method when a entity is invalid", () => {
    const entity = new StubEntity({ name: "invalid", price: 0 });
    repository.items = [entity];
    expect(repository.findById(entity.id)).rejects.toThrow(
      new LoadEntityError(entity.error)
    );
  });

  it("should find a entity by id", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(new UniqueEntityId(entity.id));
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should throws error in findAll method when a entity is invalid", () => {
    const entity = new StubEntity({ name: "invalid", price: 0 });
    repository.items = [entity];
    expect(repository.findAll()).rejects.toThrow(
      new LoadEntityError(entity.error)
    );
  });

  it("should returns all entities persisted", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when a entity not found", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID '${entity.id}'`)
    );
  });

  it("should throws error in update method when find a invalid entity", () => {
    const entity = new StubEntity({ name: "invalid", price: 0 });
    repository.items = [entity];
    expect(repository.update(entity)).rejects.toThrow(
      new LoadEntityError(entity.error)
    );
  });

  it("should update a entity", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: "updated", price: 1 },
      new UniqueEntityId(entity.id)
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error on delete when a entity not found", async () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 'fake id'`)
    );

    const id = new UniqueEntityId("0adc23be-b196-4439-a42c-9b0c7c4d1058");
    expect(repository.delete(id)).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID '0adc23be-b196-4439-a42c-9b0c7c4d1058'`
      )
    );
  });

  it("should throws error in delete method when find a invalid entity", () => {
    const entity = new StubEntity({ name: "invalid", price: 0 });
    repository.items = [entity];
    expect(repository.delete(entity.id)).rejects.toThrow(
      new LoadEntityError(entity.error)
    );
  });

  it("should delete a entity", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);
  });
});
