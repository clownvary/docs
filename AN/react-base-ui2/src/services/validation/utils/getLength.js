import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

const getLength = (value) => {
  let length = 0;
  if (isArray(value)) {
    length = value.length;
  } else if (isString(value)) {
    length = value.length;
  }

  return length;
};

export default getLength;
