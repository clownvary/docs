import { fromJS } from 'immutable';
import {
  FETCH_RESOURCE_TYPE_SUCCESS,
  FETCH_RESOURCE_TYPE_FAILURE,
  SET_RESOURCE_TYPE
} from 'index/Resource/actions/resourceFilters.js';
import getResourceTypesReducer from 'index/Resource/reducers/filters/resourceTypes';

const reducers = getResourceTypesReducer(__resourceCalender__.__initialState__);
describe('index/Resource/reducers/filters/resourceTypes.js', () => {

  const initialState = fromJS({
    data: [],
    selected: [],
    disabledFacilityType: false
  });

  it('FETCH_RESOURCE_TYPE_SUCCESS the expected initial state', () => {
    const data = [{
      name: 'data 1',
      id: 1,
      selected: true
    }, {
      name: 'data 2',
      id: 2,
      selected: false
    }];
    const state = reducers(initialState, {
      type: FETCH_RESOURCE_TYPE_SUCCESS,
      payload: {
        body: {
          items: data
        }
      }
    });

    const stateData = state.get('data').toJS();
    const stateSelected = state.get('selected').toJS();

    expect(stateData).toEqual([{
      name: 'data 1',
      text: 'data 1',
      id: 1,
      value: 1,
      selected: true
    }, {
      name: 'data 2',
      text: 'data 2',
      id: 2,
      value: 2,
      selected: false
    }]);
    expect(stateSelected).toEqual([1]);
    expect(state.get('disabledFacilityType')).toEqual(false);
  });

  it('FETCH_RESOURCE_TYPE_SUCCESS the expected initial state, if no selected data', () => {
    const initialState = fromJS({
      data: [],
      selected: [1],
      disabledFacilityType: false
    });
    const data = [{
      name: 'data 1',
      id: 1,
      selected: false
    }, {
      name: 'data 2',
      id: 2,
      selected: false
    }];
    const state = reducers(initialState, {
      type: FETCH_RESOURCE_TYPE_SUCCESS,
      payload: {
        body: {
          items: data
        }
      }
    });

    const stateData = state.get('data').toJS();
    const stateSelected = state.get('selected').toJS();

    expect(stateData).toEqual([{
      name: 'data 1',
      text: 'data 1',
      id: 1,
      value: 1,
      selected: false
    }, {
      name: 'data 2',
      text: 'data 2',
      id: 2,
      value: 2,
      selected: false
    }]);
    expect(stateSelected).toEqual([]);
    expect(state.get('disabledFacilityType')).toEqual(false);
  });

  it('FETCH_RESOURCE_TYPE_FAILURE the expected initial state', () => {
    const state = reducers(initialState, {
      type: FETCH_RESOURCE_TYPE_FAILURE
    });
    const stateData = state.get('data').toJS();

    expect(stateData).toEqual([]);
  });

  it('SET_RESOURCE_TYPE the expected initial state', () => {
    const value = [0];
    const state = reducers(initialState, {
      type: SET_RESOURCE_TYPE,
      payload: {
        value
      }
    });

    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual(value);
    expect(state.get('disabledFacilityType')).toEqual(false);
  });

  it('SET_RESOURCE_TYPE the expected initial state, if valuse is empty array', () => {
    const value = [];
    const state = reducers(initialState, {
      type: SET_RESOURCE_TYPE,
      payload: {
        value
      }
    });

    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual(value);
    expect(state.get('disabledFacilityType')).toEqual(false);
  });
})
