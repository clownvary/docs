import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import { SYNC_LEGACY_CUI } from 'index/actions/legacyCui';
import isPromise from 'react-base-ui/lib/utils/isPromise';

describe('shared/middlewares/legacyCuiMiddleware', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      configurations: fromJS({
        secure_recnet: 'https',
        cui_url: 'abc'
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Pass in all kinds of actions should work as expected.', () => {
    it('Should delivery to next middleware directly without any process if the action is a thunk.', () => {
      const action = () => ({
        type: SYNC_LEGACY_CUI,
        payload: {}
      });
      expect(store.dispatch(action)).toEqual(action());
    });

    it('Should return Promise object if action type is SYNC_LEGACY_CUI', () => {
      const action = {
        type: SYNC_LEGACY_CUI,
        payload: {}
      };
      global.__STATIC__ = false;
      expect(isPromise(store.dispatch(action))).toEqual(true);
    });
  });
});
