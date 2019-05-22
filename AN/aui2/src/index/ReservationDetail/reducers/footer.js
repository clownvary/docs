import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  NEED_PAY_FOR_RESERVATION_CHANGES,
  IS_CLICKED_CONFIRM_CHANGES
} from '../actions/footer';

const initialState = fromJS({
  isShouldPay: false,
  isClickedConfirmChanges: false
});

const handlers = {

  [NEED_PAY_FOR_RESERVATION_CHANGES](state, { payload: {
    isShouldPay,
    confirmChangeReceiptId,
    confirmChangeDraftReceiptId
  } }) {
    return state.withMutations((s) => {
      s.set('isShouldPay', isShouldPay);
      s.set('confirmChangeReceiptId', confirmChangeReceiptId);
      s.set('confirmChangeDraftReceiptId', confirmChangeDraftReceiptId);
    });
  },

  [IS_CLICKED_CONFIRM_CHANGES](state, { payload: { isClickedConfirmChanges = true } }) {
    return state.set('isClickedConfirmChanges', isClickedConfirmChanges);
  }
};

export default reducerHandler(initialState, handlers);
