import { fromJS } from 'immutable';
import {
  getAPIErrorType,
  getLatestError,
  getClientErrorWhenProceed,
  getResourceErrorIndex,
  getDetailErrorIndex,
  updateBookingDetailState,
  getDetailError
} from 'index/Resource/utils/bookingInfoClientValidation';
import { bookingAPIErrorType } from 'index/Resource/consts/bookingConflict';
import reservationPeriodUnit from 'index/Resource//consts/reservationPeriodUnit';

describe('index -> Resource -> utils -> bookingInfoClientValidation', () => {

  it('method getAPIErrorType returns API error type', () => {
    expect(getAPIErrorType(bookingAPIErrorType.INVALID_EVENT_TYPE)).toEqual('eventTypeID');

    expect(getAPIErrorType(bookingAPIErrorType.MISSING_QTY)).toEqual('attendance');
    expect(getAPIErrorType(bookingAPIErrorType.TOO_LESS)).toEqual('attendance');
    expect(getAPIErrorType(bookingAPIErrorType.TOO_MANY)).toEqual('attendance');
    expect(getAPIErrorType(bookingAPIErrorType.EVENT_CAPACITY_TOO_LESS)).toEqual('attendance');
    expect(getAPIErrorType(bookingAPIErrorType.EVENT_CAPACITY_TOO_MANY)).toEqual('attendance');

    expect(getAPIErrorType(bookingAPIErrorType.INVALID_RENTAL_BLOCK)).toEqual('rentalBlockID');

    expect(getAPIErrorType(bookingAPIErrorType.CONFLICT)).toEqual('conflict');
    expect(getAPIErrorType(bookingAPIErrorType.CLOSED)).toEqual('conflict');
    expect(getAPIErrorType(bookingAPIErrorType.SKIP_DATE)).toEqual('conflict');

    expect(getAPIErrorType(bookingAPIErrorType.BELOW_ADVANCE_MINIMUM)).toEqual('advancedError');
    expect(getAPIErrorType(bookingAPIErrorType.OVER_ADVANCE_MAXIMUM)).toEqual('advancedError');

    expect(getAPIErrorType(bookingAPIErrorType.OVER_MAXIMUM)).toEqual('timeOverMaximum');

    expect(getAPIErrorType('')).toEqual('datetime');
  });

  it('method getLatestError returns latest error object if no conflict error', () => {
    const parameters = fromJS({
      entity: {
        eventName: true,
        scheduleTypeID: true,
        eventResource: [
          {
            resourceName: 'facility resource LG01',
            eventTypeID: true,
            bookingDetail: [
              {
                errors: {
                  attendance: true,
                }
              },
              {
                errors: {
                  attendance: 'Attendees for facility is more than the required maximum (100).',
                }
              },
              {
                errors: {
                  attendance: 'Attendees for facility is more than the required maximum (100).',
                  startDatetimeBigger: true,
                }
              },
              {
                errors: {
                  attendance: true,
                }
              },
              {
                errors: {
                  startDatetimeBigger: true,
                }
              }
            ]
          },
          {
            resourceName: 'facility resource LG02',
            eventTypeID: true,
            bookingDetail: [
              {
                errors: {
                  dateRangeID: true,
                }
              },
              {
                errors: {
                  dateRangeID: true,
                }
              }
            ]
          },
          {
            resourceName: 'facility resource LG03',
            eventTypeID: false,
            bookingDetail: [
              {
                errors: {
                  rentalBlockID: true,
                }
              },
              {
                errors: {
                  rentalBlockID: true,
                }
              },
            ]
          },
        ],
        eventNameDuplicate: true,
      },
      eventNameDuplicateMessage: 'The event name is duplicate with the other booking #1722'
    });

    const latestError = getLatestError(parameters).toJS();

    expect(latestError.clientMessages).toEqual(expect.arrayContaining([
      'Fields Event Name, Schedule Type cannot be empty.',
      'Event Type for facility resource LG01 & facility resource LG02 cannot be empty.',
      'Attendees for facility resource LG01 cannot be empty.',
      'Please specify Rental Block for facility resource LG03.',
      'Please specify Date Range for facility resource LG02.',
      'Start Time must be earlier than End Time.'
    ]));
    expect(latestError.serverMessages).toEqual(expect.arrayContaining([
      'Attendees for facility is more than the required maximum (100).'
    ]));
    expect(latestError.conflictMessage).toEqual('');
  });

  it('method getLatestError returns latest error object if meet advanced error ', () => {
    const parameters = fromJS({
      entity: {
        eventName: true,
        scheduleTypeID: true,
        overrideRentalBlockTimeError: [],
        eventResource: [
          {
            resourceName: 'facility resource LG01',
            eventTypeID: true,
            bookingDetail: [
              {
                errors: {
                  advancedError: true,
                  advancedType: bookingAPIErrorType.BELOW_ADVANCE_MINIMUM
                }
              },
              {
                errors: {
                  advancedError: true,
                  advancedType: bookingAPIErrorType.BELOW_ADVANCE_MINIMUM
                }
              },
              {
                errors: {
                  advancedError: true,
                  advancedType: bookingAPIErrorType.BELOW_ADVANCE_MINIMUM
                }
              },
            ]
          },
          {
            resourceName: 'facility resource LG02',
            eventTypeID: true,
            bookingDetail: [
              {
                errors: {
                  advancedError: true,
                  advancedType: bookingAPIErrorType.OVER_ADVANCE_MAXIMUM
                }
              },
              {
                errors: {
                  advancedError: true,
                  advancedType: bookingAPIErrorType.OVER_ADVANCE_MAXIMUM
                }
              },
            ]
          }
        ],
        eventNameDuplicate: false,
      },
      eventNameDuplicateMessage: ''
    });

    const latestError = getLatestError(parameters).toJS();

    expect(latestError.belowMinimumNumber).toEqual(3);
    expect(latestError.overMaximumNumber).toEqual(2);
  });

  it('method getLatestError returns empty latest error object if only conflict error', () => {
    const parameters = fromJS({
      entity: {
        eventName: false,
        scheduleTypeID: false,
        overrideRentalBlockTimeError: [],
        eventResource: [{
          resourceName: 'facility resource LG01',
          eventTypeID: false,
          bookingDetail: [
            {
              errors: {
                conflictReason: 'The booking is conflict with the other booking #1872'
              }
            },
            {
              errors: {
                conflictReason: 'The booking is conflict with the other booking #1877'
              }
            }
          ]
        }],
        eventNameDuplicate: false,
      },
      eventNameDuplicateMessage: ''
    });

    const latestError = getLatestError(parameters).toJS();

    expect(latestError.clientMessages).toEqual([]);
    expect(latestError.serverMessages).toEqual([]);
    expect(latestError.conflictMessage).toEqual('Conflict Check: 2 conflicts found.');
  });

  it('method getClientErrorWhenProceed returns client error object', () => {
    const parameters = {
      eventName: '',
      scheduleTypeID: -1,
      eventResource: [
        {
          resourceID: 132,
          eventTypeID: -1,
          resourceName: 'facility resource LG01',
          bookingDetail: [
            {
              startEventDate: '2017-09-11',
              startEventTime: '16:00:00',
              endEventDate: '2017-09-11',
              endEventTime: '15:00:00',
              reservationPeriodUnit: reservationPeriodUnit.MINUTE,
              attendance: 0,
            },
            {
              startEventDate: '2017-09-12',
              startEventTime: '16:00:00',
              endEventDate: '2017-09-12',
              endEventTime: '15:00:00',
              reservationPeriodUnit: reservationPeriodUnit.MINUTE,
            },
            {
              startEventDate: '2017-09-13',
              startEventTime: '15:00:00',
              endEventDate: '2017-09-13',
              endEventTime: '16:00:00',
              reservationPeriodUnit: reservationPeriodUnit.MINUTE,
              attendance: 0,
            },
            {
              isDeleteSchedule: true
            }
          ]
        },
        {
          resourceID: 133,
          eventTypeID: -1,
          resourceName: 'facility resource LG02',
          bookingDetail: [
            {
              dateRangeID: -1,
              attendance: 3,
              reservationPeriodUnit: reservationPeriodUnit.DEFINED_DATE_RANGE,
            },
            {
              dateRangeID: -1,
              attendance: 3,
              reservationPeriodUnit: reservationPeriodUnit.DEFINED_DATE_RANGE,
            },
            {
              dateRangeID: 62,
              attendance: 3,
              reservationPeriodUnit: reservationPeriodUnit.DEFINED_DATE_RANGE,
            },
          ]
        },
        {
          resourceID: 134,
          eventTypeID: 273,
          resourceName: 'facility resource LG03',
          bookingDetail: [
            {
              rentalBlockID: -1,
              attendance: 3,
              reservationPeriodUnit: reservationPeriodUnit.RENTAL_BLOCK,
            },
            {
              rentalBlockID: -1,
              attendance: 3,
              reservationPeriodUnit: reservationPeriodUnit.RENTAL_BLOCK,
            },
            {
              rentalBlockID: 723,
              attendance: 3,
              reservationPeriodUnit: reservationPeriodUnit.RENTAL_BLOCK,
            },
          ]
        }
      ]
    };

    const error = getClientErrorWhenProceed(parameters);

    expect(error.clientMessages).toEqual(expect.arrayContaining([
      'Fields Event Name, Schedule Type cannot be empty.',
      'Event Type for facility resource LG01 & facility resource LG02 cannot be empty.',
      'Attendees for facility resource LG01 cannot be empty.',
      'Please specify Rental Block for facility resource LG03.',
      'Please specify Date Range for facility resource LG02.',
      'Start Time must be earlier than End Time.'
    ]));
  });

  it('method getClientErrorWhenProceed returns empty client error object if no error', () => {
    const parameters = {
      eventName: '2017 Annual Party #2213',
      scheduleTypeID: 872,
      eventResource: [
        {
          resourceID: 132,
          eventTypeID: 773,
          resourceName: 'facility resource LG02',
          bookingDetail: [
            {
              isDeleteSchedule: true
            }
          ]
        }
      ]
    };

    const emptyError = getClientErrorWhenProceed(parameters);

    expect(emptyError.clientMessages).toEqual([]);
  });

  it('method getResourceErrorIndex returns index of resource error', () => {
    const resource = fromJS({
      resourceID: 332
    });
    const resourceErrors = fromJS([
      {
        resourceID: 331
      },
      {
        resourceID: 332
      },
      {
        resourceID: 333
      }
    ]).toArray();

    const index = getResourceErrorIndex(resourceErrors, resource);

    expect(index).toEqual('1');
  });

  it('method getDetailErrorIndex returns index of booking error', () => {
    const detail = fromJS({
      resourceID: 332,
      pendingID: 1505117074513
    });
    const resourceErrors = fromJS([
      {
        resourceID: 331
      },
      {
        resourceID: 332,
        bookingDetail: [
          {
            pendingID: 1505117074511
          },
          {
            pendingID: 1505117074512
          },
          {
            pendingID: 1505117074513
          },
        ]
      },
      {
        resourceID: 333
      }
    ]).toArray();

    const index = getDetailErrorIndex(resourceErrors, detail);

    expect(index).toEqual(2);
  });

  it('method getDetailError returns error object of booking error', () => {
    const detail = fromJS({
      resourceID: 332,
      pendingID: -1,
      resourceBookingID: 871,
    });
    const detailsErrors = fromJS([
      {
        resourceBookingID: 871,
        pendingID: -1
      },
      {
        resourceBookingID: 872,
        pendingID: -1
      },
      {
        resourceBookingID: 873,
        pendingID: -1
      },
    ]).toArray();

    const index = getDetailError(detailsErrors, detail).toJS();

    expect(index).toEqual(expect.objectContaining({
      'pendingID': -1,
      'resourceBookingID': 871
    }));
  });

  it('method updateBookingDetailState returns error object { stateNew, bookingBlockKey, bookingDateTimeKey, conflictKey }', () => {
    let resourceIndex = 0;
    let bookingIndex = 0;
    let key = 'attendance';
    let value = '6';
    let expectObject;
    let resource;
    const data ={
      eventResource: [{
      resourceID: 36,
      bookingDetail: [
        {
          resourceID: 36,
          attendance: '6',
          pendingID: 'pending_36_9104',
          isRecurring: false
        }
      ]
     }]
    }
    const error = (conflictType) => ({
      code: null,
      clientMessages: ['Attendees for Gym 1 cannot be empty.'],
      serverMessages: [],
      conflictMessage: '',
      eventNameDuplicateMessage: '',
      entity: {
        eventName: false,
        scheduleTypeID: false,
        overrideRentalBlockTimeError: [],
        eventResource: [{
          resourceID: 36,
          resourceName: 'Gym 1',
          eventTypeID: false,
          bookingDetail: [{
            pendingID: 'pending_36_9104',
            resourceBookingID: 0,
            errors: {
              attendance: true,
              eventTypeID: false,
              conflictReason: 'conflictReason',
              conflictType: conflictType,
              conflict: true
            },
            ignoreConflict: false,
            ignoreClosetime: false,
            ignoreSkipdate: false
          }]
        }],
        scheduleType: false
      }
    })
    let initialState = (conflictType) =>
        fromJS({
          error: error(conflictType),
          data
        });


    expectObject = updateBookingDetailState(initialState('holiday'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    key = 'rentalBlockID';
    expectObject = updateBookingDetailState(initialState('holiday'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    key = 'startEventDate';
    expectObject = updateBookingDetailState(initialState('conflict'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    key = 'eventTypeID';
    expectObject = updateBookingDetailState(initialState('closed'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    key = 'conflict';
    expectObject = updateBookingDetailState(initialState('conflict'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');


    expectObject = updateBookingDetailState(initialState('holiday'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');


    expectObject = updateBookingDetailState(initialState('closed'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    expectObject = updateBookingDetailState(initialState(''), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    bookingIndex = '-1';
    expectObject = updateBookingDetailState(initialState('closed'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    resourceIndex = -1;
    expectObject = updateBookingDetailState(initialState('closed'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    expectObject = updateBookingDetailState(initialState('conflict'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    expectObject = updateBookingDetailState(initialState('holiday'), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    expectObject = updateBookingDetailState(initialState(''), key, resourceIndex, bookingIndex, value);
    expect(typeof expectObject).toEqual('object');

    key = 'attendance'
    expectObject = updateBookingDetailState(initialState(''), key, resourceIndex, bookingIndex, value);
    expect(expectObject.getIn(['error', 'entity', 'bookingDetail', 0, 'ignoreConflict'])).toBeFalsy();
  });

  it('method updateBookingDetailState returns error object when meet advanced override error', () => {
    const data ={
      eventResource: [{
        resourceID: 36,
        bookingDetail: [
          {
            resourceID: 36,
            attendance: '6',
            pendingID: 'pending_36_9104',
            isRecurring: false,
            overrideAdvanceMaximum: false,
            overrideAdvanceMinimum: false
          }
        ]
      }]
    };
    const error = () => ({
      code: null,
      clientMessages: ['Attendees for Gym 1 cannot be empty.'],
      serverMessages: [],
      conflictMessage: '',
      belowMinimumNumber: 0,
      overMaximumNumber: 1,
      entity: {
        eventName: false,
        scheduleTypeID: false,
        overrideRentalBlockTimeError: [],
        eventResource: [{
          resourceID: 36,
          resourceName: 'Gym 1',
          eventTypeID: false,
          bookingDetail: [{
            pendingID: 'pending_36_9104',
            resourceBookingID: 0,
            errors: {
              advancedError: true,
              advancedType: bookingAPIErrorType.OVER_ADVANCE_MAXIMUM,
              isOverrideAdvance: false
            },
          }]
        }]
      }
    });
    let initialState = () => fromJS({ error: error(), data });

    const resourceIndex = 0;
    const bookingIndex = 0;
    const key = 'overrideAdvanceMaximum';
    const value = true;

    const overrideAdvanced = updateBookingDetailState(initialState(), key, resourceIndex, bookingIndex, value);
    const commonPath = ['data', 'eventResource', resourceIndex, 'bookingDetail', bookingIndex];
    expect(overrideAdvanced.getIn([...commonPath, 'overrideAdvanceMaximum'])).toBeTruthy();
    expect(overrideAdvanced.getIn([...commonPath, 'overrideAdvanceMinimum'])).toBeFalsy();
  });

  it('method updateBookingDetailState returns error object when meet advanced override all error', () => {
    const data ={
      eventResource: [{
        resourceID: 36,
        bookingDetail: [
          {
            resourceID: 36,
            attendance: '6',
            pendingID: 'pending_36_9104',
            isRecurring: false,
            overrideAdvanceMaximum: false,
            overrideAdvanceMinimum: false
          },
          {
            resourceID: 36,
            attendance: '6',
            pendingID: 'pending_36_9105',
            isRecurring: false,
            overrideAdvanceMaximum: false,
            overrideAdvanceMinimum: false
          }
        ]
      }]
    };
    const error = () => ({
      code: null,
      clientMessages: ['Attendees for Gym 1 cannot be empty.'],
      serverMessages: [],
      conflictMessage: '',
      belowMinimumNumber: 0,
      overMaximumNumber: 2,
      entity: {
        eventName: false,
        scheduleTypeID: false,
        overrideRentalBlockTimeError: [],
        eventResource: [{
          resourceID: 36,
          resourceName: 'Gym 1',
          eventTypeID: false,
          bookingDetail: [
            {
              pendingID: 'pending_36_9104',
              resourceBookingID: 0,
              errors: {
                advancedError: true,
                advancedType: bookingAPIErrorType.OVER_ADVANCE_MAXIMUM,
                isOverrideAdvance: false
              }
            },
            {
              pendingID: 'pending_36_9105',
              resourceBookingID: 0,
              errors: {
                advancedError: true,
                advancedType: bookingAPIErrorType.OVER_ADVANCE_MAXIMUM,
                isOverrideAdvance: false
              }
            }
          ]
        }]
      }
    });
    let initialState = () => fromJS({ error: error(), data });

    const resourceIndex = -1;
    const bookingIndex = -1;
    const key = 'overrideAllMaximum';
    const value = true;

    const overrideAdvanced = updateBookingDetailState(initialState(), key, resourceIndex, bookingIndex, value);
    const commonPath = ['data', 'eventResource', resourceIndex, 'bookingDetail'];
    expect(overrideAdvanced.getIn([...commonPath, 0, 'overrideAdvanceMaximum'])).toBeTruthy();
    expect(overrideAdvanced.getIn([...commonPath, 1, 'overrideAdvanceMaximum'])).toBeTruthy();
  });

  it('method updateBookingDetailState maintains event capacity error state when update event type', () => {
    const data = {
      eventResource: [{
        resourceID: 36,
        bookingDetail: [
          {
            resourceID: 812,
            attendance: '2',
            pendingID: 'pending_812_7f09aa32-447e-4740-86f4-4e49b2c9f4ef',
            isRecurring: false
          }
        ]
      }]
    };
    const error = {
      code: null,
      clientMessages: [],
      serverMessages: [
        'Attendees for Facility + EventCapacity is less than the required minimum (2).'
      ],
      conflictMessage: '',
      eventNameDuplicateMessage: '',
      belowMinimumNumber: 0,
      overMaximumNumber: 0,
      entity: {
        eventName: false,
        scheduleTypeID: false,
        eventResource: [
          {
            resourceID: 36,
            resourceName: 'Facility + EventCapacity',
            eventTypeID: false,
            bookingDetail: [
              {
                pendingID: 'pending_812_7f09aa32-447e-4740-86f4-4e49b2c9f4ef',
                resourceBookingID: 0,
                errors: {
                  eventCapacityLimit: true,
                  attendance: 'Attendees for Facility + EventCapacity is less than the required minimum (2).'
                },
                baseBookingID: ''
              }
            ]
          }
        ],
        overrideRentalBlockTimeError: [],
        eventNameDuplicate: false
      }
    };
    let initialState = () => fromJS({ error, data });

    const resourceIndex = 0;
    const key = 'eventTypeID';
    const value = 813;

    const bookingInfoState = updateBookingDetailState(initialState(), key, resourceIndex, -1, value);
    const commonPath = ['data', 'eventResource', resourceIndex, 'bookingDetail', 0, 'errors'];
    expect(bookingInfoState.getIn([...commonPath, 'eventCapacityLimit'])).toBeFalsy();
    expect(bookingInfoState.getIn([...commonPath, 'attendance'])).toBeFalsy();
    expect(bookingInfoState.getIn(['error', 'serverMessages']).toJS()).toEqual([]);
  });

});
