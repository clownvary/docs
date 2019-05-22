import moment from 'moment';

const resourceBookingInfo = {
  height: 100,
  start_date: moment().format(),
  resourceIds: [1, 2, 3, 4],
  resourceInfo: [
    { id: 1, name: 'Resource A', resourceID: 1 },
    { id: 2, name: 'Resource B', resourceID: 2 },
    { id: 3, name: 'Resource C', resourceID: 3 },
    { id: 4, name: 'Resource D', resourceID: 4 }
  ],
  bookingInfo: [
    {bookingAssignment: 0, permitID: -1, currentEvent: true, ownerPendingReceipt: false},
    {bookingAssignment: 0, permitID: -1, currentEvent: true, ownerPendingReceipt: true},
    {bookingAssignment: 0, permitID: -1, currentEvent: false, ownerPendingReceipt: false},
    {bookingAssignment: 0, permitID: -1, currentEvent: false, ownerPendingReceipt: true},
    {bookingAssignment: 0, permitID: 1, currentEvent: true, ownerPendingReceipt: false},
    {bookingAssignment: 0, permitID: 1, currentEvent: true, ownerPendingReceipt: true},
    {bookingAssignment: 0, permitID: 1, currentEvent: false, ownerPendingReceipt: false},
    {bookingAssignment: 0, permitID: 1, currentEvent: false, ownerPendingReceipt: true},
    {bookingAssignment: 0, permitID: -1, currentEvent: true, ownerPendingReceipt: false},
    {bookingAssignment: 0, permitID: -1, currentEvent: true, ownerPendingReceipt: true},
    {bookingAssignment: 1, permitID: -1, currentEvent: false, ownerPendingReceipt: false},
    {bookingAssignment: 1, permitID: -1, currentEvent: false, ownerPendingReceipt: true},
    {bookingAssignment: 1, permitID: 1, currentEvent: true, ownerPendingReceipt: false},
    {bookingAssignment: 1, permitID: 1, currentEvent: true, ownerPendingReceipt: true},
    {bookingAssignment: 1, permitID: 1, currentEvent: false, ownerPendingReceipt: false},
    {bookingAssignment: 1, permitID: 1, currentEvent: false, ownerPendingReceipt: true},
    {bookingAssignment: 1, permitID: -1, currentEvent: true, ownerPendingReceipt: false},
    {bookingAssignment: 1, permitID: -1, currentEvent: true, ownerPendingReceipt: true},
    {bookingAssignment: 1, permitID: -1, currentEvent: false, ownerPendingReceipt: false},
    {bookingAssignment: 1, permitID: -1, currentEvent: false, ownerPendingReceipt: true}
  ],
  bookingList: {
    resourceInfo: [
      {name: 'Resource A', resourceID: 1 },
      {name: 'Resource B', resourceID: 2 },
      {name: 'Resource C', resourceID: 3 },
      {name: 'Resource D', resourceID: 4 }
    ],
    bookingInfo: [
      {
        resourceBookingID: 1,
        startScheduleDate: '2017 Sep 20',
        startScheduleTime: '11:00 AM',
        endScheduleDate: '2017 Sep 20',
        endScheduleTime: '5:00 PM'
      },
      {
        resourceBookingID: 2,
        startScheduleDate: '2017 Sep 20',
        startScheduleTime: '11:00 AM',
        endScheduleDate: '2017 Sep 20',
        endScheduleTime: '5:00 PM'
      },
      {
        resourceBookingID: 3,
        startScheduleDate: '2017 Sep 20',
        startScheduleTime: '11:00 AM',
        endScheduleDate: '2017 Sep 20',
        endScheduleTime: '5:00 PM'
      }
    ]
  }
};

export default resourceBookingInfo;
