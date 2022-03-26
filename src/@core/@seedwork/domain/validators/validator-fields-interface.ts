export type FieldsErrors = {
  [field: string]: string[];
};

export default interface ValidatorFieldsInterface<PropsValidated> {
  // validate(data: any): void;
  // isValid(data: any): boolean;
  errors: FieldsErrors;
  validatedData: PropsValidated;

  validate(data: any): boolean;
}
