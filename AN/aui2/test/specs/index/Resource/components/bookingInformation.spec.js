import React from 'react';
import { mount, shallow } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import Button from 'react-base-ui/lib/components/Button';
import ConfirmAlert from 'shared/components/Alert';
import { Authority } from 'shared/authorities';
import BookingInformation, { BookingInformation as BookingInformationComponent } from 'index/Resource/components/BookingInformation';

Authority.init([
  {
    authorityType:"enabled",
    id:"overrideMaxAdvancedSetting",
    name: "Override Maximum Advanced Reservation Setting"
  },
  {
    authorityType:"enabled",
    id:"overrideMinAdvancedSetting",
    name: "Override Minimum Advanced Reservation Setting"
  }
]);

const initialData = {
  permitID: -1,
  eventID: 2,
  batchID: '1111111',
  receiptID: '2222222',
  receiptEntryID: '3333333'
};
const recurringPattern = {
  monthlyFrequencyType: 0,
  selectedDates: [1, 2, 3, 4, 5, 6],
  errors: ['errormsg1'],
  base: {
    booking: {
      currentEvent: true,
      recurringExceptions: [],
      hasRecurring: false,
      baseBookingID: '',
      rentalBlockID: 7,
      recurringEnabled: true,
      ignoreConflict: false,
      startEventTime: '2:00 AM',
      bookingAssignment: 0,
      reservationType: 0,
      resourceBookingID: 0,
      startEventDate: '2016 Dec 21',
      pendingRemoveFromRecurringGroup: '',
      attendance: 2,
      dateRangeID: 0,
      recurringReservationGroupID: 0,
      isDeleteSchedule: false,
      endEventTime: '3:00 AM',
      endEventDate: '2016 Dec 21',
      reservationPeriodUnit: 7,
      pendingID: 'pending_775_7161',
      isRecurring: false,
      startEventDatetime: '12/21/2016 2:00 AM',
      ignoreClosetime: false,
      ownerPendingReceipt: true,
      masterFacilityScheduleID: null,
      transactionID: -1,
      expanded: false,
      endEventDatetime: '12/21/2016 3:00 AM',
      ignoreSkipdate: false
    },
    resource: {
      setupMinutes: 0,
      definedDateRange: [],
      resourceType: 0,
      resourceID: 3,
      rentalBlock: [
        {
          id: 2,
          name: '9:00 AM to 12:00 PM',
          selected: false,
          parent_id: 6,
          text: '9:00 AM to 12:00 PM',
          value: 2
        }
      ],
      bookingDetail: [
        {
          currentEvent: true,
          recurringExceptions: [],
          hasRecurring: false,
          baseBookingID: '',
          rentalBlockID: 7,
          recurringEnabled: true,
          ignoreConflict: false,
          startEventTime: '2:00 AM',
          bookingAssignment: 0,
          reservationType: 0,
          resourceBookingID: 0,
          startEventDate: '2016 Dec 21',
          pendingRemoveFromRecurringGroup: '',
          attendance: 2,
          dateRangeID: 0,
          recurringReservationGroupID: 0,
          isDeleteSchedule: false,
          endEventTime: '3:00 AM',
          endEventDate: '2016 Dec 21',
          reservationPeriodUnit: 7,
          pendingID: 'pending_775_7161',
          isRecurring: false,
          startEventDatetime: '12/21/2016 2:00 AM',
          ignoreClosetime: false,
          ownerPendingReceipt: true,
          masterFacilityScheduleID: null,
          transactionID: -1,
          expanded: false,
          endEventDatetime: '12/21/2016 3:00 AM',
          ignoreSkipdate: false
        }
      ],
      eventTypeID: 36,
      reservationPeriodUnit: 7,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test human',
      cleanupMinutes: 0,
      eventTypes: [
        {
          id: 34,
          name: 'South West Hub',
          selected: false,
          text: 'South West Hub',
          value: 34
        },
        {
          id: 35,
          name: 'deserunt et',
          selected: false,
          text: 'deserunt et',
          value: 35
        }
      ]
    }
  },
  visible: false,
  endType: 0,
  types: [
    {
      value: 1,
      text: 'Daily',
      selected: true
    }
  ],
  type: 1,
  end: {
    1: {
      0: 1,
      1: null
    },
    2: {
      0: '',
      1: null
    },
    3: {
      0: 1,
      1: null
    }
  },
  frequency: {
    1: 1,
    2: 1,
    3: {
      0: 1,
      1: ''
    }
  }
};

