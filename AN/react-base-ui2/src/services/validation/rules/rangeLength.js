import getLength from '../utils/getLength';

const rangeLength = (value, param) => {
  const length = getLength(value);
  let rangeParam = [];

  try {
    rangeParam = JSON.parse(param);
  } catch (e) {
    rangeParam = param;
  }
  return length >= rangeParam[0] && length <= rangeParam[1];
};

export default {
  validateFunc: rangeLength,
  message: 'Bla bla bla'
};
