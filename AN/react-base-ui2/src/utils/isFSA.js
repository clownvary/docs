import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isSymbol from 'lodash/isSymbol';

function isValidKey(key) {
  return [
    'type',
    'payload',
    'error',
    'meta'
  ].indexOf(key) > -1;
}

export default function isFSA(action) {
  return (
    isPlainObject(action) &&
    (isString(action.type) || isSymbol(action.type)) &&
    Object.keys(action).every(isValidKey)
  );
}
