import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  FORM_ERROR_UI,
  FORM_ERROR_CLEAN_UI,
  FORM_ENTRY_UI,
  UPDATE_LOGINED_CUSTOMER_ID,
  FORM_SCHEDULE_CONFLICT
} from '../consts/actionTypes';

const initialError = {
  required: false,
  messages: []
};

const initialState = fromJS({
  programName: '',
  error: {
    participant: initialError,
    session: initialError,
    pickup: initialError,
    question: initialError
  },
  scheduleConflict: false
});

const handlers = {
  [FORM_ENTRY_UI](state, { payload: { name } }) {
    return state.set('programName', name);
  },

  [UPDATE_LOGINED_CUSTOMER_ID](state, { payload: { loginedCustomerId } }) {
    return state.set('loginedCustomerId', loginedCustomerId);
  },

  [FORM_ERROR_UI](state, { payload: { section, key, value } }) {
    return state.setIn(['error', section, key], fromJS(value));
  },

  [FORM_ERROR_CLEAN_UI](state, { payload: { section } }) {
    return state.setIn(['error', section], fromJS(initialError));
  },

  [FORM_SCHEDULE_CONFLICT](state, { payload: show }) {
    return state.set('scheduleConflict', show);
  }
};

export default reducerHandler(initialState, handlers);
