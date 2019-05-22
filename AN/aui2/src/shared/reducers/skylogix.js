import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import { getCurrentInitState } from 'shared/utils/initStateHelper';
import UPDATE_SKYLOGIX_SUCCESS from 'shared/consts/skylogixTypes';

const { showLightingPINRequired, isLightingPINRequired } = getCurrentInitState();

const initialState = fromJS({
  showLightingPINRequired,
  isLightingPINRequired
});


const handlers = {
  [UPDATE_SKYLOGIX_SUCCESS](state, { payload: { is_lighting_PIN_required } }) {
    return state.withMutations((s) => {
      s.set('isLightingPINRequired', is_lighting_PIN_required);
    });
  }
};

export default reducerHandler(initialState, handlers);
