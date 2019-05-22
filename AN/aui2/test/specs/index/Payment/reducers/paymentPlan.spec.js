import { fromJS } from 'immutable';
import {
  CHANGE_PAYMENTPLAN_AMOUNT,
  FETCH_CREDITCARD_LIST,
  FETCH_PAYMENTPLAN_ECHECKS_SUCCESS,
  SET_ECP_LIST,
  CHANGE_PAYMENT_CARD,
  OVERRIDE_CC_EXPIRATION,
  PAYMENTPLAN_ADD_CREDITCARD,
  PAYMENTPLAN_ADD_ECHECK
} from 'index/Payment/actions/paymentOptions/paymentPlan';
import reducer from 'index/Payment/reducers/paymentOptions/paymentPlan';
import { paymentPlanPaymentTypes, newOptions } from 'index/Payment/consts';

// blocked by index/Payment/components/PaymentOptions/utils/payment.js
// which should not import store to do changes
jest.mock('index/Payment/store', () => ({}));

describe('index/Payment/reducers/paymentOptions/paymentPlan', () => {
  it('CHANGE_PAYMENTPLAN_AMOUNT should work fine', () => {
    const payload = { amount: 220, isSelectModifyPaymentPlan: false };
    const state = reducer(fromJS({}), {
      type: CHANGE_PAYMENTPLAN_AMOUNT,
      payload
    });
    expect(state.get('overrideCcExpBeforePpLast')).toBeFalsy();
    expect(state.getIn(['ppAutoCCList', 'selected'])).toEqual(-1);
    expect(state.getIn(['ppAutoEcpList', 'selected'])).toEqual(-1);
  });

  it('CHANGE_PAYMENTPLAN_AMOUNT should work fine if amount is negative or 0', () => {
    const payload = { amount: 0, isSelectModifyPaymentPlan: true };
    const state = reducer(fromJS({
      overrideCcExpBeforePpLast: true,
      ppAutoCCList: { selected: 881 },
      ppAutoEcpList: { selected: 231 }
    }), {
      type: CHANGE_PAYMENTPLAN_AMOUNT,
      payload
    });
    expect(state.get('overrideCcExpBeforePpLast')).toBeTruthy();
    expect(state.getIn(['ppAutoCCList', 'selected'])).toEqual(881);
    expect(state.getIn(['ppAutoEcpList', 'selected'])).toEqual(231);
  });

  it('CHANGE_PAYMENTPLAN_AMOUNT should work fine if it\'s select modify payment plan', () => {
    const payload = { amount: 10, isSelectModifyPaymentPlan: true };
    const state = reducer(fromJS({
      overrideCcExpBeforePpLast: true,
      ppAutoCCList: { selected: 881 },
      ppAutoEcpList: { selected: 231 }
    }), {
      type: CHANGE_PAYMENTPLAN_AMOUNT,
      payload
    });
    expect(state.get('overrideCcExpBeforePpLast')).toBeFalsy();
    expect(state.getIn(['ppAutoCCList', 'selected'])).toEqual(881);
    expect(state.getIn(['ppAutoEcpList', 'selected'])).toEqual(231);
  });

  it('FETCH_CREDITCARD_LIST should work fine', () => {
    const creditCardList = [];
    const state = reducer(fromJS({}), {
      type: FETCH_CREDITCARD_LIST,
      payload: { creditCardList }
    });
    expect(state.get('ppAutoCCList')).toEqual(fromJS([]));
  });

  it('FETCH_PAYMENTPLAN_ECHECKS_SUCCESS should work fine', () => {
    const echeckList = [];
    const state = reducer(fromJS({}), {
      type: FETCH_PAYMENTPLAN_ECHECKS_SUCCESS,
      payload: { body: { echeck_list: echeckList } }
    });
    const result = state.getIn(['ppAutoEcpList', 'data']).toJS();
    expect(result.length).toEqual(1);
    expect(result[0].value).toEqual('newOptionValue');
  });

  it('FETCH_PAYMENTPLAN_ECHECKS_SUCCESS should work fine when has selected ecp', () => {
    const echeckList = [{ echeck_id: 2, selected: true }];
    const state = reducer(fromJS({}), {
      type: FETCH_PAYMENTPLAN_ECHECKS_SUCCESS,
      payload: { body: { echeck_list: echeckList } }
    });
    const result = state.getIn(['ppAutoEcpList', 'data']).toJS();
    expect(result.length).toEqual(2);
    expect(result[1].value).toEqual('newOptionValue');
  });

  it('SET_ECP_LIST should work fine', () => {
    const ecpList = [];
    const state = reducer(fromJS({}), {
      type: SET_ECP_LIST,
      payload: { ecpList }
    });
    expect(state.get('ppAutoEcpList')).toEqual(fromJS([]));
  });

  it('CHANGE_PAYMENT_CARD should work fine if it\'s credit card', () => {
    const payload = {
      value: 6613,
      ppPaymentType: paymentPlanPaymentTypes.CREDITCARD
    };
    const state = reducer(fromJS({}), {
      type: CHANGE_PAYMENT_CARD,
      payload
    });
    expect(state.get('overrideCcExpBeforePpLast')).toBeFalsy();
    expect(state.getIn(['ppAutoCCList', 'selected'])).toEqual(payload.value);
  });

  it('CHANGE_PAYMENT_CARD should work fine if it\'s not credit card', () => {
    const payload = {
      value: 751,
      ppPaymentType: paymentPlanPaymentTypes.ELECTRONICCHECK
    };
    const state = reducer(fromJS({}), {
      type: CHANGE_PAYMENT_CARD,
      payload
    });
    expect(state.getIn(['ppAutoEcpList', 'selected'])).toEqual(payload.value);
  });

  it('OVERRIDE_CC_EXPIRATION should work fine', () => {
    const flag = true;
    const state = reducer(fromJS({}), {
      type: OVERRIDE_CC_EXPIRATION,
      payload: { flag }
    });
    expect(state.get('overrideCcExpBeforePpLast')).toEqual(flag);
  });

  it('PAYMENTPLAN_ADD_CREDITCARD should work fine', () => {
    const payload = {
      name: 'visa#7901',
      cardNumber: '6227003875412277901',
      value: paymentPlanPaymentTypes.CREDITCARD
    };
    const state = reducer(fromJS({
      ppAutoCCList: { data: [] }
    }), {
      type: PAYMENTPLAN_ADD_CREDITCARD,
      payload
    });
    expect(state.get('ppAutoCCList')).toEqual(fromJS({
      data: [{
        name: 'visa#7901',
        cardNumber: '6227003875412277901',
        value: paymentPlanPaymentTypes.CREDITCARD
      }]
    }));
  });

  it('PAYMENTPLAN_ADD_CREDITCARD should work fine with new option', () => {
    const payload = {
      name: 'visa#7901',
      cardNumber: '6227003875412277901',
      value: paymentPlanPaymentTypes.CREDITCARD
    };
    const state = reducer(fromJS({
      ppAutoCCList: {
        data: [
          { value: newOptions.NEW_OPTION_VALUE }
        ]
      }
    }), {
      type: PAYMENTPLAN_ADD_CREDITCARD,
      payload
    });
    expect(state.get('ppAutoCCList')).toEqual(fromJS({
      data: [{
        name: 'visa#7901',
        cardNumber: '6227003875412277901',
        value: paymentPlanPaymentTypes.CREDITCARD
      }, {
        value: 'newOptionValue'
      }]
    }));
  });

  it('PAYMENTPLAN_ADD_ECHECK should work fine', () => {
    const payload = {
      name: 'echeck#9913',
      value: paymentPlanPaymentTypes.ELECTRONICCHECK
    };
    const state = reducer(fromJS({
      ppAutoEcpList: { data: [] }
    }), {
      type: PAYMENTPLAN_ADD_ECHECK,
      payload
    });
    expect(state.get('ppAutoEcpList')).toEqual(fromJS({
      data: [{
        name: 'echeck#9913',
        value: "newECheck_0",
        echeck_id: "newECheck_0"
      }],
      selected: "newECheck_0"
    }));
  });

  it('PAYMENTPLAN_ADD_ECHECK should work fine with new option', () => {
    const payload = {
      name: 'echeck#9913',
      value: paymentPlanPaymentTypes.ELECTRONICCHECK
    };
    const state = reducer(fromJS({
      ppAutoEcpList: {
        data: [
          { value: newOptions.NEW_OPTION_VALUE }
        ]
      }
    }), {
      type: PAYMENTPLAN_ADD_ECHECK,
      payload
    });
    expect(state.get('ppAutoEcpList')).toEqual(fromJS({
      data: [{
        name: 'echeck#9913',
        value: 2,
        value: "newECheck_0",
        echeck_id: "newECheck_0"
      }, {
        value: 'newOptionValue'
      }],
      selected: 'newECheck_0'
    }));
  });
});
