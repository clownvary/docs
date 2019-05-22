import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import { DELETE } from 'react-base-ui/lib/consts/KeyCode';
import Fullcalendar from 'shared/components/Fullcalendar';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import FullCalendarIndex from 'index/Resource/components/FullCalendar';
import { Resources as FullCalendarIndexRaw } from 'index/Resource/components/FullCalendar';
import reservationPeriodUnit from 'index/Resource/consts/reservationPeriodUnit';

import mockStateBookingInfo from '../../reducers/mockState/bookingInfo';

jest.mock('react-base-ui/lib/utils/browser', () => ({
  isIE: jest.fn().mockReturnValue(false).mockReturnValueOnce(true),
  isIos: jest.fn().mockReturnValue(false)
}));

jest.mock('lodash/debounce', () => jest.fn(method => method));
jest.mock('lodash/throttle', () => jest.fn(method => method));

const setup = (props, store) => mount(<FullCalendarIndex {...props} />, { context: { store } });
const setupRaw = (props, store) => mount(<FullCalendarIndexRaw {...props} />);

const booking = {
  resource_ids: [
    1,
    2
  ],
  selected_date: '2016 Jun 04',
  include_linked_resources: true,
  resourceInfo: [
    {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 1,
      maximumTime: 0,
      reservationPeriodUnit: 2,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    {
      setupMinutes: 0,
      resourceType: 1,
      resourceID: 2,
      maximumTime: 0,
      reservationPeriodUnit: 2,
      prepCodeID: 0,
      resourceNumber: '2323',
      resourceName: 'kaely test equipment &amp;',
      closedTimes: [
        {
          startTime: '12:00 AM',
          endTime: '10:00 PM',
          closedAllDay: false
        },
        {
          startTime: '8:00 AM',
          endTime: '12:00 AM',
          closedAllDay: false
        }
      ],
      id: 2,
      cleanupMinutes: 0,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'kaely test equipment description &amp;',
          startTime: '1:00 AM',
          endTime: '11:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 6',
          disregardYear: false
        },
        {
          description: 'kaely test equipment description',
          startTime: '12:00 AM',
          endTime: '7:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 4',
          disregardYear: false
        }
      ]
    }
  ],
  bookingInfo: [
    {
      endScheduleDate: '2016 Jun 7',
      start: '2016 Jun 04 8:00 PM',
      setupMinutes: 300,
      startScheduleDay: 'Tue',
      permitNumber: 349,
      eventName: '1 f+expiration kaely eventName &amp;',
      startEventTime: '1:00 AM',
      bookingAssignment: 0,
      resourceBookingID: 8620,
      startEventDate: '2016 Jun 5',
      startScheduleTime: '8:00 PM',
      eventNotes: 'aa',
      startScheduleDate: '2016 Jun 4',
      resourceType: 0,
      companyName: 'MM companyName',
      reservationScope: 'Normal',
      resourceID: 1,
      permitDate: '2016 Jun 1',
      attendance: 0,
      customerName: '',
      endScheduleDay: 'Tue',
      endEventTime: '12:30 AM',
      scheduleTypeID: 11,
      endEventDate: '2016 Jun 7',
      permitStatus: 2,
      permitStatusDescription: 'Approved',
      scheduleType: 'kaely scheduleType',
      eventType: '*kaely eventType',
      ownerPendingReceipt: false,
      isActivityIgnoreMaximum: true,
      permitID: -1,
      resourceNumber: '12(facilityNumer)',
      customerType: 'f customerType',
      transactionID: 36378,
      customerID: 32523,
      resourceName: '',
      end: '2016 Jun 07 11:30 AM',
      id: 8620,
      cleanupMinutes: 30,
      reservationExpiration: '2016 Jun 4 expiration',
      endScheduleTime: '11:30 AM'
    },
    {
      endScheduleDate: '2016 Jun 4',
      start: '2016 Jun 04 7:00 AM',
      setupMinutes: 30,
      startScheduleDay: 'Tue',
      permitNumber: 349,
      eventName: '2 f kaely eventName',
      startEventTime: '7:30 AM',
      bookingAssignment: 0,
      resourceBookingID: 81620,
      startEventDate: '2016 Jun 4',
      startScheduleTime: '7:00 AM',
      eventNotes: 'aa',
      startScheduleDate: '2016 Jun 4',
      resourceType: 0,
      companyName: 'MM companyName',
      reservationScope: 'Normal',
      resourceID: 1,
      permitDate: '2016 Jun 1',
      attendance: 0,
      customerName: 'customerName',
      endScheduleDay: 'Tue',
      endEventTime: '12:30 AM',
      scheduleTypeID: 11,
      endEventDate: '2016 Jun 4',
      permitStatus: 0,
      permitStatusDescription: 'Approved',
      scheduleType: 'kaely schedule Type',
      eventType: '',
      ownerPendingReceipt: false,
      isActivityIgnoreMaximum: true,
      permitID: 718,
      resourceNumber: '112(facilityNumber)',
      customerType: 'customerType',
      transactionID: 36378,
      customerID: 32523,
      resourceName: '(t-need facilityNumber) resourceName',
      end: '2016 Jun 04 11:00 AM',
      id: 81620,
      cleanupMinutes: 30,
      reservationExpiration: '',
      endScheduleTime: '11:00 AM'
    }
  ],
  resize: false,
  ready4Checkout: false,
  inCart: false
};

