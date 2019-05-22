import URL from '../urls';

export const FETCH_CASHSUMMARYSHEET_SUCESS = 'FETCH_CASHSUMMARYSHEET_SUCESS';
export const CREATE_CASHSUMMARYSHEET_SUCESS = 'CREATE_CASHSUMMARYSHEET_SUCESS';
export const SELECT_CASHSUMMARYSHEET_SUCESS = 'SELECT_CASHSUMMARYSHEET_SUCESS';
export const CHANGE_CASHSUMMARYSHEET_SUCESS = 'CHANGE_CASHSUMMARYSHEET_SUCESS';
export const FINISH_CASHSUMMARYSHEET_SUCESS = 'FINISH_CASHSUMMARYSHEET_SUCESS';
export const SHOW_CASHSUMMARYSHEET_SUCESS = 'SHOW_CASHSUMMARYSHEET_SUCESS';
export const HIDE_CASHSUMMARYSHEET_SUCESS = 'HIDE_CASHSUMMARYSHEET_SUCESS';
export const ADD_CASHSUMMARYSHEET_CALLBACK_SUCESS = 'ADD_CASHSUMMARYSHEET_CALLBACK_SUCESS';
export const SWITCH_CASHSUMMARYSHEET_MODE_SUCCESS = 'SWITCH_CASHSUMMARYSHEET_MODE_SUCCESS';
export const INPUT_CASHSUMMARYSHEET_FLOATAMOUNT_SUCCESS = 'INPUT_CASHSUMMARYSHEET_FLOATAMOUNT_SUCCESS';

export function _fetchCashSummarySheet() {
  return {
    types: ['', FETCH_CASHSUMMARYSHEET_SUCESS, ''],
    promise: API => API.get(URL.fetchCashSummarySheet)
  };
}

export function _createCashSummarySheetAction(floatAmount) {
  return {
    types: ['', CREATE_CASHSUMMARYSHEET_SUCESS, ''],
    promise: API => API.post(URL.createCashSummarySheet, {
      body: {
        float_amount: floatAmount
      }
    })
  };
}

export function _selectCashSummarySheetAction(selectedCashSummarySheetId) {
  return {
    types: ['', SELECT_CASHSUMMARYSHEET_SUCESS, ''],
    promise: API => API.post(URL.selectCashSummarySheet, {
      body: {
        cash_summary_sheet_id: selectedCashSummarySheetId
      }
    })
  };
}

export function showCashSummarySheetAction() {
  return {
    type: SHOW_CASHSUMMARYSHEET_SUCESS
  };
}

export function triggerCallbackAction() {
  return (dispatch, getState) => {
    const css = getState().cashSummarySheet.toJS();
    return css && css.callback && typeof css.callback === 'function' && css.callback();
  };
}

export function fetchCashSummarySheetAction() {
  return (dispatch, getState) => dispatch(_fetchCashSummarySheet()).then(() => {
    const data = getState().cashSummarySheet.toJS();
    if (data.finished) {
      return dispatch(triggerCallbackAction());
    }
    return dispatch(showCashSummarySheetAction());
  });
}

export function hideCashSummarySheetAction() {
  return {
    type: HIDE_CASHSUMMARYSHEET_SUCESS
  };
}

export function finishCashSummarySheetAction() {
  return {
    type: FINISH_CASHSUMMARYSHEET_SUCESS
  };
}

export function changeCashSummarySheetAction(cssId) {
  return {
    type: CHANGE_CASHSUMMARYSHEET_SUCESS,
    payload: cssId
  };
}

export function addCashSummarySheetCallBackAction(callback) {
  return {
    type: ADD_CASHSUMMARYSHEET_CALLBACK_SUCESS,
    payload: callback
  };
}

export function switchCashSummarySheetModeAction(mode) {
  return {
    type: SWITCH_CASHSUMMARYSHEET_MODE_SUCCESS,
    payload: mode
  };
}

export function inputCashSummarySheetFloatAmountAction(floatAmount) {
  return {
    type: INPUT_CASHSUMMARYSHEET_FLOATAMOUNT_SUCCESS,
    payload: floatAmount
  };
}

export function submitCashSummarySheetAction() {
  return (dispatch, getState) => {
    const css = getState().cashSummarySheet.toJS();

    if (css.selectedMode === 1 && css.selectedCSS == null) {
      /* eslint-disable no-alert */
      return dispatch(alert('Please select a cash summary sheet.'));
    }

    return dispatch(css.selectedMode === 0 ?
      _createCashSummarySheetAction(css.floatAmount ? css.floatAmount : 0) :
      _selectCashSummarySheetAction(css.selectedCSS.id ? css.selectedCSS.id : 0)
    ).then(() => {
      dispatch(triggerCallbackAction());
      return dispatch(finishCashSummarySheetAction());
    });
  };
}
