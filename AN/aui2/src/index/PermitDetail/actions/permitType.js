import API from 'shared/api/API';
import URL from '../urls';
import { permitDetailsChanged } from './index';

const _API = new API();

export const SET_PERMIT_RESERVATION_USERS = 'CHANGE_PERMIT_RESERVATION_USERS';
export const SET_PERMIT_RESERVATION_DATE = 'SET_PERMIT_RESERVATION_DATE';
export const SET_PERMIT_RESERVATION_TYPE = 'CHANGE_PERMIT_RESERVATION_TYPE';

function _savePermitType(params) {
  return _API.put(URL.savePermitType, {
    body: {
      ...params
    }
  });
}

export function setReservationType(value) {
  return {
    type: SET_PERMIT_RESERVATION_TYPE,
    payload: {
      value
    }
  };
}

export function changeReservationType(params, value) {
  return dispatch => _savePermitType(params)
    .then(() => {
      dispatch(permitDetailsChanged());
      return dispatch(setReservationType(value));
    });
}

export function setReservationDate(value) {
  return {
    type: SET_PERMIT_RESERVATION_DATE,
    payload: {
      value
    }
  };
}

export function changeReservationDate(params, value) {
  return dispatch => _savePermitType(params)
    .then(() => {
      dispatch(permitDetailsChanged());
      return dispatch(setReservationDate(value));
    });
}

export function setReservationUsers(value) {
  return {
    type: SET_PERMIT_RESERVATION_USERS,
    payload: {
      value
    }
  };
}

export function changeReservationUsers(params, value = null) {
  return dispatch => _savePermitType(params)
    .then(() => {
      dispatch(permitDetailsChanged());
      if (value) {
        return dispatch(setReservationUsers(value));
      }
      return false;
    });
}
