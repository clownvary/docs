import { fromJS } from 'immutable';
import {
  PAYMENT_OPTIONS_UPDATE,
  PAYMENT_OPTIONS_UPDATE_BY_KEY,
  PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS,
  PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG,
  PAYMENT_OPTIONS_SET_RESET
} from 'index/Payment/actions/paymentOptions/options';
import { UPDATE_SUCCESS_PAYMENT } from 'index/Payment/components/Modals/PinPad/actions/pinpad';
import reducer from 'index/Payment/reducers/paymentOptions/options';

// blocked by index/Payment/components/PaymentOptions/utils/payment.js
// which should not import store to do changes
jest.mock('index/Payment/store', () => ({}));

describe('index/Payment/reducers/paymentOptions/options', () => {
  it('PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS should work fine', () => {
    const optionIds = [1, 2, 3, 4];
    const state = reducer(fromJS({}), {
      type: PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS,
      payload: { optionIds }
    });
    expect(state.get('availableSplitIds')).toEqual(optionIds);
  });

  it('PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG should work fine', () => {
    const isDeleted = true;
    const state = reducer(fromJS({}), {
      type: PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG,
      payload: { isDeleted }
    });
    expect(state.get('deleteAPayment')).toEqual(isDeleted);
  });

  it('PAYMENT_OPTIONS_UPDATE_BY_KEY should work fine', () => {
    const payload = { index: 0, key: 'card_number', value: '5541#master' };
    const state = reducer(fromJS({}), {
      type: PAYMENT_OPTIONS_UPDATE_BY_KEY,
      payload
    });
    expect(state.getIn(['data', payload.index, payload.key])).toEqual(payload.value);
  });

  it('UPDATE_SUCCESS_PAYMENT should work fine', () => {
    const index = 0;
    const state = reducer(fromJS({}), {
      type: UPDATE_SUCCESS_PAYMENT,
      payload: { index }
    });
    expect(state.getIn(['data', index, 'disabled'])).toBeTruthy();
  });

  it('PAYMENT_OPTIONS_UPDATE should work fine', () => {
    const funcUpdate = () => 'mock funcUpdate.';
    const state = reducer(fromJS({
      data: []
    }), {
      type: PAYMENT_OPTIONS_UPDATE,
      payload: { funcUpdate }
    });
    expect(state.get('data')).toEqual(funcUpdate());
  });

  it('PAYMENT_OPTIONS_UPDATE should work fine if funcUpdate is not a function', () => {
    const funcUpdate = '123';
    const state = reducer(fromJS({
      data: []
    }), {
      type: PAYMENT_OPTIONS_UPDATE,
      payload: { funcUpdate }
    });
    expect(state.get('data')).toEqual(fromJS([]));
  });

  it('PAYMENT_OPTIONS_SET_RESET should works fine', () => {
    const payload = { type: 'test', context: {} }
    const state = reducer(fromJS({
      reset: {}
    }), {
      type: PAYMENT_OPTIONS_SET_RESET,
      payload
    });
    expect(state.get('reset').toJS()).toEqual(payload);
  });
});
