import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import mockAPI from 'utils/mockAPI';
import { newOptions, paymentTypes, paymentPlanPaymentTypes as ppPaymentTypes, CCPaymentMethods } from 'index/Payment/consts';
import { SHOW_PAYMENT_ERRORS, SHOW_ECP_AUTH_DETAILS } from 'index/Payment/actions';
import { PAYMENT_OPTIONS_UPDATE_BY_KEY } from 'index/Payment/actions/paymentOptions/options';
import {
  PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN,
  PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_SUCCESS
} from 'index/Payment/consts/actionTypes'
import { CLEAR_ERROR } from 'shared/actions/Error';
import * as actions from 'index/Payment/actions/paymentFooter';
import * as paymentPlanActions from 'index/Payment/actions/paymentOptions/paymentPlan';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index/Payment/actions/paymentFooter', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const initialData = {
    receiptEntryID: -1,
    draftReceiptID: -1,
    draftReceiptEntryID: -1,
    ccScanWithApdDevice: false,
    ccScanWithMagesafeDevice: true,
    apdInputType: 1,
    permitID: -1
  };
  const initState = () => ({
    paymentOptions: {
      options: fromJS({
        data: [
          {
            activeVal: paymentTypes.CHECK,
            list: [
              { value: paymentTypes.CHECK }
            ],
            amount: 100
          },
          {
            activeVal: paymentTypes.CREDITCARD,
            creditCardListDropDownValue: '',
            amount: 100
          },
          {
            activeVal: paymentTypes.REFUND_CREDITCARD,
            creditCardListDropDownValue: '',
            amount: 100
          },
          {
            activeVal: paymentTypes.ELECTRONICCHECK,
            eCheckListDropDownValue: newOptions.NEW_OPTION_VALUE,
            amount: 100,
          },
          {
            activeVal: paymentTypes.GIFTCARD,
            giftCardId: '',
            amount: 100,
          },
          {
            activeVal: paymentTypes.REFUND_GIFTCARD,
            giftCardId: '',
            amount: 100,
          },
          {
            activeVal: paymentTypes.PAYMENTPLAN,
            autoPaymentTypes: {
              selected: ppPaymentTypes.ELECTRONICCHECK
            },
            showAutoPaymentMethod: true,
            amount: 100,
            paymentSchedules: [{
              dueDate: '2017-12-01'
            }],
            reservationPPs: {
              selected: 661
            }
          },
          {
            activeVal: paymentTypes.CASH,
            amount: 100
          },
          {
            activeVal: paymentTypes.DEBITCARD,
            amount: 100
          },
          {
            activeVal: paymentTypes.REFUND_DEBITCARD,
            amount: 100
          },
          {
            activeVal: paymentTypes.REFUND_ACCOUNT,
            amount: 100
          },
          {
            activeVal: 'invalid option',
            amount: 100
          }
        ]
      }),
      account: {
        requestRefund: false,
        reasons: {}
      },
      eCheck: {
        eCheckListDropDown: {
          data: [{
            echeck_id: 321,
            eft_account_number: 321
          }]
        },
        eCheckConfig: {}
      },
      creditCard: {},
      giftCard: {
        giftCardLabel: 'giftcardx',
        giftCardDropDown: {
          data: [{
            value: 401
          }]
        },
        newGiftCardDropDown: {
          data: [{
            value: 441
          }]
        }
      },
      paymentPlan: {
        ppAutoCCList: {
          selected: 567,
          data: [
            {
              value: 567,
              card_expiration: '11/2017'
            }
          ]
        },
        ppAutoEcpList: {
          selected: -1,
          data: [{
            value: 661
          }]
        }
      }
    },
    payment: fromJS({
      errors: [],
      permitID: 332,
      receiptID: 1,
      batchID: 1
    }),
    payer: fromJS({}),
    paymentAction: fromJS({}),
    initialData: {
      ...initialData
    },
    paymentModals: {
      newCreditCard: fromJS({})
    }
  });

  afterEach(() => {
    store.clearActions();
  });

  it('pay method should work fine if error happens', () => {
    const { pay } = actions;
    store = mockStore(initState());
    store.dispatch(pay(new Date(2017, 5, 5)));

    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('pay method should work fine if account refund reason length more than 300', () => {
    const { pay } = actions;
    const state = initState();
    store = mockStore({
      ...state,
      paymentOptions: {
        options: fromJS({
          data: [
            {
              activeVal: paymentTypes.REFUND_ACCOUNT,
              amount: 100
            }
          ]
        }),
        account: {
          requestRefund: true,
          reasons: {
            otherReason: 'test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. test 100 characters for error validation. '
          }
        },
        eCheck: state.paymentOptions.eCheck,
        creditCard: state.paymentOptions.creditCard,
        giftCard: state.paymentOptions.giftCard,
        paymentPlan: state.paymentOptions.paymentPlan
      }
    });
    store.dispatch(pay(new Date(2017, 5, 5)));

    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions[0].payload).toEqual({
      errors: [
        {
          key: 0,
          name: 'refundAcountReason',
          message: 'Maximum 300 characters can be entered for Refund Reason.'
        }
      ]
    })
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('pay method should work fine if account refund reason length less than 300', () => {
    const { pay } = actions;
    const state = initState();
    store = mockStore({
      ...state,
      paymentOptions: {
        options: fromJS({
          data: [
            {
              activeVal: paymentTypes.REFUND_ACCOUNT,
              amount: 100
            }
          ]
        }),
        account: {
          requestRefund: true,
          reasons: {}
        },
        eCheck: state.paymentOptions.eCheck,
        creditCard: state.paymentOptions.creditCard,
        giftCard: state.paymentOptions.giftCard,
        paymentPlan: state.paymentOptions.paymentPlan
      }
    });
    store.dispatch(pay(new Date(2017, 5, 5)));

    const storeActions = store.getActions();
    expect(storeActions.length).toBe(1);
    expect(storeActions[0].type).toEqual('CLEAR_ERROR');
  });

  it('pay method should work fine if only payment plan credit card expired error happens', () => {
    const { pay } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-12-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    store = mockStore(state);
    store.dispatch(pay(new Date(2017, 5, 5)));

    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });
  it('pay method should work fine if the expiration of auto payment plan cc is in the past', () => {
    const { pay } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-12-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    store = mockStore(state);
    store.dispatch(pay());

    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('pay method should work fine if no error happens after update the wrong final schedule.', () => {
    const { pay } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options
      .setIn(['data', 0, 'checkNumber'], 112)
      .setIn(['data', 1, 'creditCardListDropDownValue'], 271)
      .setIn(['data', 2, 'creditCardListDropDownValue'], 271)
      .setIn(['data', 2, 'CCPaymentMethod'], CCPaymentMethods.NEW_CARD_WITH_DEVICE)
      .setIn(['data', 3, 'eCheckListDropDownValue'], 321)
      .setIn(['data', 4, 'giftCardId'], 441)
      .setIn(['data', 5, 'giftCardId'], 401)
      .setIn(['data', 12], {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      });
    state.paymentOptions.paymentPlan.ppAutoEcpList.selected = 661;
    state.payment = state.payment.set('errors', fromJS([{
      key: 0,
      name: 'unknown',
      paymentTypeId: 8,
      message: 'Credit card expires before date of final scheduled charge,Click the Pay button again if you want to proceed using the specified date.'
    }]));
    state.initialData = {
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    }

    store = mockStore(state);
    store.dispatch(pay(new Date(2017, 5, 5)));

    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === CLEAR_ERROR)).toBeTruthy();
  });

  it('pay method should work fine if no error happens after update the empty check number.', () => {
    const { pay } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options
      .setIn(['data', 0, 'checkNumber'], 112)
      .setIn(['data', 1, 'creditCardListDropDownValue'], 271)
      .setIn(['data', 2, 'creditCardListDropDownValue'], 271)
      .setIn(['data', 2, 'CCPaymentMethod'], CCPaymentMethods.NEW_CARD_WITH_DEVICE)
      .setIn(['data', 3, 'eCheckListDropDownValue'], 321)
      .setIn(['data', 4, 'giftCardId'], 441)
      .setIn(['data', 5, 'giftCardId'], 401)
      .setIn(['data', 12], {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      });
    state.paymentOptions.paymentPlan.ppAutoEcpList.selected = 661;
    state.payment = state.payment.set('errors', fromJS([{
      key: 0,
      name: 'checkNumber',
      paymentTypeId: paymentTypes.CHECK,
      message: 'Please enter a Check Number.'
    }]));
    state.initialData = {
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    }

    store = mockStore(state);
    store.dispatch(pay(new Date(2017, 5, 5)));

    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === CLEAR_ERROR)).toBeTruthy();
  });

  it('pay method should work fine if no error happens and pay with apd device', () => {
    const { pay } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options
      .setIn(['data', 0, 'checkNumber'], 112)
      .setIn(['data', 1, 'creditCardListDropDownValue'], 271)
      .setIn(['data', 2, 'creditCardListDropDownValue'], 271)
      .setIn(['data', 2, 'CCPaymentMethod'], CCPaymentMethods.NEW_CARD_WITH_DEVICE)
      .setIn(['data', 3, 'eCheckListDropDownValue'], 321)
      .setIn(['data', 4, 'giftCardId'], 441)
      .setIn(['data', 5, 'giftCardId'], 401)
      .setIn(['data', 12], {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      });
    state.paymentOptions.paymentPlan.ppAutoEcpList.selected = 661;
    state.initialData.ccScanWithApdDevice = true;

    store = mockStore(state);
    store.dispatch(pay(new Date(2017, 5, 5)));

    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === CLEAR_ERROR)).toBeTruthy();
    expect(storeActions.some(action => action.type === 'SHOW_MODAL')).toBeTruthy();
  });

  it('pay method should work fine if show ecp agreement and no error happens', () => {
    const { pay } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.ELECTRONICCHECK,
        eCheckListDropDownValue: 321,
        amount: 100,
      }
    ]);
    state.paymentOptions.paymentPlan.ppAutoEcpList.selected = 661;
    state.paymentOptions.eCheck.eCheckConfig.show_ach_agreement_for_ecp = true;
    state.payment = state.payment.set('errors', fromJS([{
      key: 0,
      name: 'unknown',
      message: 'mock error'
    }]));

    store = mockStore(state);
    store.dispatch(pay(new Date(2017, 5, 5)));

    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === SHOW_ECP_AUTH_DETAILS)).toBeTruthy();
  });

  it('requestSaveModifiedPaymentPlan method should work fine', () => {
    const { requestSaveModifiedPaymentPlan } = actions;
    const store = mockStore(initState());
    return store.dispatch(requestSaveModifiedPaymentPlan({}, {
      permitID: 332,
      receiptID: 1,
      batchID: 1
    })).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_SUCCESS)).toBeTruthy();
    });
  });

  it('saveModifiedPaymentPlan method should work fine if error happens', () => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();
    const store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('saveModifiedPaymentPlan method should work fine if only credit card expired error happens', () => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-12-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    const store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('saveModifiedPaymentPlan method should work fine if has server error when use device for auto CC.', () => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    state.payment = state.payment.set('errors', fromJS([{
      key: 0,
      name: 'unknown',
      message: 'mock error'
    }]));
    const store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN)).toBeTruthy();
  });


  it('saveModifiedPaymentPlan method should work fine if has server error when use PCI for auto CC.', () => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    state.payment = state.payment.set('errors', fromJS([{
      key: 0,
      name: 'unknown',
      message: 'mock error',
      paymentTypeId: 8
    }]));
    state.initialData = {
      ...state.initialData,
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    }

    store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)));
    const storeActions = store.getActions();
    expect(storeActions.length).toBe(2);
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
  });

  it('saveModifiedPaymentPlan method should work fine if has server expire error when use PCI for auto CC.', () => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    state.payment = state.payment.set('errors', fromJS([{
      key: 0,
      name: 'unknown',
      message: 'Credit card expires before date of final scheduled charge,Click the Pay button again if you want to proceed using the specified date.',
      paymentTypeId: 8
    }]));
    state.initialData = {
      ...state.initialData,
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    }

    store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)));
    const storeActions = store.getActions();
    expect(storeActions.length).toBe(2);
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
  });

  it('saveModifiedPaymentPlan method should work fine if no error happens with CC PCI for auto payment', (done) => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();

    paymentPlanActions.submitPPPaymentIframeAsyncAction = jest.fn()
      .mockReturnValue(Promise.resolve({ sessionId: 'sessionId' }))

    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    state.initialData = {
      ...state.initialData,
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    };
    store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(4);
        expect(storeActions.some(action => action.type === 'Payment/PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'Payment/PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'LOCATION_REDIRECT')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'LOADING_BAR_SHOW')).toBeTruthy();
        done()
      })
  });


  it('saveModifiedPaymentPlan method should work fine if CC PCI for auto payment and server validate the expire date err in success response', (done) => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();

    mockAPI({
      path: '/json/Payment/saveModifiedPaymentPlan.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful"
        },
        "body": {
          "result": {
            "receipt_header_id" : 1234,
            "payment_errors": [
            {
              "payment_type_id": 8,
              "error_message": "Credit card expires before date of final scheduled charge,Click the Pay button again if you want to proceed using the specified date."
            }]
          }
        }
      }
    });

    paymentPlanActions.submitPPPaymentIframeAsyncAction = jest.fn()
      .mockReturnValue(Promise.resolve({ sessionId: 'sessionId' }))

    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    state.initialData = {
      ...state.initialData,
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    }
    store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(4);

        expect(storeActions.some(action => action.type === 'Payment/PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'Payment/PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'SHOW_PAYMENT_ERRORS')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'PAYMENT_OPTIONS_UPDATE_BY_KEY')).toBeTruthy();
        done()
      })
  });


  it('saveModifiedPaymentPlan method should work fine if CC PCI for auto payment and server validate the expire date err in 9008 response_code', (done) => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();

    mockAPI({
      path: '/json/Payment/saveModifiedPaymentPlan.json',
      result: {
        "headers": {
          "response_code": "9008",
          "response_message": "Credit card expires before date of final scheduled charge,Click the Pay button again if you want to proceed using the specified date."
        },
        "body": {
          "result": {}
        }
      }
    });

    paymentPlanActions.submitPPPaymentIframeAsyncAction = jest.fn()
      .mockReturnValue(Promise.resolve({ sessionId: 'sessionId' }))

    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    state.initialData = {
      ...state.initialData,
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    }
    store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(4);

        expect(storeActions.some(action => action.type === 'Payment/PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'OVERRIDE_CC_EXPIRATION')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'ADD_ERROR')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'Payment/PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_FAILURE')).toBeTruthy();
        done()
      })
  });


  it('saveModifiedPaymentPlan method should work fine if CC PCI for auto payment and server err in 9008 response_code', (done) => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();

    mockAPI({
      path: '/json/Payment/saveModifiedPaymentPlan.json',
      result: {
        "headers": {
          "response_code": "9008",
          "response_message": "Other error."
        },
        "body": {
          "result": {}
        }
      }
    });

    paymentPlanActions.submitPPPaymentIframeAsyncAction = jest.fn()
      .mockReturnValue(Promise.resolve({ sessionId: 'sessionId' }))

    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    state.initialData = {
      ...state.initialData,
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    }
    store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBeGreaterThanOrEqual(4);

        expect(storeActions.some(action => action.type === 'Payment/PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'OVERRIDE_CC_EXPIRATION')).toBeFalsy();
        expect(storeActions.some(action => action.type === 'ADD_ERROR')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'Payment/PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_FAILURE')).toBeTruthy();
        done()
      })
  });

  it('saveModifiedPaymentPlan method should work fine if CC PCI error for auto payment', (done) => {
    const { saveModifiedPaymentPlan } = actions;
    const state = initState();
    state.paymentOptions.options = state.paymentOptions.options.set('data', [
      {
        activeVal: paymentTypes.PAYMENTPLAN,
        autoPaymentTypes: {
          selected: ppPaymentTypes.CREDITCARD
        },
        showAutoPaymentMethod: true,
        amount: 100,
        paymentSchedules: [{
          dueDate: '2017-09-01'
        }],
        reservationPPs: {},
        frequecys: {},
        numOfPayments: {}
      }
    ]);
    state.initialData = {
      ...state.initialData,
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    }
    paymentPlanActions.submitPPPaymentIframeAsyncAction = jest.fn()
      .mockReturnValue(Promise.reject('Submit PCI fail.'))

    store = mockStore(state);
    store.dispatch(saveModifiedPaymentPlan(new Date(2017, 5, 5)))
      .catch((err) => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBe(2);
        expect(err).toEqual('Submit PCI fail.');
        done()
      })
  });
});
