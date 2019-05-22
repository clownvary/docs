import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import { acceptAAOfferAsyncAction } from 'index/modules/AAOffer/actions/aaoffer'

describe('acceptAAOfferAsyncAction', () => {
  let store = null;
  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });
  it('acceptAAOfferAsyncAction should work well when action resolve', (done) => {
    store.dispatch(acceptAAOfferAsyncAction()).then(() => {
      expect(helper.isIncluding([
        {
          type: '@@router/CALL_HISTORY_METHOD'
        }], store.getActions())).toBeTruthy();
      done();
    });
  });
});
