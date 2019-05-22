import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';

import {
  FETCH_EVENT_TYPE_SUCCESS,
  FETCH_EVENT_TYPE_FAILURE,
  SET_EVENT_TYPE
} from '../../actions/resourceFilters';

const getInitialState = (initData) => {
  const eventTypesObj = normalizeData(initData.eventTypes);
  return fromJS({
    data: eventTypesObj.data,
    selected: eventTypesObj.selected
  });
};

const handlers = {
  [FETCH_EVENT_TYPE_SUCCESS](state, { payload: { body: { items: data } } }) {
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
      s.set('selected', fromJS(selected));
      s.set('data', fromJS(resourceData));
    });
  },

  [FETCH_EVENT_TYPE_FAILURE](state) {
    return state.withMutations((s) => {
      s.set('data', fromJS([]));
    });
  },

  [SET_EVENT_TYPE](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('selected', fromJS(value));
    });
  }
};

export default function getEventTypesReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

