import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  PARTICIPANT_UI,
  PARTICIPANTS_UI
} from '../consts/actionTypes';

const initialState = fromJS({
  id: null,
  list: []
});

const handlers = {
  [PARTICIPANTS_UI](state, { payload: { participants } }) {
    if (participants) {
      return state.set('list', fromJS(participants));
    }
    return state;
  },
  [PARTICIPANT_UI](state, { payload: { participantId } }) {
    return state.set('id', participantId);
  }
};

export default reducerHandler(initialState, handlers);
