export default (obj, re = /^(required|(aria|data)-.+)/) => obj && Object.keys(obj)
  .filter(key => re && re.test(key))
  .reduce((res, key) => ({ ...res,
    [key]: obj[key]
  }), {});
