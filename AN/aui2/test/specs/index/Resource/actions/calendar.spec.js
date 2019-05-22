import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import moment from 'moment';
import { fromJS } from 'immutable';
import * as actions from 'index/Resource/actions/calendar';
import mockAPI from 'utils/mockAPI';

describe('index/Resource/actions/calendar', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const bookings = [
    {
      resource: {
        resourceID: 5,
        id: 5,
        maximumTime: 2,
        reservationPeriodUnit: 5,
        resourceName: 'RU 5-month',
        minimumTime: 0,
        events: []
      },
      start: moment('2016-05-31T16:00:00.000Z'),
      end: moment('2016-06-04T16:00:00.000Z')
    },
    {
      resource: {
        resourceID: 4,
        maximumTime: 0,
        reservationPeriodUnit: 6,
        resourceName: 'RU 6-defined-date-range',
        id: '6',
        minimumTime: 0,
        name: 'RU 6-defined-date-range',
        events: [],
        dates: {}
      },
      start: moment('2016-05-31T16:00:00.000Z'),
      end: moment('2016-06-04T16:00:00.000Z')
    },
    {
      resource: {
        resourceID: 6,
        maximumTime: 0,
        reservationPeriodUnit: 7,
        resourceName: 'RU 7-rental-block',
        id: '7',
        minimumTime: 0,
        name: 'RU 7-rental-block',
        events: [],
        dates: {}
      },
      start: moment('2016-05-31T16:00:00.000Z'),
      end: moment('2016-06-04T16:00:00.000Z')
    }
  ]
  const resourceTimeslot = {
    definedDateRangeMap: {},
    rentalBlockMap: {}
  };
  const bookingInfo = fromJS({
    data: {
      eventResource: []
    }
  })
  const initialData = {
    limitBookingsPerPermit: 700
  };

  beforeEach(() => {
    store = mockStore({
      resourceTimeslot,
      bookingInfo,
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('createBookingsAction should work fine when booking less than the booking limitation.', (done) => {
    const {
      createBookingsAction
    } = actions;

    store.dispatch(createBookingsAction());
    const storeActions = store.getActions();
    expect(storeActions.length).toBe(0);
    store.dispatch(createBookingsAction(bookings))
      .then(
        () => {
          const storeActions = store.getActions();
          expect(storeActions.length).toBe(7);
          const actionTypes = storeActions.map(action => action.type).join(' ');
          expect(actionTypes).toContain('FETCH_DEFINED_DATE_RANGE');
          expect(actionTypes).toContain('LOADING_BAR_SHOW');
          expect(actionTypes).toContain('FETCH_RENTAL_BLOCK');
          expect(actionTypes).toContain('FETCH_DEFINED_DATE_RANGE_SUCCESS');
          expect(actionTypes).toContain('FETCH_RENTAL_BLOCK_SUCCESS');
          expect(actionTypes).toContain('BOOKING_INFO_SHOW');
          done();
        }
      )
  });

  it('createBookingsAction should work fine when the total bookings more than the booking limitation of 700.', () => {
    const {
      createBookingsAction
    } = actions;
    const rentalBlockForResource6 = [];
    const dateRangeForResource4 = [];
    const resourceBookings = [];
    const bookings = [];

    for(let h=0; h < 20; h++) {
      bookings.push({
        resource: {
          resourceID: 6,
          maximumTime: 0,
          reservationPeriodUnit: 7,
          resourceName: 'RU 7-rental-block',
          id: '7',
          minimumTime: 0,
          name: 'RU 7-rental-block'
        },
        start: moment(`2016-05-${h+1}T16:00:00.000Z`),
        end: moment(`2016-06-${h+2}T16:00:00.000Z`)
      });
    }

    bookings.push({
      resource: {
        resourceID: 4,
        maximumTime: 0,
        reservationPeriodUnit: 6,
        resourceName: 'RU 6-defined-date-range',
        id: '6',
        minimumTime: 0,
        name: 'RU 6-defined-date-range',
        events: [],
        dates: {}
      },
      start: moment('2016-05-31T16:00:00.000Z'),
      end: moment('2016-06-04T16:00:00.000Z')
    })

    for (let i = 0; i < 23; i++) {
      rentalBlockForResource6.push({
        id: i,
        name: `${i}:00 to ${i + 1}:00`,
        parent_id: 6
      })
    }

    for (let j = 0; j < 10; j++) {
      dateRangeForResource4.push({
        id: 4,
        name: `2016 Jun ${j+1} to 2016 Jun ${j+2}`,
        parent_id: 4
      })
    }

    for (let k = 0; k < 690; k++) {
      resourceBookings.push({
        id: `pending_6_${k}`
      })
    }

    store = mockStore({
      initialData,
      resourceTimeslot: {
        definedDateRangeMap: {
          '4': dateRangeForResource4
        },
        rentalBlockMap: {
          '6': rentalBlockForResource6
        }
      },
      bookingInfo: fromJS({
        data: {
          eventResource: [{
            resourceID: 6,
            bookingDetail: resourceBookings
          }, {
            resourceID: 4,
            bookingDetail: []
          }]
        }
      })
    });

    store.dispatch(createBookingsAction(bookings));
    const storeActions = store.getActions();
    expect(storeActions.length).toBe(4);
    expect(storeActions[0].type).toEqual('BOOKING_INFO_SHOW');
    expect(storeActions[1].type).toEqual('BOOKING_INFO_DETAILS_ADD');
    expect(storeActions[1].payload.value.details.length).toEqual(10);
    expect(storeActions[2].type).toEqual('CHANGE_RESOURCE_INFO_AUTO_FILL');
    expect(storeActions[2].payload).toEqual({
      value: {
        resourceIndex: -1,
        key: 'newBooking',
        bookingIndex: -1,
        isForcedUpdateInfos: false
      }
    });
    expect(storeActions[3].type).toEqual('UPDATE_BOOKING_LIMITATION_CONTENT');
    expect(storeActions[3].payload).toEqual({
      content: 'Limit of 700 bookings in a single permit has been reached.'
    });
  });

  it('createBookingsAction should work fine when created bookings more than the booking limitation of 200.', () => {
    const {
      createBookingsAction
    } = actions;
    const rentalBlockForResource6 = [];
    const dateRangeForResource4 = [];
    const bookings = [];

    for(let h=0; h < 20; h++) {
      bookings.push({
        resource: {
          resourceID: 6,
          maximumTime: 0,
          reservationPeriodUnit: 7,
          resourceName: 'RU 7-rental-block',
          id: '7',
          minimumTime: 0,
          name: 'RU 7-rental-block'
        },
        start: moment(`2016-05-${h+1}T16:00:00.000Z`),
        end: moment(`2016-06-${h+2}T16:00:00.000Z`)
      });
    }

    for (let i = 0; i < 23; i++) {
      rentalBlockForResource6.push({
        id: i,
        name: `${i}:00 to ${i + 1}:00`,
        parent_id: 6
      })
    }

    for (let j = 0; j < 10; j++) {
      dateRangeForResource4.push({
        id: 4,
        name: `2016 Jun ${j+1} to 2016 Jun ${j+2}`,
        parent_id: 4
      })
    }

    store = mockStore({
      initialData,
      resourceTimeslot: {
        definedDateRangeMap: {
          '4': dateRangeForResource4
        },
        rentalBlockMap: {
          '6': rentalBlockForResource6
        }
      },
      bookingInfo: fromJS({
        data: {
          eventResource: [{
            resourceID: 6,
            bookingDetail: []
          }]
        }
      })
    });

    store.dispatch(createBookingsAction(bookings));
    const storeActions = store.getActions();

    expect(storeActions.length).toBe(4);
    expect(storeActions[0].type).toEqual('BOOKING_INFO_SHOW');
    expect(storeActions[1].type).toEqual('BOOKING_INFO_DETAILS_ADD');
    expect(storeActions[1].payload.value.details.length).toEqual(200);
    expect(storeActions[2].type).toEqual('CHANGE_RESOURCE_INFO_AUTO_FILL');
    expect(storeActions[2].payload).toEqual({
      value: {
        resourceIndex: -1,
        key: 'newBooking',
        bookingIndex: -1,
        isForcedUpdateInfos: false
      }
    });
    expect(storeActions[3].type).toEqual('UPDATE_BOOKING_LIMITATION_CONTENT');
    expect(storeActions[3].payload).toEqual({
      content: 'The first 200 bookings have been added. Please drag on calendar to add more.'
    });
  });

  it('createBookingsAction should work fine when the total bookings is 700, and try to create another bookings.', () => {
    const {
      createBookingsAction
    } = actions;
    const rentalBlockForResource6 = [];
    const dateRangeForResource4 = [];
    const resourceBookings = [];
    const bookings = [];

    for(let h=0; h < 20; h++) {
      bookings.push({
        resource: {
          resourceID: 6,
          maximumTime: 0,
          reservationPeriodUnit: 7,
          resourceName: 'RU 7-rental-block',
          id: '7',
          minimumTime: 0,
          name: 'RU 7-rental-block'
        },
        start: moment(`2016-05-${h+1}T16:00:00.000Z`),
        end: moment(`2016-06-${h+2}T16:00:00.000Z`)
      });
    }

    bookings.push({
      resource: {
        resourceID: 4,
        maximumTime: 0,
        reservationPeriodUnit: 6,
        resourceName: 'RU 6-defined-date-range',
        id: '6',
        minimumTime: 0,
        name: 'RU 6-defined-date-range',
        events: [],
        dates: {}
      },
      start: moment('2016-05-31T16:00:00.000Z'),
      end: moment('2016-06-04T16:00:00.000Z')
    })

    for (let i = 0; i < 23; i++) {
      rentalBlockForResource6.push({
        id: i,
        name: `${i}:00 to ${i + 1}:00`,
        parent_id: 6
      })
    }

    for (let k = 0; k < 700; k++) {
      resourceBookings.push({
        id: `pending_6_${k}`
      })
    }

    store = mockStore({
      initialData,
      resourceTimeslot: {
        definedDateRangeMap: {
          '4': dateRangeForResource4
        },
        rentalBlockMap: {
          '6': rentalBlockForResource6
        }
      },
      bookingInfo: fromJS({
        data: {
          eventResource: [{
            resourceID: 6,
            bookingDetail: resourceBookings
          }, {
            resourceID: 4,
            bookingDetail: []
          }]
        }
      })
    });

    store.dispatch(createBookingsAction(bookings));
    const storeActions = store.getActions();
    expect(storeActions.length).toBe(2);
    expect(storeActions[0].type).toEqual('BOOKING_INFO_SHOW');
    expect(storeActions[1].type).toEqual('UPDATE_BOOKING_LIMITATION_CONTENT');
    expect(storeActions[1].payload).toEqual({
      content: 'Limit of 700 bookings in a single permit has been reached.'
    });
  });

  it('createBookingsAction should work fine when has exception.', (done) => {
    const {
      createBookingsAction
    } = actions;
    
    store = mockStore({
      initialData,
      resourceTimeslot
    });

    const mockResponse = {
      "headers": {
        "response_code": "2221",
        "response_message": "error fetch date range",
        "page_info": {}
      },
      "body": {}
    };
    mockAPI({
      path: '/json/Resource/definedDateRange.json',
      result: mockResponse
    });
  
    store.dispatch(createBookingsAction(bookings))
      .catch(
        (err) => {
          expect(store.getActions().length).toBeGreaterThanOrEqual(4);
          expect(err).not.toBeUndefined();
          done();
        }
      )
  });
});
