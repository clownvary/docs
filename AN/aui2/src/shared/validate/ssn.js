import { getCurrentInitState } from 'shared/utils/initStateHelper';
//* *****************************************************************
//
//  Validate a social security number
//
//* *****************************************************************
export default function validSSN(ssn, msg) {
  let error = '';
  const initedState = getCurrentInitState();
  const ssnNumericOnly = initedState.ssn_numeric_only;
  const ssnValidLength = initedState.ssn_valid_length;
  if (ssnNumericOnly === 'true') {
    for (let i = 0; i < ssn.length; i += 1) {
      const c = ssn.charAt(i);
      if (isNaN(parseInt(c, 10))) {
        error = `${msg} contains invalid characters.`;
        return error;
      }
    }
  }

  if (ssn.length === 0) {
    return '';
  }

  if (ssn.length > ssnValidLength) {
    error = `${msg}should not be longer than ${ssnValidLength} digits.`;
    return error;
  }

  return '';
}
