import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/loadingBar';

const initialState = fromJS({
  display: false,
  text: ''
});

describe('shared/actions/loadingBar', () => {
  let store;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('showLoadingbar method works fine', (done) => {
    const {
      showLoadingbar,
      LOADING_BAR_SHOW
    } = actions;

    store.dispatch(showLoadingbar());
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(LOADING_BAR_SHOW);
    done();
  });

  it('hideLoadingbar method works fine', (done) => {
    const {
      hideLoadingbar,
      LOADING_BAR_HIDE
    } = actions;

    store.dispatch(hideLoadingbar());
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(LOADING_BAR_HIDE);
    done();
  });
});
