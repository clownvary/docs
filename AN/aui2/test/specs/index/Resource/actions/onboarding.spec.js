import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import * as actions from 'index/Resource/actions/onboarding';
import { mockDispatch, getMockActions, clearMockActions } from '../../../../utils/mockDispatch';

describe('index/Resource/actions/onboarding', () => {
  let store = null;
  let API = {
    get: null,
    post: null
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
    API.get = jest.fn();
    API.post = jest.fn();
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
    API = {
      get: null,
      post: null
    };
  });

  it('fetchOnBoarding should work fine', () => {
    const { fetchOnBoarding, FETCH_ON_BOARDING_SUCCESS } = actions;

    return store.dispatch(fetchOnBoarding())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'FETCH_ON_BOARDING_SUCCESS')).toBeTruthy();
      });
  });

  it('updateOnBoarding should work fine', () => {
    const { updateOnBoarding, UPDATE_ON_BOARDING_SUCCESS } = actions;

    return store.dispatch(updateOnBoarding())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
           === 'UPDATE_ON_BOARDING_SUCCESS')).toBeTruthy();
      });
  });

  it('readyOnBoarding should work fine', () => {
    const { READY_ON_BOARDING, readyOnBoarding } = actions;

    store.dispatch(readyOnBoarding());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(READY_ON_BOARDING);
  });
});
