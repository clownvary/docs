import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import mockAPI from 'utils/mockAPI';
import { fromJS } from 'immutable';
import { ADD_ERROR } from 'shared/actions/Error';
import * as actions from 'index/Payment/actions/paymentOptions/giftCard';
import * as optionActions from 'index/Payment/actions/paymentOptions/options';
import { resetPaymentOptions } from 'index/Payment/utils/splitOptions'
import {
  GIFTCARD_NEW_DELETE_PENDING_SUCCESS,
  GIFTCARD_REMOVE_NEW
} from 'index/Payment/actions/paymentOptions/giftCard';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));


describe('index -> Payment -> actions -> paymentOptions -> giftCard', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const newGiftCardDropDown = {
    data: [{
      gc_company_id: 0,
      gc_min_sale_amount: 20,
      gc_status_id: 1,
      isMaxOverride: true,
      gc_max_card_balance: 50,
      gc_expire_date: -2209132800000,
      gc_number: "11.2.002",
      gc_type_name: "amount-external-changeable",
      text: "amount-external-changeable #11.2.002",
      value: 62,
      gc_available_amount: 0,
      gc_liability_gl_account_id: 13,
      gc_is_expired: false,
      isMinOverride: false,
      gc_status_name: "Pending",
      isNewGiftCard: true,
      gc_purchased_amount: 40,
      amount: "370.00",
      gc_redeemed_amount: 0,
      gc_customer_id: 0,
      gc_type_id: 9,
      gc_id: 62,
      gc_refilled_amount: 0
    }],
    selected: []
  };
  const giftCardDropDown = {
    data: [
      {
        gc_company_id: 0,
        gc_status_id: 2,
        name: "gc-mask1 #111.222.33 ($30)",
        gc_expire_date: -2209132800000,
        gc_number: "111.222.33",
        gc_type_name: "gc-mask1",
        text: "gc-mask1 #111.222.33 ($30)",
        value: 32,
        gc_available_amount: 30,
        gc_liability_gl_account_id: 13,
        gc_is_expired: false,
        gc_status_name: "Active",
        gc_purchased_amount: 30,
        gc_redeemed_amount: 0,
        gc_customer_id: 7250,
        gc_type_id: 4,
        gc_id: 32,
        gc_refilled_amount: 0
      }
    ],
    selected: []
  };
  const paymentOpts = {
    data: [
      {
        list: [{
          id: 14,
          name: "Gift Certificate Refund",
          selected: false,
          text: "Gift Certificate Refund",
          value: 14
        }],
        activeVal: 14,
        ComponentName: "GiftCard",
        amount: "370.00",
        checkNumber: "",
        formatCheckAmount: "370.00",
        formatGiftCardAmount: "370.00",
        giftCardId: 61
      }
    ]
  };
  const initialData = {
    permitID: -1,
    batchID: 0,
    receiptID: -1
  };

  beforeEach(() => {
    store = mockStore({
      payment: fromJS({
        isRefund: false
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown: {
            data: [],
            selected: []
          }
        }),
        options: fromJS({
          data: []
        })
      },
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('newGiftCardClose should works well', () => {
    const { GIFTCARD_NEW_CLOSE, newGiftCardClose } = actions;

    store.dispatch(newGiftCardClose());
    const action = store.getActions()[0];
    expect(action.type).toBe(GIFTCARD_NEW_CLOSE);
  });

  it('setNewGiftCardError should works well', () => {
    const { setNewGiftCardError, GIFTCARD_NEW_SET_ERROR } = actions;
    const value = 'gift card add error';

    store.dispatch(setNewGiftCardError(value));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_NEW_SET_ERROR);
    expect(myActions[0].payload).toEqual({
      value
    });
  });

  it('changeGiftCardType should works well', () => {
    const { changeGiftCardType, GIFTCARD_CHANGE_TYPE } = actions;
    const value = 23;

    store.dispatch(changeGiftCardType(value));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_CHANGE_TYPE);
    expect(myActions[0].payload).toEqual({
      value
    });
  });

  it('setAvaliableAmount should works well', () => {
    const { setAvaliableAmount, GIFTCARD_SET_AVALIABLE_AMOUNT } = actions;
    const params = {
      giftCardId: 2,
      amount: 22
    };

    store.dispatch(setAvaliableAmount(params));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_SET_AVALIABLE_AMOUNT);
    expect(myActions[0].payload).toEqual(params);
  });

  it('setGiftCardMaxOverride should works well', () => {
    const { setGiftCardMaxOverride, GIFTCARD_SET_MAX_OVERRIDE } = actions;
    const params = {
      value: 2,
      isMax: false
    };

    store.dispatch(setGiftCardMaxOverride(params));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_SET_MAX_OVERRIDE);
    expect(myActions[0].payload).toEqual(params);
  });

  it('newGiftCardIsOverrideMin should works well', () => {
    const { newGiftCardIsOverrideMin, GIFTCARD_NEW_IS_OVERRIDE_MIN } = actions;
    const value = true;

    store.dispatch(newGiftCardIsOverrideMin(value));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_NEW_IS_OVERRIDE_MIN);
    expect(myActions[0].payload).toEqual({
      value
    });
  });

  it('newGiftCardIsOverrideMax should works well', () => {
    const { newGiftCardIsOverrideMax, GIFTCARD_NEW_IS_OVERRIDE_MAX } = actions;
    const value = true;

    store.dispatch(newGiftCardIsOverrideMax(value));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_NEW_IS_OVERRIDE_MAX);
    expect(myActions[0].payload).toEqual({
      value
    });
  });

  it('setGiftCardLable should works well', () => {
    const { setGiftCardLable, GIFTCARD_SET_LABLE } = actions;
    const value = 'gift card label';

    store.dispatch(setGiftCardLable(value));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_SET_LABLE);
    expect(myActions[0].payload).toEqual({
      value
    });
  });

  it('deletePendingGiftCard should works well when the workflow is not refund.', (done) => {
    const { deletePendingGiftCard } = actions;

    store.dispatch(deletePendingGiftCard())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(0);
        done();
      })
  });

  it('deletePendingGiftCard should works well when the workflow is refund.', (done) => {
    const { deletePendingGiftCard, GIFTCARD_NEW_DELETE_PENDING_SUCCESS } = actions;
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown
        }),
        options: fromJS(paymentOpts)
      }
    });

    store.dispatch(deletePendingGiftCard())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(3);
        expect(myActions[2].type).toEqual(GIFTCARD_NEW_DELETE_PENDING_SUCCESS);
        done();
      })
  });

  it('getNewGiftCardInfo should works well', (done) => {
    const { getNewGiftCardInfo, GIFTCARD_SET_AVALIABLE_AMOUNT, GIFTCARD_CHANGE_OPTION } = actions;
    const actionParams = {
      params: {},
      amount: 120,
      key: 0
    };

    store.dispatch(getNewGiftCardInfo(actionParams))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(5);
        expect(myActions[2].type).toEqual(GIFTCARD_SET_AVALIABLE_AMOUNT);
        expect(myActions[2].payload).toEqual({
          giftCardId: 62,
          amount: 120
        });
        expect(myActions[3].type).toEqual(optionActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
        expect(myActions[3].payload).toEqual({
          index: 0,
          key: "giftCardId",
          value: 62
        });
        expect(myActions[4].type).toEqual(GIFTCARD_CHANGE_OPTION);
        expect(myActions[4].payload).toEqual({
          value: 62
        });
        done();
      })
  });

  it('getNewGiftCardInfo should works well when error happend.', (done) => {
    const { getNewGiftCardInfo, GIFTCARD_NEW_SET_ERROR } = actions;
    const actionParams = {
      params: {},
      amount: 120,
      key: 0
    };

    mockAPI({
      path: '/json/Payment/issueGiftCard.json',
      result: {
        "headers": {
          "response_code": "1100",
          "response_message": "error"
        },
        "body": {}
      }
    });

    store.dispatch(getNewGiftCardInfo(actionParams))
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(3);
        expect(myActions[2].type).toBe(GIFTCARD_NEW_SET_ERROR);
        expect(myActions[2].payload).toEqual({
          value: "error"
        });
        done();
      })
  });

  it('changeGiftCardAmount should works well', () => {
    const { changeGiftCardAmount } = actions;
    const actionParams = {
      amount: 120,
      key: 0,
      formatGiftCardAmount: 120.00
    }

    store.dispatch(changeGiftCardAmount(actionParams));
    const myActions = store.getActions();
    expect(myActions.length).toBe(2);
    expect(myActions[0].type).toBe(optionActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      index: 0,
      key: "amount",
      value: 120
    });
    expect(myActions[1].type).toBe(optionActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[1].payload).toEqual({
      index: 0,
      key: "formatGiftCardAmount",
      value: 120
    });
  });

  it('changeGiftCardOpiton should works well', () => {
    const { changeGiftCardOpiton, GIFTCARD_CHANGE_OPTION } = actions;
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true,
        errors: ['error 1']
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown
        }),
        options: fromJS(paymentOpts)
      }
    });
    const actionParams = {
      value: 2,
      key: 0
    }

    store.dispatch(changeGiftCardOpiton(actionParams));
    const myActions = store.getActions();
    expect(myActions.length).toBe(2);
    expect(myActions[0].type).toBe(optionActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      index: 0,
      key: "giftCardId",
      value: 2
    });
    expect(myActions[1].type).toBe(GIFTCARD_CHANGE_OPTION);
    expect(myActions[1].payload).toEqual({
      value: 2
    });
  });

  it('changeGiftCardOption should works well', () => {
    const { changeGiftCardOption } = actions;
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true,
        errors: ['error 1']
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardLabel: 'gift card label',
          giftCardId: 14,
          canUseNewGiftCard: false,
          giftCardDropDown,
        }),
        options: fromJS(paymentOpts)
      }
    });
    const callback = jest.fn();
    store.dispatch(changeGiftCardOption(callback));
    const myActions = store.getActions();
    expect(callback).not.toHaveBeenCalled();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(ADD_ERROR);
    expect(myActions[0].payload).toEqual({
      code: "0003",
      message: "No available gift card label.",
      isSystemError: true
    })
  });

  it('changeGiftCardOption should works well when has multi gift card options', () => {
    const { changeGiftCardOption } = actions;
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true
      }),
      paymentOptions: {
        giftCard: fromJS({
          giftCardDropDown: {
            data: [...newGiftCardDropDown.data, ...newGiftCardDropDown.data]
          },
          giftCardLabel: 'gift card label',
          giftCardId: 14,
          canUseNewGiftCard: false
        }),
        options: fromJS(paymentOpts)
      }
    });
    const callback = jest.fn();
    store.dispatch(changeGiftCardOption(callback));
    const myActions = store.getActions();
    expect(myActions.length).toBe(0);
    expect(callback).toHaveBeenCalled();
  });

  it('fetchGiftCardList should works well', (done) => {
    const { fetchGiftCardList, GIFTCARD_FETCH_SUCCESS } = actions;
    const store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: false
      }),
      payer: fromJS({
        payerType: 1,
        customers: {
          data: [{
            id: 1,
            name: "Flora Xu",
            selected: true,
            text: "Flora Xu",
            value: 1
          }],
          selected: 1
        },
        company: {
          data: [],
          selected: -1
        }
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown: {
            data: [],
            selected: []
          }
        }),
        options: fromJS({
          data: []
        })
      }
    });

    store.dispatch(fetchGiftCardList())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(3);
        expect(myActions[2].type).toBe(GIFTCARD_FETCH_SUCCESS);
        done();
      })
  });

  it('fetchGiftCardList should works well when workflow is refund.', (done) => {
    const { fetchGiftCardList, GIFTCARD_FETCH_SUCCESS, GIFTCARD_DELETE_PAYER_GIFTCARDS_SUCCESS } = actions;
    const store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true
      }),
      payer: fromJS({
        payerType: 1,
        customers: {
          data: [{
            id: 1,
            name: "Flora Xu",
            selected: true,
            text: "Flora Xu",
            value: 1
          }],
          selected: 1
        },
        company: {
          data: [],
          selected: -1
        }
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown: {
            data: [],
            selected: []
          }
        }),
        options: fromJS({
          data: []
        })
      }
    });

    store.dispatch(fetchGiftCardList())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(5);
        expect(myActions[1].type).toBe(GIFTCARD_DELETE_PAYER_GIFTCARDS_SUCCESS);
        expect(myActions[4].type).toBe(GIFTCARD_FETCH_SUCCESS);
        done();
      })
  });

  it('fetchGiftCardList should works well when workflow is refund and fetch deletePayerGiftCards fails.', (done) => {
    const { fetchGiftCardList, GIFTCARD_FETCH_SUCCESS, GIFTCARD_DELETE_PAYER_GIFTCARDS_SUCCESS } = actions;
    const store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true
      }),
      payer: fromJS({
        payerType: 2,
        customers: {
          data: [],
          selected: 1
        },
        company: {
          data: [{
            id: 1,
            name: "Active Network",
            selected: true,
            text: "Active Network",
            value: 1
          }],
          selected: -1
        }
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown: {
            data: [],
            selected: []
          }
        }),
        options: fromJS({
          data: []
        })
      }
    });
    mockAPI([
      {
        path: '/json/Payment/deletePayerGiftCards.json',
        result: {
          "headers": {
            "response_code": "1100",
            "response_message": "error"
          },
          "body": {}
        }
      },
      {
        path: '/json/Payment/refundGiftCardList.json',
        result: {
          headers: {
            "response_code": "0000",
            "response_message": "success"
          },
          body: {
            gc_refund_info: {
              gc_type_list: [],
              gc_list: []
            }
          }
        }
      }
    ]);

    store.dispatch(fetchGiftCardList())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(4);
        expect(myActions[3].type).toBe(GIFTCARD_FETCH_SUCCESS);
        done();
      })
  });

  it('fetchGiftCardList should works well when has no payer.', () => {
    const { fetchGiftCardList } = actions;
    const store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true
      }),
      payer: fromJS({
        payerType: 1,
        customers: {
          data: [],
          selected: 1
        },
        company: {
          data: [],
          selected: -1
        }
      })
    });

    store.dispatch(fetchGiftCardList());
    const myActions = store.getActions();
    expect(myActions.length).toBe(0);
  });

  it('resetGiftCardList should works well', () => {
    const { resetGiftCardList } = actions;
    const callback = jest.fn();
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true,
        errors: ['error 1']
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardLabel: 'gift card label',
          giftCardId: 14,
          canUseNewGiftCard: false,
          giftCardDropDown,
        }),
        options: fromJS(paymentOpts)
      }
    });

    store.dispatch(resetGiftCardList(callback));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(ADD_ERROR);
    expect(myActions[0].payload).toEqual({
      code: "0003",
      message: "Please choose a gift card label.",
      isSystemError: true
    });
  });

  it('resetGiftCardList should works well when the last payment option has selected gift card', () => {
    const { resetGiftCardList, GIFTCARD_RESET_LIST } = actions;
    const callback = jest.fn();
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true,
        errors: ['error 1']
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardLabel: 'gift card label',
          giftCardId: 14,
          canUseNewGiftCard: false,
          giftCardDropDown,
          giftCardDropDownValue: 32
        }),
        options: fromJS(paymentOpts)
      }
    });

    store.dispatch(resetGiftCardList(callback));
    const myActions = store.getActions();
    expect(callback).toHaveBeenCalled();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_RESET_LIST);
    expect(myActions[0].payload).toEqual({
      value: null
    });
  });

  it('resetGiftCardList should works well when has need deleted gift card. ', () => {
    const { resetGiftCardList, GIFTCARD_RESET_LIST } = actions;
    const callback = jest.fn();
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true,
        errors: ['error 1']
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardLabel: 'gift card label',
          giftCardId: 14,
          canUseNewGiftCard: false,
          giftCardDropDown,
          giftCardDropDownValue: 32
        }),
        options: fromJS(paymentOpts)
      }
    });
    resetPaymentOptions([{ id: 14 }]);
    store.dispatch(resetGiftCardList(callback));
    const myActions = store.getActions();
    expect(myActions.length).toBe(2);
    expect(myActions[0].type).toBe(GIFTCARD_RESET_LIST);
    expect(myActions[0].payload).toEqual({
      value: null
    });
    expect(myActions[1].type).toBe(optionActions.PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS);
    expect(myActions[1].payload).toEqual({
      optionIds: []
    });
  });

  it('resetGiftCardList should works well when has need deleted gift card and has multi gift cards. ', () => {
    const { resetGiftCardList, GIFTCARD_RESET_LIST } = actions;
    const callback = jest.fn();
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true,
        errors: ['error 1']
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardLabel: 'gift card label',
          giftCardId: 14,
          canUseNewGiftCard: false,
          giftCardDropDown: {
            data: [...giftCardDropDown.data, ...giftCardDropDown.data]
          },
          giftCardDropDownValue: 32
        }),
        options: fromJS(paymentOpts)
      }
    });
    resetPaymentOptions([{ id: 14 }]);
    store.dispatch(resetGiftCardList(callback));
    const myActions = store.getActions();
    expect(myActions.length).toBe(2);
    expect(myActions[0].type).toBe(GIFTCARD_RESET_LIST);
    expect(myActions[0].payload).toEqual({
      value: null
    });
    expect(myActions[1].type).toBe(optionActions.PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS);
    expect(myActions[1].payload).toEqual({
      optionIds: []
    });
  });

  it('cancelSelectGiftCard should works well', () => {
    const { cancelSelectGiftCard } = actions;
    const actionParams = { key: 0 };
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true,
        errors: ['error 1']
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardLabel: 'gift card label',
          giftCardId: 14,
          canUseNewGiftCard: false,
          giftCardDropDown
        }),
        options: fromJS(paymentOpts)
      }
    });

    store.dispatch(cancelSelectGiftCard(actionParams));
    const myActions = store.getActions();
    expect(myActions.length).toBe(0);
  });

  it('cancelSelectGiftCard should works well when has multi gift card options ', () => {
    const { cancelSelectGiftCard, GIFTCARD_RESET_LIST } = actions;
    const actionParams = { key: 1 };
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true,
        errors: ['error 1']
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardLabel: 'gift card label',
          giftCardId: 14,
          canUseNewGiftCard: false,
          giftCardDropDown
        }),
        options: fromJS({
          data: [...paymentOpts.data, ...paymentOpts.data]
        })
      }
    });

    store.dispatch(cancelSelectGiftCard(actionParams));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_RESET_LIST);
    expect(myActions[0].payload).toEqual({
      value: 61
    });
  });

  it('cancelSelectGiftCard should works well when used gift cards less than gift card list.', () => {
    const { cancelSelectGiftCard, GIFTCARD_RESET_LIST } = actions;
    const actionParams = { key: 1 };
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true,
        errors: ['error 1']
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardLabel: 'gift card label',
          giftCardId: 14,
          canUseNewGiftCard: false,
          giftCardDropDown
        }),
        options: fromJS({
          data: [...paymentOpts.data, { activeVal: 1 }]
        })
      }
    });

    store.dispatch(cancelSelectGiftCard(actionParams));
    const myActions = store.getActions();
    expect(myActions.length).toBe(1);
    expect(myActions[0].type).toBe(GIFTCARD_RESET_LIST);
    expect(myActions[0].payload).toEqual({
      value: 61
    });
  });

  it('removeNewGiftCardAsyncAction should works well when is not refund.', done => {
    const { removeNewGiftCardAsyncAction } = actions;
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: false
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardId: 14,
        }),
        options: fromJS({
          data: [...paymentOpts.data]
        })
      }
    });

    store.dispatch(removeNewGiftCardAsyncAction(0)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(0);
      done();
    });
  });

  it('removeNewGiftCardAsyncAction should works well when option activeVal and giftCardId not matched.', done => {
    const { removeNewGiftCardAsyncAction } = actions;
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardId: 15,
        }),
        options: fromJS({
          data: [...paymentOpts.data]
        })
      }
    });

    store.dispatch(removeNewGiftCardAsyncAction(0)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(0);
      done();
    });
  });

  it('removeNewGiftCardAsyncAction should works well when delPendingGiftCardOpts has redundant data.', done => {
    const { removeNewGiftCardAsyncAction } = actions;
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardId: 14,
        }),
        options: fromJS({
          data: [...paymentOpts.data, ...paymentOpts.data]
        })
      }
    });

    store.dispatch(removeNewGiftCardAsyncAction(0)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(0);
      done();
    });
  });

  it('removeNewGiftCardAsyncAction should works well when delNewGiftCards is empty.', done => {
    const { removeNewGiftCardAsyncAction } = actions;
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardId: 14,
        }),
        options: fromJS({
          data: [...paymentOpts.data]
        })
      }
    });

    store.dispatch(removeNewGiftCardAsyncAction(0)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(0);
      done();
    });
  });

  it('removeNewGiftCardAsyncAction should works well when delNewGiftCards is not empty.', done => {
    const { removeNewGiftCardAsyncAction, GIFTCARD_NEW_DELETE_PENDING_SUCCESS } = actions;
    const data = paymentOpts.data;
    data[0].giftCardId = 62;
    store = mockStore({
      initialData,
      payment: fromJS({
        isRefund: true
      }),
      paymentOptions: {
        giftCard: fromJS({
          newGiftCardDropDown,
          giftCardId: 14,
        }),
        options: fromJS({
          data: [...data]
        })
      }
    });

    store.dispatch(removeNewGiftCardAsyncAction(0)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(3);
      expect(myActions[1].type).toBe(GIFTCARD_NEW_DELETE_PENDING_SUCCESS);
      expect(myActions[2].type).toBe(GIFTCARD_REMOVE_NEW);
      done();
    });
  });
});

