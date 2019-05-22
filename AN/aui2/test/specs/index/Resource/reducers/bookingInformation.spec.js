import { is, fromJS } from 'immutable';
import reducer from 'index/Resource/reducers/bookingInformation';
import * as actions from 'index/Resource/actions/bookingInformation';
import {
  SET_RECURRING_BASE,
  GENERATE_RECURRING_BOOKINGS_SUCCESS
} from 'index/Resource/actions/recurringPattern';
import { EARLIER_MSG } from 'index/Resource/utils/bookingInfoClientValidation';
import { sortDetails, sortResource } from 'index/Resource/utils/bookingInfoSort';
import mockStateBookingInfo from './mockState/bookingInfo';
import mockStateRecurringBookingInfo from './mockState/recurringBookingInfo';
import mockHasOtherErrBookingInfo from './mockState/hasOtherErrBookingInfo';
import mockHasConflictErrBookingInfo from './mockState/hasConflictErrBookingInfo';
import mockHasOverMaximumTimeBookingInfo from './mockState/hasOverMaximumTimeBookingInfo';

describe('index/Resource/reducers/bookingInformation', () => {
  const initialData = {
    scheduleTypes: [],
    prepCodeList: [{
      id: 1
    }],
    setUpList: [],
    cleanUpList: [],
    permitBookingList: [],
    pendingBookingList: [],
    isBookingChanged: false,
    backFromPermitDetailPage: false,
    display: false,
    error: {
      code: null,
      clientMessages: [],
      serverMessages: [],
      entity: {
        eventName: false,
        scheduleTypeID: false,
        eventResource: [],
        overrideRentalBlockTimeError: []
      }
    },
    data: {
      permitID: -1,
      eventName: '',
      scheduleTypeID: -1,
      scheduleType: '',
      checkForWaitlistConflict: true,
      eventTypes: [],
      eventResource: []
    }
  };
  const initialState = fromJS(initialData);

  it('FETCH_PENDING_BOOKINGS_SUCCESS should works fine, if pass empty booking_items', () => {
    const { FETCH_PENDING_BOOKINGS_SUCCESS } = actions;
    const newState = reducer(initialState, {
      type: FETCH_PENDING_BOOKINGS_SUCCESS,
      payload: {
        body: {
          booking_items: []
        }
      }
    });

    expect(is(initialState, newState)).toBe(true);
  });

  it('FETCH_PENDING_BOOKINGS_SUCCESS should works fine, if has booking_item and recurring booking', () => {
    const { FETCH_PENDING_BOOKINGS_SUCCESS } = actions;
    const body = {
      booking_items: {
        event_name: 'aa',
        event_attendance: 2,
        schedule_type_id: 7,
        check_for_waitlist_conflict: true,
        schedule_type: '3 schedule type',
        permit_id: -1,
        event_resource: [
          {
            resource_id: 1,
            resource_name: 'resourceType &apm;',
            resource_number: '',
            resource_type: 0,
            event_type_id: 6,
            event_type: 'South West Hub',
            setup_minutes: 3,
            cleanup_minutes: 5,
            reservation_period_unit: 2,
            booking_detail: [
              {
                pending_id: 'pending_775_7159',
                resource_booking_id: 0,
                master_booking_identifier: '1',
                recurring_reservation_group: {
                  group_pattern_content: '1',
                  exception_date_list: [],
                  master_facility_schedule_id: 1
                },
                transaction_id: -1,
                reservation_type: 0,
                rental_block_id: 0,
                date_range_id: 0,
                attendance: 2,
                start_event_datetime: '12/21/2016 2:00 AM',
                end_event_datetime: '12/21/2016 3:00 AM',
                is_delete_schedule: false
              }
            ],
            prep_code_id: 10
          },
          {
            resource_id: 2,
            resource_name: 'kaely test equipment &amp;',
            resource_number: '',
            resource_type: 0,
            event_type_id: 6,
            event_type: 'South West Hub',
            setup_minutes: 3,
            cleanup_minutes: 5,
            reservation_period_unit: 6,
            booking_detail: [
              {
                pending_id: 'pending_775_7159',
                resource_booking_id: 0,
                master_booking_identifier: '1',
                recurring_reservation_group: {
                  group_pattern_content: 1,
                  exception_date_list: '[]',
                  master_facility_schedule_id: 1
                },
                transaction_id: -1,
                reservation_type: 0,
                rental_block_id: 0,
                date_range_id: 4,
                attendance: 2,
                start_event_datetime: '12/21/2016 2:00 AM',
                end_event_datetime: '12/21/2016 3:00 AM',
                is_delete_schedule: false
              }
            ],
            prep_code_id: 10
          },
          {
            resource_id: 3,
            resource_name: 'kaely test human',
            resource_number: '',
            resource_type: 0,
            event_type_id: 6,
            event_type: 'South West Hub',
            setup_minutes: 3,
            cleanup_minutes: 5,
            reservation_period_unit: 7,
            booking_detail: [
              {
                pending_id: 'pending_775_7159',
                resource_booking_id: 0,
                transaction_id: -1,
                reservation_type: 0,
                rental_block_id: 7,
                date_range_id: 0,
                attendance: 2,
                start_event_datetime: '12/21/2016 2:00 AM',
                end_event_datetime: '12/21/2016 3:00 AM',
                is_delete_schedule: false,
                is_rental_block_override: true
              }
            ],
            prep_code_id: 10
          }
        ]
      }
    };
    const expectResult = [{
      setupMinutes: 3,
      definedDateRange: [],
      resourceType: 0,
      resourceID: 1,
      rentalBlock: [],
      bookingDetail: [{
        id: 'pending_775_7159',
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: true,
        baseBookingID: 1,
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        attendanceChanged: true,
        dateRangeID: 0,
        dropStamp: null,
        recurringReservationGroupID: undefined,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 2,
        pendingID: 'pending_775_7159',
        isRecurring: true,
        isRentalBlockOverride: false,
        recurringPattern: 1,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: 1,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: 6,
      reservationPeriodUnit: 2,
      eventType: 'South West Hub',
      prepCodeID: 10,
      resourceNumber: '',
      resourceName: 'resourceType &apm;',
      cleanupMinutes: 5,
      eventTypes: []
    },
    {
      setupMinutes: 3,
      definedDateRange: [],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail: [{
        id: 'pending_775_7159',
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: true,
        baseBookingID: 1,
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        attendanceChanged: true,
        dateRangeID: 4,
        dropStamp: null,
        recurringReservationGroupID: undefined,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: true,
        isRentalBlockOverride: false,
        recurringPattern: 1,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: 1,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: 6,
      reservationPeriodUnit: 6,
      eventType: 'South West Hub',
      prepCodeID: 10,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 5,
      eventTypes: []
    },
    {
      setupMinutes: 3,
      definedDateRange: [],
      resourceType: 0,
      resourceID: 3,
      rentalBlock: [],
      bookingDetail: [{
        id: 'pending_775_7159',
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '',
        rentalBlockID: 1487076708000,
        recurringEnabled: true,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        attendanceChanged: true,
        dateRangeID: 0,
        dropStamp: null,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 7,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        isRentalBlockOverride: true,
        recurringPattern: undefined,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false,
        overrideRentalBlock: {
          id: 1487076708000,
          name: `2:00 AM to 3:00 AM`,
          selected: false
        }
      }],
      eventTypeID: 6,
      reservationPeriodUnit: 7,
      eventType: 'South West Hub',
      prepCodeID: 10,
      resourceNumber: '',
      resourceName: 'kaely test human',
      cleanupMinutes: 5,
      eventTypes: []
    }];

    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);

    const initialState = fromJS(mockStateRecurringBookingInfo);
    const state = reducer(initialState, {
      type: FETCH_PENDING_BOOKINGS_SUCCESS,
      payload: { body }
    });

    expect(state.get('backFromPermitDetailPage')).toBe(true);
    expect(state.get('pendingBookingList').toJS()).toEqual(expectResult);
    expect(state.getIn(['data', 'eventName'])).toBe('aa');
    expect(state.getIn(['data', 'scheduleTypeID'])).toBe(7);
    expect(state.getIn(['data', 'scheduleType'])).toBe('3 schedule type');
    expect(state.getIn(['data', 'permitID'])).toBe(-1);
    expect(state.getIn(['data', 'isPendingBookingsFetched'])).toBeTruthy();

    let newInitialState = state.setIn(['data', 'eventName'], 'Test XXX');
    const state1 = reducer(newInitialState, {
      type: FETCH_PENDING_BOOKINGS_SUCCESS,
      payload: { body }
    });
    expect(state1.getIn(['data', 'eventName'])).toBe('Test XXX');

    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('UPDATE_RESOURCE_EVENT_TYPES should works fine', () => {
    const { UPDATE_RESOURCE_EVENT_TYPES } = actions;
    const resourceIndex = 0;
    const eventTypes = [
      {
        id: 34,
        name: 'South West Hub',
        selected: false
      }, {
        id: 35,
        name: 'deserunt et',
        selected: false
      }, {
        id: 36,
        name: 'incididunt irure',
        selected: false
      }];
    const expectResult = [
      {
        id: 34,
        name: 'South West Hub',
        selected: false,
        text: 'South West Hub',
        value: 34
      }, {
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      }, {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }];

    const state = reducer(initialState, {
      type: UPDATE_RESOURCE_EVENT_TYPES,
      payload: {
        resourceIndex,
        eventTypes
      }
    });

    expect(state.getIn(['data', 'eventResource', 0, 'eventTypes']).toJS()).toEqual(expectResult);
  });

  it('FETCH_SCHEDULE_TYPES_SUCCESS should works fine', () => {
    const { FETCH_SCHEDULE_TYPES_SUCCESS } = actions;
    const body = {
      items: [{
        id: 1,
        name: 'schedule type',
        selected: false
      }]
    };
    const expectResult = [{
      id: 1,
      name: 'schedule type',
      selected: false,
      text: 'schedule type',
      value: 1
    }];

    const state = reducer(initialState, {
      type: FETCH_SCHEDULE_TYPES_SUCCESS,
      payload: { body }
    });

    expect(state.get('scheduleTypes').toJS()).toEqual(expectResult);
    expect(state.getIn(['data', 'scheduleType'])).toBe('');
  });

  it('FETCH_PREP_CODE_SUCCESS should works fine', () => {
    const { FETCH_PREP_CODE_SUCCESS } = actions;
    const body = {
      items: [{
        id: 1,
        name: 'schedule type',
        selected: false
      }]
    };
    const expectResult = [{
      id: 1,
      name: 'schedule type',
      selected: false,
      text: 'schedule type',
      value: 1
    }];

    const state = reducer(initialState, {
      type: FETCH_PREP_CODE_SUCCESS,
      payload: { body }
    });

    expect(state.get('prepCodeList').toJS()).toEqual(expectResult);
  });

  it('FETCH_SETUP_CLEANUP_SUCCESS should works fine', () => {
    const { FETCH_SETUP_CLEANUP_SUCCESS } = actions;
    const body = {
      items: [{
        id: 0,
        name: '0 Min',
        selected: true,
        isListElement: true
      }]
    };
    const expectResult = [{
      id: 0,
      name: '0 Min',
      selected: true,
      isListElement: true,
      text: '0 Min',
      value: 0
    }];

    const state = reducer(initialState, {
      type: FETCH_SETUP_CLEANUP_SUCCESS,
      payload: { body }
    });

    expect(state.get('setUpList').toJS()).toEqual(expectResult);
    expect(state.get('cleanUpList').toJS()).toEqual(expectResult);
  });

  it('CHANGE_RESOURCE_INFO_UPDATE_CONFLICT should works fine, if no error', () => {
    const { CHANGE_RESOURCE_INFO_UPDATE_CONFLICT } = actions;
    const initialState = fromJS(mockStateBookingInfo);

    const value = {
      resourceIndex: 0
    };
    const expectResult = [];

    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_UPDATE_CONFLICT,
      payload: { value }
    });

    const expectError = state.getIn(['error', 'entity', 'eventResource']).toJS();

    expect(state.getIn(['error', 'conflictMessage'])).toEqual('');
    expect(expectError).toEqual(expectResult);
  });

  it('CHANGE_RESOURCE_INFO_UPDATE_CONFLICT should works fine, if has error, but not conflictError', () => {
    const { CHANGE_RESOURCE_INFO_UPDATE_CONFLICT } = actions;
    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const value = {
      resourceIndex: 0
    };
    const expectResult = {
      resourceID: 2,
      resourceName: 'kaely test equipment &amp;',
      eventTypeID: true,
      bookingDetail:
      [{
        pendingID: 'pending_775_7159',
        resourceBookingID: 0,
        errors: {
          attendance: false,
          conflictType: 'startEventTime'
        },
        ignoreConflict: false,
        ignoreClosetime: false,
        ignoreSkipdate: false
      }]
    };

    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_UPDATE_CONFLICT,
      payload: { value }
    });

    const expectError = state.getIn(['error', 'entity', 'eventResource', value.resourceIndex]).toJS();

    expect(state.getIn(['error', 'conflictMessage'])).toEqual('');
    expect(expectError).toEqual(expectResult);
  });

  it('CHANGE_RESOURCE_INFO_UPDATE_CONFLICT should works fine, if has conflict error', () => {
    const { CHANGE_RESOURCE_INFO_UPDATE_CONFLICT } = actions;
    const initialState = fromJS(mockHasConflictErrBookingInfo);

    const value = {
      resourceIndex: 0
    };
    const expectResult = {
      resourceID: 2,
      resourceName: 'kaely test equipment &amp;',
      eventTypeID: false,
      bookingDetail:
      [{
        pendingID: 'pending_775_7160',
        resourceBookingID: 0,
        errors: {
          conflictType: 'holiday',
          conflictReason: '',
          conflictIgnoreEnable: false,
          conflictIgnoreType: 'disable_for_conflict_permisson_and_facility_setting',
          conflict: false,
          datetime: 'ANE56423 sally Facility day must be booked at least 2 day(s) in advance.'
        }
      }]
    };

    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_UPDATE_CONFLICT,
      payload: { value }
    });

    const expectError = state.getIn(['error', 'entity', 'eventResource', value.resourceIndex]).toJS();

    expect(state.getIn(['error', 'conflictMessage'])).toEqual('3 bookings conflict.');
    expect(expectError).toEqual(expectResult);
  });

  it('SET_RESOURCE_DEFAULT_VALUE should works fine', () => {
    const { SET_RESOURCE_DEFAULT_VALUE } = actions;
    const value = {
      resourceIndex: 0,
      prepCodeID: 1,
      setupMinutes: 10,
      cleanupMinutes: 5
    };
    const state = reducer(initialState, {
      type: SET_RESOURCE_DEFAULT_VALUE,
      payload: {
        value
      }
    });

    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);
    expect(resourceInfo.get('prepCodeID')).toBe(value.prepCodeID);
    expect(resourceInfo.get('setupMinutes')).toBe(value.setupMinutes);
    expect(resourceInfo.get('cleanupMinutes')).toBe(value.cleanupMinutes);
  });

  it('SET_RESOURCE_DEFAULT_VALUE should works fine, if prepCodeID is -1 ', () => {
    const { SET_RESOURCE_DEFAULT_VALUE } = actions;
    const value = {
      resourceIndex: 0,
      prepCodeID: -1,
      setupMinutes: 10,
      cleanupMinutes: 5
    };
    const state = reducer(initialState, {
      type: SET_RESOURCE_DEFAULT_VALUE,
      payload: {
        value
      }
    });

    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);
    expect(resourceInfo.get('prepCodeID')).toBe(value.prepCodeID);
    expect(resourceInfo.get('setupMinutes')).toBe(10);
    expect(resourceInfo.get('cleanupMinutes')).toBe(5);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if no template', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0,
      key: 'newBooking',
      isForcedUpdateInfos: true
    };
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const isTemplate = state.getIn(['data', 'eventResource', value.resourceIndex, 'isTemplate']);

    expect(isTemplate).toBe(undefined);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if no template and no bookingIndex', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 1,
      key: 'attendance'
    };
    const noTemplateData = Object.assign({}, initialData, {
      data: {
        permitID: -1,
        eventName: '',
        scheduleTypeID: -1,
        scheduleType: '',
        checkForWaitlistConflict: true,
        eventTypes: [],
        eventResource: [{
          setupMinutes: 0,
          isTemplate: true,
          definedDateRange: [{
            'id': 3,
            'name': '2016 Jun 01 to 2016 Jun 03',
            'selected': false,
            'parent_id': 4,
            text: '2016 Jun 01 to 2016 Jun 03',
            'value': 3
          }, {
            'id': 4,
            name: '2016 Jun 16 to 2016 Jun 20',
            'selected': false,
            'parent_id': 1,
            'text': '2016 Jun 16 to 2016 Jun 20',
            'value': 4
          }],
          'resourceType': 0,
          resourceID: 2,
          rentalBlock: [],
          'bookingDetail': [{
            currentEvent: true,
            recurringExceptions: [],
            hasRecurring: false,
            baseBookingID: '',
            rentalBlockID: 0,
            'recurringEnabled': false,
            ignoreConflict: false,
            'startEventTime': '2:00 AM',
            'bookingAssignment': 0,
            'reservationType': 0,
            'resourceBookingID': 0,
            startEventDate: '2016 Dec 21',
            pendingRemoveFromRecurringGroup: '',
            attendance: 2,
            attendanceChanged: false,
            dateRangeID: 4,
            'recurringReservationGroupID': 0,
            isDeleteSchedule: false,
            endEventTime: '3:00 AM',
            'endEventDate': '2016 Dec 21',
            reservationPeriodUnit: 6,
            pendingID: 'pending_775_7160',
            isRecurring: false,
            startEventDatetime: '12/21/2016 2:00 AM',
            'ignoreClosetime': false,
            ownerPendingReceipt: true,
            'masterFacilityScheduleID': null,
            transactionID: -1,
            expanded: false,
            endEventDatetime: '12/21/2016 3:00 AM',
            ignoreSkipdate: false
          }],
          eventTypeID: 36,
          'reservationPeriodUnit': 6,
          'eventType': '\'South West Hub',
          prepCodeID: -1,
          'resourceNumber': '',
          'resourceName': 'kaely test equipment &amp;',
          'cleanupMinutes': 0,
          eventTypes: [{
            id: 35,
            'name': 'deserunt et',
            'selected': false,
            'text': 'deserunt et',
            value: 35
          }, {
            'id': 36,
            'name': 'incididunt irure',
            'selected': false,
            text: 'incididunt irure',
            'value': 36
          }]
        }]
      },
      templateState: 'no_template'
    });
    const initialState = fromJS(noTemplateData);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const isTemplate = state.getIn(['data', 'eventResource', value.resourceIndex, 'isTemplate']);

    expect(isTemplate).toBe(true);
    expect(state.get('templateState')).toEqual('no_template');
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if no template, and the first booking is deleted', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: -1,
      key: 'newBooking',
      isForcedUpdateInfos: true
    };

    const noTemplateData = Object.assign({}, initialData, {
      data: {
        permitID: -1,
        eventName: '',
        scheduleTypeID: -1,
        scheduleType: '',
        checkForWaitlistConflict: true,
        eventTypes: [],
        eventResource: [{
          setupMinutes: 0,
          'isTemplate': false,
          'definedDateRange': [{
            'id': 3,
            'name': '2016 Jun 01 to 2016 Jun 03',
            'selected': false,
            parent_id: 4,
            'text': '2016 Jun 01 to 2016 Jun 03',
            value: 3
          }, {
            'id': 4,
            'name': '2016 Jun 16 to 2016 Jun 20',
            'selected': false,
            parent_id: 1,
            'text': '2016 Jun 16 to 2016 Jun 20',
            value: 4
          }],
          resourceType: 0,
          resourceID: 2,
          'rentalBlock': [],
          bookingDetail: [{
            'currentEvent': true,
            'recurringExceptions': [],
            hasRecurring: false,
            baseBookingID: '',
            rentalBlockID: 0,
            recurringEnabled: false,
            ignoreConflict: false,
            startEventTime: '2:00 AM',
            'bookingAssignment': 0,
            'reservationType': 0,
            'resourceBookingID': 0,
            startEventDate: '2016 Dec 21',
            'pendingRemoveFromRecurringGroup': '',
            attendance: 2,
            attendanceChanged: false,
            dateRangeID: 4,
            'recurringReservationGroupID': 0,
            'isDeleteSchedule': true,
            'endEventTime': '3:00 AM',
            'endEventDate': '2016 Dec 21',
            reservationPeriodUnit: 6,
            'pendingID': 'pending_775_7160',
            'isRecurring': false,
            startEventDatetime: '12/21/2016 2:00 AM',
            'ignoreClosetime': false,
            'ownerPendingReceipt': true,
            masterFacilityScheduleID: null,
            'transactionID': -1,
            expanded: false,
            endEventDatetime: '12/21/2016 3:00 AM',
            ignoreSkipdate: false
          }],
          'eventTypeID': 36,
          reservationPeriodUnit: 6,
          eventType: '\'South West Hub',
          prepCodeID: -1,
          'resourceNumber': '',
          resourceName: 'kaely test equipment &amp;',
          cleanupMinutes: 0,
          eventTypes: [{
            'id': 35,
            name: 'deserunt et',
            'selected': false,
            text: 'deserunt et',
            'value': 35
          }, {
            id: 36,
            'name': 'incididunt irure',
            selected: false,
            'text': 'incididunt irure',
            'value': 36
          }]
        }, {
          setupMinutes: 0,
          'isTemplate': true,
          'resourceType': 0,
          'resourceID': 2,
          rentalBlock: [],
          bookingDetail: [{
            currentEvent: true,
            'recurringExceptions': [],
            hasRecurring: false,
            'baseBookingID': '',
            'rentalBlockID': 0,
            recurringEnabled: false,
            ignoreConflict: false,
            startEventTime: '2:00 AM',
            'bookingAssignment': 0,
            'reservationType': 0,
            'resourceBookingID': 0,
            startEventDate: '2016 Dec 21',
            pendingRemoveFromRecurringGroup: '',
            'attendance': 2,
            'dateRangeID': 4,
            recurringReservationGroupID: 0,
            isDeleteSchedule: false,
            'endEventTime': '3:00 AM',
            endEventDate: '2016 Dec 21',
            reservationPeriodUnit: 6,
            pendingID: 'pending_775_7160',
            isRecurring: false,
            'startEventDatetime': '12/21/2016 2:00 AM',
            'ignoreClosetime': false,
            ownerPendingReceipt: true,
            masterFacilityScheduleID: null,
            'transactionID': -1,
            expanded: false,
            endEventDatetime: '12/21/2016 3:00 AM',
            ignoreSkipdate: false
          }],
          'eventTypeID': 36,
          'reservationPeriodUnit': 2,
          eventType: '\'South West Hub',
          'prepCodeID': -1,
          resourceNumber: '',
          'resourceName': 'kaely test equipment &amp;',
          'cleanupMinutes': 0,
          'eventTypes': [{
            'id': 35,
            name: 'deserunt et',
            selected: false,
            'text': 'deserunt et',
            value: 35
          }, {
            id: 36,
            'name': 'incididunt irure',
            'selected': false,
            text: 'incididunt irure',
            value: 36
          }]
        }]
      },
      templateState: 'no_template'
    });
    const initialState = fromJS(noTemplateData);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const isTemplate = state.getIn(['data', 'eventResource', value.resourceIndex, 'isTemplate']);

    expect(isTemplate).toBe(false);
    expect(state.get('templateState')).toEqual('no_template');
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if has template', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 1,
      key: 'newBooking',
      isForcedUpdateInfos: true
    };
    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "prepCodeID"', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: -1,
      key: 'prepCodeID',
      isForcedUpdateInfos: true
    };
    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "setupMinutes"', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      key: 'setupMinutes',
      isForcedUpdateInfos: true
    };
    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "setupMinutes" and isForcedUpdateInfos if false', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      key: 'setupMinutes',
      isForcedUpdateInfos: false
    };
    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "cleanupMinutes"', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      key: 'cleanupMinutes',
      isForcedUpdateInfos: true
    };
    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "null"', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: -1,
      key: 'null',
      isForcedUpdateInfos: true
    };
    const mockData = Object.assign({}, mockStateBookingInfo, {
      data: {
        ...mockStateBookingInfo.data,
        eventResource: [{
          ...mockStateBookingInfo.data.eventResource[0],
          isTemplate: false
        }]
      }
    });
    const initialState = fromJS(mockData);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "eventTypeID"', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      key: 'eventTypeID',
      isForcedUpdateInfos: true
    };
    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });
    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "eventTypeID" and has error', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      key: 'eventTypeID',
      isForcedUpdateInfos: true
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });
    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);
    const eventTypeIDError = state.getIn(['error', 'entity', 'eventResource', value.resourceIndex, 'eventTypeID']);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
    expect(eventTypeIDError).toBe(true);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "attendance"', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0,
      key: 'attendance',
      isForcedUpdateInfos: true
    };
    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });
    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);
    const eventAttendance = state.getIn(['data', 'eventResource', value.resourceIndex, 'bookingDetail', value.bookingIndex, 'attendance']);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
    expect(eventAttendance).toBe(2);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "attendance" and has error', () => {
    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0,
      key: 'attendance',
      isForcedUpdateInfos: true
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });
    const resourceInfo = state.getIn(['data', 'eventResource', value.resourceIndex]);
    const eventAttendanceError = state.getIn(['error', 'entity', 'eventResource', value.resourceIndex, 'bookingDetail', value.bookingIndex, 'errors', 'attendance']);

    expect(resourceInfo.get('prepCodeID')).toBe(-1);
    expect(resourceInfo.get('setupMinutes')).toBe(0);
    expect(resourceInfo.get('cleanupMinutes')).toBe(0);
    expect(eventAttendanceError).toBe(false);

    const initialState2 = initialState.setIn(['error', 'clientMessages'], fromJS([]))
                                      .setIn(['error', 'serverMessages'], fromJS(['attendance']));
    const state2 = reducer(initialState2, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });
    const resourceInfo2 = state2.getIn(['data', 'eventResource', value.resourceIndex]);
    const eventAttendanceError2 = state2.getIn(['error', 'entity', 'eventResource', value.resourceIndex, 'bookingDetail', value.bookingIndex, 'errors', 'attendance']);

    expect(resourceInfo2.get('prepCodeID')).toBe(-1);
    expect(resourceInfo2.get('setupMinutes')).toBe(0);
    expect(resourceInfo2.get('cleanupMinutes')).toBe(0);
    expect(eventAttendanceError2).toBe(false);
  });

  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "attendance" and template is equipment resource', () => {
    const initialState = fromJS(mockStateBookingInfo).updateIn(['data', 'eventResource', 0],
        template => template.set('resourceType', 1).updateIn(['bookingDetail', 0], booking => booking.set('attendance', 10)));

    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0,
      key: 'attendance',
      isForcedUpdateInfos: true
    };
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const attendance1 = state.getIn(['data', 'eventResource', 1, 'bookingDetail', 0, 'attendance']);
    const originalAttendance1 = mockStateBookingInfo.data.eventResource[1].bookingDetail[0].attendance;
    expect(attendance1).toEqual(originalAttendance1);

    const attendance2 = state.getIn(['data', 'eventResource', 2, 'bookingDetail', 0, 'attendance']);
    const originalAttendance2 = mockStateBookingInfo.data.eventResource[2].bookingDetail[0].attendance;
    expect(attendance2).toEqual(originalAttendance2);
  });


  it('CHANGE_RESOURCE_INFO_AUTO_FILL should works fine, if key is "newBooking" and template is equipment resource', () => {
    const initialState = fromJS(mockStateBookingInfo).updateIn(['data', 'eventResource', 0],
      template => template.set('resourceType', 1).set('prepCodeID', 12).set('cleanupMinutes', 15).set('setupMinutes', 30)
        .updateIn(['bookingDetail', 0], booking => booking.set('attendance', 10)))

    const { CHANGE_RESOURCE_INFO_AUTO_FILL } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0,
      key: 'newBooking',
      isForcedUpdateInfos: true
    };
    const state = reducer(initialState, {
      type: CHANGE_RESOURCE_INFO_AUTO_FILL,
      payload: {
        value
      }
    });

    const resource2 = state.getIn(['data', 'eventResource', 2]);
    const attendance2 = resource2.getIn(['bookingDetail', 0, 'attendance']);
    const originalResource2 = mockStateBookingInfo.data.eventResource[2];
    const originalAttendance2 = originalResource2.bookingDetail[0].attendance;
    expect(attendance2).toEqual(originalAttendance2);
    expect(resource2.get('prepCodeID')).toEqual(12);
    expect(resource2.get('cleanupMinutes')).toEqual(15);
    expect(resource2.get('setupMinutes')).toEqual(originalResource2.setupMinutes);
  });

  it('BOOKING_INFO_SHOW should works fine', () => {
    const { BOOKING_INFO_SHOW } = actions;

    const state = reducer(initialState, {
      type: BOOKING_INFO_SHOW
    });

    expect(state.get('display')).toBe(true);
  });

  it('BOOKING_INFO_SHOW should works fine, if the "display" property is true', () => {
    const { BOOKING_INFO_SHOW } = actions;

    const initialDisplay = Object.assign({}, initialData, {
      display: true
    });
    const initialState = fromJS(initialDisplay);

    const state = reducer(initialState, {
      type: BOOKING_INFO_SHOW
    });

    expect(state.get('display')).toBe(true);
  });

  it('BOOKING_INFO_HIDE should works fine', () => {
    const { BOOKING_INFO_HIDE } = actions;
    const state = reducer(initialState, {
      type: BOOKING_INFO_HIDE
    });

    expect(state.get('display')).toBe(false);
  });

  it('BOOKING_INFO_CLEAN should works fine', () => {
    const { BOOKING_INFO_CLEAN } = actions;

    let state = initialState.set('data', fromJS({
      permitID: 1,
      eventName: 'event name',
      scheduleTypeID: 1,
      scheduleType: 'schedule type',
      checkForWaitlistConflict: false,
      isPendingBookingsFetched: false,
      eventResource: [{
        resourceID: 1,
        resourceName: 'resource name',
        resourceNumber: 'number',
        resourceType: 'type',
        eventTypeID: 1,
        eventType: 'type',
        setupMinutes: 10,
        cleanupMinutes: 10,
        reservationPeriodUnit: 6,
        prepCodeID: 1,
        definedDateRange: [],
        rentalBlock: [],
        bookingDetail: []
      }]
    }));
    state = reducer(state, {
      type: BOOKING_INFO_CLEAN
    });

    expect(state.get('data').toJS()).toEqual({
      permitID: -1,
      eventName: '',
      scheduleTypeID: -1,
      scheduleType: '',
      checkForWaitlistConflict: true,
      eventResource: [],
      isPendingBookingsFetched: false
    });
  });

  it('BOOKING_INFO_CLEAN_ERROR should works fine', () => {
    const { BOOKING_INFO_CLEAN_ERROR } = actions;
    let state = initialState.set('error', fromJS({
      code: '1002',
      clientMessages: ['client error'],
      serverMessages: ['api error message'],
      conflictMessage: 'conflict error message',
      eventNameDuplicateMessage: 'This event name has been used by another event.',
      entity: {
        eventName: true,
        eventNameDuplicate: true,
        scheduleTypeID: true,
        eventResource: []
      }
    }));
    state = reducer(state, {
      type: BOOKING_INFO_CLEAN_ERROR
    });

    expect(state.get('error').toJS()).toEqual({
      code: null,
      clientMessages: [],
      serverMessages: [],
      conflictMessage: '',
      eventNameDuplicateMessage: '',
      belowMinimumNumber: 0,
      overMaximumNumber: 0,
      entity: {
        eventName: false,
        eventNameDuplicate: false,
        scheduleTypeID: false,
        eventResource: [],
        overrideRentalBlockTimeError: []
      }
    });
  });

  it('BOOKING_INFO_DISPLAY_CLIENT_ERRORS should works fine, if has event resource and no bookingDetail', () => {
    const { BOOKING_INFO_DISPLAY_CLIENT_ERRORS } = actions;
    const value = {
      clientMessages: ['error message'],
      entity: {
        eventName: true,
        eventNameDuplicate: true,
        scheduleTypeID: true,
        eventResource: [{
          resourceID: 2
        }]
      }
    };
    const expectResult = {
      code: null,
      clientMessages: ['error message'],
      serverMessages: [],
      entity: {
        eventName: true,
        scheduleTypeID: true,
        eventNameDuplicate: true,
        overrideRentalBlockTimeError: [],
        eventResource: [{
          resourceID: 2
        }]
      }
    };
    const state = reducer(initialState, {
      type: BOOKING_INFO_DISPLAY_CLIENT_ERRORS,
      payload: { value }
    });
    expect(state.get('error').toJS()).toEqual(expectResult);
  });

  it('BOOKING_INFO_DISPLAY_CLIENT_ERRORS should works fine, if has event resource and bookingDetail, but no errors', () => {
    const { BOOKING_INFO_DISPLAY_CLIENT_ERRORS } = actions;
    const value = {
      clientMessages: ['error message'],
      entity: {
        eventName: false,
        scheduleTypeID: false,
        eventResource: [{
          resourceID: 2,
          resourceName: 'kaely test equipment &amp;',
          'eventTypeID': false,
          'bookingDetail': [{
            'pendingID': 'pending_775_7160',
            resourceBookingID: 0,
            errors: {}
          }]
        }]
      }
    };
    const expectResult = {
      code: null,
      clientMessages: ['error message'],
      serverMessages: [],
      entity: {
        eventName: false,
        scheduleTypeID: false,
        overrideRentalBlockTimeError: [],
        eventResource: [{
          resourceID: 2,
          resourceName: 'kaely test equipment &amp;',
          eventTypeID: false,
          bookingDetail: [{
            pendingID: 'pending_775_7160',
            resourceBookingID: 0,
            errors: {}
          }]
        }]
      }
    };
    const state = reducer(initialState, {
      type: BOOKING_INFO_DISPLAY_CLIENT_ERRORS,
      payload: { value }
    });
    expect(state.get('error').toJS()).toEqual(expectResult);
  });

  it('BOOKING_INFO_DISPLAY_CLIENT_ERRORS should works fine, if has event resource and error', () => {
    const { BOOKING_INFO_DISPLAY_CLIENT_ERRORS } = actions;
    const value = {
      clientMessages: ['error message'],
      entity: {
        eventName: false,
        scheduleTypeID: false,
        eventResource: [{
          'resourceID': 2,
          'resourceName': 'kaely test equipment &amp;',
          'eventTypeID': false,
          'bookingDetail': [{
            'pendingID': 'pending_775_7160',
            resourceBookingID: 0,
            'errors': {
              conflictType: 'holiday'
            }
          }, {
            pendingID: 'pending_775_7161',
            resourceBookingID: 1,
            errors: {
              conflictType: 'holiday'
            }
          }]
        }]
      }
    };
    const expectResult = {
      code: null,
      clientMessages: ['error message'],
      serverMessages: [],
      conflictMessage: '',
      entity:
      {
        eventName: false,
        scheduleTypeID: false,
        overrideRentalBlockTimeError: [],
        eventResource: [{
          resourceID: 2,
          resourceName: 'kaely test equipment &amp;',
          eventTypeID: false,
          bookingDetail: [{
            pendingID: 'pending_775_7160',
            resourceBookingID: 0,
            errors: { conflictType: 'holiday' }
          },
          {
            pendingID: 'pending_775_7161',
            resourceBookingID: 1,
            errors: { conflictType: 'holiday' }
          }]
        }]
      }
    };
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DISPLAY_CLIENT_ERRORS,
      payload: { value }
    });

    expect(state.get('error').toJS()).toEqual(expectResult);
  });

  it('BOOKING_INFO_DISPLAY_CLIENT_ERRORS should works fine, no event resource', () => {
    const { BOOKING_INFO_DISPLAY_CLIENT_ERRORS } = actions;
    const value = {
      clientMessages: ['error message'],
      entity: {
        eventName: false,
        eventAttendance: false,
        eventTypeID: false,
        scheduleTypeID: false,
        details: []
      }
    };
    const expectResult = {
      code: null,
      clientMessages: ['error message'],
      serverMessages: [],
      entity: {
        eventName: false,
        eventAttendance: false,
        eventTypeID: false,
        scheduleTypeID: false,
        details: [],
        overrideRentalBlockTimeError: []
      }
    };
    const state = reducer(initialState, {
      type: BOOKING_INFO_DISPLAY_CLIENT_ERRORS,
      payload: { value }
    });
    expect(state.get('error').toJS()).toEqual(expectResult);
  });

  it('BOOKING_INFO_EVENT_UPDATE should works fine', () => {
    const { BOOKING_INFO_EVENT_UPDATE } = actions;
    const paramsValue = {
      key: 'permitID',
      value: '1'
    };
    const state = reducer(initialState, {
      type: BOOKING_INFO_EVENT_UPDATE,
      payload: { value: paramsValue }
    });

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['data', 'permitID'])).toBe(paramsValue.value);
  });

  it('BOOKING_INFO_EVENT_UPDATE should works fine, if key === "eventName"', () => {
    const { BOOKING_INFO_EVENT_UPDATE } = actions;
    const paramsValue = {
      key: 'eventName',
      value: '1'
    };
    const state = reducer(initialState, {
      type: BOOKING_INFO_EVENT_UPDATE,
      payload: { value: paramsValue }
    });

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['data', 'eventName'])).toBe(paramsValue.value);
    expect(state.getIn(['error', 'entity', 'eventNameDuplicate'])).toBe(false);
  });

  it('BOOKING_INFO_EVENT_UPDATE should works fine, if no value', () => {
    const { BOOKING_INFO_EVENT_UPDATE } = actions;
    const paramsValue = {
      key: 'eventName'
    };
    const state = reducer(initialState, {
      type: BOOKING_INFO_EVENT_UPDATE,
      payload: { value: paramsValue }
    });

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['data', 'eventName'])).toBe(undefined);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if resourceIndex and bookingIndex are equal to -1', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'key',
      resourceIndex: -1,
      bookingIndex: -1
    };
    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual([]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if resourceIndex and bookingIndex are equal to -1, key is "dateRangeID", and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'dateRangeID',
      resourceIndex: 0,
      bookingIndex: 0
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        overrideAdvanceMaximum: false,
        overrideAdvanceMinimum: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: undefined,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['invalidEventType']);
    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "startEventDate", and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'startEventDate',
      resourceIndex: 0,
      bookingIndex: 0,
      value: '2016 Dec 22'
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        overrideAdvanceMaximum: false,
        overrideAdvanceMinimum: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 22',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "startEventTime", and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'startEventTime',
      resourceIndex: 0,
      bookingIndex: 0
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        overrideAdvanceMaximum: false,
        overrideAdvanceMinimum: false,
        startEventTime: undefined,
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "endEventDate", and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'endEventDate',
      resourceIndex: 0,
      bookingIndex: 0,
      value: '2016 Dec 22'
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        overrideAdvanceMaximum: false,
        overrideAdvanceMinimum: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 22',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "endEventTime", and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'endEventTime',
      resourceIndex: 0,
      bookingIndex: 0
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        overrideAdvanceMaximum: false,
        overrideAdvanceMinimum: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: undefined,
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['invalidEventType']);
    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "eventTypeID", no value and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'eventTypeID',
      resourceIndex: 0,
      bookingIndex: -1
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: undefined,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['invalidEventType']);
    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "eventTypeID", has value, and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'eventTypeID',
      resourceIndex: 0,
      bookingIndex: -1,
      value: 'value'
    };

    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: 'value',
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['invalidEventType']);
    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "attendance", no value and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'attendance',
      resourceIndex: 0,
      bookingIndex: 0
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: undefined,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false,
        attendanceChanged: true
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['invalidEventType']);
    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "attendance", has value, and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'attendance',
      resourceIndex: 0,
      bookingIndex: 0,
      value: 'value'
    };

    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 'value',
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false,
        attendanceChanged: true
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['invalidEventType']);
    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "other key", and other errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'other key',
      resourceIndex: 0,
      bookingIndex: 0
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '12',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        overrideAdvanceMaximum: false,
        overrideAdvanceMinimum: false,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7159',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      dateRangeID: undefined,
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['invalidEventType']);
    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if resourceIndex and bookingIndex are equal to -1, key is "conflict", and conflict errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'conflict',
      resourceIndex: 0,
      bookingIndex: 0
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange:
      [{
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 4,
        name: '2016 Jun 16 to 2016 Jun 20',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 16 to 2016 Jun 20',
        value: 4
      }],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 6,
        pendingID: 'pending_775_7160',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: undefined
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasConflictErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['ANE56423 sally Facility day must be booked at least 2 day(s) in advance.']);
    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });

  it('BOOKING_INFO_DETAIL_UPDATE should works fine, if bookingIndex is equal to -1, key is "conflict", and conflict errors', () => {
    const { BOOKING_INFO_DETAIL_UPDATE } = actions;
    const bookingValue = {
      key: 'conflict',
      resourceIndex: -1,
      bookingIndex: -1
    };
    const expectResult = {
      setupMinutes: 0,
      isTemplate: true,
      resourceType: 0,
      resourceID: 7,
      rentalBlock: [],
      bookingDetail:
      [{
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '',
        rentalBlockID: 0,
        recurringEnabled: false,
        ignoreConflict: false,
        startEventTime: '2:00 AM',
        bookingAssignment: 0,
        reservationType: 0,
        resourceBookingID: 0,
        startEventDate: '2016 Dec 21',
        pendingRemoveFromRecurringGroup: '',
        attendance: 2,
        dateRangeID: 4,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        reservationPeriodUnit: 2,
        pendingID: 'pending_775_7160',
        isRecurring: false,
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreSkipdate: false
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes:
      [{
        id: 35,
        name: 'deserunt et',
        selected: false,
        text: 'deserunt et',
        value: 35
      },
      {
        id: 36,
        name: 'incididunt irure',
        selected: false,
        text: 'incididunt irure',
        value: 36
      }]
    };

    const initialState = fromJS(mockHasConflictErrBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: bookingValue
      }
    });

    const dataResult = state.getIn(['data', 'eventResource', bookingValue.resourceIndex]).toJS();

    expect(state.get('isBookingChanged')).toBe(true);
    expect(state.getIn(['error', 'code'])).toBe(null);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual([]);
    expect(dataResult.bookingDetail[0]).toEqual(expectResult.bookingDetail[0]);
  });


  it('TOGGLE_RECURRING_BOOKINGS should works fine', () => {
    const { TOGGLE_RECURRING_BOOKINGS } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0,
      value: 'test'
    };
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: TOGGLE_RECURRING_BOOKINGS,
      payload: {
        value
      }
    });

    const result = state.getIn(['data', 'eventResource', value.resourceIndex, 'bookingDetail', value.bookingIndex, 'expanded']);
    expect(result).toEqual(value.value);
  });

  it('PENDING_BOOKING_INFO_DETAIL_UPDATE should works fine', () => {
    const { PENDING_BOOKING_INFO_DETAIL_UPDATE } = actions;
    const value = {
      key: 'setupMinutes',
      index: 0,
      value: 10
    };
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: PENDING_BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value
      }
    });

    const result = state.getIn(['pendingBookingList', value.index, value.key]);
    expect(result).toEqual(value.value);
  });

  it('PENDING_BOOKING_INFO_DETAIL_UPDATE should works fine, if index is -1', () => {
    const { PENDING_BOOKING_INFO_DETAIL_UPDATE } = actions;
    const value = {
      key: 'setupMinutes',
      index: -1,
      value: 10
    };
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: PENDING_BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value
      }
    });

    const result = state.getIn(['pendingBookingList', value.index, value.key]);
    expect(result).toEqual(3);
  });

  it('DELETE_RECURRING_BOOKINGS should works fine', () => {
    const { DELETE_RECURRING_BOOKINGS } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0
    };
    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: DELETE_RECURRING_BOOKINGS,
      payload: {
        value
      }
    });

    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(0);
  });

  it('DELETE_RECURRING_BOOKINGS should works fine when resourceBookingID > 0 ', () => {
    const { DELETE_RECURRING_BOOKINGS } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 1
    };
    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: DELETE_RECURRING_BOOKINGS,
      payload: {
        value
      }
    });

    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(1);
  });

  it('DELETE_RECURRING_BOOKINGS should works fine when pendingResourceBookingID > 0 ', () => {
    const { DELETE_RECURRING_BOOKINGS } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 2
    };
    const initialState = fromJS(mockHasOtherErrBookingInfo);

    const state = reducer(initialState, {
      type: DELETE_RECURRING_BOOKINGS,
      payload: {
        value
      }
    });

    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(1);
  });

  it('DELETE_RECURRING_BOOKINGS should works fine, and it is baseBooking', () => {
    const { DELETE_RECURRING_BOOKINGS } = actions;
    const value = {
      resourceIndex: 1,
      bookingIndex: 0
    };
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: DELETE_RECURRING_BOOKINGS,
      payload: {
        value
      }
    });

    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(0);
  });

  it('DELETE_RECURRING_BOOKINGS should works fine, and it is baseBooking and resourceBookingID > 0', () => {
    const { DELETE_RECURRING_BOOKINGS } = actions;
    const value = {
      resourceIndex: 1,
      bookingIndex: 0
    };
    let bookInfo = mockStateBookingInfo;
    bookInfo.data.eventResource[1].bookingDetail[0].resourceBookingID = 10;
    const initialState = fromJS(bookInfo);

    const state = reducer(initialState, {
      type: DELETE_RECURRING_BOOKINGS,
      payload: {
        value
      }
    });

    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(2);
  });

  it('DELETE_RECURRING_BOOKINGS should works fine, and it is baseBooking and pendingResourceBookingID > 0 ', () => {
    const { DELETE_RECURRING_BOOKINGS } = actions;
    const value = {
      resourceIndex: 1,
      bookingIndex: 0
    };
    let bookInfo = mockStateBookingInfo;
    bookInfo.data.eventResource[1].bookingDetail[0].pendingResourceBookingID = 10;
    const initialState = fromJS(bookInfo);

    const state = reducer(initialState, {
      type: DELETE_RECURRING_BOOKINGS,
      payload: {
        value
      }
    });

    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(2);
  });

  it('DELETE_RECURRING_BOOKINGS should works fine, if parameters are invalid', () => {
    const { DELETE_RECURRING_BOOKINGS } = actions;
    const value = {
      resourceIndex: -1,
      bookingIndex: -1
    };
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: DELETE_RECURRING_BOOKINGS,
      payload: {
        value
      }
    });

    const result = state.getIn(['data', 'eventResource', value.resourceIndex, 'bookingDetail', value.bookingIndex, 'isDeleteSchedule']);

    expect(result).toEqual(false);
  });

  it('PENDING_BOOKING_INFO_DETAIL_UPDATE should works fine, if index is -1', () => {
    const { PENDING_BOOKING_INFO_DETAIL_UPDATE } = actions;
    const value = {
      key: 'setupMinutes',
      index: -1,
      value: 10
    };
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: PENDING_BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value
      }
    });

    const result = state.getIn(['pendingBookingList', value.index, value.key]);
    expect(result).toEqual(3);
  });

  it('BOOKING_INFO_DETAIL_DELETE should works fine, if resourceIndex and bookingIndex are -1', () => {
    const { BOOKING_INFO_DETAIL_DELETE } = actions;
    const value = {
      resourceIndex: -1,
      bookingIndex: -1
    };
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_DELETE,
      payload: {
        value
      }
    });

    const result = state.getIn(['data', 'eventResource', value.resourceIndex, 'bookingDetail', value.bookingIndex, 'isDeleteSchedule']);

    expect(state.get('templateState')).toEqual('has_template');
    expect(result).toEqual(false);
  });

  it('BOOKING_INFO_DETAIL_DELETE should works fine', () => {
    const { BOOKING_INFO_DETAIL_DELETE } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0
    };
    let bookInfo = mockStateBookingInfo;
    bookInfo.data.eventResource[0].bookingDetail[0].isDeleteSchedule = true;
    const initialState = fromJS(bookInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_DELETE,
      payload: {
        value
      }
    });

    expect(state.get('templateState')).toEqual('deleted');
    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(1);
  });

  it('BOOKING_INFO_DETAIL_DELETE should works fine, if has error and other bookings', () => {
    const { BOOKING_INFO_DETAIL_DELETE } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 1
    };
    const initialState = fromJS(mockStateRecurringBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_DELETE,
      payload: {
        value
      }
    });

    expect(state.get('templateState')).toEqual('no_template');
    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(1);
  });

  it('BOOKING_INFO_DETAIL_DELETE should works fine, if isRecurring is false and hasRecurring is true', () => {
    const { BOOKING_INFO_DETAIL_DELETE } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0
    };
    const initialState = fromJS(mockStateRecurringBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_DELETE,
      payload: {
        value
      }
    });

    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(0);
  });

  it('BOOKING_INFO_DETAIL_DELETE should works fine, if isRecurring is true and hasRecurring is false', () => {
    const { BOOKING_INFO_DETAIL_DELETE } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 1
    };

    const expectResult = {
      currentEvent: true,
      recurringExceptions: [],
      bookingIdentifier: 'pending_1424_4485',
      hasRecurring: false,
      baseBookingID: 'pending_1424_4484',
      rentalBlockID: 0,
      recurringEnabled: true,
      ignoreConflict: false,
      startEventTime: '2:00 AM',
      bookingAssignment: 0,
      reservationType: 0,
      resourceBookingID: 0,
      startEventDate: '2016 Dec 21',
      enableIgnoreConflict: false,
      pendingRemoveFromRecurringGroup: '',
      attendance: 3,
      dateRangeID: 0,
      recurringReservationGroupID: 0,
      isDeleteSchedule: true,
      endEventTime: '3:00 AM',
      endEventDate: '2016 Dec 21',
      errorResults: [],
      reservationPeriodUnit: 2,
      pendingID: 'pending_1424_4485',
      isRecurring: false,
      startEventDatetime: '12/21/2016 2:00 AM',
      ignoreClosetime: false,
      ownerPendingReceipt: true,
      masterFacilityScheduleID: null,
      transactionID: -1,
      expanded: false,
      endEventDatetime: '12/21/2016 3:00 AM',
      ignoreConflictType: 'not_show_ignore',
      ignoreSkipdate: false
    };

    const initialState = fromJS(mockStateRecurringBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_DELETE,
      payload: {
        value
      }
    });

    const deleteBookings = state.get('deleteBookings');
    expect(deleteBookings.size).toEqual(1);
  });

  it('BOOKING_INFO_DETAIL_DELETE should clean related resource over maximum reservation error', () => {
    const { BOOKING_INFO_DETAIL_DELETE } = actions;
    const value = {
      resourceIndex: 0,
      bookingIndex: 0
    };
    const initialState = fromJS(mockHasOverMaximumTimeBookingInfo);

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAIL_DELETE,
      payload: {
        value
      }
    });

    const hasOverMaximumTimeError = state.getIn(['error', 'entity', 'eventResource', 0, 'bookingDetail'])
      .some(booking => booking && booking.getIn(['errors', 'timeOverMaximum']));
    expect(hasOverMaximumTimeError).toBeFalsy();
  });

  it('BOOKING_INFO_DETAILS_ADD should works fine', () => {
    const { BOOKING_INFO_DETAILS_ADD } = actions;
    const value = {
      details: [{
        setupMinutes: 10,
        'resourceType': 0,
        resourceID: 1,
        'maximumTime': 0,
        'reservationPeriodUnit': 2,
        prepCodeID: 2,
        resourceNumber: '2323',
        resourceName: 'resourceType &apm;',
        closedTimes: [],
        'id': 1,
        'cleanupMinutes': 20,
        minimumTime: 0,
        resourceSkipDate: [],
        'startEventDate': '2016 Jun 04',
        'endEventDate': '2016 Jun 04',
        startEventTime: '1:00 PM',
        endEventTime: '4:00 PM'
      }],
      eventTypes: []
    };

    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAILS_ADD,
      payload: {
        value
      }
    });

    const result = state.getIn(['data', 'eventResource']).toJS();
    expect(result.length).toBe(1);
  });

  it('BOOKING_INFO_DETAILS_ADD should works fine, if no template', () => {
    const { BOOKING_INFO_DETAILS_ADD } = actions;
    const value = {
      details: [{
        setupMinutes: 10,
        resourceType: 0,
        'resourceID': 1,
        'maximumTime': 0,
        reservationPeriodUnit: 2,
        'prepCodeID': 2,
        resourceNumber: '2323',
        'resourceName': 'resourceType &apm;',
        closedTimes: [],
        'id': 1,
        cleanupMinutes: 20,
        minimumTime: 0,
        resourceSkipDate: [],
        startEventDate: '2016 Jun 04',
        endEventDate: '2016 Jun 04',
        startEventTime: '1:00 PM',
        'endEventTime': '4:00 PM'
      }],
      eventTypes: []
    };

    const state = reducer(fromJS(mockStateRecurringBookingInfo), {
      type: BOOKING_INFO_DETAILS_ADD,
      payload: {
        value
      }
    });

    const result = state.getIn(['data', 'eventResource']).toJS();
    expect(result.length).toBe(1);
  });

  it('BOOKING_INFO_DETAILS_ADD should works fine, if already has some resources', () => {
    const { BOOKING_INFO_DETAILS_ADD } = actions;
    const value = {
      details: [{
        'setupMinutes': 10,
        resourceType: 0,
        resourceID: 3,
        maximumTime: 0,
        'reservationPeriodUnit': 2,
        'prepCodeID': 2,
        'resourceNumber': '2323',
        'resourceName': 'resourceType &apm;',
        'closedTimes': [],
        'id': 1,
        'cleanupMinutes': 20,
        'minimumTime': 0,
        'resourceSkipDate': [],
        'startEventDate': '2016 Jun 04',
        endEventDate: '2016 Jun 04',
        'startEventTime': '1:00 PM',
        'endEventTime': '4:00 PM'
      }, {
        'setupMinutes': 10,
        'resourceType': 0,
        resourceID: 100,
        'maximumTime': 0,
        'reservationPeriodUnit': 2,
        'prepCodeID': 2,
        'resourceNumber': '2323',
        resourceName: 'resourceType &apm;',
        'closedTimes': [],
        id: 1,
        'cleanupMinutes': 20,
        minimumTime: 0,
        resourceSkipDate: [],
        'startEventDate': '2016 Jun 04',
        'endEventDate': '2016 Jun 04',
        startEventTime: '1:00 PM',
        'endEventTime': '4:00 PM'
      }, {
        setupMinutes: 10,
        resourceType: 1,
        'resourceID': 101,
        'maximumTime': 0,
        'reservationPeriodUnit': 6,
        prepCodeID: 2,
        resourceNumber: '2323',
        'resourceName': 'resourceType equipment',
        'closedTimes': [],
        id: 1,
        'cleanupMinutes': 20,
        'minimumTime': 0,
        resourceSkipDate: [],
        'startEventDate': '2016 Jun 04',
        'endEventDate': '2016 Jun 04',
        'startEventTime': '1:00 PM',
        'endEventTime': '4:00 PM'
      }, {
        'setupMinutes': 10,
        resourceType: 2,
        'resourceID': 102,
        'maximumTime': 0,
        reservationPeriodUnit: 7,
        'prepCodeID': 2,
        resourceNumber: '2323',
        'resourceName': 'resourceType equipment',
        closedTimes: [],
        'id': 1,
        cleanupMinutes: 20,
        'minimumTime': 0,
        'resourceSkipDate': [],
        'startEventDate': '2016 Jun 04',
        endEventDate: '2016 Jun 04',
        'startEventTime': '1:00 PM',
        endEventTime: '4:00 PM'
      }],
      eventTypes: [{
        available_resources: [{
          id: 1
        }]
      }]
    };

    const mockData = Object.assign({}, mockStateBookingInfo, {
      data: {
        ...mockStateBookingInfo.data,
        eventResource: [{
          ...mockStateBookingInfo.data.eventResource[0],
          resourceType: 1
        }]
      }
    });

    const initialState = fromJS(mockData);
    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAILS_ADD,
      payload: {
        value
      }
    });

    const result = state.getIn(['data', 'eventResource']).toJS();
    const facilityEvent = state.getIn(['data', 'eventResource', result.length - 3, 'bookingDetail', 0]).toJS();
    const equipmentEvent = state.getIn(['data', 'eventResource', result.length - 2, 'bookingDetail', 0]).toJS();
    const humanEvent = state.getIn(['data', 'eventResource', result.length - 1, 'bookingDetail', 0]).toJS();

    expect(result.length).toBe(5);
    expect(facilityEvent.attendance).toBe(1);
    expect(equipmentEvent.attendance).toBe(1);
    expect(humanEvent.attendance).toBe(2);
  });

  it('BOOKING_INFO_DETAILS_ADD should works fine, if the parameters eventypes is null', () => {
    const { BOOKING_INFO_DETAILS_ADD } = actions;
    const value = {
      details: [{
        setupMinutes: 10,
        resourceType: 0,
        'resourceID': 100,
        maximumTime: 0,
        reservationPeriodUnit: 2,
        'prepCodeID': 2,
        'resourceNumber': '2323',
        'resourceName': 'resourceType &apm;',
        'closedTimes': [],
        id: 1,
        cleanupMinutes: 20,
        'minimumTime': 0,
        resourceSkipDate: [],
        startEventDate: '2016 Jun 04',
        'endEventDate': '2016 Jun 04',
        startEventTime: '1:00 PM',
        endEventTime: '4:00 PM'
      }]
    };

    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAILS_ADD,
      payload: {
        value
      }
    });

    const result = state.getIn(['data', 'eventResource']).toJS();

    expect(result.length).toBe(5);
  });

  it('BOOKING_INFO_DETAILS_ADD should works fine, if already has some resources, and the resourceType of a item is 1.', () => {
    const { BOOKING_INFO_DETAILS_ADD } = actions;
    const value = {
      details: [{
        'setupMinutes': 10,
        'resourceType': 1,
        'resourceID': 2,
        maximumTime: 0,
        'reservationPeriodUnit': 6,
        'prepCodeID': 2,
        'resourceNumber': '2323',
        'resourceName': 'resourceType &apm;',
        closedTimes: [],
        id: 1,
        'cleanupMinutes': 20,
        minimumTime: 0,
        resourceSkipDate: [],
        startEventDate: '2016 Jun 04',
        endEventDate: '2016 Jun 04',
        'startEventTime': '1:00 PM',
        endEventTime: '4:00 PM'
      }, {
        'setupMinutes': 10,
        'resourceType': 0,
        resourceID: 9,
        maximumTime: 0,
        'reservationPeriodUnit': 7,
        'prepCodeID': 2,
        resourceNumber: '2323',
        'resourceName': 'resourceType &apm;',
        'closedTimes': [],
        'id': 1,
        'cleanupMinutes': 20,
        minimumTime: 0,
        'resourceSkipDate': [],
        startEventDate: '2016 Jun 04',
        endEventDate: '2016 Jun 04',
        startEventTime: '1:00 PM',
        endEventTime: '4:00 PM'
      }],
      eventTypes: []
    };

    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: BOOKING_INFO_DETAILS_ADD,
      payload: {
        value
      }
    });

    const result = state.getIn(['data', 'eventResource']).toJS();
    expect(result.length).toBe(5);
  });

  it('BOOKING_INFO_ALL_DETAILS_DELETE should works fine', () => {
    const { BOOKING_INFO_ALL_DETAILS_DELETE } = actions;

    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: BOOKING_INFO_ALL_DETAILS_DELETE
    });

    const result = state.getIn(['data', 'eventResource']).toJS();

    result.forEach((resource) => {
      if (resource.bookingDetail && resource.bookingDetail.length) {
        resource.bookingDetail.forEach((booking) => {
          expect(booking.isDeleteSchedule).toEqual(true);
          expect(booking.hasRecurring).toEqual(false);
        });
      }
    });
    expect(state.get('templateState')).toEqual('deleted');
    expect(state.getIn(['data', 'eventName'])).toEqual('');
    expect(state.getIn(['data', 'scheduleTypeID'])).toEqual(-1);
    expect(state.getIn(['data', 'scheduleType'])).toEqual('');
  });

  it('BOOKING_INFO_PROCEED_SUCCESS should works fine, if has valid value', () => {
    const { BOOKING_INFO_PROCEED_SUCCESS } = actions;
    const body = {
      error_result: {
        event_name: 'aa',
        schedule_type_id: 7,
        'check_for_waitlist_conflict': true,
        schedule_type: '3 schedule type',
        permit_id: -1,
        event_resource: [{
          'resource_id': 2,
          resource_name: 'resourceType &apm;',
          resource_number: '',
          'resource_type': 0,
          reservation_period_unit: 2,
          event_type_id: 6,
          'event_type': '\'South West Hub',
          'setup_minutes': 3,
          cleanup_minutes: 5,
          booking_detail: [{
            booking_identifier: 'pending_775_7159',
            'resource_booking_id': 11,
            'base_booking_id': '12',
            'transaction_id': -1,
            'reservation_type': 0,
            'rental_block_id': 0,
            'date_range_id': 0,
            attendance: 2,
            'start_event_datetime': '12/21/2016 2:00 AM',
            'end_event_datetime': '12/21/2016 3:00 AM',
            ignore_skipdate: false,
            'ignore_closetime': false,
            ignore_conflict: false,
            'pending_id': 'pending_775_7159',
            'error_results': [{
              error_type: 'too_less',
              'error_content': 'too less\n'
            }],
            'enable_ignore_conflict': true,
            is_delete_schedule: false
          }],
          prep_code_id: 2
        }, {
          'resource_id': 3,
          'resource_name': 'resourceType &apm;',
          resource_number: '',
          resource_type: 0,
          reservation_period_unit: 2,
          'event_type_id': 0,
          event_type: '\'South West Hub',
          setup_minutes: 3,
          'cleanup_minutes': 5,
          'booking_detail': [{
            'booking_identifier': 'pending_775_7160',
            resource_booking_id: 11,
            base_booking_id: '12',
            'transaction_id': -1,
            reservation_type: 0,
            'rental_block_id': 0,
            date_range_id: 0,
            attendance: 2,
            'start_event_datetime': '12/21/2016 2:00 AM',
            'end_event_datetime': '12/21/2016 3:00 AM',
            ignore_skipdate: false,
            ignore_closetime: false,
            'ignore_conflict': false,
            'pending_id': 'pending_775_7160',
            'error_results': [{
              error_type: 'conflict',
              error_content: 'conflict error\n'
            }],
            enable_ignore_conflict: true,
            is_delete_schedule: false
          }, {
            'booking_identifier': 'pending_775_0',
            'resource_booking_id': 11,
            'base_booking_id': '13',
            transaction_id: -1,
            'reservation_type': 0,
            rental_block_id: 0,
            'date_range_id': 0,
            attendance: 2,
            start_event_datetime: '12/21/2016 2:00 AM',
            'end_event_datetime': '12/21/2016 3:00 AM',
            ignore_skipdate: false,
            ignore_closetime: false,
            'ignore_conflict': false,
            pending_id: 'pending_775_0',
            error_results: [{
              error_type: 'invalid_event_type',
              error_content: 'invalid event type 1\n'
            }],
            'enable_ignore_conflict': true,
            'is_delete_schedule': false
          }],
          prep_code_id: 2
        }, {
          'resource_id': 4,
          'resource_name': 'resourceType &apm;',
          resource_number: '',
          resource_type: 0,
          reservation_period_unit: 2,
          event_type_id: 36,
          event_type: '\'South West Hub',
          'setup_minutes': 3,
          cleanup_minutes: 5,
          'booking_detail': [{
            'booking_identifier': 'pending_775_1',
            'resource_booking_id': 11,
            'base_booking_id': '13',
            transaction_id: -1,
            'reservation_type': 0,
            rental_block_id: 0,
            date_range_id: 0,
            attendance: 2,
            start_event_datetime: '12/21/2016 2:00 AM',
            'end_event_datetime': '12/21/2016 3:00 AM',
            ignore_skipdate: false,
            'ignore_closetime': false,
            'ignore_conflict': false,
            'pending_id': 'pending_775_1',
            'error_results': [{
              error_type: 'invalid_event_type',
              'error_content': 'invalid event type 2\n'
            }],
            enable_ignore_conflict: true,
            is_delete_schedule: false
          }],
          prep_code_id: 2
        }],
        error_msg_summary: 'Attendees for *lillian_facility is less than the required minimum (5) .\n'
      }
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);
    const state = reducer(initialState, {
      type: BOOKING_INFO_PROCEED_SUCCESS,
      payload: {
        body
      }
    });

    expect(state.getIn(['error', 'code'])).toEqual(null);
    expect(state.getIn(['error', 'clientMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['too less', 'invalid event type 1', 'invalid event type 2']);
    expect(state.getIn(['error', 'entity', 'eventResource']).toJS().length).toEqual(8);
  });

  it('BOOKING_INFO_PROCEED_SUCCESS and has over_advance_maximum should works fine, if has valid value', () => {
    const { BOOKING_INFO_PROCEED_SUCCESS } = actions;
    const body = {
      error_result: {
        new_entry_id: 0,
        event_id: 0,
        event_name: 'asdf',
        schedule_type_id: 14,
        grouped_errors: null,
        check_for_waitlist_conflict: true,
        schedule_type: '',
        permit_id: -1,
        event_resource: [{
          resource_id: 809,
          resource_name: 'edmund test bug',
          resource_number: '',
          resource_type: 0,
          reservation_period_unit: 1,
          event_type_id: 80,
          event_type: '62118-3',
          setup_minutes: 15,
          cleanup_minutes: 15,
          booking_detail: [{
            booking_identifier: 'pending_809_9948',
            master_booking_identifier: '',
            resource_booking_id: 0,
            pending_resource_booking_id: 0,
            transaction_id: -1,
            reservation_type: 0,
            rental_block_id: -1,
            date_range_id: 0,
            attendance: 1,
            start_event_datetime: '09/17/2018 11:45 AM',
            end_event_datetime: '09/17/2018 12:30 PM',
            ignore_skipdate: false,
            ignore_closetime: false,
            ignore_conflict: false,
            pending_id: 'pending_809_9948',
            error_results: [{
              error_type: 'below_advance_minimum',
              error_content: 'edmund test bug must be booked at least 1 day(s) in advance.',
              error_booking_identifiers: []
            }],
            enable_ignore_conflict: false,
            recurring_reservation_group: null,
            ignore_conflict_type: 'not_show_ignore',
            override_advance_maximum: false,
            override_advance_minimum: false,
            is_delete_schedule: false,
            is_rental_block_override: false
          }, {
            booking_identifier: 'pending_809_1206',
            master_booking_identifier: '',
            resource_booking_id: 0,
            pending_resource_booking_id: 0,
            transaction_id: -1,
            reservation_type: 0,
            rental_block_id: -1,
            date_range_id: 0,
            attendance: 1,
            start_event_datetime: '09/17/2018 1:45 PM',
            end_event_datetime: '09/17/2018 2:15 PM',
            ignore_skipdate: false,
            ignore_closetime: false,
            ignore_conflict: false,
            pending_id: 'pending_809_1206',
            error_results: [{
            error_type: 'over_advance_maximum',
            error_content: 'edmund test bug cannot be booked more than 3 day(s) in advance.',
            error_booking_identifiers: []
          }],
            enable_ignore_conflict: false,
            recurring_reservation_group: null,
            ignore_conflict_type: 'not_show_ignore',
            override_advance_maximum: false,
            override_advance_minimum: false,
            is_delete_schedule: false,
            is_rental_block_override: false
          }],
          prep_code_id: 2
        }],
        error_msg_summary: 'edmund test bug must be booked at least 1 day(s) in advance.↵edmund test bug cannot be booked more than 3 day(s) in advance.↵',
        event_name_unique_check_error: ''
      }
    };

    const initialState = fromJS({
      error: {
        entity: {
          eventResource: [{
            resourceID: 809,
            resourceName: 'edmund test bug',
            eventTypeID: false,
            bookingDetail: [{
              pendingID: 'pending_809_9948',
              resourceBookingID: 0,
              errors: {}
            }, {
              pendingID: 'pending_809_1206',
              resourceBookingID: 0,
              errors: {}
            }]
          }]
        }
      }
    });
    const state = reducer(initialState, {
      type: BOOKING_INFO_PROCEED_SUCCESS,
      payload: {
        body
      }
    });

    expect(state.getIn(['error', 'belowMinimumNumber'])).toEqual(1);
    expect(state.getIn(['error', 'overMaximumNumber'])).toEqual(1);
  });


  it('BOOKING_INFO_PROCEED_SUCCESS should works fine, if has valid value, but no the resourceID', () => {
    const { BOOKING_INFO_PROCEED_SUCCESS } = actions;
    const body = {
      'error_result': {
        event_name: 'aa',
        schedule_type_id: 7,
        'check_for_waitlist_conflict': true,
        schedule_type: '3 schedule type',
        permit_id: -1,
        event_resource: [{
          'resource_id': 9,
          resource_name: 'resourceType &apm;',
          resource_number: '',
          resource_type: 0,
          reservation_period_unit: 2,
          'event_type_id': 6,
          'event_type': '\'South West Hub',
          'setup_minutes': 3,
          cleanup_minutes: 5,
          booking_detail: [{
            'booking_identifier': 'pending_775_7150',
            resource_booking_id: 11,
            base_booking_id: '12',
            'transaction_id': -1,
            reservation_type: 0,
            'rental_block_id': 0,
            'date_range_id': 0,
            'attendance': 2,
            start_event_datetime: '12/21/2016 2:00 AM',
            'end_event_datetime': '12/21/2016 3:00 AM',
            ignore_skipdate: false,
            ignore_closetime: false,
            'ignore_conflict': false,
            'pending_id': 'pending_775_7160',
            'error_results': [{
              error_type: 'too_less',
              error_content: 'Requested reservation conflicts with an existing reservation (rubingtest, Dec 21, 2016, 1:49 AM to 10:21 AM).\n'
            }],
            enable_ignore_conflict: true,
            'is_delete_schedule': false
          }],
          prep_code_id: 2
        }],
        'error_msg_summary': 'Attendees for *lillian_facility is less than the required minimum (5) .\n'
      }
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);
    const state = reducer(initialState, {
      type: BOOKING_INFO_PROCEED_SUCCESS,
      payload: {
        body
      }
    });

    expect(state.getIn(['error', 'code'])).toEqual(null);
    expect(state.getIn(['error', 'clientMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'entity', 'eventResource']).toJS().length).toEqual(8);
  });

  it('BOOKING_INFO_PROCEED_SUCCESS should works fine, if has valid value, but with less error', () => {
    const { BOOKING_INFO_PROCEED_SUCCESS } = actions;
    const body = {
      error_result: {
        event_name: 'aa',
        schedule_type_id: 7,
        check_for_waitlist_conflict: true,
        schedule_type: '3 schedule type',
        permit_id: -1,
        event_resource: [{
          resource_id: 3,
          resource_name: 'resourceType &apm;',
          resource_number: '',
          resource_type: 0,
          reservation_period_unit: 2,
          event_type_id: 6,
          event_type: '\'South West Hub',
          setup_minutes: 3,
          cleanup_minutes: 5,
          booking_detail: [{
            booking_identifier: 'pending_775_7150',
            resource_booking_id: 0,
            transaction_id: -1,
            reservation_type: 0,
            rental_block_id: 0,
            date_range_id: 0,
            attendance: 2,
            start_event_datetime: '12/21/2016 2:00 AM',
            end_event_datetime: '12/21/2016 3:00 AM',
            ignore_skipdate: false,
            ignore_closetime: false,
            ignore_conflict: false,
            pending_id: 'pending_775_7160',
            error_results: [],
            enable_ignore_conflict: true,
            is_delete_schedule: false
          }],
          prep_code_id: 2
        }],
        error_msg_summary: 'Attendees for *lillian_facility is less than the required minimum (5) .\n'
      }
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);
    const state = reducer(initialState, {
      type: BOOKING_INFO_PROCEED_SUCCESS,
      payload: {
        body
      }
    });

    expect(state.getIn(['error', 'code'])).toBeNull();
    expect(state.getIn(['error', 'clientMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'entity', 'eventResource']).count()).toEqual(8);
    expect(state.getIn(['error', 'entity', 'eventResource', 1, 'bookingDetail', 0, 'errors']).toJS()).toEqual({});
  });

  it('BOOKING_INFO_PROCEED_SUCCESS should works fine, if meet event capacity error', () => {
    const { BOOKING_INFO_PROCEED_SUCCESS } = actions;
    const body = {
      error_result: {
        event_name: 'aa',
        schedule_type_id: 7,
        check_for_waitlist_conflict: true,
        schedule_type: '3 schedule type',
        permit_id: -1,
        event_resource: [{
          resource_id: 3,
          resource_name: 'resourceType &apm;',
          resource_number: '',
          resource_type: 0,
          reservation_period_unit: 2,
          event_type_id: 6,
          event_type: '\'South West Hub',
          setup_minutes: 3,
          cleanup_minutes: 5,
          booking_detail: [{
            booking_identifier: 'pending_775_7150',
            resource_booking_id: 0,
            transaction_id: -1,
            reservation_type: 0,
            rental_block_id: 0,
            date_range_id: 0,
            attendance: 2,
            start_event_datetime: '12/21/2016 2:00 AM',
            end_event_datetime: '12/21/2016 3:00 AM',
            ignore_skipdate: false,
            ignore_closetime: false,
            ignore_conflict: false,
            pending_id: 'pending_775_7160',
            error_results: [
              {
                error_booking_identifiers: [],
                error_content: "Attendees for resourceType &amp; is less than the required minimum (3).",
                error_type: "too_less_facility_event"
              }
            ],
            enable_ignore_conflict: true,
            is_delete_schedule: false
          }],
          prep_code_id: 2
        }],
        error_msg_summary: 'Attendees for resourceType &amp; is less than the required minimum (3).'
      }
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);
    const state = reducer(initialState, {
      type: BOOKING_INFO_PROCEED_SUCCESS,
      payload: {
        body
      }
    });

    const message = 'Attendees for resourceType &amp; is less than the required minimum (3).';
    expect(state.getIn(['error', 'code'])).toBeNull();
    expect(state.getIn(['error', 'clientMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'serverMessages', 0])).toEqual(message);
    expect(state.getIn(['error', 'entity', 'eventResource']).count()).toEqual(8);
    expect(state.getIn(['error', 'entity', 'eventResource', 1, 'bookingDetail', 0, 'errors', 'attendance'])).toEqual(message);
    expect(state.getIn(['error', 'entity', 'eventResource', 1, 'bookingDetail', 0, 'errors', 'eventCapacityLimit'])).toBeTruthy();
  });

  it('BOOKING_INFO_PROCEED_SUCCESS should works fine, if has valid value, but no error', () => {
    const { BOOKING_INFO_PROCEED_SUCCESS } = actions;
    const body = {
      error_result: {
        'event_name': 'aa',
        schedule_type_id: 7,
        check_for_waitlist_conflict: true,
        schedule_type: '3 schedule type',
        permit_id: -1,
        'event_resource': [{
          'resource_id': 10,
          resource_name: 'resourceType &apm;',
          'resource_number': '',
          resource_type: 0,
          'reservation_period_unit': 2,
          event_type_id: 6,
          event_type: '\'South West Hub',
          'setup_minutes': 3,
          cleanup_minutes: 5,
          booking_detail: [{
            booking_identifier: 'pending_775_7159',
            'resource_booking_id': 11,
            base_booking_id: '12',
            transaction_id: -1,
            reservation_type: 0,
            rental_block_id: 0,
            date_range_id: 0,
            attendance: 2,
            start_event_datetime: '12/21/2016 2:00 AM',
            end_event_datetime: '12/21/2016 3:00 AM',
            ignore_skipdate: false,
            ignore_closetime: false,
            'ignore_conflict': false,
            'pending_id': 'pending_775_7160',
            error_results: [],
            enable_ignore_conflict: true,
            is_delete_schedule: false
          }],
          'prep_code_id': 2
        }],
        error_msg_summary: 'Attendees for *lillian_facility is less than the required minimum (5) .\n'
      }
    };

    const initialState = fromJS(mockHasOtherErrBookingInfo);
    const state = reducer(initialState, {
      type: BOOKING_INFO_PROCEED_SUCCESS,
      payload: {
        body
      }
    });

    expect(state.getIn(['error', 'code'])).toEqual(null);
    expect(state.getIn(['error', 'clientMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'entity', 'eventResource']).toJS().length).toEqual(8);
  });

  it('BOOKING_INFO_PROCEED_SUCCESS should works fine, if no value', () => {
    const { BOOKING_INFO_PROCEED_SUCCESS } = actions;
    const body = {};

    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: BOOKING_INFO_PROCEED_SUCCESS,
      payload: {
        body
      }
    });

    expect(state.getIn(['error', 'code'])).toEqual(null);
    expect(state.getIn(['error', 'clientMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual([]);
    expect(state.getIn(['error', 'entity', 'eventResource']).toJS()).toEqual([]);
  });

  it('BOOKING_INFO_PROCEED_FAILURE should works fine, if it is a system error', () => {
    const { BOOKING_INFO_PROCEED_FAILURE } = actions;
    const error = {
      payload: {
        headers: {
          response_code: 1002,
          response_message: 'Event type is invalid for 1_daniel_test_hour'
        }
      }
    };
    const state = reducer(initialState, {
      type: BOOKING_INFO_PROCEED_FAILURE,
      error
    });

    expect(state.getIn(['error', 'code'])).toBe(1002);
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual(['Event type is invalid for 1_daniel_test_hour']);
  });

  it('BOOKING_INFO_PROCEED_FAILURE should works fine, if it is not a system error', () => {
    const { BOOKING_INFO_PROCEED_FAILURE } = actions;
    const error = {
      payload: {}
    };
    const state = reducer(initialState, {
      type: BOOKING_INFO_PROCEED_FAILURE,
      error
    });

    expect(state.getIn(['error', 'code'])).toBeNull();
    expect(state.getIn(['error', 'serverMessages']).toJS()).toEqual([]);
  });

  it('PERMIT_UPDATE_BOOKING_INFO should works fine, if value is empty', () => {
    const { PERMIT_UPDATE_BOOKING_INFO } = actions;
    const value = [];
    const state = reducer(initialState, {
      type: PERMIT_UPDATE_BOOKING_INFO,
      payload: {
        value
      }
    });

    expect(state.get('permitBookingList').toJS()).toEqual(value);
  });

  it('PERMIT_UPDATE_BOOKING_INFO should works fine, if the value is incorrect', () => {
    const { PERMIT_UPDATE_BOOKING_INFO } = actions;
    const value = [
      {
        date_range: [
          {
            id: 3,
            name: '2016 Jun 01 to 2016 Jun 03',
            selected: true,
            parent_id: 4
          }
        ],
        isDeleteSchedule: true,
        eventAttendace: 3,
        reservationPeriodUnit: 6,
        eventTypeId: 3,
        prepCodeId: -1,
        resourceType: 1
      },
      {
        rental_block: [
          {
            id: 2,
            name: '9:00 AM to 12:00 PM',
            selected: true,
            parent_id: 6
          }
        ],
        eventAttendace: 3,
        reservationPeriodUnit: 7,
        eventTypeId: 3,
        prepCodeId: -1
      },
      {
        rental_block: [
          {
            id: 2,
            name: '9:00 AM to 12:00 PM',
            selected: true,
            parent_id: 6
          }
        ],
        eventAttendace: 3,
        reservationPeriodUnit: 7,
        eventTypeId: 3,
        prepCodeId: -1,
        isRentalBlockOverride: true,
        startEventTime: '2:00 AM',
        endEventTime: '8:00 AM'
      }
    ];
    const expectResult = [
      {
        setupMinutes: undefined,
        definedDateRange: [
          {
            id: 3,
            name: '2016 Jun 01 to 2016 Jun 03',
            selected: true,
            parent_id: 4,
            text: '2016 Jun 01 to 2016 Jun 03',
            value: 3
          }
        ],
        resourceType: 1,
        resourceID: undefined,
        rentalBlock: [],
        bookingDetail: [
          {
            id: undefined,
            isRentalBlockOverride: false,
            endScheduleDate: undefined,
            hasRecurring: false,
            rentalBlockID: -1,
            recurringEnabled: false,
            ignoreConflict: true,
            startEventTime: undefined,
            bookingAssignment: undefined,
            reservationType: 0,
            resourceBookingID: -1,
            resourceType: 1,
            startEventDate: '',
            startScheduleTime: undefined,
            startScheduleDate: undefined,
            attendance: undefined,
            attendanceChanged: false,
            baseBookingID: '',
            dateRangeID: 3,
            isDeleteSchedule: true,
            date_range: [{
              id: 3,
              name: '2016 Jun 01 to 2016 Jun 03',
              selected: true,
              parent_id: 4,
              text: '2016 Jun 01 to 2016 Jun 03',
              value: 3
            }],
            dropStamp: null,
            endEventTime: undefined,
            endScheduleDatetime: 'undefined undefined',
            endEventDate: '',
            eventTypeId: 3,
            eventAttendace: 3,
            pendingRemoveFromRecurringGroup: '',
            reservationPeriodUnit: 6,
            pendingID: -1,
            isRecurring: false,
            startEventDatetime: '',
            ignoreClosetime: true,
            ownerPendingReceipt: undefined,
            startScheduleDatetime: 'undefined undefined',
            transactionID: -1,
            expanded: false,
            endEventDatetime: '',
            ignoreSkipdate: true,
            endScheduleTime: undefined,
            recurringPattern: undefined,
            recurringExceptions: [],
            masterFacilityScheduleID: null,
            currentEvent: true,
            recurringReservationGroupID: 0,
            prepCodeId: -1
          },
          {
            id: undefined,
            isRentalBlockOverride: false,
            endScheduleDate: undefined,
            hasRecurring: false,
            rentalBlockID: 2,
            recurringEnabled: true,
            ignoreConflict: true,
            startEventTime: undefined,
            bookingAssignment: undefined,
            reservationType: 0,
            resourceBookingID: -1,
            startEventDate: '',
            startScheduleTime: undefined,
            startScheduleDate: undefined,
            attendance: undefined,
            attendanceChanged: false,
            baseBookingID: '',
            dateRangeID: 0,
            dropStamp: null,
            isDeleteSchedule: false,
            endEventTime: undefined,
            endScheduleDatetime: 'undefined undefined',
            endEventDate: '',
            eventTypeId: 3,
            eventAttendace: 3,
            pendingRemoveFromRecurringGroup: '',
            reservationPeriodUnit: 7,
            pendingID: -1,
            rental_block: [{
              id: 2,
              name: '9:00 AM to 12:00 PM',
              selected: true,
              parent_id: 6,
              text: '9:00 AM to 12:00 PM',
              value: 2
            }],
            isRecurring: false,
            startEventDatetime: '',
            ignoreClosetime: true,
            ownerPendingReceipt: undefined,
            startScheduleDatetime: 'undefined undefined',
            transactionID: -1,
            expanded: false,
            endEventDatetime: '',
            ignoreSkipdate: true,
            endScheduleTime: undefined,
            recurringPattern: undefined,
            recurringExceptions: [],
            masterFacilityScheduleID: null,
            recurringReservationGroupID: 0,
            currentEvent: true,
            prepCodeId: -1
          },
          {
            id: undefined,
            isRentalBlockOverride: true,
            overrideRentalBlock: {
              id: 1487076708000,
              selected: false,
              name: '2:00 AM to 8:00 AM'
            },
            endScheduleDate: undefined,
            hasRecurring: false,
            rentalBlockID: 1487076708000,
            recurringEnabled: true,
            ignoreConflict: true,
            startEventTime: '2:00 AM',
            bookingAssignment: undefined,
            reservationType: 0,
            resourceBookingID: -1,
            startEventDate: '',
            startScheduleTime: undefined,
            startScheduleDate: undefined,
            attendance: undefined,
            attendanceChanged: false,
            baseBookingID: '',
            dateRangeID: 0,
            dropStamp: null,
            isDeleteSchedule: false,
            endEventTime: '8:00 AM',
            endScheduleDatetime: 'undefined undefined',
            endEventDate: '',
            eventTypeId: 3,
            eventAttendace: 3,
            pendingRemoveFromRecurringGroup: '',
            reservationPeriodUnit: 7,
            pendingID: -1,
            rental_block: [{
              id: 2,
              name: '9:00 AM to 12:00 PM',
              selected: true,
              parent_id: 6,
              text: '9:00 AM to 12:00 PM',
              value: 2
            }],
            isRecurring: false,
            startEventDatetime: '',
            ignoreClosetime: true,
            ownerPendingReceipt: undefined,
            startScheduleDatetime: 'undefined undefined',
            transactionID: -1,
            expanded: false,
            endEventDatetime: '',
            ignoreSkipdate: true,
            endScheduleTime: undefined,
            recurringPattern: undefined,
            recurringExceptions: [],
            masterFacilityScheduleID: null,
            recurringReservationGroupID: 0,
            currentEvent: true,
            prepCodeId: -1
          }
        ],
        eventTypeID: 3,
        eventTypes: [],
        reservationPeriodUnit: 6,
        eventType: undefined,
        prepCodeID: -1,
        resourceNumber: undefined,
        resourceName: undefined,
        cleanupMinutes: undefined
      }
    ];

    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: PERMIT_UPDATE_BOOKING_INFO,
      payload: {
        value
      }
    });
    expect(state.get('permitBookingList').toJS()).toEqual(expectResult);
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('PERMIT_UPDATE_BOOKING_INFO should works fine, if the value is incorrect', () => {
    const { PERMIT_UPDATE_BOOKING_INFO } = actions;
    const value = [
      {
        date_range: [
          {
            id: 3,
            name: '2016 Jun 01 to 2016 Jun 03',
            selected: true,
            parent_id: 4
          }
        ],
        isDeleteSchedule: true,
        eventAttendace: 3,
        reservationPeriodUnit: 6,
        eventTypeId: 3,
        prepCodeId: -1,
        resourceType: 1,
        resourceBookingID: 11
      },
      {
        rental_block: [
          {
            id: 2,
            name: '9:00 AM to 12:00 PM',
            selected: true,
            parent_id: 6
          }
        ],
        eventAttendace: 3,
        reservationPeriodUnit: 7,
        eventTypeId: 3,
        prepCodeId: -1
      },
      {
        rental_block: [
          {
            id: 2,
            name: '9:00 AM to 12:00 PM',
            selected: true,
            parent_id: 6
          }
        ],
        eventAttendace: 3,
        reservationPeriodUnit: 7,
        eventTypeId: 3,
        prepCodeId: -1,
        isRentalBlockOverride: true,
        startEventTime: '2:00 AM',
        endEventTime: '8:00 AM'
      }
    ];

    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
    mockStateBookingInfo.deleteBookings = [{resourceBookingID: 11, pendingID: -1}];
    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: PERMIT_UPDATE_BOOKING_INFO,
      payload: {
        value
      }
    });
    expect(state.get('permitBookingList').toJS()[0].bookingDetail.length).toBe(2);
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('PERMIT_UPDATE_BOOKING_INFO should works fine, if the value is correct', () => {
    const { PERMIT_UPDATE_BOOKING_INFO } = actions;
    const value = [
      {
        masterBookingIdentifier: '1',
        masterResourceBookingID: 1,
        recurringReservationGroup: {
          groupPatternContent: '{}',
          exceptionDateList: '{}',
          masterFacilityScheduleID: 1
        },
        resourceType: 1
      },
      {
        masterBookingIdentifier: '',
        masterResourceBookingID: 0,
        recurringReservationGroup: {
          groupPatternContent: null,
          exceptionDateList: null,
          masterFacilityScheduleID: 1
        }
      }, {
        masterBookingIdentifier: 1,
        recurringReservationGroup: null
      }
    ];
    const expectResult = [{
      setupMinutes: undefined,
      definedDateRange: [],
      resourceType: 1,
      resourceID: undefined,
      rentalBlock: [],
      bookingDetail: [{
        id: undefined,
        isRentalBlockOverride: false,
        resourceType: 1,
        endScheduleDate: undefined,
        currentEvent: true,
        recurringExceptions: {},
        hasRecurring: true,
        baseBookingID: 1,
        rentalBlockID: -1,
        recurringEnabled: false,
        ignoreConflict: true,
        startEventTime: undefined,
        bookingAssignment: undefined,
        reservationType: 0,
        resourceBookingID: -1,
        startEventDate: '',
        startScheduleTime: undefined,
        pendingRemoveFromRecurringGroup: '',
        startScheduleDate: undefined,
        attendance: undefined,
        attendanceChanged: false,
        dateRangeID: 0,
        dropStamp: null,
        recurringReservationGroupID: undefined,
        isDeleteSchedule: false,
        endEventTime: undefined,
        endScheduleDatetime: 'undefined undefined',
        endEventDate: '',
        pendingID: -1,
        isRecurring: true,
        recurringPattern: {},
        startEventDatetime: '',
        ignoreClosetime: true,
        ownerPendingReceipt: undefined,
        startScheduleDatetime: 'undefined undefined',
        masterFacilityScheduleID: 1,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '',
        ignoreSkipdate: true,
        endScheduleTime: undefined
      }, {
        id: undefined,
        isRentalBlockOverride: false,
        endScheduleDate: undefined,
        currentEvent: true,
        recurringExceptions: null,
        hasRecurring: true,
        baseBookingID: '',
        rentalBlockID: -1,
        recurringEnabled: false,
        ignoreConflict: true,
        startEventTime: undefined,
        bookingAssignment: undefined,
        reservationType: 0,
        resourceBookingID: -1,
        startEventDate: '',
        startScheduleTime: undefined,
        pendingRemoveFromRecurringGroup: '',
        startScheduleDate: undefined,
        attendance: undefined,
        attendanceChanged: false,
        dateRangeID: 0,
        dropStamp: null,
        recurringReservationGroupID: undefined,
        isDeleteSchedule: false,
        endEventTime: undefined,
        endScheduleDatetime: 'undefined undefined',
        endEventDate: '',
        pendingID: -1,
        isRecurring: false,
        recurringPattern: null,
        startEventDatetime: '',
        ignoreClosetime: true,
        ownerPendingReceipt: undefined,
        startScheduleDatetime: 'undefined undefined',
        masterFacilityScheduleID: 1,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '',
        ignoreSkipdate: true,
        endScheduleTime: undefined
      }, {
        id: undefined,
        isRentalBlockOverride: false,
        endScheduleDate: undefined,
        currentEvent: true,
        recurringExceptions: [],
        hasRecurring: false,
        baseBookingID: '',
        rentalBlockID: -1,
        recurringEnabled: true,
        ignoreConflict: true,
        startEventTime: undefined,
        bookingAssignment: undefined,
        reservationType: 0,
        resourceBookingID: -1,
        startEventDate: '',
        startScheduleTime: undefined,
        pendingRemoveFromRecurringGroup: '',
        startScheduleDate: undefined,
        attendance: undefined,
        attendanceChanged: false,
        dateRangeID: 0,
        dropStamp: null,
        recurringReservationGroupID: 0,
        isDeleteSchedule: false,
        endEventTime: undefined,
        endScheduleDatetime: 'undefined undefined',
        endEventDate: '',
        pendingID: -1,
        isRecurring: false,
        recurringPattern: undefined,
        startEventDatetime: '',
        ignoreClosetime: true,
        ownerPendingReceipt: undefined,
        startScheduleDatetime: 'undefined undefined',
        masterFacilityScheduleID: null,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '',
        ignoreSkipdate: true,
        endScheduleTime: undefined
      }],
      eventTypeID: undefined,
      reservationPeriodUnit: undefined,
      eventType: undefined,
      prepCodeID: undefined,
      resourceNumber: undefined,
      resourceName: undefined,
      cleanupMinutes: undefined,
      eventTypes: []
    }];

    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: PERMIT_UPDATE_BOOKING_INFO,
      payload: {
        value
      }
    });

    expect(state.get('permitBookingList').toJS()).toEqual(expectResult);
  });

  it('MERGE_PERMIT_AND_PENDING_BOOKINGS should works fine, if no value', () => {
    const { MERGE_PERMIT_AND_PENDING_BOOKINGS } = actions;

    const state = reducer(initialState, {
      type: MERGE_PERMIT_AND_PENDING_BOOKINGS,
      payload: {
        permitID: -1
      }
    });
    expect(state.getIn(['data', 'eventResource']).toJS().length).toEqual(0);
  });

  it('MERGE_PERMIT_AND_PENDING_BOOKINGS should works fine, if permitID=0', () => {
    const { MERGE_PERMIT_AND_PENDING_BOOKINGS } = actions;

    const state = reducer(initialState, {
      type: MERGE_PERMIT_AND_PENDING_BOOKINGS,
      payload: {
        permitID: 0
      }
    });
    expect(state.getIn(['data', 'eventResource']).toJS().length).toEqual(0);
  });

  it('MERGE_PERMIT_AND_PENDING_BOOKINGS should works fine, if has permitBookings, but no pendingBooking', () => {
    const { MERGE_PERMIT_AND_PENDING_BOOKINGS } = actions;

    const initialState = fromJS(mockStateRecurringBookingInfo);
    const state = reducer(initialState, {
      type: MERGE_PERMIT_AND_PENDING_BOOKINGS,
      payload: {
        permitID: -1
      }
    });

    expect(state.getIn(['data', 'eventResource']).toJS().length).toEqual(1);
  });

  it('MERGE_PERMIT_AND_PENDING_BOOKINGS should works fine, if has permitBookings, but pendingBooking and no bookingDetails', () => {
    const { MERGE_PERMIT_AND_PENDING_BOOKINGS } = actions;

    const mockData = Object.assign({}, mockStateRecurringBookingInfo, {
      permitBookingList: [{
        ...mockStateRecurringBookingInfo.permitBookingList[0],
        bookingDetail: [],
        resourceID: 2
      }],
      data: {
        ...mockStateRecurringBookingInfo.data,
        permitID: 1,
        eventName: 'event name',
        scheduleTypeID: 1,
        scheduleType: 'schedule type'
      }
    });

    const initialState = fromJS(mockData);
    const state = reducer(initialState, {
      type: MERGE_PERMIT_AND_PENDING_BOOKINGS,
      payload: {
        permitID: -1
      }
    });

    expect(state.getIn(['data', 'eventResource']).toJS().length).toEqual(2);
  });

  it('MERGE_PERMIT_AND_PENDING_BOOKINGS should works fine, if has permitBookings, but no pendingBooking and has bookingDetails', () => {
    const { MERGE_PERMIT_AND_PENDING_BOOKINGS } = actions;

    const mockData = Object.assign({}, mockStateRecurringBookingInfo, {
      permitBookingList: [{
        ...mockStateRecurringBookingInfo.permitBookingList[0],
        resourceID: 2
      }],
      data: {
        ...mockStateRecurringBookingInfo.data,
        permitID: 1,
        eventName: 'event name',
        scheduleTypeID: 1,
        scheduleType: 'schedule type'
      }
    });

    const initialState = fromJS(mockData);
    const state = reducer(initialState, {
      type: MERGE_PERMIT_AND_PENDING_BOOKINGS,
      payload: {
        permitID: -1
      }
    });

    expect(state.getIn(['data', 'eventResource']).toJS().length).toEqual(2);
  });

  it('MERGE_PERMIT_AND_PENDING_BOOKINGS should works fine, if has permitBookings and bookingDetails, but no pendingBooking and no validBookings', () => {
    const { MERGE_PERMIT_AND_PENDING_BOOKINGS } = actions;

    const mockData = Object.assign({}, mockStateRecurringBookingInfo, {
      permitBookingList: [{
        ...mockStateRecurringBookingInfo.permitBookingList[0],
        bookingDetail: [{
          ...mockStateRecurringBookingInfo.permitBookingList[0].bookingDetail[0],
          pendingID: 0
        }]
      }]
    });

    const initialState = fromJS(mockData);
    const state = reducer(initialState, {
      type: MERGE_PERMIT_AND_PENDING_BOOKINGS,
      payload: {
        permitID: -1
      }
    });

    expect(state.getIn(['data', 'eventResource']).toJS().length).toEqual(1);
  });

  it('MERGE_PERMIT_AND_PENDING_BOOKINGS should works fine', () => {
    const { MERGE_PERMIT_AND_PENDING_BOOKINGS } = actions;
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: MERGE_PERMIT_AND_PENDING_BOOKINGS,
      payload: {
        permitID: -1
      }
    });

    expect(state.getIn(['data', 'eventResource']).toJS().length).toEqual(5);
  });

  it('SET_RECURRING_BASE should works fine', () => {
    const payload = {
      resourceIndex: 1,
      bookingIndex: 1
    };

    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: SET_RECURRING_BASE,
      payload
    });

    expect(state.getIn(['recurring', 'base', 'resourceIndex'])).toEqual(payload.resourceIndex);
    expect(state.getIn(['recurring', 'base', 'bookingIndex'])).toEqual(payload.bookingIndex);
  });

  it('GENERATE_RECURRING_BOOKINGS_SUCCESS should works fine', () => {
    const body = {
      recurring_bookings: [{
        startEventDatetime: '2016 Dec 21 2:00 AM',
        endEventDatetime: '2016 Dec 21 3:00 AM'
      }]
    };

    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: GENERATE_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body
      }
    });

    const resourceIndex = state.getIn(['recurring', 'base', 'resourceIndex']);
    const bookingIndex = state.getIn(['recurring', 'base', 'bookingIndex']);
    const recurringEnabled = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'recurringEnabled']);
    const hasRecurring = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'hasRecurring']);

    expect(recurringEnabled).toEqual(false);
    expect(hasRecurring).toEqual(true);
  });

  it('GENERATE_RECURRING_BOOKINGS_SUCCESS should works fine, if no recurring bookings', () => {
    const body = {};

    const initialState = fromJS(mockStateBookingInfo);
    const state = reducer(initialState, {
      type: GENERATE_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body
      }
    });

    const resourceIndex = state.getIn(['recurring', 'base', 'resourceIndex']);
    const bookingIndex = state.getIn(['recurring', 'base', 'bookingIndex']);
    const recurringEnabled = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'recurringEnabled']);
    const hasRecurring = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'hasRecurring']);

    expect(recurringEnabled).toEqual(false);
    expect(hasRecurring).toEqual(false);
  });

  it('SET_CLEAR_RECURRING should works fine', () => {
    const { SET_CLEAR_RECURRING } = actions;
    const value = 'clear';
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: SET_CLEAR_RECURRING,
      payload: {
        value
      }
    });

    expect(state.getIn(['recurring', 'clear'])).toEqual(value);
  });

  it('SET_RECURRING_PATTERN should works fine', () => {
    const { SET_RECURRING_PATTERN } = actions;
    const pattern = {
      name: 'k'
    };
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: SET_RECURRING_PATTERN,
      payload: {
        pattern
      }
    });

    const resourceIndex = state.getIn(['recurring', 'base', 'resourceIndex']);
    const bookingIndex = state.getIn(['recurring', 'base', 'bookingIndex']);

    const result = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'recurringPattern']).toJS();

    expect(result).toEqual(pattern);
  });

  it('CLEAR_RECURRING_GROUPS should works fine', () => {
    const { CLEAR_RECURRING_GROUPS } = actions;
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: CLEAR_RECURRING_GROUPS
    });

    const resourceIndex = state.getIn(['recurring', 'base', 'resourceIndex']);
    const bookingIndex = state.getIn(['recurring', 'base', 'bookingIndex']);

    const result = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'isRecurring']);

    expect(result).toEqual(false);
  });

  it('UPDATE_IS_FILL_SCHEDULE_STATE should works fine', () => {
    const { UPDATE_IS_FILL_SCHEDULE_STATE } = actions;
    const initialState = fromJS(mockStateBookingInfo);

    const state = reducer(initialState, {
      type: UPDATE_IS_FILL_SCHEDULE_STATE,
      payload: true
    });


    const result = state.get('isFillSchedule');

    expect(result).toEqual(true);
  });

  it('RESET_OVERRIDE_RENTAL_BLOCK should works fine', () => {
    const { RESET_OVERRIDE_RENTAL_BLOCK } = actions;
    const initialState = fromJS({
      data: {
        eventResource: [{
          bookingDetail: [
            {},
            {
              overrideRentalBlock: {
                id: 1487076708000,
                name: `2:00 AM to 3:00 AM`,
                selected: false
              },
              isRentalBlockOverride: true
            }
          ]
        }]
      }
    });

    const state = reducer(initialState, {
      type: RESET_OVERRIDE_RENTAL_BLOCK,
      payload: {
        resourceIndex: 0,
        bookingIndex: 1
      }
    });


    const result = state.getIn(['data', 'eventResource', 0, 'bookingDetail', 1]);

    expect(result.get('overrideRentalBlock')).toBeUndefined();
    expect(result.get('isRentalBlockOverride')).toBeFalsy();
  });

  it('SET_OVERRIDE_RENTAL_BLOCK should works fine', () => {
    const { SET_OVERRIDE_RENTAL_BLOCK } = actions;
    const overrideRentalBlock = {
      id: 1487076708000,
      name: `2:00 AM to 3:00 AM`,
      selected: false
    };
    const initialState = fromJS({
      data: {
        eventResource: [{
          bookingDetail: [
            {},
            {
              isRentalBlockOverride: false
            }
          ]
        }]
      },
      error: initialData.error
    });

    const state = reducer(initialState, {
      type: SET_OVERRIDE_RENTAL_BLOCK,
      payload: {
        resourceIndex: 0,
        bookingIndex: 1,
        value: overrideRentalBlock
      }
    });


    const result = state.getIn(['data', 'eventResource', 0, 'bookingDetail', 1]);

    expect(result.get('isRentalBlockOverride')).toBeTruthy();
    expect(result.get('overrideRentalBlock').toJS()).toEqual(overrideRentalBlock);
  });

  it('SET_OVERRIDE_RENTAL_BLOCK_ERROR should works fine', () => {
    const { SET_OVERRIDE_RENTAL_BLOCK_ERROR } = actions;
    const initialState = fromJS({
      data: {
        eventResource: [{
          bookingDetail: [
            {
              id: 110,
              isRentalBlockOverride: true
            }
          ]
        }]
      },
      error: initialData.error
    });

    let state = reducer(initialState, {
      type: SET_OVERRIDE_RENTAL_BLOCK_ERROR,
      payload: {
        bookingID: 110,
        error: true
      }
    });
    let error = state.get('error');
    expect(error.getIn(['entity', 'overrideRentalBlockTimeError']).toJS()).toEqual([110]);
    expect(error.get('clientMessages').toJS()).toEqual([EARLIER_MSG]);

    state = reducer(state, {
      type: SET_OVERRIDE_RENTAL_BLOCK_ERROR,
      payload: {
        bookingID: 110,
        error: true
      }
    });
    error = state.get('error');
    expect(error.getIn(['entity', 'overrideRentalBlockTimeError']).toJS()).toEqual([110]);
    expect(error.get('clientMessages').toJS()).toEqual([EARLIER_MSG]);

    state = reducer(state, {
      type: SET_OVERRIDE_RENTAL_BLOCK_ERROR,
      payload: {
        bookingID: 110,
        error: false
      }
    });
    error = state.get('error');
    expect(error.getIn(['entity', 'overrideRentalBlockTimeError']).toJS()).toEqual([]);
    expect(error.get('clientMessages').toJS()).toEqual([]);
  });

  it('RESTORE__TO_RECURRING_GROUP should works fine', () => {
    const { RESTORE__TO_RECURRING_GROUP } = actions;
    const initialState = fromJS({
      data: {
        eventResource: [{
          bookingDetail: [
            {},
            {
              isRentalBlockOverride: false
            }
          ]
        }]
      },
      error: initialData.error
    });

    const state = reducer(initialState, {
      type: RESTORE__TO_RECURRING_GROUP,
      payload: {
        resourceIndex: 0,
        bookingIndex: 1
      }
    });


    const result = state.getIn(['data', 'eventResource', 0, 'bookingDetail', 1]);

    expect(result.get('pendingRemoveFromRecurringGroup')).toBe('');

    const state1 = reducer(initialState, {
      type: RESTORE__TO_RECURRING_GROUP,
      payload: {
        resourceIndex: -1,
        bookingIndex: 1
      }
    });
  });

  it('APPLY_RECURRING_BOOKINGS_FAIL set errors as expect', () => {
    const { APPLY_RECURRING_BOOKINGS_FAIL } = actions;
    const errorMessage = 'mock error message';
    const state = reducer(fromJS({}), {});
    const newState = reducer(state, {
      type: APPLY_RECURRING_BOOKINGS_FAIL,
      error: { payload: { headers: { response_message: errorMessage } } }
    })

    expect(newState.get('errors')).toBe(errorMessage);
  });

  it('APPLY_RECURRING_BOOKINGS_SUCCESS should works fine', () => {
    const { APPLY_RECURRING_BOOKINGS_SUCCESS } = actions;
    const body = {
      recurring_bookings: [{
        startEventDatetime: '2016 Dec 21 2:00 AM',
        endEventDatetime: '2016 Dec 21 3:00 AM'
      }]
    };
    const info = mockStateBookingInfo;
    info.currentApplyBaseBooking.resourceIndex = 1;
    const initialState = fromJS(info);
    const state = reducer(initialState, {
      type: APPLY_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body
      }
    });

    const resourceIndex = state.getIn(['currentApplyBaseBooking', 'resourceIndex']);
    const bookingIndex = state.getIn(['currentApplyBaseBooking', 'bookingIndex']);
    const baseBooking = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex]);
    const key = baseBooking.get('booking_identifier') || baseBooking.get('id');

    expect(state.getIn(['bookingApplyAbility', key])).toBeTruthy();
  });

  it('APPLY_RECURRING_BOOKINGS_SUCCESS should works fine, if no recurring bookings', () => {
    const { APPLY_RECURRING_BOOKINGS_SUCCESS } = actions;
    const body = {};
    const info = mockStateBookingInfo;
    info.currentApplyBaseBooking.resourceIndex = 1;
    const initialState = fromJS(info);
    const state = reducer(initialState, {
      type: APPLY_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body
      }
    });

    const resourceIndex = state.getIn(['currentApplyBaseBooking', 'resourceIndex']);
    const bookingIndex = state.getIn(['currentApplyBaseBooking', 'bookingIndex']);
    const recurringEnabled = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'recurringEnabled']);
    const hasRecurring = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'hasRecurring']);

    expect(recurringEnabled).toEqual(false);
    expect(hasRecurring).toEqual(false);
  });

  it('APPLY_RECURRING_BOOKINGS_SUCCESS not works fine, and errors back', () => {
    const { APPLY_RECURRING_BOOKINGS_SUCCESS } = actions;
    const body = {};
    const info = mockStateBookingInfo;
    info.currentApplyBaseBooking.resourceIndex = 1;
    const initialState = fromJS(info);
    const state = reducer(initialState, {
      type: APPLY_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body: {
          errors: {}
        }
      }
    });

    const resourceIndex = state.getIn(['currentApplyBaseBooking', 'resourceIndex']);
    const bookingIndex = state.getIn(['currentApplyBaseBooking', 'bookingIndex']);
    const baseBooking = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex]);
    const key = baseBooking.get('booking_identifier') || baseBooking.get('id');
    expect(state.getIn(['bookingApplyAbility', key])).toBeFalsy();
  });


  it('SET_APPLY_BOOKINGS should works fine', () => {
    const { SET_APPLY_BOOKINGS } = actions;
    const initialState = fromJS({
      applyBookings: {
        '2': {}
      },
      data: {
        eventResource: [{
          bookingDetail: [
            {},
            {
              isRentalBlockOverride: false
            }
          ]
        }]
      },
      error: initialData.error
    });
    const baseBooking = fromJS({index: 'whyy', id: '2'});
    const state = reducer(initialState, {
      type: SET_APPLY_BOOKINGS,
      payload: {
        baseBooking
      }
    });
    expect(state.getIn(['applyBookings', '2'])).toEqual(baseBooking);

    const baseBooking1 = fromJS({index: 'whyy', booking_identifier: '3'});
    const state1 = reducer(initialState, {
      type: SET_APPLY_BOOKINGS,
      payload: {
        baseBooking: baseBooking1
      }
    });

    const result1 = state1.getIn(['applyBookings', '3']);
    expect(state1.getIn(['applyBookings', '3'])).toEqual(baseBooking1);
  });

  it('RESTORE__TO_RECURRING_GROUP should works fine', () => {
    const { RESTORE__TO_RECURRING_GROUP } = actions;
    const initialState = fromJS({
      data: {
        eventResource: [{
          bookingDetail: [
            {},
            {
              isRentalBlockOverride: false
            }
          ]
        }]
      },
      error: initialData.error
    });

    const state = reducer(initialState, {
      type: RESTORE__TO_RECURRING_GROUP,
      payload: {
        resourceIndex: 0,
        bookingIndex: 1
      }
    });


    const result = state.getIn(['data', 'eventResource', 0, 'bookingDetail', 1]);

    expect(result.get('pendingRemoveFromRecurringGroup')).toBe('');

    const state1 = reducer(initialState, {
      type: RESTORE__TO_RECURRING_GROUP,
      payload: {
        resourceIndex: -1,
        bookingIndex: 1
      }
    });
  });

  it('APPLY_RECURRING_BOOKINGS_FAIL set errors as expect', () => {
    const { APPLY_RECURRING_BOOKINGS_FAIL } = actions;
    const errorMessage = 'mock error message';
    const state = reducer(fromJS({}), {});
    const newState = reducer(state, {
      type: APPLY_RECURRING_BOOKINGS_FAIL,
      error: { payload: { headers: { response_message: errorMessage } } }
    })

    expect(newState.get('errors')).toBe(errorMessage);
  });

  it('APPLY_RECURRING_BOOKINGS_SUCCESS should works fine when resourceBookingID < 0', () => {
    const { APPLY_RECURRING_BOOKINGS_SUCCESS } = actions;
    const body = {
      recurring_bookings: [{
        startEventDatetime: '2016 Dec 21 2:00 AM',
        endEventDatetime: '2016 Dec 21 3:00 AM'
      }]
    };

    const validateError =  {
      "code": null,
      "clientMessages": [],
      "serverMessages": ["Facility_5 must be reserved by the hour."],
      "conflictMessage": "Conflict Check: 4 conflicts found.",
      "eventNameDuplicateMessage": "",
      "belowMinimumNumber": 0,
      "overMaximumNumber": 0,
      "entity": {
        "eventName": false,
        "scheduleTypeID": false,
        "eventResource": [{
          "resourceID": 2,
          "resourceName": "Facility_5",
          "eventTypeID": false,
          "bookingDetail": [{
            "pendingID": "pending_12_4c49abe3-6e2f-4c82-fa93-e08d8110fe24",
            "resourceBookingID": 0,
            "errors": {},
            "baseBookingID": "13"
          }, {
            "pendingID": -1,
            "resourceBookingID": 60327,
            "errors": {
              "datetime": "Facility_5 must be reserved by the hour.\n",
              "conflictType": "holiday",
              "conflictReason": "Conflict with Skip Date:\ntest case (From Dec 1, 2020 to Jan 22, 2021).\n",
              "conflictIgnoreEnable": true,
              "conflictIgnoreType": "enable_ignore",
              "conflict": "Conflict with Skip Date:\ntest case (From Dec 1, 2020 to Jan 22, 2021).\n"
            },
            "baseBookingID": "dssdfdsfds"
          }, {
            "pendingID": -1,
            "resourceBookingID": 60328,
            "errors": {
              "datetime": "Facility_5 must be reserved by the hour.\n"
            },
            "baseBookingID": "60327"
          }, {
            "pendingID": -1,
            "resourceBookingID": 60329,
            "errors": {
              "datetime": "Facility_5 must be reserved by the hour.\n"
            },
            "baseBookingID": "60327"
          }, {
            "pendingID": -1,
            "resourceBookingID": 60330,
            "errors": {
              "datetime": "Facility_5 must be reserved by the hour.\n"
            },
            "baseBookingID": "60327"
          }, {
            "pendingID": "pending_12_4494872a-6f12-4695-9810-e003877df04c",
            "resourceBookingID": 0,
            "errors": {
              "conflictType": "holiday",
              "conflictReason": "Conflict with Skip Date:\ntest case (From Dec 1, 2020 to Jan 22, 2021).\n",
              "conflictIgnoreEnable": true,
              "conflictIgnoreType": "enable_ignore",
              "conflict": "Conflict with Skip Date:\ntest case (From Dec 1, 2020 to Jan 22, 2021).\n"
            },
            "baseBookingID": "pending_12_4c49abe3-6e2f-4c82-fa93-e08d8110fe24"
          }, {
            "pendingID": "pending_12_b02e1433-0283-404d-d856-493c1492e90b",
            "resourceBookingID": 0,
            "errors": {
              "conflictType": "holiday",
              "conflictReason": "Conflict with Skip Date:\ntest case (From Dec 1, 2020 to Jan 22, 2021).\n",
              "conflictIgnoreEnable": true,
              "conflictIgnoreType": "enable_ignore",
              "conflict": "Conflict with Skip Date:\ntest case (From Dec 1, 2020 to Jan 22, 2021).\n"
            },
            "baseBookingID": "pending_12_4c49abe3-6e2f-4c82-fa93-e08d8110fe24"
          }, {
            "pendingID": "pending_12_3d829cb9-5ba3-432b-d098-5a146f362a28",
            "resourceBookingID": 0,
            "errors": {
              "conflictType": "holiday",
              "conflictReason": "Conflict with Skip Date:\ntest case (From Dec 1, 2020 to Jan 22, 2021).\n",
              "conflictIgnoreEnable": true,
              "conflictIgnoreType": "enable_ignore",
              "conflict": "Conflict with Skip Date:\ntest case (From Dec 1, 2020 to Jan 22, 2021).\n"
            },
            "baseBookingID": "pending_12_4c49abe3-6e2f-4c82-fa93-e08d8110fe24"
          }]
        }],
        "overrideRentalBlockTimeError": [],
        "eventNameDuplicate": false
      }
    };

    const info = mockStateBookingInfo;
    info.error = validateError;
    info.currentApplyBaseBooking.resourceIndex = 3;
    info.data.eventResource[3].bookingDetail[0]['resourceBookingID'] = -1;
    info.bookingApplyAbility={};
    info.bookingApplyAbility['13'] = true
    const initialState = fromJS(info);
    const state = reducer(initialState, {
      type: APPLY_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body
      }
    });
    const resourceIndex = state.getIn(['currentApplyBaseBooking', 'resourceIndex']);
    const bookingIndex = state.getIn(['currentApplyBaseBooking', 'bookingIndex']);
    const recurringEnabled = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'recurringEnabled']);
    const hasRecurring = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'hasRecurring']);
    expect(recurringEnabled).toEqual(false);
    expect(hasRecurring).toEqual(true);
  });

  it('APPLY_RECURRING_BOOKINGS_SUCCESS should works fine when resourceBookingID > 0 ', () => {
    const { APPLY_RECURRING_BOOKINGS_SUCCESS } = actions;
    const body = {
      recurring_bookings: [{
        startEventDatetime: '2016 Dec 21 2:00 AM',
        endEventDatetime: '2016 Dec 21 3:00 AM'
      }]
    };

    const validateError = {
        code: null,
        clientMessages: [],
        serverMessages: [],
        conflictMessage: "",
        entity: {
            eventName: false,
            scheduleTypeID: false,
            eventResource: [
                {
                    "resourceID": 112,
                    "resourceName": "Facility_5",
                    "eventTypeID": false,
                    "bookingDetail": []
                }
            ],
            overrideRentalBlockTimeError: []
        }
    };
    const info = mockStateBookingInfo;
    info.error = validateError;
    info.currentApplyBaseBooking.resourceIndex = 3;
    info.data.eventResource[3].bookingDetail[0]['resourceBookingID'] = 11;
    info.bookingApplyAbility={};
    info.bookingApplyAbility['13'] = true
    const initialState = fromJS(info);
    const state = reducer(initialState, {
      type: APPLY_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body
      }
    });
    const resourceIndex = state.getIn(['currentApplyBaseBooking', 'resourceIndex']);
    const bookingIndex = state.getIn(['currentApplyBaseBooking', 'bookingIndex']);
    const recurringEnabled = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'recurringEnabled']);
    const hasRecurring = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'hasRecurring']);
    expect(recurringEnabled).toEqual(false);
    expect(hasRecurring).toEqual(true);
  });

  it('APPLY_RECURRING_BOOKINGS_SUCCESS should works fine, if no recurring bookings', () => {
    const { APPLY_RECURRING_BOOKINGS_SUCCESS } = actions;
    const body = {};
    const info = mockStateBookingInfo;
    info.currentApplyBaseBooking.resourceIndex = 3;
    const initialState = fromJS(info);
    const state = reducer(initialState, {
      type: APPLY_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body
      }
    });

    const resourceIndex = state.getIn(['currentApplyBaseBooking', 'resourceIndex']);
    const bookingIndex = state.getIn(['currentApplyBaseBooking', 'bookingIndex']);
    const recurringEnabled = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'recurringEnabled']);
    const hasRecurring = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex, 'hasRecurring']);

    expect(recurringEnabled).toEqual(false);
    expect(hasRecurring).toEqual(false);
  });

  it('SET_BASE_BOOKING_APPLY_ABILITY should works fine', () => {
    const { SET_BASE_BOOKING_APPLY_ABILITY } = actions;
    const initialState = fromJS({
      bookingApplyAbility: {
        '2': false
      },
      data: {
        eventResource: [{
          bookingDetail: [
            {},
            {
              isRentalBlockOverride: false
            }
          ]
        }]
      },
      error: initialData.error
    });
    const baseBooking = {index: 'whyy', id: '2'};
    const state = reducer(initialState, {
      type: SET_BASE_BOOKING_APPLY_ABILITY,
      payload: {
        baseBooking,
        hasApplyAbility: true
      }
    });
    expect(state.getIn(['bookingApplyAbility', '2'])).toBeTruthy();

    const baseBooking1 = {index: 'whyy', booking_identifier: '3'};
    const state1 = reducer(initialState, {
      type: SET_BASE_BOOKING_APPLY_ABILITY,
      payload: {
        baseBooking: baseBooking1,
        hasApplyAbility: false
      }
    });

    const result1 = state1.getIn(['bookingApplyAbility', '3']);
    expect(state1.getIn(['bookingApplyAbility', '3'])).toBeFalsy()
  });

  it('APPLY_RECURRING_BOOKINGS_SUCCESS should works fine when recurring bookings is more than UI bookings ', () => {
    const { APPLY_RECURRING_BOOKINGS_SUCCESS } = actions;
    const body = {
      recurring_bookings: [
      {
        startEventDatetime: '2016 Dec 21 2:00 AM',
        endEventDatetime: '2016 Dec 21 3:00 AM'
      }, 
      {
        startEventDatetime: '2016 Dec 21 2:00 AM',
        endEventDatetime: '2016 Dec 21 3:00 AM'
      }]
    };

    const validateError = {
        code: null,
        clientMessages: [],
        serverMessages: [],
        conflictMessage: "",
        entity: {
            eventName: false,
            scheduleTypeID: false,
            eventResource: [
                {
                    "resourceID": 112,
                    "resourceName": "Facility_5",
                    "eventTypeID": false,
                    "bookingDetail": []
                }
            ],
            overrideRentalBlockTimeError: []
        }
    };
    const info = mockStateBookingInfo;
    info.error = validateError;
    info.currentApplyBaseBooking.resourceIndex = 3;
    info.data.eventResource[3].bookingDetail[0]['resourceBookingID'] = 11;
    info.bookingApplyAbility={};
    info.bookingApplyAbility['13'] = true
    const initialState = fromJS(info);
    const state = reducer(initialState, {
      type: APPLY_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body
      }
    });
    const resourceIndex = state.getIn(['currentApplyBaseBooking', 'resourceIndex']);
    const bookingIndex = state.getIn(['currentApplyBaseBooking', 'bookingIndex']);
    const bookingDetail = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail']);
    expect(bookingDetail.size).toEqual(info.data.eventResource[3].bookingDetail.length);
  });

  it('APPLY_RECURRING_BOOKINGS_SUCCESS should works fine when recurring bookings is less than UI bookings ', () => {
    const { APPLY_RECURRING_BOOKINGS_SUCCESS } = actions;
    const body = {
      recurring_bookings: [
      {
        startEventDatetime: '2016 Dec 21 2:00 AM',
        endEventDatetime: '2016 Dec 21 3:00 AM'
      }]
    };

    const validateError = {
        code: null,
        clientMessages: [],
        serverMessages: [],
        conflictMessage: "",
        entity: {
            eventName: false,
            scheduleTypeID: false,
            eventResource: [
                {
                    "resourceID": 112,
                    "resourceName": "Facility_5",
                    "eventTypeID": false,
                    "bookingDetail": []
                }
            ],
            overrideRentalBlockTimeError: []
        }
    };
    const tempBooking = {
      currentEvent: true,
      recurringExceptions: [],
      hasRecurring: false,
      baseBookingID: '13',
      rentalBlockID: 0,
      recurringEnabled: false,
      ignoreConflict: false,
      startEventTime: '2:00 AM',
      bookingAssignment: 0,
      reservationType: 0,
      resourceBookingID: 11,
      startEventDate: '2016 Dec 21',
      pendingRemoveFromRecurringGroup: '',
      attendance: 2,
      dateRangeID: 4,
      recurringReservationGroupID: 0,
      isDeleteSchedule: false,
      endEventTime: '3:00 AM',
      endEventDate: '2016 Dec 21',
      reservationPeriodUnit: 6,
      pendingID: 'pending_775_71601',
      isRecurring: false,
      recurringPattern: 'recurring',
      startEventDatetime: '12/21/2016 2:00 AM',
      ignoreClosetime: false,
      ownerPendingReceipt: true,
      masterFacilityScheduleID: null,
      transactionID: -1,
      expanded: false,
      endEventDatetime: '12/21/2016 3:00 AM',
      ignoreSkipdate: false
    };

    const info = mockStateBookingInfo;
    info.error = validateError;
    info.currentApplyBaseBooking.resourceIndex = 3;
    info.data.eventResource[3].bookingDetail[0]['resourceBookingID'] = 11;
    info.data.eventResource[3].bookingDetail[3] = tempBooking;
    info.data.eventResource[3].bookingDetail[4] = tempBooking;
    info.bookingApplyAbility={};
    info.bookingApplyAbility['13'] = true
    const initialState = fromJS(info);
    const state = reducer(initialState, {
      type: APPLY_RECURRING_BOOKINGS_SUCCESS,
      payload: {
        body
      }
    });
    const resourceIndex = state.getIn(['currentApplyBaseBooking', 'resourceIndex']);
    const bookingIndex = state.getIn(['currentApplyBaseBooking', 'bookingIndex']);
    const bookingDetail = state.getIn(['data', 'eventResource', resourceIndex, 'bookingDetail']);
    expect(bookingDetail.size).toEqual(info.data.eventResource[3].bookingDetail.length - 2);
  });

  it('UPDATE_BOOKING_LIMITATION_CONTENT should works fine, if no recurring bookings', () => {
    const { UPDATE_BOOKING_LIMITATION_CONTENT } = actions;
    const initialState = fromJS(mockStateBookingInfo);
    const content = 'Reservation allows up to 700 bookings';
    const state = reducer(initialState, {
      type: UPDATE_BOOKING_LIMITATION_CONTENT,
      payload: {
        content
      }
    });
    expect(state.get('bookingLimitToastContent')).toEqual(content);
  });

  
  it('UPDATE_CURRENT_APPLY_BASE_BOOKING should works fine', () => {
    const { UPDATE_CURRENT_APPLY_BASE_BOOKING } = actions;
    const paramsValue = {
      resourceIndex: 0,
      bookingIndex: 1
    };
    const state = reducer(initialState, {
      type: UPDATE_CURRENT_APPLY_BASE_BOOKING,
      payload: paramsValue
    });

    expect(state.get('currentApplyBaseBooking').toJS()).toEqual(paramsValue);
  });
});