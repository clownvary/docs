import getLength from '../utils/getLength';

const maxLength = (value, param) => {
  param *= 1;
  if (isNaN(param)) {
    throw new Error('Invalid param');
  }

  const length = getLength(value);
  return length <= param;
};

export default {
  validateFunc: maxLength,
  message: '{name} has maximum length {param}.'
};
