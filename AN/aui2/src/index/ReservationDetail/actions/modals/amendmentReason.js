export const SET_AMENDMENT_REASON = 'SET_AMENDMENT_REASON';
export const SET_AMENDMENT_REASON_SHOWN = 'SET_AMENDMENT_REASON_SHOWN';
export const SAVE_AMENDMENT_REASON = 'SAVE_AMENDMENT_REASON';


export function setAmendmentReason(value) {
  return {
    type: SET_AMENDMENT_REASON,
    payload: { value }
  };
}

export function setAmendmentReasonShown(shown) {
  return {
    type: SET_AMENDMENT_REASON_SHOWN,
    payload: { shown }
  };
}

export function saveAmendmentReason(value) {
  return {
    type: SAVE_AMENDMENT_REASON,
    payload: { value }
  };
}
