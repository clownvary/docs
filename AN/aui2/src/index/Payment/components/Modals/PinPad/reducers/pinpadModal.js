import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import reducerHandler from 'shared/utils/reducerHandler';
import getPinpadPaymentReducer from './pinpad';
import pinpadFail from './pinpadFail';
import {
  UPDATE_MODAL_TITLE,
  OPEN_OR_HIDE_MODAL,
  SET_APD_INTERFACE_APPLET
} from '../actions/pinpadModal';

const initialState = fromJS({
  title: 'Processing Transaction',
  shown: false
});

const handlers = {
  [UPDATE_MODAL_TITLE](state, { payload: { title } }) {
    return state.set('title', title);
  },

  [OPEN_OR_HIDE_MODAL](state, { payload: { shown } }) {
    return state.set('shown', shown);
  },

  [SET_APD_INTERFACE_APPLET](state, { payload: { value } }) {
    return state.set('apdInterfaceApplet', value);
  }
};

export const pinpadModal = reducerHandler(initialState, handlers);

export default function getPinpadReducer(initData) {
  return combineReducers({
    pinpadModal,
    pinpadFail,
    payment: getPinpadPaymentReducer(initData)
  });
}
