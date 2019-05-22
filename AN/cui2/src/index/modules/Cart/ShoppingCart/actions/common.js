import { syncLegacyCuiAction } from 'index/actions/legacyCui';
import { fetchTransactionsAction, fetchAllPaymentPlansAsyncAction } from './transactions';
import { fetchQuickDonationAction } from './quickdonation';
import { fetchWaiversAction } from './waiver';
import { fetchOrderSummary } from './orderSummary';
import { uiSetDisplayCouponSection, fetchCouponsAsyncAction } from './coupon';

import API from '../api';

export const fetchCartPageDataAsyncAction = () =>
  (dispatch) => {
    const promiseQueue = [];
    promiseQueue.push(dispatch(fetchTransactionsAction()));
    promiseQueue.push(dispatch(fetchQuickDonationAction()));
    return Promise.all(promiseQueue).then(() => {
      const pQueue = [];
      pQueue.push(dispatch(fetchOrderSummary()));
      pQueue.push(dispatch(syncLegacyCuiAction()));
      pQueue.push(dispatch(fetchWaiversAction()));
      pQueue.push(dispatch(fetchCouponsAsyncAction()));
      pQueue.push(dispatch(fetchAllPaymentPlansAsyncAction()));
      return Promise.all(pQueue);
    });
  };

export const initCartPageAsyncAction = () =>
  dispatch => API.preparation()
    .then(({ body: { cart_common_info: cartCommonInfo } }) => {
      if (cartCommonInfo) {
        dispatch(uiSetDisplayCouponSection(cartCommonInfo.show_coupon_section));
      }
      return dispatch(fetchCartPageDataAsyncAction());
    });
