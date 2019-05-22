import API from 'shared/api/API';
import { getBreadCrumb } from 'shared/actions/breadCrumb';
import URL from '../urls';

export const FETCH_RESERVATION_SUCCESS = 'FETCH_RESERVATION_SUCCESS';
export const RESERVATION_CHECK_OUT_SUCCESS = 'RESERVATION_CHECK_OUT_SUCCESS';
export const RESERVATION_CHECK_OUT_FAILURE = 'RESERVATION_CHECK_OUT_FAILURE';

const _API = new API();

function getParams(state) {
  const {
    batchID,
    receiptID
  } = state.initialData;
  return {
    batch_id: batchID,
    receipt_id: receiptID
  };
}

export const fetchReservationCart = () => (dispatch, getState) => {
  const params = getParams(getState());

  return dispatch({
    types: ['', FETCH_RESERVATION_SUCCESS, ''],
    promise: api => api.get(URL.loadReservationCart, {
      body: {
        ...params
      }
    })
  });
};


function _deleteReservationData(params) {
  return _API.delete(URL.deleteReservationCart, {
    body: {
      ...params
    }
  });
}

export const deleteReservationCart = () => (dispatch, getState) => {
  const {
    batchID,
    receiptID,
    receiptEntryID
  } = getState().initialData;

  return _deleteReservationData({
    batch_id: batchID,
    receipt_id: receiptID,
    receipt_entry_id: receiptEntryID
  })
    .then(() => dispatch(fetchReservationCart()))
    .then(() => dispatch(getBreadCrumb({
      batchID,
      receiptID
    })));
};

export const reservationCheckOut = () => (dispatch, getState) => {
  const params = getParams(getState());

  return dispatch({
    types: ['', RESERVATION_CHECK_OUT_SUCCESS, RESERVATION_CHECK_OUT_FAILURE],
    promise: api => api.put(URL.checkoutReservationCart, {
      body: {
        ...params
      }
    })
  });
};
