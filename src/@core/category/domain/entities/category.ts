import AggregateRoot from "../../../@seedwork/domain/entity/aggregate-root";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id";
import CategoryValidatorFactory from "../validators/category.validator";
import ValidatorRules from "../../../@seedwork/domain/validators/validator-rules";
import EntityValidationError from "../../../@seedwork/domain/errors/entity-validation.error";
import { Either } from "../../../@seedwork/domain/utils/either";

export type CategoryProperties = {
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends AggregateRoot<CategoryProperties> {
  //valid ou invalid
  private constructor(props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description;
    this.props.is_active = props.is_active ?? this.activate();
    this.props.created_at = props.created_at ?? new Date();
  }

  static create(
    props: CategoryProperties,
    id?: string
  ): Either.Either<Category, EntityValidationError> {
    const [validateData, error] = Category.validate({
      ...props,
      ...(id && { id: UniqueEntityId.create(id) }),
    });

    if (error) {
      return Either.fail(error);
    }
    const { id: idValidated, ...propsValidated } = validateData;
    const uniqueEntityId = id ? Either.getOk(idValidated) : null;
    return Either.ok(new Category(propsValidated, uniqueEntityId));
  }

  update(name: string, description?: string): EntityValidationError | void {
    const [validatedData, error] = Category.validate({
      ...this.props,
      name,
      description,
    });
    if (error) {
      return error;
    }
    this.props.name = validatedData.name;
    this.description = validatedData.description;
  }

  _validate() {
    ValidatorRules.values(this.props.name, "name")
      .required()
      .string()
      .maxLength(255);
    ValidatorRules.values(this.props.description, "description").string();
    ValidatorRules.values(this.props.is_active, "is_active")
      .required()
      .boolean();
  }

  //validate() {
  // CategoryValidatorFactory.create().validate({
  //   id: this.uniqueEntityId,
  //   ...this.props,
  // });
  //}

  static validate(props: CategoryProperties & {id?: UniqueEntityId | Either.Either<UniqueEntityId>}) {
    const categoryValidator = CategoryValidatorFactory.create();
    const isValid = categoryValidator.validate({
      ...props,
      id: props.id
    });
    //monad - either
    //notification pattern
    if (!isValid) {
      return Either.fail(new EntityValidationError(categoryValidator.errors));
    }

    return Either.ok(categoryValidator.validatedData);
  }

  activate(): true {
    this.props.is_active = true;
    return this.props.is_active;
  }

  deactivate(): false {
    this.props.is_active = false;
    return this.props.is_active;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }
}

export default Category;

//ValidatorInterface
//Implementacao da lib
//Cria implementa da entidade que usa a implementação da lib
//factory
