import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/index';
import { CCPaymentMethods } from 'index/Payment/consts';

jest.mock('index/Payment/actions/paymentOptions/creditCard', () => ({
  submitCCPaymentIframeAsyncAction: jest.fn().mockReturnValue(Promise.resolve({ sessionId: 'sessionId' }))
}))

jest.mock('index/Payment/actions/paymentOptions/paymentPlan', () => ({
  submitPPPaymentIframeAsyncAction: jest.fn().mockReturnValue(Promise.resolve({ sessionId: 'sessionId' }))
}))

jest.mock('index/Payment/actions/paymentOptions/giftCard', () => ({
  deletePendingGiftCard: jest.fn().mockReturnValue(Promise.resolve())
}))

jest.mock('index/Payment/actions/modals/Magtek', () => ({
  proceedMagtekModalPromiseAction: jest.fn().mockReturnValue(Promise.resolve({
    walletId: 11,
    ccNumberValue: '12434',
    cardTypeId: 1,
    cardTypeSystemId: 2,
    expirationDate: '12/23',
    saveCardInformation: false
  })),
  hideMagtekModalAction: jest.fn()
}))

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index -> Payment -> actions -> index', () => {
  const initialData = {
    permitID: 0,
    receiptID: 0,
    batchID: 0,
    ccScanWithApdDevice: false,
    ccScanWithMagesafeDevice: false
  };
  const newCCState = fromJS({
    isCheckedForPay: false
  });
  const initState = {
    payment: fromJS({
      sourcePageIndex: 3
    }),
    paymentAction: fromJS({
      isSelectModifyPaymentPlan: false,
      isSelectMakeAPayment: false
    }),
    paymentModals: {
      newCreditCard: newCCState
    },
    initialData
  };
  const payerState = fromJS({
    params: {
      companyId: 0,
      agentId: 0,
      customerId: 1
    }
  });
  const paymentOptionState = fromJS({
    data: [
      {
        list: [
          {
            id: 12,
            name: "Refund Credit Card",
            selected: true,
            text: "Refund Credit Card",
            value: 12
          },
          {
            id: 7,
            name: "Gift Card",
            selected: false,
            text: "Gift Card",
            value: 7
          },
          {
            id: 6,
            name: "Credit Account",
            selected: false,
            text: "Credit Account",
            value: 6
          },
          {
            id: 4,
            name: "Debit Card",
            selected: false,
            text: "Debit Card",
            value: 4
          },
          {
            id: 5,
            name: "Electronic Checkcc",
            selected: false,
            text: "Electronic Checkcc",
            value: 5
          }
        ],
        activeVal: 12,
        ComponentName: "CreditCard",
        amount: "10.00",
        formatCreditCardAmount: "10.00",
        creditCardListDropDownValue: "5454",
        CCPaymentMethod: -1,
        errors: []
      }
    ]
  });
  const giftCardState = fromJS({
    "giftCardDropDown": {
      "data": [
        {
          "gc_company_id": 0,
          "gc_status_id": 2,
          "name": "gc-mask1 #111.222.33 ($30)",
          "gc_expire_date": -2209132800000,
          "gc_number": "111.222.33",
          "gc_type_name": "gc-mask1",
          "text": "gc-mask1 #111.222.33 ($30)",
          "value": 32,
          "gc_available_amount": 30,
          "gc_liability_gl_account_id": 13,
          "gc_is_expired": false,
          "gc_status_name": "Active",
          "gc_purchased_amount": 30,
          "gc_redeemed_amount": 0,
          "gc_customer_id": 7250,
          "gc_type_id": 4,
          "gc_id": 32,
          "gc_refilled_amount": 0
        }
      ],
      "selected": []
    },
    "giftCardId": 7,
    "newGiftCardDropDown": {
      "data": [],
      "selected": []
    }
  });
  const paymentState = fromJS({
    isDistributePayment: false,
    isSelectMakeAPayment: false,
    isRefund: false
  });
  const paymentParams = [
    {
      check_number: "",
      cash_amount_paid: 0,
      cash_change_amount: 0,
      cash_amount_owed: 0,
      card_number: null,
      auth_number: null,
      ams_account_id: "Demo AccountID",
      add_to_customer_cc: false,
      cc_number: "5454",
      credit_card_type: 2,
      cc_expiry: "12/2016",
      cc_info_ignore_exp_error: false,
      saved_credit_card_name: "xxx5454",
      eft_account_number: null,
      eft_routing_number: null,
      eft_account_type: null,
      eft_ams_account_id: null,
      is_add_to_customer_ecp: false,
      gc_number: "",
      gc_type_id: null,
      is_refund_to_new_gc: false,
      index: 0,
      payment_type_id: 12,
      amount: "10.00",
      other_number: ""
    }
  ];

  const mockStore = configureStore(middlewares);
  let store = null;

  function getDefaultState(state = {}) {
    return {
      ...initState,
      ...state
    }
  }

  beforeEach(() => {
    __STATIC__ = false;
    store = mockStore(getDefaultState());
  });

  afterEach(() => {
    __STATIC__ = true;
    store.clearActions();
  });

  it('gotoNextPage should works well when source page is reservation detail and did not come from payment button', () => {
    const { gotoNextPage } = actions;
    const receiptHeaderId = -1;

    store.dispatch(gotoNextPage(receiptHeaderId));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(2);
    expect(dispatchedActions[0].type).toEqual('LOADING_BAR_SHOW');
    expect(dispatchedActions[1].type).toEqual('LOCATION_REDIRECT');
    expect(dispatchedActions[1].payload.url).toEqual('/ui.do?method=reservationDetail&permit_id=0&message_code=2&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
  });

  it('gotoNextPage should works well when source page is refund deposit', () => {
    const { gotoNextPage } = actions;
    const receiptHeaderId = -1;
    store = mockStore(getDefaultState({
      initialData: {
        permitID: 0,
        receiptID: 0,
        batchID: 0
      },
      payment: fromJS({
        sourcePageIndex: 6
      })
    }));

    store.dispatch(gotoNextPage(receiptHeaderId));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(2);
    expect(dispatchedActions[0].type).toEqual('LOADING_BAR_SHOW');
    expect(dispatchedActions[1].payload.url).toEqual('/ui.do?method=reservationDetail&permit_id=0&message_code=7&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
  });

  it('gotoNextPage should works well when source page is reservation detail and make a payment', () => {
    const { gotoNextPage } = actions;
    const receiptHeaderId = -1;
    store = mockStore(getDefaultState({
      paymentAction: fromJS({
        isSelectModifyPaymentPlan: false,
        isSelectMakeAPayment: true
      })
    }));

    store.dispatch(gotoNextPage(receiptHeaderId));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(2);
    expect(dispatchedActions[0].type).toEqual('LOADING_BAR_SHOW');
    expect(dispatchedActions[1].payload.url).toEqual('/ui.do?method=reservationDetail&permit_id=0&message_code=3&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
  });

  it('gotoNextPage should works well when source page is reservation detail and modify payment plan', () => {
    const { gotoNextPage } = actions;
    const receiptHeaderId = -1;
    store = mockStore(getDefaultState({
      paymentAction: fromJS({
        isSelectModifyPaymentPlan: true,
        isSelectMakeAPayment: false
      })
    }));

    store.dispatch(gotoNextPage(receiptHeaderId));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(2);
    expect(dispatchedActions[0].type).toEqual('LOADING_BAR_SHOW');
    expect(dispatchedActions[1].payload.url).toEqual('/ui.do?method=reservationDetail&permit_id=0&message_code=4&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
  });

  it('gotoNextPage should works well when source page is cart page', () => {
    const { gotoNextPage } = actions;
    const receiptHeaderId = -1;
    store = mockStore(getDefaultState({
      initialData: {
        permitID: 0,
        receiptID: 0,
        batchID: 0,
      },
      payment: fromJS({
        sourcePageIndex: 4
      })
    }));

    store.dispatch(gotoNextPage(receiptHeaderId));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(2);
    expect(dispatchedActions[0].type).toEqual('LOADING_BAR_SHOW');
    expect(dispatchedActions[1].payload.url).toEqual('/ui.do?method=showConfirmation&batch_id=0&receipt_id=0&receipt_header_id=-1&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
  });

  it('gotoNextPage should works well when need cancel permit also.', () => {
    const { gotoNextPage } = actions;
    const receiptHeaderId = -1;
    store = mockStore(getDefaultState({
      initialData: {
        permitID: 0,
        receiptID: 0,
        batchID: 0,
        cancelPermit: true
      },
      payment: fromJS({
        sourcePageIndex: 6
      })
    }));

    store.dispatch(gotoNextPage(receiptHeaderId));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(2);
    expect(dispatchedActions[0].type).toEqual('LOADING_BAR_SHOW');
    expect(dispatchedActions[1].payload.url).toEqual('/ui.do?method=reservationDetail&permit_id=0&message_code=6&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
  });
  it('changeRemaining should works well', () => {
    const { changeRemaining, CHANGE_REMAINING } = actions;
    const param = { remaining: 122 };

    store.dispatch(changeRemaining(param));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(1);
    expect(dispatchedActions[0].type).toEqual(CHANGE_REMAINING);
    expect(dispatchedActions[0].payload).toEqual(param);
  });

  it('makePayment should works well when pay by credit card without manual input or device', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0]
    }];

    store = mockStore(getDefaultState({
      payer: payerState,
      paymentOptions: {
        options: paymentOptionState
      },
      payment: paymentState
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('makePayment should works well when pay by credit card with ApdDevice with saved credit card.', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0]
    }];
    const payOptionState = paymentOptionState.setIn(['data', 0, 'CCPaymentMethod'], -1)
      .setIn(['data', 0, 'activeVal'], 12);
    store = mockStore(getDefaultState({
      payer: payerState,
      paymentOptions: {
        options: payOptionState,
        giftCard: giftCardState
      },
      payment: paymentState.set('isRefund', true),
      initialData: {
        ...initState,
        ccScanWithApdDevice: true
      }
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        done();
      });
  });

  it('makePayment should works well when pay by credit card with magtek with swiping new card also the payer is dropin customer.', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0]
    }];
    const payOptionState = paymentOptionState.setIn(['data', 0, 'CCPaymentMethod'], CCPaymentMethods.NEW_CARD_WITH_DEVICE)
      .setIn(['data', 0, 'activeVal'], 12);
    store = mockStore(getDefaultState({
      payer: payerState.set('isPayerBeDropIn', true),
      paymentOptions: {
        options: payOptionState,
        giftCard: giftCardState
      },
      payment: paymentState,
      initialData: {
        ...initState,
        ccScanWithMagesafeDevice: true
      }
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(6);
        expect(storeActions.some(action => action.type === 'CLEAR_ERROR'));
        expect(storeActions.some(action => action.type === 'SHOW_CC_MODAL_ACTION'));
        expect(storeActions.some(action => action.type === 'SHOW_PAYMENT_ERRORS'));
        expect(storeActions.some(action => action.type === 'PAYMENT_OPTIONS_UPDATE_BY_KEY'));
        done();
      });
  });

  it('makePayment should works well when pay by credit card with magtek with swiping new card also the payer is normal customer.', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0]
    }];
    const payOptionState = paymentOptionState.setIn(['data', 0, 'CCPaymentMethod'], CCPaymentMethods.NEW_CARD_WITH_DEVICE)
      .setIn(['data', 0, 'activeVal'], 12);
    store = mockStore(getDefaultState({
      payer: payerState.set('isPayerBeDropIn', false),
      paymentOptions: {
        options: payOptionState,
        giftCard: giftCardState
      },
      payment: paymentState,
      initialData: {
        ...initState,
        ccScanWithMagesafeDevice: true
      }
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(6);
        expect(storeActions.some(action => action.type === 'CLEAR_ERROR'));
        expect(storeActions.some(action => action.type === 'SHOW_CC_MODAL_ACTION'));
        expect(storeActions.some(action => action.type === 'SHOW_PAYMENT_ERRORS'));
        expect(storeActions.some(action => action.type === 'PAYMENT_OPTIONS_UPDATE_BY_KEY'));
        done();
      });
  });

  it('makePayment should works well when pay by credit card with magtek with swiping new card also the payer is normal customer and allow show prior cc.', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0]
    }];
    const payOptionState = paymentOptionState.setIn(['data', 0, 'CCPaymentMethod'], CCPaymentMethods.NEW_CARD_WITH_DEVICE)
      .setIn(['data', 0, 'activeVal'], 12);
    store = mockStore(getDefaultState({
      initialData: { showPriorCC: true, ...initialData},
      payer: payerState.set('isPayerBeDropIn', false),
      paymentOptions: {
        options: payOptionState,
        giftCard: giftCardState
      },
      payment: paymentState,
      initialData: {
        ...initState,
        ccScanWithMagesafeDevice: true
      }
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(6);
        expect(storeActions.some(action => action.type === 'CLEAR_ERROR'));
        expect(storeActions.some(action => action.type === 'SHOW_CC_MODAL_ACTION'));
        expect(storeActions.some(action => action.type === 'SHOW_PAYMENT_ERRORS'));
        expect(storeActions.some(action => action.type === 'PAYMENT_OPTIONS_UPDATE_BY_KEY'));
        done();
      });
  });

  it('makePayment should works well when pay by credit card with magtek with swiping new card.', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0]
    }];
    const payOptionState = paymentOptionState.setIn(['data', 0, 'CCPaymentMethod'], CCPaymentMethods.NEW_CARD_WITH_DEVICE)
      .setIn(['data', 0, 'activeVal'], 12);
    store = mockStore(getDefaultState({
      payer: payerState,
      paymentOptions: {
        options: payOptionState,
        giftCard: giftCardState
      },
      payment: paymentState.set('isRefund', true),
      initialData: {
        ...initState,
        ccScanWithMagesafeDevice: true
      }
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(6);
        expect(storeActions.some(action => action.type === 'CLEAR_ERROR'));
        expect(storeActions.some(action => action.type === 'SHOW_CC_MODAL_ACTION'));
        expect(storeActions.some(action => action.type === 'SHOW_PAYMENT_ERRORS'));
        expect(storeActions.some(action => action.type === 'PAYMENT_OPTIONS_UPDATE_BY_KEY'));
        done();
      });
  });

  it('makePayment should works well when pay by credit card with ApdDevice with swiping new card and get server error.', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0]
    }];
    const payOptionState = paymentOptionState.setIn(['data', 0, 'CCPaymentMethod'], CCPaymentMethods.NEW_CARD_WITH_DEVICE)
      .setIn(['data', 0, 'activeVal'], 14);
    store = mockStore(getDefaultState({
      payer: payerState,
      paymentOptions: {
        options: payOptionState,
        giftCard: giftCardState
      },
      payment: paymentState.set('isRefund', true),
      initialData: {
        ...initState,
        ccScanWithMagesafeDevice: true
      }
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(6);
        expect(storeActions.some(action => action.type === 'CLEAR_ERROR'));
        expect(storeActions.some(action => action.type === 'SHOW_CC_MODAL_ACTION'));
        expect(storeActions.some(action => action.type === 'SHOW_PAYMENT_ERRORS'));
        done();
      });
  });


  it('makePayment should works well when pay by Debit and make a payment', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0],
      payment_type_id: 4
    }];
    const payOptionState = paymentOptionState.setIn(['data', 0, 'activeVal'], 4);
    store = mockStore(getDefaultState({
      payer: payerState,
      paymentOptions: {
        options: payOptionState,
        giftCard: giftCardState
      },
      payment: paymentState.set('isRefund', true),
      initialData: {
        ...initState,
        ccScanWithApdDevice: true
      },
      paymentAction: fromJS({
        isSelectModifyPaymentPlan: false,
        isSelectMakeAPayment: true
      })
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(16);
        expect(storeActions.some(action => action.type === 'CLEAR_ERROR'));
        expect(storeActions.some(action => action.type === 'SHOW_CC_MODAL_ACTION'));
        expect(storeActions.some(action => action.type === 'INIT_DATA_OF_PINPAD'));
        expect(storeActions.some(action => action.type === 'GET_APD_INFORMATION'));
        expect(storeActions.some(action => action.type === 'GET_APD_PAYMENT_INFO'));
        expect(storeActions.some(action => action.type === 'FETCH_CC_ACCOUNT_HOLDER_ACTION'));
        expect(storeActions.some(action => action.type === 'FETCH_CC_ACCOUNT_HOLDER_ACTION_SUCCESS'));
        expect(storeActions.some(action => action.type === 'GET_APD_PAYMENT_INFO_SUCCESS'));
        expect(storeActions.some(action => action.type === 'GET_APD_INFORMATION_SUCCESS'));
        expect(storeActions.some(action => action.type === 'PINPAD_SET_IS_NEW_CARD_FLAG'));
        expect(storeActions.some(action => action.type === 'UPDATE_MODAL_TITLE'));
        expect(storeActions.some(action => action.type === 'OPEN_OR_HIDE_MODAL'));
        expect(storeActions.some(action => action.type === 'COMMUNICATE_WITH_DEVICE'));
        done();
      });
  });

  it('makePayment should works well when pay by cc without device', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0],
      payment_type_id: 4
    }];
    const payOptionState = paymentOptionState.setIn(['data', 0, 'CCPaymentMethod'], CCPaymentMethods.NEW_CARD_WITH_DEVICE);
    store = mockStore(getDefaultState({
      payer: payerState,
      paymentOptions: {
        options: payOptionState,
        giftCard: giftCardState
      },
      payment: paymentState.set('isRefund', false),
      initialData: {
        ...initState,
        ccScanWithApdDevice: true
      },
      paymentAction: fromJS({
        isSelectModifyPaymentPlan: false,
        isSelectMakeAPayment: true
      })
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(6);
        expect(storeActions.some(action => action.type === 'CLEAR_ERROR'));
        expect(storeActions.some(action => action.type === 'SHOW_CC_MODAL_ACTION'));
        expect(storeActions.some(action => action.type === 'LOADING_BAR_SHOW'));
        expect(storeActions.some(action => action.type === 'LOCATION_REDIRECT'));
        done();
      });
  });

  it('makePayment should works well when cc paied success', (done) => {
    const { makePayment } = actions;
    const paymentInfos = [{
      ...paymentParams[0],
      disabled: true
    }];

    store = mockStore(getDefaultState({
      payer: payerState,
      paymentOptions: {
        options: paymentOptionState
      },
      payment: paymentState,
      initialData: {
        ...initState,
        ccScanWithApdDevice: true
      }
    }));

    store.dispatch(makePayment(paymentInfos))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(6);
        expect(storeActions.some(action => action.type === 'CLEAR_ERROR'));
        expect(storeActions.some(action => action.type === 'SHOW_CC_MODAL_ACTION'));
        expect(storeActions.some(action => action.type === 'SHOW_PAYMENT_ERRORS'));
        expect(storeActions.some(action => action.type === 'PAYMENT_OPTIONS_UPDATE_BY_KEY'));
        done();
      });
  });

  it('showErrors should works well', () => {
    const { showErrors, SHOW_PAYMENT_ERRORS } = actions;
    const errors = ['payment error 1', 'payment error 2'];

    store.dispatch(showErrors(errors));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(1);
    expect(dispatchedActions[0].type).toEqual(SHOW_PAYMENT_ERRORS);
    expect(dispatchedActions[0].payload).toEqual({
      errors
    });
  });

  it('clearErrors should works well', () => {
    const { clearErrors, CLEAR_PAYMENT_ERRORS } = actions;
    const optionIndex = 1;

    store.dispatch(clearErrors(optionIndex));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(1);
    expect(dispatchedActions[0].type).toEqual(CLEAR_PAYMENT_ERRORS);
    expect(dispatchedActions[0].payload).toEqual({
      optionIndex
    });
  });

  it('showECPAuthDetails should works well', () => {
    const { showECPAuthDetails, SHOW_ECP_AUTH_DETAILS } = actions;
    const ecpAuthDetails = {};

    store.dispatch(showECPAuthDetails(ecpAuthDetails));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(1);
    expect(dispatchedActions[0].type).toEqual(SHOW_ECP_AUTH_DETAILS);
    expect(dispatchedActions[0].payload).toEqual({
      ecpAuthDetails
    });
  });

  it('updatePayNowAmount should works well', () => {
    const { updatePayNowAmount, UPDATE_PAY_NOW_AMOUNT } = actions;
    const paynowAmount = 123;

    store.dispatch(updatePayNowAmount(paynowAmount));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(1);
    expect(dispatchedActions[0].type).toEqual(UPDATE_PAY_NOW_AMOUNT);
    expect(dispatchedActions[0].payload).toEqual({
      payNow: paynowAmount
    });
  });

  it('windowResize should works well', () => {
    const { windowResize, RESIZE } = actions;
    const height = 200;

    store.dispatch(windowResize(height));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions.length).toEqual(1);
    expect(dispatchedActions[0].type).toEqual(RESIZE);
    expect(dispatchedActions[0].payload).toEqual({
      height
    });
  });

  it('makePayment should works well', () => {
    jest.mock()
  });
});


