import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import enrollSessionReducer from 'index/modules/Daycare/EnrollForm/reducers/enrollSession';
import { NO_CHOICE } from 'index/modules/Daycare/EnrollForm/consts/reservationUnit';

describe('index/modules/Daycare/EnrollForm/reducers/sessions', () => {
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

  it('Should return the expected initial state', () => {
    const { SESSIONS_UI_LIST, EXCEPTION_DATES_UI } = actionTypes;

    expect(is(initialState, enrollSessionReducer(undefined, {}))).toBeTruthy();
    expect(is(initialState, enrollSessionReducer(initialState, {
      type: SESSIONS_UI_LIST,
      payload: {}
    }))).toBeTruthy();
    expect(is(initialState, enrollSessionReducer(initialState, {
      type: EXCEPTION_DATES_UI,
      payload: {}
    }))).toBeTruthy();
  });

  it('Should handle SESSIONS_UI_LIST correctly', () => {
    const { SESSIONS_UI_LIST } = actionTypes;
    const sessionResult = {
      allow_individual_selection: true,
      reservation_unit: 0,
      program_sessions: [{
        session_id: 37,
        session_name: 'UAT SESSION'
      }, {
        session_id: 38,
        session_name: 'UAT SESSION#2'
      }]
    };
    const returnState = enrollSessionReducer(initialState, {
      type: SESSIONS_UI_LIST,
      payload: { sessionResult }
    });

    expect(returnState.get('reservationUnit')).toEqual(NO_CHOICE);
    expect(returnState.get('individualSelection')).toBeTruthy();
    expect(returnState.get('sessions')).toHaveLength(2);
    expect(returnState.get('selectedSessionIds')).toHaveLength(0);
  });

  it('Should handle SESSIONS_UI_LIST correctly for empty response', () => {
    const { SESSIONS_UI_LIST } = actionTypes;
    const sessionResult = {
      allow_individual_selection: true,
      dc_enroll_dates: null,
      program_sessions: null,
      reservation_unit: 3
    };
    const returnState = enrollSessionReducer(initialState, {
      type: SESSIONS_UI_LIST,
      payload: { sessionResult }
    });

    expect(returnState.get('sessions').toJS()).toEqual([]);
  });

  it('Should handle SESSIONS_DATE_UI_SELECTED correctly', () => {
    const { SESSIONS_DATE_UI_SELECTED } = actionTypes;
    const sessionDateIds = [1, 2];
    const returnState = enrollSessionReducer(initialState, {
      type: SESSIONS_DATE_UI_SELECTED,
      payload: { sessionDateIds }
    });

    expect(returnState.get('selectedSessionDateIds')).toHaveLength(2);
  });

  it('Should handle SESSIONS_DATE_UI_SUMMARY correctly', () => {
    const { SESSIONS_DATE_UI_SUMMARY } = actionTypes;
    const sessionDatesSummary = [
      {
        start_date: 'Feb 17',
        start_time: '8:00 AM',
        end_date: 'Feb 23',
        end_time: '10:00 AM',
        days_of_week: 'Wed, Fri',
        dc_session_date_ids: [
          3878,
          3879
        ]
      },
      {
        start_date: 'Feb 17',
        start_time: '8:00 AM',
        end_date: 'Feb 23',
        end_time: '10:00 AM',
        days_of_week: 'Fri',
        dc_session_date_ids: [
          3865
        ]
      }
    ];
    const returnState = enrollSessionReducer(initialState, {
      type: SESSIONS_DATE_UI_SUMMARY,
      payload: { sessionDatesSummary }
    });

    expect(returnState.get('sessionDatesSummary')).toHaveLength(2);
  });

  it('Should handle SESSIONS_DATE_UI_SUMMARY correctly', () => {
    const { SESSIONS_DATE_UI_SUMMARY } = actionTypes;
    const returnState = enrollSessionReducer(initialState, {
      type: SESSIONS_DATE_UI_SUMMARY,
      payload: ''
    });

    expect(returnState.get('sessionDatesSummary')).toHaveLength(0);
  });

  it('should handle EXCEPTION_DATES_UI correctly', () => {
    const { EXCEPTION_DATES_UI } = actionTypes;
    const responseDates = [
      {
        session_id: 60,
        extra_dates: [
          '22 Nov 2018',
          '01 Dec 2018'
        ],
        exception_dates: ['25,26,27 Nov 2018']
      },
      {
        session_id: 61,
        exception_dates: ['25,26 Nov 2018']
      }
    ];
    const returnState = enrollSessionReducer(initialState, {
      type: EXCEPTION_DATES_UI,
      payload: { dates: responseDates }
    });
    const extraDatesObj = returnState.get('extraDates').toJS();
    expect(Object.keys(extraDatesObj)).toHaveLength(1);
    expect(extraDatesObj[60]).toEqual('22 Nov 2018 / 01 Dec 2018');
    const exceptionDatesObj = returnState.get('exceptionDates').toJS();
    expect(Object.keys(exceptionDatesObj)).toHaveLength(2);
    expect(exceptionDatesObj[60]).toEqual('25,26,27 Nov 2018');
    expect(exceptionDatesObj[61]).toEqual('25,26 Nov 2018');
  });

  it('Should handle UPDATE_SESSIONS_MESSAGE_CODE correctly', () => {
    const { UPDATE_SESSIONS_MESSAGE_CODE } = actionTypes;
    const returnState = enrollSessionReducer(initialState, {
      type: UPDATE_SESSIONS_MESSAGE_CODE,
      payload: 12
    });
    console.log('returnState', returnState);
    expect(returnState.get('sessionsMessageCode')).toEqual(12);
  });

  it('Should handle UPDATE_SESSIONS_STATUS correctly', () => {
    const { UPDATE_SESSIONS_STATUS } = actionTypes;
    const initData = {
      sessions: [{
        session_id: 37,
        ending_time: '10:20 AM',
        beginning_time: '10:00 AM',
        is_check: false,
        days_of_week: 'Sun, Mon, Tues, Wed, Thurs, Sat',
        session_name: 'UAT SESSION',
        last_date: 'Feb 28, 2019',
        is_enable: true,
        weeks_of_month: '1st, 2nd, 3rd, last week of every month',
        session_status: 12,
        description: 'LIKE U SEE IT\'S USED FOR UAT.',
        first_date: 'Feb 1, 2019'
      }]
    };

    const sessionsList = [{
      session_id: 37,
      session_status: 6,
      partially_full_dates: ['18,19,20 Jul 2018', '21 Aug 2019'],
      waitlisted_enrolled_dates: ['18,19 Jul 2019', '21 Aug 2019'],
      is_check: true,
      is_enable: true
    }];

    const expectResult = [{
      session_id: 37,
      ending_time: '10:20 AM',
      beginning_time: '10:00 AM',
      is_check: true,
      days_of_week: 'Sun, Mon, Tues, Wed, Thurs, Sat',
      session_name: 'UAT SESSION',
      last_date: 'Feb 28, 2019',
      is_enable: true,
      weeks_of_month: '1st, 2nd, 3rd, last week of every month',
      session_status: 6,
      description: 'LIKE U SEE IT\'S USED FOR UAT.',
      first_date: 'Feb 1, 2019',
      partially_full_dates: ['18,19,20 Jul 2018', '21 Aug 2019'],
      waitlisted_enrolled_dates: ['18,19 Jul 2019', '21 Aug 2019']
    }];

    const returnState = enrollSessionReducer(fromJS(initData), {
      type: UPDATE_SESSIONS_STATUS,
      payload: { sessionsList, selectedSessionIds: [1, 2, 3] }
    });

    expect(returnState.get('sessions')).toEqual(fromJS(expectResult));
    expect(returnState.get('selectedSessionIds')).toEqual(fromJS([1, 2, 3]));
  });
});
