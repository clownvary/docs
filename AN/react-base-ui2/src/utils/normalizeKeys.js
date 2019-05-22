import camelCase from 'lodash/camelCase';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

function normalizeKeys(object) {
  if (isArray(object)) {
    const arr = [];
    Object.keys(object).forEach((key) => {
      const value = normalizeKeys(object[key]);
      arr[camelCase(key)] = value;
    });
    return arr;
  } else if (isObject(object)) {
    const obj = {};
    Object.keys(object).forEach((key) => {
      const value = normalizeKeys(object[key]);
      obj[camelCase(key)] = value;
    });
    return obj;
  }
  return object;
}

export default normalizeKeys;
