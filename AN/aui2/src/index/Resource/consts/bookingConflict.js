export const conflictIgnoreType = {
  NOT_SHOW_IGNORE: 'not_show_ignore',
  ENABLE_IGNORE: 'enable_ignore',
  DISABLE_FOR_CLOSETIME_PERMISSON: 'disable_for_closetime_permisson',
  DISABLE_FOR_CONFLICT_PERMISSON: 'disable_for_conflict_permisson',
  DISABLE_FOR_FACILITY_SETTING: 'disable_for_facility_setting',
  DISABLE_FOR_SETTING: 'disable_for_conflict_permisson_and_facility_setting'
};

// Hide temporarily unused error-event-type
export const bookingAPIErrorType = {
  // AVALIABLE: 'avalilable',
  // INVALID: 'invalid', // invalid and include some uncategorized error
  // RESTRICTED: 'restricted',
  // DAMAGED: 'damaged', // equipment is damaged
  // LOST: 'lost', // equipment is lost
  // OUT: 'out', // equipment is checked out
  // RETIRED: 'retired', // equipment is retired
  // UNIT_NOT_MATCH: 'unit_not_match', // duration must be reserved by
  // DST_INVALID: 'dst_invalid',
  INVALID_EVENT_TYPE: 'invalid_event_type', // event type is invalid
  MISSING_QTY: 'missing_qty', // qty is not specify
  TOO_LESS: 'too_less', // qty too less
  TOO_MANY: 'too_many', // qty too many
  EVENT_CAPACITY_TOO_LESS: 'too_less_facility_event', // qty too less because of event type
  EVENT_CAPACITY_TOO_MANY: 'too_many_facility_event', // qty too many because of event type
  INVALID_RENTAL_BLOCK: 'invalid_rental_block',
  CONFLICT: 'conflict', // conflict with other bookings
  CLOSED: 'closed', // close time
  SKIP_DATE: 'holiday', // skip date,
  BELOW_ADVANCE_MINIMUM: 'below_advance_minimum', // less than minimum booking time in advance
  OVER_ADVANCE_MAXIMUM: 'over_advance_maximum', // more than maximum booking time in advance
  OVER_MAXIMUM: 'over_maximum' // more than max reservation time
};
