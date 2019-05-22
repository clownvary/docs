import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

export default function getQueryString(object) {
  if (isObject(object)) {
    return Object.keys(object).reduce((acc, item) => {
      const prefix = !acc ? '' : `${acc}&`;
      return `${prefix + encodeURIComponent(item)}=${isArray(object[item]) ? encodeURIComponent(JSON.stringify(object[item])) : encodeURIComponent(object[item])}`;
    }, '');
  }
  return object;
}
