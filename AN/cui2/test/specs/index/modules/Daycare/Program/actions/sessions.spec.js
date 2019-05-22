import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import {
  fetchSessions,
  fetchExceptionDates
} from 'index/modules/Daycare/Program/actions/sessions';
import {
  SESSIONS_UI,
  EXCEPTION_DATES_UI
} from 'index/modules/Daycare/Program/consts/actionTypes';

describe('index/modules/Daycare/Program/actions/sessions', () => {
  let store = null;

  const initialState = {
    modules: {
      Daycare: {
        Program: {
          sessions: fromJS([])
        }
      }
    }
  };


  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchsessions', () => {
    it('Should return expected Action Object.', (done) => {
      store.dispatch(fetchSessions(435)).then(() => {
        expect(helper.isIncluding([
          {
            type: SESSIONS_UI
          }], store.getActions())).toBeTruthy();
        done();
      });
    });
  });

  it('fetchExceptionDates works fine', (done) => {
    return store.dispatch(fetchExceptionDates(1)).then(() => {
      expect(helper.isIncluding([{ type: EXCEPTION_DATES_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });
});