const initState = {
  recurringPattern: fromJS(recurringPattern),
}

const dataEventResource = isDeleteSchedule => [
  {
    setupMinutes: 0,
    isTemplate: true,
    definedDateRange: [
      {
        id: 3,
        name: '2016 Jun 01 to 2016 Jun 03',
        selected: false,
        parent_id: 4,
        text: '2016 Jun 01 to 2016 Jun 03',
        value: 3
      },
      {
        id: 9,
        name: '2016 Jun 05 to 2016 Jun 07',
        selected: false,
        parent_id: 1,
        text: '2016 Jun 05 to 2016 Jun 07',
        value: 9
      }
    ],
    resourceType: 0,
    resourceID: 2,
    rentalBlock: [

    ],
    bookingDetail: [
      {
        currentEvent: true,
        recurringExceptions: [

        ],
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
        isDeleteSchedule,
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
        ignoreSkipdate: false
      },
      {
        currentEvent: true,
        recurringExceptions: [

        ],
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
        isDeleteSchedule,
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
        ignoreSkipdate: false
      }
    ],
    eventTypeID: 36,
    reservationPeriodUnit: 6,
    eventType: '\'South West Hub',
    prepCodeID: -1,
    resourceNumber: '',
    resourceName: 'kaely test equipment &amp;',
    cleanupMinutes: 0,
    eventTypes: [

    ]
  },
  {
    setupMinutes: 3,
    definedDateRange: [

    ],
    resourceType: 0,
    resourceID: 1,
    rentalBlock: [

    ],
    bookingDetail: [
      {
        currentEvent: true,
        recurringExceptions: [

        ],
        bookingIdentifier: 'pending_1424_4484',
        hasRecurring: true,
        baseBookingID: '',
        rentalBlockID: 0,
        recurringEnabled: false,
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
        isDeleteSchedule,
        endEventTime: '3:00 AM',
        endEventDate: '2016 Dec 21',
        errorResults: [

        ],
        reservationPeriodUnit: 2,
        pendingID: 'pending_1424_4484',
        isRecurring: false,
        recurringPattern: {
          count: 5,
          frequency: 1,
          type: 1
        },
        startEventDatetime: '12/21/2016 2:00 AM',
        ignoreClosetime: false,
        ownerPendingReceipt: true,
        masterFacilityScheduleID: 117712,
        transactionID: -1,
        expanded: false,
        endEventDatetime: '12/21/2016 3:00 AM',
        ignoreConflictType: 'not_show_ignore',
        ignoreSkipdate: false
      }
    ],
    eventTypeID: 36,
    reservationPeriodUnit: 2,
    eventType: '\'South West Hub',
    prepCodeID: -1,
    resourceNumber: '',
    resourceName: 'resourceType &apm;',
    cleanupMinutes: 5,
    eventTypes: [

    ]
  }
];

const errorEventResource = [
  {
    resourceID: 2,
    resourceName: 'kaely test equipment &amp;',
    eventTypeID: false,
    bookingDetail: [
      {
        pendingID: 'pending_775_7160',
        resourceBookingID: 0,
        errors: {
          conflict: true,
          conflictIgnoreEnable: false
        }
      }
    ]
  }
];

const bookingInfoError = (eventResource = []) => ({
  code: null,
  clientMessages: ['clientMessages1'],
  serverMessages: ['serverMessages'],
  conflictMessage: 'conflictMessage',
  eventNameDuplicateMessage: '',
  entity: {
    eventName: false,
    eventNameDuplicate: false,
    scheduleTypeID: false,
    eventResource
  }
});


const bookingInfo = (isDeleteSchedule, error) => ({
  pendingBookingList: [],
  bookingLimitToastContent: 'Reservation allows up to 700 bookings',
  isFillSchedule: true,
  scheduleTypes: [
    {
      id: 3,
      name: 'aliqua aute',
      selected: false,
      text: 'aliqua aute',
      value: 3
    },
    {
      id: 2,
      name: 'est',
      selected: true,
      text: 'est',
      value: 2
    }
  ],
  display: false,
  cleanUpList: [],
  isBookingChanged: true,
  error: bookingInfoError(error),
  data: {
    permitID: -1,
    eventName: 'ddd',
    scheduleTypeID: 3,
    scheduleType: 'kaely scheduleType',
    checkForWaitlistConflict: true,
    eventResource: dataEventResource(isDeleteSchedule)
  },
  backFromPermitDetailPage: false,
  templateState: 'no_template',
  prepCodeList: [],
  setUpList: [],
  permitBookingList: [],
  recurring: {
    base: {
      resourceIndex: -1,
      bookingIndex: -1
    },
    clear: {
      visible: false,
      resourceIndex: -1,
      bookingIndex: -1,
      clearAll: false
    }
  }
});

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
    },
    {
      endScheduleDate: '2016 Jun 4',
      start: '2016 Jun 04 7:00 AM',
      setupMinutes: 30,
      startScheduleDay: 'Tue',
      permitNumber: 349,
      eventName: '2 c kaely eventName',
      startEventTime: '7:30 AM',
      bookingAssignment: 0,
      resourceBookingID: 81110,
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
      endEventTime: '10:30 AM',
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
      id: 81110,
      cleanupMinutes: 30,
      reservationExpiration: '',
      endScheduleTime: '11:00 AM'
    }
  ]
};

