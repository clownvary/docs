import bookingInfoMergeConfictError from 'index/Resource/utils/bookingInfoMergeConfictError';

const previousEventResource = [{
  resourceID: 809,
  resourceName: 'edmund test bug',
  eventTypeID: false,
  bookingDetail: [{
    pendingID: 'pending_809_3078',
    resourceBookingID: 0,
    errors: {
      conflictType: 'holiday',
      conflictReason: 'Conflict with Skip Date:\ntest book con (From 2018 Jan 30 to 2018 Jan 31).\n',
      conflictIgnoreEnable: true,
      conflictIgnoreType: 'enable_ignore',
      conflict: false
    }
  }, {
    pendingID: 'pending_809_8218',
    resourceBookingID: 0,
    errors: {
      conflictType: 'conflict',
      conflictReason: 'Conflict with Permit #1209 - Event: \'test booking confict\' From 2018 Jan 31 12:00 AM to 2018 Jan 31 1:00 AM\nConflict with Permit #1209 - Event: \'test\' From 2018 Jan 31 12:15 AM to 2018 Jan 31 1:00 AM\n',
      conflictIgnoreEnable: true,
      conflictIgnoreType: 'enable_ignore',
      conflict: false
    }
  }, {
    pendingID: 'pending_809_2531',
    resourceBookingID: 0,
    errors: {
      conflictType: 'closed',
      conflictReason: 'Conflict with resource closed time:\n2018 Jan 31 from 12:00 PM to 12:00 AM.\n',
      conflictIgnoreEnable: true,
      conflictIgnoreType: 'enable_ignore',
      conflict: false
    }
  }, {
    pendingID: 'pending_809_5168',
    resourceBookingID: 0,
    errors: {
      conflictType: 'closed',
      conflictReason: 'Conflict with resource closed time:\n2018 Feb 1 from 12:00 PM to 12:00 AM.\n',
      conflictIgnoreEnable: true,
      conflictIgnoreType: 'enable_ignore',
      conflict: false
    }
  }]
}];

const entity = {
  eventName: false,
  scheduleTypeID: false,
  eventResource: [{
    resourceID: 809,
    resourceName: 'edmund test bug',
    eventTypeID: false,
    bookingDetail: [{
      pendingID: 'pending_809_3078',
      resourceBookingID: 0,
      errors: {}
    }, {
      pendingID: 'pending_809_8218',
      resourceBookingID: 0,
      errors: {}
    }, {
      pendingID: 'pending_809_2531',
      resourceBookingID: 0,
      errors: {}
    }, {
      pendingID: 'pending_809_5168',
      resourceBookingID: 0,
      errors: {}
    }]
  }]
};

const newEntity = {
  eventName: false,
  scheduleTypeID: false,
  eventResource: [{
    resourceID: 809,
    resourceName: 'edmund test bug',
    eventTypeID: false,
    bookingDetail: [{
      pendingID: 'pending_809_3078',
      resourceBookingID: 0,
      errors: {
        conflictType: 'holiday',
        conflictReason: 'Conflict with Skip Date:\ntest book con (From 2018 Jan 30 to 2018 Jan 31).\n',
        conflictIgnoreEnable: true,
        conflictIgnoreType: 'enable_ignore',
        conflict: false
      }
    }, {
      pendingID: 'pending_809_8218',
      resourceBookingID: 0,
      errors: {
        conflictType: 'conflict',
        conflictReason: 'Conflict with Permit #1209 - Event: \'test booking confict\' From 2018 Jan 31 12:00 AM to 2018 Jan 31 1:00 AM\nConflict with Permit #1209 - Event: \'test\' From 2018 Jan 31 12:15 AM to 2018 Jan 31 1:00 AM\n',
        conflictIgnoreEnable: true,
        conflictIgnoreType: 'enable_ignore',
        conflict: false
      }
    }, {
      pendingID: 'pending_809_2531',
      resourceBookingID: 0,
      errors: {
        conflictType: 'closed',
        conflictReason: 'Conflict with resource closed time:\n2018 Jan 31 from 12:00 PM to 12:00 AM.\n',
        conflictIgnoreEnable: true,
        conflictIgnoreType: 'enable_ignore',
        conflict: false
      }
    }, {
      pendingID: 'pending_809_5168',
      resourceBookingID: 0,
      errors: {
        conflictType: 'closed',
        conflictReason: 'Conflict with resource closed time:\n2018 Feb 1 from 12:00 PM to 12:00 AM.\n',
        conflictIgnoreEnable: true,
        conflictIgnoreType: 'enable_ignore',
        conflict: false
      }
    }]
  }]
};

describe('index -> Resource -> utils -> bookingInfoMergeConfictError', () => {
  it('bookingInfoMergeConfictError', () => {
    expect(bookingInfoMergeConfictError(previousEventResource, entity)).toEqual(newEntity);
  });
});
