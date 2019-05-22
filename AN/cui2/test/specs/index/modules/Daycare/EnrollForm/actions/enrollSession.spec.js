import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import {
  fetchEnrollSessions,
  selectEnrollSession,
  fetchExceptionDatesAsyncAction
} from 'index/modules/Daycare/EnrollForm/actions/enrollSession';

jest.mock('react-base-ui/lib/services/dialog', () => ({
  confirm: () => Promise.resolve()
}));

describe('index/modules/Daycare/EnrollForm/actions/enrollSession', () => {
  let store = null;
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  const selectEnrollSeesionParams = { ids: [11, 13], programId: 45, reno: 1, messages: { confirmMsg: {}, notesMsg: {} } };

  it('fetchEnrollSessions works fine', (done) => {
    const { SESSIONS_UI_LIST, SECTION_EXPAND_UI } = actionTypes;
    store.dispatch(fetchEnrollSessions(1, 2)).then(() => {
      expect(helper.isIncluding([{ type: SESSIONS_UI_LIST }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: SECTION_EXPAND_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  it('selectEnrollSession works fine for no choice', () => {
    const { RECEIPT_NUMBER } = actionTypes;
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            participants: fromJS({
              validId: 12861
            }),
            enrollSession: fromJS({
              reservationUnit: 0,
              individualSelection: true,
              sessions: [{ session_id: 11 }, { session_id: 13 }],
              selectedSessionIds: []
            }),
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });

    const selectSessionParams = { ids: [37, 35], programId: 45, reno: 1, messages: { confirmMsg: {}, notesMsg: {} } };
    return store.dispatch(selectEnrollSession(selectSessionParams))
      .then(() => {
        expect(helper.isIncluding([{ type: RECEIPT_NUMBER }],
          store.getActions())).toBeTruthy();
        expect(store.getActions()[3].payload.selectedSessionIds).toEqual([35]);
      });
  });

  it('when sessions_status is null selectEnrollSession works fine for weekly', (done) => {
    const {
      RECEIPT_NUMBER, SESSIONS_DATE_UI_SELECTED, SESSIONS_DATE_UI_SUMMARY,
      FORM_ERROR_CLEAN_UI, FEE_SUMMARY_UI
    } = actionTypes;
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            participants: fromJS({
              validId: 12861
            }),
            enrollSession: fromJS({
              reservationUnit: 3,
              individualSelection: true,
              sessions: [],
              selectedSessionIds: [],
              sessionDates: [
                {
                  dc_session_date_id: 3878,
                  dc_session_id: 38,
                  session_date: '2019 Feb 15'
                },
                {
                  dc_session_date_id: 3879,
                  dc_session_id: 38,
                  session_date: '2019 Feb 18'
                },
                {
                  dc_session_date_id: 3865,
                  dc_session_id: 40,
                  session_date: '2019 Feb 22'
                }
              ],
              sessionDatesSummary: [
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
              ],
              selectedSessionDateIds: [3878, 3879, 3865]
            }),
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });

    return new Promise((resolve, reject) => {
      mockAPI([
        {
          path: '/test/json/Daycare/EnrollForm/set_sessions.json',
          result: {
            headers: {
              response_code: '0000',
              response_message: 'Succeesul',
              page_info: {
                order_by: '',
                total_records_per_page: 30,
                total_records: 0,
                page_number: 1,
                total_page: 1,
                order_option: 'ASC'
              }
            },
            body: {
              selected_session_validation: {
                reno: 1,
                sessions_message_code: 1,
                selected_session_date_summary: [
                  {
                    start_date: 'Dec 30',
                    start_time: '8:00 AM',
                    end_date: 'Jan 5',
                    end_time: '9:00 AM',
                    days_of_week: 'Mon, Tue',
                    dc_session_date_ids: [
                      23490, 23291
                    ]
                  }
                ],
                sessions_status: null,
                unavailable_session_ids: null
              }
            }
          }
        }
      ], () => store.dispatch(selectEnrollSession(selectEnrollSeesionParams)).then(() => {
        expect(helper.isIncluding([{ type: RECEIPT_NUMBER }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: SESSIONS_DATE_UI_SELECTED }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: SESSIONS_DATE_UI_SUMMARY }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: FORM_ERROR_CLEAN_UI }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: FEE_SUMMARY_UI }],
          store.getActions())).toBeTruthy();
        resolve();
        done();
      }, () => {
        reject();
      }));
    });
  });


  it('selectEnrollSession works fine for weekly', () => {
    const { SESSIONS_DATE_UI_SELECTED, SESSIONS_DATE_UI_SUMMARY, RECEIPT_NUMBER } = actionTypes;
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            participants: fromJS({
              validId: 12861
            }),
            enrollSession: fromJS({
              reservationUnit: 3,
              individualSelection: true,
              sessions: [],
              selectedSessionIds: [],
              sessionDates: [
                {
                  dc_session_date_id: 3878,
                  dc_session_id: 38,
                  session_date: '2019 Feb 15'
                },
                {
                  dc_session_date_id: 3879,
                  dc_session_id: 38,
                  session_date: '2019 Feb 18'
                },
                {
                  dc_session_date_id: 3865,
                  dc_session_id: 40,
                  session_date: '2019 Feb 22'
                }
              ],
              sessionDatesSummary: [
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
              ],
              selectedSessionDateIds: [3878, 3879, 3865]
            }),
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });

    return store.dispatch(selectEnrollSession(selectEnrollSeesionParams)).then(() => {
      expect(helper.isIncluding([{ type: SESSIONS_DATE_UI_SELECTED }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: SESSIONS_DATE_UI_SUMMARY }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: RECEIPT_NUMBER }],
        store.getActions())).toBeTruthy();
    });
  });

  it('selectEnrollSession works fine for other case', () => {
    const { SESSIONS_DATE_UI_SELECTED, RECEIPT_NUMBER } = actionTypes;
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            participants: fromJS({
              validId: 12861
            }),
            enrollSession: fromJS({
              reservationUnit: 4,
              individualSelection: true,
              sessions: [],
              selectedSessionIds: [],
              sessionDates: [],
              sessionDatesSummary: [],
              selectedSessionDateIds: []
            }),
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });

    return store.dispatch(selectEnrollSession(selectEnrollSeesionParams)).then(() => {
      expect(helper.isIncluding([{ type: SESSIONS_DATE_UI_SELECTED }],
        store.getActions())).toBeFalsy();
      expect(helper.isIncluding([{ type: RECEIPT_NUMBER }],
        store.getActions())).toBeTruthy();
    });
  });

  it('selectEnrollSession works fine for other case', () => {
    const { SESSIONS_DATE_UI_SELECTED, RECEIPT_NUMBER } = actionTypes;
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            participants: fromJS({
              validId: 12861
            }),
            enrollSession: fromJS({
              reservationUnit: 4,
              individualSelection: true,
              sessions: [],
              selectedSessionIds: [],
              sessionDates: [],
              sessionDatesSummary: [],
              selectedSessionDateIds: []
            }),
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });

    return store.dispatch(selectEnrollSession(selectEnrollSeesionParams)).then(() => {
      expect(helper.isIncluding([{ type: SESSIONS_DATE_UI_SELECTED }],
        store.getActions())).toBeFalsy();
      expect(helper.isIncluding([{ type: RECEIPT_NUMBER }],
        store.getActions())).toBeTruthy();
    });
  });

  it('selectEnrollSession should works fine', () => {
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            participants: fromJS({
              validId: 12861
            }),
            enrollSession: fromJS({
              reservationUnit: 0,
              individualSelection: true,
              sessions: [],
              selectedSessionIds: [],
              sessionDates: [],
              sessionDatesSummary: [],
              selectedSessionDateIds: []
            }),
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });
    mockAPI({
      path: '/test/json/Daycare/EnrollForm/set_sessions.json',
      result: {
        headers: {
          response_code: '0000',
          response_message: 'There are incomplete transacions in the cart.'
        },
        body: {
          selected_session_validation: {
            unavailable_session_ids: [1],
            sessions_status: [{ is_enable: true }]
          }
        }
      }
    }, () => {
      const result = store.dispatch(selectEnrollSession({ messages: { confirmMsg: {}, notesMsg: {} } }));
      expect(typeof result).toEqual('object');
    });
  });

  it('selectEnrollSession should handle 4095 correctly', () => {
    let results = [];
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            participants: fromJS({
              validId: 12861
            }),
            enrollSession: fromJS({
              reservationUnit: 0,
              individualSelection: true,
              sessions: [],
              selectedSessionIds: [],
              sessionDates: [],
              sessionDatesSummary: [],
              selectedSessionDateIds: []
            }),
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });

    mockAPI({
      path: '/test/json/Daycare/EnrollForm/set_sessions.json',
      result: {
        headers: {
          response_code: '4095',
          response_message: 'Can\'t find receipt entry in shopping cart.'
        },
        body: {
          selected_session_validation: {
            unavailable_session_ids: [1],
            sessions_status: []
          }
        }
      }
    }, () => {
      const result1 = store.dispatch(selectEnrollSession({
        messages: {
          confirmMsg: {},
          notesMsg: { title: 'title', detail: 'detail' }
        }
      })).catch((errorResponse) => {
        expect(errorResponse.message.title).toBe('title');
        expect(errorResponse.message.details).toEqual(['detail']);
      });

      results.push(result1);
    });

    mockAPI({
      path: '/test/json/Daycare/EnrollForm/set_sessions.json',
      result: {
        headers: {
          response_code: '4096',
          response_message: 'Can\'t find receipt entry in shopping cart.'
        },
        body: {
          selected_session_validation: {
            unavailable_session_ids: [1],
            sessions_status: []
          }
        }
      }
    }, () => {
      const result2 = store.dispatch(selectEnrollSession({
        messages: {
          confirmMsg: {},
          notesMsg: { title: 'title', detail: 'detail' }
        }
      })).catch((errorResponse) => {
        expect(errorResponse.data.code).toBe('4096');
      });

      results.push(result2);
    });

    return Promise.all(results);
  });

  it('selectEnrollSession should works fine', () => {
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            participants: fromJS({
              validId: 12861
            }),
            enrollSession: fromJS({
              reservationUnit: 0,
              individualSelection: true,
              sessions: [],
              selectedSessionIds: [],
              sessionDates: [],
              sessionDatesSummary: [],
              selectedSessionDateIds: []
            }),
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });
    mockAPI({
      path: '/test/json/Daycare/EnrollForm/set_sessions.json',
      result: {
        headers: {
          response_code: '0000',
          response_message: 'There are incomplete transacions in the cart.'
        },
        body: {
          selected_session_validation: {
            unavailable_session_ids: [1],
            sessions_status: []
          }
        }
      }
    }, () => {
      const result = store.dispatch(selectEnrollSession({ messages: { confirmMsg: {}, notesMsg: {} } }));
      expect(typeof result).toEqual('object');
    });
  });

  it('uiScheduleConflictAction should work fine', (done) => {
    store = mockStore({
      modules: {
        Daycare: {
          EnrollForm: {
            participants: fromJS({
              validId: 12861
            }),
            enrollSession: fromJS({
              reservationUnit: 4,
              individualSelection: true,
              sessions: [],
              selectedSessionIds: [],
              sessionDates: [],
              sessionDatesSummary: [],
              selectedSessionDateIds: []
            }),
            enrollDetail: fromJS({
              pickupList: []
            }),
            survey: fromJS({
              questions: []
            }),
            receipt: fromJS({
              receiptNumber: 1
            })
          }
        }
      }
    });
    const { FORM_SCHEDULE_CONFLICT } = actionTypes;
    store.dispatch(selectEnrollSession(selectEnrollSeesionParams)).then(() => {
      expect(helper.isIncluding([{ type: FORM_SCHEDULE_CONFLICT}],
      store.getActions())).toBeTruthy();
      done();
    });
  });

  it('fetchExceptionDatesAsyncAction works fine', (done) => {
    const { EXCEPTION_DATES_UI } = actionTypes;
    const programId = 1351;
    const reno = 1;
    return store.dispatch(fetchExceptionDatesAsyncAction(programId, reno)).then(() => {
      expect(helper.isIncluding([{ type: EXCEPTION_DATES_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });
});
