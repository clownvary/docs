import {
  fromJS
} from 'immutable';
import getPermitFilterReducer from 'index/Reservation/reducers/permitFilter';
import * as actions from 'index/Reservation/actions/permitFilter';

const permitFilterReducer = getPermitFilterReducer(__reservation__.__initialState__);

describe('index -> reservation -> reducers -> permitFilter', () => {
  const initialStateObj = {
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
      selected: [0],
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
      selected: [0],
      error: false,
      loading: false
    }
  };

  it('should return the initial state', () => {

    let state = permitFilterReducer(fromJS(initialStateObj), {});

    expect(state.get('centers').get('data').toJS()).toEqual(initialStateObj.centers.data);
    expect(state.get('centers').get('selected').toJS().length).toBe(initialStateObj.centers.data.filter(obj => obj.selected).length);

    expect(state.get('status').get('data').toJS()).toEqual(initialStateObj.status.data);
    expect(state.get('status').get('selected').toJS().length).toBe(initialStateObj.status.data.filter(obj => obj.selected).length);

    expect(state.get('facilityTypes').get('data').toJS()).toEqual(initialStateObj.facilityTypes.data);
    expect(state.get('facilityTypes').get('selected').toJS().length).toBe(initialStateObj.facilityTypes.data.filter(obj => obj.selected).length);

    expect(state.get('eventTypes').get('data').toJS()).toEqual(initialStateObj.eventTypes.data);
    expect(state.get('eventTypes').get('selected').toJS().length).toBe(initialStateObj.eventTypes.data.filter(obj => obj.selected).length);

    expect(state.get('tags').get('currentTags').toJS()).toEqual(initialStateObj.tags.currentTags);
  });

  it('CHANGE_START_DATE should work well', () => {
    const payload = {
      value: '10/2/2016',
      date: ''
    };

    let state = permitFilterReducer(undefined, {
      type: actions.CHANGE_START_DATE,
      payload
    });
    expect(state.get('startDate')).toBe(payload.value);
    expect(state.get('startDateObj')).toBe(payload.date);
  });

  it('CHANGE_END_DATE should work well', () => {
    const payload = {
      value: '10/2/2016',
      date: ''
    };

    let state = permitFilterReducer(undefined, {
      type: actions.CHANGE_END_DATE,
      payload
    });
    expect(state.get('endDate')).toBe(payload.value);
    expect(state.get('endDateObj')).toBe(payload.date);
  });

  it('generateDateTag should work well when startDate and endDate are not empty', () => {
    const payload = {
      value: '10/2/2016',
      date: ''
    };

    let state = permitFilterReducer(fromJS({ ...initialStateObj, startDate : '10/2/2016', endDate: '10/2/2016'  }), {
      type: actions.CHANGE_END_DATE,
      payload
    });
    expect(state.get('endDate')).toBe(payload.value);
    expect(state.get('endDateObj')).toBe(payload.date);
  });

  it('CHANGE_CENTER should work well', () => {
    const payload = {
      value: [1, 2],
      errMsg: 'Limit 5 centers'
    };

    let state = permitFilterReducer(undefined, {
      type: actions.CHANGE_CENTER,
      payload
    });
    expect(state.getIn(['centers', 'selected']).toJS()).toEqual(payload.value);
    expect(state.getIn(['tags', 'currentTags']).toJS()).toContain('Multiple centers');
  });

  it('CHANGE_FACILITY_TYPE should work well', () => {
    const payload = {
      value: []
    };

    let state = permitFilterReducer(undefined, {
      type: actions.CHANGE_FACILITY_TYPE,
      payload
    });
    expect(state.getIn(['facilityTypes', 'selected']).toJS()).toEqual(payload.value);
    expect(state.getIn(['tags', 'currentTags']).toJS()).toContain('All facility types');
  });

  it('CHANGE_STATUS should work well', () => {
    const payload = {
      value: [1, 2, 3]
    };

    let state = permitFilterReducer(undefined, {
      type: actions.CHANGE_STATUS,
      payload
    });
    expect(state.getIn(['status', 'selected']).toJS()).toEqual(payload.value);
    expect(state.getIn(['tags', 'currentTags']).toJS()).toContain('Multiple statuses');
  });

  it('CHANGE_EVENT_TYPE should work well', () => {
    const value = [1, 2];

    let state = permitFilterReducer(undefined, {
      type: actions.CHANGE_EVENT_TYPE,
      payload: {
        value
      }
    });
    expect(state.get('eventTypes').get('selected').toJS()).toEqual(value);
    expect(state.getIn(['tags', 'currentTags']).toJS()).toContain('Multiple event types');
  });

  it('UPDATE_SEARCH_VALUE should work well', () => {
    let state = permitFilterReducer(undefined, {
      type: actions.UPDATE_SEARCH_VALUE,
      payload: '123'
    });

    expect(state.get('searchData')).toBe('123');
  });

  it('CHANGE_CREATE_BY_ME should work well', () => {
    let state = permitFilterReducer(undefined, {
      type: actions.CHANGE_CREATE_BY_ME,
      payload: true
    });

    expect(state.get('createdByMe')).toBe(true);
  });

  it('CLEAR_ERRMSG should work well', () => {
    let state = permitFilterReducer(fromJS(initialStateObj), {
      type: actions.CLEAR_ERRMSG
    });

    expect(state.getIn(['centers', 'errMsg'])).toEqual('');
  });

});
