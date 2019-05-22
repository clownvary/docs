import isNil from 'lodash/isNil';
import SysRules from './rules';

/*
 * `required|min[value:2]|max[value:10]` =>
 * [{"name":"required"},{"name":"min","value":"2"},{"name":"max","value":"10"}]
 */

class RuleDefs {
  constructor() {
    this.rules = { ...SysRules };
  }

  has(name) {
    return !isNil(this.rules[name]);
  }

  get(name) {
    return this.rules[name];
  }

  register(name, func, message = '', replace = false) {
    if (!name) {
      throw new Error('Register needs a name.');
    }

    if (this.has(name) && !replace) {
      throw new Error(`Duplicated rule (${name}).`);
    }

    this.rules[name] = {
      validateFunc: func,
      message
    };
  }

  clear(name) {
    delete this.rules[name];
  }
}

const globalRuleDefs = new RuleDefs();

export default globalRuleDefs;
