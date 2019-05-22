import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import  mockAPI from 'utils/mockAPI';
import { ADD_ERROR } from 'shared/actions/Error';
import * as actions from 'index/Payment/components/Modals/PinPad/actions/pinpadFail';

describe('index -> Payment -> components -> Modals -> PinPad -> actions -> pinpadFail', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('showFailActionBtns should works well', () => {
    const { SHOW_OR_HIDE_FAIL_ACTIONS_BTNS, showFailActionBtns } = actions;
    const param = false;
    let action = null;

    store.dispatch(showFailActionBtns(param));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(SHOW_OR_HIDE_FAIL_ACTIONS_BTNS);
    expect(action.payload).toEqual({
      shown: param
    });
  });

  it('cancelCardPayment should works well', (done) => {
    const { cancelCardPayment, CANCEL_CARD_PAYMENT, CANCEL_CARD_PAYMENT_SUCCESS } = actions;
    const params = {
      batchId: -1,
      receiptId: -1
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    store.dispatch(cancelCardPayment(params, successCallback, errorCallback))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(3);
        expect(myActions[0].type).toBe(CANCEL_CARD_PAYMENT);
        expect(myActions[1].type).toBe(CANCEL_CARD_PAYMENT_SUCCESS);
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(errorCallback).not.toHaveBeenCalled();
        done();
      })
  });

  it('cancelCardPayment should works well after request API failed.', (done) => {
    const { cancelCardPayment, CANCEL_CARD_PAYMENT, CANCEL_CARD_PAYMENT_FAILURE } = actions;
    const params = {
      batchId: -1,
      receiptId: -1
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    mockAPI({
      path: '/json/Payment/cancelCardPayment.json',
      result: {
        "headers": {
          "response_code": "1100",
          "response_message": "error"
        },
        "body": {}
      }
    });

    return store.dispatch(cancelCardPayment(params, successCallback, errorCallback))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(2);
        expect(myActions[0].type).toBe(CANCEL_CARD_PAYMENT);
        expect(myActions[1].type).toBe(CANCEL_CARD_PAYMENT_FAILURE);
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(successCallback).not.toHaveBeenCalled();
        done();
      })
  });

  it('cardLeaveBlance should works well', (done) => {
    const { cardLeaveBlance, LEAVE_BALANCE, LEAVE_BALANCE_SUCCESS } = actions;
    const params = {
      batchId: -1,
      receiptId: -1
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    store.dispatch(cardLeaveBlance(params, successCallback, errorCallback))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(2);
        expect(myActions[0].type).toBe(LEAVE_BALANCE);
        expect(myActions[1].type).toBe(LEAVE_BALANCE_SUCCESS);
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(errorCallback).not.toHaveBeenCalled();
        done();
      })
  });

  it('cardLeaveBlance should works well after request API failed.', (done) => {
    const { cardLeaveBlance, LEAVE_BALANCE, LEAVE_BALANCE_FAILURE } = actions;
    const params = {
      batchId: -1,
      receiptId: -1
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    mockAPI({
      path: '/json/Payment/cardleavebalance.json',
      result: {
        "headers": {
          "response_code": "1100",
          "response_message": "error"
        },
        "body": {}
      }
    });

    store.dispatch(cardLeaveBlance(params, successCallback, errorCallback))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(2);
        expect(myActions[0].type).toBe(LEAVE_BALANCE);
        expect(myActions[1].type).toBe(LEAVE_BALANCE_FAILURE);
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(successCallback).not.toHaveBeenCalled();
        done();
      })
  });
});

