import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/skylogix';
import UPDATE_SKYLOGIX_SUCCESS from 'shared/consts/skylogixTypes';

const initialState = fromJS({
  showLightingPINRequired: false,
  isLightingPINRequired: false
});

describe('shared/actions/skylogix', () => {
  const PERMIT_DETAILS_CHANGED = 'PERMIT_DETAILS_CHANGED';

  let store;
  const logixVal = { lightingPIN: true };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('skylogixValueChange method works fine', (done) => {
    const {
      skylogixValueChange
    } = actions;
    store.dispatch(skylogixValueChange(logixVal));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);
    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(UPDATE_SKYLOGIX_SUCCESS);
    expect(storeAction.payload.lightingPIN).toBe(true);
    done();
  });

  it('updateSkylogix method works fine', () => {
    const {
      updateSkylogix
    } = actions;

    return store.dispatch(updateSkylogix(logixVal, () => ({ type: PERMIT_DETAILS_CHANGED }))).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions).toHaveLength(2);
      expect(storeActions[0].type).toBe(UPDATE_SKYLOGIX_SUCCESS);
      expect(storeActions[0].payload.lightingPIN).toBe(true);
      expect(storeActions[1].type).toBe(PERMIT_DETAILS_CHANGED);
    });
  });
});
