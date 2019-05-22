import { fromJS } from 'immutable';
import isNumber from 'lodash/isNumber';
import reducerHandler from 'shared/utils/reducerHandler';
import { getECheckList } from '../../utils/eCheckHelper';

import {
  CHANGE_PAYMENTPLAN_AMOUNT,
  FETCH_CREDITCARD_LIST,
  SET_ECP_LIST,
  FETCH_PAYMENTPLAN_ECHECKS_SUCCESS,
  CHANGE_PAYMENT_CARD,
  OVERRIDE_CC_EXPIRATION,
  PAYMENTPLAN_ADD_CREDITCARD,
  PAYMENTPLAN_ADD_ECHECK
} from '../../actions/paymentOptions/paymentPlan';

import { newOptions, paymentPlanPaymentTypes } from '../../consts';

const initialState = fromJS({
  overrideCcExpBeforePpLast: false,
  ppAutoCCList: {
    data: [],
    selected: ''
  },
  ppAutoEcpList: {
    data: [],
    selected: ''
  }
});

const handlers = {
  [CHANGE_PAYMENTPLAN_AMOUNT](state, { payload: { amount, isSelectModifyPaymentPlan } }) {
    if (amount > 0) {
      return state.withMutations((s) => {
        /*
          When paynow or payer update or cc card update then the expieration warning disappear.
          Set overrideCcExpBeforePpLast to false in code level.
        */
        s.set('overrideCcExpBeforePpLast', false);
        if (!isSelectModifyPaymentPlan) {
          s.setIn(['ppAutoCCList', 'selected'], -1);
          s.setIn(['ppAutoEcpList', 'selected'], -1);
        }
      });
    }

    return state;
  },

  [FETCH_CREDITCARD_LIST](state, { payload: { creditCardList } }) {
    return state.set('ppAutoCCList', fromJS(creditCardList));
  },

  [FETCH_PAYMENTPLAN_ECHECKS_SUCCESS](state, { payload: { body: { echeck_list } } }) {
    const eCheckList = getECheckList(echeck_list);
    eCheckList.selected = eCheckList.selected.length ? eCheckList.selected[0] : -1;

    return state.withMutations((s) => {
      s.set('ppAutoEcpList', fromJS(eCheckList));
    });
  },

  [SET_ECP_LIST](state, { payload: { ecpList } }) {
    return state.set('ppAutoEcpList', fromJS(ecpList));
  },

  [CHANGE_PAYMENT_CARD](state, { payload: { value, ppPaymentType } }) {
    if (ppPaymentType === paymentPlanPaymentTypes.CREDITCARD) {
      return state.withMutations((s) => {
        s.set('overrideCcExpBeforePpLast', false);
        s.setIn(['ppAutoCCList', 'selected'], value);
      });
    }

    return state.setIn(['ppAutoEcpList', 'selected'], value);
  },

  [OVERRIDE_CC_EXPIRATION](state, { payload: { flag } }) {
    return state.set('overrideCcExpBeforePpLast', flag);
  },

  [PAYMENTPLAN_ADD_CREDITCARD](state, { payload }) {
    return state.withMutations((s) => {
      s.updateIn(['ppAutoCCList', 'data'], (list) => {
        const newOption = list.find(item => item.get('value') === newOptions.NEW_OPTION_VALUE);
        const tempList = list.filter(item => item.get('value') !== newOptions.NEW_OPTION_VALUE)
          .push(fromJS(payload));
        if (newOption) {
          return tempList.push(newOption);
        }
        return tempList;
      });
    });
  },

  [PAYMENTPLAN_ADD_ECHECK](state, { payload }) {
    return state.withMutations((s) => {
      let selectedECP = payload.value;

      s.updateIn(['ppAutoEcpList', 'data'], (list) => {
        const newOption = list.find(item => item.get('value') === newOptions.NEW_OPTION_VALUE);
        const uniqueEcheckIdList = list.filter(item => item.get('value') !== payload.value);
        let tempList = uniqueEcheckIdList.filter(item => item.get('value') !== newOptions.NEW_OPTION_VALUE);

        if (!payload.is_add_to_customer_ecp) {
          tempList = tempList.filter(echeckInfo => (
            (echeckInfo.get('is_add_to_customer_ecp') || isNumber(echeckInfo.get('value'))) ||
            (echeckInfo.get('name') !== payload.name)
          ));
          const newOptionId = `newECheck_${tempList.size}`;
          payload.echeck_id = newOptionId;
          payload.value = newOptionId;
          selectedECP = newOptionId;
        }

        tempList = tempList.push(fromJS(payload));

        if (newOption) {
          return tempList.push(newOption);
        }
        return tempList;
      });

      s.setIn(['ppAutoEcpList', 'selected'], selectedECP);
    });
  }

};

export default reducerHandler(initialState, handlers);
