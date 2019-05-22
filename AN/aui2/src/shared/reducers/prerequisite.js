import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  PREREQUISITE_ADD_ERRORS,
  PREREQUISITE_CLEAR_ERRORS,
  PREREQUISITE_UPDATE_USER_NAME,
  PREREQUISITE_UPDATE_USER_PASSWORD,
  PREREQUISITE_UPDATE_OVERRIDE,
  PREREQUISITE_UPDATE_OVERRIDE_AUTHORITY,
  PREREQUISITE_UPDATE_NEED_OVERRIDE,
  PREREQUISITE_UPDATE_OVERRIDE_MESSAGE
} from '../actions/prerequisite';

const initialState = fromJS({
  errors: [],
  needOverride: false,
  userName: '',
  userPassword: '',
  isOverride: false,
  haveOverrideAuthority: false,
  overrideMessage: ''
});

const handlers = {
  [PREREQUISITE_ADD_ERRORS](state, {
    payload: {
      errors
    }
  }) {
    return state.set('errors', fromJS(errors));
  },

  [PREREQUISITE_CLEAR_ERRORS](state, { payload: { errorIndex } }) {
    if (errorIndex > -1) {
      return state.set('errors', state.get('errors').splice(errorIndex, 1));
    }
    return state.set('errors', fromJS([]));
  },

  [PREREQUISITE_UPDATE_OVERRIDE](state, { payload: { isOverride } }) {
    return state.set('isOverride', isOverride);
  },

  [PREREQUISITE_UPDATE_NEED_OVERRIDE](state, { payload: { needOverride } }) {
    return state.set('needOverride', needOverride);
  },

  [PREREQUISITE_UPDATE_USER_NAME](state, { payload: { value } }) {
    return state.set('userName', value);
  },

  [PREREQUISITE_UPDATE_USER_PASSWORD](state, { payload: { value } }) {
    return state.set('userPassword', value);
  },

  [PREREQUISITE_UPDATE_OVERRIDE_AUTHORITY](state, { payload: { haveOverrideAuthority } }) {
    return state.set('haveOverrideAuthority', haveOverrideAuthority);
  },

  [PREREQUISITE_UPDATE_OVERRIDE_MESSAGE](state, { payload: { overrideMessage } }) {
    return state.set('overrideMessage', overrideMessage);
  }
};

export default reducerHandler(initialState, handlers);
