import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Cart/Balance/consts/actionTypes';
import balanceReducer from 'index/modules/Cart/Balance/reducers/balance';

import balances from 'Cart/Balance/get_balances.json';

describe('index/modules/Cart/Balance/reducers/balance', () => {
  const initialState = fromJS({
    outstandingBalances: [],
    subTotal: 0,
    unpaidAmount: 0,
    outstandingAccountBalanceWarning: '',
    customerName: '',
    balanceDate: '',
    errors: {},
    require: false,
    requireMinPaymentAmount: 0
  });

  const summary = balances.body.outstanding_balance_smmary;
  const balancesList = summary.outstanding_balances;

  const expectedInitialState = fromJS({
    outstandingBalances: fromJS(balancesList),
    subTotal: summary.sub_total,
    unpaidAmount: summary.unpaid_amount,
    outstandingAccountBalanceWarning: summary.outstanding_account_balance_warning,
    customerName: summary.customer_name,
    balanceDate: summary.balance_date,
    errors: fromJS({ receipt6165: 'Max error' })
  });

  it('Should return the expected initial state', () => {
    expect(is(initialState, balanceReducer(undefined, {}))).toBeTruthy();
  });

  it('Should list balance successfully', () => {
    const { BALANCE_UI_LIST } = actionTypes;

    const returnState = balanceReducer(initialState, {
      type: BALANCE_UI_LIST,
      payload: { outstandingBalanceSmmary: summary }
    });

    expect(returnState.get('outstandingBalances')).toEqual(expectedInitialState.get('outstandingBalances'));
    expect(returnState.get('subTotal')).toEqual(expectedInitialState.get('subTotal'));
    expect(returnState.get('unpaidAmount')).toEqual(expectedInitialState.get('unpaidAmount'));
    expect(returnState.get('outstandingAccountBalanceWarning'))
    .toEqual(expectedInitialState.get('outstandingAccountBalanceWarning'));
    expect(returnState.get('customerName')).toEqual(expectedInitialState.get('customerName'));
    expect(returnState.get('balanceDate')).toEqual(expectedInitialState.get('balanceDate'));
  });

  it('Should validae successfully when have error', () => {
    const { BALANCE_ON_VALIDATION } = actionTypes;

    const returnState = balanceReducer(initialState, {
      type: BALANCE_ON_VALIDATION,
      payload: { errors: { receipt6165: 'Max error' } }
    });

    expect(returnState.get('errors')).toEqual(expectedInitialState.get('errors'));
  });

  it('Should validae successfully when no error', () => {
    const { BALANCE_ON_VALIDATION } = actionTypes;

    const expectedState = fromJS({
      errors: fromJS({ receipt6165: '' })
    });

    const returnState = balanceReducer(expectedInitialState, {
      type: BALANCE_ON_VALIDATION,
      payload: { errors: { receipt6165: '' } }
    });

    expect(returnState.get('errors')).toEqual(expectedState.get('errors'));
  });

  it('Should clear info successfully', () => {
    const { BALANCE_ON_CLEAR_INFO } = actionTypes;

    const expectedState = fromJS({
      outstandingAccountBalanceWarning: ''
    });

    const returnState = balanceReducer(initialState, {
      type: BALANCE_ON_CLEAR_INFO
    });

    expect(returnState.get('outstandingAccountBalanceWarning'))
    .toEqual(expectedState.get('outstandingAccountBalanceWarning'));
  });

  it('Should list balance successfully', () => {
    const { BALANCE_ON_UPDATE_LIST } = actionTypes;
    const index = 0;
    const value = 1;
    const returnState = balanceReducer(initialState, {
      type: BALANCE_ON_UPDATE_LIST,
      payload: { index, value }
    });

    expect(parseInt(returnState.get('subTotal'), 0)).toEqual(value);
  });
});
