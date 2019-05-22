import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Reservation/actions/permitGrid';
import first from 'lodash/first';
import some from 'lodash/some';
import {
  getMockActions,
  mockDispatch,
  setMockDispatchRejectResponse,
  clearMockActions,
  clearMockDispatchRejectResponse,
} from 'utils/mockDispatch';
import mockAPI from 'utils/mockAPI';

describe('index/Reservation/actions/permitGrid', () => {

  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('selectPermit should works fine, if perimit has permit_id', (done) => {
    const { selectPermit, SELECT_PERMIT, FETCH_PERMIT_STATUS_LIST } = actions;
    const permit = { permit_id: 1076 };
    const action = store.dispatch(selectPermit(permit));
    const storeActions = store.getActions();

    expect(action.type).toBe(SELECT_PERMIT);
    expect(action.payload.value).toBe(permit);

    expect(storeActions.length).toBeGreaterThanOrEqual(2);
    expect(some(storeActions, ['type', FETCH_PERMIT_STATUS_LIST])).toBe(true);
    expect(some(storeActions, ['type', SELECT_PERMIT])).toBe(true);
    done();
  });

  it('selectPermit should works fine, if perimit does not has permit_id', () => {
    const { selectPermit, SELECT_PERMIT } = actions;
    store.dispatch(selectPermit({ permit_status: 'Deny' }));

    const storeActions = store.getActions();
    expect(storeActions.length).toBe(1);
    expect(storeActions[0]).toEqual({
      type: SELECT_PERMIT,
      payload: {
        value: {
          permit_status: 'Deny'
        }
      }
    });
  });

  it('isPermitAccessible should work fine', () => {
    const { isPermitAccessible } = actions;
    return store.dispatch(isPermitAccessible(1))
      .then(() => {
        const storeActions = store.getActions();
        const action = first(storeActions);

        expect(typeof action).toBe('object');
      });
  });

  it('isPermitAccessible should work fine if return accessible', () => {
    mockAPI({
      path: '/json/Bookings/isPermitLock.json',
      result: {
        headers: { response_code: '0000' },
        body: { is_permit_accessible: "true" }
      }
    });
    jest.useFakeTimers();
    const { isPermitAccessible, IS_PERMIT_LOCK_SUCCESS } = actions;
    return store.dispatch(isPermitAccessible(1))
      .then(() => {
        jest.runTimersToTime(100);
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type === IS_PERMIT_LOCK_SUCCESS)).toBeTruthy();
        jest.clearAllTimers();
      });
  });

  it('fetchPermitEventInfo should work fine', (done) => {
    const { fetchPermitEventInfo, FETCH_PERMIT_EVENT_INFO } = actions;
    store.dispatch(fetchPermitEventInfo(1));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === FETCH_PERMIT_EVENT_INFO)).toBe(true);
    done();
  });

  it('fetchPermitEventInfo should work fine when in production.', (done) => {
    const { fetchPermitEventInfo, FETCH_PERMIT_EVENT_INFO } = actions;
    __STATIC__ = false;

    store.dispatch(fetchPermitEventInfo(1)).catch(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).toBe(3);
      expect(storeActions[0].type === FETCH_PERMIT_EVENT_INFO).toBe(true);
      expect(storeActions[1].type).toEqual('ADD_ERROR');
      expect(storeActions[1].payload).toEqual({
        code: 404,
        message: null,
        isSystemError: true
      });
      expect(storeActions[2].error.payload).toEqual({
        headers: {
          response_code: 404,
          response_message: null
        }
      });
      done();
    })
  });

  it('fetchPermits should work fine', () => {
    const { fetchPermits, FETCH_PERMITS, FETCH_PERMITS_SUCCESS } = actions;
    return store.dispatch(fetchPermits())
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type === FETCH_PERMITS)).toBeTruthy();
        expect(storeActions.some(action => action.type === FETCH_PERMITS_SUCCESS)).toBeTruthy();
      });
  });

  it('changePage should work fine', () => {
    const { changePage, CHANGE_PERMITS_PAGE } = actions;
    const pageNumber = 2;
    const action = store.dispatch(changePage(pageNumber));
    expect(action.type).toEqual(CHANGE_PERMITS_PAGE);
    expect(action.payload.value).toEqual(pageNumber);
  });

  it('changeSort should work fine', () => {
    const { changeSort, CHANGE_PERMITS_SORT } = actions;
    const action = store.dispatch(changeSort());
    expect(action.type).toEqual(CHANGE_PERMITS_SORT);
    const { orderOption, orderBy } = action.payload.value;
    expect(orderOption).toEqual('');
    expect(orderBy).toEqual('');
  });

  it('changePageThenFetchPermits should work fine', () => {
    const { changePageThenFetchPermits, CHANGE_PERMITS_PAGE, FETCH_PERMITS, FETCH_PERMITS_SUCCESS } = actions;
    const pageNumber = 3;
    return store.dispatch(changePageThenFetchPermits(pageNumber, {}))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type === CHANGE_PERMITS_PAGE)).toBeTruthy();
        expect(storeActions.some(action => action.type === FETCH_PERMITS)).toBeTruthy();
        expect(storeActions.some(action => action.type === FETCH_PERMITS_SUCCESS)).toBeTruthy();
      });
  });

  it('fetchPermitEventInfo should work fine if promise reject', (done) => {
    const {
      fetchPermitEventInfo,
      FETCH_PERMIT_EVENT_INFO_SUCCESS,
      FETCH_PERMIT_EVENT_INFO_FAILURE
    } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore({});

    setMockDispatchRejectResponse({
      payload: {
        headers: {
          response_code: '1050',
          response_message: 'unknown error'
        }
      }
    });

    mockDispatch(fetchPermitEventInfo(113), {}, true)
      .catch(() => {
        const storeActions = getMockActions();
        expect(storeActions.some(action => action.type === FETCH_PERMIT_EVENT_INFO_SUCCESS)).toBeFalsy();
        expect(storeActions.some(action => action.type === FETCH_PERMIT_EVENT_INFO_FAILURE)).toBeTruthy();

        const { code, message, permitId } = storeActions[1].payload.value;
        expect(code).toEqual('1050');
        expect(message).toEqual('unknown error');
        expect(permitId).toEqual(113);

        clearMockActions();
        clearMockDispatchRejectResponse();
        done();
      });
  });

  it('fetchPermitEventInfo should work fine if system error', (done) => {
    const {
      fetchPermitEventInfo,
      FETCH_PERMIT_EVENT_INFO_SUCCESS,
      FETCH_PERMIT_EVENT_INFO_FAILURE
    } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore({});

    setMockDispatchRejectResponse({
      payload: {
        headers: {
          response_code: '0010',
          response_message: 'system error'
        }
      }
    });

    mockDispatch(fetchPermitEventInfo(113), {}, true)
      .catch(() => {
        const storeActions = getMockActions();
        expect(storeActions.some(action => action.type === FETCH_PERMIT_EVENT_INFO_SUCCESS)).toBeFalsy();
        expect(storeActions.some(action => action.type === FETCH_PERMIT_EVENT_INFO_FAILURE)).toBeFalsy();

        clearMockActions();
        clearMockDispatchRejectResponse();
        done();
      });
  });
});
