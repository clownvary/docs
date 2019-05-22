import { ErrorObj } from 'react-base-ui/lib/common/error';

const isValidationErrorFromApi = (error) => {
  if (ErrorObj.isErrorObj(error)) {
    const { data: { response: { isValidationError } } } = error;
    if (isValidationError) {
      return true;
    }
  }
  return false;
}

export default {
  isValidationErrorFromApi
};
