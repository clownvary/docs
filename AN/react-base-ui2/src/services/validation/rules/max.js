import compare from '../utils/compare';
import * as Operator from '../consts/Operator';

const max = (value, param, type) => compare(value, param, Operator.LESS_OR_EQUAL, type);

export default {
  validateFunc: max,
  message: '{name} has the maximum limitation {param}.'
};
