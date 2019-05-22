import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';

import {
    SET_QUICK_VIEW,
    DELETE_QUICK_VIEW,
    SHOW_NEW_QUICK_VIEW_DIALOG,
    SAVE_QUICK_VIEW,
    SAVE_QUICK_VIEW_SUCCESS,
    SET_QUICK_VIEW_ERROR,
    SET_QUICK_VIEW_TYPE
} from '../actions/quickView';

import quickViewType from '../consts/quickViewType';

const getInitialState = (initData) => {
  const {
    permitID,
    eventID,
    receiptEntryID,
    quickView
  } = initData;

  const quickViewList = normalizeData(quickView);
  let selectedView = quickViewList.selected[0];

  const isEditEvent = parseInt(permitID, 0) > 0 &&
      (parseInt(eventID, 0) > 0 || parseInt(receiptEntryID, 0) > 0);

  if (!selectedView || isEditEvent) {
    selectedView = -1;
  }

  return fromJS({
    data: quickViewList.data,
    showModal: false,
    name: '',
    errorMessage: '',
    selectedView,
    selectedViewType: quickViewType.LOCAL_VIEW
  });
};

const handlers = {
  [SET_QUICK_VIEW](state, { payload: { value } }) {
    return state.set('selectedView', value);
  },

  [SHOW_NEW_QUICK_VIEW_DIALOG](state, { payload: { isShow } }) {
    return state.withMutations((s) => {
      s.set('name', '');
      s.set('errorMessage', '');
      s.set('showModal', isShow);
      s.set('selectedViewType', quickViewType.LOCAL_VIEW);
    });
  },

  [SAVE_QUICK_VIEW](state, { payload: { body } }) {
    const quickViewList = normalizeData(body.quick_view_list);

    return state.withMutations((s) => {
      if (quickViewList.data.length) {
        s.set('data', fromJS(quickViewList.data));
        s.set('selectedView', quickViewList.selected[0]);
      }
    });
  },

  [SAVE_QUICK_VIEW_SUCCESS](state, { payload: { errorMessage } }) {
    return state.withMutations((s) => {
      if (errorMessage) {
        s.set('errorMessage', errorMessage);
      } else {
        s.set('showModal', false);
      }
    });
  },

  [DELETE_QUICK_VIEW](state, { payload: { body } }) {
    const quickViewList = normalizeData(body.quick_view_list);

    return state.withMutations((s) => {
      s.set('data', fromJS(quickViewList.data));
    });
  },

  [SET_QUICK_VIEW_ERROR](state, { payload: { errorMessage } }) {
    return state.set('errorMessage', errorMessage);
  },

  [SET_QUICK_VIEW_TYPE](state, { payload: { viewType } }) {
    return state.withMutations((s) => {
      s.set('selectedViewType', viewType);
      s.set('errorMessage', '');
    });
  }
};

export default function getQuickViewReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
