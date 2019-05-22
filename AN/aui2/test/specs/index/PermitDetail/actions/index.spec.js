import first from 'lodash/first';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/PermitDetail/actions/index';

describe('index -> PermitDetail -> actions -> index', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('setWaiverErrors should works fine', (done) => {
    const { setWaiverErrors } = actions;
    const value = true;
    store.dispatch(setWaiverErrors())
    const action = first(store.getActions());
    expect(action).toBeInstanceOf(Object);
    expect(action.type).toEqual(actions.SET_WAIVER_ERRORS);
    expect(typeof action.payload.errors).toEqual('object');
    done();
  });

  it('setWaiverErrors should works fine', (done) => {
    const { setWaiverErrors } = actions;
    store.dispatch(setWaiverErrors({}))
    const action = first(store.getActions());
    expect(action).toBeInstanceOf(Object);
    expect(action.type).toEqual(actions.SET_WAIVER_ERRORS);
     expect(action.payload.errors).toEqual({});
    done();
  });

  it('permitDetailsChanged should works fine', () => {
    const { permitDetailsChanged, PERMIT_DETAILS_CHANGED } = actions;
    store.dispatch(permitDetailsChanged());

    const action = first(store.getActions());
    expect(action).toBeInstanceOf(Object);
    expect(action.type).toEqual(PERMIT_DETAILS_CHANGED);
  });

  it('fetchReady4Checkout should works fine', () => {
    const { fetchReady4Checkout, FETCH_READY4CHECKOUT_SUCCESS } = actions;

    return store.dispatch(fetchReady4Checkout('batchID', 'receiptID'))
     .then(({ payload: { body: { ready4checkout } } }) => {
       const storeActions = store.getActions();
       expect(storeActions.some(action => action.type === FETCH_READY4CHECKOUT_SUCCESS))
             .toEqual(true);
       expect(ready4checkout).toEqual('false');
     });
  });

  it('fetchInCart should works fine', () => {
    const { fetchInCart, FETCH_INCART_SUCCESS } = actions;

    return store.dispatch(fetchInCart('batchID', 'receiptID'))
     .then(({ payload: { body: { in_cart } } }) => {
       const storeActions = store.getActions();
       expect(storeActions.some(action => action.type === FETCH_INCART_SUCCESS))
             .toEqual(true);
       expect(in_cart).toBeFalsy();
     });
  });
});
