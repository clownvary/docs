import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import { CALL_HISTORY_METHOD } from 'react-router-redux/lib/actions';
import { push, replace, go, goBack, goForward } from 'index/actions/router';
// import { actionTypes } from 'index/modules/Cart/Checkout/consts';


describe('index/actions/router', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('push', () => {
    expect(store.dispatch(push('abc'))).toEqual(
      {
        type: CALL_HISTORY_METHOD,
        payload: {
          method: 'push',
          args: ['/abc']
        }
      }
    );
  });

  it('replace', () => {
    expect(store.dispatch(replace('abc'))).toEqual(
      {
        type: CALL_HISTORY_METHOD,
        payload: {
          method: 'replace',
          args: ['/abc']
        }
      }
    );
  });

  it('go', () => {
    expect(store.dispatch(go('abc'))).toEqual(
      {
        type: CALL_HISTORY_METHOD,
        payload: {
          method: 'go',
          args: ['/abc']
        }
      }
    );
  });

  it('goBack', () => {
    expect(store.dispatch(goBack('abc'))).toEqual(
      {
        type: CALL_HISTORY_METHOD,
        payload: {
          method: 'goBack',
          args: ['/abc']
        }
      }
    );
  });

  it('goForward', () => {
    expect(store.dispatch(goForward('abc'))).toEqual(
      {
        type: CALL_HISTORY_METHOD,
        payload: {
          method: 'goForward',
          args: ['/abc']
        }
      }
    );
  });

  it('replace with state', () => {
    expect(store.dispatch(replace({ pathname: '/foo', state: { the: 'state' } }))).toEqual(
      {
        type: CALL_HISTORY_METHOD,
        payload: {
          method: 'replace',
          args: [{
            pathname: '/foo',
            state: { the: 'state' }
          }]
        }
      }
    );
  });
});
