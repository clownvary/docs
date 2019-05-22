import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';

import {
  FETCH_CENTERS_SUCCESS,
  FETCH_CENTERS_FAILURE,
  SET_CENTER,
  CLEAR_ERRMSG
} from '../../actions/resourceFilters';

const getInitialState = (initData) => {
  const centersObj = normalizeData(initData.centers);
  return fromJS({
    data: centersObj.data,
    selected: centersObj.selected,
    errMsg: ''
  });
};

const handlers = {
  [FETCH_CENTERS_SUCCESS](state, { payload: { body: { items: data } } }) {
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

  [FETCH_CENTERS_FAILURE](state) {
    return state.withMutations((s) => {
      s.set('data', fromJS([]));
    });
  },

  [SET_CENTER](state, { payload: { value, errMsg } }) {
    return state.withMutations((s) => {
      s.set('selected', fromJS(value));
      s.set('errMsg', errMsg);
    });
  },

  [CLEAR_ERRMSG](state) {
    return state.withMutations((s) => {
      s.set('errMsg', '');
    });
  }
};

export default function getCentersReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

