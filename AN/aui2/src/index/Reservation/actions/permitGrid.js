import { gotoReservationDetailPageAction } from 'shared/actions/cancelPermit';
import URL from '../urls';

export const FETCH_PERMITS = 'FETCH_PERMITS';
export const FETCH_PERMITS_SUCCESS = 'FETCH_PERMITS_SUCCESS';
export const FETCH_PERMITS_FAILURE = 'FETCH_PERMITS_FAILURE';
export const SELECT_PERMIT = 'SELECT_PERMIT';
export const CHANGE_PERMITS_PAGE = 'CHANGE_PERMITS_PAGE';
export const CHANGE_PERMITS_SORT = 'CHANGE_PERMITS_SORT';
export const FETCH_PERMIT_STATUS_LIST = 'FETCH_PERMIT_STATUS_LIST';
export const FETCH_PERMIT_STATUS_LIST_SUCCESS = 'FETCH_PERMIT_STATUS_LIST_SUCCESS';
export const FETCH_PERMIT_STATUS_LIST_FAILURE = 'FETCH_PERMIT_STATUS_LIST_FAILURE';

export const IS_PERMIT_LOCK_SUCCESS = 'IS_PERMIT_LOCK_SUCCESS';
export const IS_PERMIT_LOCK_FAILURE = 'IS_PERMIT_LOCK_FAILURE';

export const FETCH_PERMIT_EVENT_INFO = 'FETCH_PERMIT_EVENT_INFO';
export const FETCH_PERMIT_EVENT_INFO_SUCCESS = 'FETCH_PERMIT_EVENT_INFO_SUCCESS';
export const FETCH_PERMIT_EVENT_INFO_FAILURE = 'FETCH_PERMIT_EVENT_INFO_FAILURE';

function _fetchPermits({
  headers,
  body
}) {
  return {
    types: [FETCH_PERMITS, FETCH_PERMITS_SUCCESS, FETCH_PERMITS_FAILURE],
    promise: API => API.get(URL.permits, {
      headers,
      body
    })
  };
}

export function fetchPermits({
  headers = {},
  body = {}
} = {}) {
  return dispatch => dispatch(_fetchPermits({
    headers,
    body
  }));
}

function _fetchPermitStatusList(id) {
  return {
    types: [FETCH_PERMIT_STATUS_LIST, FETCH_PERMIT_STATUS_LIST_SUCCESS,
      FETCH_PERMIT_STATUS_LIST_FAILURE],
    promise: API => API.get(URL.permitStatusList, {
      body: {
        permit_id: id
      }
    })
  };
}

function _selectPermit(permit) {
  return {
    type: SELECT_PERMIT,
    payload: {
      value: permit
    }
  };
}

export function selectPermit(permit) {
  return (dispatch) => {
    if (permit && permit.permit_id) {
      // please don't return the action
      dispatch(_fetchPermitStatusList(permit.permit_id));
    }
    return dispatch(_selectPermit(permit));
  };
}

export function changePage(pageNumber) {
  return {
    type: CHANGE_PERMITS_PAGE,
    payload: {
      value: pageNumber
    }
  };
}

export function changeSort({
  orderOption,
  orderBy
} = {
  orderOption: '',
  orderBy: ''
}) {
  return {
    type: CHANGE_PERMITS_SORT,
    payload: {
      value: {
        orderOption,
        orderBy
      }
    }
  };
}

export function changePageThenFetchPermits(pageNumber, params) {
  return (dispatch) => {
    dispatch(changePage(pageNumber));
    return dispatch(fetchPermits(params));
  };
}

function getPermitAccessible(permitID) {
  return {
    types: ['', IS_PERMIT_LOCK_SUCCESS, IS_PERMIT_LOCK_FAILURE],
    promise: API => API.get(URL.permitAccessible, {
      body: {
        permit_id: permitID
      }
    })
  };
}

export function isPermitAccessible(permitID) {
  return dispatch => dispatch(getPermitAccessible(permitID))
    .then(({
      payload: {
        body: {
          is_permit_accessible: accessible
        }
      }
    }) => {
      if (accessible === 'true') {
        dispatch(gotoReservationDetailPageAction(permitID));
      }
    });
}

function _fetchPermitEventIfo(permitId) {
  const url = __STATIC__ ? URL.permitEventInfo : `${URL.permitEventInfo}/${permitId}`;
  return {
    types: [FETCH_PERMIT_EVENT_INFO, '', ''],
    promise: API => API.get(url),
    meta: {
      ignoreLoadingbar: true,
      ignoreBusinessErrors: true
    }
  };
}

export function fetchPermitEventInfo(permitId) {
  return dispatch => dispatch(_fetchPermitEventIfo(permitId))
    .then(({ payload: {
      headers: { response_code: code, response_message: message },
      body: { permit_info: permitInfo } } }) => dispatch({
        type: FETCH_PERMIT_EVENT_INFO_SUCCESS,
        payload: {
          value: {
            code, message, permitInfo, permitId
          }
        }
      }), ({ payload: { headers: { response_code: code, response_message: message } } }) => {
      // handle non-system error only
        if (parseInt(code, 10) >= 1000) {
          return dispatch({
            type: FETCH_PERMIT_EVENT_INFO_FAILURE,
            payload: {
              value: {
                code, message, permitId
              }
            }
          });
        }

        return Promise.reject(code);
      });
}
