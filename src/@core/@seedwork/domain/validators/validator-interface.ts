export type ValidationErrorFields = {
  [field: string]: string[];
};

export default interface ValidatorInterface {
  validate(data: any): void;
  get errors(): ValidationErrorFields;
}
