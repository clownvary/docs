import configureStore from 'redux-mock-store';
import some from 'lodash/some';
import middlewares from 'shared/api/middlewares';
import { mockAPI, cleanMock } from 'utils/mockAPI';

describe('shared -> api -> promiseMiddleware', () => {
  let mockStore = null;

  beforeEach(() => {
    mockStore = configureStore(middlewares);
  });

  it('should dispatch action, if action is an object', () => {
    const store = mockStore({});
    store.dispatch({
      type: 'CHANGE_COMPLETED',
      payload: {
        value: 'completed'
      }
    });

    const actions = store.getActions();

    expect(actions).toEqual([{
      type: 'CHANGE_COMPLETED',
      payload: {
        value: 'completed'
      }
    }]);
  });

  it('should dispatch action, if action is a function', (done) => {
    const store = mockStore({ value: 'completed' });
    store.dispatch((dispatch, getState) => {
      const state = getState();
      expect(state).toEqual({ value: 'completed' });
      done();
    });
  });

  it('should execute promise, if request a right url', (done) => {
    const store = mockStore({});

    const action = {
      types: ['FETCH_STATUS', 'FETCH_STATUS_SUCCESS', 'FETCH_STATUS_FAILURE'],
      promise: (API) => API.get('json/Resource/status.json'),
      meta: {
        ignoreLoadingBar: true
      }
    };

    return store.dispatch(action)
      .then(() => {
        const actions = store.getActions();

        expect(actions.length).toBeGreaterThanOrEqual(2);
        expect(some(actions, ['type', 'FETCH_STATUS'])).toEqual(true);
        expect(some(actions, ['type', 'FETCH_STATUS_SUCCESS'])).toEqual(true);
        done();
      });
  });

  it('should execute promise, if request a wrong url', (done) => {
    const store = mockStore({});

    const action = {
      types: ['FETCH_STATUS', 'FETCH_STATUS_SUCCESS', 'FETCH_STATUS_FAILURE'],
      promise: (API) => API.get('wrong_url.json')
    };

    return store.dispatch(action)
      .then(null, () => {
        const actions = store.getActions();

        expect(actions.length).toBeGreaterThanOrEqual(1);
        expect(some(actions, ['type', 'FETCH_STATUS'])).toEqual(true);
        done();
      });
  });

  it('should execute promise, if returned a system error', (done) => {
    const store = mockStore({});

    mockAPI({
      path: '/json/Resource/status.json',
      result: {
        headers: {
          response_code: '105',
          response_message: 'system error'
        },
        body: {}
      }
    });

    const action = {
      types: ['FETCH_STATUS', 'FETCH_STATUS_SUCCESS', 'FETCH_STATUS_FAILURE'],
      promise: (API) => API.get('/json/Resource/status.json'),
      meta: {
        ignoreBusinessErrors: true
      }
    };

    return store.dispatch(action).then(done, () => {
      const actions = store.getActions();

      expect(actions.length).toBeGreaterThanOrEqual(1);
      expect(some(actions, ['type', 'FETCH_STATUS'])).toEqual(true);

      cleanMock();
      done();
    });
  });
});
