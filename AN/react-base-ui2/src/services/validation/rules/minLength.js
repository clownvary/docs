import getLength from '../utils/getLength';

const minLength = (value, param) => {
  param *= 1;
  if (isNaN(param)) {
    throw new Error('Invalid param');
  }

  const length = getLength(value);
  return length >= param;
};

export default {
  validateFunc: minLength,
  message: '{name} has minimal length {param}.'
};

