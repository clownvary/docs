import { ErrorMessage } from '../consts';

const validateDuration = (value) => {
  if (value === '00:00:00') {
    return ErrorMessage.CustomErrorKey.REQUIRED;
  }

  return '';
};

export default validateDuration;
