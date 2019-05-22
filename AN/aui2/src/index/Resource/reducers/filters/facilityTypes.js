import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';

import {
  FETCH_FACILITY_TYPE_SUCCESS,
  FETCH_FACILITY_TYPE_FAILURE,
  SET_FACILITY_TYPE
} from '../../actions/resourceFilters';

const getInitialState = (initData) => {
  const facilityTypesObj = normalizeData(initData.facilityTypes);

  return fromJS({
    data: facilityTypesObj.data,
    selected: facilityTypesObj.selected
  });
};

const handlers = {
  [FETCH_FACILITY_TYPE_SUCCESS](state, { payload: { body: { items: data } } }) {
    const selected = [];
    const resoucrceData = data.map((item) => {
      if (item.selected) {
        selected.push(item.id);
      }
      return Object.assign(item, {
        text: item.name,
        value: item.id
      });
    });

    return state.withMutations((s) => {
      s.set('selected', fromJS(selected));
      s.set('data', fromJS(resoucrceData));
    });
  },

  [FETCH_FACILITY_TYPE_FAILURE](state) {
    return state.withMutations((s) => {
      s.set('data', fromJS([]));
    });
  },

  [SET_FACILITY_TYPE](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('selected', fromJS(value));
    });
  }
};

export default function getFacilityTypesReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

