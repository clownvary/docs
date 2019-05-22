import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import { getECheckLabel, getECheckList } from '../../utils/eCheckHelper';
import { CHANGE_PAYER } from '../../actions/payer';
import {
  ECHECK_FETCH_CHECKS_SUCCESS,
  ECHECK_FETCH_CONFIG_SUCCESS,
  ECHECK_FETCH_ACH_SUCCESS,
  ECHECK_ADD_NEW_TO_LIST
} from '../../actions/paymentOptions/electronicCheck';

const initialState = fromJS({
  eCheckLabel: getECheckLabel(),
  eCheckListDropDown: getECheckList([]),
  eCheckConfig: {
    // allow_eft_payments = ture, allow_add_new_check = true, user can use echeck payment
    allow_eft_payments: false,
    allow_add_new_check: false,
    // show_prior_ecp: setting :Show Prior Electronic Checks on Receipt Payment
    // if show_prior_ecp = false, don't fetch echeck list
    // and don't show 'Save account information' in the new echeck window.
    show_prior_ecp: true,
    // show_ach_agreement_for_ecp = true, when use echekc payment,
    // click 'pay now' will popUp 'Authorization detail'.
    show_ach_agreement_for_ecp: true
  },
  achContent: null
});

const handlers = {
  [ECHECK_FETCH_CHECKS_SUCCESS](state, { payload: { body: data } }) {
    const eCheckList = getECheckList(data.echeck_list);

    return state.withMutations((s) => {
      s.set('eCheckListDropDown', fromJS(eCheckList));
    });
  },

  [ECHECK_FETCH_CONFIG_SUCCESS](state, { payload: { body: data } }) {
    return state.withMutations((s) => {
      s.set('eCheckConfig', fromJS(data.echeck_config_info));
    });
  },

  [ECHECK_FETCH_ACH_SUCCESS](state, { payload: { body: data } }) {
    return state.withMutations((s) => {
      s.set('achContent', fromJS(data.result.contents));
    });
  },

  [ECHECK_ADD_NEW_TO_LIST](state, { payload: { newOption } }) {
    return state.withMutations((s) => {
      let list = s.get('eCheckListDropDown').toJS().data;
      // Filter out the same saved ECP to fix the ANE-81903
      list = list.filter(echeckInfo => echeckInfo.value !== newOption.value);
      list[list.length - 1] = newOption;

      const eCheckList = getECheckList(list);

      s.set('eCheckListDropDown', fromJS(eCheckList));
    });
  },

  [CHANGE_PAYER](state) {
    return state.set('eCheckListDropDown', fromJS({ data: [] }));
  }
};

export default reducerHandler(initialState, handlers);
