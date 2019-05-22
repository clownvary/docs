import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';

const required = (value) => {
  if (isArray(value) || isString(value)) {
    return value.length > 0;
  }

  return !isNil(value);
};

export default {
  validateFunc: required,
  message: '{name} is required.'
};
