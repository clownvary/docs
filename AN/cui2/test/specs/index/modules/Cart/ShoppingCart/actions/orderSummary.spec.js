import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import {
  fetchOrderSummary
} from 'index/modules/Cart/ShoppingCart/actions/orderSummary';
import {
  ORDERSUMMARY_UI
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';

describe('index/modules/Cart/ShoppingCart/actions/orderSummary', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Waiver section in new cart:', () => {
    it('Should dispatch fetchWaiversAction correctly when transaction in cart.', (done) => {
      store.dispatch(fetchOrderSummary()).then(() => {
        expect(store.getActions()[0].type).toEqual(ORDERSUMMARY_UI);
        done();
      })
      .catch(done);
    });

    it('Promise.reject and not API error.', (done) => {
      mockAPI([
        {
          path: '/test/json/Cart/Checkout/get_ordersummary.json',
          result: {
            headers: {
              response_code: '0000',
              response_message: 'Succeesul',
              page_info: {
                order_by: '',
                total_records: 0,
                order_option: 'ASC',
                page_number: 1,
                total_records_per_page: 30,
                total_page: 1
              }
            },
            body: {}
          }
        }
      ], () =>
        store.dispatch(fetchOrderSummary()).then(() => {
          expect(store.getActions()[0].type).toEqual(ORDERSUMMARY_UI);
          done();
        })
      );
    });
  });
});
