import find from 'lodash/find';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';
import isRegExp from 'lodash/isRegExp';
import RuleDefs from './RuleDefs';
import * as DataType from './consts/DataType';
import ValidationResult from './ValidationResult';

const uniq = ruleSet => uniqBy(ruleSet, rule => rule.name);

const moveToTop = (ruleSet, name) => {
  let found = null;
  const result = ruleSet.filter((rule) => {
    if (rule.name === name) {
      found = rule;
      return false;
    }

    return true;
  });

  if (found) {
    result.unshift(found);
  }

  return result;
};

export default class Validator {
  constructor(rules, messages) {
    this.ruleSet = Validator.compile(rules, messages);
  }

  static compile(rules, messages = {}) {
    const src = rules.split('|');
    const ruleSet = src.map((rule) => {
      const [name, param] = rule.split(':');
      let paramValue = param;
      let paramType = DataType.NUMBER;
      if (param) {
        [paramValue, paramType] = param.split('@');
      }

      if (RuleDefs.has(name)) {
        const ruleDef = RuleDefs.get(name);
        let validateFunc;

        if (isRegExp(ruleDef.validateFunc)) {
          validateFunc = value => ruleDef.validateFunc.test(value);
        } else {
          validateFunc = value => ruleDef.validateFunc(value, paramValue, paramType);
        }

        const r = {
          name,
          validate: validateFunc,
          message: messages[name] || ruleDef.message
        };

        if (paramValue) {
          r.param = paramValue;
        }

        return r;
      }

      return null;
    }).filter(v => v !== null);

    return moveToTop(ruleSet, 'required');
  }

  validate(filedName, value) {
    for (let i = 0; i < this.ruleSet.length; i += 1) {
      const rule = this.ruleSet[i];
      if (value !== '' || rule.name === 'required') {
        const result = rule.validate(value);
        const valid = (isBoolean(result) && result === true) || result === '';
        if (!valid) {
          const errorRule = { ...rule };
          const errorCode = isString(result) ? result : '';
          return new ValidationResult(filedName, value, errorCode, errorRule);
        }
      }
    }

    return new ValidationResult(filedName, value);
  }

  getRuleCount() {
    return this.ruleSet.length;
  }

  getRuleSet() {
    return this.ruleSet;
  }

  findRule(name) {
    return find(this.ruleSet, { name });
  }

  addRule(name, func, message = '', index = -1) {
    if (index < 0) {
      index = this.getRuleCount();
    }

    index = Math.min(index, this.getRuleCount());

    const rule = {
      name,
      validate: func,
      message
    };

    this.ruleSet.splice(index, 0, rule);
    this.ruleSet = uniq(this.ruleSet);
    this.ruleSet = moveToTop(this.ruleSet, 'required');
  }

  removeRule(name) {
    remove(this.ruleSet, rule => rule.name === name);
  }
}
