export type FieldsErrors = {
  [field: string]: string[];
};

export default interface ValidatorFieldsInterface {
  // validate(data: any): void;
  // isValid(data: any): boolean;
  validate(data: any): void;
  get errors(): FieldsErrors;
}
