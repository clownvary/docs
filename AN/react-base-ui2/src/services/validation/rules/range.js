const range = (value, param) => {
  let rangeParam = [];

  try {
    rangeParam = JSON.parse(param);
  } catch (e) {
    rangeParam = param;
  }

  return value >= rangeParam[0] && value <= rangeParam[1];
};

export default {
  validateFunc: range,
  message: 'Bla bla bla'
};
