import URL from '../urls';
import { initPaginations } from './pagination';

export const FETCH_PERMIT_FEE_SUCCESS = 'FETCH_PERMIT_FEE_SUCCESS';
export const DELETE_PERMIT_FEE_DETAIL = 'DELETE_PERMIT_FEE_DETAIL';
export const DECORATE_FACILITY = 'DECORATE_FACILITY';
export const DELETE_RESERVATION_FEE_DETAIL = 'DELETE_RESERVATION_FEE_DETAIL';
export const DETECT_SAME_CHARGE_SUCCESS = 'DETECT_SAME_CHARGE_SUCCESS';
export const APPLY_TO_ALL_SUCCESS = 'APPLY_TO_ALL_SUCCESS';

export function requestPermitFee(url, params, isModifyWorkflow) {
  const requestSuccessType = isModifyWorkflow ? '' : FETCH_PERMIT_FEE_SUCCESS;

  return {
    types: ['', requestSuccessType, ''],
    promise: API => API.get(url, {
      body: {
        ...params
      }
    })
  };
}

export function fetchPermitFee(requestUrl, requestParams) {
  return (dispatch, getState) => {
    let params = null;
    let url = '';
    let isModifyWorkflow = false;

    if (requestUrl) { // modify workflow
      url = requestUrl;
      params = requestParams;
      isModifyWorkflow = true;
    } else { // new workflow
      url = URL.newReservationFee;
      const { permitID, batchID, receiptID, receiptEntryID } = getState().initialData;

      params = {
        permit_id: permitID || 0,
        batch_id: batchID,
        receipt_id: receiptID,
        receipt_entry_id: receiptEntryID
      };
      isModifyWorkflow = false;
    }
    return dispatch(requestPermitFee(url, params, isModifyWorkflow))
    .then((res) => {
      dispatch(initPaginations());
      return Promise.resolve(res);
    });
  };
}

function _deletePermitFeeDetail(params) {
  const finalParams = {
    permit_id: 0,
    transaction_id: 0,
    receipt_detail_id: 0,
    new_entry_id: 0,
    ...params
  };
  return {
    types: [DELETE_PERMIT_FEE_DETAIL, '', ''],
    promise: API => API.delete(URL.deletePermitFee, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalParams)
    })
  };
}

export function deletePermitFeeDetail(params) { // new workflow
  return dispatch =>
    dispatch(_deletePermitFeeDetail(params))
      .then(() => dispatch(fetchPermitFee()));
}

export function deleteReservationFeeDetail(params) { // modify workflow
  return {
    types: [DELETE_RESERVATION_FEE_DETAIL, '', ''],
    promise: API => API.delete(URL.deletePermitFeeModify, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
  };
}

export function decorateFacility({ eventFee, feeSummary, eventIndex, eventSummary }) {
  return {
    type: DECORATE_FACILITY,
    payload: {
      eventFee,
      feeSummary,
      eventSummary,
      eventIndex
    }
  };
}

export const resetFeeAsyncAction = (eventID, newEntryID) => (dispatch, getState) => {
  const {
    permitID,
    batchID,
    receiptID,
    receiptEntryID
  } = getState().initialData;
  const entryID = permitID > 0
    ? parseInt(newEntryID, 10)
    : parseInt(receiptEntryID, 10);

  return dispatch({
    types: ['', '', ''],
    promise: API => API.post(URL.resetFee, {
      body: {
        batch_id: parseInt(batchID, 10),
        receipt_id: parseInt(receiptID, 10),
        permit_id: parseInt(permitID, 10) || -1,
        event_id: parseInt(eventID, 10) || -1,
        receipt_entry_id: entryID
      }
    })
  });
};

export const resetFeesForAllEvents = () => (dispatch, getState) => {
  const {
    permitID,
    batchID,
    receiptID
  } = getState().initialData;

  return dispatch({
    types: ['', '', ''],
    promise: API => API.post(URL.resetFee, {
      body: {
        batch_id: parseInt(batchID, 10),
        receipt_id: parseInt(receiptID, 10),
        permit_id: parseInt(permitID, 10) || -1,
        receipt_entry_id: -1,
        for_all_event: true
      }
    })
  });
};

export const applyToAll = (eventID, newEntryID, transactionID) => (dispatch, getState) => {
  const {
    permitID,
    batchID,
    receiptID,
    receiptEntryID
  } = getState().initialData;

  const params = {
    batch_id: batchID,
    receipt_id: receiptID,
    receipt_entry_id: parseInt(receiptEntryID, 10) || 0,
    permit_id: permitID,
    new_entry_id: newEntryID || 0,
    transaction_id: transactionID || 0,
    event_id: eventID || 0
  };

  return dispatch({
    types: ['', APPLY_TO_ALL_SUCCESS, ''],
    promise: API => API.post(URL.applyToAll, {
      body: {
        ...params
      }
    })
  });
};

export function detectSameCharge(params) {
  const finalParams = {
    permit_id: 0,
    transaction_id: 0,
    receipt_detail_id: 0,
    new_entry_id: 0,
    ...params
  };
  return dispatch => dispatch({
    types: ['', DETECT_SAME_CHARGE_SUCCESS, ''],
    promise: API => API.post(URL.detectSameCharge, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalParams)
    })
  });
}
