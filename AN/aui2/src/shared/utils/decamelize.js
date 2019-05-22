import { isPlainObject, isArray, isString } from './func';

const decamelize = str => str.replace(/([A-Z])[a-z]/g, matchStr => `_${matchStr.toLowerCase()}`);

const recurdecamelize = (obj) => {
  if (isArray(obj)) return obj.map(recurdecamelize);

  if (isPlainObject(obj)) {
    return Object.keys(obj).reduce((acc, key) => {
      const camel = decamelize(key);
      return { ...acc, [camel]: recurdecamelize(obj[key]) };
    }, {});
  }

  return obj;
};

export default (obj) => {
  if (isString(obj)) return decamelize(obj);

  return recurdecamelize(obj);
};
