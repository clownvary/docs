import URL from '../urls';

export const SAVE_FILTERS = 'SAVE_FILTERS';
export const SAVE_FILTERS_SUCCESS = 'SAVE_FILTERS_SUCCESS';
export const SAVE_FILTERS_FAILURE = 'SAVE_FILTERS_FAILURE';

export function saveFilters() {
  return (dispatch, getState) => {
    const filters = getState().filters.toJS();

    const savedFilter = {
      center_ids: filters.centers.selected.join(','),
      facility_type_ids: filters.facilityTypes.selected.join(','),
      event_type_ids: filters.eventTypes.selected.join(','),
      status_ids: filters.status.selected.join(',')
    };
    return dispatch({
      types: [SAVE_FILTERS, SAVE_FILTERS_SUCCESS, SAVE_FILTERS_FAILURE],
      promise: API => API.post(URL.savePermitFilters, {
        body: {
          ...savedFilter
        }
      })
    });
  };
}
