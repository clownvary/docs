import { isPlainObject, isArray } from './func';
// import decamelize from './decamelize';

const encode = value => encodeURIComponent(value);

function getQueryString(object) {
  return Object.keys(object).reduce((acc, item) => {
    const prefix = !acc ? '' : `${acc}&`;
    return `${prefix + encode(item)}=${isArray(object[item]) ? encode(JSON.stringify(object[item])) : encode(object[item])}`;
  }, '');
}

export default function serializeData(data) {
  // return isPlainObject(data) ? getQueryString(decamelize(data)) : data;
  return isPlainObject(data) ? getQueryString(data) : data;
}
