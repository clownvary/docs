import { isPlainObject, isArray, isString } from './func';

const camelize = str => str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());

const recurcamelize = (obj) => {
  if (isArray(obj)) return obj.map(recurcamelize);

  if (isPlainObject(obj)) {
    return Object.keys(obj).reduce((acc, key) => {
      const camel = camelize(key);
      return { ...acc, [camel]: recurcamelize(obj[key]) };
    }, {});
  }

  return obj;
};

export default (obj) => {
  if (isString(obj)) return camelize(obj);

  return recurcamelize(obj);
};

