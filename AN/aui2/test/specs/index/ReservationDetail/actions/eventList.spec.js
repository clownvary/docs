import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import mockAPI from 'utils/mockAPI';
import * as actions from 'index/ReservationDetail/actions/eventList';
import _ from 'lodash';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import eventDetailJson from 'json/ReservationDetail/eventDetail.json'

jest.mock('react-base-ui/lib/services/dialog',()=>({
  confirm: jest.fn().mockReturnValue(Promise.resolve(true)).mockReturnValueOnce(Promise.reject(false))
}));

describe('index -> ReservationDetail -> actions -> eventList', () => {
  let store = null;
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({
      pagination: fromJS({
        paginations: fromJS([])
      }),
      permitFee: fromJS({
        facilityFees: []
      }),
      facility: fromJS({
        allFacilities:fromJS ({
          event_2_0: {
           ...eventDetailJson.body.event_detail
          }
        })
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('configEvent should work fine', (done) => {
    const { CONFIG_EVENT, configEvent } = actions;

    store.dispatch(configEvent([]));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(CONFIG_EVENT);
    done();
  });

  it('showDetail should work fine', (done) => {
    const { SHOW_DETAIL, showDetail } = actions;

    store.dispatch(showDetail(1));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SHOW_DETAIL);
    done();
  });

  it('showUpdated should work fine', (done) => {
    const { SHOW_UPDATED, showUpdated } = actions;

    store.dispatch(showUpdated(1));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SHOW_UPDATED);
    done();
  });


  it('setEventConfig should work fine', (done) => {
    const { SET_EVENT_CONFIG, setEventConfig } = actions;

    store.dispatch(setEventConfig({ eventDetailConfig: {}, eventID: 1 }));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_EVENT_CONFIG);
    done();
  });

  it('getEventDetail should work fine', (done) => {
    const { FETCH_EVENT_DETAIL, getEventDetail } = actions;

    store.dispatch(getEventDetail({ batchID: 1, receiptID: 2, eventID: 3, eventName: 'test' }));
    const action = _.first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(FETCH_EVENT_DETAIL);
    done();
  });

  it('setEventValidStatus should work fine', (done) => {
    const { SET_EVENT_VALID_STATUS, setEventValidStatus } = actions;

    store.dispatch(setEventValidStatus({ eventIndex: 1 }));
    const action = _.first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_EVENT_VALID_STATUS);
    done();
  });

  it('showAllInvalidEventDetail should work fine', (done) => {
    const { SHOW_ALL_INVALID_EVENT_DETAIL, showAllInvalidEventDetail } = actions;

    store.dispatch(showAllInvalidEventDetail({ invalidWaiverEvents: [1] }));
    const action = _.first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(SHOW_ALL_INVALID_EVENT_DETAIL);
    done();
  });

  it('checkAllWaiverRequried should work fine', () => {
    const { checkAllWaiverRequried } = actions;
    const allwaivers = fromJS({
      event_3555_0: {
        data: [
          {
            waiverIndex: 1,
            displayPermitSelected: true,
            isRequired: true,
            agreetowaiverSelected: ''
          }
        ],
        hasNew: false
      }
    });
    const eventValidStatus = fromJS({ event_3555_0: false });

    let result = checkAllWaiverRequried(allwaivers, eventValidStatus, true);

    expect(result).toEqual({
      allRequired: false,
      errors: { 1: 'Required' },
      invalidWaiverEvents: ['event_3555_0'],
      confirmChangeWaiverError: { 1: { error: 'Required', eventIndex: '3555_0' } }

    });

    result = checkAllWaiverRequried(allwaivers, eventValidStatus, false);
    expect(result).toEqual({
      allRequired: false,
      errors: { 1: 'Required' },
      invalidWaiverEvents: ['event_3555_0'],
      confirmChangeWaiverError: {}
    });
  });

  it('updateEventSummary should work fine', () => {
    const { updateEventSummary, UPDATE_EVENT_SUMMARY } = actions;

    store.dispatch(updateEventSummary('eventInfo', 32));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(UPDATE_EVENT_SUMMARY);
    expect(action.payload).toEqual({
      eventInfo: 'eventInfo',
      eventIndex: 32
    });
  });

  it('updateFee should work fine', () => {
    const { updateFee } = actions;
    const results = {
      event_detail: {
        fee_summary: {
          sub_total: 1,
          taxes: [],
          total: 1,
          amount_paid: 0,
          due_now: 1,
          refund_amount: 0
        },
        event_fee: {
          event_id: 3552,
          event_name: 'Hello',
          permit_id: 4598,
          resource_count: 1,
          booking_count: 1,
          event_fee_total: 1,
          facility_fees: []
        },
        is_event_updated: true
      }
    };


    store.dispatch(updateFee(results, '3553_0'));
    const allActions = store.getActions();

    expect(allActions.length).toBe(3);
    expect(allActions[2].type).toBe('UPDATE_EVENT_SUMMARY');
  });

  it('fetchReservationFeeThenUpdate should work fine', (done) => {
    const {
      fetchReservationFeeThenUpdate
    } = actions;

    const params = {
      batchID: 1,
      receiptID: 2,
      eventID: 2,
      newEntryID: 5,
      eventIndex: 7
    };

    store.dispatch(fetchReservationFeeThenUpdate(params)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(6);
      expect(myActions[5].type).toBe('UPDATE_EVENT_SUMMARY');
      done();
    });
  });

  it('restoreHasFetchedDetail should work fine', (done) => {
    const eventIndex = 1;
    store.dispatch(actions.restoreHasFetchedDetail(eventIndex));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions.length).toBeGreaterThanOrEqual(1);
    const action = storeActions[storeActions.length - 1];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.RESTORE_HAS_FETCHED_DETAIL);
    expect(action.payload.eventIndex).toBe(eventIndex);
    done();
  });

  it('fetchEventDetail nonMonetaryReceipt equal to true should work fine', (done) => {
    const {
      fetchEventDetail
    } = actions;

    const params = {
      batchID: 1,
      receiptID: 2,
      eventID: 2,
      newEntryID: 5,
      eventIndex: 7,
      onlySetFacilty: ''
    };

    store = mockStore({
      form: {
        permitDetailForm: {
          _asyncValidating: false,
          _initialized: true,
          _submitting: false,
          _submitFailed: false,
          test: {
            value: 1
          }
        }
      },
      question: fromJS({
        showQuestion: true,
        data: [],
        hideQuestions: {},
        allQuestions: {},
        questions: [],
        stateValues: {},
        errorMsg: {},
        fields: {
          test: '23'
        },
        loading: false,
        hasRequiredQuestion: {}
      }),
      permitHolder: fromJS({
        allowResetFees: {}
      }),
      pagination: fromJS({
        paginations: fromJS([])
      }),
      permitFee: fromJS({
        facilityFees: []
      }),
      facility: fromJS({
        allFacilities:fromJS ({
          event_2_0: {
           ...convertCasingPropObj(eventDetailJson.body.event_detail)
          }
        })
      })
    });

    store.dispatch(fetchEventDetail(params)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(9);
      expect(myActions[7].type).toBe('DECORATE_FACILITY');
      done();
    });
  });

  it('addEvent should work fine', (done) => {
    const params = {
      batchID: 1,
      receiptID: 1,
      eventID: 1
    };

    mockAPI({
      path: '/json/ReservationDetail/bookingCountExceed.json',
      result: {
        headers: {
          response_code: '0000',
          response_message: 'Successful',
          page_info: {}
        },
        body: {}
      }
    });

    store.dispatch(actions.addEvent(params)).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  it('requestDeleteEvent should work fine', (done) => {
    store.dispatch(actions.requestDeleteEvent({
      batchID: 1,
      receiptID: 3,
      eventID: 23,
      newEntryID: 564
    }));

    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions.length).toBeGreaterThanOrEqual(1);
    done();
  });

  it('deleteEvent should work fine', (done) => {
    store.dispatch(actions.deleteEvent({
      batchID: 1
    })).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  it('setNeedsConfirmReset works fine', () => {
    expect(actions.setNeedsConfirmReset(true)).toEqual({
      type: actions.SET_NEEDS_CONFIRM_RESET,
      payload: { value: true }
    })
  });

  it('resetFeesAndReloadEvents works fine', (done) => {
    store = mockStore({
      initialData: {
        permitID: 1,
        batchID: 1,
        receiptID: 1
      }
    })

    mockAPI({
      path: '/json/PermitDetail/resetfees.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful",
        },
        "body": {
          event_list: [
            {
              event_id: 3796,
              event_index: "3796_0",
              event_name: "b"
            }
          ],
          fee_summary: {
            amount_paid: 0,
            due_now: 0,
            refund_amount: 0,
            sub_total: 0,
            taxes: [],
            total: 0
          }
        }
      }
    })

    store.dispatch(actions.resetFeesAndReloadEvents()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).toBe(6)
      done()
    })
  })

  it('confirmResetFees works fine', () => {
    store = mockStore({
      initialData: {
        companyWording: 'Test'
      }
    })
    const notReset = store.dispatch(actions.confirmResetFees()).catch((value) => { expect(value).toBe(false) });
    const reset = store.dispatch(actions.confirmResetFees()).then((value) => { expect(value).toBe(true) });
    return Promise.all([notReset, reset]);
  })

  it('enableResetFees works fine', () => {
    store = mockStore({
      eventDetail: fromJS({
        eventList: [
          {
            event_id: 3796,
            event_index: "3796_0",
            event_name: "b"
          }
        ]
      })
    });
    store.dispatch(actions.enableResetFees());
    expect(store.getActions().length).toBe(3);
  })

  it('confirmAndResetFeesAfterSpecialHandling', () => {
    jest.useFakeTimers();
    store = mockStore({
      eventDetail: fromJS({
        needsConfirmReset: false
      })
    });
    store.dispatch(actions.confirmAndResetFeesAfterSpecialHandling());
    expect(store.getActions().length).toBe(1);

    store = mockStore({
      initialData: {
        companyWording: 'Test'
      },
      eventDetail: fromJS({
        needsConfirmReset: true
      })
    });
    store.dispatch(actions.confirmAndResetFeesAfterSpecialHandling());
    jest.runAllTimers();
    expect(store.getActions().length).toBe(1);
  })
});
