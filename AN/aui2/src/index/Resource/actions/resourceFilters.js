import { isArrEqual } from 'shared/utils/func';
import { APICache } from 'react-base-ui/lib/services/cache';
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import URL from '../urls';
import { setQuickViewNameAction, selectQuickViewAsyncAction, setQuickViewAsyncAction } from './quickView';
import { bookingPanelUpdateLoadedResources } from './bookingPanel';
// centers
export const FETCH_CENTERS_SUCCESS = 'FETCH_CENTERS_SUCCESS';
export const LOAD_RESOURCES_SUCCESS = 'LOAD_RESOURCES_SUCCESS';
export const FETCH_CENTERS_FAILURE = 'FETCH_CENTERS_FAILURE';
export const SET_CENTER = 'SET_CENTER';
export const CLEAR_ERRMSG = 'CLEAR_ERRMSG';

// eventType
export const FETCH_EVENT_TYPE_SUCCESS = 'FETCH_EVENTTYPE_SUCCESS';
export const FETCH_EVENT_TYPE_FAILURE = 'FETCH_EVENTTYPE_FAILURE';
export const SET_EVENT_TYPE = 'SET_EVENT_TYPE';

// resourceType
export const FETCH_RESOURCE_TYPE_SUCCESS = 'FETCH_RESOURCETYPE_SUCCESS';
export const FETCH_RESOURCE_TYPE_FAILURE = 'FETCH_RESOURCETYPE_FAILURE';
export const SET_RESOURCE_TYPE = 'SET_RESOURCE_TYPE';

// facilityTypes
export const FETCH_FACILITY_TYPE_SUCCESS = 'FETCH_FACILITY_TYPE_SUCCESS';
export const FETCH_FACILITY_TYPE_FAILURE = 'FETCH_FACILITY_TYPE_FAILURE';
export const SET_FACILITY_TYPE = 'SET_FACILITY_TYPE';

// resources
export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const FETCH_RESOURCES_SUCCESS = 'FETCH_RESOURCES_SUCCESS';
export const FETCH_RESOURCES_FAILURE = 'FETCH_RESOURCES_FAILURE';
export const CHANGE_RESOURCES_ERR_MESSAGE = 'CHANGE_RESOURCES_ERR_MESSAGE';
export const LOAD_RESOURCES = 'LOAD_RESOURCES';
export const SET_FETCH_RESOURCES = 'SET_FETCH_RESOURCES';
export const SET_SELECTED_RESOURCES = 'SET_SELECTED_RESOURCES';
export const RESOURCEFILTERS_UPDATE_RESOURCES_LIST_EXPAND_STATUS = 'RESOURCEFILTERS_UPDATE_RESOURCES_LIST_EXPAND_STATUS';

export const resourcesCache = new APICache();

/* ============================== Centers ============================================ */
export function fetchCenters(sites, centers) {
  return {
    types: ['', FETCH_CENTERS_SUCCESS, FETCH_CENTERS_FAILURE],
    promise: API => API.get(URL.centers, {
      body: {
        site_ids: sites && sites.length ? sites.join(',') : 0,
        selected_center_ids: centers && centers.length ? centers.join(',') : 0
      }
    })
  };
}

export function setCenter(value, errMsg) {
  return {
    type: SET_CENTER,
    payload: {
      value,
      errMsg
    }
  };
}

export function clearErrMsg() {
  return {
    type: CLEAR_ERRMSG
  };
}

/* ============================== EventTypes ============================================ */
export function fetchEventTypes() {
  return {
    types: ['', FETCH_EVENT_TYPE_SUCCESS, FETCH_EVENT_TYPE_FAILURE],
    promise: API => API.get(URL.eventTypes)
  };
}

export function setEventTypes({ value }) {
  return {
    type: SET_EVENT_TYPE,
    payload: {
      value
    }
  };
}

/* ============================== ResourceTypes ============================================ */
export function fetchResourceTypes() {
  return {
    types: ['', FETCH_RESOURCE_TYPE_SUCCESS, FETCH_RESOURCE_TYPE_FAILURE],
    promise: API => API.get(URL.resourceTypes)
  };
}

export function setResourceTypes({ value }) {
  return {
    type: SET_RESOURCE_TYPE,
    payload: {
      value
    }
  };
}

/* =============================== FacilityTypes =========================================== */
export function fetchFacilityTypes() {
  return {
    types: ['', FETCH_FACILITY_TYPE_SUCCESS, FETCH_FACILITY_TYPE_FAILURE],
    promise: API => API.get(URL.facilityTypes)
  };
}

export function setFacilityTypes({ value }) {
  return {
    type: SET_FACILITY_TYPE,
    payload: {
      value
    }
  };
}

/* ============================== Resource ============================================ */

export function setSelectedResource(value) {
  return {
    type: SET_SELECTED_RESOURCES,
    payload: {
      value
    }
  };
}

