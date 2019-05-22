import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import getEventListReducer from 'index/ReservationDetail/reducers/eventList';
import * as actions from 'index/ReservationDetail/actions/eventList';
import { wrapEventIndex } from 'index/ReservationDetail/utils/eventKeymanager';

const reducer = getEventListReducer(__reservationDetail__.__initialState__);

const data = [
  {
    new_entry_id: 1,
    event_id: 1,
    event_index: '1_1',
    permit_id: 1,
    event_name: '2016 Annual Party',
    attendance: 200,
    resource_count: 1,
    booking_count: 3,
    total_amount: 300.00,
    validated: true,
    hideCustomQuestionsSection: true,
    hideChecklistItemsSection: true
  },
  {
    new_entry_id: 2,
    event_id: 2,
    event_index: '2_2',
    permit_id: 1,
    event_name: '2016 Technic Conference',
    attendance: 100,
    resource_count: 3,
    booking_count: 14,
    total_amount: 230.00,
    validated: true,
    hideCustomQuestionsSection: true,
    hideChecklistItemsSection: true
  }
];
const events = convertCasingPropObj(data);

const event_detail = {
  event_detail_config: {
    hideReservationCharges: false,
    hideNotesSection: false,
    hideChecklistItemsSection: false,
    hideCustomQuestionsSection: false
  },
  event_id: 1,
  new_entry_id: 1,
  event_index: '1_1',
  fee_summary: {
    sub_total: 127.5,
    taxes: [{
      name: 'Tax8',
      amount: 12.75
    }, {
      name: 'test1',
      amount: 12.75
    }, {
      name: 'test2',
      amount: 12.75
    }, {
      name: 'test3',
      amount: 4.78
    }],
    total: 170.53,
    amount_paid: null,
    due_now: null,
    refund_amount: null
  },
  event_fee: {
    event_id: 0,
    event_name: 'adsaa',
    permit_id: 0,
    resource_count: 2,
    booking_count: 3,
    event_fee_total: 127.5,
    facility_fees: [{
      facility_id: 36,
      transaction_id: 0,
      facility_name: 'Gym 1',
      schedule_fees: [{
        facility_schedule_id: 23523,
        master_facility_schedule_id: 0,
        facility_schedule: {
          start_date: '14 Feb 2017',
          start_time: '4:00 AM',
          end_date: '14 Feb 2017',
          end_time: '5:00 AM'
        },
        schedule_amount: 0,
        facility_charges: []
      }, {
        facility_schedule_id: 23524,
        master_facility_schedule_id: 23523,
        facility_schedule: {
          start_date: '14 Feb 2017',
          start_time: '4:00 AM',
          end_date: '14 Feb 2017',
          end_time: '5:00 AM'
        },
        schedule_amount: -10,
        facility_charges: []
      }, {
        facility_schedule_id: 23525,
        master_facility_schedule_id: 23523,
        facility_schedule: {
          start_date: '14 Feb 2017',
          start_time: '4:00 AM',
          end_date: '2017 Feb 15',
          end_time: '5:00 AM'
        },
        schedule_amount: 20,
        facility_charges: []
      }, {
        facility_schedule_id: 23526,
        master_facility_schedule_id: 23523,
        facility_schedule: {
          start_date: '14 Feb 2017',
          start_time: '4:00 AM',
          end_date: '2017 Feb 15',
          end_time: '5:00 AM'
        },
        schedule_amount: 0,
        facility_charges: [{
          facility_charge_id: 4,
          charge_name: 'Fee_1',
          quantity: 1,
          unit_fee: 100,
          abbrev_unit_of_measure: 'ea',
          amount: 83.34,
          permit_id: 0,
          receipt_detail_id: 0,
          facility_schedule_id: 0,
          is_percentage_discount: false
        }, {
          facility_charge_id: 6,
          charge_name: 'Dis_Per_1',
          quantity: 1,
          unit_fee: -15,
          abbrev_unit_of_measure: 'ea',
          amount: -22.5,
          permit_id: 0,
          receipt_detail_id: 0,
          facility_schedule_id: 0,
          is_percentage_discount: true
        }]
      }],
      additional_fees: {
        facility_schedule_id: 0,
        master_facility_schedule_id: 0,
        facility_schedule: null,
        schedule_amount: 0,
        facility_charges: []
      }
    }, {
      facility_id: 37,
      transaction_id: 0,
      facility_name: 'Gym 2',
      schedule_fees: [{
        facility_schedule_id: 23527,
        master_facility_schedule_id: 0,
        facility_schedule: {
          start_date: '14 Feb 2017',
          start_time: '6:00 AM',
          end_date: '14 Feb 2017',
          end_time: '7:00 AM'
        },
        schedule_amount: 16.66,
        facility_charges: [{
          facility_charge_id: 5,
          charge_name: 'Faciltiy_per hour',
          quantity: 1,
          unit_fee: 20,
          abbrev_unit_of_measure: '/ hr',
          amount: 16.66,
          permit_id: 0,
          receipt_detail_id: 0,
          facility_schedule_id: 23524,
          is_percentage_discount: false
        }]
      }, {
        facility_schedule_id: 23528,
        facility_schedule: {
          start_date: '14 Feb 2017',
          start_time: '10:00 AM',
          end_date: '14 Feb 2017',
          end_time: '1:00 PM'
        },
        schedule_amount: 50,
        facility_charges: [{
          facility_charge_id: 5,
          charge_name: 'Faciltiy_per hour',
          quantity: 3,
          unit_fee: 20,
          abbrev_unit_of_measure: '/ hr',
          amount: 50,
          permit_id: 0,
          receipt_detail_id: 0,
          facility_schedule_id: 23525,
          is_percentage_discount: false
        }]
      }],
      additional_fees: {
        facility_schedule_id: 0,
        master_facility_schedule_id: 0,
        facility_schedule: null,
        schedule_amount: 60.84,
        facility_charges: [{
          facility_charge_id: 4,
          charge_name: 'Fee_1',
          quantity: 1,
          unit_fee: 100,
          abbrev_unit_of_measure: 'ea',
          amount: 83.34,
          permit_id: 0,
          receipt_detail_id: 0,
          facility_schedule_id: 0,
          is_percentage_discount: false
        }, {
          facility_charge_id: 6,
          charge_name: 'Dis_Per_1',
          quantity: 1,
          unit_fee: -15,
          abbrev_unit_of_measure: 'ea',
          amount: -22.5,
          permit_id: 0,
          receipt_detail_id: 0,
          facility_schedule_id: 0,
          is_percentage_discount: true
        }]
      }
    }]
  },
  questions: {
    list: [],
    has_required_question: false
  },
  transactions: [],
  waiver_list: [],
  staff_notes: 'stuff notes11',
  customer_notes: 'customer notes11'
};

