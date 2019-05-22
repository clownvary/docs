import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';// eslint-disable-line
import * as actions from 'index/modules/Cart/Checkout/actions/orderSummary';
import { actionTypes } from 'index/modules/Cart/Checkout/consts';

describe('index/modules/Cart/Checkout/actions/orderSummary', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchOrderSummary', () => {
    it('Should return expected Action Object.', (done) => {
      const {
        fetchOrderSummary
      } = actions;

      store.dispatch(fetchOrderSummary()).then(() => {
        expect(store.getActions()[0].type).toEqual(actionTypes.ORDERSUMMARY_UI);
        done();
      });
    });

    it('Should return expected Action Object.', (done) => {
      const {
        fetchOrderSummary
      } = actions;

      mockAPI({
        path: '/test/json/Cart/Checkout/get_ordersummary.json',
        result: {
          headers: {
            response_code: '0000'
          },
          body: { }
        }
      }, () => store.dispatch(fetchOrderSummary()).then(() => {
        expect(store.getActions()[0].type).toEqual(actionTypes.ORDERSUMMARY_UI);
        done();
      }));
    });
  });
});