jest.mock('index/Resource/actions/bookingInformation', () => ({
  deleteBookingInfoAllDetails: jest.fn(),
  syncDataFromBookingInfoToCalendar: jest.fn(),
  cleanBookingInfoError: jest.fn(),
  showBookingInfo: jest.fn(),
  updateBookingInfoDetail: jest.fn(),
  hideBookingInfo: jest.fn(),
  clearRecurringGroups: jest.fn(),
  displayClientErrors: jest.fn(),
  updateIsFillScheduleState: jest.fn(),
  redirect: jest.fn(),
  permitBookingInfoProceed: jest.fn(() => new Promise((resolve, reject) => {
    reject({
      payload: {
        headers: {
          response_code: '105'
        }
      }
    });
  })),
  pendingBookingInfoProceed: jest.fn(() => new Promise((resolve, reject) => {
    reject({
      payload: {
        headers: {
          response_code: '1015'
        }
      }
    });
  }))
}));

describe('index/Resource/components/BookingInformation', () => {
  const setup = (initProps, store) => mount(<BookingInformation {...initProps} />, { context: { store } });
  const setupShallow = (initProps, store) => shallow(<BookingInformationComponent {...initProps} />, { context: { store } });

  const props = {
    bookingInfo: fromJS(bookingInfo(false)),
    booking: fromJS(booking),
    hideIntro: true,
    initialData
  };

  const mockStore = configureStore();

  let clock;

  beforeEach(() => {
    clock = jest.useFakeTimers();
  });

  afterEach(() => {
    clock.clearAllTimers();
  });

  it('BookingInformation should render without errors', () => {
    const store = mockStore({...initState});

    const component = setup(props, store);

    const nextProps = {
      ...props,
      bookingInfo: fromJS(bookingInfo(false)),
      booking: fromJS(booking),
      hideIntro: true
    };

    component.setProps(nextProps);

    const wrapConfirmAlert = component.find(ConfirmAlert);

    wrapConfirmAlert.at(0).node.props.onConfirm();
    clock.runTimersToTime(10);
    wrapConfirmAlert.at(1).node.props.onConfirm();
    wrapConfirmAlert.at(0).node.props.onClose();
    clock.runTimersToTime(10);

    component.find('.booking-information-tag').simulate('click');
    component.find('.override-conflict').simulate('click');

    const clearAllButton = component.find('.clear-all');
    expect(clearAllButton.text()).toBe(' Clear Reservation');
    clearAllButton.simulate('click');

    wrapConfirmAlert.at(1).node.props.onConfirm();
    expect(component.find('.booking-information').hasClass('expanding')).toBe(false);

    wrapConfirmAlert.at(1).node.props.onCancel();

    document.querySelector('body').click('');
    component.find(Button).node.props.onClick();
    expect(component.find('.booking-information-wrapper')).toHaveLength(1);
    component.find('.header .icon-close').simulate('click');
    expect(component.find('.booking-information').hasClass('expanding')).toBe(false);
    component.unmount();
  });

  it('BookingInformation bookingInfoData.data.eventName equal to "" should render without errors', () => {
    const store = mockStore({...initState});

    const component = setup(props, store);
    const bookingInfoData = bookingInfo(false);
    bookingInfoData.data.eventName = '';

    const nextProps = {
      ...props,
      bookingInfo: fromJS(bookingInfoData),
      booking: fromJS(booking),
      hideIntro: false,
      availableBookingCount: 0
    };

    component.setProps(nextProps);

    const wrapConfirmAlert = component.find(ConfirmAlert);
    wrapConfirmAlert.at(0).node.props.onConfirm();
    clock.runTimersToTime(10);
  });

  it('BookingInformation booking error serverMessages equal to [] should render without errors', () => {
    const store = mockStore({...initState});
    const nextBookingInfoError = {
      code: null,
      clientMessages: ['clientMessages1'],
      serverMessages: [],
      conflictMessage: '2conflictMessage',
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        eventNameDuplicate: false,
        scheduleTypeID: false,
        eventResource: errorEventResource
      }
    };

    const nextBookingInfo = {
      ...bookingInfo(true),
      ...{ display: true },
      ...{ error: nextBookingInfoError }
    };
    const nextProps = {
      bookingInfo: fromJS(nextBookingInfo),
      booking: fromJS(booking),
      hideIntro: false,
      initialData
    };

    const component = setup(nextProps, store);
    const wrapConfirmAlert = component.find(ConfirmAlert);

    wrapConfirmAlert.at(0).node.props.onConfirm();
    wrapConfirmAlert.at(0).node.props.onCancel();
    component.unmount();
  });

  it('BookingInformation conflictIgnoreEnable equal to true should render without errors', () => {
    const store = mockStore({...initState});

    const nextErrorEventResource = [
      {
        resourceID: 2,
        resourceName: 'kaely test equipment &amp;',
        eventTypeID: false,
        bookingDetail: [
          {
            pendingID: 'pending_775_7160',
            resourceBookingID: 0,
            errors: {
              conflict: true,
              conflictIgnoreEnable: true
            }
          }
        ]
      }
    ];

    const nextBookingInfoError = {
      code: null,
      clientMessages: ['clientMessages1'],
      serverMessages: [],
      conflictMessage: '2conflictMessage',
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        eventNameDuplicate: false,
        scheduleTypeID: false,
        eventResource: nextErrorEventResource
      }
    };
    const nextBookingInfo = {
      ...bookingInfo(true),
      ...{ display: true },
      ...{ error: nextBookingInfoError }
    };
    const nextProps = {
      bookingInfo: fromJS(nextBookingInfo),
      booking: fromJS(booking),
      hideIntro: false,
      cleanBookingInfoError: jest.fn,
      initialData
    };
    const component = setup(nextProps, store);

    expect(component.find('.override-conflict')).toHaveLength(1);
    component.find('.override-conflict').simulate('click');
  });

  it('BookingInformation booking error serverMessages and clientMessages equal to [] should render without errors', () => {
    const store = mockStore({...initState});
    const nextBookingInfoError = {
      code: null,
      clientMessages: [],
      serverMessages: [],
      conflictMessage: 'conflictMessage',
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        eventNameDuplicate: false,
        scheduleTypeID: false,
        eventResource: [0]
      }
    };
    const nextBookingInfo = {
      ...bookingInfo(true),
      ...{ display: true },
      ...{ error: nextBookingInfoError }
    };
    const nextProps = {
      bookingInfo: fromJS(nextBookingInfo),
      booking: fromJS(booking),
      hideIntro: false,
      initialData
    };

    const component = setup(nextProps, store);
    expect(component.find('.override-conflict').text()).toBe('Undo override');
  });

  it('BookingInformation conflictIgnoreEnable and conflict equal to false should render without errors', () => {
    const store = mockStore({...initState});
    const nextErrorEventResource = [
      {
        resourceID: 2,
        resourceName: 'kaely test equipment &amp;',
        eventTypeID: false,
        bookingDetail: [
          {
            pendingID: 'pending_775_7160',
            resourceBookingID: 0,
            errors: {
              conflict: false,
              conflictIgnoreEnable: false
            }
          }
        ]
      }
    ];
    const nextBookingInfoError = {
      code: null,
      clientMessages: [],
      serverMessages: [],
      conflictMessage: 'conflictMessage',
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        eventNameDuplicate: false,
        scheduleTypeID: false,
        eventResource: nextErrorEventResource
      }
    };
    const nextBookingInfo = {
      ...bookingInfo(true),
      ...{ display: true },
      ...{ error: nextBookingInfoError }
    };
    const nextProps = {
      bookingInfo: fromJS(nextBookingInfo),
      booking: fromJS(booking),
      hideIntro: false,
      initialData
    };

    setup(nextProps, store);
  });

  it('BookingInformation clientMessages,serverMessages,conflictMessage length equal to 0  should render without errors', () => {
    const store = mockStore({...initState});
    const nextBookingInfoError = {
      code: null,
      clientMessages: [],
      serverMessages: [],
      conflictMessage: '',
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        eventNameDuplicate: false,
        scheduleTypeID: false,
        eventResource: errorEventResource
      }
    };
    const nextBookingInfo = { ...bookingInfo(true), ...{ display: true }, ...{ error: nextBookingInfoError } };
    const nextProps = {
      ...props,
      bookingInfo: fromJS(nextBookingInfo),
      booking: fromJS(booking),
      hideIntro: false,
      initialData: {
        ...initialData,
        permitID: '111',
        receiptEntryID: '111'
      }
    };

    const component = setup(nextProps, store);
    expect(component.find('.error-box ul li')).toHaveLength(1);
  });

  it('BookingInformation eventNameDuplicate equal to true should render without errors', () => {
    const store = mockStore({...initState});
    const nextBookingInfoError = {
      code: null,
      clientMessages: [],
      serverMessages: [],
      conflictMessage: '',
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        eventNameDuplicate: true,
        scheduleTypeID: false,
        eventResource: errorEventResource
      }
    };
    const nextBookingInfo = {
      ...bookingInfo(true),
      ...{ display: true },
      ...{ error: nextBookingInfoError }
    };
    const nextProps = {
      ...props,
      bookingInfo: fromJS(nextBookingInfo),
      booking: fromJS(booking),
      hideIntro: false
    };
    setup(nextProps, store);
  });

  it('BookingInformation permitID not equal to -1 should render without errors', () => {
    const store = mockStore({...initState});
    const nextErrorEventResource = [
      {
        resourceID: 2,
        resourceName: 'kaely test equipment &amp;',
        eventTypeID: false,
        bookingDetail: [
          {
            pendingID: 'pending_775_7160',
            resourceBookingID: 0,
            errors: {
              conflict: false,
              conflictIgnoreEnable: false
            }
          }
        ]
      }
    ];
    const nextBookingInfoError = {
      code: null,
      clientMessages: [],
      serverMessages: [],
      conflictMessage: '',
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        eventNameDuplicate: false,
        scheduleTypeID: false,
        eventResource: nextErrorEventResource
      }
    };
    const nextBookingInfo = {
      ...bookingInfo(false),
      ...{ display: true },
      ...{ error: nextBookingInfoError }
    };
    const nextProps = {
      ...props,
      bookingInfo: fromJS(nextBookingInfo),
      booking: fromJS(booking),
      hideIntro: false
    };
    setup(nextProps, store);

    const nextBookingInfoOne = {
      ...bookingInfo(false),
      ...{ display: true },
      ...{ error: nextBookingInfoError },
      ...{ isBookingChanged: false, backFromPermitDetailPage: true }
    };

    const nextPropsOne = {
      ...props,
      bookingInfo: fromJS(nextBookingInfoOne),
      booking: fromJS(booking),
      hideIntro: false,
      initialData: {
        ...initialData,
        permitID: 1
      }
    };
    const component = setup(nextPropsOne, store);
    component.find('.btn-proceed').simulate('click');
    clock.runTimersToTime(10);
  });

  it('render identifier correctly', () => {
    const store = mockStore({...initState});
    let wrapper

    wrapper = setup({
      ...props,
      initialData: {
        ...initialData,
        customerCompany: { customerId: 1, customerName: 'Customer Name'}
      }
    }, store);
    expect(wrapper.find('.header__title').text()).toBe('Reservation Information - Customer Name');

    wrapper = setup({
      ...props,
      initialData: {
        ...initialData,
        customerCompany: { companyId: 1, companyName: 'Company Name'}
      }
    }, store);
    expect(wrapper.find('.header__title').text()).toBe('Reservation Information - Company Name');

    wrapper = setup({
      ...props,
      initialData: {
        ...initialData,
        customerCompany: { companyId: 1, companyName: 'Company Name'},
        permitNumber: 'R123'
      }
    }, store);
    expect(wrapper.find('.header__title').text()).toBe('Reservation Information - Company Name (R123)');

    wrapper = setup({
      ...props,
      initialData: {
        ...initialData,
        customerCompany: null,
        permitNumber: 'R123'
      }
    }, store);
    expect(wrapper.find('.header__title').text()).toBe('Reservation Information - R123');

    wrapper = setup({
      ...props,
      initialData: {
        ...initialData,
        customerCompany: null,
        permitNumber: ''
      }
    }, store);
    expect(wrapper.find('.header__title > span')).toHaveLength(0);
  })

  it('handle cancel rental block override correctly', () => {
    const store = mockStore({...initState});
    const component = setupShallow(props, store);
    const instance = component.instance();

    const cancelMock = jest.fn();
    const elMock = { getBoundingClientRect: () => ({ top: 100, left: 100, width: 100, height: 100 })}

    instance.cancelRentalBlockOverride({
      clientX: 110,
      clientY: 110
    })

    instance.setEditingRentalBlock(elMock, cancelMock);
    instance.cancelRentalBlockOverride({
      clientX: 110,
      clientY: 110
    })

    expect(cancelMock.mock.calls.length).toBe(0);

    instance.setEditingRentalBlock(elMock, cancelMock);
    instance.cancelRentalBlockOverride({
      clientX: 0,
      clientY: 0
    })
    expect(cancelMock.mock.calls.length).toBe(1);

  })

  it('BookingInformation Override advance error Enable equal to true should render without errors', () => {
    const store = mockStore({...initState});
    const nextErrorEventResource = [
      {
        resourceID: 2,
        resourceName: 'kaely test equipment &amp;',
        eventTypeID: false,
        bookingDetail: [
          {
            pendingID: 'pending_775_7160',
            resourceBookingID: 0,
            errors: {
              advancedError: true,
              advancedType: 'over_advance_maximum',
              advancedReason: 'edmund test bug cannot be booked more than 3 day(s) in advance.',
              isOverrideAdvance: false
            }
          },
          {
            pendingID: 'pending_775_7161',
            resourceBookingID: 0,
            errors: {
              advancedError: true,
              advancedType: 'below_advance_minimum',
              advancedReason: 'edmund test bug must be booked at least 1 day(s) in advance.',
              isOverrideAdvance: false
            }
          }
        ]
      }
    ];

    const nextBookingInfoError = {
      code: null,
      clientMessages: [],
      serverMessages: [],
      conflictMessage: '',
      belowMinimumNumber: 1,
      overMaximumNumber: 2,
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        eventNameDuplicate: false,
        scheduleTypeID: false,
        eventResource: nextErrorEventResource
      }
    };
    const nextBookingInfo = {
      ...bookingInfo(true),
      ...{ display: true },
      ...{ error: nextBookingInfoError }
    };
    const nextProps = {
      bookingInfo: fromJS(nextBookingInfo),
      booking: fromJS(booking),
      hideIntro: false,
      cleanBookingInfoError: jest.fn,
      initialData
    };
    const component = setup(nextProps, store);

    component.find('.override-advanced').at(0).simulate('click')
    component.find('.override-advanced').at(1).simulate('click')
  });

  it('BookingInformation undo Override advance error Enable should render without errors', () => {
    const store = mockStore({...initState});
    const nextErrorEventResource = [
      {
        resourceID: 2,
        resourceName: 'kaely test equipment &amp;',
        eventTypeID: false,
        bookingDetail: [
          {
            pendingID: 'pending_775_7160',
            resourceBookingID: 0,
            errors: {
              advancedError: true,
              advancedType: 'over_advance_maximum',
              advancedReason: 'edmund test bug cannot be booked more than 3 day(s) in advance.',
              isOverrideAdvance: true
            }
          },
          {
            pendingID: 'pending_775_7161',
            resourceBookingID: 0,
            errors: {
              advancedError: true,
              advancedType: 'below_advance_minimum',
              advancedReason: 'edmund test bug must be booked at least 1 day(s) in advance.',
              isOverrideAdvance: true
            }
          }
        ]
      }
    ];

    const nextBookingInfoError = {
      code: null,
      clientMessages: [],
      serverMessages: [],
      conflictMessage: '',
      belowMinimumNumber: 1,
      overMaximumNumber: 2,
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        eventNameDuplicate: false,
        scheduleTypeID: false,
        eventResource: nextErrorEventResource
      }
    };
    const nextBookingInfo = {
      ...bookingInfo(true),
      ...{ display: true },
      ...{ error: nextBookingInfoError }
    };
    const nextProps = {
      bookingInfo: fromJS(nextBookingInfo),
      booking: fromJS(booking),
      hideIntro: false,
      cleanBookingInfoError: jest.fn,
      hideBookingInfo: jest.fn,
      syncDataFromBookingInfoToCalendar: jest.fn,
      initialData
    };
    const component = setup(nextProps, store);

    component.find('.override-advanced').at(0).simulate('click')
    component.find('.override-advanced').at(1).simulate('click')

    setupShallow(nextProps, store).instance().hideWhenClickOutSide();

    component.setProps({ hasSystemErr: true });
    component.setProps({ hasSystemErr: false });
  });
});
