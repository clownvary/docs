import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Reservation/actions/permitFilter';
import _ from 'lodash';
import { fromJS } from 'immutable';

const initialState = {
  startDate: '',
  endDate: '',
  permitNumber: 0,

  tags: {
    currentTags: ['All centers', 'All Facility Types', 'All event Types', 'All status'],
    isDefaultTags: false
  },

  eventTypes: {
    data: [{
      'id': 34,
      'name': 'South West Hub Café &amp;',
      'selected': false
    }, {
      'id': 51,
      'name': '15.4 demo - Event Type - Lin Test',
      'selected': false
    }, {
      'id': 39,
      'name': '3 event type',
      'selected': false
    }, {
      'id': 69,
      'name': '3 event type - Cloned',
      'selected': false
    }],
    selected: [],
    error: false,
    loading: false
  },

  centers: {
    data: [{
      'name': '111111Lois Center without Facility',
      'id': 138,
      'selected': false
    }, {
      'name': '14.5 Sprint 4 Moon`s center',
      'id': 151,
      'selected': false
    }, {
      'name': '3 center',
      'id': 149,
      'selected': false
    }],
    selected: [],
    error: false,
    loading: false
  },

  status: {
    data: [{
      'name': 'Approved',
      'id': 0,
      'selected': true
    }, {
      'name': 'Denied',
      'id': 1,
      'selected': false
    }, {
      'name': 'Tentative',
      'id': 2,
      'selected': false
    }],
    selected: [],
    error: false,
    loading: false
  },

  facilityTypes: {
    data: [{
      'name': 'facility type 1',
      'id': 0,
      'selected': true
    }, {
      'name': 'facility type 2',
      'id': 1,
      'selected': false
    }, {
      'name': 'facility type 3',
      'id': 2,
      'selected': false
    }],
    selected: [],
    error: false,
    loading: false
  }
};

const callbackFn = jest.fn();

describe('index -> reservation -> actions -> permitFilter', () => {
  let store = null;
  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      filters: fromJS(initialState)
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('changeCenter should works fine', () => {
    const action = actions.changeCenter({
      value: [1, 2],
      errMsg: 'Limit 5 centers'
    });

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.CHANGE_CENTER);
    expect(action.payload).toEqual({
      value: [1, 2],
      errMsg: 'Limit 5 centers'
    });
  });

  it('clearErrMsg should works fine', () => {
    const action = actions.clearErrMsg();

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.CLEAR_ERRMSG);
  });

  it('changeStatus should works fine', () => {
    const action = actions.changeStatus({
      value: [1, 2]
    });

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.CHANGE_STATUS);
    expect(action.payload).toEqual({
      value: [1, 2]
    });
  });

  it('changeFacilityType should works fine', () => {
    const action = actions.changeFacilityType({
      value: [1, 2]
    });

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.CHANGE_FACILITY_TYPE);
    expect(action.payload).toEqual({
      value: [1, 2]
    });
  });

  it('changeStartDate should works fine', () => {
    const action = actions.changeStartDate('May 12, 2016', null);

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.CHANGE_START_DATE);
    expect(action.payload).toEqual({
      value: 'May 12, 2016',
      date: null
    });
  });

  it('changeStartDate should works fine without param', () => {
    const action = actions.changeStartDate();

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.CHANGE_START_DATE);
    expect(action.payload).toEqual({
      value: '',
      date: null
    });
  });

  it('changeEndDate should works fine', () => {
    const action = actions.changeEndDate('May 28, 2016', null);

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.CHANGE_END_DATE);
    expect(action.payload).toEqual({
      value: 'May 28, 2016',
      date: null
    });
  });

  it('changeEndDate should works fine without param', () => {
    const action = actions.changeEndDate();

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.CHANGE_END_DATE);
    expect(action.payload).toEqual({
      value: '',
      date: null
    });
  });

  it('changeCreateByMe should works fine', () => {
    const action = actions.changeCreateByMe(true);

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.CHANGE_CREATE_BY_ME);
    expect(action.payload).toBe(true);
  });

  it('updateSearchValue should works fine', () => {
    const action = actions.updateSearchValue(23);

    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.UPDATE_SEARCH_VALUE);
    expect(action.payload).toBe(23);
  });

  it('clearFilterAction should works fine', (done) => {
    const action = actions.clearFilterAction(callbackFn);

    expect(typeof action).toBe('function');

    store.dispatch(action).then(() => {
      const myactions = store.getActions();

      expect(myactions.length).toBeGreaterThanOrEqual(7);
      expect(typeof myactions.find(x => x.type === actions.CHANGE_CENTER)).toBe('object');
      expect(typeof myactions.find(x => x.type === actions.CHANGE_STATUS)).toBe('object');
      expect(typeof myactions.find(x => x.type === actions.CHANGE_FACILITY_TYPE)).toBe('object');
      expect(typeof myactions.find(x => x.type === actions.CHANGE_EVENT_TYPE)).toBe('object');
      expect(typeof myactions.find(x => x.type === actions.CHANGE_START_DATE)).toBe('object');
      expect(typeof myactions.find(x => x.type === actions.CHANGE_END_DATE)).toBe('object');

      expect(callbackFn).toHaveBeenCalled();

      done();
    });
  });
});
