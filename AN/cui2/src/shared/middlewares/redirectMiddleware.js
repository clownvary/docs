import React from 'react';
import { ErrorObj, ErrorType } from 'react-base-ui/lib/common/error';
import { ResponseCode } from 'react-base-ui/lib/common/restClient';

const USER_NOT_LOGIN = '0021'

export default ({ dispatch, getState }) => next => (action) => {
  if (!action.error) {
    return next(action);
  }

  const error = action.payload;
  if (ErrorObj.isErrorObj(error)) {
    const { data: { nextUrl, response: { code, message } } } = error;

    if (error.type === ErrorType.SERVICE && (
      code === ResponseCode.SESSION_TIMEOUT ||
      code === USER_NOT_LOGIN
    )) {
      const { login_url } = getState().systemSettings.toJS();
      // istanbul ignore else
      if (login_url) {
        /* istanbul ignore next */
        if (!__TESTING__) {
          const encodedNextUrl = nextUrl ? window.btoa(nextUrl) : '';
          if (code !== USER_NOT_LOGIN) {
            const errorMsg = message ? encodeURI(message) : '';
            window.location.href = `${login_url}?errormsg=${errorMsg}${encodedNextUrl ? `&params=${encodedNextUrl}` : ''}`;
          } else {
            // no message display at login page when user not login(response code is 0021)
            window.location.href = `${login_url}?${encodedNextUrl ? `params=${encodedNextUrl}` : ''}`;
          }
        }
        return false;
      }

    }

  }

  return next(action);
};
