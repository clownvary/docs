import { is, fromJS } from 'immutable';
import { WINDOW_RESIZE } from 'index/Confirmation/actions';
import reducers from 'index/Confirmation/reducers';

describe('index/Confirmation/reducers/index', () => {
  const initialState = fromJS({
    resize: false
  });

  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(initialState, state)).toBe(true);
  });

  it('Should window resize works fine', () => {
    const bodyHeight = 800;
    const state = reducers(initialState, {
      type: WINDOW_RESIZE,
      payload: {
        value: 800
      }
    });

    expect(state.get('resize')).toBe(bodyHeight);
  });
});
