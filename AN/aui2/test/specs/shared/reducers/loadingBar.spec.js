import { fromJS, is } from 'immutable';
import { LOADING_BAR_SHOW, LOADING_BAR_HIDE } from 'shared/actions/loadingBar';
import reducers from 'shared/reducers/loadingBar';

describe('shared/reducers/loadingBar', () => {
  const getInitialState = () => fromJS({
    display: false,
    text: ''
  });

  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(getInitialState(), state)).toBe(true);
  });

  it('Show loading bar by default', () => {
    const action = {
      type: LOADING_BAR_SHOW
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('display')).toBe(true);
    expect(state.get('text')).toBe('');
  });

  it('Show loading bar without tooltip text', () => {
    const action = {
      type: LOADING_BAR_SHOW,
      payload: {}
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('display')).toBe(true);
    expect(state.get('text')).toBe('');
  });

  it('Show loading bar with tooltip text', () => {
    const text = 'loading bar tooltip text';
    const action = {
      type: LOADING_BAR_SHOW,
      payload: {
        text
      }
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('display')).toBe(true);
    expect(state.get('text')).toBe(text);
  });

  it('Hide loading bar success', () => {
    const action = {
      type: LOADING_BAR_HIDE
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('display')).toBe(false);
    expect(state.get('text')).toBe('');
  });
});
