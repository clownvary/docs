import { fromJS } from 'immutable';
import {
  FETCH_ON_BOARDING_SUCCESS,
  UPDATE_ON_BOARDING_SUCCESS,
  READY_ON_BOARDING
} from 'index/Resource/actions/onboarding';
import reducer from 'index/Resource/reducers/onboarding';

const defaultStates = {
  hideIntro: true,
  ready: false
}

const setup = (initialState) => {
  const state = reducer(fromJS(initialState), {});
  const jsState = state.toJS();
  return {
    state,
    jsState
  }
}

describe('Resource/reducers/onboarding', () => {
  test('has expect inital state', () => {
    const { jsState } = setup();
    expect(jsState).toEqual(defaultStates);
  });

  test('FETCH_ON_BOARDING_SUCCESS set hideIntro as expect', () => {
    const { state, jsState } = setup({ ...defaultStates, hideIntro: false });
    expect(jsState.hideIntro).toBe(false);

    let newState = reducer(state, {
      type: FETCH_ON_BOARDING_SUCCESS,
      payload: {
        body: { result: 'true' }
      }
    });

    expect(newState.get('hideIntro')).toBe(true);

    newState = reducer(state, {
      type: FETCH_ON_BOARDING_SUCCESS,
      payload: {
        body: { result: 'false' }
      }
    });

    expect(newState.get('hideIntro')).toBe(false);
  });

  test('UPDATE_ON_BOARDING_SUCCESS set hidIntro to true', () => {
    const { state, jsState } = setup({ ...defaultStates, hideIntro: false });
    expect(jsState.hideIntro).toBe(false);

    const newState = reducer(state, {
      type: UPDATE_ON_BOARDING_SUCCESS
    });

    expect(newState.get('hideIntro')).toBe(true);
  });

  test('READY_ON_BOARDING set ready to true', () => {
    const { state, jsState } = setup();

    expect(jsState.ready).toBe(false);

    const newState = reducer(state, {
      type: READY_ON_BOARDING
    });

    expect(newState.get('ready')).toBe(true);
  });
});
