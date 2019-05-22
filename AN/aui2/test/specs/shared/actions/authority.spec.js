import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/Authority';
import { ADD_ERROR } from 'shared/actions/Error';

const initialState = fromJS({
  authorities: []
});

describe('shared/actions/authority', () => {
  let store;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('raiseUnrecognizedAuthCode method works fine', (done) => {
    const {
      raiseUnrecognizedAuthCode
    } = actions;

    const module = 'invalid-module-name';
    store.dispatch(raiseUnrecognizedAuthCode(module));
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(ADD_ERROR);

    const payload = storeAction.payload;
    expect(payload.message).toBe(
      `unrecognized authority type for ${module}, please contract administrator.`
    );
    done();
  });
});
