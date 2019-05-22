import normalizeData from 'shared/utils/normalizeData';
import URL from '../urls';

export const CONFIGURATION_UPDATE_SCHEDULETYPES = 'CONFIGURATION_UPDATE_SCHEDULETYPES';
export const CONFIGURATION_UPDATE_PREPCODES = 'CONFIGURATION_UPDATE_PREPCODES';
export const CONFIGURATION_UPDATE_CLEANUPS = 'CONFIGURATION_UPDATE_CLEANUPS';
export const CONFIGURATION_UPDATE_SETUPS = 'CONFIGURATION_UPDATE_SETUPS';
export const CONFIGURATION_UPDATE_RESOURCEMAP = 'CONFIGURATION_UPDATE_RESOURCEMAP';
export const CONFIGURATION_UPDATE_RENTALBLOCKMAP = 'CONFIGURATION_UPDATE_RENTALBLOCKMAP';
export const CONFIGURATION_UPDATE_DATERANGEMAP = 'CONFIGURATION_UPDATE_DATERANGEMAP';
export const CONFIGURATION_UPDATE_RESOURCE_EVENTTYPES = 'CONFIGURATION_UPDATE_RESOURCE_EVENTTYPES';

const fetchScheduleTypes = () => ({
  types: ['', '', ''],
  promise: api => api.get(URL.scheduleTypes, {
    body: {
      event_type_id: 0
    }
  })
});

export const fetchScheduleTypesAsyncAction = () =>
  dispatch => dispatch(fetchScheduleTypes())
    .then(
      ({ payload: { body: { items } } }) => dispatch({
        type: CONFIGURATION_UPDATE_SCHEDULETYPES,
        payload: {
          scheduleTypes: normalizeData(items).data
        }
      }),
      error => Promise.reject(error)
    );


export const fetchPrepCodeAsyncAction = params => ({
  types: ['', '', ''],
  promise: api => api.get(URL.prepCode, {
    body: {
      ...params
    }
  })
});

export const fetchAndSetPrepCodeAsyncAction = (params = { event_type_id: 0 }) =>
  dispatch => dispatch(fetchPrepCodeAsyncAction(params))
    .then(
      ({ payload: { body: { items } } }) => dispatch({
        type: CONFIGURATION_UPDATE_PREPCODES,
        payload: {
          prepCodes: normalizeData(items).data
        }
      }),
      error => Promise.reject(error)
    );

const fetchSetupCleanUp = () => ({
  types: ['', '', ''],
  promise: api => api.get(URL.setUpCleanUp)
});


export const fetchSetupCleanUpAsyncAction = () =>
  dispatch => dispatch(fetchSetupCleanUp())
    .then(
      ({ payload: { body: { items } } }) => {
        const setupCleanups = normalizeData(items).data;

        dispatch({
          type: CONFIGURATION_UPDATE_SETUPS,
          payload: {
            setUps: setupCleanups
          }
        });

        dispatch({
          type: CONFIGURATION_UPDATE_CLEANUPS,
          payload: {
            cleanUps: setupCleanups
          }
        });
      },
      error => Promise.reject(error)
    );


const fetchRentalBlockAsyncAction = resourceIds => ({
  types: ['', '', ''],
  promise: API => API.get(URL.rentalBlock, {
    body: {
      resource_ids: resourceIds.join(',')
    }
  })
});

export const fetchAndSetRentalBlockAsyncAction = resourceIds =>
  dispatch => dispatch(fetchRentalBlockAsyncAction(resourceIds))
    .then(
      ({ payload: { body } }) => {
        dispatch({
          type: CONFIGURATION_UPDATE_RENTALBLOCKMAP,
          payload: {
            rentalBlocks: body.items,
            resourceIds
          }
        });
      },
      err => Promise.reject(err)
    );

const fetchDateRangeAsyncAction = resourceIds => ({
  types: ['', '', ''],
  promise: API => API.get(URL.definedDateRange, {
    body: {
      resource_ids: resourceIds.join(',')
    }
  })
});

export const fetchAndSetDateRangeAsyncAction = resourceIds =>
  dispatch => dispatch(fetchDateRangeAsyncAction(resourceIds))
    .then(
      ({ payload: { body } }) => {
        dispatch({
          type: CONFIGURATION_UPDATE_DATERANGEMAP,
          payload: {
            dateRanges: body.items,
            resourceIds
          }
        });
      },
      err => Promise.reject(err)
    );


export const fetchRentalBlockAndDateRangeByResourceIdsAsyncAction = (
  resourceIdsForDateRanges, resourceIdsForRentalBlocks) =>
    (dispatch) => {
      const promiseList = [];

      if (resourceIdsForDateRanges.length) {
        promiseList.push(dispatch(fetchAndSetDateRangeAsyncAction(resourceIdsForDateRanges)));
      }

      if (resourceIdsForRentalBlocks.length) {
        promiseList.push(dispatch(fetchAndSetRentalBlockAsyncAction(resourceIdsForRentalBlocks)));
      }

      return Promise.all(promiseList);
    };

export const setResourceMap = (resourceList) => {
  const resourceMap = {};

  resourceList.map((resource) => {
    const resourceID = resource.resourceID;
    resource.id = resourceID;

    if (!resource.closedTimes) {
      resource.closedTimes = [];
    }

    if (!resource.resourceSkipDate) {
      resource.resourceSkipDate = [];
    }
    resourceMap[resource.resourceID] = resource;
    return resource;
  });

  return resourceMap;
};

export const configurationResetResourceMapAction = resourceMap => ({
  type: CONFIGURATION_UPDATE_RESOURCEMAP,
  payload: {
    resourceMap
  }
});

const fetchEventTypes = resourceIDs => ({
  types: ['', '', ''],
  promise: api => api.get(URL.eventTypes, {
    body: {
      resource_ids: resourceIDs.join(',')
    }
  })
});

const getResourceEventTypes = (eventTypes, resourceIDs) => {
  const resourceEventTypes = {};

  eventTypes.forEach((eventType) => {
    const availableResources = eventType.available_resources;
    delete eventType.available_resources;

    availableResources.length && availableResources.forEach((resourceID) => {
      if (!resourceEventTypes[resourceID]) {
        resourceEventTypes[resourceID] = [];
      }
      resourceEventTypes[resourceID].push(eventType);
    });
  });

  // If the resource has no event type list then need set the event type to []
  resourceIDs.forEach((resourceID) => {
    if (!resourceEventTypes[resourceID]) {
      resourceEventTypes[resourceID] = [];
    }
  });
  return resourceEventTypes;
};

export const fetchEventTypesAsyncAction = resourceIDs =>
  dispatch => dispatch(fetchEventTypes(resourceIDs))
    .then(({ payload: { body } }) => {
      const eventTypes = body.items;
      const resourceEventTypesMap = getResourceEventTypes(eventTypes, resourceIDs);
      dispatch({
        type: CONFIGURATION_UPDATE_RESOURCE_EVENTTYPES,
        payload: {
          resourceEventTypesMap
        }
      });
    });

