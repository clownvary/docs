function _formatCasingKey(key) {
  let casingKey = '';
  key.split('_').forEach((s, idx) => {
    if (idx === 0) {
      casingKey = s;
    } else if (s === 'id') {
      casingKey += s.toUpperCase();
    } else {
      casingKey += s.charAt(0).toUpperCase() + s.slice(1);
    }
  });
  return casingKey;
}

export default function convertCasingPropObj(object) {
  if (Object.prototype.toString.call(object) === '[object Object]') {
    const obj = {};
    Object.keys(object).forEach((key) => {
      const value = convertCasingPropObj(object[key]);
      obj[_formatCasingKey(key)] = value;
    });
    return obj;
  } else if (Object.prototype.toString.call(object) === '[object Array]') {
    const arr = [];
    Object.keys(object).forEach((key) => {
      const value = convertCasingPropObj(object[key]);
      arr[_formatCasingKey(key)] = value;
    });
    return arr;
  }
  return object;
}

