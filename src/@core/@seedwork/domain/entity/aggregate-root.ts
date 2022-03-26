import { Either } from "../utils/either";
import Entity from "./entity";

export default abstract class AggregateRoot<T> extends Entity<T> {}