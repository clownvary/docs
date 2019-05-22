import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  FETCH_SPECIAL_HANDLING_STATUS_SUCCESS,
  FETCH_SPECIAL_HANDLING_INFO_SUCCESS,
  RESET_SPECIAL_HANDLING,
  TOGGLE_SPECIAL_HANDLING
} from '../actions/specialHandling';

const initialState = fromJS({
  customerId: '',
  specialHandling: false,
  shown: false
});

const handlers = {
  [FETCH_SPECIAL_HANDLING_STATUS_SUCCESS](state, { payload: { body: {
    customer_special_handling_info: info } } }) {
    const {
      customer_id: customerId,
      customer_special_handling: specialHandling
    } = info;
    return state.withMutations((s) => {
      s.set('customerId', customerId);
      s.set('specialHandling', specialHandling);
    });
  },

  [FETCH_SPECIAL_HANDLING_INFO_SUCCESS](state, { payload: { body: {
    customer_alert_info: alertInfo } } }) {
    return state.withMutations((s) => {
      s.set('customerName', alertInfo.customer_name);
      s.set('notes', alertInfo.customer_notes);
      s.set('medicalAlert', alertInfo.customer_medical_alert);
      s.set('medicalAlertShown', alertInfo.show_customer_medical_alert);
      s.set('generalAlert', alertInfo.customer_general_alert);
      s.set('shown', true);
    });
  },

  [RESET_SPECIAL_HANDLING]() {
    return initialState;
  },

  [TOGGLE_SPECIAL_HANDLING](state, { payload: { shown } }) {
    return state.set('shown', shown);
  }
};

export default reducerHandler(initialState, handlers);
