import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';
import { groupDatesById } from '../utils';

import {
  SESSIONS_UI,
  EXCEPTION_DATES_UI
} from '../consts/actionTypes';

const initialState = fromJS({
  fetched: false,
  sessions: [],
  sessionUnavailable: false,
  exceptionDates: {},
  extraDates: {}
});

const handlers = {
  [SESSIONS_UI](state, { payload: { sessions, sessionUnavailable } }) {
    if (sessions) {
      return state.withMutations((s) => {
        s.set('fetched', true);
        s.set('sessions', fromJS(sessions));
        s.set('sessionUnavailable', sessionUnavailable);
      });
    }
    return state.set('fetched', true);
  },
  [EXCEPTION_DATES_UI](state, { payload: { dates } }) {
    if (dates) {
      const exceptionDates = groupDatesById(dates, 'exception_dates', 'session_id');
      const extraDates = groupDatesById(dates, 'extra_dates', 'session_id');
      return state.withMutations((s) => {
        s.set('exceptionDates', fromJS(exceptionDates));
        s.set('extraDates', fromJS(extraDates));
      });
    }
    return state;
  }
};

export default reducerHandler(initialState, handlers);
