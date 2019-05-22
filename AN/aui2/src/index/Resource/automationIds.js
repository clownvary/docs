const PREFIX = 'resource-';

const filters = {
  wrapper: `${PREFIX}filter-wrapper`,
  center: `${PREFIX}filter-center`,
  resourceType: `${PREFIX}filter-resourceType`,
  facilityType: `${PREFIX}filter-facilityType`,
  eventType: `${PREFIX}filter-eventType`,
  resource: `${PREFIX}filter-resource`
};

const calendar = {
  booking: `${PREFIX}calendar-booking`
};

const information = {
  eventName: `${PREFIX}information-eventName`,
  scheduleType: `${PREFIX}information-scheduleType`,
  eventType: `${PREFIX}information-eventType`,
  prepCode: `${PREFIX}information-prepCode`,
  setup: `${PREFIX}information-setup`,
  cleanup: `${PREFIX}information-cleanup`,
  startDate: `${PREFIX}information-startDate`,
  startTime: `${PREFIX}information-startTime`,
  endDate: `${PREFIX}information-endDate`,
  endTime: `${PREFIX}information-endTime`,
  attendee: `${PREFIX}information-attendee`,
  rentalBlock: `${PREFIX}information-rentalBlock`,
  dateRange: `${PREFIX}information-dateRange`
};
const recurringPatternModal = {
  recur: `${PREFIX}recurringPatternModal-recur`,
  daysRecur: `${PREFIX}recurringPatternModal-daysRecur`,
  after: `${PREFIX}recurringPatternModal-after`,
  byDate: `${PREFIX}recurringPatternModal-byDate`,
  recurrence: `${PREFIX}recurringPatternModal-recurrence`,
  date: `${PREFIX}recurringPatternModal-date`
};

export default {
  filters,
  calendar,
  information,
  recurringPatternModal
};
