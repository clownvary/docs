import { setActionBarDisabled } from './actionBar';
import URL from '../urls';

export const SHOW_TOTAL_BALANCE_DUE_DETAIL = 'SHOW_TOTAL_BALANCE_DUE_DETAIL';
export const SET_WAIVER_ERRORS = 'SET_WAIVER_ERRORS';
export const CHANGE_PERMIT_DETAILS = 'CHANGE_PERMIT_DETAILS';
export const PERMIT_DETAILS_HAS_CHANGED = 'PERMIT_DETAILS_HAS_CHANGED';
export const SAVE_CONFIRM_CHANGE_ERRORS = 'SAVE_CONFIRM_CHANGE_ERRORS';
export const UPDATE_WAIVER_CONFIRM_CHANGE_ERROR = 'UPDATE_WAIVER_CONFIRM_CHANGE_ERROR';
export const REMOVE_WAIVER_CONFIRM_CHANGE_ERROR = 'REMOVE_WAIVER_CONFIRM_CHANGE_ERROR';

export function showTotalBalanceDueDetail(isShow) {
  return {
    type: SHOW_TOTAL_BALANCE_DUE_DETAIL,
    payload: {
      isShow
    }
  };
}

export function permitDetailsChanged() {
  return (dispatch, getState) => {
    const { main, actionBar } = getState();
    const isPermitDetailsChanged = main.get('isPermitDetailsChanged');
    const disableActions = actionBar.get('disableActions');

    if (!disableActions) {
      dispatch(setActionBarDisabled());
    }

    if (!isPermitDetailsChanged) {
      return dispatch({
        type: CHANGE_PERMIT_DETAILS
      });
    }

    return dispatch({
      type: PERMIT_DETAILS_HAS_CHANGED
    });
  };
}

export function setWaiverErrors(waiverErrors) {
  const errors = waiverErrors || {
    errorsKey: 'Please check all required waivers.'
  };
  return {
    type: SET_WAIVER_ERRORS,
    payload: {
      errors
    }
  };
}

export const saveConfirmChangeErrors = waiverErrors => ({
  type: SAVE_CONFIRM_CHANGE_ERRORS,
  payload: {
    waiverErrors
  }
});

export const removeWaiverConfirmChangeError = waiverIndex => ({
  type: REMOVE_WAIVER_CONFIRM_CHANGE_ERROR,
  payload: {
    waiverIndex
  }
});

export const updateWaiverConfirmChangeError = waiverErrors => ({
  type: UPDATE_WAIVER_CONFIRM_CHANGE_ERROR,
  payload: {
    waiverErrors
  }
});

export function changeAgent(customerId) {
  return (dispatch, getState) => {
    const { batchID, receiptID } = getState().initialData;
    return dispatch({
      types: ['', '', ''],
      promise: API => API.post(URL.changeAgent, {
        body: {
          customer_id: customerId,
          batch_id: batchID,
          receipt_id: receiptID
        }
      })
    });
  };
}

