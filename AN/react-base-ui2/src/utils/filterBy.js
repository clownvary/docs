export default (obj, prefix) =>
Object.keys(obj).filter(key => key.indexOf(prefix) === 0)
  .reduce((res, key) => ({ ...res, [key]: obj[key] }), {});
