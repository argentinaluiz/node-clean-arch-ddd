import { objectContaining } from "expect";
import Entity from "../entity/entity";
//import ValidationError from "../errors/validation.error";
import ClassValidatorFields from "../validators/class.validator";

// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       containErrorMessages: (expected: { [field: string]: string[] }) => R;
//     }
//   }
// }

type Expected = { validator: ClassValidatorFields; data: any } | Entity;

//type Expected = any;
expect.extend({
  containErrorMessages(
    expected: Expected,
    received: { [field: string]: string[] }
  ) {
    const isValid =
      expected instanceof Entity
        ? expected.is_valid
        : expected.validator.validate(expected.data);

    if (isValid) {
      return {
        pass: false,
        message: () => `The data is valid`,
      };
    }
    const errors =
      expected instanceof Entity
        ? expected.error.errors.reduce<{ [key: string]: string[] }>(
            (prevValue, current) => {
              return {...prevValue, ...current as object}
            },
            {}
          )
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
