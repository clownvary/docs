import { fromJS } from 'immutable';
import getNewCreditCardReducer from 'index/Payment/reducers/modals/newCreditCard';
import * as actions from 'index/Payment/actions/modals/NewCreditCard';

const reducer = getNewCreditCardReducer(__payment__.__initialState__);

describe('index/Payment/reducers/modals/newCreditCard', () => {
  it('IS_CHECKED_FOR_PAY_ACTION should work fine', () => {
    const { IS_CHECKED_FOR_PAY_ACTION } = actions;
    const value = true;
    const state = reducer(fromJS({}), {
      type: IS_CHECKED_FOR_PAY_ACTION,
      payload: { value }
    });
    expect(state.get('isCheckedForPay')).toEqual(value);
  });
  it('CHANGE_EXPIRATION_DATE_MONTH_ACTION should work fine', () => {
    const { CHANGE_EXPIRATION_DATE_MONTH_ACTION } = actions;
    const value = '09';
    const state = reducer(fromJS({}), {
      type: CHANGE_EXPIRATION_DATE_MONTH_ACTION,
      payload: { value }
    });
    expect(state.get('ExpirationDateMonthValue')).toEqual(fromJS(value));
  });

  it('CHANGE_EXPIRATION_DATE_YEAR_ACTION should work fine', () => {
    const { CHANGE_EXPIRATION_DATE_YEAR_ACTION } = actions;
    const value = '2018';
    const state = reducer(fromJS({}), {
      type: CHANGE_EXPIRATION_DATE_YEAR_ACTION,
      payload: { value }
    });
    expect(state.get('ExpirationDateYearValue')).toEqual(fromJS(value));
  });

  it('SHOW_CC_MODAL_ACTION should work fine if it\'s negative', () => {
    const { SHOW_CC_MODAL_ACTION } = actions;
    const value = false;
    const state = reducer(fromJS({}), {
      type: SHOW_CC_MODAL_ACTION,
      payload: { value }
    });
    expect(state.get('cardTypeList')).toBeUndefined();
  });

  it('SHOW_CC_MODAL_ACTION should work fine ', () => {
    const { SHOW_CC_MODAL_ACTION } = actions;
    const value = true;
    const state = reducer(fromJS({}), {
      type: SHOW_CC_MODAL_ACTION,
      payload: { value }
    });
    expect(state.get('isCheckedForPay')).toBeFalsy();
    expect(state.get('showModel')).toBeTruthy();
  });

  it('FETCH_CARD_TYPE_ACTION_SUCCESS should work fine ', () => {
    const { FETCH_CARD_TYPE_ACTION_SUCCESS } = actions;
    const card_type_list = [
      { id: '122', selected: false, card_type_id: 1, card_type: 'visa' },
      { id: '219', selected: true, card_type_id: 2, card_type: 'master' }
    ];
    const state = reducer(fromJS({}), {
      type: FETCH_CARD_TYPE_ACTION_SUCCESS,
      payload: { body: { card_type_list } }
    });
    expect(state.getIn(['cardTypeList', 'data'])).toEqual(fromJS([
      { id: '122', selected: false, card_type_id: 1, card_type: 'visa', text: 'visa', value: '122' },
      { id: '219', selected: true, card_type_id: 2, card_type: 'master', text: 'master', value: '219' }
    ]));
  });

});
