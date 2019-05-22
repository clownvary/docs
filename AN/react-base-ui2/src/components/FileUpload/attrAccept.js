import endsWith from 'lodash/endsWith';

export default (file, validTypes) => {
  if (file && validTypes) {
    const validTypesArray = Array.isArray(validTypes)
      ? validTypes
      : validTypes.split(',');
    const fileName = file.name || '';
    const mimeType = file.type || '';
    const baseMimeType = mimeType.replace(/\/.*$/, '');

    return validTypesArray.some((type) => {
      const validType = type.trim();
      if (validType.charAt(0) === '.') {
        return endsWith(fileName.toLowerCase(), validType.toLowerCase());
      } else if (/\/\*$/.test(validType)) {
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  }
  return true;
};
