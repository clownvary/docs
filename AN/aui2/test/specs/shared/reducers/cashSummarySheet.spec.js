/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { is, fromJS } from 'immutable';
import * as actions from 'shared/actions/cashSummarySheet';
import cssReducer from 'shared/reducers/cashSummarySheet';
import jsonCashSummarySheet from 'json/CashSummarySheet/fetch_cashSummarySheet.json';

const {
  body: {
    cashsummarysheetconfirmation
  }
} = jsonCashSummarySheet;

const expectedInitialState = fromJS({
  // 0 indicates that Prompt when user logged on, 1 indicates that Prompt when payment is taken
  css_prompt_type: 0,
  float_amount: 0, // default float amount of the workstation.
  enable_css_confirmation: false, // indicates if popup the confirmation window.
  earliest_opened_date: '',
  enable_float_amount_confirmation: false, // indicates that only display float amount text box in the confirmation popup window.
  disabled_float_amount: false, // indicates whether the float amount text box should be disabled
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
});

const normalCSS = {
  ...cashsummarysheetconfirmation
};

const finishedCSS = {
  css_prompt_type: 0,
  disabled_float_amount: true,
  enable_float_amount_confirmation: false,
  float_amount: 0,
  enable_css_confirmation: false,
  earliest_opened_date: '',
  site_name: '',
  workstation_name: '',
  css_list: []
};

describe('shared/reducers/cashSummarySheet', () => {
  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, cssReducer(undefined, {}))).toBe(true);
  });

  it('Should fetch cash summary sheet successfully', () => {
    const {
      FETCH_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const state = cssReducer(undefined, {
      type: FETCH_CASHSUMMARYSHEET_SUCESS,
      payload: {
        body: {
          cashsummarysheetconfirmation: normalCSS
        }
      }
    });

    expect(state.get('display')).toBe(false);
    expect(state.get('finished')).toBe(false);
    expect(state.get('selectedCSS')).toBeNull();
    expect(state.get('floatAmount')).toBe(normalCSS.float_amount);
    expect(state.get('selectedMode')).toBe(0);

    expect(state.get('css_prompt_type')).toBe(normalCSS.css_prompt_type);
    expect(state.get('float_amount')).toBe(normalCSS.float_amount);
    expect(state.get('enable_css_confirmation')).toBe(normalCSS.enable_css_confirmation);
    expect(state.get('earliest_opened_date')).toBe(normalCSS.earliest_opened_date);
    expect(state.get('enable_float_amount_confirmation')).toBe(normalCSS.enable_float_amount_confirmation);
    expect(state.get('disabled_float_amount')).toBe(normalCSS.disabled_float_amount);
    expect(state.get('site_name')).toBe(normalCSS.site_name);
    expect(state.get('workstation_name')).toBe(normalCSS.workstation_name);
    expect(state.get('css_list').toJS()).toEqual(normalCSS.css_list);
  });

  it('Should fetch cash summary sheet successfully with finished Mode', () => {
    const {
      FETCH_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const state = cssReducer(undefined, {
      type: FETCH_CASHSUMMARYSHEET_SUCESS,
      payload: {
        body: {
          cashsummarysheetconfirmation: finishedCSS
        }
      }
    });

    expect(state.get('finished')).toBe(true);
  });

  it('Should change cash summary sheet successfully when cssId is correct', () => {
    const {
      CHANGE_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const state = cssReducer(fromJS({
      css_list: fromJS([{
        id: 1017
      }])
    }), {
      type: CHANGE_CASHSUMMARYSHEET_SUCESS,
      payload: 1017
    });

    expect(typeof state.get('selectedCSS')).toBe('object');
    expect(state.get('selectedCSS').toJS().id).toBe(1017);
  });

  it('Should change cash summary sheet successfully when cssId is wrong', () => {
    const {
      CHANGE_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const state = cssReducer(fromJS({
      css_list: fromJS([{
        id: 1017
      }])
    }), {
      type: CHANGE_CASHSUMMARYSHEET_SUCESS,
      payload: 1020
    });

    expect(state.get('selectedCSS')).toBeUndefined();
  });

  it('Should finish CSS successfully', () => {
    const {
      FINISH_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const state = cssReducer(fromJS({
      finished: false
    }), {
      type: FINISH_CASHSUMMARYSHEET_SUCESS
    });

    expect(state.get('finished')).toBe(true);
  });

  it('Should show css successfully', () => {
    const {
      SHOW_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const state = cssReducer(fromJS({
      display: false
    }), {
      type: SHOW_CASHSUMMARYSHEET_SUCESS
    });

    expect(state.get('display')).toBe(true);
  });

  it('Should hide css successfully', () => {
    const {
      HIDE_CASHSUMMARYSHEET_SUCESS
    } = actions;

    const state = cssReducer(fromJS({
      display: true
    }), {
      type: HIDE_CASHSUMMARYSHEET_SUCESS
    });

    expect(state.get('display')).toBe(false);
  });

  it('Should add callback successfully', () => {
    const {
      ADD_CASHSUMMARYSHEET_CALLBACK_SUCESS
    } = actions;

    const state = cssReducer(fromJS({
      callback: null
    }), {
      type: ADD_CASHSUMMARYSHEET_CALLBACK_SUCESS,
      payload: () => 1
    });

    expect(typeof state.get('callback')).toBe('function');
  });

  it('Should switch css mode successfully', () => {
    const {
      SWITCH_CASHSUMMARYSHEET_MODE_SUCCESS
    } = actions;

    const state = cssReducer(fromJS({
      selectedMode: 1
    }), {
      type: SWITCH_CASHSUMMARYSHEET_MODE_SUCCESS,
      payload: 0
    });

    expect(state.get('selectedMode')).toBe(0);
  });

  it('Should input float amount successfully', () => {
    const {
      INPUT_CASHSUMMARYSHEET_FLOATAMOUNT_SUCCESS
    } = actions;

    const state = cssReducer(fromJS({
      floatAmount: 10
    }), {
      type: INPUT_CASHSUMMARYSHEET_FLOATAMOUNT_SUCCESS,
      payload: 20
    });

    expect(state.get('floatAmount')).toBe(20);
  });
});
