export default class InvalidUuidError extends Error {
    constructor() {
      super('ID must be a valid UUID');
      this.name = 'InvalidUuidError';
    }
  }
  