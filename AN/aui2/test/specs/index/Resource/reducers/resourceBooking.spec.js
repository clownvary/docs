import { fromJS } from 'immutable';
import { START_EVENT_DATE } from 'index/Resource/components/FullCalendar/utils';
import {
  SET_RESOURCE_IDS,
  SET_RESOURCE_SELECTED_DATE,
  FETCH_RESOURCES_BOOKING_SUCCESS,
  FETCH_RESOURCES_BOOKING_FAILURE,
  DELETE_RESOURCES_INFO,
  WINDOW_RESIZE,
  SEND_EMPTY_REQUEST,
  SYNC_DATA_FROM_BOOKING_INFO_TO_CALENDAR,
  FETCH_READY4CHECKOUT_SUCCESS,
  FETCH_INCART_SUCCESS
} from 'index/Resource/actions/resourceBooking';
import getResourceBookingReducer from 'index/Resource/reducers/resourceBooking';
import mockData from './mockState/resourceBookingInfo';
const reducer = getResourceBookingReducer();
const defaultStates = {
  resource_ids: [],
  selected_date: START_EVENT_DATE,
  include_linked_resources: true,
  resourceInfo: [],
  bookingInfo: [],
  resize: false,
  ready4Checkout: false, // if current receipt is valid to make payment
  inCart: false // reservation has added into shopping cart
}

describe('index/Resource/reducers/resourceBooking', () => {
  test('SYNC_DATA_FROM_BOOKING_INFO_TO_CALENDAR set bookingInfo as expect', () => {
    const newTestBookingInfo = [{ id: 1, name: 'some new booking' }]

    let state = reducer(fromJS({
      ...defaultStates,
      bookingInfo: null
    }), {
      type: SYNC_DATA_FROM_BOOKING_INFO_TO_CALENDAR,
      payload: { value: newTestBookingInfo }
    });

    expect(state.get('bookingInfo').toJS()).toEqual(newTestBookingInfo);

    state = reducer(fromJS({
      ...defaultStates,
      bookingInfo: mockData.bookingInfo
    }), {});

    expect(state.get('bookingInfo').size).toBe(mockData.bookingInfo.length);

    state = reducer(state, {
      type: SYNC_DATA_FROM_BOOKING_INFO_TO_CALENDAR,
      payload: { value: newTestBookingInfo }
    });

    const filteredBookingInfo = mockData.bookingInfo.filter(item =>
      (item.bookingAssignment !== 0 && item.permitID !== -1 && !item.currentEvent) ||
      item.ownerPendingReceipt === false)

    expect(state.get('bookingInfo').toJS()).toEqual(filteredBookingInfo.concat(newTestBookingInfo));
  });

  test('SET_RESOURCE_IDS set resource_ids as expect', () => {
    const state = reducer(undefined, {
      type: SET_RESOURCE_IDS,
      payload: { value: mockData.resourceIds }
    });

    expect(state.get('resource_ids').toJS()).toEqual(mockData.resourceIds);
  });

  test('DELETE_RESOURCES_INFO set resourceInfo as expect', () => {
    const state = reducer(undefined, {
      type: DELETE_RESOURCES_INFO,
      payload: { value: mockData.resourceInfo }
    });

    expect(state.get('resourceInfo').toJS()).toEqual(mockData.resourceInfo);
  });

  test('SET_RESOURCE_SELECTED_DATE changes start_date as expect', () => {
    const state = reducer(undefined, {
      type: SET_RESOURCE_SELECTED_DATE,
      payload: { value: mockData.start_date }
    });

    expect(state.get('start_date')).toBe(mockData.start_date);
  });

  test('FETCH_RESOURCES_BOOKING_SUCCESS save resourceInfo and bookingInfo as expect', () => {
    let state = reducer(undefined, {
      type: FETCH_RESOURCES_BOOKING_SUCCESS,
      payload: {
        body: { booking_list: null }
      }
    });

    expect(state.get('bookingInfo').toJS()).toEqual([]);
    expect(state.get('resourceInfo').toJS()).toEqual([]);

    state = reducer(state, {
      type: FETCH_RESOURCES_BOOKING_SUCCESS,
      payload: {
        body: { booking_list: mockData.bookingList }
      }
    });

    expect(state.get('bookingInfo').size).toBe(mockData.bookingList.bookingInfo.length);
    expect(state.get('resourceInfo').size).toBe(mockData.bookingList.resourceInfo.length);
  });

  test('FETCH_RESOURCES_BOOKING_FAILURE clears resource_ids as expect', () => {
    let state = reducer(fromJS({
      ...defaultStates,
      resource_ids: mockData.resourceIds
    }), {});

    expect(state.get('resource_ids').toJS()).toEqual(mockData.resourceIds);

    state = reducer(state, {
      type: FETCH_RESOURCES_BOOKING_FAILURE
    });

    expect(state.get('resource_ids').toJS()).toEqual([]);
  });

  test('WINDOW_RESIZE set resize as expect', () => {
    let state = reducer(undefined, {});

    expect(state.get('resize')).toBe(false);

    state = reducer(state, {
      type: WINDOW_RESIZE,
      payload: { value: mockData.height }
    });

    expect(state.get('resize')).toBe(mockData.height);
  });

  test('SEND_EMPTY_REQUEST clears resourceInfo as expect', () => {
    let state = reducer(fromJS({
      ...defaultStates,
      resourceInfo: mockData.resourceInfo
    }), {});

    expect(state.get('resourceInfo').toJS()).toEqual(mockData.resourceInfo);

    state = reducer(state, {
      type: SEND_EMPTY_REQUEST
    });

    expect(state.get('resourceInfo').toJS()).toEqual([]);
  });

  test('FETCH_READY4CHECKOUT_SUCCESS set ready4Checkout as expect', () => {
    let state = reducer(undefined, {
      type: FETCH_READY4CHECKOUT_SUCCESS,
      payload: { body: { ready4checkout: 'true' } }
    });

    expect(state.get('ready4Checkout')).toBe(true);

    state = reducer(undefined, {
      type: FETCH_READY4CHECKOUT_SUCCESS,
      payload: { body: { ready4checkout: 'false' } }
    });

    expect(state.get('ready4Checkout')).toBe(false);
  });

  test('FETCH_INCART_SUCCESS set inCart as expect', () => {
    let state = reducer(undefined, {
      type: FETCH_INCART_SUCCESS,
      payload: { body: { in_cart: 'true' } }
    });

    expect(state.get('inCart')).toBe(true);

    state = reducer(undefined, {
      type: FETCH_INCART_SUCCESS,
      payload: { body: { in_cart: 'false' } }
    });

    expect(state.get('inCart')).toBe(false);
  });
});
