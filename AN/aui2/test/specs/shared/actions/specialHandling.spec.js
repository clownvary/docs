import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/specialHandling';

describe('shared/actions/specialHandling', () => {
  let store;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(fromJS({}));
  });

  afterEach(() => {
    store.clearActions();
  });

  it('resetSpecialHandling method works fine', () => {
    const { resetSpecialHandling, RESET_SPECIAL_HANDLING } = actions;
    store.dispatch(resetSpecialHandling());
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);
    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(RESET_SPECIAL_HANDLING);
  });

  it('closeSpecialHandlingAlert method works fine', () => {
    const { closeSpecialHandlingAlert, TOGGLE_SPECIAL_HANDLING } = actions;
    store.dispatch(closeSpecialHandlingAlert());
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);
    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(TOGGLE_SPECIAL_HANDLING);
    expect(storeAction.payload.shown).toBe(false);
  });

  it('fetchSpecialHandlingStatus method works fine', () => {
    const {
      fetchSpecialHandlingStatus,
      FETCH_SPECIAL_HANDLING_STATUS_SUCCESS,
      FETCH_SPECIAL_HANDLING_INFO_SUCCESS
    } = actions;

    return store
      .dispatch(fetchSpecialHandlingStatus('1156', true))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === FETCH_SPECIAL_HANDLING_STATUS_SUCCESS)).toBeTruthy();
        expect(storeActions.some(action => action.type === FETCH_SPECIAL_HANDLING_INFO_SUCCESS)).toBeTruthy();
      });
  });
});
