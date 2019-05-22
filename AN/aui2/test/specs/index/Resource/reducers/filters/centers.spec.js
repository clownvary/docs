import { fromJS } from 'immutable';
import {
  FETCH_CENTERS_SUCCESS,
  FETCH_CENTERS_FAILURE,
  SET_CENTER,
  CLEAR_ERRMSG
} from 'index/Resource/actions/resourceFilters.js';
import getCentersReducer from 'index/Resource/reducers/filters/centers';

const reducers = getCentersReducer(__resourceCalender__.__initialState__);

describe('index/Resource/reducers/filters/centers.js', () => {

  const initialState = fromJS({
    data: [1],
    selected: [],
    errMsg: 'error'
  });

  it('FETCH_CENTERS_SUCCESS the expected initial state', () => {
    const data = [{
      id: 1,
      selected: true
    }, {
      id: 2,
      selected: false
    }];
    const state = reducers(initialState, {
      type: FETCH_CENTERS_SUCCESS,
      payload: {
        body: {
          items: data
        }
      }
    });
    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual([1]);
  });

  it('FETCH_CENTERS_FAILURE the expected initial state', () => {
    const data = [{
      id: 1,
      selected: true
    }, {
      id: 2,
      selected: false
    }];
    const state = reducers(initialState, {
      type: FETCH_CENTERS_FAILURE,
      payload: {
        body: {
          items: data
        }
      }
    });
    const stateSelected = state.get('selected').toJS();

    expect(stateSelected).toEqual([]);
  });

  it('SET_CENTER the expected initial state', () => {
    const value = [1];
    const errMsg = 'error message';
    const state = reducers(initialState, {
      type: SET_CENTER,
      payload: {
        value,
        errMsg
      }
    });

    const stateSelected = state.get('selected').toJS();
    const stateErrMsg = state.get('errMsg');

    expect(stateSelected).toEqual(value);
    expect(stateErrMsg).toEqual(errMsg);
  });

  it('CLEAR_ERRMSG the expected initial state', () => {
    const state = reducers(initialState, {
      type: CLEAR_ERRMSG
    });
    const stateErrMsg = state.get('errMsg');

    expect(stateErrMsg).toEqual('');
  });
})
