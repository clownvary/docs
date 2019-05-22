import { is, fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import {
  SELECT_PERMIT,
  FETCH_PERMITS,
  FETCH_PERMITS_SUCCESS,
  CHANGE_PERMITS_SORT,
  CHANGE_PERMITS_PAGE,
  selectPermit,
  resize,
  IS_PERMIT_LOCK_SUCCESS,
  IS_PERMIT_LOCK_FAILURE,
  FETCH_PERMIT_EVENT_INFO_SUCCESS,
  FETCH_PERMIT_EVENT_INFO_FAILURE,
} from 'index/Reservation/actions/permitGrid';
import {
  CHANGE_PERMIT_STATUS_SUCCESS
} from 'shared/actions/cancelPermit';
import reducer from 'index/Reservation/reducers/permitGrid';
import fetchStatus from 'index/Reservation/consts/permitsTooltipFetchStatus';

describe('index -> reservation -> reducers -> permitGrid', () => {
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

  let store = null;

  beforeEach(function () {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(function () {
    store.clearActions();
  });

  it('should return the initial state', () => {
    expect(is(initialState, reducer(initialState, {}))).toBe(true);
  });

  it('SELECT_PERMIT should works fine, if permit does not has permit_id', () => {
    const state = reducer(initialState, store.dispatch(selectPermit({ permit_status: 'Deny' })));
    expect(state.get('selectedPermit').toJS()).toEqual({ permit_status: 'Deny' });
  });

  it('IS_PERMIT_LOCK_SUCCESS should works fine', () => {
    const response = {
      "headers": {
        "response_code": "0000",
        "response_message": "Successful"
      },
      "body": {
        "is_permit_accessible": false,
        "message": "This reservation is currently in use. Please try again later. "
      }
    };
    const state = reducer(initialState, {
      type: IS_PERMIT_LOCK_SUCCESS,
      payload: response
    });

    expect(state.get('message')).toBe(response.body.message);
    expect(state.get('isPermitAccessible')).toBe(response.body.is_permit_accessible);
  });

  it('IS_PERMIT_LOCK_FAILURE should works fine', () => {
    const state = reducer(initialState, {
      type: IS_PERMIT_LOCK_FAILURE,
      error: 'error message'
    });

    expect(state.get('message')).toBe('');
    expect(state.get('isPermitAccessible')).toBe(true);
  });


  it('FETCH_PERMITS_SUCCESS should works fine', () => {
    const state = reducer(initialState, {
      type: FETCH_PERMITS_SUCCESS,
      payload: {
        headers: {
          page_info: {
            total_page: 10,
            page_number: 1
          }
        },
        body: {
          permit_grid_items: [{ id: 1 }, { id: 2 }]
        }
      }
    });

    expect(state.get('data').toJS()).toHaveLength(2);
  });

  it('FETCH_PERMITS_SUCCESS should work fine even if no result response', () => {
    const state = reducer(initialState, {
      type: FETCH_PERMITS_SUCCESS,
      payload: {
        headers: {
          response_code: '0001',
          response_message: 'no result'
        },
        body: {
          permit_grid_items: []
        }
      }
    });

    expect(state.get('data').toJS()).toHaveLength(0);
    expect(state.get('emptyDataMessage')).toEqual('no result');
  });

  it('CHANGE_PERMITS_SORT should work fine', () => {
    const sortObject = {
      sortBy: 'sortBy'
    };
    const state = reducer(initialState, {
      type: CHANGE_PERMITS_SORT,
      payload: {
        value: sortObject
      }
    });
    expect(state.get('sort')).toEqual(fromJS(sortObject));
  });

  it('CHANGE_PERMITS_PAGE should work fine', () => {
    const state = reducer(initialState, {
      type: CHANGE_PERMITS_PAGE,
      payload: {
        value: 5
      }
    });
    expect(state.getIn(['pagination', 'current'])).toEqual(5);
  });

  it('FETCH_PERMIT_EVENT_INFO_SUCCESS should works fine', (done) => {
    let state = reducer(initialState, {
      type: FETCH_PERMITS_SUCCESS,
      payload: {
        headers: {
          page_info: { total_page: 10, page_number: 1 }
        },
        body: {
          permit_grid_items: [
            { permit_id: -5407107 },
            { permit_id: 49463956 }]
        }
      }
    });
    state = reducer(state, {
      type: FETCH_PERMIT_EVENT_INFO_SUCCESS,
      payload: {
        value: {
          permitId: -5407107,
          permitInfo: {
            "invoice_total": 144.23,
            "outstanding_balance": 220.00
          }
        }
      }
    });

    const data = state.get('data').toJS();
    const permitChanged = data[0];
    expect(permitChanged.permit_id).toBe(-5407107);
    expect(permitChanged.fetched).toBe(fetchStatus.FETCHED);
    expect(permitChanged.invoiceTotal).toBe(144.23);
    expect(permitChanged.outstandingBalance).toBe(220.00);

    const permitNotChange = data[1];
    expect(permitNotChange.permit_id).toBe(49463956);
    expect(permitNotChange.fetched).toBe(fetchStatus.NOT_FETCHED);
    done();
  });

  it('FETCH_PERMIT_EVENT_INFO_SUCCESS should works fine even if no related permit info response', () => {
    let state = reducer(initialState, {
      type: FETCH_PERMITS_SUCCESS,
      payload: {
        headers: {
          page_info: { total_page: 10, page_number: 1 }
        },
        body: {
          permit_grid_items: [
            { permit_id: -5407107 },
            { permit_id: 49463956 }]
        }
      }
    });
    state = reducer(state, {
      type: FETCH_PERMIT_EVENT_INFO_SUCCESS,
      payload: {
        value: {
          permitId: 49463956,
          message: 'error'
        }
      }
    });

    const data = state.get('data').toJS();
    const permitNotChange = data[0];
    expect(permitNotChange.permit_id).toBe(-5407107);
    expect(permitNotChange.fetched).toBe(fetchStatus.NOT_FETCHED);

    const permitInError = data[1];
    expect(permitInError.permit_id).toBe(49463956);
    expect(permitInError.fetched).toBe(fetchStatus.FETCHED_WITH_ERROR);
    expect(permitInError.fetchingErrorMessage).toBe('error');
  });

  it('FETCH_PERMIT_EVENT_INFO_SUCCESS should works fine even if no related permit were found', () => {
    let state = reducer(initialState, {
      type: FETCH_PERMITS_SUCCESS,
      payload: {
        headers: {
          page_info: { total_page: 10, page_number: 1 }
        },
        body: {
          permit_grid_items: [
            { permit_id: -5407107 },
            { permit_id: 49463956 }]
        }
      }
    });
    state = reducer(state, {
      type: FETCH_PERMIT_EVENT_INFO_SUCCESS,
      payload: {
        value: {
          permitId: 1,
          permitInfo: {
            "invoice_total": 144.23,
            "outstanding_balance": 220.00
          }
        }
      }
    });

    const data = state.get('data').toJS();
    const permitNotChange0 = data[0];
    expect(permitNotChange0.permit_id).toBe(-5407107);
    expect(permitNotChange0.fetched).toBe(fetchStatus.NOT_FETCHED);

    const permitNotChange1 = data[1];
    expect(permitNotChange1.permit_id).toBe(49463956);
    expect(permitNotChange1.fetched).toBe(fetchStatus.NOT_FETCHED);
  });

  it('FETCH_PERMIT_EVENT_INFO_FAILURE should works fine', (done) => {
    let state = reducer(initialState, {
      type: FETCH_PERMITS_SUCCESS,
      payload: {
        headers: {
          page_info: { total_page: 10, page_number: 1 }
        },
        body: {
          permit_grid_items: [
            { permit_id: -5407107 },
            { permit_id: 49463956 }]
        }
      }
    });
    state = reducer(state, {
      type: FETCH_PERMIT_EVENT_INFO_FAILURE,
      payload: {
        value: {
          permitId: 49463956,
          message: 'error message'
        }
      }
    });

    const data = state.get('data').toJS();
    const permitNotChange = data[0];
    expect(permitNotChange.permit_id).toBe(-5407107);
    expect(permitNotChange.fetched).toBe(fetchStatus.NOT_FETCHED);

    const permitChanged = data[1];
    expect(permitChanged.permit_id).toBe(49463956);
    expect(permitChanged.fetched).toBe(fetchStatus.FETCHED_WITH_ERROR);
    expect(permitChanged.fetchingErrorMessage).toBe('error message');
    done();
  });

  it('FETCH_PERMIT_EVENT_INFO_FAILURE should works fine even if no related permit were found', () => {
    let state = reducer(initialState, {
      type: FETCH_PERMITS_SUCCESS,
      payload: {
        headers: {
          page_info: { total_page: 10, page_number: 1 }
        },
        body: {
          permit_grid_items: [
            { permit_id: -5407107 },
            { permit_id: 49463956 }]
        }
      }
    });
    state = reducer(state, {
      type: FETCH_PERMIT_EVENT_INFO_FAILURE,
      payload: {
        value: {
          permitId: 0,
          message: 'error message'
        }
      }
    });

    const data = state.get('data').toJS();
    const permitNotChange0 = data[0];
    expect(permitNotChange0.permit_id).toBe(-5407107);
    expect(permitNotChange0.fetched).toBe(fetchStatus.NOT_FETCHED);

    const permitChanged1 = data[1];
    expect(permitChanged1.permit_id).toBe(49463956);
    expect(permitChanged1.fetched).toBe(fetchStatus.NOT_FETCHED);
  });

  it('CHANGE_PERMIT_STATUS_SUCCESS should work fine', () => {
    let state = reducer(initialState, {
      type: FETCH_PERMITS_SUCCESS,
      payload: {
        headers: {
          page_info: { total_page: 10, page_number: 1 }
        },
        body: {
          permit_grid_items: [
            { permit_id: -5407107 },
            { permit_id: 49463956 }]
        }
      }
    });
    state = reducer(state, {
      type: SELECT_PERMIT,
      payload: {
        value: {

        }
      }
    });
    state = reducer(state, {
      type: CHANGE_PERMIT_STATUS_SUCCESS,
      payload: {
        body: {
          extrainfo: {
            permit_id: 49463956,
            permit_number: '49463956',
            event_name: 'Nov.27_',
            status_id: '2',
            permit_status: 'Approved'
          }
        }
      }
    });

    const selectedPermit = state.get('selectedPermit').toJS();
    expect(selectedPermit.permit_number).toEqual('49463956');
    expect(selectedPermit.event_name).toBeUndefined();
    expect(selectedPermit.status_id).toEqual('2');
  });


  it('CHANGE_PERMIT_STATUS_SUCCESS should work fine if permit status is cancelled', () => {
    let state = reducer(initialState, {
      type: FETCH_PERMITS_SUCCESS,
      payload: {
        headers: {
          page_info: { total_page: 10, page_number: 1 }
        },
        body: {
          permit_grid_items: [
            { permit_id: -5407107 },
            { permit_id: 49463956 }]
        }
      }
    });
    state = reducer(state, {
      type: SELECT_PERMIT,
      payload: {
        value: {

        }
      }
    });
    state = reducer(state, {
      type: CHANGE_PERMIT_STATUS_SUCCESS,
      payload: {
        body: {
          extrainfo: {
            permit_id: 49463956,
            permit_number: '49463956',
            event_name: 'Nov.27_',
            status_id: '5',
            permit_status: 'Approved'
          }
        }
      }
    });

    const selectedPermit = state.get('selectedPermit').toJS();
    expect(selectedPermit.permit_number).toEqual('49463956');
    expect(selectedPermit.event_name).toBeUndefined();
    expect(selectedPermit.status_id).toEqual('5');
    expect(selectedPermit.permit_start_date).toEqual('');
    expect(selectedPermit.permit_end_date).toEqual('');
    expect(selectedPermit.booking_number).toEqual('0');
  });
});
