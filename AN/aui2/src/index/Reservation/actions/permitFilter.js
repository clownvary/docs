import {
  saveFilters
} from './index';

export const DEFAULT_DATE = null;

export const UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE';

// centers
export const CHANGE_CENTER = 'CHANGE_CENTER';

// status
export const CHANGE_STATUS = 'CHANGE_STATUS';

// facilityTypes
export const CHANGE_FACILITY_TYPE = 'CHANGE_FACILITY_TYPE';

// eventTypes
export const CHANGE_EVENT_TYPE = 'CHANGE_EVENT_TYPE';

// Event Date
export const CHANGE_START_DATE = 'CHANGE_START_DATE';
export const CHANGE_END_DATE = 'CHANGE_END_DATE';

// filter display
export const CLEAR_ERRMSG = 'CLEAR_ERRMSG';

export const CHANGE_CREATE_BY_ME = 'CHANGE_CREATE_BY_ME';

export function changeCenter({
  value = [],
  errMsg = ''
} = {}) {
  return {
    type: CHANGE_CENTER,
    payload: {
      value,
      errMsg
    }
  };
}

export function changeStatus({
  value = []
} = {}) {
  return {
    type: CHANGE_STATUS,
    payload: {
      value
    }
  };
}

export function changeFacilityType({
  value = []
} = {}) {
  return {
    type: CHANGE_FACILITY_TYPE,
    payload: {
      value
    }
  };
}

export function changeEventTypeAction({
  value = []
} = {}) {
  return {
    type: CHANGE_EVENT_TYPE,
    payload: {
      value
    }
  };
}


export function changeStartDate(value = '', date = null) {
  return {
    type: CHANGE_START_DATE,
    payload: {
      value,
      date
    }
  };
}

export function changeEndDate(value = '', date = null) {
  return {
    type: CHANGE_END_DATE,
    payload: {
      value,
      date
    }
  };
}

export function changeCreateByMe(value) {
  return {
    type: CHANGE_CREATE_BY_ME,
    payload: value
  };
}

export function updateSearchValue(parameter) {
  return {
    type: UPDATE_SEARCH_VALUE,
    payload: parameter
  };
}

export function clearFilterAction(callback) {
  return dispatch => Promise.all([
    dispatch(changeCenter()),
    dispatch(changeStatus()),
    dispatch(changeFacilityType()),
    dispatch(changeEventTypeAction()),
    dispatch(changeStartDate('', DEFAULT_DATE)),
    dispatch(changeEndDate('', DEFAULT_DATE))
  ]).then(() => dispatch(saveFilters()))
    .then(() => {
      (typeof callback === 'function') && callback();
    });
}

export function clearErrMsg() {
  return {
    type: CLEAR_ERRMSG
  };
}
