const PREFIX = 'reservation-';

const filters = {
  wrapper: `${PREFIX}filter-wrapper`,
  center: `${PREFIX}filter-center`,
  facilityType: `${PREFIX}filter-facilityType`,
  eventType: `${PREFIX}filter-eventType`,
  status: `${PREFIX}filter-status`,
  eventDate: `${PREFIX}filter-eventDate`,
  eventDateStart: `${PREFIX}filter-eventDateStart`,
  eventDateEnd: `${PREFIX}filter-eventDateEnd`
};

const search = {
  permitNumber: `${PREFIX}search-permitNumber`
};

export default {
  filters,
  search
};
