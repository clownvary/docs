import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import  mockAPI from 'utils/mockAPI';
import * as actions from 'index/Payment/components/Modals/PinPad/actions/pinpad';
import * as pinpadModalActions from 'index/Payment/components/Modals/PinPad/actions/pinpadModal';
import * as pinpadFailActions from 'index/Payment/components/Modals/PinPad/actions/pinpadFail';
import jsonAccountHolder from 'json/Payment/accountholder.json';
import { mockState } from '../mockData';
import { ADD_ERROR } from 'shared/actions/Error';

const data = {
  receiptHeaderId: -1,
  isRefund: false,
  debitCardId: 4,
  batchID: -1,
  receiptID: -1,
  companyId: 0,
  agentId: -1,
  customerId: -1,
  pays: [{
    amout: '12.12',
    paymentTypeId: 3,
    payName: 'Credit Card',
    index: 0
  }],
  promptMessage: '',
  errorMessage: '',
  communicating: false,
  apdAppletInfo: null,
  apdPaymentInfo: null,
  cardHolderInfo: '',
  currentPayIndex: 0
};

describe('index -> Payment -> components -> Modals -> PinPad -> actions -> pinpad', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  beforeEach(() => {
    store = mockStore({
      paymentModals: {
        pinpad: {
          payment: fromJS(data),
          pinpadModal: fromJS({
            shown: false
          }),
          pinpadFail: fromJS({
            shown: false
          })
        },
        newCreditCard: fromJS({
          cardTypeList: mockState.cardTypeList
        })
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('initDataOfPinpad should works well', () => {
    const { INIT_DATA_OF_PINPAD, initDataOfPinpad } = actions;
    let action = null;

    store.dispatch(initDataOfPinpad(data));
    action = store.getActions()[0];

    expect(typeof action).toBe('object');
    expect(action.type).toBe(INIT_DATA_OF_PINPAD);
    expect(action.payload.data).toEqual(data);
  });

  it('getAPDInformation should works well', (done) => {
    const { getAPDInformation, GET_APD_INFORMATION, GET_APD_INFORMATION_SUCCESS } = actions;

    store.dispatch(getAPDInformation())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(3);
        expect(myActions[0].type).toBe(GET_APD_INFORMATION);
        expect(myActions[2].type).toBe(GET_APD_INFORMATION_SUCCESS);
        done();
      })
  });

  it('getAPDServerStatus should works well', (done) => {
    const { getAPDServerStatus, GET_APD_SERVER_STATUS, GET_APD_SERVER_STATUS_SUCCESS } = actions;
    const params = {
      batchId: -1,
      receiptId: -1
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    store.dispatch(getAPDServerStatus(params, successCallback, errorCallback))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(2);
        expect(myActions[0].type).toBe(GET_APD_SERVER_STATUS);
        expect(myActions[1].type).toBe(GET_APD_SERVER_STATUS_SUCCESS);
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(errorCallback).not.toHaveBeenCalled();
        done();
      })
  });

  it('getAPDServerStatus should works well after request API failed.', (done) => {
    const { getAPDServerStatus, GET_APD_SERVER_STATUS, GET_APD_SERVER_STATUS_FAILURE } = actions;
    const params = {
      batchId: -1,
      receiptId: -1
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    mockAPI({
      path: '/json/Payment/getAPDServerStatus.json',
      result: {
        "headers": {
          "response_code": "0002",
          "response_message": "session timeout"
        },
        "body": {}
      }
    });

    store.dispatch(getAPDServerStatus(params, successCallback, errorCallback))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(3);
        expect(myActions[0].type).toBe(GET_APD_SERVER_STATUS);
        expect(myActions[1].type).toBe(ADD_ERROR);
        expect(myActions[2].type).toBe(GET_APD_SERVER_STATUS_FAILURE);
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(successCallback).not.toHaveBeenCalled();
        done();
      })
  });

  it('processAPDResponse should works well', (done) => {
    const { processAPDResponse, PROCESS_APD_RESPONSE, PROCESS_APD_RESPONSE_SUCCESS } = actions;
    const params = {
      batchId: -1,
      receiptId: -1
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    store.dispatch(processAPDResponse(params, successCallback, errorCallback))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(2);
        expect(myActions[0].type).toBe(PROCESS_APD_RESPONSE);
        expect(myActions[1].type).toBe(PROCESS_APD_RESPONSE_SUCCESS);
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(errorCallback).not.toHaveBeenCalled();
        done();
      })
  });

  it('processAPDResponse should works well after request API failed.', (done) => {
    const { processAPDResponse, PROCESS_APD_RESPONSE, PROCESS_APD_RESPONSE_FAILURE } = actions;
    const params = {
      batchId: -1,
      receiptId: -1
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    mockAPI({
      path: '/json/Payment/processAPDResponse.json',
      result: {
        "headers": {
          "response_code": "1100",
          "response_message": "error"
        },
        "body": {}
      }
    });

    store.dispatch(processAPDResponse(params, successCallback, errorCallback))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(3);
        expect(myActions[0].type).toBe(PROCESS_APD_RESPONSE);
        expect(myActions[1].type).toBe(ADD_ERROR);
        expect(myActions[2].type).toBe(PROCESS_APD_RESPONSE_FAILURE);
        expect(errorCallback).toHaveBeenCalledTimes(1);
        expect(successCallback).not.toHaveBeenCalled();
        done();
      })
  });

  it('setAccountHolder should works well', () => {
    const { ACCOUNT_HOLDER_INFO, setAccountHolder } = actions;
    let action = null;
    const params = {
      payload: jsonAccountHolder
    };

    store.dispatch(setAccountHolder(params));
    action = store.getActions()[0];

    expect(typeof action).toBe('object');
    expect(action.type).toBe(ACCOUNT_HOLDER_INFO);
    expect(action.payload).toEqual({
      value: params.payload.body.account_holder
    });
  });

  it('communicatingWithDevice should works well', () => {
    const { COMMUNICATE_WITH_DEVICE, communicatingWithDevice } = actions;
    const param = false;
    let action = null;

    store.dispatch(communicatingWithDevice(param));
    action = store.getActions()[0];

    expect(typeof action).toBe('object');
    expect(action.type).toBe(COMMUNICATE_WITH_DEVICE);
    expect(action.payload).toEqual({
      value: param
    });
  });

  it('gotoNextPage should works well', () => {
    const { gotoNextPage, GO_TO_NEXT_PAGE } = actions;
    const receiptHeaderId = -1;
    let myActions = [];
    let action = null;
    store.dispatch(gotoNextPage(receiptHeaderId));
    myActions = store.getActions();
    action = myActions[0];
    expect(myActions.length).toBe(1);
    expect(typeof action).toBe('object');
    expect(action.type).toBe(GO_TO_NEXT_PAGE);
    expect(action.payload).toEqual({
      value: false
    });
  });

  it('swipeCardInPinpadModal should works well', (done) => {
    const {
      swipeCardInPinpadModal,
      INIT_DATA_OF_PINPAD,
      GET_APD_INFORMATION,
      GET_APD_PAYMENT_INFO,
      ACCOUNT_HOLDER_INFO,
      COMMUNICATE_WITH_DEVICE
    } = actions;
    const {
      OPEN_OR_HIDE_MODAL
    } = pinpadModalActions;
    const FETCH_ACCOUNT_HOLDER = 'FETCH_ACCOUNT_HOLDER';
    const methods = {
      gotoNextPage: jest.fn(),
      fetchAccountHolderAction: () => ({
        type: FETCH_ACCOUNT_HOLDER,
        payload: jsonAccountHolder
      })
    };

    store.dispatch(swipeCardInPinpadModal(data, methods))
      .then(() => {
        const myActions = store.getActions();
        const actionTypes = [
          INIT_DATA_OF_PINPAD,
          GET_APD_INFORMATION,
          GET_APD_PAYMENT_INFO,
          FETCH_ACCOUNT_HOLDER,
          ACCOUNT_HOLDER_INFO,
          OPEN_OR_HIDE_MODAL,
          COMMUNICATE_WITH_DEVICE
        ];
        const actionCollections = [];
        const myActionTypes = myActions.map(action => action.type);
        actionTypes.forEach((type) => {
          const index = myActionTypes.indexOf(type);
          if (index > -1) {
            actionCollections.push({
              index,
              action: myActions[index]
            });
          }
        });

        expect(actionCollections[0].action.type).toBe(INIT_DATA_OF_PINPAD);
        expect(actionCollections[0].action.payload.data).toEqual(data);

        expect(actionCollections[1].action.type).toBe(GET_APD_INFORMATION);

        expect(actionCollections[2].action.type).toBe(GET_APD_PAYMENT_INFO);

        expect(actionCollections[3].action.type).toBe(FETCH_ACCOUNT_HOLDER);
        expect(actionCollections[3].action.payload).toEqual(jsonAccountHolder);


        expect(actionCollections[4].action.type).toBe(ACCOUNT_HOLDER_INFO);

        expect(actionCollections[5].action.type).toBe(OPEN_OR_HIDE_MODAL);
        expect(actionCollections[5].action.payload).toEqual({
          shown: true
        });

        expect(actionCollections[6].action.type).toBe(COMMUNICATE_WITH_DEVICE);
        expect(actionCollections[6].action.payload).toEqual({
          value: true
        });

        expect(actionCollections[1].index).toBeGreaterThan(actionCollections[0].index);
        expect(actionCollections[2].index).toBeGreaterThan(actionCollections[1].index);
        expect(actionCollections[3].index).toBeGreaterThan(actionCollections[2].index);
        expect(actionCollections[4].index).toBeGreaterThan(actionCollections[3].index);
        expect(actionCollections[5].index).toBeGreaterThan(actionCollections[4].index);
        expect(actionCollections[6].index).toBeGreaterThan(actionCollections[5].index);
        done();
      })
  });

  it('processResolveAction should works well', (done) => {
    const creditCardInfoByPinpad = {
      walletId: 11,
      ccMasked: 'xxxx',
      ccCardTypeName: 'card type name'
    }
    store.dispatch(actions.processResolveAction(creditCardInfoByPinpad))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(3);
        expect(myActions[2].type).toEqual(pinpadModalActions.OPEN_OR_HIDE_MODAL);
        expect(myActions[2].payload.shown).toBe(false);
        done();
      })
  });

  it('getCardInfoByPinPadPromiseAction should works well', (done) => {
    const creditCardInfoByPinpad = {
      walletId: 11,
      ccMasked: 'xxxx',
      ccCardTypeName: 'card type name'
    }
    const {
      getCardInfoByPinPadPromiseAction
    } = actions;
    const FETCH_ACCOUNT_HOLDER = 'FETCH_ACCOUNT_HOLDER';
    const paramActions = {
      fetchAccountHolderAction: () => ({
        type: FETCH_ACCOUNT_HOLDER,
        payload: jsonAccountHolder
      }),
      gotoNextPage: jest.fn()
    };
    const paramData = {
      isRefund: false,
      debitCardId: 4,
      companyId: 0,
      agentId: 0,
      customerId: 1,
      pays: [
        {
          amount: 12,
          paymentTypeId: 4,
          payName: "Debit Card"
        },
        {
          amount: 20,
          paymentTypeId: 3,
          payName: "Credit Card"
        }
      ]
    }

    store.dispatch(actions.getCardInfoByPinPadPromiseAction(paramData, paramActions))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(10);
        expect(myActions[0].type).toEqual('INIT_DATA_OF_PINPAD');
        expect(myActions[1].type).toEqual('FETCH_ACCOUNT_HOLDER');
        expect(myActions[3].type).toEqual('ACCOUNT_HOLDER_INFO');
        expect(myActions[4].type).toEqual('PINPAD_SET_IS_NEW_CARD_FLAG');
        expect(myActions[5].type).toEqual('UPDATE_MODAL_TITLE');
        expect(myActions[6].type).toEqual('OPEN_OR_HIDE_MODAL');
        expect(myActions[7].type).toEqual('COMMUNICATE_WITH_DEVICE');
        expect(myActions[9].type).toEqual('OPEN_OR_HIDE_MODAL');
        done();
      });
    store.dispatch(actions.processResolveAction(creditCardInfoByPinpad));
  });

  it('updateCurrentPayIndex should works well', () => {
    const { UPDATE_CURRENT_PAY_INDEX, updateCurrentPayIndex } = actions;
    const param = 0;
    let action = null;

    store.dispatch(updateCurrentPayIndex(param));
    action = store.getActions()[0];

    expect(typeof action).toBe('object');
    expect(action.type).toBe(UPDATE_CURRENT_PAY_INDEX);
    expect(action.payload).toEqual({
      value: param
    });
  });

  it('updatePromptMessage should works well', () => {
    const { UPDATE_PROMPT_MESSAGE, updatePromptMessage } = actions;
    const param = 'Init pinpad device, please wait a minute!';
    let action = null;

    store.dispatch(updatePromptMessage(param));
    action = store.getActions()[0];

    expect(typeof action).toBe('object');
    expect(action.type).toBe(UPDATE_PROMPT_MESSAGE);
    expect(action.payload).toEqual({
      message: param,
      actionType: 2
    });
  });

  it('updateErrorMessage should works well', (done) => {
    const {
      updateErrorMessage,
      UPDATE_ERROR_MESSAGE,
      COMMUNICATE_WITH_DEVICE,
      UPDATE_CURRENT_PAY_INDEX
    } = actions;
    const {
      SHOW_OR_HIDE_FAIL_ACTIONS_BTNS
    } = pinpadFailActions;
    const param = {
      message: 'error swipe card use pinpad!'
    };

    store.dispatch(updateErrorMessage(param))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(4);
        expect(myActions[0].type).toBe(UPDATE_ERROR_MESSAGE);
        expect(myActions[0].payload).toEqual({
          ...param,
          hasError: undefined,
          isServerErr: undefined,
          actionType: 1
        });

        expect(myActions[1].type).toBe(SHOW_OR_HIDE_FAIL_ACTIONS_BTNS);
        expect(myActions[1].payload).toEqual({
          shown: false
        });

        expect(myActions[2].type).toBe(COMMUNICATE_WITH_DEVICE);
        expect(myActions[2].payload).toEqual({
          value: true
        });

        expect(myActions[3].type).toBe(UPDATE_CURRENT_PAY_INDEX);
        expect(myActions[3].payload).toEqual({
          value: 0
        });
        done();
      })
  });

  it ('updateErrorMessage should works well when payment error occur', (done) => {
    store = mockStore({
      paymentModals: {
        pinpad: {
          payment: fromJS(Object.assign({}, data, {errorMessage: 'error occur'})),
          pinpadModal: fromJS({
            shown: false
          }),
          pinpadFail: fromJS({
            shown: false
          })
        },
        newCreditCard: fromJS({
          cardTypeList: mockState.cardTypeList
        })
      }
    });
    const {
      updateErrorMessage,
      UPDATE_ERROR_MESSAGE,
      COMMUNICATE_WITH_DEVICE,
      UPDATE_CURRENT_PAY_INDEX
    } = actions;
    const {
      SHOW_OR_HIDE_FAIL_ACTIONS_BTNS
    } = pinpadFailActions;
    const param = {
      message: 'error swipe card use pinpad!'
    };

    store.dispatch(updateErrorMessage(param))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(5);
        expect(myActions[0].type).toBe(UPDATE_ERROR_MESSAGE);
        expect(myActions[0].payload).toEqual({
          ...param,
          actionType: 1,
          hasError: undefined,
          isServerErr: undefined
        });

        expect(myActions[1].type).toBe(UPDATE_ERROR_MESSAGE);
        expect(myActions[1].payload).toEqual({
          message: '',
          isServerErr: true,
          actionType: 1,
          hasError: undefined
        });

        expect(myActions[2].type).toBe(SHOW_OR_HIDE_FAIL_ACTIONS_BTNS);
        expect(myActions[2].payload).toEqual({
          shown: false
        });

        expect(myActions[3].type).toBe(COMMUNICATE_WITH_DEVICE);
        expect(myActions[3].payload).toEqual({
          value: true
        });

        expect(myActions[4].type).toBe(UPDATE_CURRENT_PAY_INDEX);
        expect(myActions[4].payload).toEqual({
          value: 0
        });
        done();
      })
  })

  it('notifySuccessPayment should works well', () => {
    const { UPDATE_SUCCESS_PAYMENT, notifySuccessPayment } = actions;
    const param = {
      index: 0
    };
    let action = null;

    store.dispatch(notifySuccessPayment(param));
    action = store.getActions()[0];

    expect(typeof action).toBe('object');
    expect(action.type).toBe(UPDATE_SUCCESS_PAYMENT);
    expect(action.payload).toEqual(param);
  });

  it('updateSuccessMessage should works well', (done) => {
    const {
      updateSuccessMessage,
      UPDATE_SUCCESS_MESSAGE,
      UPDATE_SUCCESS_PAYMENT,
      COMMUNICATE_WITH_DEVICE,
      UPDATE_CURRENT_PAY_INDEX
    } = actions;
    const param = {
      message: 'pinpad swipe card success!'
    };

    store.dispatch(updateSuccessMessage(param))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(4);
        expect(myActions[0].type).toBe(UPDATE_SUCCESS_MESSAGE);
        expect(myActions[0].payload).toEqual(param);

        expect(myActions[1].type).toBe(UPDATE_SUCCESS_PAYMENT);
        expect(myActions[1].payload).toEqual({
          index: 0
        });

        expect(myActions[2].type).toBe(COMMUNICATE_WITH_DEVICE);
        expect(myActions[2].payload).toEqual({
          value: true
        });

        expect(myActions[3].type).toBe(UPDATE_CURRENT_PAY_INDEX);
        expect(myActions[3].payload).toEqual({
          value: 0
        });
        done();
      })
  });

  it('updateSuccessMessage should works well when all pays success and has no finishReceiptErrorMessage', (done) => {
    const {
      updateSuccessMessage,
      UPDATE_SUCCESS_MESSAGE,
      UPDATE_SUCCESS_PAYMENT,
      COMMUNICATE_WITH_DEVICE,
      UPDATE_CURRENT_PAY_INDEX
    } = actions;
    const param = {
      message: 'pinpad swipe card success!'
    };
    store = mockStore({
      paymentModals: {
        pinpad: {
          payment: fromJS(Object.assign(
            {},
            data,
            {
              pays: [{
                amout: '12.12',
                paymentTypeId: 3,
                payName: 'Credit Card',
                index: 0,
                swipeSuccess: true
              }]
            }
          )),
          pinpadModal: fromJS({
            shown: false
          }),
          pinpadFail: fromJS({
            shown: false
          })
        },
        newCreditCard: fromJS({
          cardTypeList: mockState.cardTypeList
        })
      }
    });

    store.dispatch(updateSuccessMessage(param))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(5);
        expect(myActions[0].type).toBe(UPDATE_SUCCESS_MESSAGE);
        expect(myActions[0].payload).toEqual(param);

        expect(myActions[1].type).toBe(UPDATE_SUCCESS_PAYMENT);
        expect(myActions[1].payload).toEqual({
          index: 0
        });

        expect(myActions[3].type).toBe(COMMUNICATE_WITH_DEVICE);
        expect(myActions[3].payload).toEqual({
          value: true
        });

        expect(myActions[4].type).toBe(UPDATE_CURRENT_PAY_INDEX);
        expect(myActions[4].payload).toEqual({
          value: 0
        });
        done();
      })
  });

  it('updateSuccessMessage should works well when all pays success and has finishReceiptErrorMessage', (done) => {
    const {
      updateSuccessMessage,
      UPDATE_SUCCESS_MESSAGE,
      UPDATE_SUCCESS_PAYMENT,
      COMMUNICATE_WITH_DEVICE,
      UPDATE_CURRENT_PAY_INDEX
    } = actions;
    const param = {
      message: 'pinpad swipe card success!',
      finishReceiptErrorMessage: 'error happen'
    };
    store = mockStore({
      paymentModals: {
        pinpad: {
          payment: fromJS(Object.assign(
            {},
            data,
            {
              pays: [{
                amout: '12.12',
                paymentTypeId: 3,
                payName: 'Credit Card',
                index: 0,
                swipeSuccess: true,
                init: true
              }]
            }
          )),
          pinpadModal: fromJS({
            shown: false
          }),
          pinpadFail: fromJS({
            shown: false
          })
        },
        newCreditCard: fromJS({
          cardTypeList: mockState.cardTypeList
        })
      }
    });

    store.dispatch(updateSuccessMessage(param))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(5);
        expect(myActions[0].type).toBe(UPDATE_SUCCESS_MESSAGE);
        expect(myActions[0].payload).toEqual({
          message: 'pinpad swipe card success!'
        });

        expect(myActions[1].type).toBe(UPDATE_SUCCESS_PAYMENT);
        expect(myActions[1].payload).toEqual({
          index: 0
        });

        expect(myActions[2].type).toBe('OPEN_OR_HIDE_MODAL');
        expect(myActions[2].payload).toEqual({
          shown: false
        });

        expect(myActions[3].type).toBe(ADD_ERROR);
        expect(myActions[3].payload).toEqual({
          code: "3000",
          message: "error happen",
          isSystemError: false
        });

        expect(myActions[4].type).toBe('SHOW_OR_HIDE_FAIL_ACTIONS_BTNS');
        expect(myActions[4].payload).toEqual({
          shown: true
        });
        done();
      })
  });

  it('clearPinpadPays should works well', () => {
    const { CLEAR_PINPAD_PAYS, clearPinpadPays } = actions;
    const param = false;
    let action = null;

    store.dispatch(clearPinpadPays(param));
    action = store.getActions()[0];

    expect(typeof action).toBe('object');
    expect(action.type).toBe(CLEAR_PINPAD_PAYS);
    expect(action.payload).toEqual(undefined);
  });
});
