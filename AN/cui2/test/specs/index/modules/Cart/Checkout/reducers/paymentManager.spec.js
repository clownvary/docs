import { is, fromJS } from 'immutable';
import expect from 'expect';
import * as actionTypes from 'index/modules/Cart/Checkout/consts/actionTypes';
import reducer, { handlers } from 'index/modules/Cart/Checkout/reducers/paymentManager';

describe('index/modules/Cart/Checkout/reducers/paymentManager', () => {

  const {
    PAYMENT_UI_UPDATE_MODULES
  } = actionTypes;

  const expectedInitialState = fromJS({
    modules: {}
  });

  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, reducer(undefined, {}))).toEqual(true);
  });

  it('Should update module successfully', () => {
    const handler = handlers[PAYMENT_UI_UPDATE_MODULES];
    const params = {
      payload: 1
    };
    const returnedState = handler(expectedInitialState, params);
    expect(returnedState.get('modules')).toEqual(1);
  });
});
