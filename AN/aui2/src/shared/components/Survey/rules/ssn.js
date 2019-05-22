import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';
import { ErrorMessage } from '../consts';

const validateSSN = (ssn, ssnNumberOnly, ssnValidLength) => {
  if (!isString(ssn) || ssn.length === '') {
    return '';
  }

  if (ssnNumberOnly) {
    if (/[^\d]/.test(ssn)) {
      return ErrorMessage.CustomErrorKey.SSN_INVALID_CHARACTERS;
    }
  }

  if (isInteger(ssnValidLength) && ssn.length > ssnValidLength) {
    return ErrorMessage.CustomErrorKey.SSN_LONG;
  }

  return '';
};

export default validateSSN;
