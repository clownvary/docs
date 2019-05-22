import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import _ from 'lodash';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/cashSummarySheet';

describe('shared/actions/cashSummarySheet', () => {
  let store = null;
  let callback = null;

  const initState = {
    // 0 indicates that Prompt when user logged on, 1 indicates that Prompt when payment is taken
    css_prompt_type: 0,
    float_amount: 0, // default float amount of the workstation.
    enable_css_confirmation: 'false', // indicates if popup the confirmation window.
    earliest_opened_date: '',
    enable_float_amount_confirmation: 'false', // indicates that only display float amount text box in the confirmation popup window.
    disabled_float_amount: 'false', // indicates whether the float amount text box should be disabled
    site_name: '',
    workstation_name: '',
    css_list: fromJS([]),

    shouldDisplay: false,
    display: false, // determine whether css popup should be displayed
    finished: false, // determine whether css has been selected.
    callback: null, // this function should be called after css is seleted.

    selectedMode: 0, // 0= Use new cash summary sheet; 1= Use existing summary sheet
    selectedCSS: null, // selected css
    floatAmount: null, // the float amount value which the user inputted
    // Submit button will be disabled if no existing css is selected in 'Using existing css' Mode.
    canSubmit: true
  };

  function getDefaultState(state) {
    callback = jest.fn();
    const newState = Object.assign({}, initState, { callback }, state);
    return {
      cashSummarySheet: fromJS(newState)
    };
  }

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(getDefaultState());
  });

  afterEach(() => {
    store.clearActions();
    callback = null;
  });

  it('fetchCashSummarySheetAction can get data correctly when finish === false', () => {
    const {
      fetchCashSummarySheetAction,
      FETCH_CASHSUMMARYSHEET_SUCESS,
      SHOW_CASHSUMMARYSHEET_SUCESS
    } = actions;

    return store.dispatch(fetchCashSummarySheetAction())
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(_.some(storeActions, ['type', FETCH_CASHSUMMARYSHEET_SUCESS])).toBe(true);
        expect(_.some(storeActions, ['type', SHOW_CASHSUMMARYSHEET_SUCESS])).toBe(true);
      });
  });

  it('fetchCashSummarySheetAction can get data correctly when finish === true', () => {
    const {
      fetchCashSummarySheetAction,
      FETCH_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const mockStore = configureStore(middlewares);
    store = mockStore(getDefaultState({
      finished: true
    }));

    return store.dispatch(fetchCashSummarySheetAction())
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(1);
        expect(_.some(storeActions, ['type', FETCH_CASHSUMMARYSHEET_SUCESS])).toBe(true);
      });
  });

  it('triggerCallbackAction can get data with callback correctly', () => {
    const {
      triggerCallbackAction
    } = actions;
    store.dispatch(triggerCallbackAction());
    expect(callback).toHaveBeenCalled();
  });

  it('triggerCallbackAction can get data without callback correctly', () => {
    const {
      triggerCallbackAction
    } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore(getDefaultState({ callback: null }));

    store.dispatch(triggerCallbackAction());
    expect(callback).not.toHaveBeenCalled();
  });

  it('submitCashSummarySheetAction using new cash summary sheet works fine', () => {
    const {
      submitCashSummarySheetAction,
      CREATE_CASHSUMMARYSHEET_SUCESS,
      FINISH_CASHSUMMARYSHEET_SUCESS
    } = actions;
    return store.dispatch(submitCashSummarySheetAction()).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(_.some(storeActions, ['type', CREATE_CASHSUMMARYSHEET_SUCESS])).toBe(true);
      expect(_.some(storeActions, ['type', FINISH_CASHSUMMARYSHEET_SUCESS])).toBe(true);
    });
  });

  it('submitCashSummarySheetAction using new cash summary sheet works fine without amount', () => {
    const {
      submitCashSummarySheetAction,
      CREATE_CASHSUMMARYSHEET_SUCESS,
      FINISH_CASHSUMMARYSHEET_SUCESS
    } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore(getDefaultState({
      floatAmount: 120
    }));
    return store.dispatch(submitCashSummarySheetAction()).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(_.some(storeActions, ['type', CREATE_CASHSUMMARYSHEET_SUCESS])).toBe(true);
      expect(_.some(storeActions, ['type', FINISH_CASHSUMMARYSHEET_SUCESS])).toBe(true);
    });
  });

  it('submitCashSummarySheetAction using existing cash summary sheet works fine', () => {
    const {
      submitCashSummarySheetAction,
      SELECT_CASHSUMMARYSHEET_SUCESS,
      FINISH_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const mockStore = configureStore(middlewares);
    store = mockStore(getDefaultState({
      selectedMode: 1,
      selectedCSS: {
        id: '#1'
      }
    }));

    return store.dispatch(submitCashSummarySheetAction()).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(_.some(storeActions, ['type', SELECT_CASHSUMMARYSHEET_SUCESS])).toBe(true);
      expect(_.some(storeActions, ['type', FINISH_CASHSUMMARYSHEET_SUCESS])).toBe(true);
    });
  });

  it('submitCashSummarySheetAction using existing cash summary sheet works fine without selected css id', () => {
    const {
      submitCashSummarySheetAction,
      SELECT_CASHSUMMARYSHEET_SUCESS,
      FINISH_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const mockStore = configureStore(middlewares);
    store = mockStore(getDefaultState({
      selectedMode: 1,
      selectedCSS: {}
    }));

    return store.dispatch(submitCashSummarySheetAction()).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(_.some(storeActions, ['type', SELECT_CASHSUMMARYSHEET_SUCESS])).toBe(true);
      expect(_.some(storeActions, ['type', FINISH_CASHSUMMARYSHEET_SUCESS])).toBe(true);
    });
  });

  it('submitCashSummarySheetAction show alert for invalid status works fine', (done) => {
    const {
      submitCashSummarySheetAction
    } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore(getDefaultState({
      selectedMode: 1,
      selectedCSS: null
    }));
    store.dispatch(submitCashSummarySheetAction());
    done();
  });

  it('showCashSummarySheetAction can work well', () => {
    const {
      showCashSummarySheetAction,
      SHOW_CASHSUMMARYSHEET_SUCESS
    } = actions;
    expect(showCashSummarySheetAction()).toEqual({
      type: SHOW_CASHSUMMARYSHEET_SUCESS
    });
  });

  it('hideCashSummarySheetAction can work well', () => {
    const {
      hideCashSummarySheetAction,
      HIDE_CASHSUMMARYSHEET_SUCESS
    } = actions;
    expect(hideCashSummarySheetAction()).toEqual({
      type: HIDE_CASHSUMMARYSHEET_SUCESS
    });
  });

  it('finishCashSummarySheetAction can work well', () => {
    const {
      finishCashSummarySheetAction,
      FINISH_CASHSUMMARYSHEET_SUCESS
    } = actions;
    expect(finishCashSummarySheetAction()).toEqual({
      type: FINISH_CASHSUMMARYSHEET_SUCESS
    });
  });

  it('changeCashSummarySheetAction can work well', () => {
    const {
      changeCashSummarySheetAction,
      CHANGE_CASHSUMMARYSHEET_SUCESS
    } = actions;
    const cssId = 1;
    expect(changeCashSummarySheetAction(cssId)).toEqual({
      type: CHANGE_CASHSUMMARYSHEET_SUCESS,
      payload: cssId
    });
  });

  it('addCashSummarySheetCallBackAction can work well', () => {
    const {
      addCashSummarySheetCallBackAction,
      ADD_CASHSUMMARYSHEET_CALLBACK_SUCESS
    } = actions;
    const callbackMethod = () => 1;
    expect(addCashSummarySheetCallBackAction(callbackMethod)).toEqual({
      type: ADD_CASHSUMMARYSHEET_CALLBACK_SUCESS,
      payload: callbackMethod
    });
  });

  it('switchCashSummarySheetModeAction can work well', () => {
    const {
      switchCashSummarySheetModeAction,
      SWITCH_CASHSUMMARYSHEET_MODE_SUCCESS
    } = actions;
    const mode = 1;
    expect(switchCashSummarySheetModeAction(mode)).toEqual({
      type: SWITCH_CASHSUMMARYSHEET_MODE_SUCCESS,
      payload: mode
    });
  });

  it('inputCashSummarySheetFloatAmountAction can work well', () => {
    const {
      inputCashSummarySheetFloatAmountAction,
      INPUT_CASHSUMMARYSHEET_FLOATAMOUNT_SUCCESS
    } = actions;
    const floatAmount = 20.00;
    expect(inputCashSummarySheetFloatAmountAction(floatAmount)).toEqual({
      type: INPUT_CASHSUMMARYSHEET_FLOATAMOUNT_SUCCESS,
      payload: floatAmount
    });
  });

  it('_fetchCashSummarySheet can work well', () => {
    const {
      _fetchCashSummarySheet,
      FETCH_CASHSUMMARYSHEET_SUCESS
    } = actions;

    return store.dispatch(_fetchCashSummarySheet())
      .then(() => {
        const storeActions = store.getActions();

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(1);
        expect(_.some(storeActions, ['type', FETCH_CASHSUMMARYSHEET_SUCESS])).toBe(true);
      });
  });

  it('_createCashSummarySheetAction can work well', () => {
    const {
      _createCashSummarySheetAction,
      CREATE_CASHSUMMARYSHEET_SUCESS
    } = actions;

    return store.dispatch(_createCashSummarySheetAction())
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(1);
        expect(_.some(storeActions, ['type', CREATE_CASHSUMMARYSHEET_SUCESS])).toBe(true);
      });
  });

  it('_selectCashSummarySheetAction can work well', () => {
    const {
      _selectCashSummarySheetAction,
      SELECT_CASHSUMMARYSHEET_SUCESS
    } = actions;

    return store.dispatch(_selectCashSummarySheetAction())
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(1);
        expect(_.some(storeActions, ['type', SELECT_CASHSUMMARYSHEET_SUCESS])).toBe(true);
      });
  });
});
