const hasConflictErrBookingInfo = {
  eventTypes: [],
  scheduleTypes: [],
  prepCodeList: [],
  setUpList: [],
  cleanUpList: [],
  permitBookingList: [
    {
      setupMinutes: 3,
      definedDateRange: [
        {
          rentalBlockID: 0,
          startEventTime: "2:00 AM",
          bookingAssignment: 0,
          reservationType: 0,
          resourceBookingID: 0,
          startEventDate: "2016 Dec 21",
          attendance: 2,
          dateRangeID: 0,
          isDeleteSchedule: false,
          endEventTime: "3:00 AM",
          endEventDate: "2016 Dec 21",
          pendingID: "pending_775_7159",
          startEventDatetime: "12/21/2016 2:00 AM",
          ownerPendingReceipt: true,
          transactionID: -1,
          endEventDatetime: "12/21/2016 3:00 AM"
        }
      ],
      resourceType: 0,
      resourceID: 1,
      rentalBlock: [],
      bookingDetail: [],
      eventTypeID: 6,
      reservationPeriodUnit: 2,
      eventType: "event type 1",
      prepCodeID: 10,
      resourceNumber: "1",
      resourceName: "resourceName 1",
      cleanupMinutes: 5
    }
  ],
  pendingBookingList: [
    {
      setupMinutes: 0,
      definedDateRange: [
        {
          id: 3,
          name: "2016 Jun 01 to 2016 Jun 03",
          selected: true,
          parent_id: 4,
          text: "2016 Jun 01 to 2016 Jun 03",
          value: 3
        }
      ],
      resourceType: "",
      resourceID: 2,
      rentalBlock: [],
      bookingDetail: [
        {
          endScheduleDate: "2016 Jun 7",
          setupMinutes: 30,
          startScheduleDay: "Tue",
          rentalBlockID: -1,
          startScheduleDatetiem: "2016 Jun 4 8:00 PM",
          permitNumber: 349,
          eventName: "1 f+expiration kaely eventName &amp;",
          startEventTime: "1:00 AM",
          bookingAssignment: 0,
          reservationType: 0,
          resourceBookingID: 8622,
          startEventDate: "2016 Jun 5",
          startScheduleTime: "8:00 PM",
          eventNotes: "aa",
          startScheduleDate: "2016 Jun 4",
          resourceType: 0,
          companyName: "MM companyName",
          reservationScope: "Normal",
          resourceID: 2,
          permitDate: "2016 Jun 1",
          attendance: 3,
          customerName: "customer 1",
          endScheduleDay: "Tue",
          dateRangeID: 3,
          isDeleteSchedule: false,
          date_range: [
            {
              id: 3,
              name: "2016 Jun 01 to 2016 Jun 03",
              selected: true,
              parent_id: 4,
              text: "2016 Jun 01 to 2016 Jun 03",
              value: 3
            }
          ],
          endEventTime: "12:30 AM",
          scheduleTypeID: 3,
          endEventDate: "2016 Jun 7",
          permitStatus: 2,
          eventTypeId: 3,
          permitStatusDescription: "Approved",
          eventAttendace: 3,
          scheduleType: "scheduleType",
          reservationPeriodUnit: 6,
          pendingID: -1,
          rental_block: [
            {
              id: 2,
              name: "9:00 AM to 12:00 PM",
              selected: true,
              parent_id: 6
            }
          ],
          startEventDatetime: "",
          eventType: "event type 2",
          ownerPendingReceipt: true,
          isActivityIgnoreMaximum: true,
          permitID: -1,
          resourceNumber: "2",
          customerType: "customerType",
          transactionID: 36378,
          customerID: 32523,
          resourceName: "resourceName 2",
          endEventDatetime: "",
          cleanupMinutes: 30,
          reservationExpiration: "2016 Jun 4 expiration",
          endScheduleDatetiem: "2016 Jun 7 11:30 AM",
          endScheduleTime: "11:30 AM"
        }
      ],
      eventTypeID: 3,
      reservationPeriodUnit: 6,
      eventType: "event type 2",
      prepCodeID: -1,
      resourceNumber: "2",
      resourceName: "resourceName 2",
      cleanupMinutes: 0
    },
    {
      setupMinutes: 3,
      definedDateRange: [
        {
          rentalBlockID: 0,
          startEventTime: "2:00 AM",
          bookingAssignment: 0,
          reservationType: 0,
          resourceBookingID: 0,
          startEventDate: "2016 Dec 21",
          attendance: 2,
          dateRangeID: 0,
          isDeleteSchedule: false,
          endEventTime: "3:00 AM",
          endEventDate: "2016 Dec 21",
          pendingID: "pending_775_7159",
          startEventDatetime: "12/21/2016 2:00 AM",
          ownerPendingReceipt: true,
          transactionID: -1,
          endEventDatetime: "12/21/2016 3:00 AM"
        }
      ],
      resourceType: 0,
      resourceID: 1,
      rentalBlock: [],
      bookingDetail: [],
      eventTypeID: 6,
      reservationPeriodUnit: 2,
      eventType: "event type 1",
      prepCodeID: 10,
      resourceNumber: "1",
      resourceName: "resourceName 1",
      cleanupMinutes: 5
    }
  ],
  error: {
    code: null,
    clientMessages: [],
    serverMessages: [],
    conflictMessage: "4 bookings conflict.",
    entity: {
      eventName: false,
      scheduleTypeID: false,
      overrideRentalBlockTimeError: [],
      eventResource: [{
        "resourceID": 2,
        "resourceName": "kaely test equipment &amp;",
        "eventTypeID": false,
        "bookingDetail": [{
          "pendingID": "pending_775_7160",
          "resourceBookingID": 0,
          "errors": {
            "conflictType": "holiday",
            "conflictReason": "Conflict with Skip Date",
            "conflictIgnoreEnable": false,
            "conflictIgnoreType": "disable_for_conflict_permisson_and_facility_setting",
            "conflict": "Conflict with Skip Date",
            "datetime": "ANE56423 sally Facility day must be booked at least 2 day(s) in advance."
          }
        }]
      }, {
        "resourceID": 3,
        "resourceName": "resource id 3",
        "eventTypeID": false,
        "bookingDetail": [{
          "pendingID": "pending_775_7160",
          "resourceBookingID": 0,
          "errors": {
            "conflictType": "conflict",
            "conflictReason": "",
            "conflictIgnoreEnable": false,
            "conflictIgnoreType": "disable_for_conflict_permisson_and_facility_setting",
            "conflict": "normal conflict",
            "datetime": "ANE56423 sally Facility day must be booked at least 2 day(s) in advance."
          }
        }]
      }, {
        "resourceID": 4,
        "resourceName": "resource id 4",
        "eventTypeID": false,
        "bookingDetail": [{
          "pendingID": "pending_775_7160",
          "resourceBookingID": 0,
          "errors": {
            "conflictType": "closed",
            "conflictReason": "close time conflict",
            "conflictIgnoreEnable": false,
            "conflictIgnoreType": "disable_for_conflict_permisson_and_facility_setting",
            "conflict": "close time conflict",
            "datetime": "ANE56423 sally Facility day must be booked at least 2 day(s) in advance."
          }
        }]
      }, {
        "resourceID": 5,
        "resourceName": "resource id 5",
        "eventTypeID": false,
        "bookingDetail": [{
          "pendingID": "pending_775_7160",
          "resourceBookingID": 0,
          "errors": {
            "conflictType": "other",
            "conflictReason": "other conflict",
            "conflictIgnoreEnable": false,
            "conflictIgnoreType": "disable_for_conflict_permisson_and_facility_setting",
            "conflict": "other conflict",
            "datetime": "ANE56423 sally Facility day must be booked at least 2 day(s) in advance."
          }
        }]
      }, {
        "resourceID": 6,
        "resourceName": "resource id 6",
        "eventTypeID": false,
        "bookingDetail": []
      }, {
        "resourceID": 7,
        "resourceName": "resource id 7",
        "eventTypeID": false,
        "bookingDetail": [{
          "pendingID": "pending_775_7160",
          "resourceBookingID": 0,
          "errors": null
        }]
      },
      {
        "resourceID": 809,
        "resourceName": "edmund test bug",
        "eventTypeID": false,
        "bookingDetail": [{
          "pendingID": "pending_809_9948",
          "resourceBookingID": 0,
          "errors": {}
        }, {
          "pendingID": "pending_809_1206",
          "resourceBookingID": 0,
          "errors": {}
        }]
      }
      ]
    }
  },
  data: {
    permitID: -1,
    eventName: '',
    scheduleTypeID: -1,
    scheduleType: '',
    checkForWaitlistConflict: true,
    eventResource: [{
      "setupMinutes": 0,
      "isTemplate": true,
      "definedDateRange": [{
        "id": 3,
        "name": "2016 Jun 01 to 2016 Jun 03",
        "selected": false,
        "parent_id": 4,
        "text": "2016 Jun 01 to 2016 Jun 03",
        "value": 3
      }, {
        "id": 4,
        "name": "2016 Jun 16 to 2016 Jun 20",
        "selected": false,
        "parent_id": 1,
        "text": "2016 Jun 16 to 2016 Jun 20",
        "value": 4
      }],
      "resourceType": 0,
      "resourceID": 2,
      "rentalBlock": [],
      "bookingDetail": [{
        "currentEvent": true,
        "recurringExceptions": [],
        "hasRecurring": false,
        "baseBookingID": "",
        "rentalBlockID": 0,
        "recurringEnabled": false,
        "ignoreConflict": false,
        "startEventTime": "2:00 AM",
        "bookingAssignment": 0,
        "reservationType": 0,
        "resourceBookingID": 0,
        "startEventDate": "2016 Dec 21",
        "pendingRemoveFromRecurringGroup": "",
        "attendance": 2,
        "dateRangeID": 4,
        "recurringReservationGroupID": 0,
        "isDeleteSchedule": false,
        "endEventTime": "3:00 AM",
        "endEventDate": "2016 Dec 21",
        "reservationPeriodUnit": 6,
        "pendingID": "pending_775_7160",
        "isRecurring": false,
        "startEventDatetime": "12/21/2016 2:00 AM",
        "ignoreClosetime": false,
        "ownerPendingReceipt": true,
        "masterFacilityScheduleID": null,
        "transactionID": -1,
        "expanded": false,
        "endEventDatetime": "12/21/2016 3:00 AM",
        "ignoreSkipdate": false
      }],
      "eventTypeID": 36,
      "reservationPeriodUnit": 6,
      "eventType": "'South West Hub",
      "prepCodeID": -1,
      "resourceNumber": "",
      "resourceName": "kaely test equipment &amp;",
      "cleanupMinutes": 0,
      "eventTypes": [{
        "id": 35,
        "name": "deserunt et",
        "selected": false,
        "text": "deserunt et",
        "value": 35
      }, {
        "id": 36,
        "name": "incididunt irure",
        "selected": false,
        "text": "incididunt irure",
        "value": 36
      }]
    }, {
      "setupMinutes": 0,
      "isTemplate": true,
      "resourceType": 0,
      "resourceID": 3,
      "rentalBlock": [],
      "bookingDetail": [{
        "currentEvent": true,
        "recurringExceptions": [],
        "hasRecurring": false,
        "baseBookingID": "",
        "rentalBlockID": 0,
        "recurringEnabled": false,
        "ignoreConflict": false,
        "startEventTime": "2:00 AM",
        "bookingAssignment": 0,
        "reservationType": 0,
        "resourceBookingID": 0,
        "startEventDate": "2016 Dec 21",
        "pendingRemoveFromRecurringGroup": "",
        "attendance": 2,
        "dateRangeID": 4,
        "recurringReservationGroupID": 0,
        "isDeleteSchedule": false,
        "endEventTime": "3:00 AM",
        "endEventDate": "2016 Dec 21",
        "reservationPeriodUnit": 2,
        "pendingID": "pending_775_7160",
        "isRecurring": false,
        "startEventDatetime": "12/21/2016 2:00 AM",
        "ignoreClosetime": false,
        "ownerPendingReceipt": true,
        "masterFacilityScheduleID": null,
        "transactionID": -1,
        "expanded": false,
        "endEventDatetime": "12/21/2016 3:00 AM",
        "ignoreSkipdate": false
      }],
      "eventTypeID": 36,
      "reservationPeriodUnit": 6,
      "eventType": "'South West Hub",
      "prepCodeID": -1,
      "resourceNumber": "",
      "resourceName": "kaely test equipment &amp;",
      "cleanupMinutes": 0,
      "eventTypes": [{
        "id": 35,
        "name": "deserunt et",
        "selected": false,
        "text": "deserunt et",
        "value": 35
      }, {
        "id": 36,
        "name": "incididunt irure",
        "selected": false,
        "text": "incididunt irure",
        "value": 36
      }]
    }, {
      "setupMinutes": 0,
      "isTemplate": true,
      "resourceType": 0,
      "resourceID": 4,
      "rentalBlock": [],
      "bookingDetail": [{
        "currentEvent": true,
        "recurringExceptions": [],
        "hasRecurring": false,
        "baseBookingID": "",
        "rentalBlockID": 0,
        "recurringEnabled": false,
        "ignoreConflict": false,
        "startEventTime": "2:00 AM",
        "bookingAssignment": 0,
        "reservationType": 0,
        "resourceBookingID": 0,
        "startEventDate": "2016 Dec 21",
        "pendingRemoveFromRecurringGroup": "",
        "attendance": 2,
        "dateRangeID": 4,
        "recurringReservationGroupID": 0,
        "isDeleteSchedule": false,
        "endEventTime": "3:00 AM",
        "endEventDate": "2016 Dec 21",
        "reservationPeriodUnit": 2,
        "pendingID": "pending_775_7160",
        "isRecurring": false,
        "startEventDatetime": "12/21/2016 2:00 AM",
        "ignoreClosetime": false,
        "ownerPendingReceipt": true,
        "masterFacilityScheduleID": null,
        "transactionID": -1,
        "expanded": false,
        "endEventDatetime": "12/21/2016 3:00 AM",
        "ignoreSkipdate": false
      }],
      "eventTypeID": 36,
      "reservationPeriodUnit": 6,
      "eventType": "'South West Hub",
      "prepCodeID": -1,
      "resourceNumber": "",
      "resourceName": "kaely test equipment &amp;",
      "cleanupMinutes": 0,
      "eventTypes": [{
        "id": 35,
        "name": "deserunt et",
        "selected": false,
        "text": "deserunt et",
        "value": 35
      }, {
        "id": 36,
        "name": "incididunt irure",
        "selected": false,
        "text": "incididunt irure",
        "value": 36
      }]
    }, {
      "setupMinutes": 0,
      "isTemplate": true,
      "resourceType": 0,
      "resourceID": 5,
      "rentalBlock": [],
      "bookingDetail": [{
        "currentEvent": true,
        "recurringExceptions": [],
        "hasRecurring": false,
        "baseBookingID": "",
        "rentalBlockID": 0,
        "recurringEnabled": false,
        "ignoreConflict": false,
        "startEventTime": "2:00 AM",
        "bookingAssignment": 0,
        "reservationType": 0,
        "resourceBookingID": 0,
        "startEventDate": "2016 Dec 21",
        "pendingRemoveFromRecurringGroup": "",
        "attendance": 2,
        "dateRangeID": 4,
        "recurringReservationGroupID": 0,
        "isDeleteSchedule": false,
        "endEventTime": "3:00 AM",
        "endEventDate": "2016 Dec 21",
        "reservationPeriodUnit": 2,
        "pendingID": "pending_775_7160",
        "isRecurring": false,
        "startEventDatetime": "12/21/2016 2:00 AM",
        "ignoreClosetime": false,
        "ownerPendingReceipt": true,
        "masterFacilityScheduleID": null,
        "transactionID": -1,
        "expanded": false,
        "endEventDatetime": "12/21/2016 3:00 AM",
        "ignoreSkipdate": false
      }],
      "eventTypeID": 36,
      "reservationPeriodUnit": 6,
      "eventType": "'South West Hub",
      "prepCodeID": -1,
      "resourceNumber": "",
      "resourceName": "kaely test equipment &amp;",
      "cleanupMinutes": 0,
      "eventTypes": [{
        "id": 35,
        "name": "deserunt et",
        "selected": false,
        "text": "deserunt et",
        "value": 35
      }, {
        "id": 36,
        "name": "incididunt irure",
        "selected": false,
        "text": "incididunt irure",
        "value": 36
      }]
    }, {
      "setupMinutes": 0,
      "isTemplate": true,
      "resourceType": 0,
      "resourceID": 6,
      "rentalBlock": [],
      "bookingDetail": [{
        "currentEvent": true,
        "recurringExceptions": [],
        "hasRecurring": false,
        "baseBookingID": "",
        "rentalBlockID": 0,
        "recurringEnabled": false,
        "ignoreConflict": false,
        "startEventTime": "2:00 AM",
        "bookingAssignment": 0,
        "reservationType": 0,
        "resourceBookingID": 0,
        "startEventDate": "2016 Dec 21",
        "pendingRemoveFromRecurringGroup": "",
        "attendance": 2,
        "dateRangeID": 4,
        "recurringReservationGroupID": 0,
        "isDeleteSchedule": false,
        "endEventTime": "3:00 AM",
        "endEventDate": "2016 Dec 21",
        "reservationPeriodUnit": 2,
        "pendingID": "pending_775_7160",
        "isRecurring": false,
        "startEventDatetime": "12/21/2016 2:00 AM",
        "ignoreClosetime": false,
        "ownerPendingReceipt": true,
        "masterFacilityScheduleID": null,
        "transactionID": -1,
        "expanded": false,
        "endEventDatetime": "12/21/2016 3:00 AM",
        "ignoreSkipdate": false
      }],
      "eventTypeID": 36,
      "reservationPeriodUnit": 6,
      "eventType": "'South West Hub",
      "prepCodeID": -1,
      "resourceNumber": "",
      "resourceName": "kaely test equipment &amp;",
      "cleanupMinutes": 0,
      "eventTypes": [{
        "id": 35,
        "name": "deserunt et",
        "selected": false,
        "text": "deserunt et",
        "value": 35
      }, {
        "id": 36,
        "name": "incididunt irure",
        "selected": false,
        "text": "incididunt irure",
        "value": 36
      }]
    }, {
      "setupMinutes": 0,
      "isTemplate": true,
      "resourceType": 0,
      "resourceID": 7,
      "rentalBlock": [],
      "bookingDetail": [{
        "currentEvent": true,
        "recurringExceptions": [],
        "hasRecurring": false,
        "baseBookingID": "",
        "rentalBlockID": 0,
        "recurringEnabled": false,
        "ignoreConflict": false,
        "startEventTime": "2:00 AM",
        "bookingAssignment": 0,
        "reservationType": 0,
        "resourceBookingID": 0,
        "startEventDate": "2016 Dec 21",
        "pendingRemoveFromRecurringGroup": "",
        "attendance": 2,
        "dateRangeID": 4,
        "recurringReservationGroupID": 0,
        "isDeleteSchedule": false,
        "endEventTime": "3:00 AM",
        "endEventDate": "2016 Dec 21",
        "reservationPeriodUnit": 2,
        "pendingID": "pending_775_7160",
        "isRecurring": false,
        "startEventDatetime": "12/21/2016 2:00 AM",
        "ignoreClosetime": false,
        "ownerPendingReceipt": true,
        "masterFacilityScheduleID": null,
        "transactionID": -1,
        "expanded": false,
        "endEventDatetime": "12/21/2016 3:00 AM",
        "ignoreSkipdate": false
      }],
      "eventTypeID": 36,
      "reservationPeriodUnit": 6,
      "eventType": "'South West Hub",
      "prepCodeID": -1,
      "resourceNumber": "",
      "resourceName": "kaely test equipment &amp;",
      "cleanupMinutes": 0,
      "eventTypes": [{
        "id": 35,
        "name": "deserunt et",
        "selected": false,
        "text": "deserunt et",
        "value": 35
      }, {
        "id": 36,
        "name": "incididunt irure",
        "selected": false,
        "text": "incididunt irure",
        "value": 36
      }]
    }]
  },
  isBookingChanged: false,
  backFromPermitDetailPage: false,
  display: false,
  templateState: 'has_template'
};

export default hasConflictErrBookingInfo;
