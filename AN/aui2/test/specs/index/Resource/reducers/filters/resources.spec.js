import { fromJS } from 'immutable';
import {
  FETCH_RESOURCES,
  FETCH_RESOURCES_SUCCESS,
  LOAD_RESOURCES,
  LOAD_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
  CHANGE_RESOURCES,
  SET_FETCH_RESOURCES
} from 'index/Resource/actions/resourceFilters.js';
import getResourcesReducer from 'index/Resource/reducers/filters/resources';

import bookableResource from 'json/Resource/bookable_resources.json';

const reducers = getResourcesReducer(__resourceCalender__.__initialState__);

describe('index/Resource/reducers/filters/resources.js', () => {

  const initialState = fromJS({
    data: [],
    selected: [],
    loading: false,
    totalSize: 0,
    errMsg: '',
    isFetchData: false
  });

  it('FETCH_RESOURCES the expected initial state', () => {
    const state = reducers(initialState, {
      type: FETCH_RESOURCES
    });

    expect(state.get('loading')).toEqual(true);
  });

  it('LOAD_RESOURCES the expected initial state', () => {
    const state = reducers(initialState, {
      type: LOAD_RESOURCES
    });

    expect(state.get('loading')).toEqual(true);
  });

  it('FETCH_RESOURCES_SUCCESS the expected initial state', () => {
    const state = reducers(initialState, {
      type: FETCH_RESOURCES_SUCCESS,
      payload: bookableResource
    });

    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual(bookableResource.body.selectedItems);
    expect(state.get('totalSize')).toEqual(20);
    expect(state.get('totalPage')).toEqual(1);
    expect(state.get('pageNumber')).toEqual(1);
    expect(state.get('errMsg')).toEqual('');
    expect(state.get('isFetchData')).toEqual(true);
    expect(state.get('loading')).toEqual(false);
  });

  it('FETCH_RESOURCES_SUCCESS the expected initial state, if no selected data', () => {
    const newBookableItems = bookableResource.body.items.map((item) => {
      item.selected = false;
      return item;
    });

    const newBookableResource = Object.assign({}, bookableResource, {
      body: {
        selectedItems: [],
        items: newBookableItems
      }
    });
    const state = reducers(initialState, {
      type: FETCH_RESOURCES_SUCCESS,
      payload: newBookableResource
    });

    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual([]);
    expect(state.get('totalSize')).toEqual(20);
    expect(state.get('totalPage')).toEqual(1);
    expect(state.get('pageNumber')).toEqual(1);
    expect(state.get('errMsg')).toEqual('');
    expect(state.get('isFetchData')).toEqual(true);
    expect(state.get('loading')).toEqual(false);
  });

  it('FETCH_RESOURCES_SUCCESS the expected initial state, if no existing data', () => {
    const initialState = fromJS({
      data: [],
      selected: [3],
      loading: false,
      totalSize: 0,
      errMsg: '',
      isFetchData: false
    });
    const state = reducers(initialState, {
      type: FETCH_RESOURCES_SUCCESS,
      payload: bookableResource
    });

    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual([3, 1, 2]);
    expect(state.get('totalSize')).toEqual(20);
    expect(state.get('totalPage')).toEqual(1);
    expect(state.get('pageNumber')).toEqual(1);
    expect(state.get('errMsg')).toEqual('');
    expect(state.get('isFetchData')).toEqual(true);
    expect(state.get('loading')).toEqual(false);
  });

  it('LOAD_RESOURCES_SUCCESS the expected initial state', () => {
    const state = reducers(initialState, {
      type: LOAD_RESOURCES_SUCCESS,
      payload: bookableResource
    });

    const stateData = state.get('data').toJS();

    expect(stateData).toEqual([{
      name: 'rec&amp;ource1',
      id: 1,
      type: 0,
      selected: false,
      text: 'rec&amp;ource1',
      value: 1
    }, {
      name: 'recource2fadsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      id: 2,
      type: 1,
      selected: false,
      text: 'recource2fadsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      value: 2
    }, {
      name: 'recource3fdsaaaaaaaaaaaaaaaa',
      id: 3,
      type: 2,
      selected: false,
      text: 'recource3fdsaaaaaaaaaaaaaaaa',
      value: 3
    }, {
      name: 'recource4',
      id: 4,
      type: 1,
      selected: false,
      text: 'recource4',
      value: 4
    }, {
      name: 'recource5',
      id: 5,
      type: 1,
      selected: false,
      text: 'recource5',
      value: 5
    }, {
      name: 'recource1',
      id: 11,
      type: 0,
      selected: false,
      text: 'recource1',
      value: 11
    }, {
      name: 'recource2',
      id: 12,
      type: 1,
      selected: false,
      text: 'recource2',
      value: 12
    }, {
      name: 'recource3',
      id: 13,
      type: 2,
      selected: false,
      text: 'recource3',
      value: 13
    }, {
      name: 'recource4',
      id: 14,
      type: 1,
      selected: false,
      text: 'recource4',
      value: 14
    }, {
      name: 'recource5',
      id: 15,
      type: 1,
      selected: false,
      text: 'recource5',
      value: 15
    }, {
      name: 'recource1',
      id: 21,
      type: 0,
      selected: false,
      text: 'recource1',
      value: 21
    }, {
      name: 'recource2',
      id: 22,
      type: 1,
      selected: false,
      text: 'recource2',
      value: 22
    }, {
      name: 'recource3',
      id: 23,
      type: 2,
      selected: false,
      text: 'recource3',
      value: 23
    }, {
      name: 'recource4',
      id: 24,
      type: 1,
      selected: false,
      text: 'recource4',
      value: 24
    }, {
      name: 'recource5',
      id: 25,
      type: 1,
      selected: false,
      text: 'recource5',
      value: 25
    }, {
      name: 'recource1',
      id: 31,
      type: 0,
      selected: false,
      text: 'recource1',
      value: 31
    }, {
      name: 'recource2',
      id: 32,
      type: 1,
      selected: false,
      text: 'recource2',
      value: 32
    }, {
      name: 'recource3',
      id: 33,
      type: 2,
      selected: false,
      text: 'recource3',
      value: 33
    }, {
      name: 'recource4',
      id: 34,
      type: 1,
      selected: false,
      text: 'recource4',
      value: 34
    }, {
      name: 'recource5',
      id: 35,
      type: 1,
      selected: false,
      text: 'recource5',
      value: 35
    }]);
    expect(state.get('totalSize')).toEqual(10);
    expect(state.get('totalPage')).toEqual(12);
    expect(state.get('pageNumber')).toEqual(1);
    expect(state.get('isFetchData')).toEqual(false);
    expect(state.get('loading')).toEqual(false);
    expect(state.get('lastLoadingTimestamp')).toEqual(1510291923674);
  });

  it('LOAD_RESOURCES_SUCCESS expects initial state, if timestamp tell it is not the latest response', () => {
    const initialState = fromJS({
      selected: [],
      loading: false,
      totalSize: 0,
      errMsg: '',
      isFetchData: false,
      lastLoadingTimestamp: 1510291923675
    });
    const state = reducers(initialState, {
      type: LOAD_RESOURCES_SUCCESS,
      payload: bookableResource
    });

    expect(state).toEqual(initialState);
  });

  it('FETCH_RESOURCES_FAILURE the expected initial state', () => {
    const state = reducers(initialState, {
      type: FETCH_RESOURCES_FAILURE
    });

    expect(state.get('loading')).toEqual(false);
    expect(state.get('data').toJS()).toEqual([]);
  });

  it('CHANGE_RESOURCES the expected initial state, if a value has been selected', () => {
    const initialState = fromJS({
      data: [],
      selected: [2],
      loading: false,
      totalSize: 0,
      errMsg: '',
      isFetchData: false
    });
    const value = [3];
    const errMsg = 'error message';

    const state = reducers(initialState, {
      type: CHANGE_RESOURCES,
      payload: {
        value,
        errMsg
      }
    });

    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual(value);
    expect(state.get('errMsg')).toEqual(errMsg);
  });

  it('CHANGE_RESOURCES the expected initial state, if any value do not have been selected', () => {
    const initialState = fromJS({
      data: [],
      selected: [1, 2],
      loading: false,
      totalSize: 0,
      errMsg: '',
      isFetchData: false
    });
    const value = [1];
    const errMsg = 'error message';

    const state = reducers(initialState, {
      type: CHANGE_RESOURCES,
      payload: {
        value,
        errMsg
      }
    });

    const stateSelected = state.get('selected').toJS();
    expect(stateSelected).toEqual(value);
    expect(state.get('errMsg')).toEqual(errMsg);
  });

  it('CHANGE_RESOURCES the expected initial state, if a value has been selected', () => {
    const initialState = fromJS({
      data: [],
      selected: [1, 2],
      loading: false,
      totalSize: 0,
      errMsg: '',
      isFetchData: false
    });
    const value = [1, 2];
    const errMsg = 'error message';

    const state = reducers(initialState, {
      type: CHANGE_RESOURCES,
      payload: {
        value,
        errMsg
      }
    });

    const stateSelected = state.get('selected').toJS();
    expect(stateSelected).toEqual(value);
    expect(state.get('errMsg')).toEqual(errMsg);
  });

  it('CHANGE_RESOURCES the expected initial state, if no selected data', () => {
    const value = [];
    const errMsg = 'error message';

    const state = reducers(initialState, {
      type: CHANGE_RESOURCES,
      payload: {
        value,
        errMsg
      }
    });

    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual(value);
    expect(state.get('errMsg')).toEqual(errMsg);
  });

  it('SET_FETCH_RESOURCES the expected initial state', () => {
    const status = true;
    const state = reducers(initialState, {
      type: SET_FETCH_RESOURCES,
      payload: {
        status
      }
    });

    expect(state.get('isFetchData')).toEqual(status);
  });

  it('SET_FETCH_RESOURCES the expected initial state', () => {
    const status = true;
    const state = reducers(initialState, {
      type: SET_FETCH_RESOURCES,
      payload: {
        status
      }
    });

    expect(state.get('isFetchData')).toEqual(status);
  });
})
