import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  FETCH_RESOURCES,
  FETCH_RESOURCES_SUCCESS,
  LOAD_RESOURCES,
  LOAD_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
  SET_FETCH_RESOURCES,
  SET_SELECTED_RESOURCES,
  resourcesCache,
  RESOURCEFILTERS_UPDATE_RESOURCES_LIST_EXPAND_STATUS,
  CHANGE_RESOURCES_ERR_MESSAGE
} from '../../actions/resourceFilters';

function updateSelected(state, selected) {
  // permitID is a string '0', so can't use ===
  // don't reset selected when update-permit
  if (parseInt(state.get('permitID'), 10) === 0) {
    state.set('selected', fromJS(selected));
  } else if (selected && selected.length > 0) {
    const originalSelected = state.get('selected').toJS();

    for (let i = 0; i < selected.length; i += 1) {
      const exist = originalSelected.filter(item => item === selected[i]).length > 0;

      if (!exist) {
        originalSelected.push(selected[i]);
      }
    }

    state.set('selected', fromJS(originalSelected));
  }
}

const getInitialState = (initData) => {
  const { permitID } = initData;

  return fromJS({
    data: [],
    selected: [],
    loading: false,
    totalSize: 0,
    errMsg: '',
    isFetchData: false,
    lastLoadingTimestamp: 0,
    permitID,
    isResourceFetched: false
  });
};

const handlers = {
  [FETCH_RESOURCES](state) {
    return state.set('loading', true);
  },

  [LOAD_RESOURCES](state) {
    return state.set('loading', true);
  },

  [FETCH_RESOURCES_SUCCESS](state,
    {
    payload: {
      body: {
      items: data,
      selectedItems: selected
    } } }) {
    const resourceData = data.map(item =>
      Object.assign(item, {
        text: item.name,
        value: item.id
      })
    );

    resourcesCache.init(resourceData);
    return state.withMutations((s) => {
      s.set('loading', false);

      updateSelected(s, selected);

      s.set('data', fromJS(resourcesCache.getPage()));
      s.set('totalSize', resourcesCache.totalRecords);
      s.set('totalPage', resourcesCache.pageCount);
      s.set('pageNumber', 1);
      s.set('errMsg', '');
      s.set('isFetchData', true);
      s.set('isResourceFetched', true);
    });
  },

  [LOAD_RESOURCES_SUCCESS](state, {
    payload: {
      headers: { page_info },
      body: {
        items: data,
        timestamp
      }
    }
  }) {
    const timestampInt = parseInt(timestamp, 10);
    if (timestampInt < state.get('lastLoadingTimestamp')) {
      return state;
    }

    const resources = state.get('data');

    return state.withMutations((s) => {
      s.set('loading', false);
      if (typeof resources !== 'undefined' && page_info.page_number > 1) {
        s.set('data', resources.concat(fromJS(data)));
      } else {
        s.set('data', fromJS(data));
      }
      s.set('totalSize', page_info.total_records);
      s.set('totalPage', page_info.total_page);
      s.set('pageNumber', page_info.page_number);
      s.set('isFetchData', false);
      s.set('lastLoadingTimestamp', timestampInt);
    });
  },

  [FETCH_RESOURCES_FAILURE](state) {
    resourcesCache.init([]);
    return state.withMutations((s) => {
      s.set('loading', false);
      s.set('data', fromJS([]));
    });
  },


  [CHANGE_RESOURCES_ERR_MESSAGE](state, { payload: { errMsg } }) {
    return state.set('errMsg', errMsg);
  },

  [SET_FETCH_RESOURCES](state, { payload: { status } }) {
    return state.withMutations((s) => {
      s.set('isFetchData', status);
    });
  },

  [SET_SELECTED_RESOURCES](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('selected', fromJS(value));
    });
  },

  [RESOURCEFILTERS_UPDATE_RESOURCES_LIST_EXPAND_STATUS](
    state, { payload: { isResourcesExpanded } }) {
    return state.set('isResourcesExpanded', isResourcesExpanded);
  }
};

export default function getResourcesReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
