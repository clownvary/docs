import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';

import {
  CONFIGURATION_UPDATE_SCHEDULETYPES,
  CONFIGURATION_UPDATE_CLEANUPS,
  CONFIGURATION_UPDATE_SETUPS,
  CONFIGURATION_UPDATE_PREPCODES,
  CONFIGURATION_UPDATE_RESOURCEMAP,
  CONFIGURATION_UPDATE_RENTALBLOCKMAP,
  CONFIGURATION_UPDATE_DATERANGEMAP,
  CONFIGURATION_UPDATE_RESOURCE_EVENTTYPES
} from '../actions/configurationData';

const initialState = fromJS({
  scheduleTypes: [],
  cleanUps: [],
  setUps: [],
  prepCodes: [],
  resourceMap: {},
  rentalBlockMap: {},
  definedDateRangeMap: {},
  eventTypeMap: {}
});

const handlers = {
  [CONFIGURATION_UPDATE_SCHEDULETYPES](state, { payload: { scheduleTypes } }) {
    return state.set('scheduleTypes', fromJS(scheduleTypes));
  },

  [CONFIGURATION_UPDATE_CLEANUPS](state, { payload: { cleanUps } }) {
    return state.set('cleanUps', fromJS(cleanUps));
  },

  [CONFIGURATION_UPDATE_SETUPS](state, { payload: { setUps } }) {
    return state.set('setUps', fromJS(setUps));
  },

  [CONFIGURATION_UPDATE_PREPCODES](state, { payload: { prepCodes } }) {
    return state.set('prepCodes', fromJS(prepCodes));
  },

  [CONFIGURATION_UPDATE_RESOURCEMAP](state, { payload: { resourceMap } }) {
    return state.set('resourceMap', state.get('resourceMap').merge(resourceMap));
  },

  [CONFIGURATION_UPDATE_RENTALBLOCKMAP](state, { payload: { rentalBlocks, resourceIds } }) {
    const rentalBlockMap = {};

    rentalBlocks.forEach((rentalBlock) => {
      const key = rentalBlock.parent_id;
      let resourceRentalblocks = rentalBlockMap[key];

      if (!resourceRentalblocks) {
        rentalBlockMap[key] = resourceRentalblocks = [];
      }

      rentalBlock.text = rentalBlock.name;
      rentalBlock.value = rentalBlock.id;
      resourceRentalblocks.push(rentalBlock);
    });

    resourceIds.forEach((resourceID) => {
      if (!rentalBlockMap[resourceID]) {
        rentalBlockMap[resourceID] = [];
      }
    });

    if (!rentalBlocks.length) {
      resourceIds.forEach((id) => {
        rentalBlockMap[id] = [];
      });
    }

    return state.set('rentalBlockMap', state.get('rentalBlockMap').merge(rentalBlockMap));
  },

  [CONFIGURATION_UPDATE_DATERANGEMAP](state, { payload: { dateRanges, resourceIds } }) {
    const dateRangeMap = {};

    dateRanges.forEach((dateRange) => {
      const key = dateRange.parent_id;
      let ResourceDateRanges = dateRangeMap[key];

      if (!ResourceDateRanges) {
        dateRangeMap[key] = ResourceDateRanges = [];
      }

      dateRange.text = dateRange.name;
      dateRange.value = dateRange.id;
      ResourceDateRanges.push(dateRange);
    });

    if (!dateRanges.length) {
      resourceIds.forEach((id) => {
        dateRangeMap[id] = [];
      });
    }

    return state.set('definedDateRangeMap', state.get('definedDateRangeMap').merge(dateRangeMap));
  },

  [CONFIGURATION_UPDATE_RESOURCE_EVENTTYPES](state, { payload: { resourceEventTypesMap } }) {
    return state.withMutations((s) => {
      let eventTypeMap = s.get('eventTypeMap');

      Object.keys(resourceEventTypesMap).forEach((resourceID) => {
        eventTypeMap = eventTypeMap.set(`${resourceID}`,
          fromJS(normalizeData(resourceEventTypesMap[resourceID]).data));
      });
      s.set('eventTypeMap', eventTypeMap);
    });
  }
};

export default reducerHandler(initialState, handlers);