describe('index -> ReservationDetail -> reducers -> eventList', () => {
  it('CONFIG_EVENT should work fine', (done) => {
    const state = reducer(undefined, {
      type: actions.CONFIG_EVENT,
      payload: { events }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.get('isShow').get(wrapEventIndex('1_1'))).toBe(false);
    expect(state.get('hasFetchedDetail').get(wrapEventIndex('1_1'))).toBe(false);
    done();
  });

  it('SHOW_DETAIL should work fine', (done) => {
    const eventIndex = '1_1';
    const state = reducer(undefined, {
      type: actions.SHOW_DETAIL,
      payload: { eventIndex }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.get('isShow').get(wrapEventIndex(eventIndex))).toBe(true);
    done();
  });

  it('SHOW_UPDATED should work fine', () => {
    const eventIndex = '1_1';

    const state = reducer(undefined, {
      type: actions.SHOW_UPDATED,
      payload: { eventIndex }
    });

    expect(typeof state.toJS()).toBe('object');
    expect(state.getIn(['isUpdated', wrapEventIndex(eventIndex)])).toBe(true);
  });

  it('FETCH_EVENT_DETAIL_SUCCESS should work fine', (done) => {
    const eventIndex = event_detail.event_index;
    const state = reducer(undefined, {
      type: actions.FETCH_EVENT_DETAIL_SUCCESS,
      payload: { body: { event_detail } }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.get('isShow').get(wrapEventIndex(eventIndex))).toBe(true);
    expect(state.get('hasFetchedDetail').get(wrapEventIndex(eventIndex))).toBe(true);
    done();
  });

  it('SET_EVENT_CONFIG should work fine', (done) => {
    const eventDetailConfig = {
      hideReservationCharges: false,
      hideNotesSection: false,
      hideChecklistItemsSection: false,
      hideCustomQuestionsSection: false
    };
    const eventIndex = '1_1';
    const state = reducer(undefined, {
      type: actions.SET_EVENT_CONFIG,
      payload: { eventDetailConfig, eventIndex }
    });
    expect(typeof state.toJS()).toBe('object');
    const aef = state.get('allEventConfig').get(wrapEventIndex(eventIndex)).toJS();
    expect(aef.hideNotesSection).toBe(eventDetailConfig.hideNotesSection);
    expect(aef.hideChecklistItemsSection).toBe(eventDetailConfig.hideChecklistItemsSection);
    expect(aef.hideReservationCharges).toBe(eventDetailConfig.hideReservationCharges);
    expect(aef.hideCustomQuestionsSection).toBe(eventDetailConfig.hideCustomQuestionsSection);
    done();
  });

  it('SET_EVENT_VALID_STATUS should work fine', (done) => {
    const index = event_detail.event_index;
    const state = reducer(undefined, {
      type: actions.SET_EVENT_VALID_STATUS,
      payload: { eventIndex: index }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.getIn(['eventValidStatus', wrapEventIndex(index)])).toBe(false);
    done();
  });

  it('SHOW_ALL_INVALID_EVENT_DETAIL should work fine', (done) => {
    const index = wrapEventIndex(event_detail.event_index);
    const state = reducer(undefined, {
      type: actions.SHOW_ALL_INVALID_EVENT_DETAIL,
      payload: { invalidEvents: [index] }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.getIn(['isShow', index])).toBe(true);
    done();
  });

  it('UPDATE_EVENT_SUMMARY should work fine', () => {
    const state = reducer(undefined, {
      type: actions.UPDATE_EVENT_SUMMARY,
      payload: {
        eventIndex: '3554_0',
        eventInfo: {
          isEventUpdated: true,
          totalAmount: 100
        }
      }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.getIn(['eventList', -1, 'isEventUpdated'])).toBe(true);
    expect(state.getIn(['eventList', -1, 'totalAmount'])).toBe(100);
  });

  it('RESTORE_HAS_FETCHED_DETAIL should work fine', (done) => {
    const index = wrapEventIndex(event_detail.event_index);
    const state = reducer(undefined, {
      type: actions.RESTORE_HAS_FETCHED_DETAIL,
      payload: { eventIndex: event_detail.event_index }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.getIn(['isShow', index])).toBe(false);
    expect(state.getIn(['hasFetchedDetail', index])).toBe(false);
    done();
  });

  it('SET_NEEDS_RESET should works fine', () => {
    const state = reducer(undefined, actions.setNeedsConfirmReset(true));
    expect(state.get('needsConfirmReset')).toBe(true);
  });
});
