import URL from '../urls';

export const FETCH_PERMIT_CONFIRMATION_SUCCESS = 'FETCH_PERMIT_CONFIRMATION_SUCCESS';

export function fetchPermitConfirmation(receiptHeaderID) {
  return {
    types: ['', FETCH_PERMIT_CONFIRMATION_SUCCESS, ''],
    promise: API => API.get(URL.permitConfirmation, {
      body: {
        receipt_header_id: receiptHeaderID
      }
    })
  };
}
