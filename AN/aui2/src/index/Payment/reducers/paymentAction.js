import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  MODIFY_PAYMENT_PLAN_KEY,
  PAY_NOW_KEY
} from '../consts/paymentActionTypesOnModification';
import {
  PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION
} from '../consts/actionTypes';
import { isPaymentActionValid } from './index';

const getInitialState = (initData) => {
  const {
    paymentSummary: {
      show_payment_plan: showPaymentPlan
    }
  } = initData;
  const allowModifyPaymentPlan = typeof showPaymentPlan !== 'undefined' ? showPaymentPlan : true;
  const isSelectModifyPaymentPlan = isPaymentActionValid && allowModifyPaymentPlan;
  const isSelectMakeAPayment = isPaymentActionValid && !allowModifyPaymentPlan;

  return fromJS({
    paymentActionType: allowModifyPaymentPlan ? MODIFY_PAYMENT_PLAN_KEY : PAY_NOW_KEY,
    isSelectModifyPaymentPlan,
    isSelectMakeAPayment
  });
};

const isSelected = (expect, value) => (isPaymentActionValid && (expect === value));

const handlers = {
  [PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION](state, { payload: { paymentActionType } }) {
    return state.withMutations((s) => {
      s.set('paymentActionType', paymentActionType);
      s.set('isSelectModifyPaymentPlan', isSelected(
          MODIFY_PAYMENT_PLAN_KEY,
          paymentActionType
        ));
      s.set('isSelectMakeAPayment', isSelected(
          PAY_NOW_KEY,
          paymentActionType
        ));
    });
  }
};

export default function getPaymentActionReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