const bookings = [
  {
    col: 0,
    isStart: true,
    isEnd: true,
    start: moment('2016 JUN 4'),
    end: moment('2016 JUN 4'),
    resource: {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 1,
      maximumTime: 0,
      reservationPeriodUnit: 2,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    el: {
      0: {},
      length: 1
    }
  },
  {
    col: 0,
    isStart: true,
    isEnd: true,
    start: moment('2016 JUN 4'),
    end: moment('2016 JUN 4'),
    resource: {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 1,
      maximumTime: 0,
      reservationPeriodUnit: 6,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    el: {
      0: {},
      length: 1
    }
  },
  {
    col: 0,
    isStart: true,
    isEnd: true,
    start: moment('2016 JUN 4'),
    end: moment('2016 JUN 4'),
    resource: {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 11,
      maximumTime: 0,
      reservationPeriodUnit: 6,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    el: {
      0: {},
      length: 1
    }
  },
  {
    col: 0,
    isStart: true,
    isEnd: true,
    start: moment('2016 JUN 4'),
    end: moment('2016 JUN 4'),
    resource: {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 1,
      maximumTime: 0,
      reservationPeriodUnit: 7,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    el: {
      0: {},
      length: 1
    }
  },
  {
    col: 0,
    isStart: true,
    isEnd: true,
    start: moment('2016 JUN 4'),
    end: moment('2016 JUN 4'),
    resource: {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 6,
      maximumTime: 0,
      reservationPeriodUnit: 7,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    el: {
      0: {},
      length: 1
    }
  }
];

const bookingsDataTwo = [
  {
    col: 0,
    isStart: true,
    isEnd: true,
    start: moment('2016 JUN 4'),
    end: moment('2016 JUN 4'),
    resource: {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 1,
      maximumTime: 0,
      reservationPeriodUnit: 2,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    el: {
      0: {},
      length: 1
    }
  },
  {
    col: 0,
    isStart: true,
    isEnd: true,
    start: moment('2016 JUN 4'),
    end: moment('2016 JUN 4'),
    resource: {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 1,
      maximumTime: 0,
      reservationPeriodUnit: 1,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    el: {
      0: {},
      length: 1
    }
  },
  {
    col: 0,
    isStart: true,
    isEnd: true,
    start: moment('2016 JUN 4'),
    end: moment('2016 JUN 4'),
    resource: {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 4,
      maximumTime: 0,
      reservationPeriodUnit: 6,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    el: {
      0: {},
      length: 1
    }
  },
  {
    col: 0,
    isStart: true,
    isEnd: true,
    start: moment('2016 JUN 4'),
    end: moment('2016 JUN 4'),
    resource: {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 6,
      maximumTime: 0,
      reservationPeriodUnit: 7,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: [
        {
          description: 'rubingtest',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 c test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        },
        {
          description: '2 a test',
          startTime: '11:45 PM',
          endTime: '1:00 AM',
          startDate: '2016 JUN 4',
          endDate: '2016 JUN 5',
          disregardYear: true
        }
      ]
    },
    el: {
      0: {},
      length: 1
    }
  }
];

const resourceTimeslot = {
  rentalBlockMap: {
    6: [
      {
        id: 2,
        name: '9:00 AM to 12:00 PM',
        selected: true,
        parent_id: 6,
        text: '9:00 AM to 12:00 PM',
        value: 2
      }
    ]
  },
  definedDateRangeMap: {
    1: [
      {
        id: 9,
        name: '2016 Jun 05 to 2016 Jun 07',
        selected: true,
        parent_id: 1,
        text: '2016 Jun 05 to 2016 Jun 07',
        value: 9
      }
    ],
    4: [
      {
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      }
    ]
  }
};

const resource = {
  setupMinutes: 0,
  resourceType: 2,
  resourceID: 6,
  maximumTime: 0,
  reservationPeriodUnit: 2,
  prepCodeID: 0,
  resourceNumber: '2323',
  resourceName: 'kaely test human',
  closedTimes: [
    {
      startTime: '1:00 AM',
      endTime: '4:00 AM',
      closedAllDay: false
    }
  ],
  id: 6,
  cleanupMinutes: 0,
  minimumTime: 0,
  resourceSkipDate: []
};

const event = {
  endScheduleDate: '2016 Jun 4',
  start: moment('2016 Jun 1'),
  setupMinutes: 15,
  startScheduleDay: 'Tue',
  permitNumber: -1,
  eventName: '3 Active booking',
  startEventTime: '1:45 PM',
  bookingAssignment: 2,
  resourceBookingID: 3001,
  startEventDate: '2016 Jun 4',
  startScheduleTime: '2:00 AM',
  eventNotes: 'aa',
  startScheduleDate: '2016 Jun 4',
  resourceType: 2,
  companyName: '',
  reservationScope: 'Normal',
  resourceID: 2,
  permitDate: '2016 Jun 1',
  attendance: 0,
  customerName: '2 a customerName',
  endScheduleDay: 'Tue',
  endEventTime: '3:45 PM',
  scheduleTypeID: 11,
  endEventDate: '2016 Jun 4',
  permitStatus: 0,
  permitStatusDescription: 'Approved',
  scheduleType: '1 a Schedule',
  eventType: '2 a eventType',
  ownerPendingReceipt: false,
  reservationPeriodUnit: 8,
  isActivityIgnoreMaximum: true,
  permitID: -1,
  resourceNumber: '2a RescourceNumber',
  customerType: '2 a customerTYpe',
  transactionID: 36378,
  customerID: 32523,
  resourceName: '2 a resourceName',
  end: moment('2016 Jun 4'),
  id: 3001,
  cleanupMinutes: 15,
  reservationExpiration: '',
  endScheduleTime: '4:00 PM',
  resource: {
    setupMinutes: 10,
    resourceType: 0,
    resourceID: 21,
    maximumTime: 0,
    reservationPeriodUnit: 8,
    prepCodeID: 2,
    resourceNumber: '2323',
    resourceName: 'resourceType &apm;',
    closedTimes: [
      {
        startTime: '',
        endTime: '',
        closedAllDay: true
      }
    ],
    id: 1,
    cleanupMinutes: 20,
    minimumTime: 0,
    resourceSkipDate: []
  },
  _id: '3001',
  className: [

  ],
  allDay: false,
  _allDay: false,
  _start: '2016-06-04T02:00:00.000Z',
  _end: '2016-06-04T16:00:00.000Z'
};

const props = {
  booking: fromJS(booking),
  bookingInfo: fromJS(mockStateBookingInfo),
  quickView: fromJS({ showModal: false }),
  deleteBookingBlockAction: jest.fn(),
  syncDataFromBookingInfoToCalendar: jest.fn(),
  createBookingsAction: jest.fn(),
  resourceTimeslot,
  initialData: {
    permitID: -1
  }
};

const e = {
  keyCode: DELETE
};

describe('index/Resource/components/FullCalendar', () => {
  test('FullCalendar resourceInfo equal to [] should render without errors', () => {
    const mockStore = configureStore();
    const store = mockStore({});

    const nextBooking = { ...booking, ...{ resourceInfo: [], resource_ids: [] } };

    const nextProps = {
      ...props,
      ...{
        booking: fromJS(nextBooking)
      }
    };

    const component = setup(nextProps, store);

    const wrapFullcalendar = component.find(Fullcalendar);

    const nextPropsTwo = {
      ...nextProps,
      ...{
        resourceTimeslot: {},
        showSearchbar: true
      }
    };

    component.setProps(nextPropsTwo);

    component.node.wrappedInstance.onEventClick(event);
    component.node.wrappedInstance.onEventClick({
      ...event,
      ownerPendingReceipt: true
    }, {
      originalEvent: {
        target: $(document)
      }
    });
    component.node.wrappedInstance.onKeyDown({ keyCode: 8 });
    component.node.wrappedInstance.onKeyDown({
      keyCode: 8,
      preventDefault: true,
      preventDefault: jest.fn()
    });

    expect(component.find('.booking-resources')).toHaveLength(1);
    expect(component.find('.fc-ltr')).toHaveLength(1);
  });

  test('rebder FullCalendar should render without errors', () => {
    const mockStore = configureStore();
    const store = mockStore({});

    const component = setup(props, store);
    const wrapFullcalendar = component.find(Fullcalendar);
    wrapFullcalendar.node.props.extendedHeaderProps.closeIconReturn();

    wrapFullcalendar.node.props.extendedHeaderProps.renderCell(resource);

    wrapFullcalendar.node.props.select();
    wrapFullcalendar.node.props.select(bookings);
    wrapFullcalendar.node.props.select(bookingsDataTwo);

    wrapFullcalendar.node.props.eventMouseout();

    wrapFullcalendar.node.props.extendedHeaderProps.closeTriggerBefore(3);

    wrapFullcalendar.node.props.eventAfterRender(event, $(document));

    document.querySelector('body').click();

    wrapFullcalendar.node.props.eventClick(
      {
        ...event,
        ...{
          permitID: -1,
          ownerPendingReceipt: false,
          bookingAssignment: 0
        }
      }, $(document));
    wrapFullcalendar.node.props.eventClick({
      ...event,
      ...{
        ownerPendingReceipt: true
      }
    }, {
      originalEvent: {
        target: document.querySelector('body')
      }
    });

    document.querySelector('body').click();

    const nextBooking = { ...booking, ...{ resourceInfo: [] } };

    const nextProps = {
      ...props,
      ...{
        booking: fromJS(nextBooking)
      }
    };
    component.setProps(nextProps);

    component.unmount();
  });

  test('FullCalendar permitStatusDescription Different values should render without errors', () => {
    const mockStore = configureStore();
    const store = mockStore({});

    const component = setup(props, store);
    component.node.wrappedInstance.onKeyDown(e);

    let nextEvent = {
      ...event,
      ...{
        ownerPendingReceipt: true,
        permitStatusDescription: '',
        permitID: 23
      }
    };

    const wrapFullcalendar = component.find(Fullcalendar);

    wrapFullcalendar.node.props.eventRender(nextEvent, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvent, $(document));

    const nextEventOne = {
      ...nextEvent,
      ...{
        type: 'skip'
      }
    };

    wrapFullcalendar.node.props.eventRender(nextEventOne, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEventOne, $(document));

    const nextEveTwo = {
      ...nextEvent,
      ...{
        type: 'closed'
      }
    };

    wrapFullcalendar.node.props.eventRender(nextEveTwo, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEveTwo, $(document));

    const nextEveThree = {
      ...nextEvent,
      ...{
        type: 'closed',
        isAllDay: true
      }
    };

    wrapFullcalendar.node.props.eventRender(nextEveThree, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEveThree, $(document));

    $(document).dblclick();

    const nextEvetFour = {
      ...nextEvent,
      ...{
        type: 'dd',
        isAllDay: true,
        resourceType: 1,
        setupMinutes: 1330,
        cleanupMinutes: 1000,
        bookingAssignment: 0,
        permitStatusDescription: 'Approved'
      }
    };

    wrapFullcalendar.node.props.eventRender(nextEvetFour, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvetFour, $(document));

    nextEvent = { ...nextEvetFour, ...{ permitID: -1 } };
    wrapFullcalendar.node.props.eventRender(nextEvent, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvent, $(document));

    nextEvent = {
      ...nextEvetFour,
      ...{
        permitStatusDescription: '',
        resourceType: 2,
        customerName: '',
        eventName: ''
      }
    }

    wrapFullcalendar.node.props.eventRender(nextEvent, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvent, $(document));

    const nextEvetFive = {
      ...nextEvent,
      ...{
        type: 'dd',
        isAllDay: true,
        resourceType: 1,
        setupMinutes: 1330,
        cleanupMinutes: 1000,
        bookingAssignment: 4
      }
    };

    wrapFullcalendar.node.props.eventRender(nextEvetFive, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvetFive, $(document));

    nextEvent = {
      ...nextEvetFive,
      ...{
        bookingAssignment: 2,
        eventName: ''
      }
    }
    wrapFullcalendar.node.props.eventRender(nextEvent, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvent, $(document));

    nextEvent = {
      ...nextEvetFive,
      ...{
        eventName: ''
      }
    }
    wrapFullcalendar.node.props.eventRender(nextEvent, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvent, $(document));

    nextEvent = {
      ...nextEvetFive,
      ...{
        bookingAssignment: ''
      }
    }
    wrapFullcalendar.node.props.eventRender(nextEvent, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvent, $(document));

    nextEvent = {
      ...nextEvetFive,
      ...{
        startScheduleDate: '2016 Jun 08',
        endScheduleDate: '2016 Jun 18'
      }
    }
    wrapFullcalendar.node.props.eventRender(nextEvent, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvent, $(document));

    nextEvent = {
      ...nextEvetFive,
      ...{
        startScheduleDate: '2016 Jun 08',
        endScheduleDate: '2016 Jun 18',
        startEventDate: '2016 Jun 18',
        endEventDate: '2016 Jun 19'
      }
    }
    wrapFullcalendar.node.props.eventRender(nextEvent, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvent, $(document));

    const nextEvetSix = {
      ...nextEvent,
      ...{
        type: 'closed',
        start: moment('2016 Jun 4'),
        isAllDay: true,
        resourceType: 1,
        setupMinutes: 1330,
        cleanupMinutes: 1000,
        bookingAssignment: 4
      }
    };
    wrapFullcalendar.node.props.eventRender(nextEvetSix, $(document));
    wrapFullcalendar.node.props.eventAfterRender(nextEvetSix, $(document));
  });

  test('border refreshing', () => {
    const component = setupRaw(props);
    const instance = component.instance();

    const wrapFullcalendar = component.find(Fullcalendar);

    const refreshBackgroundBorderSpy = jest.spyOn(instance, 'refreshBackgroundBorder');

    jest.useFakeTimers();
    wrapFullcalendar.prop('eventAfterAllRender')()
    jest.runAllTimers();
    expect(refreshBackgroundBorderSpy).toHaveBeenCalledTimes(1);

    wrapFullcalendar.prop('eventAfterAllRender')()
    jest.runAllTimers();
    expect(refreshBackgroundBorderSpy).toHaveBeenCalledTimes(1);

    instance._refs.calendarRootDom.classList.add('refresh-border');
    expect(component.find('section.refresh-border')).toHaveLength(1);
    instance.refreshBackgroundBorder();
    jest.runAllTimers();
    expect(component.find('section.refresh-border')).toHaveLength(0);
  })

  test('scheduled updater', () => {
    jest.useFakeTimers();

    const component = setupRaw(props);
    const instance = component.instance();
    expect(instance.nowScheduledUpdater).not.toBeNull();

    const validateAfterDataFetch = jest.fn()
      .mockReturnValue(Promise.resolve())
    component.setProps({ validateAfterDataFetch });

    const now1 = instance.state.now;
    jest.runTimersToTime(61 * 1000);
    const now2 = instance.state.now;
    expect(now1.add(1, 'm')).toEqual(now2);

    instance.stopScheduledUpdater();
    jest.runTimersToTime(61 * 1000);
    expect(now2).toEqual(instance.state.now);

    const calendarProps = instance.fullcalendar.props;
    const delta1 = moment.duration(-31, 'minutes');
    const delta2 = moment.duration(-1, 'minutes');
    const delta3 = moment.duration(31, 'minutes');
    const delta4 = moment.duration(0, 'minutes');
    calendarProps.eventMouseout();
    calendarProps.eventRender();
    calendarProps.eventDragStart(event);
    calendarProps.eventDrop(event, delta1);

    const newEvent1 = {
      ...event,
      setupMinutes: 0,
      cleanupMinutes: 0
    };
    calendarProps.eventDrop(newEvent1, -1);

    const newEvent2 = {
      ...event,
      reservationPeriodUnit:  2
    };
    calendarProps.eventDrop(newEvent2, delta1);
    calendarProps.eventDrop(newEvent2, delta2);
    calendarProps.eventDrop(newEvent2, delta3);
    calendarProps.eventDrop(newEvent2, delta4);

    const newEvent3 = {
      ...event,
      reservationPeriodUnit: reservationPeriodUnit.RENTAL_BLOCK
    };
    calendarProps.eventDrop(newEvent3, delta4);

    const newEvent4 = {
      ...event,
      reservationPeriodUnit: reservationPeriodUnit.NO_OVERRIDE
    };
    calendarProps.eventDrop(newEvent4, delta4);

    instance.dragging = {
      3001: 1
    }
    calendarProps.eventRender(event, $(document));

    instance.dragging = { 1: { id: 1 } }
    calendarProps.eventRender(
      {
        ...event,
        id: 1,
        ownerPendingReceipt: false,
        setupMinutes: 30,
        cleanupMinutes: 30,
        type: 'open',
        start: moment('2016 Jun 4 10:00:00'),
        end: moment('2016 Jun 4 11:00:00')
      },
      $(document)
    );
  });

  test('transferCalling', () => {
    const component = setupRaw(props);
    const instance = component.instance();
    const transferCalling = jest.fn();
    const params = 'test params';

    instance.fullcalendar = { transferCalling };
    instance.transferCalling(params)
    expect(transferCalling).toBeCalledWith(params);
  });

  test('event tooltip handling', () => {
    const component = setupRaw(props);
    const instance = component.instance();

    instance.closeToolTip = jest.fn();
    let result = instance.showEventTooltip();
    expect(result).toBeUndefined();
    expect(instance.closeToolTip).toHaveBeenCalledTimes(1);

    instance.curHoverEvent = {};
    instance.showEventTooltip();

    const target = $('<div></div>');
    const fcEvent = $('<div class="fc-event"></div>');
    fcEvent.append(target).appendTo(document.body);
    instance.showEventTooltip({ target, pageX: 0, pageY: 0 });
    expect(instance.closeToolTip()).toBeUndefined()
  });

  test('mouse actions', () => {
    const component = setupRaw(props);
    const instance = component.instance();

    instance.showEventTooltip = jest.fn();

    const target = {
      classList: document.body.classList,
      parentElement: {
        classList: document.body.classList
      }
    };

    instance.onMouseMove({ buttons: 1, target })
    expect(instance.showEventTooltip).not.toBeCalled();

    instance.onMouseMove({ buttons: 0, target })
    expect(instance.showEventTooltip).toBeCalled();

    const mockEvent = {};
    const originalCurHoverEvent = instance.curHoverEvent;
    instance.onEventMouseover(mockEvent, { buttons: 1 });
    expect(instance.curHoverEvent).toBe(originalCurHoverEvent);

    instance.onEventMouseover(mockEvent, { buttons: 0 });
    expect(instance.curHoverEvent).toBe(mockEvent);

    const targetDiv = document.createElement('div');
    targetDiv.className = 'observe-resize';
    targetDiv.setAttribute('data-resize-id', 1);
    targetDiv.setAttribute('data-resize-border', 'top');
    targetDiv.setAttribute('style','width:100px; height:100px;');
    const fcContent = document.createElement('div');
    fcContent.className = 'fc-content';
    fcContent.setAttribute('style','top:0; bottom:0;');
    targetDiv.appendChild(fcContent);
    const targetEvent = { id: 1, end: 0, start: 0 };
    instance.resizeHelper.push(targetEvent);

    instance.onMouseDown({ target: targetDiv });
    expect(instance.resizeHelper.isResizing).toBe(true);

    instance.onMouseMove({ buttons: 1, target: targetDiv });
    expect(instance.resizeHelper.isResizing).toBe(true);

    instance.onMouseUp();
    expect(instance.resizeHelper.isResizing).toBe(false);

    // the isResizing is closed in last mouseUp, so no need to stop here
    instance.onMouseUp();
    expect(instance.resizeHelper.isResizing).toBe(false);

    // cover the if branch, should change the rect
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
          width: 120,
          height: 120,
          top: 0,
          left: 0,
          bottom: 100,
          right: 100,
      }
    });
    const mockJsEvent = { clientX: 1, clientY: 1, target: targetDiv };
    instance.onEventMouseout(mockEvent, mockJsEvent);
    expect(instance.curHoverEvent).toBe(null);
  });

  test('update booking information', () => {
    const component = setupRaw(props);
    const instance = component.instance();

    const updateBookingInfoDetail = jest.fn();
    component.setProps({ updateBookingInfoDetail });

    const mockBooking = {
      startEventTime: DateTimeFormat.formatTime(moment()),
      start: moment(),
      end: moment().add(1, 'hour'),
      resource: {
        reservationPeriodUnit: reservationPeriodUnit.MINUTE
      }
    }

    instance.updateBookingInformation({
      keys: ['startEventTime'],
      booking: { ...mockBooking },
      resourceIndex: 0,
      bookingIndex: 0
    })
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(2);
    updateBookingInfoDetail.mockClear();

    instance.updateBookingInformation({
      keys: ['startEventTime'],
      booking: { ...mockBooking, isRecurring: true },
      resourceIndex: 0,
      bookingIndex: 0
    }, (booking) => {
      booking.startEventTime = DateTimeFormat.formatTime(moment().add(10, 'minute'));
      return booking;
    })
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(3);
  });

  test('prepare and update rental block info correctly', () => {
    const component = setupRaw(props);
    const instance = component.instance();

    const updateBookingInfoDetail = jest.fn();
    const validateAfterDataFetch = jest.fn()
      .mockReturnValue(Promise.resolve())
    component.setProps({ updateBookingInfoDetail, validateAfterDataFetch });

    const mockRentalBlockBooking = {
      startEventTime: DateTimeFormat.formatTime(moment()),
      start: moment(),
      end: moment().add(1, 'hour'),
      resource: {
        reservationPeriodUnit: reservationPeriodUnit.MINUTE,
        rentalBlock: [{ id: 1, selected: true }]
      }
    }

    const mockBooking = {
      startEventTime: DateTimeFormat.formatTime(moment()),
      start: moment(),
      end: moment().add(1, 'hour'),
      resource: {
        reservationPeriodUnit: reservationPeriodUnit.MINUTE
      }
    }

    instance.updateRentalBlockBookingInformation({
      event: {...mockBooking, rentalBlockID: 999},
      resourceIndex: 0,
      bookingIndex: 0
    })
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(2);
    updateBookingInfoDetail.mockClear();

    // use booking with rental block
    instance.updateRentalBlockBookingInformation({
      event: {...mockRentalBlockBooking, rentalBlockID: 999},
      resourceIndex: 0,
      bookingIndex: 0
    })
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(2);
    updateBookingInfoDetail.mockClear();

    instance.prepareRentalBlockAndUpdate({
      event: {...mockRentalBlockBooking, resourceID: 6 },
      resourceIndex: 0,
      bookingIndex: 0
    })
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(2);
    updateBookingInfoDetail.mockClear();

    // no resourceID in rental block
    instance.prepareRentalBlockAndUpdate({
      event: {...mockRentalBlockBooking, resourceID: 1 },
      resourceIndex: 0,
      bookingIndex: 0
    })
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(0);
    updateBookingInfoDetail.mockClear();
  });

  test('resize end work correctly', () => {
    const component = setupRaw(props);
    const instance = component.instance();

    const updateBookingInfoDetail = jest.fn();
    const validateAfterDataFetch = jest.fn()
      .mockReturnValue(Promise.resolve())
    const changeResourceInfoUpdateConflict = jest.fn();
    const changeResoureInfoAutoFill = jest.fn();
    const syncDataFromBookingInfoToCalendar = jest.fn();
    component.setProps({
      updateBookingInfoDetail,
      validateAfterDataFetch,
      changeResourceInfoUpdateConflict,
      changeResoureInfoAutoFill,
      syncDataFromBookingInfoToCalendar
    });

    const delta = {
      asMinutes() {return 0}
    }

    instance.onResizeEnd(
      event,
      delta,
      {
        border: 'top',
        setupMinutes: true,
        cleanupMinutes: true
      }
    );
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(1);
    updateBookingInfoDetail.mockClear();

    instance.onResizeEnd(
      event,
      delta,
      {
        border: 'bottom',
        setupMinutes: true,
        cleanupMinutes: true
      }
    );
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(1);
    updateBookingInfoDetail.mockClear();

    instance.onResizeEnd(
      {
        ...event,
        reservationPeriodUnit : reservationPeriodUnit.MINUTE,
        setupMinutes : true,
        cleanupMinutes : true
      },
      delta,
      {
        border: 'other',
        setupMinutes: true,
        cleanupMinutes: true
      }
    );
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(0);
    updateBookingInfoDetail.mockClear();

    instance.onResizeEnd(
      {
        ...event,
        reservationPeriodUnit : reservationPeriodUnit.OVER_NIGHT,
        setupMinutes : false,
        cleanupMinutes : false
      },
      delta,
      {
        border: 'top',
        setupMinutes: false,
        cleanupMinutes: false
      }
    );
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(1);
    updateBookingInfoDetail.mockClear();

    instance.onResizeEnd(
      {
        ...event,
        reservationPeriodUnit : reservationPeriodUnit.OVER_NIGHT,
        setupMinutes : false,
        cleanupMinutes : false
      },
      delta,
      {
        border: 'ohter',
        setupMinutes: false,
        cleanupMinutes: false
      }
    );
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(1);
    updateBookingInfoDetail.mockClear();

    instance.onResizeEnd(
      {
        ...event,
        reservationPeriodUnit : reservationPeriodUnit.RENTAL_BLOCK
      },
      delta,
      {
        border: 'ohter',
        setupMinutes: false,
        cleanupMinutes: false
      }
    );
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(0);
    updateBookingInfoDetail.mockClear();

    instance.onResizeEnd(
      {
        ...event,
        reservationPeriodUnit : reservationPeriodUnit.NO_OVERRIDE
      },
      delta,
      {
        border: 'ohter',
        setupMinutes: false,
        cleanupMinutes: false
      }
    );
    expect(updateBookingInfoDetail).toHaveBeenCalledTimes(0);
    updateBookingInfoDetail.mockClear();
  });

  test('closeToolTip should be tirggered when scroll',()=>{
    const component = setupRaw(props);
    const spyClose = jest.spyOn(component.instance(),'closeToolTip');
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("scroll", false, true);
    document.dispatchEvent(evt);
    expect(spyClose).toHaveBeenCalled();
  });
});

