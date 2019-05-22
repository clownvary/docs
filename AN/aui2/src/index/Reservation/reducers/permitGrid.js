import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import { NO_RESULT } from 'shared/api/parseResponse';
import { CHANGE_PERMIT_STATUS_SUCCESS } from 'shared/actions/cancelPermit';
import {
  SELECT_PERMIT,
  FETCH_PERMITS_SUCCESS,
  CHANGE_PERMITS_SORT,
  CHANGE_PERMITS_PAGE,
  IS_PERMIT_LOCK_SUCCESS,
  IS_PERMIT_LOCK_FAILURE,
  FETCH_PERMIT_EVENT_INFO_SUCCESS,
  FETCH_PERMIT_EVENT_INFO_FAILURE
} from '../actions/permitGrid';
import fetchStatus from '../consts/permitsTooltipFetchStatus';

const initialState = fromJS({
  selectedPermit: null,
  emptyDataMessage: '',
  data: [],
  pagination: {
    total: 1,
    current: 1,
    around: 1,
    edgeCount: 2
  },
  sort: {
    orderOption: '',
    orderBy: ''
  },
  message: '',
  isPermitAccessible: true
});

const handlers = {
  [SELECT_PERMIT](state, { payload: { value } }) {
    return state.set('selectedPermit', fromJS(value));
  },

  [FETCH_PERMITS_SUCCESS](state, { payload: { headers, body: data } }) {
    const pageInfo = headers.page_info;
    return state.withMutations((s) => {
      s.setIn(['pagination', 'total'], ((pageInfo && pageInfo.total_page) || 0));
      const permits = data.permit_grid_items;
      permits.forEach((permit) => {
        Object.assign(permit, { fetched: fetchStatus.NOT_FETCHED });
      });
      /* istanbul ignore next */
      s.set('data', fromJS(permits || []));
      if (headers.response_code === NO_RESULT) {
        s.set('emptyDataMessage', headers.response_message);
      }
    });
  },

  [CHANGE_PERMITS_SORT](state, { payload: { value } }) {
    return state.set('sort', fromJS(value));
  },

  [CHANGE_PERMITS_PAGE](state, { payload: { value } }) {
    return state.setIn(['pagination', 'current'], value);
  },

  [CHANGE_PERMIT_STATUS_SUCCESS](state, { payload: { body: data } }) {
    // after successful permit status change, make sure currently
    // selected permit reflects the new permit status
    return state.withMutations((s) => {
      const { permit_id: permitID, permit_number, status_id,
        permit_status } = data.extrainfo;
      const permits = s.get('data').toJS();
      permits.forEach((permit) => {
        if (parseInt(permit.permit_id, 10) === parseInt(permitID, 10)) {
          Object.assign(permit, { permit_number, status_id, permit_status });
          if (parseInt(status_id, 10) === 5) {
            // permit is cancelled, so also clear start and end date and number of bookings
            Object.assign(permit, { permit_start_date: '', permit_end_date: '', booking_number: 0 });
          }
        }
      });
      s.setIn(['selectedPermit', 'permit_number'], permit_number);
      s.setIn(['selectedPermit', 'status_id'], status_id);
      s.setIn(['selectedPermit', 'permit_status'], permit_status);
      if (parseInt(status_id, 10) === 5) {
        // permit is cancelled, so also clear start and end date and number of bookings
        s.setIn(['selectedPermit', 'permit_start_date'], '');
        s.setIn(['selectedPermit', 'permit_end_date'], '');
        s.setIn(['selectedPermit', 'booking_number'], '0');
      }
      s.set('data', fromJS(permits));
    });
  },

  [IS_PERMIT_LOCK_SUCCESS](state, { payload: { body: { is_permit_accessible, message } } }) {
    return state.withMutations((s) => {
      s.set('message', message);
      s.set('isPermitAccessible', is_permit_accessible);
    });
  },

  [IS_PERMIT_LOCK_FAILURE](state) {
    return state.withMutations((s) => {
      s.set('message', '');
      s.set('isPermitAccessible', true);
    });
  },

  [FETCH_PERMIT_EVENT_INFO_SUCCESS](state,
    { payload: { value: { message, permitInfo, permitId } } }) {
    const currentIdx = state.get('data').findIndex(permit => permit.get('permit_id') === permitId);
    if (currentIdx >= 0) {
      if (permitInfo) {
        const invoiceTotal = permitInfo.invoice_total;
        const outstandingBalance = permitInfo.outstanding_balance;
        return state.updateIn(['data', currentIdx], permit => permit.withMutations((p) => {
          p.set('fetched', fetchStatus.FETCHED);
          p.set('invoiceTotal', invoiceTotal);
          p.set('outstandingBalance', outstandingBalance);
        }));
      }
      return state.updateIn(['data', currentIdx], permit => permit.withMutations((p) => {
        p.set('fetched', fetchStatus.FETCHED_WITH_ERROR);
        p.set('fetchingErrorMessage', message);
      }));
    }
    return state;
  },

  [FETCH_PERMIT_EVENT_INFO_FAILURE](state, { payload: { value: { message, permitId } } }) {
    const currentIdx = state.get('data').findIndex(permit => permit.get('permit_id') === permitId);
    if (currentIdx >= 0) {
      return state.updateIn(['data', currentIdx], permit => permit.withMutations((p) => {
        p.set('fetched', fetchStatus.FETCHED_WITH_ERROR);
        p.set('fetchingErrorMessage', message);
      }));
    }
    return state;
  }
};

export default reducerHandler(initialState, handlers);