export function _fetchResource(params) {
  return {
    types: [FETCH_RESOURCES, FETCH_RESOURCES_SUCCESS, FETCH_RESOURCES_FAILURE],
    promise: API => API.get(URL.bookableResources, {
      headers: {
        page_info: null
      },
      body: {
        ...params
      }
    }),
    meta: {
      ignoreLoadingbar: true
    }
  };
}

export function _fetchSelectedResources(params) {
  return {
    types: ['', '', ''],
    promise: API => API.get(URL.selectedResources, {
      headers: {
        page_info: null
      },
      body: {
        ...params
      }
    }),
    meta: {
      ignoreLoadingbar: true
    }
  };
}

export function fetchResource(params) {
  return dispatch => dispatch(_fetchResource(params));
}

export const fetchSelectedResources = params =>
  (dispatch, getState) => dispatch(_fetchSelectedResources(params))
    .then(
      ({ payload }) => {
        const quickView = getState().quickView;
        const data = quickView.get('data').toJS();
        const selectedView = quickView.get('selectedView');
        let resourceIds = payload.body.selectedItems;
        if (selectedView !== -1) {
          const result = find(data, item => item.value === selectedView);
          resourceIds = result.resource_ids;
        }
        return dispatch(setSelectedResource(resourceIds));
      },
      err => Promise.reject(err)
    );

export const changeResourceErrMsg = errMsg => ({
  type: CHANGE_RESOURCES_ERR_MESSAGE,
  payload: {
    errMsg
  }
});

export const restoreDefault = value => (dispatch, getState) => {
  const quickView = getState().quickView;
  const data = quickView.get('data').toJS();
  const selectedView = quickView.get('selectedView');
  const result = find(data, item => item.value === selectedView);
  const resourceIds = (result && result.resource_ids) || [];

  if (!isArrEqual(resourceIds, value)) {
    dispatch(setQuickViewNameAction({ value: -1 }));
    return dispatch(selectQuickViewAsyncAction(-1));
  }

  return null;
};

export function loadResource(params, pageNumber) {
  return {
    types: [LOAD_RESOURCES, LOAD_RESOURCES_SUCCESS, FETCH_RESOURCES_FAILURE],
    promise: () => resourcesCache.getPageByReq({
      headers: {
        page_info: {
          page_number: pageNumber
        }
      } }),
    meta: {
      ignoreLoadingbar: true
    }
  };
}

export function ajaxLoadResource(params, pageNumber) {
  if (!isNil(params.facility_name)) {
    const filter = (params.facility_name || '').toLowerCase();

    if (filter) {
      resourcesCache.filter(o => (o.text || '').toLowerCase().indexOf(filter) >= 0);
    } else {
      resourcesCache.clearFilter();
    }
    pageNumber = 1;
  }

  return dispatch => dispatch(loadResource(params, pageNumber));
}

export function setFetchResource(status) {
  return {
    type: SET_FETCH_RESOURCES,
    payload: {
      status
    }
  };
}

export function changeCenter(params) {
  return fetchResource(params);
}

export function changeEventTypes(params) {
  return fetchResource(params);
}

export function changeResourceTypes(params) {
  return fetchResource(params);
}

export function changeFacilityTypes(params) {
  return fetchResource(params);
}

export function saveFilters(resourceIDs) {
  return (dispatch, getState) => {
    const { resourceFilter, initialData } = getState();
    const {
      centers,
      eventTypes,
      resourceTypes,
      facilityTypes,
      resources
    } = resourceFilter;
    const {
      permitID,
      eventID,
      batchID,
      receiptID,
      receiptEntryID
    } = initialData;

    const params = {
      site_ids: '',
      center_ids: centers.toJS().selected.join(','),
      event_type_ids: eventTypes.toJS().selected.join(','),
      resource_type_ids: resourceTypes.toJS().selected.join(','),
      facility_type_ids: facilityTypes.toJS().selected.join(','),
      resource_ids: resourceIDs ? resourceIDs.join(',') : resources.toJS().selected.join(','),
      permit_id: permitID,
      event_id: eventID,
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: receiptEntryID
    };

    return dispatch({
      types: ['', '', ''],
      promise: API => API.post(URL.saveFilters, {
        body: {
          ...params
        }
      })
    });
  };
}

export function clearFilter(params) {
  return (dispatch) => {
    const value = [];
    return Promise.all([
      dispatch(setCenter(value, '')),
      dispatch(setEventTypes({ value })),
      dispatch(setFacilityTypes({ value })),
      dispatch(setResourceTypes({ value })),
      dispatch(setSelectedResource(value)),
      dispatch(bookingPanelUpdateLoadedResources(value)),
      dispatch(changeResourceErrMsg('')),
      dispatch(setQuickViewAsyncAction(-1))
    ]).then(() => dispatch(saveFilters()).then(() => dispatch(fetchResource(params))));
  };
}

export const isResourceListOpenedAction = flag => ({
  type: RESOURCEFILTERS_UPDATE_RESOURCES_LIST_EXPAND_STATUS,
  payload: {
    isResourcesExpanded: flag
  }
});
