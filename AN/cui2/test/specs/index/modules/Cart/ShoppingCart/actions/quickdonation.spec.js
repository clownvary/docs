// import { expect } from 'chai';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';// eslint-disable-line
import middlewares from 'utils/middlewares';// eslint-disable-line
import {
  submitQuickDonationAction,
  changeAmountAction,
  changeCampaignAction,
  fetchQuickDonationAction
} from 'index/modules/Cart/ShoppingCart/actions/quickdonation';
import {
  TRANSACTIONS_UI_LIST,
  WAIVERS_UI_LIST,
  DONATIONS_UI_LIST,
  DONATIONS_UI_AMOUNT,
  DONATIONS_UI_CAMPAIGN,
  ORDERSUMMARY_UI
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import
{
  MASTER_UI_SHOPPINGCART_COUNT
} from 'index/components/Master/consts/actionTypes';


describe('index/modules/Cart/ShoppingCart/actions/quickdonation', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      configurations: fromJS({
        enable_quick_donation_in_cart: true,
        allow_donations_online: true
      }),
      intl: fromJS({
        currentLocale: 'en-us',
        messages : {
          'en-us': {
            payOnAccountWarning : ''
          }
        }
      }),
      modules: {
        Cart: {
          ShoppingCart: {
            quickdonation: fromJS({
              amount: 1,
              selectedCampaignValue: 1
            }),
            transactions: fromJS({
              participants: fromJS([{
                transactions: [{
                  reno: '124',
                  has_payment_plan: true,
                  show_payment_plan: true
                },
                {
                  reno: '123',
                  has_payment_plan: false,
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
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action(UI): changeAmountAction', () => {
    it('Should return expected Action Object.', () => {
      const expectedAction = {
        type: DONATIONS_UI_AMOUNT,
        payload: 1
      };
      expect(changeAmountAction(1)).toEqual(expectedAction);
    });
  });

  describe('Dispatch Action(UI): changeCampaignAction', () => {
    it('Should return expected Action Object.', () => {
      const expectedAction = {
        type: DONATIONS_UI_CAMPAIGN,
        payload: 1
      };
      expect(changeCampaignAction(1)).toEqual(expectedAction);
    });
  });

  describe('Dispatch Action: fetchQuickDonationAction', () => {
    it(`Should return DONATIONS_UI_LIST if enable_quick_donation_in_cart
    and allow_donations_online to be true`, (done) => {
      store.dispatch(fetchQuickDonationAction()).then(() => {
        expect(store.getActions()[0].type).toEqual(DONATIONS_UI_LIST);
        done();
      });
    });
    it('Should return false if enable_quick_donation_in_cart to be false', () => {
      const mockStore = configureStore(middlewares);
      store = mockStore({
        configurations: fromJS({
          enable_quick_donation_in_cart: false,
          allow_donations_online: true
        })
      });
      expect(store.dispatch(fetchQuickDonationAction())).toBeFalsy();
    });
    it('Should return false if allow_donations_online to be false', () => {
      const mockStore = configureStore(middlewares);
      store = mockStore({
        configurations: fromJS({
          enable_quick_donation_in_cart: true,
          allow_donations_online: false
        })
      });
      expect(store.dispatch(fetchQuickDonationAction())).toBeFalsy();
    });
  });

  describe('Dispatch Action: submitQuickDonationAction', () => {
    it('Should return SUBMIT_DONATION_SUCCESS, TRANSACTIONS_UI_LIST, WAIVERS_UI_LIST, DONATIONS_UI_AMOUNT, DONATIONS_UI_CAMPAIGN', (done) => {
      store.dispatch(submitQuickDonationAction()).then(() => {
        expect(helper.isIncluding([
          {
            type: TRANSACTIONS_UI_LIST
          },
          {
            type: WAIVERS_UI_LIST
          },
          {
            type: DONATIONS_UI_LIST
          },
          {
            type: DONATIONS_UI_AMOUNT
          },
          {
            type: DONATIONS_UI_CAMPAIGN
          },
          {
            type: MASTER_UI_SHOPPINGCART_COUNT
          },
          {
            type: ORDERSUMMARY_UI
          }
        ], store.getActions())).toBeTruthy();
        done();
      }).catch(e => console.log(e));
    });
    it('Should return error correctly ', (done) => {
      const errorMsg = 'test error message';
      mockAPI({
        path: '/test/json/Cart/ShoppingCart/post_quickdonation.json',
        result: {
          headers: {
            response_code: '9007',
            response_message: errorMsg
          }
        }
      }, () => {
        store.dispatch(submitQuickDonationAction()).catch((error) => {
          expect(error.data.response.message).toEqual(errorMsg);
          done();
        });
      });

      mockAPI({
        path: '/test/json/Cart/ShoppingCart/post_quickdonation.json',
        result: {
          headers: {
            response_code: '9008',
            response_message: errorMsg
          }
        }
      }, () => {
        store.dispatch(submitQuickDonationAction()).catch((error) => {
          expect(error.data.response.message).toEqual(errorMsg);
          done();
        });
      });
    });
  });
});
