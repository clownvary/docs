import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/Program/consts/actionTypes';
import sessionsReducer from 'index/modules/Daycare/Program/reducers/sessions';

import sessionsJson from 'Daycare/Program/get_sessions.json';

describe('index/modules/Daycare/Program/reducers/sessions', () => {
  const initialState = fromJS({
    fetched: false,
    sessions: [],
    sessionUnavailable: false,
    exceptionDates: {},
    extraDates: {}
  });

  const sessions = sessionsJson.body.program_sessions;

  it('Should return the expected initial state', () => {
    expect(is(initialState, sessionsReducer(undefined, {}))).toBeTruthy();
  });

  it('Should return the fetched state if response of fetching session is empty', () => {
    const { SESSIONS_UI } = actionTypes;

    const returnState = sessionsReducer(initialState, {
      type: SESSIONS_UI,
      payload: {}
    });
    const fetchedState = initialState.set('fetched', true);
    expect(is(fetchedState, returnState)).toBeTruthy();
  });

  it('Should save session correctly', () => {
    const { SESSIONS_UI } = actionTypes;

    const returnState = sessionsReducer(initialState, {
      type: SESSIONS_UI,
      payload: { sessions, sessionUnavailable: true }
    });

    expect(returnState.get('fetched')).toBeTruthy();
    expect(returnState.get('sessions').toJS()).toEqual(sessions);
    expect(returnState.get('sessionUnavailable')).toBeTruthy();
  });

  it('Should return the initial state if response of fetching exception extra date is empty', () => {
    const { EXCEPTION_DATES_UI } = actionTypes;

    const returnState = sessionsReducer(initialState, {
      type: EXCEPTION_DATES_UI,
      payload: {}
    });

    expect(is(initialState, returnState)).toBeTruthy();
  });

  it('Should save exception extra date correctly', () => {
    const { EXCEPTION_DATES_UI } = actionTypes;

    const returnState = sessionsReducer(initialState, {
      type: EXCEPTION_DATES_UI,
      payload: {
        dates: [
          {
            session_id: 60,
            extra_dates: ['22 Nov 2018'],
            exception_dates: ['27 Nov 2018']
          },
          {
            session_id: 61,
            exception_dates: ['25,26,27 Nov 2018']
          }
        ]
      }
    });

    expect(Object.keys(returnState.get('exceptionDates').toJS())).toHaveLength(2);
    expect(Object.keys(returnState.get('extraDates').toJS())).toHaveLength(1);
  });
});
