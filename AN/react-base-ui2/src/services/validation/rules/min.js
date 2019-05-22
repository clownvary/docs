import compare from '../utils/compare';
import * as Operator from '../consts/Operator';

const min = (value, param, type) => compare(value, param, Operator.GREATER_OR_EQUAL, type);

export default {
  validateFunc: min,
  message: '{name} has the minimal limitation {param}.'
};
