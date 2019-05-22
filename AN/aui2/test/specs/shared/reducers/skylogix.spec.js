import { fromJS, is } from 'immutable';
import UPDATE_SKYLOGIX_SUCCESS from 'shared/consts/skylogixTypes';
import reducers from 'shared/reducers/skylogix';

describe('shared/reducers/skylogix', () => {
  const getInitialState = () => fromJS({
    showLightingPINRequired: true,
    isLightingPINRequired: true
  });

  it.skip('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(getInitialState(), state)).toBe(true);
  });

  it('Update skylogix success', () => {
    const action = {
      type: UPDATE_SKYLOGIX_SUCCESS,
      payload: {
        is_lighting_PIN_required: false
      }
    };
    const state = reducers(getInitialState(), action);
    expect(state.get('showLightingPINRequired')).toBe(true);
    expect(state.get('isLightingPINRequired')).toBe(false);
  });
});
