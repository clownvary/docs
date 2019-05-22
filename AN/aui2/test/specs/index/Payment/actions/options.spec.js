import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as optionsActions from 'index/Payment/actions/paymentOptions/options';
import { paymentTypes, resetTypes } from 'index/Payment/consts';
import { OVERRIDE_CC_EXPIRATION, CHANGE_PAYMENTPLAN_AMOUNT } from 'index/Payment/actions/paymentOptions/paymentPlan';
import { PAYMENT_CREDIT_CHANGE_RESET_STATUS } from 'index/Payment/actions/paymentOptions/credit';
import {
  FETCH_REFUND_ACCOUNT_CONFIG,
  FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS
} from 'index/Payment/actions/paymentOptions/account';
import {
  SHOW_PAYMENT_ERRORS,
  CHANGE_REMAINING,
  UPDATE_PAY_NOW_AMOUNT
} from 'index/Payment/actions';
import mockAPI from 'utils/mockAPI';

jest.mock('index/Payment/store', () => {
  const state = {
    payment: { get: jest.fn() },
    paymentOptions: {
      options: {
        toJS: jest.fn(() => ({ data: [] }))
      }
    }
  }

  return ({
    getState: jest.fn(() => state),
    dispatch: jest.fn()
  })
});

describe('index -> payment -> actions -> paymentOptions -> options', () => {
  let store = null;
  const data = [
    { activeVal: paymentTypes.CASH, list: [{ value: paymentTypes.CASH }] },
    { activeVal: paymentTypes.CHECK, list: [{ value: paymentTypes.CHECK }] },
    { activeVal: paymentTypes.CREDIT, list: [{ value: paymentTypes.CREDIT }] },
    { activeVal: paymentTypes.CREDITCARD, list: [{ value: paymentTypes.CREDITCARD }] },
    { activeVal: paymentTypes.ELECTRONICCHECK, list: [{ value: paymentTypes.ELECTRONICCHECK }] },
    { activeVal: paymentTypes.GIFTCARD, list: [{ value: paymentTypes.GIFTCARD }] },
    { activeVal: paymentTypes.REFUND_ACCOUNT, list: [{ value: paymentTypes.REFUND_ACCOUNT }] }
  ];
  const initialData = {
    permitID: 12,
    batchID: 0,
    receiptID: 1222
  };
  const storeData = {
    paymentOptions: {
      options: fromJS({
        data,
        reset: {
          type: resetTypes.NONE,
          context: {}
        }
      }),
      paymentPlan: fromJS({
        overrideCcExpBeforePpLast: true
      }),
    },
    payment: fromJS({
      isPaymentActionValid: true
    }),
    payer: fromJS({}),
    paymentAction: fromJS({}),
    paymentSummary: fromJS({}),
    initialData
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(storeData);
  });

  afterEach(() => store.clearActions());

  const mockOption = {
    amount: 100,
    formatCashAmount: 100,
    formatCheckAmount: 100,
    formatCreditAmount: 100,
    formatCreditCardAmount: 100,
    formatECheckAmount: 100,
    formatGiftCardAmount: 100,
    formatAccountAmount: 100,
  };
  const mockOptions = fromJS([
    mockOption, mockOption, mockOption, mockOption, mockOption, mockOption, mockOption
  ]);

  it('updatePaymentOptionByKeyAction should work fine', (done) => {
    const { updatePaymentOptionByKeyAction } = optionsActions;

    const data = { index: 1, key: 'amount', value: 80 };
    store.dispatch(updatePaymentOptionByKeyAction(data.index, data.key, data.value));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(1);

    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual(data);

    done();
  });

  it('updatePaymentOptionAction should work fine', (done) => {
    const { updatePaymentOptionAction } = optionsActions;

    const func = opts => opts;
    store.dispatch(updatePaymentOptionAction(func));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(1);

    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(myActions[0].payload).toEqual({ funcUpdate: func });

    done();
  });

  it('addPaymentOptionAction method should work fine', () => {
    const { addPaymentOptionAction, PAYMENT_OPTIONS_UPDATE } = optionsActions;
    store.dispatch(addPaymentOptionAction({}));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    storeActions[0].payload.funcUpdate([]);
  });

  it('resetAvailableSplitIdsAction method should work fine', () => {
    const { resetAvailableSplitIdsAction, PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS } = optionsActions;
    store.dispatch(resetAvailableSplitIdsAction());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
  });

  it('deletePaymentOptionAction method should work fine', () => {
    const {
      deletePaymentOptionAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS,
      PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG
    } = optionsActions;
    store.dispatch(deletePaymentOptionAction());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG)).toBeTruthy();
    storeActions[0].payload.funcUpdate([]);
  });

  it('splitPaymentAction method should work fine', () => {
    const {
      splitPaymentAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    store.dispatch(splitPaymentAction(200));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
  });

  it('changePaymentAction method should work fine if change to CASH', () => {
    const index = 0;
    const {
      changePaymentAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    store.dispatch(changePaymentAction({ newPaymentType: paymentTypes.CASH, index }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();

    const funcUpdate = storeActions[0].payload.funcUpdate;
    const updatedOption = funcUpdate(mockOptions);
    expect(updatedOption.get(index).toJS()).toMatchObject({
      cashAmountPaid: 100,
      cashChange: '0.00',
      formatCashAmount: 100
    });
  });

  it('changePaymentAction method should work fine if change to CHECK', () => {
    const index = 1;
    const {
      changePaymentAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    store.dispatch(changePaymentAction({ newPaymentType: paymentTypes.CHECK, index }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();

    const funcUpdate = storeActions[0].payload.funcUpdate;
    const updatedOption = funcUpdate(mockOptions);
    expect(updatedOption.get(index).toJS()).toMatchObject({ formatCheckAmount: 100 });
  });

  it('changePaymentAction method should work fine if change to CREDIT', () => {
    const index = 2;
    const {
      changePaymentAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    store.dispatch(changePaymentAction({ newPaymentType: paymentTypes.CREDIT, index }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();

    const funcUpdate = storeActions[0].payload.funcUpdate;
    const updatedOption = funcUpdate(mockOptions);
    expect(updatedOption.get(index).toJS()).toMatchObject({ formatCreditAmount: 100 });
  });

  it('changePaymentAction method should work fine if change to CREDITCARD', () => {
    const index = 3;
    const {
      changePaymentAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    store.dispatch(changePaymentAction({ newPaymentType: paymentTypes.CREDITCARD, index }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();

    const funcUpdate = storeActions[0].payload.funcUpdate;
    const updatedOption = funcUpdate(mockOptions);
    expect(updatedOption.get(index).toJS()).toMatchObject({ formatCreditCardAmount: 100 });
  });

  it('changePaymentAction method should work fine if change to ELECTRONICCHECK', () => {
    const index = 4;
    const {
      changePaymentAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    store.dispatch(changePaymentAction({ newPaymentType: paymentTypes.ELECTRONICCHECK, index }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();

    const funcUpdate = storeActions[0].payload.funcUpdate;
    const updatedOption = funcUpdate(mockOptions);
    expect(updatedOption.get(index).toJS()).toMatchObject({ formatECheckAmount: 100 });
  });

  it('changePaymentAction method should work fine if change to GIFTCARD', () => {
    const index = 5;
    const {
      changePaymentAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    store.dispatch(changePaymentAction({ newPaymentType: paymentTypes.GIFTCARD, index }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();

    const funcUpdate = storeActions[0].payload.funcUpdate;
    const updatedOption = funcUpdate(mockOptions);
    expect(updatedOption.get(index).toJS()).toMatchObject({ formatGiftCardAmount: 100 });
  });

  it('changePaymentAction method should work fine if change to REFUND_ACCOUNT', () => {
    const index = 6;
    const {
      changePaymentAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    store.dispatch(changePaymentAction({ newPaymentType: paymentTypes.REFUND_ACCOUNT, index }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();

    const funcUpdate = storeActions[0].payload.funcUpdate;
    const updatedOption = funcUpdate(mockOptions);
    expect(updatedOption.get(index).toJS()).toMatchObject({ formatAccountAmount: 100 });
  });

  it('resetPaymentOptionAction method should work fine', () => {
    const {
      resetPaymentOptionAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    store.dispatch(resetPaymentOptionAction());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === OVERRIDE_CC_EXPIRATION)).toBeTruthy()
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy()
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy()
    expect(storeActions.some(action => action.type === PAYMENT_CREDIT_CHANGE_RESET_STATUS)).toBeTruthy()
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy()
    expect(storeActions.some(action => action.type === CHANGE_REMAINING)).toBeTruthy()
  });

  it('updatePaymentDeleteFlagAction method should work fine', () => {
    const {
      updatePaymentDeleteFlagAction,
      PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG
    } = optionsActions;
    store.dispatch(updatePaymentDeleteFlagAction(true));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG)).toBeTruthy()
  });

  it('resetPaymentDeleteFlagAction method should work fine', () => {
    const {
      resetPaymentDeleteFlagAction,
      PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG
    } = optionsActions;
    store.dispatch(resetPaymentDeleteFlagAction());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG)).toBeTruthy()
  });

  it('changePaymentOptionsAction method should work fine', () => {
    const {
      changePaymentOptionsAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    const callback = jest.fn();
    return store.dispatch(changePaymentOptionsAction(callback)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === OVERRIDE_CC_EXPIRATION)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_CREDIT_CHANGE_RESET_STATUS)).toBeTruthy();
      expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
      expect(storeActions.some(action => action.type === CHANGE_REMAINING)).toBeTruthy();
      expect(callback).toHaveBeenCalled();
    });
  });

  it('fetchAndResetRefundOptionAction method should work fine', () => {
    const {
      fetchAndResetRefundOptionAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    return store.dispatch(fetchAndResetRefundOptionAction()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === OVERRIDE_CC_EXPIRATION)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_CREDIT_CHANGE_RESET_STATUS)).toBeTruthy();
      expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
      expect(storeActions.some(action => action.type === CHANGE_REMAINING)).toBeTruthy();
      expect(storeActions.some(action => action.type === FETCH_REFUND_ACCOUNT_CONFIG)).toBeTruthy();
      expect(storeActions.some(action => action.type === FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS)).toBeTruthy();
    });
  });

  it('fetchAndResetRefundOptionAction method should work fine, if no valid option', () => {
    mockAPI({
      path: '/json/Payment/refundOptions.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful"
        },
        "body": {
          "refund_options": []
        }
      }
    });
    const {
      fetchAndResetRefundOptionAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;

    return store.dispatch(fetchAndResetRefundOptionAction()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === OVERRIDE_CC_EXPIRATION)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_CREDIT_CHANGE_RESET_STATUS)).toBeTruthy();
      expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
      expect(storeActions.some(action => action.type === CHANGE_REMAINING)).toBeTruthy();
    });
  });

  it('showOptionErrorsAction method should work fine', () => {
    const {
      showOptionErrorsAction,
      PAYMENT_OPTIONS_UPDATE_BY_KEY
    } = optionsActions;
    store.dispatch(showOptionErrorsAction(0, []));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('clearOptionErrorAction method should work fine', () => {
    const {
      clearOptionErrorAction,
      PAYMENT_OPTIONS_UPDATE_BY_KEY
    } = optionsActions;
    store.dispatch(clearOptionErrorAction(0));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('changePayNowAmountAction method should work fine', () => {
    jest.useFakeTimers();
    const {
      changePayNowAmountAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;

    const mockStore = configureStore(middlewares);

    store.dispatch(changePayNowAmountAction(100));
    jest.runAllTimers();

    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === OVERRIDE_CC_EXPIRATION)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_CREDIT_CHANGE_RESET_STATUS)).toBeTruthy();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === UPDATE_PAY_NOW_AMOUNT)).toBeTruthy();
    expect(storeActions.some(action => action.type === CHANGE_REMAINING)).toBeTruthy();


    store = mockStore({
      ...storeData,
      payment: fromJS({
        isRefund: true,
        isPaymentActionValid: true

      })
    })
    store.dispatch(changePayNowAmountAction(100));
    jest.runAllTimers();
    expect(storeActions.some(action => action.type === OVERRIDE_CC_EXPIRATION)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_CREDIT_CHANGE_RESET_STATUS)).toBeTruthy();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === UPDATE_PAY_NOW_AMOUNT)).toBeTruthy();
    expect(storeActions.some(action => action.type === CHANGE_REMAINING)).toBeTruthy();

    jest.clearAllTimers();
  });

  it('changePayNowAmountAction method should work fine in different condition(is true)', () => {
    jest.useFakeTimers();
    const {
      changePayNowAmountAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    const newState = store.getState();
    newState.payment = newState.payment.set('isPaymentActionValid', false);
    newState.paymentAction = newState.paymentAction.set('isSelectModifyPaymentPlan', true);
    const newStore = configureStore(middlewares)(newState);

    newStore.dispatch(changePayNowAmountAction(0));
    jest.runAllTimers();

    const storeActions = newStore.getActions();
    expect(storeActions.some(action => action.type === OVERRIDE_CC_EXPIRATION)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_CREDIT_CHANGE_RESET_STATUS)).toBeTruthy();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === CHANGE_REMAINING)).toBeTruthy();
    expect(storeActions.some(action => action.type === CHANGE_PAYMENTPLAN_AMOUNT)).toBeTruthy();

    jest.clearAllTimers();
  });

  it('changePayNowAmountAction method should work fine in different condition(isSelectModifyPaymentPlan is false)', () => {
    jest.useFakeTimers();
    const {
      changePayNowAmountAction,
      PAYMENT_OPTIONS_UPDATE,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;
    const newState = store.getState();
    newState.payment = newState.payment.set('isPaymentActionValid', false);
    newState.paymentAction = newState.paymentAction.set('isSelectModifyPaymentPlan', false);
    const newStore = configureStore(middlewares)(newState);

    newStore.dispatch(changePayNowAmountAction(0));
    jest.runAllTimers();

    const storeActions = newStore.getActions();
    expect(storeActions.some(action => action.type === OVERRIDE_CC_EXPIRATION)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_CREDIT_CHANGE_RESET_STATUS)).toBeTruthy();
    expect(storeActions.some(action => action.type === SHOW_PAYMENT_ERRORS)).toBeTruthy();
    expect(storeActions.some(action => action.type === CHANGE_REMAINING)).toBeTruthy();
    expect(storeActions.some(action => action.type === CHANGE_PAYMENTPLAN_AMOUNT)).toBeTruthy();

    jest.clearAllTimers();
  });

  it('reset actions should work fine', () => {
    const {
      catchResetAction,
      releaseResetAction,
      cleanResetAction,
      PAYMENT_OPTIONS_SET_RESET,
      PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS
    } = optionsActions;

    store.dispatch(catchResetAction(resetTypes.INIT, { defaultAmount: 1, isManuallySplit: false }))
    expect(store.getActions().some(action => action.type === PAYMENT_OPTIONS_SET_RESET)).toBeTruthy();


    const mockStore = configureStore(middlewares);
    store = mockStore({
      ...storeData,
      paymentOptions: {
        options: fromJS({
          reset: {
            type: resetTypes.INIT,
            context: {
              defaultAmount: 100,
              isManuallySplit: true
            }
          }
        })
      }
    });

    store.dispatch(releaseResetAction())
    expect(store.getActions().some(action => action.type === CHANGE_REMAINING)).toBeTruthy();
    store.clearActions();

    store = mockStore({
      ...storeData,
      paymentOptions: {
        options: fromJS({
          reset: {
            type: resetTypes.CHANGE_AMOUNT,
            context: { defaultAmount: 100 }
          }
        })
      }
    });
    store.dispatch(releaseResetAction())
    expect(store.getActions().some(action => action.type === CHANGE_REMAINING)).toBeFalsy();
    expect(store.getActions().some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
    store.clearActions();


    store = mockStore({
      ...storeData,
      paymentOptions: {
        options: fromJS({
          reset: {
            type: resetTypes.CHANGE_PAYER,
            context: { total: 100 }
          }
        })
      }
    });
    store.dispatch(releaseResetAction())
    expect(store.getActions().some(action => action.type === CHANGE_REMAINING)).toBeTruthy();
    expect(store.getActions().some(action => action.type === PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS)).toBeTruthy();
    store.clearActions();

    store = mockStore({
      ...storeData,
      paymentOptions: {
        options: fromJS({
          reset: {
            type: resetTypes.NONE,
            context: { }
          }
        })
      }
    });
    store.dispatch(releaseResetAction())
    expect(store.getActions().length).toBe(1);
  })
});
