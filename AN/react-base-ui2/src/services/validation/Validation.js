import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import assign from 'lodash/assign';
import Validator from './Validator';
import RuleDefs from './RuleDefs';
import buildErrorMessage from './utils/buildErrorMessage';
import { ErrorMessageMap } from './ValidationResult';


// build the rules and custom messages into a validation context
const createValidator = (rules, messages = {}) => new Validator(rules, messages);

const validate = (fieldName, value, rules = '', messages) => {
  const validator = isString(rules) ? createValidator(rules, messages) : rules;
  if (validator && isFunction(validator.validate)) {
    return validator.validate(fieldName, value);
  }

  throw new Error('Validation failed');
};

const registerRule = (...args) => RuleDefs.register(...args);
const clearRules = (...args) => RuleDefs.clear(...args);
const registerErrorMessages = (messages) => {
  assign(ErrorMessageMap, messages);
};

export default {
  buildErrorMessage,
  registerErrorMessages,
  registerRule,
  clearRules,
  createValidator,
  validate
};

