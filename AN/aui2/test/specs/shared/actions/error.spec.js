import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/Error';

const initialState = fromJS({
  list: [],
  systemErrors: [],
  businessErrors: []
});

describe('shared/actions/error', () => {
  let store;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('addError method works fine', (done) => {
    const {
      addError,
      ADD_ERROR
    } = actions;

    const code = 1050;
    const message = 'Total bookings of a permitxxx cannot exceed 700.';
    store.dispatch(addError({ payload: { code, message } }));
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(ADD_ERROR);

    const payload = storeAction.payload;
    expect(payload.code).toBe(code);
    expect(payload.message).toBe(message);
    expect(payload.isSystemError).toBe(false);
    done();
  });

  it('clearError method works fine', (done) => {
    const {
      clearError,
      CLEAR_ERROR
    } = actions;

    store.dispatch(clearError());
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(CLEAR_ERROR);
    done();
  });
});
