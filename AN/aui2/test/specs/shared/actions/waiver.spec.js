import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/waiver';

const initialState = (specific = {}) => {
  const state = {
    waiver: fromJS({
      batchID: 101,
      receiptID: 102,
      permitID: 103
    }),
    permitSearch: fromJS({
      customer: {
        customer_id: 1
      },
      company: {
        agent_id: 2
      }
    })
  };
  return Object.assign(state, specific);
};

describe('shared/actions/waiver', () => {
  const PERMIT_DETAILS_CHANGED = 'PERMIT_DETAILS_CHANGED';
  let store;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState());
  });

  afterEach(() => {
    store.clearActions();
  });

  it('fetchWaiver method with parameter customerAndAgent works fine', () => {
    const {
      fetchWaiver,
      FETCH_WAIVER,
      FETCH_WAIVER_SUCCESS
    } = actions;

    const customerId = 1;
    const agentId = 2;
    store.dispatch(fetchWaiver({ customerId, agentId })).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(storeActions.some(action => action.type === FETCH_WAIVER)).toBe(true);
      expect(storeActions.some(action => action.type === FETCH_WAIVER_SUCCESS)).toBe(true);
      done();
    });
  });

  it('fetchWaiver method without parameter customerAndAgent works fine', () => {
    const {
      fetchWaiver,
      FETCH_WAIVER,
      FETCH_WAIVER_SUCCESS
    } = actions;

    store.dispatch(fetchWaiver()).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(storeActions.some(action => action.type === FETCH_WAIVER)).toBe(true);
      expect(storeActions.some(action => action.type === FETCH_WAIVER_SUCCESS)).toBe(true);
      done();
    });
  });

  it('fetchWaiver method without parameter available customerId/agentId works fine', (done) => {
    const {
      fetchWaiver
    } = actions;
    store.dispatch(fetchWaiver({}));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(0);
    done();
  });

  it('fetchWaiver method for new permit works fine', () => {
    const {
      fetchWaiver,
      FETCH_WAIVER,
      FETCH_WAIVER_SUCCESS
    } = actions;

    const mockStore = configureStore(middlewares);
    store = mockStore(initialState({
      waiver: fromJS({
        batchID: 101,
        receiptID: 102
      })
    }));

    const customerId = 1;
    const agentId = 2;
    store.dispatch(fetchWaiver({ customerId, agentId })).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(storeActions.some(action => action.type === FETCH_WAIVER)).toBe(true);
      expect(storeActions.some(action => action.type === FETCH_WAIVER_SUCCESS)).toBe(true);
      done();
    });
  });

  it('saveWaiver method works fine', () => {
    const {
      saveWaiver,
      SAVE_WAIVER,
      SAVE_WAIVER_SUCCESS
    } = actions;

    const params = {
      agreeto_waiver_checked: true
    };

    store.dispatch(saveWaiver(params, () => ({ type: PERMIT_DETAILS_CHANGED }), -1)).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(storeActions.some(action => action.type === SAVE_WAIVER)).toBe(true);
      expect(storeActions.some(action => action.type === SAVE_WAIVER_SUCCESS)).toBe(true);
      expect(storeActions.some(action => action.type === PERMIT_DETAILS_CHANGED)).toBe(true);
      done();
    });
  });

  it('saveWaiver method for event works fine', () => {
    const {
      saveWaiver,
      SAVE_WAIVER,
      SAVE_WAIVER_SUCCESS
    } = actions;

    const params = {
      agreeto_waiver_checked: true
    };

    store.dispatch(saveWaiver(params, () => ({ type: PERMIT_DETAILS_CHANGED }), 1)).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(storeActions.some(action => action.type === SAVE_WAIVER)).toBe(true);
      expect(storeActions.some(action => action.type === SAVE_WAIVER_SUCCESS)).toBe(true);
      expect(storeActions.some(action => action.type === PERMIT_DETAILS_CHANGED)).toBe(true);
      done();
    });
  });

  it('showWaiver method works fine', (done) => {
    const {
      showWaiver,
      SHOW_WAIVER
    } = actions;
    const show = true;
    store.dispatch(showWaiver(show));
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(SHOW_WAIVER);
    expect(storeAction.payload.isShow).toBe(show);
    done();
  });

  it('changeWaiver method works fine', (done) => {
    const {
      changeWaiver,
      CHANGE_WAIVER
    } = actions;
    const itemID = 12;
    const isInpermit = true;
    const signatureString = 'customer';
    store.dispatch(changeWaiver(itemID, isInpermit, signatureString));
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(CHANGE_WAIVER);
    expect(storeAction.payload.itemID).toBe(itemID);
    expect(storeAction.payload.isInpermit).toBe(isInpermit);
    expect(storeAction.payload.signatureString).toBe(signatureString);
    done();
  });

  it('saveWaiverErrorMessage method works fine', (done) => {
    const {
      saveWaiverErrorMessage,
      SAVE_WAIVER_ERROR_MESSAGE
    } = actions;
    const errorMsg = 'Waiver error message';
    store.dispatch(saveWaiverErrorMessage(errorMsg));
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(SAVE_WAIVER_ERROR_MESSAGE);
    expect(storeAction.payload.errorMsg).toBe(errorMsg);
    done();
  });

  it('setWaiverErrorMessage method works fine', (done) => {
    const {
      setWaiverErrorMessage,
      SET_WAIVER_ERROR_MESSAGE
    } = actions;
    const waiverIndex = 3;
    store.dispatch(setWaiverErrorMessage(waiverIndex));
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(SET_WAIVER_ERROR_MESSAGE);
    expect(storeAction.payload.waiverIndex).toBe(waiverIndex);
    done();
  });

  it('decorateWaiver method works fine', (done) => {
    const {
      decorateWaiver,
      DECORATE_WAIVER
    } = actions;
    const data = 'customer waiver';
    const hasNew = true;
    const eventIndex = 12;
    store.dispatch(decorateWaiver({ data, hasNew, eventIndex }));
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(DECORATE_WAIVER);
    expect(storeAction.payload.data).toBe(data);
    expect(storeAction.payload.hasNew).toBe(hasNew);
    expect(storeAction.payload.eventIndex).toBe(eventIndex);
    done();
  });

  it('changeWaiverByEventID method works fine', (done) => {
    const {
      changeWaiverByEventID,
      CHANGE_WAIVER_BY_EVENTID
    } = actions;
    const itemID = 12;
    const isInpermit = true;
    const signatureString = 'customer';
    const eventIndex = 12;
    const waiverIndex = 13;
    store.dispatch(
      changeWaiverByEventID(itemID, isInpermit, signatureString, eventIndex, waiverIndex));
    const storeActions = store.getActions();

    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions).toHaveLength(1);

    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(CHANGE_WAIVER_BY_EVENTID);
    expect(storeAction.payload.itemID).toBe(itemID);
    expect(storeAction.payload.isInpermit).toBe(isInpermit);
    expect(storeAction.payload.signatureString).toBe(signatureString);
    expect(storeAction.payload.eventIndex).toBe(eventIndex);
    expect(storeAction.payload.waiverIndex).toBe(waiverIndex);
    done();
  });

  it('loadAddableWaivers action works fine1', () => {
    const {
      loadAddableWaivers,
      HIDE_ADD_WAIVER_BUTTON,
    } = actions;

    const params = {
      batchID: '233',
      receiptID: '2432',
      permitEventId: '2353',
      eventIndex: '32434'
    };

    store.dispatch(loadAddableWaivers(params)).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.some(action => action.type === HIDE_ADD_WAIVER_BUTTON)).toBe(true);
      expect(storeActions.some(action => action.payload === '32434')).toBe(true);
    });
  });
});
