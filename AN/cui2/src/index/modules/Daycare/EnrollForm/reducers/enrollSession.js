import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';
import {
  SESSIONS_UI_LIST,
  SESSIONS_DATE_UI_SELECTED,
  SESSIONS_DATE_UI_SUMMARY,
  EXCEPTION_DATES_UI,
  UPDATE_SESSIONS_MESSAGE_CODE,
  UPDATE_SESSIONS_STATUS
} from '../consts/actionTypes';
import { groupDatesById } from '../../Program/utils';
import updateSessions from '../util/updateSessions';

const initialState = fromJS({
  reservationUnit: 0,
  sessionsMessageCode: 0,
  individualSelection: false,
  sessions: [],
  exceptionDates: {},
  extraDates: {},
  selectedSessionIds: [],
  sessionDates: [],
  sessionDatesSummary: [],
  selectedSessionDateIds: [],
  unavailableSessionIds: []
});

const handlers = {
  [SESSIONS_UI_LIST](state, { payload: { sessionResult } }) {
    if (sessionResult) {
      const {
        reservation_unit: reservationUnit,
        allow_individual_selection: individualSelection,
        sessions_message_code: sessionsMessageCode,
        program_sessions: sessions,
        dc_enroll_dates: sessionDates,
        logined_customer_id: loginedCustomerId
      } = sessionResult;

      return state.withMutations((s) => {
        s.set('reservationUnit', reservationUnit);
        s.set('individualSelection', individualSelection);
        s.set('sessionsMessageCode', sessionsMessageCode);
        s.set('loginedCustomerId', loginedCustomerId);
        s.set('sessions', fromJS(sessions || []));
        s.set('selectedSessionIds', fromJS([]));
        s.set('sessionDates', fromJS(sessionDates || []));
        s.set('sessionDatesSummary', fromJS([]));
        s.set('selectedSessionDateIds', fromJS([]));
      });
    }
    return state;
  },

  [SESSIONS_DATE_UI_SELECTED](state, { payload: { sessionDateIds } }) {
    return state.set('selectedSessionDateIds', fromJS(sessionDateIds));
  },

  [SESSIONS_DATE_UI_SUMMARY](state, { payload: { sessionDatesSummary } }) {
    return state.set('sessionDatesSummary', fromJS(sessionDatesSummary || []));
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
  },

  [UPDATE_SESSIONS_MESSAGE_CODE](state, { payload: sessionsMessageCode }) {
    return state.set('sessionsMessageCode', sessionsMessageCode);
  },

  [UPDATE_SESSIONS_STATUS](state, { payload: { sessionsList, selectedSessionIds } }) {
    return state.withMutations((s) => {
      s.set('sessions', updateSessions(s.get('sessions'), sessionsList));
      s.set('selectedSessionIds', fromJS(selectedSessionIds));
    });
  }
};

export default reducerHandler(initialState, handlers);
