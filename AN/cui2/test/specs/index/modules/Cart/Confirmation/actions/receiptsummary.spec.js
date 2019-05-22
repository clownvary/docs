import { expect } from 'chai';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper'; // eslint-disable-line
import middlewares from 'utils/middlewares';// eslint-disable-line
import {
  fetchTransactionsAction
} from 'index/modules/Cart/Confirmation/actions/receiptSummary';
import { actionTypes } from 'index/modules/Cart/Checkout/consts';

describe('index/modules/Cart/Confirmation/actions/receiptSummary', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      configurations: fromJS({
        tealium_service_mode: 1
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('fetchTransactionsAction Should works well.', (done) => {
    store.dispatch(fetchTransactionsAction()).then(() => {
      expect(helper.isIncluding([{
        type: actionTypes.RECEIPTSUMMARY_UI_LIST
      }], store.getActions())).to.be.true;
      done();
    }).catch(done);
  });
});
