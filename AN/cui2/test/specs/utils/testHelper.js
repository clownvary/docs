import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import clone from 'lodash/clone';
import slice from 'lodash/slice';
import findIndex from 'lodash/findIndex';

const isIncluding = (expectedArray, actualArray) => {
  if (!isArray(expectedArray) || !isArray(actualArray)) {
    return false;
  }
  return expectedArray.every(eItem => findIndex(actualArray, eItem) !== -1);
};

function isIncludingByOrder(expectedArray, actualArray) {
  if (!isArray(expectedArray) || !isArray(actualArray)) {
    return false;
  }

  let cloneActualArray = clone(actualArray);

  let success = true;

  forEach(expectedArray, (value) => {
    const index = findIndex(cloneActualArray, value);

    if (index === -1) {
      success = false;
      return false;
    }

    cloneActualArray = slice(cloneActualArray, index + 1);
    return true;
  });

  return success;
}

export default {
  isIncluding,
  isIncludingByOrder
};
