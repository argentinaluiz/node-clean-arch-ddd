// class Notification {}

// Notification.add(ValidationException);

// category = this.categoryRepo.find(id);

// if (category.isInvalid) {
//   throw new LoadEntityError();
// }

// const search = new Search();

// if (search.isInvalid) {
//   throw new InvalidSearchParamsError();
// }

// this.categoryRepo.search();

// type Error = string | { [key: string]: string | string[] };

// class ErrorBag {
//   private _errors: Error[] = [];

//   get errors() {
//     return this._errors;
//   }

//   addError(error: Error) {
//     this._errors.push(error);
//   }

//   hasError() {
//     return !this._errors.length;
//   }

//   notHasError() {
//     return !this.hasError();
//   }
// }

// class Category {
//   private error = new ErrorBag();

//   private constructor(props) {
//     //colocar os campos
//     this.isValid();
//   }

//   static create(props): Category {
//     const error = !this.canCreate(props);
//     if (error) {
//       throw new InvalidEntityOperationError("create", error);
//     }

//     return new Category(props);
//   }

//   static canCreate(props): ErrorBag | true {
//     const category = new Category(props);
//     if (!category.isValid()) {
//       return category.error;
//     }

//     return true;
//   }

//   isValid() {
//     if (this.error.hasError()) {
//       return false;
//     }

//     if (!this.props.id.isValid()) {
//       this.error.addError({ id: this.props.id.error.errors });
//     }

//     const categoryValidator = CategoryFactory.create();
//     const isValid = categoryValidator.isValid(this);

//     if (!isValid) {
//       for (const field of Object.keys(categoryValidator.errors)) {
//         this.error.addError({ [field]: categoryValidator.errors[field] });
//       }
//     }

//     return this.error.hasError();
//   }
// }

// class UniqueEntityId {
//   private error = new ErrorBag();
//   isValid() {
//     if (this.error.hasError()) {
//       return false;
//     }
//     const isValid = uuidValidate(this._value);
//     if (!isValid) {
//       this.error.addError("ID must be a valid UUID");
//     }
//     return isValid;
//   }
// }
