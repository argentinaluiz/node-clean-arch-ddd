import Entity from "../../entity/entity";
import NotFoundError from "../../errors/not-found.error";
import UniqueEntityId from "../../value-objects/unique-entity-id";
import InMemoryRepository from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => (repository = new StubInMemoryRepository()));

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error when a entity not found", () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 'fake id'`)
    );

    const [id] = UniqueEntityId.create("0adc23be-b196-4439-a42c-9b0c7c4d1058");
    expect(repository.findById(id)).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID '0adc23be-b196-4439-a42c-9b0c7c4d1058'`
      )
    );
  });

  it("should find a entity by id", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    const [id] = UniqueEntityId.create(entity.id);
    entityFound = await repository.findById(id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
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

  it("should update a entity", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    await repository.insert(entity);

    const [id] = UniqueEntityId.create(entity.id);
    const entityUpdated = new StubEntity({ name: "updated", price: 1 }, id);
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error on delete when a entity not found", async () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 'fake id'`)
    );

    const [id] = UniqueEntityId.create("0adc23be-b196-4439-a42c-9b0c7c4d1058");
    expect(repository.delete(id)).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID '0adc23be-b196-4439-a42c-9b0c7c4d1058'`
      )
    );
  });

  it("should delete a entity", async () => {
    const entity = new StubEntity({ name: "test", price: 0 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);
  });
});
