import configureStore from 'redux-mock-store';
import routeMiddleware from 'shared/api/routeMiddleware';
import { REDIRECT, RELOAD } from 'shared/actions/route';

describe('shared/api/routeMiddleware', () => {
  const mockStore = configureStore([new routeMiddleware()]);
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  it('routeMiddleware should handle type REDIRECT fine', (done) => {
    const url = 'mock_redirect_url';
    store.dispatch({
      type: REDIRECT,
      payload: {
        url,
        win: global
      }
    });

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    const redirectAction = actions[1];
    expect(redirectAction.type).toEqual(REDIRECT);
    expect(redirectAction.payload.url).toEqual(url);
    done();
  });

  it('routeMiddleware should handle type RELOAD fine', (done) => {
    const url = 'mock_reload_url';
    store.dispatch({
      type: RELOAD,
      payload: {
        url,
        win: global
      }
    });

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    const reloadAction = actions[0];
    expect(reloadAction.type).toEqual('LOADING_BAR_SHOW');
    done();
  });

  it('routeMiddleware should handle empty action fine', (done) => {
    store.dispatch();
    done();
  });
});
