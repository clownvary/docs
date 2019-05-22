import { fromJS } from 'immutable';
import moment from 'moment';
import {
  weekOfMonth,
  isUnmodifiedRecurringBooking,
  getBookingID,
  toExceptionDates,
  getRecurringPatternDesc,
  updateBaseBooking,
  transferBaseBooking,
  clearRecurringGroups,
  shrinkBaseBookings
} from 'index/Resource/utils/recurring.js';
import { RECURRING_TYPES } from 'index/Resource/consts/recurringPattern';

describe('index -> Resource -> utils -> recurring', () => {
  it('Returns booking\'s pendingID if pendingID not equals -1', () => {
    const booking = { pendingID: '1234' };
    expect(getBookingID(booking)).toEqual(booking.pendingID);
  });

  it('Returns booking\'s resourceBookingID if pendingID equals -1', () => {
    const booking = { pendingID: -1, resourceBookingID: 12345 };
    expect(getBookingID(booking)).toEqual(booking.resourceBookingID);
  });

  it('Returns exception dates for booking', () => {
    const booking = {
      startEventDate: '2016 Dec 01',
      endEventDate: '2016 Dec 31',
    };
    const exceptionDates = toExceptionDates(booking);
    expect(exceptionDates).toEqual('12/01/2016_12/31/2016');
  });

  it('Returns recurring pattern description from bookings', () => {
    const baseBooking = {
      pendingID: 'pending_766_1638',
      startEventDate: '2016 Dec 01',
      recurringPattern: {
        type: RECURRING_TYPES.Daily
      }
    };
    const bookings = [
      {
        isRecurring: true,
        baseBookingID: 'pending_766_1638'
      },
      {
        isRecurring: true,
        baseBookingID: 'pending_766_1638'
      }
    ];

    const desc = getRecurringPatternDesc(baseBooking, bookings);

    expect(desc).toEqual('Daily, 3 times, from 2016 Dec 01');
  });

  it('Returns updated base booking for recurring booking', () => {
    const state = fromJS({
      data: {
        eventResource: [
          {
            bookingDetail: [
              {
                pendingID: 'pending_766_1640'
              },
              {
                pendingID: 'pending_766_1641'
              }
            ]
          }
        ]
      }
    });
    const booking1 = {
      baseBookingID: 'pending_766_1640'
    };
    const booking2 = {
      baseBookingID: 'pending_766_1640',
      pendingRemoveFromRecurringGroup: '12/11/2016_12/20/2016'
    };
    const booking3 = {
      baseBookingID: 'pending_766_1641',
      pendingRemoveFromRecurringGroup: '12/11/2016_12/20/2016'
    };
    const bookingsPath = ['data', 'eventResource', 0, 'bookingDetail'];
    const bookings = [
      {
        pendingID: 'pending_766_1640',
        recurringExceptions: [],
        pendingRemoveFromRecurringGroup: '12/01/2016_12/10/2016'
      },
      {
        pendingID: 'pending_766_1641'
      },
      {
        baseBookingID: 'pending_766_1640',
        pendingID: 'pending_766_1642'
      }
    ];

    const newState1 = updateBaseBooking(state, booking1, bookingsPath, bookings);
    const updatedBaseBooking1 = newState1.getIn(bookingsPath).get(0).toJS();
    expect(updatedBaseBooking1.hasRecurring).toBeTruthy();
    expect(updatedBaseBooking1.recurringEnabled).toBeFalsy();
    expect(updatedBaseBooking1.pendingRemoveFromRecurringGroup).toEqual('12/01/2016_12/10/2016');

    const newState2 = updateBaseBooking(newState1, booking2, bookingsPath, bookings);
    const updatedBaseBooking2 = newState1.getIn(bookingsPath).get(0).toJS();
    expect(updatedBaseBooking2.hasRecurring).toBeTruthy();
    expect(updatedBaseBooking2.recurringEnabled).toBeFalsy();
    expect(updatedBaseBooking2.pendingRemoveFromRecurringGroup).toEqual('12/01/2016_12/10/2016');

    const newState3 = updateBaseBooking(newState2, booking3, bookingsPath, bookings);
    const updatedBaseBooking3 = newState3.getIn(bookingsPath).get(0).toJS();
    expect(updatedBaseBooking3.hasRecurring).toBeTruthy();
    expect(updatedBaseBooking3.recurringEnabled).toBeFalsy();
    expect(updatedBaseBooking3.pendingRemoveFromRecurringGroup).toEqual('12/01/2016_12/10/2016');
  });

  it('Returns transferred base booking for recurring booking', () => {
    const state = fromJS({
      data: {
        eventResource: [
          {
            bookingDetail: [
              {
                baseBookingID: 'pending_766_1640',
                pendingID: 'pending_766_1641'
              },
              {
                baseBookingID: 'pending_766_1640',
                pendingID: 'pending_766_1642'
              },
              {
                pendingID: 'pending_766_1643'
              }
            ]
          }
        ]
      },
      deleteBookings: []
    });
    const booking1 = {
      pendingID: 'pending_766_1640',
      recurringPattern: {
        count: 2
      }
    };
    const booking2 = {
      pendingID: 'pending_766_1660',
      recurringPattern: {
        count: 0
      }
    }
    const bookingsPath = ['data', 'eventResource', 0, 'bookingDetail'];
    const bookings = [
      {
        baseBookingID: 'pending_766_1640',
        pendingID: 'pending_766_1641'
      },
      {
        baseBookingID: 'pending_766_1640',
        pendingID: 'pending_766_1642'
      },
      {
        baseBookingID: 'pending_766_1640',
        pendingID: 'pending_766_1643'
      },
      {
        baseBookingID: 'pending_766_1660',
        pendingID: 'pending_766_1661'
      }
    ];

    const newState1 = transferBaseBooking(state, booking1, bookingsPath, bookings);
    const transferredBaseBooking1 = newState1.getIn(bookingsPath).get(0).toJS();
    expect(transferredBaseBooking1.baseBookingID).toEqual('');
    expect(transferredBaseBooking1.hasRecurring).toBeTruthy();
    expect(transferredBaseBooking1.isRecurring).toBeFalsy();
    expect(transferredBaseBooking1.masterFacilityScheduleID).toEqual('pending_766_1641');
    expect(transferredBaseBooking1.recurringPattern.count).toEqual(1);

    const newState2 = transferBaseBooking(newState1, booking2, bookingsPath, bookings);
    const transferredBaseBooking2 = newState2.getIn(bookingsPath).get(1).toJS();
    expect(transferredBaseBooking2.baseBookingID).toEqual('pending_766_1641');
    expect(transferredBaseBooking2.isRecurring).toBeFalsy();

    const newState3 = transferBaseBooking(newState1, booking2, bookingsPath, []);
    const transferredBaseBooking3 = newState3.getIn(bookingsPath).get(1).toJS();
    expect(transferredBaseBooking3.baseBookingID).toEqual('pending_766_1641');
    expect(transferredBaseBooking3.isRecurring).toBeFalsy();
  });

  it('Returns transferred base booking for recurring booking when deleteBookings is not empty []', () => {
    const state = fromJS({
      data: {
        eventResource: [
          {
            bookingDetail: [
              {
                baseBookingID: 'pending_766_1640',
                pendingID: 'pending_766_1641'
              },
              {
                baseBookingID: 'pending_766_1640',
                pendingID: 'pending_766_1642'
              },
              {
                pendingID: 'pending_766_1643'
              }
            ]
          }
        ]
      },
      deleteBookings: [
        {
          baseBookingID: 'pending_766_1640'
        },
        {
          baseBookingID: 'pending_766_1660'
        }
      ]
    });
    const booking1 = {
      pendingID: 'pending_766_1640',
      recurringPattern: {
        count: 2
      }
    };
    const booking2 = {
      pendingID: 'pending_766_1660',
      recurringPattern: {
        count: 0
      }
    }
    const bookingsPath = ['data', 'eventResource', 0, 'bookingDetail'];
    const bookings = [
      {
        baseBookingID: 'pending_766_1640',
        pendingID: 'pending_766_1641'
      },
      {
        baseBookingID: 'pending_766_1640',
        pendingID: 'pending_766_1642'
      },
      {
        baseBookingID: 'pending_766_1640',
        pendingID: 'pending_766_1643'
      },
      {
        baseBookingID: 'pending_766_1660',
        pendingID: 'pending_766_1661'
      }
    ];

    const newState1 = transferBaseBooking(state, booking1, bookingsPath, bookings);
    const transferredBaseBooking1 = newState1.getIn(bookingsPath).get(0).toJS();
    expect(transferredBaseBooking1.baseBookingID).toEqual('');
    expect(transferredBaseBooking1.hasRecurring).toBeTruthy();
    expect(transferredBaseBooking1.isRecurring).toBeFalsy();
    expect(transferredBaseBooking1.masterFacilityScheduleID).toEqual('pending_766_1641');
    expect(transferredBaseBooking1.recurringPattern.count).toEqual(1);

    const newState2 = transferBaseBooking(newState1, booking2, bookingsPath, bookings);
    const transferredBaseBooking2 = newState2.getIn(bookingsPath).get(1).toJS();
    expect(transferredBaseBooking2.baseBookingID).toEqual('pending_766_1641');
    expect(transferredBaseBooking2.isRecurring).toBeFalsy();

    const newState3 = transferBaseBooking(newState1, booking2, bookingsPath, []);
    const transferredBaseBooking3 = newState3.getIn(bookingsPath).get(1).toJS();
    expect(transferredBaseBooking3.baseBookingID).toEqual('pending_766_1641');
    expect(transferredBaseBooking3.isRecurring).toBeFalsy();
  });

  it('Clear recurring group from state', () => {
    const state = fromJS({
      data: {
        eventResource: [
          {
            bookingDetail: [
              {
                pendingID: 'pending_766_1640',
                pendingRemoveFromRecurringGroup: '12/11/2016_12/20/2016',
                hasRecurring: true,
                recurringExceptions:[],
                recurringPattern: {
                  count: 3
                }
              },
              {
                pendingID: 'pending_766_1641',
                pendingRemoveFromRecurringGroup: '',
                isRecurring: true,
                baseBookingID: 'pending_766_1640'
              },
              {
                pendingID: 'pending_766_1642',
                isRecurring: true,
                pendingRemoveFromRecurringGroup: '12/11/2016_12/20/2016',
                baseBookingID: 'pending_766_1640'
              },
              {
                pendingID: 'pending_766_1643',
                isRecurring: true,
                pendingRemoveFromRecurringGroup: '',
                baseBookingID: 'pending_766_1640'
              },
              {
                pendingID: 'pending_766_1644',
                isRecurring: false,
                hasRecurring: false,
                pendingRemoveFromRecurringGroup: '12/11/2016_12/20/2016',
                baseBookingID: 'pending_766_1640'
              }
            ]
          }
        ]
      },
      deleteBookings: []
    });

    const newState = clearRecurringGroups(state);
    const bookingDetails = newState.getIn(['data', 'eventResource', 0, 'bookingDetail']).toJS();
    expect(bookingDetails[0].hasRecurring).toBeFalsy();
    expect(bookingDetails[1].hasRecurring).toBeTruthy();
  });

  it('Shrink base bookings if any bookings expanded', () => {
    const state = fromJS({
      data: {
        eventResource: [
          {
            bookingDetail: [
              {
                expanded: false
              },
              {
                expanded: true
              }
            ]
          }
        ]
      }
    });

    const newState = shrinkBaseBookings(state);
    const bookingDetails = newState.getIn(['data', 'eventResource', 0, 'bookingDetail']);

    expect(bookingDetails.some(booking => booking.get('expanded'))).toBeFalsy();
  });

  test('weekOfMonth should work well', () => {
    expect(weekOfMonth(moment('2018-01-01'))).toEqual(1);
  });

  test('isUnmodifiedRecurringBooking should work well', () => {
    const booking = {
      pendingID: 'pending_766_1640',
      pendingRemoveFromRecurringGroup: '12/11/2016_12/20/2016',
      isRecurring: false,
      hasRecurring: true,
      pendingRemoveFromRecurringGroup: ''
    }
    expect(isUnmodifiedRecurringBooking(booking)).toEqual(true);
  });
});
