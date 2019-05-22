import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import { webStartServiceInstallHelpUrl } from 'shared/utils/webStartServiceHelper';
import {
  UPDATE_PROMPT_MESSAGE,
  UPDATE_ERROR_MESSAGE,
  INIT_DATA_OF_PINPAD,
  GET_APD_INFORMATION_SUCCESS, // Only use in new device logic
  GET_APD_PAYMENT_INFO_SUCCESS,
  COMMUNICATE_WITH_DEVICE,
  UPDATE_SUCCESS_MESSAGE,
  ACCOUNT_HOLDER_INFO,
  CLEAR_PINPAD_PAYS,
  UPDATE_CURRENT_PAY_INDEX,
  PINPAD_SET_IS_NEW_CARD_FLAG
} from '../actions/pinpad';
import * as actionTypes from '../consts/actionTypes';

function formatApdPaymentInfo(obj) {
  return {
    isPayerCashCustomer: obj.is_payer_cash_customer,
    hasImmediatePaymentDue: obj.has_immediate_payment_due,
    canCancelApdPayment: obj.can_cancel_apd_payment,
    key: obj.key,
    committedReceiptId: obj.committed_receipt_id,
    receiptPaymentId: obj.receipt_payment_id,
    rno: obj.rno,
    receiptNumber: obj.receipt_number,
    orderId: obj.order_id,
    orderDescriptor: obj.order_descriptor,
    canLeaveBalance: obj.can_leave_balance_for_apd_payment
  };
}

function formatCardHolderInfo(obj) {
  return {
    cardholderZip: obj.account_holder_zip,
    cardholderAddr: obj.account_holder_addr
  };
}

const getInitialState = initData => fromJS({
  pays: [],
  promptMessage: '',
  errorMessage: '', // only used for both credit and debit
  communicating: false,
  isRefund: false,
  receiptHeaderId: -1,
  apdAppletInfo: null,
  apdPaymentInfo: null,
  cardHolderInfo: '',
  debitCardId: -1,
  companyId: -1,
  agentId: -1,
  customerId: -1,
  currentPayIndex: -1,
  // it determine whether swiping a new card only for card info without any payment amount.
  isNewCard: false,
  webStartServicehelpURL: `${initData.helpFileFolder}${webStartServiceInstallHelpUrl}`
});

const handlers = {
  [UPDATE_PROMPT_MESSAGE](state, { payload: { message, actionType } }) {
    const currentPayIndex = state.get('currentPayIndex');

    return state.withMutations((s) => {
      s.set('promptMessage', message);
      s.setIn(['pays', currentPayIndex, 'hasError'], false);
      s.setIn(['pays', currentPayIndex, 'actionType'], actionType);
    });
  },

  [UPDATE_ERROR_MESSAGE](state, { payload: { message, isServerErr, actionType, hasError } }) {
    const currentPayIndex = state.get('currentPayIndex');
    const currentPay = state.getIn(['pays', currentPayIndex]);
    const hasErr = typeof hasError !== 'undefined' ? hasError : true;

    if (isServerErr) {
      return state.set('errorMessage', message);
    }
    if (!currentPay.get('init')) {
      return state.withMutations((s) => {
        s.setIn(['pays', currentPayIndex, 'errorMessage'], message);
        s.setIn(['pays', currentPayIndex, 'init'], true);
        s.setIn(['pays', currentPayIndex, 'hasError'], hasErr);
        s.setIn(['pays', currentPayIndex, 'actionType'], actionType);
      });
    }

    return state.withMutations((s) => {
      s.setIn(['pays', currentPayIndex, 'errorMessage'], message);
      s.setIn(['pays', currentPayIndex, 'hasError'], hasErr);
      s.setIn(['pays', currentPayIndex, 'actionType'], actionType);
    });
  },

  // Only use in new device logic
  [GET_APD_INFORMATION_SUCCESS](state, { payload: { body: { apd_info: apdInfo } } }) {
    return state.set('apdAppletInfo', apdInfo);
  },

  [GET_APD_PAYMENT_INFO_SUCCESS](state, { payload }) {
    const { body: { apd_payment_info: apdPaymentInfo } } = payload;
    let requestKey = apdPaymentInfo.key;
    const pays = state.get('pays').map((pay) => {
      const newPay = pay.set('requestKey', requestKey);
      requestKey += 1;
      return newPay;
    });

    return state.withMutations((s) => {
      s.set('pays', pays);
      s.set('apdPaymentInfo', formatApdPaymentInfo(apdPaymentInfo));
    });
  },

  [ACCOUNT_HOLDER_INFO](state, { payload: { value } }) {
    return state.set('cardHolderInfo', formatCardHolderInfo(value));
  },

  [INIT_DATA_OF_PINPAD](state, { payload: { data } }) {
    const {
      receiptHeaderId,
      isRefund,
      debitCardId,
      pays,
      batchID,
      receiptID,
      companyId,
      agentId,
      customerId
    } = data;
    const apdPaymentInfo = state.get('apdPaymentInfo');

    if (apdPaymentInfo) {
      let requestKey = apdPaymentInfo.key;
      pays.forEach((pay) => {
        pay.requestKey = requestKey;
        requestKey += 1;
      });
    }

    return state.withMutations((s) => {
      s.set('receiptHeaderId', receiptHeaderId);
      s.set('isRefund', isRefund);
      s.set('debitCardId', debitCardId);
      s.set('pays', fromJS(pays));
      s.set('batchID', batchID);
      s.set('receiptID', receiptID);
      s.set('companyId', companyId);
      s.set('agentId', agentId);
      s.set('customerId', customerId);
      s.set('currentPayIndex', 0);
    });
  },

  [COMMUNICATE_WITH_DEVICE](state, { payload: { value } }) {
    return state.set('communicating', value);
  },

  [UPDATE_SUCCESS_MESSAGE](state, { payload: { message } }) {
    const currentPayIndex = state.get('currentPayIndex');
    const currentPay = state.getIn(['pays', currentPayIndex]);

    return state.withMutations((s) => {
      s.setIn(['pays', currentPayIndex, 'successInfo'], message);
      s.setIn(['pays', currentPayIndex, 'swipeSuccess'], true);
      s.setIn(['pays', currentPayIndex, 'errorMessage'], '');
      s.setIn(['pays', currentPayIndex, 'hasError'], false);
      s.setIn(['pays', currentPayIndex, 'actionType'], actionTypes.HIDE_RETRY);

      // istanbul ignore else
      if (!currentPay.get('init')) {
        s.setIn(['pays', currentPayIndex, 'init'], true);
      }
    });
  },

  [CLEAR_PINPAD_PAYS](state) {
    return state.withMutations((s) => {
      s.set('pays', fromJS([]));
      s.set('currentPayIndex', -1);
      s.set('errorMessage', '');
      s.set('apdPaymentInfo', null);
    });
  },

  [UPDATE_CURRENT_PAY_INDEX](state, { payload: { value } }) {
    return state.set('currentPayIndex', value);
  },

  [PINPAD_SET_IS_NEW_CARD_FLAG](state, { payload: { bFlag } }) {
    return state.set('isNewCard', bFlag);
  }
};

export default function getPinpadPaymentReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

