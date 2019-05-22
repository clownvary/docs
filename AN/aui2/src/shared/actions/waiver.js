import URL from '../urls';

export const FETCH_WAIVER = 'FETCH_WAIVER';
export const FETCH_WAIVER_SUCCESS = 'FETCH_WAIVER_SUCCESS';
export const FETCH_WAIVER_FAILURE = 'FETCH_WAIVER_FAILURE';
export const SAVE_WAIVER = 'SAVE_WAIVER';
export const SAVE_WAIVER_SUCCESS = 'SAVE_WAIVER_SUCCESS';
export const SAVE_WAIVER_FAILURE = 'SAVE_WAIVER_FAILURE';
export const SHOW_WAIVER = 'SHOW_WAIVER';
export const CHANGE_WAIVER = 'CHANGE_WAIVER';
export const SAVE_WAIVER_ERROR_MESSAGE = 'SAVE_WAIVER_ERROR_MESSAGE';
export const SET_WAIVER_ERROR_MESSAGE = 'SET_WAIVER_ERROR_MESSAGE';
export const DECORATE_WAIVER = 'DECORATE_WAIVER';
export const CHANGE_WAIVER_BY_EVENTID = 'CHANGE_WAIVER_BY_EVENTID';
export const HIDE_ADD_WAIVER_BUTTON = 'HIDE_ADD_WAIVER_BUTTON';

function _fetchWaiver(params) {
  return {
    types: [FETCH_WAIVER, FETCH_WAIVER_SUCCESS, FETCH_WAIVER_FAILURE],
    promise: API => API.get(URL.waiver, {
      body: {
        ...params
      }
    })
  };
}

export function fetchWaiver(customerAndAgent = null) {
  return (dispatch, getState) => {
    let customerId = 0;
    let agentId = 0;

    if (customerAndAgent) {
      customerId = customerAndAgent.customerId;
      agentId = customerAndAgent.agentId;
    } else {
      customerId = getState().permitSearch.get('customer').toJS().customer_id;
      agentId = getState().permitSearch.get('company').toJS().agent_id;
    }

    if (customerId > 0 || agentId > 0) {
      const params = {};
      const waiver = getState().waiver;
      params.batch_id = waiver.get('batchID');
      params.receipt_id = waiver.get('receiptID');
      const permit = waiver.get('permitID');
      if (permit > 0) {
        params.permit_id = permit;
      } else {
        params.receipt_entry_id = waiver.get('receiptEntryID');
      }
      return dispatch(_fetchWaiver(params));
    }
    return true;
  };
}

function _saveWaiver(params, eventID) {
  return {
    types: [SAVE_WAIVER, SAVE_WAIVER_SUCCESS, SAVE_WAIVER_FAILURE],
    promise: API => API.post(eventID > 0 ? URL.modifyWaiver : URL.saveWaiver, {
      body: {
        ...params
      }
    }),
    meta: {
      ignoreLoadingbar: true
    }
  };
}

export function saveWaiver(params, permitDetailsChanged, eventID) {
  return dispatch => dispatch(_saveWaiver(params, eventID))
  .then(() => dispatch(permitDetailsChanged()));
}

export function showWaiver(isShow) {
  return {
    type: SHOW_WAIVER,
    payload: {
      isShow
    }
  };
}

export function changeWaiver(itemID, isInpermit, signatureString) {
  return {
    type: CHANGE_WAIVER,
    payload: {
      itemID,
      isInpermit,
      signatureString
    }
  };
}

export function saveWaiverErrorMessage(errorMsg) {
  return {
    type: SAVE_WAIVER_ERROR_MESSAGE,
    payload: {
      errorMsg
    }
  };
}

export function setWaiverErrorMessage(waiverIndex) {
  return {
    type: SET_WAIVER_ERROR_MESSAGE,
    payload: {
      waiverIndex
    }
  };
}

export function decorateWaiver(data) {
  return {
    type: DECORATE_WAIVER,
    payload: data
  };
}

export function changeWaiverByEventID(itemID, isInpermit, signatureString,
  eventIndex, waiverIndex) {
  return {
    type: CHANGE_WAIVER_BY_EVENTID,
    payload: {
      itemID,
      isInpermit,
      signatureString,
      eventIndex,
      waiverIndex
    }
  };
}


export const _loadAddableWaivers = ({ batchID, receiptID, permitEventId }) => ({
  types: ['', '', ''],
  promise: API => API.post(URL.loadAddableWaivers, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID,
      permit_event_id: permitEventId
    }
  })
});

const hideAddWaiverButton = ({ eventIndex }) => ({
  type: HIDE_ADD_WAIVER_BUTTON,
  payload: eventIndex
});

export const loadAddableWaivers = params => dispatch =>
  dispatch(_loadAddableWaivers(params)).then(() => {
    dispatch(hideAddWaiverButton(params));
  });
