export function getFilters(filters) {
  const searchType = filters.getIn(['searchData', 'type']);
  const searchValue = filters.getIn(['searchData', 'value']);
  return {
    centers: filters.getIn(['centers', 'selected']).toJS(),
    facilityTypes: filters.getIn(['facilityTypes', 'selected']).toJS(),
    eventTypes: filters.getIn(['eventTypes', 'selected']).toJS(),
    status: filters.getIn(['status', 'selected']).toJS(),
    startDate: filters.get('startDate'),
    endDate: filters.get('endDate'),
    [searchType]: searchValue,
    created_by_me: filters.get('createdByMe')
  };
}

export function getParams(filters, sort) {
  /* istanbul ignore next */
  const {
    centers = [],
    facilityTypes = [],
    eventTypes = [],
    status = [],
    startDate,
    endDate,
    ...rest
  } = filters;

  const _sort = sort || {
    pageNumber: 1,
    orderOption: '',
    orderBy: ''
  };

  const headers = {
    page_info: {
      page_number: _sort.pageNumber,
      order_option: _sort.orderOption,
      order_by: _sort.orderBy
    }
  };

  const body = {
    ...rest,
    center_ids: centers.join(','),
    facility_type_ids: facilityTypes.join(','),
    event_type_ids: eventTypes.join(','),
    status_ids: status.join(','),
    permit_start_date: startDate,
    permit_end_date: endDate
  };

  return {
    headers,
    body
  };
}
