import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import {
  FETCH_RUNNINGCART,
  FETCH_RUNNINGCART_SUCCESS,
  fetchRunningCart,
  loadRunningCart
} from 'shared/actions/runningCart';
import { ADD_ERROR } from 'shared/actions/Error';
import {
  clearMockActions,
  clearMockDispatchRejectResponse,
  getMockActions,
  mockDispatch,
  setMockDispatchRejectResponse
} from '../../../utils/mockDispatch';

describe('shared -> actions -> runningCart', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
    clearMockDispatchRejectResponse();
  });

  it('loadRunningCart should works fine', (done) => {
    store.dispatch(loadRunningCart())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions).toHaveLength(2);
        expect(myActions[0].type).toBe(FETCH_RUNNINGCART);
        expect(myActions[1].type).toBe(FETCH_RUNNINGCART_SUCCESS);
        done()
      });
  });

  it('fetchRunningCart should works fine', (done) => {
    store.dispatch(fetchRunningCart())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions).toHaveLength(2);
        expect(myActions[0].type).toBe(FETCH_RUNNINGCART);
        expect(myActions[1].type).toBe(FETCH_RUNNINGCART_SUCCESS);
        done();
      });
  });

  it('loadRunningCart encountered error with code 0002 works fine', (done) => {
    setMockDispatchRejectResponse({ payload: { headers: {
      response_code: '0002',
      response_message: 'session timeout'
    } } });
    mockDispatch(loadRunningCart(), { loading: fromJS({ display: false }) }, true).then(() => {
      const mockActions = getMockActions();
      expect(mockActions[0].types.some(type => type === FETCH_RUNNINGCART)).toBe(true);
      expect(mockActions[1].type).toBe(ADD_ERROR);
      done();
    });
  });

  it('loadRunningCart encountered error with code which is not 0002 works fine', (done) => {
    setMockDispatchRejectResponse({ payload: { headers: {
      response_code: '0003',
      response_message: 'session timeout'
    } } });
    mockDispatch(loadRunningCart(), { loading: fromJS({ display: false }) }, true).then(() => {
      const mockActions = getMockActions();
      expect(mockActions).toHaveLength(1);
      expect(mockActions[0].types.some(type => type === FETCH_RUNNINGCART)).toBe(true);
      done();
    });
  });
});
