import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

const hasError = (item, fieldName = '') => {
  const { errors } = item;
  if (isEmpty(errors)) {
    return false;
  }

  const index = findIndex(errors, { name: fieldName });
  return index >= 0;
};


export default hasError;
