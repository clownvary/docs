import createFSA from 'react-base-ui/lib/utils/createFSA';
import isArray from 'lodash/isArray';
import uniq from 'lodash/uniq';
import { isValidationErrorFromApi } from 'shared/utils/apiError';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { fetchCartPageDataAsyncAction } from './common';
import API from '../api';
import {
  SET_COUPONS,
  SELECT_COUPON,
  COUPON_UI_ERROR,
  SET_DISPLAY_COUPON_SECTION
} from '../consts/actionTypes';
import { generateCouponUniqueId } from '../components/Coupon/util';

const uiShowCoupons = createFSA(SET_COUPONS);
const uiUpdateErrorAction = createFSA(COUPON_UI_ERROR);
export const uiSelectCouponAction = createFSA(SELECT_COUPON);
export const uiSetDisplayCouponSection = createFSA(SET_DISPLAY_COUPON_SECTION);

export const fetchCouponsAsyncAction = () => dispatch =>
  API.getCoupons().then((response) => {
    const { body: { dc_coupon: dccoupon } } = response;
    const {
      available_coupons: _dcCoupons,
      applied_coupons: appliedDcCoupons
    } = dccoupon;
    const dcCoupons = _dcCoupons.map((item) => {
      const id = generateCouponUniqueId(item);
      return {
        ...item,
        ...{
          id,
          text: decodeHtmlStr(item.coupon_code),
          value: id
        }
      };
    });
    return dispatch(uiShowCoupons({ dcCoupons, appliedDcCoupons }));
  });
export const updateCouponCodeAction = code => (dispatch) => {
  dispatch(uiUpdateErrorAction({ errorMsg: null }));
  return dispatch(uiSelectCouponAction(code));
};

export const deleteCouponAction = couponIds => (dispatch) => {
  couponIds = isArray(couponIds) ? uniq(couponIds).join(',') : couponIds;
  return API.deleteCoupon({ ids: couponIds })
    .then(() => dispatch(fetchCartPageDataAsyncAction()));
};

export const applyCouponAsyncAction = () => (dispatch, state) => {
  const params = {};
  const coupon = state().modules.Cart.ShoppingCart.coupon;
  const selectedDcCouponId = coupon.get('selectedDcCouponId');
  const dcCoupons = coupon.get('dcCoupons');
  const couponData = dcCoupons.find(item => item.get('id') === selectedDcCouponId);
  if (couponData) {
    params.dcprogram_id = couponData.get('dcprogram_id');
    params.customer_id = couponData.get('appliable_participants').map(item => item.get('customer_id')).toJS();
    params.coupon_code = couponData.get('coupon_code');
  } else {
    params.coupon_code = selectedDcCouponId;
  }
  return API.applyCoupon({ body: { ...params } })
    .catch((error) => {
      if (isValidationErrorFromApi(error)) {
        const { data: { response: { headers: { response_message: errorMsg } } } } = error;
        dispatch(uiUpdateErrorAction({ errorMsg }));
        return Promise.reject(new Error(errorMsg));
      }
      return Promise.reject(error);
    })
    .then(() => {
      dispatch(updateCouponCodeAction(''));
      return dispatch(fetchCartPageDataAsyncAction());
    });
};
