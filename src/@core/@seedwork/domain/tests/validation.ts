//import { Expected } from "../../@types/jest";
import { objectContaining } from "expect";
import Entity from "../entity/entity";
import EntityValidationError from "../errors/entity-validation.error";
//import ValidationError from "../errors/validation.error";
import ClassValidatorFields from "../validators/class.validator";

// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       containErrorMessages: (expected: { [field: string]: string[] }) => R;
//     }
//   }
// }
//type Expected = { validator: ClassValidatorFields; data: any } | ValidationError;
//type Expected = any;

type Expected =
  | { validator: ClassValidatorFields; data: any }
  | EntityValidationError;

// declare global {
//   namespace jest {
//     // noinspection JSUnusedGlobalSymbols
//     interface Matchers<R> {
//       containErrorMessages: (expected: { [field: string]: string[] }) => R;
//     }
//   }
// }

expect.extend({
  containErrorMessages(
    expected: Expected,
    received: { [field: string]: string[] }
  ) {
    const isValid =
      expected instanceof EntityValidationError
        ? false
        : expected.validator.validate(expected.data);

    if (isValid) {
      return {
        pass: false,
        message: () => `The data is valid`,
      };
    }
    const errors =
      expected instanceof EntityValidationError
        ? expected.error
        : expected.validator.errors;
    const isMatch = objectContaining(received).asymmetricMatch(errors);
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
            )}. Current: ${JSON.stringify(errors)}`,
        };
  },
});

//type Expected = { validator: ClassValidatorFields; data: any } | (() => any);

// expect.extend({
//   containErrorMessages(
//     expected: Expected,
//     received: { [field: string]: string[] }
//   ) {
//     try {
//       if (typeof expected === "function") {
//         expected();
//       } else {
//         expected.validator.validate(expected.data);
//       }
//       return {
//         pass: false,
//         message: () => `The data is valid`,
//       };
//     } catch (e) {
//       const error = e as ValidationError;
//       const isMatch = objectContaining(received).asymmetricMatch(error.error);
//       return isMatch
//         ? {
//             pass: true,
//             message: () => "",
//           }
//         : {
//             pass: false,
//             message: () =>
//               `The validation errors not contains ${JSON.stringify(
//                 received
//               )}. Current: ${JSON.stringify(error.error)}`,
//           };
//     }
//   },
// });
