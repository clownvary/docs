import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  SET_COUPONS,
  SELECT_COUPON,
  COUPON_UI_ERROR,
  SET_DISPLAY_COUPON_SECTION
} from '../consts/actionTypes';

const initialState = fromJS({
  dcCoupons: fromJS([]),
  appliedDcCoupons: fromJS([]),
  selectedDcCouponId: '',
  showCouponSection: false,
  errorMessage: ''
});

const handlers = {
  [SET_COUPONS](
    state,
    {
      payload: {
        dcCoupons,
        appliedDcCoupons
      }
    }
  ) {
    return state.withMutations((s) => {
      s.set('dcCoupons', fromJS(dcCoupons));
      s.set('appliedDcCoupons', fromJS(appliedDcCoupons));
    });
  },

  [SELECT_COUPON](state, { payload: couponId }) {
    return state.set('selectedDcCouponId', couponId);
  },

  [SET_DISPLAY_COUPON_SECTION](state, { payload: showCouponSection }) {
    return state.set('showCouponSection', showCouponSection);
  },
  [COUPON_UI_ERROR](state, { payload: { errorMsg } }) {
    return state.set('errorMessage', errorMsg);
  }
};

export default reducerHandler(initialState, handlers);
