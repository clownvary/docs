import { ErrorObj, ErrorType } from 'react-base-ui/lib/common/error';
import { push } from 'index/actions/router';

export const isRedirectToNewCart = (errorResponse) => {
  if (ErrorObj.isErrorObj(errorResponse) && errorResponse.type === ErrorType.SERVICE) {
    const { data: { response: { code } } } = errorResponse;
    if (code === '4091') {
      return true;
    }
  }
  return false;
};

export const redirectToNewCart = dispatch => dispatch(push('newcart'));

