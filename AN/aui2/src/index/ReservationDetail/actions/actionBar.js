import getDynamicUrl from 'shared/utils/getDynamicUrl';
import { redirect } from 'shared/actions/route';
import { pages } from 'shared/consts';
import URL from '../urls';

export const SET_STATUS = 'SET_STATUS';
export const SET_DISABLED = 'SET_DISABLED';
export const FETCH_PERMIT_EVENTS_SUCCESS = 'FETCH_PERMIT_EVENTS_SUCCESS';

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: {
      status
    }
  };
}

export const setActionBarDisabled = () => ({
  type: SET_DISABLED
});

export const gotoPaymentModificationPage = params => (dispatch, getState) => {
  const { batchID, receiptID, permitID, receiptEntryID } = getState().initialData;

  return dispatch(
    redirect(
      pages.buildUrl(pages.paymentModificationPage, {
        batch_id: batchID,
        receipt_id: receiptID,
        permit_id: permitID,
        receipt_entry_id: receiptEntryID,
        [pages.sourcePageKey]: pages.reservationDetailPage,
        ...params
      })
    )
  );
};

export function updateExpirationDate(expirationDate) {
  return (dispatch, getState) => {
    const { permitID, batchID, receiptID } = getState().initialData;
    return dispatch({
      types: ['', '', ''],
      promise: API => API.put(URL.updateExpirationDate, {
        body: {
          permit_id: permitID,
          expiration_date: expirationDate,
          batch_id: batchID,
          receipt_id: receiptID
        }
      })
    });
  };
}

export function fetchPermitEvents() {
  return (dispatch, getState) => {
    const { permitID, batchID, receiptID } = getState().initialData;
    const url = getDynamicUrl(URL.fetchPermitEvents, {
      permitId: permitID,
      batchId: batchID,
      receiptId: receiptID
    });
    return dispatch({
      types: ['', FETCH_PERMIT_EVENTS_SUCCESS, ''],
      promise: API => API.get(url)
    });
  };
}
