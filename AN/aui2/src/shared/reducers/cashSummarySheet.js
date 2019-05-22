import {
  fromJS
} from 'immutable';

import reducerHandler from 'shared/utils/reducerHandler';

import {
  FETCH_CASHSUMMARYSHEET_SUCESS,
  CHANGE_CASHSUMMARYSHEET_SUCESS,
  FINISH_CASHSUMMARYSHEET_SUCESS,
  SHOW_CASHSUMMARYSHEET_SUCESS,
  HIDE_CASHSUMMARYSHEET_SUCESS,
  ADD_CASHSUMMARYSHEET_CALLBACK_SUCESS,
  SWITCH_CASHSUMMARYSHEET_MODE_SUCCESS,
  INPUT_CASHSUMMARYSHEET_FLOATAMOUNT_SUCCESS
} from '../actions/cashSummarySheet';

const initialState = fromJS({
  // 0 indicates that Prompt when user logged on, 1 indicates that Prompt when payment is taken
  css_prompt_type: 0,
  float_amount: 0, // default float amount of the workstation.
  enable_css_confirmation: false, // indicates if popup the confirmation window.
  earliest_opened_date: '',
  // indicates that only display float amount text box in the confirmation popup window.
  enable_float_amount_confirmation: false,
  disabled_float_amount: false, // indicates whether the float amount text box should be disabled
  site_name: '',
  workstation_name: '',
  css_list: fromJS([]),

  shouldDisplay: false,
  display: false, // determine whether css popup should be displayed
  finished: false, // determine whether css has been selected.
  callback: null, // this function should be called after css is seleted.

  selectedMode: 0, // 0 = Use new cash summary sheet; 1 = Use existing summary sheet
  selectedCSS: null, // selected css
  floatAmount: null, // the float amount value which the user inputted
  // Submit button will be disabled if no existing css is selected in 'Using existing css' Mode.
  canSubmit: true
});

// check whether Submit button should be enable.
// In 'Using existing css' Mode, if user didn't select any css,
// then submit button should be disabled.
function getCanSubmit(selectedMode, selectedCSS) {
  return !(selectedMode === 1 && selectedCSS == null);
}

const handlers = {
  [FETCH_CASHSUMMARYSHEET_SUCESS](state, {
    payload: {
      body: {
        cashsummarysheetconfirmation
      }
    }
  }) {
    const {
      css_prompt_type: cssPromptType,
      float_amount: floatAmount,
      enable_css_confirmation: enableCssConfirmation,
      earliest_opened_date,
      enable_float_amount_confirmation,
      disabled_float_amount,
      site_name,
      workstation_name,
      css_list
    } = cashsummarysheetconfirmation;

    return state.withMutations((s) => {
      s.set('css_prompt_type', cssPromptType);
      s.set('float_amount', floatAmount);
      s.set('enable_css_confirmation', enableCssConfirmation);
      s.set('earliest_opened_date', earliest_opened_date);
      s.set('enable_float_amount_confirmation', enable_float_amount_confirmation);
      s.set('disabled_float_amount', disabled_float_amount);
      s.set('site_name', site_name);
      s.set('workstation_name', workstation_name);
      s.set('css_list', fromJS(css_list));

      const shouldDisplay = cssPromptType === 1 && enableCssConfirmation;
      s.set('shouldDisplay', shouldDisplay);
      s.set('display', false);
      s.set('finished', !shouldDisplay);

      s.set('floatAmount', +floatAmount > 0 ? floatAmount : null);
      s.set('selectedMode', 0);
      s.set('canSubmit', getCanSubmit(s.get('selectedMode'), s.get('selectedCSS')));
    });
  },

  [CHANGE_CASHSUMMARYSHEET_SUCESS](state, {
    payload
  }) {
    return state.withMutations((s) => {
      const cssList = s.get('css_list');
      const seletedCSS = cssList.find(css => css.get('id') === payload);
      s.set('selectedCSS', seletedCSS);

      s.set('canSubmit', getCanSubmit(s.get('selectedMode'), s.get('selectedCSS')));
    });
  },

  [FINISH_CASHSUMMARYSHEET_SUCESS](state) {
    return state.withMutations((s) => {
      s.set('finished', true);
      s.set('shouldDisplay', false);
      s.set('display', false);
    });
  },

  [SHOW_CASHSUMMARYSHEET_SUCESS](state) {
    return state.set('display', true);
  },

  [HIDE_CASHSUMMARYSHEET_SUCESS](state) {
    return state.set('display', false);
  },

  [ADD_CASHSUMMARYSHEET_CALLBACK_SUCESS](state, {
    payload
  }) {
    return state.set('callback', payload);
  },

  [SWITCH_CASHSUMMARYSHEET_MODE_SUCCESS](state, {
    payload
  }) {
    return state.withMutations((s) => {
      s.set('selectedMode', payload);

      s.set('canSubmit', getCanSubmit(s.get('selectedMode'), s.get('selectedCSS')));
    });
  },

  [INPUT_CASHSUMMARYSHEET_FLOATAMOUNT_SUCCESS](state, {
    payload
  }) {
    return state.set('floatAmount', payload);
  }
};

export default reducerHandler(initialState, handlers);
