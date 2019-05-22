import { fromJS } from 'immutable';
import getPinpadPaymentReducer from 'index/Payment/components/Modals/PinPad/reducers/pinpad';
import * as actions from 'index/Payment/components/Modals/PinPad/actions/pinpad';
import jsonAccountHolder from 'json/Payment/accountholder.json';
import jsonApdInfo from 'json/Payment/getAPDInfo.json';
import jsonPaymentInfo from 'json/Payment/apdPaymentInfo.json';

const pinpadReducer = getPinpadPaymentReducer(__payment__.__initialState__);

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

const initialState = fromJS({
  pays: [{
    amout: '12.12',
    paymentTypeId: 3,
    payName: 'Credit Card',
    index: 0
  }],
  promptMessage: '',
  errorMessage: '',
  communicating: false,
  isRefund: false,
  receiptHeaderId: -1,
  apdAppletInfo: {},
  apdPaymentInfo: {},
  cardHolderInfo: '',
  debitCardId: -1,
  companyId: -1,
  agentId: -1,
  customerId: -1,
  currentPayIndex: 0
});

describe('index -> Payment -> components -> Modals -> PinPad -> reducers -> pinpad', () => {
  it('Should update prompt message well', () => {
    const { UPDATE_PROMPT_MESSAGE } = actions;
    const msg = 'Init the device ...';

    const state = pinpadReducer(initialState, {
      type: UPDATE_PROMPT_MESSAGE,
      payload: {
        message: msg
      }
    });

    expect(state.get('promptMessage')).toBe(msg);
  });

  it('Should update error message well', () => {
    const { UPDATE_ERROR_MESSAGE } = actions;
    const msg = 'swipe card error when use pinpad for payment.';
    const state = pinpadReducer(initialState, {
      type: UPDATE_ERROR_MESSAGE,
      payload: {
        message: msg
      }
    });
    const currentPayIndex = state.get('currentPayIndex');

    expect(state.getIn(['pays', currentPayIndex, 'init'])).toBe(true);
    expect(state.getIn(['pays', currentPayIndex, 'errorMessage'])).toBe(msg);
    expect(state.getIn(['pays', currentPayIndex, 'hasError'])).toBe(true);
  });

  it('Should update global error message well', () => {
    const { UPDATE_ERROR_MESSAGE } = actions;
    const msg = 'swipe card error when use pinpad for payment.';

    const state = pinpadReducer(initialState, {
      type: UPDATE_ERROR_MESSAGE,
      payload: {
        message: msg,
        isServerErr: true
      }
    });

    expect(state.get('errorMessage')).toBe(msg);
  });

  it('Should reset hasError and the actionType when start a new transaction(retry or another payment method by device)', () => {
    const { UPDATE_ERROR_MESSAGE } = actions;
    const msg = '';

    const state = pinpadReducer(initialState, {
      type: UPDATE_ERROR_MESSAGE,
      payload: {
        message: msg,
        hasError: false,
        actionType: 2
      }
    });

    const currentPayIndex = state.get('currentPayIndex');

    expect(state.getIn(['pays', currentPayIndex, 'init'])).toBe(true);
    expect(state.getIn(['pays', currentPayIndex, 'errorMessage'])).toBe(msg);
    expect(state.getIn(['pays', currentPayIndex, 'hasError'])).toBe(false);
    expect(state.getIn(['pays', currentPayIndex, 'actionType'])).toBe(2);
  });

  it('Should update error message well when has no server error and the pinpad has been initiallized.', () => {
    const { UPDATE_ERROR_MESSAGE } = actions;
    const msg = 'swipe card error when use pinpad for payment.';
    const initState = fromJS({
      pays: [{
        amout: '12.12',
        paymentTypeId: 3,
        index: 0,
        init: true
      }],
      currentPayIndex: 0
    });

    const state = pinpadReducer(initState, {
      type: UPDATE_ERROR_MESSAGE,
      payload: {
        message: msg,
        isServerErr: false,
        actionType: 1
      }
    });

    expect(state.getIn(['pays', 0, 'errorMessage'])).toBe(msg);
    expect(state.getIn(['pays', 0, 'hasError'])).toBe(true);
    expect(state.getIn(['pays', 0, 'actionType'])).toBe(1);
  });


  it('Should update apd information well', () => {
    const { GET_APD_INFORMATION_SUCCESS } = actions;
    const state = pinpadReducer(initialState, {
      type: GET_APD_INFORMATION_SUCCESS,
      payload: jsonApdInfo
    });

    expect(state.get('apdAppletInfo')).toEqual(jsonApdInfo.body.apd_info);
  });


  it('Should update payment information success', () => {
    const { GET_APD_PAYMENT_INFO_SUCCESS } = actions;

    const state = pinpadReducer(initialState, {
      type: GET_APD_PAYMENT_INFO_SUCCESS,
      payload: jsonPaymentInfo
    });

    expect(state.get('apdPaymentInfo')).toEqual(formatApdPaymentInfo(jsonPaymentInfo.body.apd_payment_info));
  });


  it('Should update account holder information well', () => {
    const { ACCOUNT_HOLDER_INFO } = actions;
    const accountHolderInfo = jsonAccountHolder.body.account_holder;

    const state = pinpadReducer(initialState, {
      type: ACCOUNT_HOLDER_INFO,
      payload: {
        value: accountHolderInfo
      }
    });

    expect(state.get('cardHolderInfo')).toEqual({
      cardholderZip: accountHolderInfo.account_holder_zip,
      cardholderAddr: accountHolderInfo.account_holder_addr
    });
  });


  it('Should init the data pinpad needed correctly', () => {
    const { INIT_DATA_OF_PINPAD } = actions;
    const initData = {
      receiptHeaderId: 0,
      isRefund: true,
      debitCardId: 4,
      pays: [],
      batchID: 0,
      receiptID: 0,
      companyId: 0,
      agentId: 0,
      customerId: 0,
      currentPayIndex: -1
    };

    const state = pinpadReducer(initialState, {
      type: INIT_DATA_OF_PINPAD,
      payload: {
        data: initData
      }
    });


    expect(state.get('receiptHeaderId')).toBe(initData.receiptHeaderId);
    expect(state.get('isRefund')).toBe(initData.isRefund);
    expect(state.get('debitCardId')).toBe(initData.debitCardId);
    expect(state.get('pays').size).toBe(0);
    expect(state.get('batchID')).toBe(initData.batchID);
    expect(state.get('receiptID')).toBe(initData.receiptID);
    expect(state.get('companyId')).toBe(initData.companyId);
    expect(state.get('agentId')).toBe(initData.agentId);
    expect(state.get('customerId')).toBe(initData.customerId);
    expect(state.get('currentPayIndex')).toBe(0);
  });


  it('Should update the communication status with device success', () => {
    const { COMMUNICATE_WITH_DEVICE } = actions;

    const state = pinpadReducer(initialState, {
      type: COMMUNICATE_WITH_DEVICE,
      payload: {
        value: true
      }
    });

    expect(state.get('communicating')).toBe(true);
  });


  it('Should update success message well', () => {
    const { UPDATE_SUCCESS_MESSAGE } = actions;
    const msg = 'swipe success and the card number is 666xxx888';
    const state = pinpadReducer(initialState, {
      type: UPDATE_SUCCESS_MESSAGE,
      payload: {
        message: msg
      }
    });
    const currentPayIndex = state.get('currentPayIndex');

    expect(state.getIn(['pays', currentPayIndex, 'init'])).toBe(true);
    expect(state.getIn(['pays', currentPayIndex, 'errorMessage'])).toBe('');
    expect(state.getIn(['pays', currentPayIndex, 'swipeSuccess'])).toBe(true);
    expect(state.getIn(['pays', currentPayIndex, 'successInfo'])).toBe(msg);
  });

  it('Should update clear the pinpad data after the pinpad modal hided', () => {
    const { CLEAR_PINPAD_PAYS } = actions;

    const state = pinpadReducer(initialState, {
      type: CLEAR_PINPAD_PAYS
    });

    expect(state.get('pays').size).toBe(0);
    expect(state.get('currentPayIndex')).toBe(-1);
    expect(state.get('errorMessage')).toBe('');
  });

  it('Should update current payment index well', () => {
    const { UPDATE_CURRENT_PAY_INDEX } = actions;
    const state = pinpadReducer(initialState, {
      type: UPDATE_CURRENT_PAY_INDEX,
      payload: {
        value: 8
      }
    });
    expect(state.get('currentPayIndex')).toBe(8);
  });

  it('Should update new card flag well', () => {
    const { PINPAD_SET_IS_NEW_CARD_FLAG } = actions;
    const bFlag = true;
    const state = pinpadReducer(initialState, {
      type: PINPAD_SET_IS_NEW_CARD_FLAG,
      payload: {
        bFlag
      }
    });
    expect(state.get('isNewCard')).toBe(bFlag);
  });
});
