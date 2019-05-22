import { is, fromJS } from 'immutable';
import {
  SELECT_COUPON,
  COUPON_UI_ERROR,
  SET_COUPONS,
  SET_DISPLAY_COUPON_SECTION
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import couponReducer from 'index/modules/Cart/ShoppingCart/reducers/coupon';

describe('index/modules/Cart/ShoppingCart/reducers/coupon', () => {
  const expectedInitialState = fromJS({
    dcCoupons: fromJS([]),
    appliedDcCoupons: fromJS([]),
    selectedDcCouponId: '',
    showCouponSection: false,
    errorMessage: ''
  });
  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, couponReducer(undefined, {}))).toEqual(true);
  });

  it('Should set dcCoupons and appliedDcCoupons successfully', () => {
    const state = couponReducer(undefined, {
      type: SET_COUPONS,
      payload: {
        dcCoupons: 1,
        appliedDcCoupons: 2
      }
    });
    expect(state.get('dcCoupons')).toEqual(1);
    expect(state.get('appliedDcCoupons')).toEqual(2);
  });

  it('Should set selectedDcCouponId successfully', () => {
    const state = couponReducer(undefined, {
      type: SELECT_COUPON,
      payload: 3
    });
    expect(state.get('selectedDcCouponId')).toEqual(3);
  });

  it('Should set selectedDcCouponId successfully', () => {
    const state = couponReducer(undefined, {
      type: SET_DISPLAY_COUPON_SECTION,
      payload: 4
    });
    expect(state.get('showCouponSection')).toEqual(4);
  });

  it('Should get errorMsg successfully', () => {
    const errorMsg = 'test error';
    const returnState = couponReducer(expectedInitialState, {
      type: COUPON_UI_ERROR,
      payload: { errorMsg }
    });
    expect(returnState.get('errorMessage')).toEqual(errorMsg);
  });
  it('Should get code successfully', () => {
    const code = '4567909876545678';
    const returnState = couponReducer(expectedInitialState, {
      type: SELECT_COUPON,
      payload: code
    });
    expect(returnState.get('selectedDcCouponId')).toEqual(code)
  });

});
