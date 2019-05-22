import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import isPromise from 'react-base-ui/lib/utils/isPromise';
import middlewares from 'utils/middlewares';// eslint-disable-line
import helper from 'utils/testHelper';// eslint-disable-line
import {
  confirmDelete,
  confirmBalanceDeleteAction,
  fetchTransactionsAction,
  deleteTransactionClusterAction,
  deleteOutStandingBalanceClusterAction,
  setTransactionExpandStatus,
  clearExpandStatustAction,
  fetchAllPaymentPlansAsyncAction,
  enablePaymentPlanAction
} from 'index/modules/Cart/ShoppingCart/actions/transactions';

import { initCartPageAsyncAction } from 'index/modules/Cart/ShoppingCart/actions/common';
import selfMessages from 'index/modules/Cart/ShoppingCart/components/Transactions/translations';
import jsonPaymentPlan from 'Cart/ShoppingCart/get_paymentplan.json';

import {
  TRANSACTIONS_UI_LIST,
  WAIVERS_UI_LIST,
  CHECKOUT_UI_NEEDPAY,
  DONATIONS_UI_LIST,
  ORDERSUMMARY_UI,
  TRANSACTIONS_UI_EXPAND_STATUS,
  TRANSACTIONS_UI_CLEAR_EXPAND_STATUS,
  TRANSACTIONS_UI_GET_PAYMENT_PLAN
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import {
  MASTER_UI_SHOPPINGCART_COUNT
} from 'index/components/Master/consts/actionTypes';

const { body: { payment_plan: paymentPlan } } = jsonPaymentPlan;

describe('index/modules/Cart/ShoppingCart/actions/transactions', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      configurations: fromJS({
        enable_quick_donation_in_cart: true,
        allow_donations_online: true
      }),
      modules: {
        Cart: {
          ShoppingCart: {
            transactions: fromJS({
              participants: fromJS([{
                transactions: [{
                  reno: '124',
                  has_payment_plan: true,
                  check_payment_plan: true,
                  show_payment_plan: true
                },
                {
                  reno: '123',
                  has_payment_plan: false,
                  check_payment_plan: false,
                  show_payment_plan: true
                }
                ]
              }]),
              payOnAccount: fromJS([]),
              isRequired: null,
              payOnAccountWarning: null,
              orderSummary: null,
              paymentPlans: fromJS([])
            })
          }
        }
      },
      intl: fromJS({
        currentLocale: 'en-us',
        messages: {
          'en-us': {
            [selfMessages.payOnAccountWarning.id]: 'payOnAccount error'
          }
        }
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action: fetchTransactionsAction', () => {
    it('Should return TRANSACTIONS_UI_LIST.', (done) => {
      store.dispatch(fetchTransactionsAction()).then(() => {
        const actions = store.getActions();
        expect(helper.isIncluding([
          {
            type: TRANSACTIONS_UI_LIST
          }
        ], actions)).toBeTruthy();
        done();
      });
    });
  });

  describe('setTransactionExpandStatus', () => {
    it('Should return expected Action Object.', () => {
      store.dispatch(setTransactionExpandStatus());
      expect(helper.isIncluding([
        {
          type: TRANSACTIONS_UI_EXPAND_STATUS
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('clearExpandStatustAction', () => {
    it('Should return expected Action Object.', () => {
      store.dispatch(clearExpandStatustAction());
      expect(helper.isIncluding([
        {
          type: TRANSACTIONS_UI_CLEAR_EXPAND_STATUS
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('Dispatch Action: deleteTransactionClusterAction', () => {
    it('Should return TRANSACTIONS_UI_LIST and WAIVERS_UI_LIST and CHECKOUT_UI_NEEDPAY and MASTER_UI_SHOPPINGCART_COUNT.', (done) => {
      store.dispatch(deleteTransactionClusterAction(1)).then(() => {
        const actions = store.getActions();
        expect(helper.isIncluding([
          {
            type: TRANSACTIONS_UI_LIST
          },
          {
            type: DONATIONS_UI_LIST
          },
          {
            type: WAIVERS_UI_LIST
          },
          {
            type: MASTER_UI_SHOPPINGCART_COUNT
          },
          {
            type: ORDERSUMMARY_UI
          }
        ], actions)).toBeTruthy();
        done();
      });
    });

    it('should return expected error when dispatch deleteTransactionClusterAction', (done) => {
      mockAPI({
        path: '/test/json/Cart/ShoppingCart/delete_transaction.json',
        result: {
          headers: {
            response_code: '9008'
          }
        }
      }, () =>
        store.dispatch(deleteTransactionClusterAction()).catch(() => {
          const actions = store.getActions();
          expect(helper.isIncluding([
            {
              type: TRANSACTIONS_UI_LIST
            },
            {
              type: WAIVERS_UI_LIST
            },
            {
              type: CHECKOUT_UI_NEEDPAY
            },
            {
              type: MASTER_UI_SHOPPINGCART_COUNT
            }
          ], actions)).toBeFalsy();
          done();
        })
      );
    });

    it('should return expected error message when dispatch deleteTransactionClusterAction', (done) => {
      const errorMsg = 'test error message';
      mockAPI({
        path: '/test/json/Cart/ShoppingCart/delete_transaction.json',
        result: {
          headers: {
            response_code: '9007',
            response_message: errorMsg
          }
        }
      }, () =>
        store.dispatch(deleteTransactionClusterAction()).catch((error) => {
          expect(error.data.response.message).toEqual(errorMsg);
          done();
        })
      );
    });
    it('should return expected error message when error is api error', (done) => {
      const errorMsg = 'test error message';
      mockAPI({
        path: '/test/json/Cart/ShoppingCart/delete_transaction.json',
        result: {
          headers: {
            response_code: '9008',
            response_message: errorMsg
          }
        }
      }, () =>
        store.dispatch(deleteTransactionClusterAction()).catch((error) => {
          expect(error.message).toEqual(errorMsg);
          done();
        })
      );
    });
  });

  describe('Dispatch Action: deleteOutStandingBalanceClusterAction', () => {
    it('Should return TRANSACTIONS_UI_LIST and WAIVERS_UI_LIST and CHECKOUT_UI_NEEDPAY and MASTER_UI_SHOPPINGCART_COUNT.', (done) => {
      store.dispatch(deleteOutStandingBalanceClusterAction(1)).then(() => {
        const actions = store.getActions();
        expect(helper.isIncluding([
          {
            type: TRANSACTIONS_UI_LIST
          },
          {
            type: WAIVERS_UI_LIST
          },
          {
            type: MASTER_UI_SHOPPINGCART_COUNT
          }
        ], actions)).toBeTruthy();
        done();
      });
    });

    it('should return expected error when dispatch deleteOutStandingBalanceClusterAction', (done) => {
      mockAPI({
        path: '/test/json/Cart/ShoppingCart/delete_outstandingbalance.json',
        result: {
          headers: {
            response_code: '9008'
          }
        }
      }, () =>
        store.dispatch(deleteOutStandingBalanceClusterAction(1)).catch(() => {
          const actions = store.getActions();
          expect(helper.isIncluding([
            {
              type: TRANSACTIONS_UI_LIST
            },
            {
              type: WAIVERS_UI_LIST
            },
            {
              type: CHECKOUT_UI_NEEDPAY
            },
            {
              type: MASTER_UI_SHOPPINGCART_COUNT
            }
          ], actions)).toBeFalsy();
          done();
        })
      );
    });

    it('Should dispatch deleteTransactionClusterAction if pass id.', () => {
      expect(isPromise(store.dispatch(confirmDelete('123')))).toBeTruthy();
      expect(store.getActions().length).toEqual(0);
    });

    it('Should not dispatch deleteTransactionClusterAction if not pass id.', () => {
      expect(isPromise(store.dispatch(confirmDelete()))).toBeFalsy();
    });

    it('Should dispatch deleteOutStandingBalanceClusterAction if pass id.', () => {
      expect(isPromise(store.dispatch(confirmBalanceDeleteAction('123')))).toBeTruthy();
      expect(store.getActions().length).toEqual(0);
    });

    it('Should not dispatch deleteOutStandingBalanceClusterAction if not pass id.', () => {
      expect(isPromise(store.dispatch(confirmBalanceDeleteAction()))).toBeFalsy();
    });

    it('should return expected error message when dispatch deleteOutStandingBalanceClusterAction', (done) => {
      const errorMsg = 'test error message';
      mockAPI({
        path: '/test/json/Cart/ShoppingCart/delete_outstandingbalance.json',
        result: {
          headers: {
            response_code: '9007',
            response_message: errorMsg
          }
        }
      }, () =>
        store.dispatch(deleteOutStandingBalanceClusterAction(1)).catch((error) => {
          expect(error.data.response.message).toEqual(errorMsg);
          done();
        })
      );
    });
  });


  describe('Dispatch Action: initCartPageAsyncAction', () => {
    it('Should return TRANSACTIONS_UI_LIST and DONATIONS_UI_LIST and WAIVERS_UI_LIST and CHECKOUT_UI_NEEDPAY.', (done) => {
      store.dispatch(initCartPageAsyncAction()).then(() => {
        const actions = store.getActions();
        expect(helper.isIncluding([
          {
            type: TRANSACTIONS_UI_LIST
          },
          {
            type: DONATIONS_UI_LIST
          },
          {
            type: WAIVERS_UI_LIST
          },
          {
            type: MASTER_UI_SHOPPINGCART_COUNT
          },
          {
            type: ORDERSUMMARY_UI
          }
        ], actions)).toBeTruthy();
        done();
      });
    });
  });

  describe('Dispatch Action: fetchAllPaymentPlansAsyncAction', () => {
    it('should return TRANSACTIONS_UI_GET_PAYMENT_PLAN type', (done) => {
      store.dispatch(fetchAllPaymentPlansAsyncAction()).then(() => {
        const actions = store.getActions();
        expect(helper.isIncluding([
          {
            type: TRANSACTIONS_UI_GET_PAYMENT_PLAN,
            payload: {
              paymentPlans: [paymentPlan]
            }
          }
        ], actions)).toBeTruthy();
        done();
      });
    });
  });
  describe('Dispatch Action: enablePaymentPlanAction', () => {
    it('should return TRANSACTIONS_UI_GET_PAYMENT_PLAN type when success', (done) => {
      store.dispatch(enablePaymentPlanAction(124, false)).then(() => {
        const actions = store.getActions();
        expect(helper.isIncluding([
          {
            type: TRANSACTIONS_UI_GET_PAYMENT_PLAN,
            payload: {
              paymentPlans: [paymentPlan]
            }
          }
        ], actions)).toBeTruthy();
        done();
      });
    });
    it('should return error type when fail', (done) => {
      mockAPI({
        path: '/test/json/Cart/ShoppingCart/post_enablepaymentplan.json',
        result: {
          headers: {
            response_code: '0000'
          },
          body: {
            success: 'false'
          }
        }
      }, () =>
        store.dispatch(enablePaymentPlanAction(124, false)).catch(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
          done();
        })
      );
    });
  });
});
