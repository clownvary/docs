/**
 * todo: refactor dependency resolver inside karma.conf.js
 * so we can properly resolve linting errors that occur when
 * importing from json/** directory
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { is, fromJS } from 'immutable';
import runningCartReducer from 'shared/reducers/runningCart';
import jsonRunningCart from 'json/Cart/runningCart.json';
import {
  FETCH_RUNNINGCART,
  FETCH_RUNNINGCART_SUCCESS,
  FETCH_RUNNINGCART_FAILURE
} from 'shared/actions/runningCart';

const expectedInitialState = fromJS({
  cartList: [],
  cartLoading: false,
  error: false
});

describe('shared -> reducers -> runningCart', () => {
  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, runningCartReducer(undefined, {}))).toBe(true);
  });

  it('Should show loading when fetch cart list', () => {
    const state = runningCartReducer(undefined, {
      type: FETCH_RUNNINGCART
    });

    expect(state.get('cartLoading')).toBe(true);
  });

  it('Should fetch cart list successfully', () => {
    const state = runningCartReducer(undefined, {
      type: FETCH_RUNNINGCART_SUCCESS,
      payload: jsonRunningCart
    });

    expect(state.get('cartList').toJS()).toHaveLength(3);
    expect(state.get('cartLoading')).toBe(false);
    expect(state.get('error')).toBe(false);
  });

  it('Should fetch cart list successfully but no data', () => {
    const state = runningCartReducer(expectedInitialState, {
      type: FETCH_RUNNINGCART_SUCCESS,
      payload: {
        body: {}
      }
    });
    expect(is(expectedInitialState, state)).toBe(true);
  });

  it('Should has error message when fetch cart list error and the error not the session time out error', () => {
    const errorMessage = 'Opts, Error Fetch Cart List';
    const fetchRessponse = fromJS(jsonRunningCart).setIn(['headers', 'response_code'], '1002').setIn(['headers', 'response_message'], errorMessage).toJS();

    const state = runningCartReducer(undefined, {
      type: FETCH_RUNNINGCART_FAILURE,
      error: {
        payload: fetchRessponse
      }
    });

    expect(state.get('cartLoading')).toBe(false);
    expect(state.get('error')).toBe(errorMessage);
  });

  it('Should show loading when fetch cart list session time out error', () => {
    const fetchRessponse = fromJS(jsonRunningCart).setIn(['headers', 'response_code'], '0002').toJS();

    const state = runningCartReducer(undefined, {
      type: FETCH_RUNNINGCART_FAILURE,
      error: {
        payload: fetchRessponse
      }
    });

    expect(state.get('cartLoading')).toBe(true);
    expect(state.get('error')).toBe(false);
  });
});
