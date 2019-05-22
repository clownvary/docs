
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';// eslint-disable-line
import middlewares from 'utils/middlewares';// eslint-disable-line
import {
  updateCouponCodeAction,
  deleteCouponAction,
  applyCouponAsyncAction,
  fetchCouponsAsyncAction
} from 'index/modules/Cart/ShoppingCart/actions/coupon';
import {
  SELECT_COUPON,
  COUPON_UI_ERROR,
  TRANSACTIONS_UI_LIST,
  WAIVERS_UI_LIST,
  DONATIONS_UI_LIST,
  ORDERSUMMARY_UI,
  SET_COUPONS
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import { MASTER_UI_SHOPPINGCART_COUNT } from 'index/components/Master/consts/actionTypes';
import jsonCoupons from 'Cart/ShoppingCart/get_coupons.json';

const { body: { dc_coupon: { available_coupons } } } = jsonCoupons;

describe('index/modules/Cart/ShoppingCart/actions/coupon', () => {
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
            coupon: fromJS({
              dcCoupons: available_coupons,
              selectedDcCouponId: '6846516848964165168463523'
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
  describe('changeAmountAction', () => {
    it('updateCouponCodeAction should work fine', () => {
      store.dispatch(updateCouponCodeAction());
      expect(helper.isIncluding(
        [{
          type: SELECT_COUPON
        },
        {
          type: COUPON_UI_ERROR,
          payload: {
            errorMsg: null
          }
        }
        ], store.getActions())).toBeTruthy();
    });
    describe('deleteCouponAction:', () => {
      it('deleteCouponAction should work fine', (done) => {
        store.dispatch(deleteCouponAction(1)).then(() => {
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
              type: MASTER_UI_SHOPPINGCART_COUNT
            },
            {
              type: ORDERSUMMARY_UI
            }
          ], store.getActions())).toBeTruthy();
          done();
        });
      });

      it('deleteCouponAction should return error correctly ', (done) => {
        const errorMsg = 'test error message';
        mockAPI({
          path: '/test/json/Cart/ShoppingCart/delete_coupon.json',
          result: {
            headers: {
              response_code: '9007',
              response_message: errorMsg
            }
          }
        }, () => {
          store.dispatch(deleteCouponAction([1, 2])).catch((error) => {
            expect(error.data.response.message).toEqual(errorMsg);
            done();
          });
        });
      });
    });
    describe('Waiver section in new cart:', () => {
      it('Should dispatch fetchCouponsAsyncAction correctly.', (done) => {
        store.dispatch(fetchCouponsAsyncAction()).then(() => {
          expect(store.getActions()[0].type).toEqual(SET_COUPONS);
          done();
        });
      });
    });

    describe('applyCouponAsyncAction:', () => {
      it('applyCouponAsyncAction should work fine', (done) => {
        store.dispatch(applyCouponAsyncAction()).then(() => {
          expect(helper.isIncluding([
            {
              type: SELECT_COUPON,
              payload: ''
            },
            {
              type: COUPON_UI_ERROR,
              payload: {
                errorMsg: null
              }
            },
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
              type: MASTER_UI_SHOPPINGCART_COUNT
            },
            {
              type: ORDERSUMMARY_UI
            }
          ], store.getActions())).toBeTruthy();
          done();
        });
      });

      it('applyCouponAsyncAction should return error correctly when error from API', (done) => {
        const errorMsg = 'test error message';
        mockAPI({
          path: '/test/json/Cart/ShoppingCart/apply_coupon.json',
          result: {
            headers: {
              response_code: '9008',
              response_message: errorMsg
            }
          }
        }, () => {
          store.dispatch(applyCouponAsyncAction()).catch(() => {
            expect(helper.isIncluding(
              [{
                type: COUPON_UI_ERROR,
                payload: {
                  errorMsg
                }
              }], store.getActions())).toBeTruthy();
            done();
          });
        });
      });

      it('applyCouponAsyncAction should return error correctly when error not from API ', (done) => {
        const errorMsg = 'test error message';
        mockAPI({
          path: '/test/json/Cart/ShoppingCart/apply_coupon.json',
          result: {
            headers: {
              response_code: '9007',
              response_message: errorMsg
            }
          }
        }, () => {
          store.dispatch(applyCouponAsyncAction()).catch((error) => {
            expect(error.data.response.message).toEqual(errorMsg);
            done();
          });
        });
      });
    });
  });
});
