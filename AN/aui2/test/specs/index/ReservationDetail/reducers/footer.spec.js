import { is, fromJS } from 'immutable';
import reducer from 'index/ReservationDetail/reducers/footer';
import * as actions from 'index/ReservationDetail/actions/footer';

describe('index -> ReservationDetail -> reducers -> footer', () => {
  it('should return the initial state', () => {
    const initialState = fromJS({
      isShouldPay: false,
      isClickedConfirmChanges: false,
    });
    expect(is(initialState, reducer(undefined, {}))).toBe(true);
  });

  it('NEED_PAY_FOR_RESERVATION_CHANGES should work fine', () => {
    const payload = {
      isShouldPay: true,
      confirmChangeReceiptId: 1234
    };
    const state = reducer(undefined, {
      type: actions.NEED_PAY_FOR_RESERVATION_CHANGES,
      payload
    });
    expect(state.get('isShouldPay')).toBe(payload.isShouldPay);
    expect(state.get('confirmChangeReceiptId')).toBe(payload.confirmChangeReceiptId);
  });

  it('IS_CLICKED_CONFIRM_CHANGES should set a value as false', () => {
    const state = reducer(undefined, {
      type: actions.IS_CLICKED_CONFIRM_CHANGES,
      payload: {
        isClickedConfirmChanges: false
      }
    });
    expect(state.get('isClickedConfirmChanges')).toBe(false);
  });

  it('IS_CLICKED_CONFIRM_CHANGES should set a value as true', () => {
    const state = reducer(undefined, {
      type: actions.IS_CLICKED_CONFIRM_CHANGES,
      payload: { }
    });
    expect(state.get('isClickedConfirmChanges')).toBe(true);
  });
});
