import { objectContaining } from "expect";
import ValidationError from "../errors/validation.error";
import ClassValidator from "../validators/class.validator";

// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       containErrorMessages: (expected: { [field: string]: string[] }) => R;
//     }
//   }
// }

type Expected = { validator: ClassValidator; data: any } | (() => any);

//type Expected = any;
expect.extend({
  containErrorMessages(
    expected: Expected,
    received: { [field: string]: string[] }
  ) {
    try {
      if (typeof expected === "function") {
        expected();
      } else {
        expected.validator.validate(expected.data);
      }
      return {
        pass: false,
        message: () => `The data is valid`,
      };
    } catch (e) {
      const error = e as ValidationError;
      const isMatch = objectContaining(received).asymmetricMatch(error.error);
      return isMatch
        ? {
            pass: true,
            message: () => "",
          }
        : {
            pass: false,
            message: () =>
              `The validation errors not contains ${JSON.stringify(
                received
              )}. Current: ${JSON.stringify(error.error)}`,
          };
    }
  },
});
