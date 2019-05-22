const hasOverMaximumTimeBookingInfo = {
  eventTypes: [],
  scheduleTypes: [],
  prepCodeList: [],
  setUpList: [],
  cleanUpList: [],
  permitBookingList: [],
  pendingBookingList: [],
  error: {
    code: null,
    clientMessages: [],
    serverMessages: [],
    conflictMessage: '',
    entity: {
      eventName: false,
      scheduleTypeID: false,
      overrideRentalBlockTimeError: [],
      eventResource: [{
        'resourceID': 1121,
        'resourceName': 'OverMaximumFacility',
        'eventTypeID': false,
        'bookingDetail': [
          {
            'pendingID': 'pending_775_7595',
            'resourceBookingID': 0,
            'errors': {
              'timeOverMaximum': 'OverMaximumFacility cannot be reserved for longer than 2 days.'
            }
          },
          {
            'pendingID': 'pending_775_7596',
            'resourceBookingID': 0,
            'errors': {
              'timeOverMaximum': 'OverMaximumFacility cannot be reserved for longer than 2 days.'
            }
          },
          {
            'pendingID': 'pending_775_7597',
            'resourceBookingID': 0,
            'errors': {
              'timeOverMaximum': 'OverMaximumFacility cannot be reserved for longer than 2 days.'
            }
          }
        ]
      }]
    }
  },
  data: {
    permitID: -1,
    eventName: '',
    scheduleTypeID: -1,
    scheduleType: '',
    checkForWaitlistConflict: true,
    eventResource: [{
      'setupMinutes': 0,
      'isTemplate': true,
      'definedDateRange': [],
      'resourceType': 0,
      'resourceID': 1121,
      'rentalBlock': [],
      'bookingDetail': [
        {
          'currentEvent': true,
          'recurringExceptions': [],
          'hasRecurring': false,
          'rentalBlockID': 0,
          'recurringEnabled': false,
          'ignoreConflict': false,
          'startEventTime': '0:00 AM',
          'bookingAssignment': 0,
          'reservationType': 0,
          'resourceBookingID': 0,
          'startEventDate': '2018 Dec 06',
          'pendingRemoveFromRecurringGroup': '',
          'attendance': 1,
          'recurringReservationGroupID': 0,
          'isDeleteSchedule': false,
          'endEventTime': '0:00 AM',
          'endEventDate': '2018 Dec 07',
          'reservationPeriodUnit': 6,
          'pendingID': 'pending_775_7595',
          'isRecurring': false,
          'startEventDatetime': '12/06/2018 0:00 AM',
          'ignoreClosetime': false,
          'ownerPendingReceipt': true,
          'masterFacilityScheduleID': null,
          'transactionID': -1,
          'expanded': false,
          'endEventDatetime': '12/07/2018 0:00 AM',
          'ignoreSkipdate': false
        },
        {
          'currentEvent': true,
          'recurringExceptions': [],
          'hasRecurring': false,
          'rentalBlockID': 0,
          'recurringEnabled': false,
          'ignoreConflict': false,
          'startEventTime': '0:00 AM',
          'bookingAssignment': 0,
          'reservationType': 0,
          'resourceBookingID': 0,
          'startEventDate': '2018 Dec 07',
          'pendingRemoveFromRecurringGroup': '',
          'attendance': 1,
          'recurringReservationGroupID': 0,
          'isDeleteSchedule': false,
          'endEventTime': '0:00 AM',
          'endEventDate': '2018 Dec 08',
          'reservationPeriodUnit': 6,
          'pendingID': 'pending_775_7596',
          'isRecurring': false,
          'startEventDatetime': '12/07/2018 0:00 AM',
          'ignoreClosetime': false,
          'ownerPendingReceipt': true,
          'masterFacilityScheduleID': null,
          'transactionID': -1,
          'expanded': false,
          'endEventDatetime': '12/08/2018 0:00 AM',
          'ignoreSkipdate': false
        },
        {
          'currentEvent': true,
          'recurringExceptions': [],
          'hasRecurring': false,
          'rentalBlockID': 0,
          'recurringEnabled': false,
          'ignoreConflict': false,
          'startEventTime': '0:00 AM',
          'bookingAssignment': 0,
          'reservationType': 0,
          'resourceBookingID': 0,
          'startEventDate': '2018 Dec 08',
          'pendingRemoveFromRecurringGroup': '',
          'attendance': 1,
          'recurringReservationGroupID': 0,
          'isDeleteSchedule': false,
          'endEventTime': '0:00 AM',
          'endEventDate': '2018 Dec 09',
          'reservationPeriodUnit': 6,
          'pendingID': 'pending_775_7597',
          'isRecurring': false,
          'startEventDatetime': '12/08/2018 0:00 AM',
          'ignoreClosetime': false,
          'ownerPendingReceipt': true,
          'masterFacilityScheduleID': null,
          'transactionID': -1,
          'expanded': false,
          'endEventDatetime': '12/09/2018 0:00 AM',
          'ignoreSkipdate': false
        },
      ],
      'eventTypeID': 36,
      'reservationPeriodUnit': 3,
      'eventType': '\'South West Hub',
      'prepCodeID': -1,
      'resourceNumber': '',
      'resourceName': 'OverMaximumFacility',
      'cleanupMinutes': 0,
      'eventTypes': [{
        'id': 35,
        'name': 'deserunt et',
        'selected': false,
        'text': 'deserunt et',
        'value': 35
      }, {
        'id': 36,
        'name': 'incididunt irure',
        'selected': false,
        'text': 'incididunt irure',
        'value': 36
      }]
    }]
  },
  isBookingChanged: false,
  backFromPermitDetailPage: false,
  display: false,
  templateState: 'no_template'
};

export default hasOverMaximumTimeBookingInfo;
