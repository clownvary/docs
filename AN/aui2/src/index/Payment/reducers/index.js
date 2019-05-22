import { fromJS } from 'immutable';
import queryString from 'query-string';
import reducerHandler from 'shared/utils/reducerHandler';
import { pages } from 'shared/consts';
import { caculateIframeHeight } from 'shared/components/Root';
import formatCurrency from '../utils/formatCurrency';
import {
  CHANGE_REMAINING,
  SHOW_PAYMENT_ERRORS,
  CLEAR_PAYMENT_ERRORS,
  SHOW_ECP_AUTH_DETAILS,
  UPDATE_PAY_NOW_AMOUNT,
  RESIZE
} from '../actions';

import {
  UPDATE_SUCCESS_PAYMENT
} from '../components/Modals/PinPad/actions/pinpad';

import {
  CHANGE_PAYMENTPLAN_AMOUNT
} from '../actions/paymentOptions/paymentPlan';

const qs = queryString.parse(location.search);
const sourcePageIndex = parseInt(qs[pages.sourcePageKey] || -1, 10);
const paymentPageIndex = parseInt(qs[pages.paymentPageIndex] || -1, 10);
const fromCancelPermit = qs[pages.cancelPermit] === 'true';

export const isPaymentActionValid = (sourcePageIndex === pages.reservationDetailPage)
    && (paymentPageIndex === pages.PAY_IN_RESERVATION);

const getInitialState = (initData) => {
  const total = formatCurrency(initData.total);
  const {
    isRefund,
    transactionFee,
    depositFee,
    minimumPayNowAmount,
    paymentPlanInitData: {
      payment_plan_wording: paymentPlanWording,
      allow_customer_change: allowCustomerChange
    },
    paymentSummary,
    claimTaxTotal,
    claimDiscountTotal
  } = initData;

  const showPaymentPlan = paymentSummary.show_payment_plan;
  const allowModifyPaymentPlan = typeof showPaymentPlan !== 'undefined' ? showPaymentPlan : true;
  const balanceAmount = paymentSummary.balance_amount;
  /* istanbul ignore next */
  const paymentBalance = formatCurrency(balanceAmount || 0);
  /* istanbul ignore next */
  const isAllowChangePayerForModifyPaymentPlan = isPaymentActionValid ? allowCustomerChange : true;
  /* istanbul ignore next */
  return fromJS({
    resize: caculateIframeHeight(),
    total: isPaymentActionValid ? paymentBalance : total,
    remaining: 0,
    errors: [],
    successPay: false,
    payNow: isPaymentActionValid ? paymentBalance : total,
    paymentPlanAmount: 0,
    ecpAuthDetails: {},
    transactionFee: formatCurrency(transactionFee),
    depositFee: formatCurrency(depositFee),
    minimumPayNowAmount: isPaymentActionValid ? 0 : minimumPayNowAmount,
    paymentPlanWording,
    sourcePageIndex,
    paymentPageIndex,
    isPaymentActionValid,
    isAllowChangePayerForModifyPaymentPlan,
    isRefund,
    allowModifyPaymentPlan,
    claimTaxTotal: formatCurrency(claimTaxTotal),
    claimDiscountTotal: formatCurrency(claimDiscountTotal),
    fromCancelPermit
  });
};

const handlers = {

  [CHANGE_REMAINING](state, { payload: { remaining } }) {
    return state.withMutations((s) => {
      s.set('remaining', remaining);
    });
  },

  [SHOW_PAYMENT_ERRORS](state, { payload: { errors } }) {
    return state.set('errors', fromJS(errors));
  },

  [CLEAR_PAYMENT_ERRORS](state, { payload: { optionIndex } }) {
    return state.set('errors', state.get('errors').filter(err => err.get('key') !== optionIndex));
  },

  [UPDATE_SUCCESS_PAYMENT](state) {
    window.isReceiptCantCancel = true;
    return state.set('successPay', true);
  },

  [SHOW_ECP_AUTH_DETAILS](state, { payload: { ecpAuthDetails } }) {
    return state.set('ecpAuthDetails', ecpAuthDetails);
  },

  [CHANGE_PAYMENTPLAN_AMOUNT](state, { payload: { amount } }) {
    return state.set('paymentPlanAmount', amount);
  },

  [UPDATE_PAY_NOW_AMOUNT](state, { payload: { payNow } }) {
    return state.set('payNow', payNow);
  },

  [RESIZE](state, { payload: { height } }) {
    return state.set('resize', height);
  }
};

export default function getPaymentReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
