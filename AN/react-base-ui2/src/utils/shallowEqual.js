const shallowEqual = (objA, objB) => {
  if (objA === objB && objA !== 0) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return !keysA.some(k => !hasOwnProperty.call(objB, k) || objA[k] !== objB[k]);
};

export default shallowEqual;
