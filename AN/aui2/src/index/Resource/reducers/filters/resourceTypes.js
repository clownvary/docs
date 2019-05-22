import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';

import {
  FETCH_RESOURCE_TYPE_SUCCESS,
  FETCH_RESOURCE_TYPE_FAILURE,
  SET_RESOURCE_TYPE
} from '../../actions/resourceFilters';

const getInitialState = (initData) => {
  const resourceTypesObj = normalizeData(initData.resourceTypes);
  let disabledFacilityType = false;

  if (resourceTypesObj.selected.length > 0 && resourceTypesObj.selected.indexOf(0) === -1) {
    disabledFacilityType = true;
  }
  return fromJS({
    data: resourceTypesObj.data,
    selected: resourceTypesObj.selected,
    disabledFacilityType
  });
};

const handlers = {
  [FETCH_RESOURCE_TYPE_SUCCESS](state, { payload: { body: { items: data } } }) {
    const selected = [];
    const resourceData = data.map((item) => {
      if (item.selected) {
        selected.push(item.id);
      }
      return Object.assign(item, {
        text: item.name,
        value: item.id
      });
    });

    return state.withMutations((s) => {
      if (selected.indexOf(1) === -1) {
        s.set('disabledFacilityType', true);
      } else {
        s.set('disabledFacilityType', false);
      }

      if (selected.length === 0) {
        s.set('disabledFacilityType', false);
      }

      s.set('selected', fromJS(selected));
      s.set('data', fromJS(resourceData));
    });
  },

  [FETCH_RESOURCE_TYPE_FAILURE](state) {
    return state.withMutations((s) => {
      s.set('data', fromJS([]));
    });
  },

  [SET_RESOURCE_TYPE](state, { payload: { value } }) {
    return state.withMutations((s) => {
      if (value.indexOf(0) === -1) {
        s.set('disabledFacilityType', true);
      } else {
        s.set('disabledFacilityType', false);
      }

      if (value.length === 0) {
        s.set('disabledFacilityType', false);
      }
      s.set('selected', fromJS(value));
    });
  }
};

export default function getResourceTypesReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

