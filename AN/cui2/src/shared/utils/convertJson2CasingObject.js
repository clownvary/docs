const formatKey2Casing = (key) => {
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
};

const convertJson2CasingObject = (json) => {
  if (Object.prototype.toString.call(json) === '[object Object]') {
    const objectItem = {};
    Object.keys(json).forEach((key) => {
      const value = convertJson2CasingObject(json[key]);
      objectItem[formatKey2Casing(key)] = value;
    });
    return objectItem;
  } else if (Object.prototype.toString.call(json) === '[object Array]') {
    const arrayItem = [];
    Object.keys(json).forEach((key) => {
      const value = convertJson2CasingObject(json[key]);
      arrayItem[formatKey2Casing(key)] = value;
    });
    return arrayItem;
  }
  return json;
};

export default convertJson2CasingObject;
