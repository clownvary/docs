import find from 'lodash/find';
import { confirm } from 'react-base-ui/lib/services/dialog';
import getDynamicUrl from 'shared/utils/getDynamicUrl';
import { setSelectedResource } from './resourceFilters';
import { fetchResourcesBookingAsyncAction } from './booking';
import URL from '../urls';

export const SET_QUICK_VIEW = 'SET_QUICK_VIEW';
export const DELETE_QUICK_VIEW = 'DELETE_QUICK_VIEW';
export const SHOW_NEW_QUICK_VIEW_DIALOG = 'SHOW_NEW_QUICK_VIEW_DIALOG';
export const SAVE_QUICK_VIEW = 'SAVE_QUICK_VIEW';
export const SAVE_QUICK_VIEW_SUCCESS = 'SAVE_QUICK_VIEW_SUCCESS';
export const UPDATE_SELECTED_QUICK_VIEW = 'UPDATE_SELECTED_QUICK_VIEW';
export const SET_QUICK_VIEW_ERROR = 'SET_QUICK_VIEW_ERROR';
export const SET_QUICK_VIEW_TYPE = 'SET_QUICK_VIEW_TYPE';

export const selectQuickViewAsyncAction = (id) => {
  const url = getDynamicUrl(URL.selectQuickView, {
    id
  });

  return {
    types: ['', '', ''],
    promise: API => API.put(url),
    meta: {
      ignoreBusinessErrors: true,
      ignoreSystemErrors: true
    }
  };
};

export const setQuickViewNameAction = ({ value }) => ({
  type: SET_QUICK_VIEW,
  payload: {
    value
  }
});

export const setQuickViewAsyncAction = value =>
  (dispatch, getState) => dispatch(selectQuickViewAsyncAction(value)).then(
    ({ payload: { body } }) => {
      if (body.message && (typeof body.quick_view_list !== 'undefined')) {
        return confirm(
          body.message,
          {
            title: 'System Message',
            confirmText: 'OK'
          }
        ).then(
          () => dispatch({
            type: SAVE_QUICK_VIEW,
            payload: {
              body
            }
          })
        );
      }

      if (value !== -1) {
        const data = getState().quickView.get('data').toJS();
        const result = find(data, item => item.value === value);

        dispatch(setSelectedResource(result.resource_ids));
        dispatch(fetchResourcesBookingAsyncAction());
      }

      return dispatch(setQuickViewNameAction({ value }));
    }
  );

export const showQuickViewModelAction = isShow => ({
  type: SHOW_NEW_QUICK_VIEW_DIALOG,
  payload: {
    isShow
  }
});

const _deleteQuickView = (id) => {
  const url = getDynamicUrl(URL.deleteQuickView, {
    id
  });

  return {
    types: ['', DELETE_QUICK_VIEW, ''],
    promise: API => API.delete(url)
  };
};

export const deleteQuickViewAsyncAction = (id, selectedViewId) => dispatch => confirm(
    'Are you sure you want to delete this quick view?', {
      title: 'Delete Quick View',
      showCancel: true,
      cancelText: 'Cancel',
      confirmText: 'Delete'
    }
  ).then(
    () => {
      if (id === selectedViewId) {
        dispatch(setQuickViewNameAction({ value: -1 }));
      }
      return dispatch(_deleteQuickView(id));
    }
  );

export const saveQuickViewErrorAction = errorMessage => ({
  type: SET_QUICK_VIEW_ERROR,
  payload: {
    errorMessage
  }
});

const _saveQuickView = params =>
 ({
   types: ['', SAVE_QUICK_VIEW, ''],
   promise: API => API.put(URL.saveQuickView, {
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(params)
   })
 });

const saveQuickViewSuccessAction = errorMessage => ({
  type: SAVE_QUICK_VIEW_SUCCESS,
  payload: {
    errorMessage
  }
});

export const saveQuickViewAsyncAction = name => (dispatch, getState) => {
  const quickView = getState().quickView;
  const selectedViewType = quickView.get('selectedViewType');
  const length = name.length;
  let errorMessage = '';

  if (length > 50) {
    errorMessage = 'Name must be less than 50 characters.';
  }

  if (errorMessage) {
    return dispatch(saveQuickViewErrorAction(errorMessage));
  }

  const resources = getState().resourceFilter.resources.get('selected').toJS();


  return dispatch(_saveQuickView({ name, resource_ids: resources, scope_type: selectedViewType }))
  .then(({ payload: { body: { error } } }) => dispatch(saveQuickViewSuccessAction(error)));
};

// Only delete the resourceIds of the filters, the resourceMap don't need to update
export const updateQuickViewForDeleteResourceAction = () => (dispatch) => {
  dispatch(setQuickViewNameAction({ value: -1 }));
  dispatch(selectQuickViewAsyncAction(-1));
};

export const changeQuickViewTypeAction = viewType => ({
  type: SET_QUICK_VIEW_TYPE,
  payload: {
    viewType
  }
});
