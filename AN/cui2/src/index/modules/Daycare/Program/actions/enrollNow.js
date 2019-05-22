import { ErrorObj, ErrorType } from 'react-base-ui/lib/common/error';
import { push } from 'index/actions/router';

import API from '../api';

export const fetchEnrollNow = programId => dispatch => API.getEnrollNow()
  .catch((error) => {
    if (ErrorObj.isErrorObj(error)) {
      const { data: { response: { code } } } = error;
      if (error.type === ErrorType.SERVICE && code === '0021') {
        error.data.nextUrl = `${window.location.origin}${window.__siteBaseName}/daycare/program/enroll/${programId}`;
      }
    }
    return Promise.reject(error);
  }).then(() =>
    dispatch(push(`daycare/program/enroll/${programId}`))
  );
