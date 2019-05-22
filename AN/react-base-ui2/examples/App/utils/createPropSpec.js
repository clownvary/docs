import toString from 'lodash/toString';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import find from 'lodash/find';
import * as PropSpecType from '../consts/PropSpecType';

class PropSpec {
  constructor(type, name, label, value) {
    this.name = name;
    this.label = label || name;
    this.type = type;
    this.value = value;
  }

  toString() {
    if (isFunction(this.value)) {
      return 'Function';
    }

    if (this.type === PropSpecType.ENUM) {
      if (isArray(this.options)) {
        const item = find(this.options, { value: this.value });
        return item ? (item.text || '') : '';
      } else if (isObject(this.options)) {
        let item = '';
        Object.keys(this.options).forEach((k) => {
          if (this.options[k] === this.value) {
            item = k;
          }
        });
        return item;
      }
    }

    return toString(this.value);
  }
}

export const createPropSpec = (type, name, label, value) => new PropSpec(type, name, label, value);

export const createTextPropSpec = (name, label, value) => {
  const spec = createPropSpec(PropSpecType.TEXT, name, label, value);
  return spec;
};

export const createObjectPropSpec = (name, label, value) => {
  const spec = createPropSpec(PropSpecType.OBJECT, name, label, value);
  return spec;
};

export const createOptionPropSpec = (name, label, value, options, asNumber = false) => {
  const spec = createPropSpec(PropSpecType.ENUM, name, label, value);
  spec.options = options;
  spec.asNumber = asNumber;
  return spec;
};

export const createBooleanPropSpec = (name, label, value) => {
  const spec = createPropSpec(PropSpecType.BOOLEAN, name, label, value);
  return spec;
};

export const createNumberPropSpec = (name, label, value) => {
  const spec = createPropSpec(PropSpecType.NUMBER, name, label, value);
  return spec;
};

export const createMomentPropSpec = (name, label, value) => {
  const spec = createPropSpec(PropSpecType.MOMENT, name, label, value);
  spec.format = 'MM/DD/YYYY';
  spec.toString = () => spec.value.format(spec.format);
  return spec;
};

export const createActionSpec = (name, label, callBack, param) => {
  const spec = createPropSpec(PropSpecType.ACTION, name, label, param);
  spec.callBack = callBack;
  return spec;
};
