import { is, fromJS } from 'immutable';
import pinpadFailReducer from 'index/Payment/components/Modals/PinPad/reducers/pinpadFail';
import * as actions from 'index/Payment/components/Modals/PinPad/actions/pinpadFail';

const expectedInitialState = fromJS({
  shown: false
});

describe('index -> Payment -> components -> Modals -> PinPad -> reducers -> pinpadFail', () => {
  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, pinpadFailReducer(undefined, {}))).toBe(true);
  });

  it('Should update the pinpad fail actions button status correctly', () => {
    const { SHOW_OR_HIDE_FAIL_ACTIONS_BTNS } = actions;

    const state = pinpadFailReducer(undefined, {
      type: SHOW_OR_HIDE_FAIL_ACTIONS_BTNS,
      payload: {
        shown: true
      }
    });

    expect(state.get('shown')).toBe(true);
  });
});
