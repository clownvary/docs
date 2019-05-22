import { addError } from 'shared/actions/Error';

import URL from '../urls';

export const FETCH_RUNNINGCART = 'FETCH_RUNNINGCART';
export const FETCH_RUNNINGCART_SUCCESS = 'FETCH_RUNNINGCART_SUCCESS';
export const FETCH_RUNNINGCART_FAILURE = 'FETCH_RUNNINGCART_FAILURE';

function _loadRunningCart(params) {
  return {
    types: [FETCH_RUNNINGCART, FETCH_RUNNINGCART_SUCCESS, FETCH_RUNNINGCART_FAILURE],
    promise: API => API.get(URL.runningCart, {
      body: {
        ...params
      }
    }),
    meta: {
      ignoreLoadingbar: true,
      ignoreBusinessErrors: true,
      ignoreSystemErrors: true
    }
  };
}

export function loadRunningCart(params) {
  return (dispatch, getState) => dispatch(_loadRunningCart(params))
    .then(() => {}, ({ payload: { headers: {
      response_code: code,
      response_message
  } } }) => {
      const isLoadingShow = getState().loading.get('display');
      if (code === '0002' && !isLoadingShow) {
        dispatch(addError({
          payload: {
            code,
            message: response_message
          }
        }));
      }
    });
}

export function fetchRunningCart(params) {
  return dispatch => dispatch(loadRunningCart({
    ...params
  }));
}
