import {is, fromJS} from 'immutable';
import getCentersReducer from 'index/Resource/reducers/filters/centers';
import getEventTypesReducer from 'index/Resource/reducers/filters/eventTypes';
import getResourceTypesReducer from 'index/Resource/reducers/filters/resourceTypes';
import getFacilityTypesReducer from 'index/Resource/reducers/filters/facilityTypes';
import getResourcesReducer from 'index/Resource/reducers/filters/resources';
import getResourceFilterReducer from 'index/Resource/reducers/resourceFilter';
import normalizeData from 'shared/utils/normalizeData';

const { sites, centers, eventTypes, resourceTypes, facilityTypes } = window.__resourceCalender__.__initialState__;
const resourceFilter = getResourceFilterReducer(__resourceCalender__.__initialState__);
const centerReducer = getCentersReducer(__resourceCalender__.__initialState__);
const eventTypeReducer = getEventTypesReducer(__resourceCalender__.__initialState__);
const resourceTypeReducer = getResourceTypesReducer(__resourceCalender__.__initialState__);
const facilityTypeReducer = getFacilityTypesReducer(__resourceCalender__.__initialState__);
const resourceReducer = getResourcesReducer(__resourceCalender__.__initialState__);

describe('index -> Resource -> reducers -> filters -> centers', () => {
  it('should return the initial state', () => {
    const centersObj = normalizeData(centers);
    const initialState = fromJS({
      data: centersObj.data,
      selected: centersObj.selected,
      errMsg: ''
    });
    expect(is(initialState, centerReducer(undefined, {}))).toBe(true);
  });
});

describe('index -> Resource -> reducers -> filters -> eventTypes', () => {
  it('should return the initial state', () => {
    const eventTypesObj = normalizeData(eventTypes);
    const initialState = fromJS({
      data: eventTypesObj.data,
      selected: eventTypesObj.selected
    });
    expect(is(initialState, eventTypeReducer(undefined, {}))).toBe(true);
  });
});

describe('index -> Resource -> reducers -> filters -> resourceTypes', () => {
  it('should return the initial state', () => {
    const resourceTypesObj = normalizeData(resourceTypes);
    let disabledFacilityType = false;
    if (resourceTypesObj.selected.length > 0 && resourceTypesObj.selected.indexOf(0) == -1) {
      disabledFacilityType = true;
    }
    const initialState = fromJS({
      data: resourceTypesObj.data,
      selected: resourceTypesObj.selected,
      disabledFacilityType: disabledFacilityType
    });
    expect(is(initialState, resourceTypeReducer(undefined, {}))).toBe(true);
  });

});

describe('index -> Resource -> reducers -> filters -> facilityTypes', () => {
  it('should return the initial state', () => {
    const facilityTypesObj = normalizeData(facilityTypes);
    const initialState = fromJS({
      data: facilityTypesObj.data,
      selected: facilityTypesObj.selected
    });
    expect(is(initialState, facilityTypeReducer(undefined, {}))).toBe(true);
  });
});

describe('index -> Resource -> reducers -> filters -> resources', () => {
  it('should return the initial state', () => {
    const initialState = fromJS({
      data: [],
      selected: [],
      error: false,
      loading: false,
      deselectAll: true,
      totalSize: 0,
      errMsg: ''
    });
    expect(is(initialState, resourceReducer(initialState, {}))).toBe(true);
  });
});
