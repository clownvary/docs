import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import {
  fetchBalanceAction,
  onValidateBalanceAction,
  commitBalanceAsyncAction,
  uiShowMessageAction,
  onUpdateBalanceAction,
  clearErrorStateAction
} from 'index/modules/Cart/Balance/actions/balance';
import {
  BALANCE_UI_LIST,
  BALANCE_UI_MESSAGE,
  BALANCE_ON_VALIDATION,
  BALANCE_ON_CLEAR_INFO,
  BALANCE_ON_UPDATE_LIST
} from 'index/modules/Cart/Balance/consts/actionTypes';

describe('index/modules/Cart/Balance/actions/balance', () => {
  let store = null;

  const outstandingBalances = [
    {
      id: 6165,
      receipt_header_id: 0,
      encrypt_receipt_header_id: null,
      receipt_number: '1007442.005',
      issued_date: 'May 23, 2017',
      next_payment_date: 'Jul 23, 2017',
      original_balance: 11,
      current_balance: 11,
      amount_due_now: 11,
      pending_payment: 5,
      payment_amount_list: [
        11
      ],
      max: 11,
      min: 5,
      transaction_descriptions: null
    },
    {
      id: 8287,
      receipt_header_id: 0,
      encrypt_receipt_header_id: null,
      receipt_number: '3002737.005',
      issued_date: 'May 23, 2017',
      next_payment_date: 'Jul 23, 2017',
      original_balance: 505.75,
      current_balance: 200,
      amount_due_now: 200,
      pending_payment: 60,
      payment_amount_list: [
        200
      ],
      max: 180,
      min: 50,
      transaction_descriptions: null
    }
  ];

  const errors = fromJS({ fdsa: 'fadsadsfdsa' });
  const outstandingAccountBalanceWarning = 'dsafsafdsaa';

  const initialState = {
    modules: {
      Cart: {
        Balance: {
          balance: fromJS({
            outstandingBalances,
            errors,
            outstandingAccountBalanceWarning
          })

        }
      }
    },
    intl: fromJS({
      currentLocale: 'en-us',
      messages: {
        'en-us': {
          maxError: '',
          minError: ''
        }
      }
    })
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchBalanceAction', () => {
    it('Should return expected Action Object.', (done) => {
      store.dispatch(fetchBalanceAction(true)).then(() => {
        expect(helper.isIncluding([
          {
            type: BALANCE_UI_LIST
          }], store.getActions())).toBeTruthy();
        done();
      });
    });
  });

  describe('onUpdateBalanceAction', () => {
    it('Should return expected Action Object.', () => {
      store.dispatch(onUpdateBalanceAction(0, 1));
      expect(helper.isIncluding([
        {
          type: BALANCE_ON_UPDATE_LIST
        }], store.getActions())).toBeTruthy();
    });
  });

  describe('onValidateBalanceAction', () => {
    it('Should return expected Action Object when no error.', () => {
      store.dispatch(onValidateBalanceAction());
      expect(store.getActions().length).toEqual(0);
    });

    it('Should return expected Action Object when no error and do not match the min payment value.', () => {
      const balances = [
        {
          id: 6165,
          receipt_header_id: 0,
          encrypt_receipt_header_id: null,
          receipt_number: '1007442.005',
          issued_date: 'May 23, 2017',
          next_payment_date: 'Jul 23, 2017',
          original_balance: 11,
          current_balance: 11,
          amount_due_now: 11,
          pending_payment: 5,
          payment_amount_list: [
            11
          ],
          max: 11,
          min: 5,
          transaction_descriptions: null
        },
        {
          id: 8287,
          receipt_header_id: 0,
          encrypt_receipt_header_id: null,
          receipt_number: '3002737.005',
          issued_date: 'May 23, 2017',
          next_payment_date: 'Jul 23, 2017',
          original_balance: 505.75,
          current_balance: 200,
          amount_due_now: 200,
          pending_payment: 55,
          payment_amount_list: [
            200
          ],
          max: 180,
          min: 50,
          transaction_descriptions: null
        }
      ];

      initialState.modules.Cart.Balance.balance = fromJS({
        outstandingBalances: balances,
        require: true,
        errors,
        outstandingAccountBalanceWarning
      });

      store = configureStore(middlewares)(initialState);

      store.dispatch(onValidateBalanceAction());
      expect(helper.isIncluding([
        {
          type: BALANCE_ON_VALIDATION
        },
        {
          type: BALANCE_ON_CLEAR_INFO
        }
      ], store.getActions())).toBeTruthy();
    });

    it('Should return expected Action Object when show MAX error.', () => {
      const balances = [
        {
          id: 6165,
          receipt_header_id: 0,
          encrypt_receipt_header_id: null,
          receipt_number: '1007442.005',
          issued_date: 'May 23, 2017',
          next_payment_date: 'Jul 23, 2017',
          original_balance: 11,
          current_balance: 11,
          amount_due_now: 11,
          pending_payment: 15,
          payment_amount_list: [
            11
          ],
          max: 11,
          min: 5,
          transaction_descriptions: null
        },
        {
          id: 8287,
          receipt_header_id: 0,
          encrypt_receipt_header_id: null,
          receipt_number: '3002737.005',
          issued_date: 'May 23, 2017',
          next_payment_date: 'Jul 23, 2017',
          original_balance: 505.75,
          current_balance: 200,
          amount_due_now: 200,
          pending_payment: 260,
          payment_amount_list: [
            200
          ],
          max: 180,
          min: 50,
          transaction_descriptions: null
        }
      ];

      initialState.modules.Cart.Balance.balance = fromJS({
        outstandingBalances: balances,
        errors,
        outstandingAccountBalanceWarning
      });

      store = configureStore(middlewares)(initialState);

      store.dispatch(onValidateBalanceAction());
      expect(helper.isIncluding([
        {
          type: BALANCE_ON_VALIDATION
        },
        {
          type: BALANCE_ON_CLEAR_INFO
        }
      ], store.getActions())).toBeTruthy();
    });

    it('Should return expected Action Object when show Min error.', () => {
      const balances = [
        {
          id: 6165,
          receipt_header_id: 0,
          encrypt_receipt_header_id: null,
          receipt_number: '1007442.005',
          issued_date: 'May 23, 2017',
          next_payment_date: 'Jul 23, 2017',
          original_balance: 11,
          current_balance: 11,
          amount_due_now: 11,
          pending_payment: 4,
          payment_amount_list: [
            11
          ],
          max: 11,
          min: 5,
          transaction_descriptions: null
        },
        {
          id: 8287,
          receipt_header_id: 0,
          encrypt_receipt_header_id: null,
          receipt_number: '3002737.005',
          issued_date: 'May 23, 2017',
          next_payment_date: 'Jul 23, 2017',
          original_balance: 505.75,
          current_balance: 200,
          amount_due_now: 200,
          pending_payment: 40,
          payment_amount_list: [
            200
          ],
          max: 180,
          min: 50,
          transaction_descriptions: null
        }
      ];

      initialState.modules.Cart.Balance.balance = fromJS({
        outstandingBalances: balances,
        errors,
        outstandingAccountBalanceWarning
      });

      store = configureStore(middlewares)(initialState);

      store.dispatch(onValidateBalanceAction());
      expect(helper.isIncluding([
        {
          type: BALANCE_ON_VALIDATION
        },
        {
          type: BALANCE_ON_CLEAR_INFO
        }
      ], store.getActions())).toBeTruthy();
    });
  });

  describe('commitBalanceAsyncAction', () => {
    it('Should return expected Action Object when commit successfully.', () => {
      store.dispatch(commitBalanceAsyncAction()).then(() => {
        expect(store.getActions().length).toEqual(0);
      });
    });

    it('Should return expected Action Object when commit failed.', (done) => {
      mockAPI([
        {
          path: '/test/json/Cart/Balance/post_balance.json',
          result: '/test/json/Cart/Balance/post_balance_failed.json'
        }
      ], () =>
        store.dispatch(commitBalanceAsyncAction())
        .catch(() => {
          expect(helper.isIncluding([
            {
              type: BALANCE_ON_CLEAR_INFO
            }], store.getActions())).toBeTruthy();
          done();
        })
      );
    });

    it('Promise.reject and not API error.', (done) => {
      mockAPI([
        {
          path: '/test/json/Cart/Balance/post_balance.json',
          result: {
            headers: {},
            body: {}
          }
        }
      ], () =>
        store.dispatch(commitBalanceAsyncAction())
        .catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        })
      );
    });
  });

  describe('uiShowMessageAction', () => {
    it('should run uiShowMessageAction correctly when require is false', () => {
      store.dispatch(uiShowMessageAction());
      expect(helper.isIncluding([
        {
          type: BALANCE_UI_MESSAGE
        }
      ], store.getActions())).toBeTruthy();
    });
    it('should run uiShowMessageAction correctly when require is true', () => {
      const state = {
        modules: {
          Cart: {
            Balance: {
              balance: fromJS({
                outstandingBalances,
                errors,
                outstandingAccountBalanceWarning: '',
                require: true
              })
            }
          }
        },
        intl: fromJS({
          currentLocale: 'en-us',
          messages: {
            'en-us': {
              maxError: '',
              minError: ''
            }
          }
        })
      };
      const mockStore = configureStore(middlewares);
      store = mockStore(state);
      store.dispatch(uiShowMessageAction());
      expect(helper.isIncluding([
        {
          type: BALANCE_UI_MESSAGE
        }
      ], store.getActions())).toBeTruthy();
    });
  });

  describe('clearErrorStateAction', () => {
    it('should run clearErrorStateAction correctly', () => {
      store.dispatch(clearErrorStateAction());
      expect(helper.isIncluding([
        {
          type: BALANCE_ON_VALIDATION
        }
      ], store.getActions())).toBeTruthy();
    });
  });
});
