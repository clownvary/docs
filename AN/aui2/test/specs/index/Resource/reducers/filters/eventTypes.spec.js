import { fromJS } from 'immutable';
import {
  FETCH_EVENT_TYPE_SUCCESS,
  FETCH_EVENT_TYPE_FAILURE,
  SET_EVENT_TYPE
} from 'index/Resource/actions/resourceFilters.js';
import getEventTypesReducer from 'index/Resource/reducers/filters/eventTypes';

const reducers = getEventTypesReducer(__resourceCalender__.__initialState__);

describe('index/Resource/reducers/filters/eventTypes.js', () => {

  const initialState = fromJS({
    data: [],
    selected: []
  });

  it('FETCH_EVENT_TYPE_SUCCESS the expected initial state', () => {
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
      type: FETCH_EVENT_TYPE_SUCCESS,
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
  });

  it('FETCH_EVENT_TYPE_FAILURE the expected initial state', () => {
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
      type: FETCH_EVENT_TYPE_FAILURE,
      payload: {
        body: {
          items: data
        }
      }
    });
    const stateData = state.get('data').toJS();

    expect(stateData).toEqual([]);
  });

  it('SET_EVENT_TYPE the expected initial state', () => {
    const value = [1];
    const state = reducers(initialState, {
      type: SET_EVENT_TYPE,
      payload: {
        value
      }
    });

    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual(value);
  });
})
