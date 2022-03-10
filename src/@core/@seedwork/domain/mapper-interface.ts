import Entity from "./entity/entity";

export default interface Mapper<E extends Entity, P> {
  toEntity(persistence: P): E;
  toPersistence(t: E): P;
}
