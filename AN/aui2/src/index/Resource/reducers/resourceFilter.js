import { combineReducers } from 'redux';

import getCentersReducer from './filters/centers';
import getFacilityTypesReducer from './filters/facilityTypes';
import getEventTypesReducer from './filters/eventTypes';
import getResourceTypesReducer from './filters/resourceTypes';
import getResourcesReducer from './filters/resources';

export default function getResourceFilterReducer(initData) {
  return combineReducers({
    centers: getCentersReducer(initData),
    facilityTypes: getFacilityTypesReducer(initData),
    eventTypes: getEventTypesReducer(initData),
    resourceTypes: getResourceTypesReducer(initData),
    resources: getResourcesReducer(initData)
  });
}
