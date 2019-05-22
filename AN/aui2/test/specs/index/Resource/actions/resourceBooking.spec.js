import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import find from 'lodash/find';
import * as actions from 'index/Resource/actions/resourceBooking';
import { clearMockActions } from 'utils/mockDispatch';
import mockAPI from 'utils/mockAPI';

describe('index/Resource/actions/resourceBooking', () => {
  let store = null;
  let API = {
    get: null
  };
  const initialData = {
    permitID: -1,
    eventID: 2,
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      monthView: fromJS({showDayView: false}),
      resourceBooking: fromJS({ resource_ids: [1], start_date: '', end_date: '', }),
      bookingInfo: fromJS({
        data: {
          eventResource: [
            {
              setupMinutes: 0,
              bookingAssignment: 0,
              definedDateRange: [
                {
                  id: 17,
                  name: 'Dec 1, 2016 to Dec 30, 2016',
                  selected: true,
                  parent_id: 766,
                  text: 'Dec 1, 2016 to Dec 30, 2016',
                  value: 17
                }
              ],
              resourceType: 0,
              resourceID: 766,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: '1_resource_test_date_range_new',
              cleanupMinutes: 0,
              id: 766,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: true
              }, {
                resourceBookingID: 1,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1630',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: false,
                hasRecurring: true
              }]
            }, {
              setupMinutes: 0,
              bookingAssignment: 0,
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1
            }
          ]
        },
        prepCodeList: fromJS([
          { id: 6, text: 'edc5a12', value: 6 },
          { id: 7, text: '5604a49', value: 7 },
          { id: 8, text: 'f760c9c', value: 8 }
        ]),
        scheduleTypes: fromJS([]),
        setUpList: fromJS([]),
        error: {
          serverMessages: {},
          conflictMessage: []
        }
      }),
      resourceFilter: {
        centers: fromJS({
          selected: []
        }),
        eventTypes: fromJS({
          selected: []
        }),
        resourceTypes: fromJS({
          selected: []
        }),
        facilityTypes: fromJS({
          selected: []
        }),
        resources: fromJS({
          selected: []
        })
      },
      onboarding: fromJS({}),
      hideIntro: true,
      initialData
    });
    API.get = jest.fn();
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
    API = {
      get: null
    };
  });

  it('syncDataFromBookingInfoToCalendar should work fine', () => {
    const { syncDataFromBookingInfoToCalendar } = actions;

    store.dispatch(syncDataFromBookingInfoToCalendar());
    const action = first(store.getActions());

    expect(action.type).toBe('SYNC_DATA_FROM_BOOKING_INFO_TO_CALENDAR');
  });

  it('syncDataFromBookingInfoToCalendar should work fine, if reservationPeriodUnit are minute, hour, rental-block or day ', () => {
    const { syncDataFromBookingInfoToCalendar } = actions;

    const mockStore = configureStore(middlewares);
    store = mockStore({
      resourceBooking: fromJS({}),
      bookingInfo: fromJS({
        data: {
          eventResource: [
            {
              setupMinutes: 0,
              bookingAssignment: 0,
              resourceType: 0,
              resourceID: 766,
              reservationPeriodUnit: 1,
              resourceNumber: '',
              resourceName: '1_resource_test_date_range_new',
              cleanupMinutes: 0,
              id: 766,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: true
              }]
            }, {
              setupMinutes: 0,
              bookingAssignment: 0,
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: true
              }]
            }, {
              setupMinutes: 0,
              bookingAssignment: 0,
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 3,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: true
              }]
            }, {
              setupMinutes: 0,
              bookingAssignment: 0,
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 7,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: true
              }]
            }, {
              setupMinutes: 0,
              bookingAssignment: 0,
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 7,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1,
              rentalBlock: [
                {
                  id: 17,
                  name: 'Dec 1, 2016 to Dec 30, 2016',
                  selected: true,
                  parent_id: 766,
                  text: 'Dec 1, 2016 to Dec 30, 2016',
                  value: 17
                }
              ],
              bookingDetail: [
                {
                  resourceBookingID: 0,
                  attendance: 1,
                  rentalBlockID: 17,
                  pendingID: 'pending_766_1638',
                  endEventTime: '',
                  isDeleteSchedule: false,
                  isRecurring: true
                },
                {
                  resourceBookingID: 0,
                  attendance: 0,
                  rentalBlockID: 0,
                  pendingID: 'pending_766_1638',
                  endEventTime: '',
                  isDeleteSchedule: false,
                  isRecurring: true,
                  isRentalBlockOverride: true,
                  overrideRentalBlock: {
                    name: '4:00 PM to 7:00 PM'
                  }
                }
              ]
            }
          ]
        }
      }),
      initialData
    });
    store.dispatch(syncDataFromBookingInfoToCalendar());
    const action = first(store.getActions());

    expect(action.type).toBe('SYNC_DATA_FROM_BOOKING_INFO_TO_CALENDAR');
  });

  it('syncDataFromBookingInfoToCalendar should work fine, if have deleted booking and reservationPeriodUnit is date-range but not be selected ', () => {
    const { syncDataFromBookingInfoToCalendar } = actions;

    const mockStore = configureStore(middlewares);
    store = mockStore({
      bookingInfo: fromJS({
        data: {
          eventResource: [
            {
              setupMinutes: 0,
              bookingAssignment: 0,
              definedDateRange: [
                {
                  id: 17,
                  name: 'Dec 1, 2016 to Dec 30, 2016',
                  selected: false,
                  parent_id: 766,
                  text: 'Dec 1, 2016 to Dec 30, 2016',
                  value: 17
                }
              ],
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 16,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: true
              }]
            }, {
              setupMinutes: 0,
              bookingAssignment: 0,
              definedDateRange: [
                {
                  id: 17,
                  name: 'Dec 1, 2016 to Dec 30, 2016',
                  selected: false,
                  parent_id: 766,
                  text: 'Dec 1, 2016 to Dec 30, 2016',
                  value: 17
                }
              ],
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 16,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: true,
                isRecurring: true
              }]
            }
          ]
        }
      }),
      initialData
    });
    store.dispatch(syncDataFromBookingInfoToCalendar());
    const action = first(store.getActions());

    expect(action.type).toBe('SYNC_DATA_FROM_BOOKING_INFO_TO_CALENDAR');
  });

  it('setResourceIds should work fine', () => {
    const { SET_RESOURCE_IDS, setResourceIds } = actions;

    store.dispatch(setResourceIds(''));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_RESOURCE_IDS);
  });

  it('fetchResourcesBooking should work fine', () => {
    const { fetchResourcesBooking } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore({
      monthView: fromJS({showDayView: true}),
      resourceBooking: fromJS({ resource_ids: [1], start_date: '', end_date: '', }),
      bookingInfo: fromJS({
        data: {
          eventResource: [
            {
              setupMinutes: 0,
              bookingAssignment: 0,
              definedDateRange: [
                {
                  id: 17,
                  name: 'Dec 1, 2016 to Dec 30, 2016',
                  selected: true,
                  parent_id: 766,
                  text: 'Dec 1, 2016 to Dec 30, 2016',
                  value: 17
                }
              ],
              resourceType: 0,
              resourceID: 766,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: '1_resource_test_date_range_new',
              cleanupMinutes: 0,
              id: 766,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: true
              }, {
                resourceBookingID: 1,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1630',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: false,
                hasRecurring: true
              }]
            }, {
              setupMinutes: 0,
              bookingAssignment: 0,
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1
            }
          ]
        },
        prepCodeList: fromJS([
          { id: 6, text: 'edc5a12', value: 6 },
          { id: 7, text: '5604a49', value: 7 },
          { id: 8, text: 'f760c9c', value: 8 }
        ]),
        scheduleTypes: fromJS([]),
        setUpList: fromJS([]),
        error: {
          serverMessages: {},
          conflictMessage: []
        }
      }),
      resourceFilter: {
        centers: fromJS({
          selected: []
        }),
        eventTypes: fromJS({
          selected: []
        }),
        resourceTypes: fromJS({
          selected: []
        }),
        facilityTypes: fromJS({
          selected: []
        }),
        resources: fromJS({
          selected: []
        })
      },
      onboarding: fromJS({}),
      hideIntro: true,
      initialData
    });

    return store.dispatch(fetchResourcesBooking())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
           === 'FETCH_RESOURCES_BOOKING_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'BOOKING_INFO_CLEAN_ERROR')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'MERGE_PERMIT_AND_PENDING_BOOKINGS')).toBeTruthy();
      });
  });

  it('fetchResourcesBooking should work fine if it\'s changing date', () => {
    const { fetchResourcesBooking } = actions;
    const cleanError = false;
    return store.dispatch(fetchResourcesBooking({}, cleanError))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'FETCH_RESOURCES_BOOKING_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'BOOKING_INFO_CLEAN_ERROR')).toBeFalsy();
        expect(storeActions.some(action => action.type
          === 'MERGE_PERMIT_AND_PENDING_BOOKINGS')).toBeTruthy();
      });
  });


  it('fetchResourcesBooking should work fine if no select resource', () => {
    const { fetchResourcesBooking } = actions;

    mockAPI({
      path: '/json/Resource/resourceBookingInfos.json',
      result: {
        headers: {
          response_code: '0000',
          response_message: 'success'
        },
        body: {
          booking_list: {}
        }
      }
    });

    return store.dispatch(fetchResourcesBooking())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'FETCH_RESOURCES_BOOKING_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_PENDING_BOOKINGS_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'BOOKING_INFO_CLEAN_ERROR')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'MERGE_PERMIT_AND_PENDING_BOOKINGS')).toBeTruthy();
      });
  });

  it('deleteBookingBlockAction should work fine', () => {
    const { deleteBookingBlockAction } = actions;

    const booking = {
      resourceBookingID: 1,
      attendance: 1,
      dateRangeID: 17,
      pendingID: 'pending_766_1630',
      endEventTime: '',
      isDeleteSchedule: false,
      isRecurring: false,
      hasRecurring: true
    };

    store.dispatch(deleteBookingBlockAction(booking));

    const action = first(store.getActions());

    expect(action.type).toBe('SET_CLEAR_RECURRING');
  });

  it('deleteBookingBlockAction should work fine, no recurring booking', () => {
    const { deleteBookingBlockAction } = actions;

    const booking = {
      resourceBookingID: 0,
      attendance: 1,
      dateRangeID: 17,
      pendingID: 'pending_766_1630',
      endEventTime: '',
      isDeleteSchedule: false,
      isRecurring: true,
      hasRecurring: false
    };

    const mockStore = configureStore(middlewares);

    store = mockStore({
      bookingInfo: fromJS({
        data: {
          eventResource: [
            {
              setupMinutes: 0,
              bookingAssignment: 0,
              definedDateRange: [
                {
                  id: 17,
                  name: 'Dec 1, 2016 to Dec 30, 2016',
                  selected: true,
                  parent_id: 766,
                  text: 'Dec 1, 2016 to Dec 30, 2016',
                  value: 17
                }
              ],
              resourceType: 0,
              resourceID: 766,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: '1_resource_test_date_range_new',
              cleanupMinutes: 0,
              id: 766,
              bookingDetail: [{
                resourceBookingID: 1,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1630',
                endEventTime: '',
                isDeleteSchedule: false,
                isRecurring: false,
                hasRecurring: false
              }]
            }, {
              setupMinutes: 0,
              bookingAssignment: 0,
              resourceType: 0,
              resourceID: 1,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: 'resource1',
              cleanupMinutes: 0,
              id: 1
            }
          ]
        },
        prepCodeList: fromJS([
          { id: 6, text: 'edc5a12', value: 6 },
          { id: 7, text: '5604a49', value: 7 },
          { id: 8, text: 'f760c9c', value: 8 }
        ]),
        scheduleTypes: fromJS([]),
        setUpList: fromJS([]),
        error: {
          serverMessages: {},
          conflictMessage: []
        }
      }),
      onboarding: fromJS({}),
      hideIntro: true,
      initialData
    });

    store.dispatch(deleteBookingBlockAction(booking));

    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type
      === 'BOOKING_INFO_DETAIL_DELETE')).toBeTruthy();
      expect(storeActions.some(action => action.type
        === 'SYNC_DATA_FROM_BOOKING_INFO_TO_CALENDAR')).toBeTruthy();
  });

  it('changeResourceIds should work fine', () => {
    const { changeResourceIds } = actions;
    const params = {
      initResource: {
        resourceID: 1
      },
      resource_ids: '1',
      selected_date: '2016 JUN 4',
      include_linked_resources: true
    };
    const values = [1];

    return store.dispatch(changeResourceIds(values, params))
      .then(() => {
        const storeActions = store.getActions();
        const actionChange = find(storeActions, action => action.type === 'SET_RESOURCE_IDS');

        expect(actionChange.payload.value).toEqual(values);
        expect(storeActions.some(action => action.type
           === 'FETCH_RESOURCES_BOOKING_SUCCESS')).toBeTruthy();
      });
  });

  it('changeResourceIds should work fine, no params', () => {
    const { changeResourceIds } = actions;
    const params = {};
    const values = [1];

    return store.dispatch(changeResourceIds(values, params))
      .then(() => {
        const storeActions = store.getActions();
        const actionChange = find(storeActions, action => action.type === 'SET_RESOURCE_IDS');

        expect(actionChange.payload.value).toEqual(values);
        expect(storeActions.some(action => action.type
          === 'FETCH_SCHEDULE_TYPES_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SEND_EMPTY_REQUEST')).toBeTruthy();
      });
  });

  it('deleteResourceInfo should work fine', () => {
    const { deleteResourceInfo } = actions;

    store.dispatch(deleteResourceInfo(''));
    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type
      === 'SET_QUICK_VIEW')).toBeTruthy();

    expect(storeActions.some(action => action.type
      === 'DELETE_RESOURCES_INFO')).toBeTruthy();
  });

  it('setResourceSelectedDateAction should work fine', () => {
    const { SET_RESOURCE_SELECTED_DATE, setResourceSelectedDateAction } = actions;

    store.dispatch(setResourceSelectedDateAction(''));
    const action = first(store.getActions());

    expect(action.type).toBe(SET_RESOURCE_SELECTED_DATE);
  });

  it('changeResourceSelectedDate should work fine', (done) => {
    const { changeResourceSelectedDate } = actions;
    const values = [1];
    const params = {
      resource_ids: [1, 2]
    };

    return store.dispatch(changeResourceSelectedDate(values, params))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'SET_RESOURCE_SELECTED_DATE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_RESOURCES_BOOKING_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_SCHEDULE_TYPES_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'PERMIT_UPDATE_BOOKING_INFO')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_PENDING_BOOKINGS_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'PENDING_BOOKING_INFO_DETAIL_UPDATE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_DEFINED_DATE_RANGE_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'PENDING_BOOKING_INFO_DETAIL_UPDATE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_RENTAL_BLOCK_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'BOOKING_INFO_CLEAN_ERROR')).toBeFalsy();
        expect(storeActions.some(action => action.type
          === 'MERGE_PERMIT_AND_PENDING_BOOKINGS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SYNC_DATA_FROM_BOOKING_INFO_TO_CALENDAR')).toBeTruthy();
        done();
      });
  });

  it('changeResourceSelectedDate should work fine, no params', () => {
    const { changeResourceSelectedDate } = actions;
    store.dispatch(changeResourceSelectedDate());
    const action = first(store.getActions());

    expect(action.type).toBe('SET_RESOURCE_SELECTED_DATE');
    expect(action.payload.value).toBeFalsy();
  });

  it('resize should work fine', () => {
    const { WINDOW_RESIZE, resize } = actions;

    store.dispatch(resize(0));
    const action = first(store.getActions());

    expect(action.type).toBe(WINDOW_RESIZE);
  });

  it('fetchReady4Checkout should work fine, no params', () => {
    const {
      fetchReady4Checkout,
      FETCH_READY4CHECKOUT_SUCCESS
    } = actions;

    return store.dispatch(fetchReady4Checkout())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === FETCH_READY4CHECKOUT_SUCCESS)).toBeTruthy();
      });
  });

  it('fetchInCart should work fine, no params', () => {
    const {
      fetchInCart,
      FETCH_INCART_SUCCESS
    } = actions;

    return store.dispatch(fetchInCart())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === FETCH_INCART_SUCCESS)).toBeTruthy();
      });
  });
});
