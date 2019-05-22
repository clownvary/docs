import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';
import {
  RECEIPTSUMMARY_UI_LIST
} from '../consts/actionTypes';

const initialState = fromJS({
  receiptNumber: [],
  showWidgets: true,
  sharingActivityName: '',
  sharingActivityId: '',
  paymentInfo: [],
  orderSummary: [],
  payOnAccount: [],
  participants: [],
  paymentMethod: [],
  paymentType: ''
});

const handlers = {
  [RECEIPTSUMMARY_UI_LIST](state, {
    payload: {
      receiptNumber,
      paymentInfo,
      orderSummary,
      payOnAccount,
      participants,
      showWidgets,
      sharingActivityName,
      sharingActivityId,
      paymentMethod,
      paymentType
    }
  }) {
    return state.withMutations((s) => {
      s.set('receiptNumber', fromJS(receiptNumber));
      s.set('paymentInfo', fromJS(paymentInfo));
      s.set('orderSummary', fromJS(orderSummary));
      s.set('payOnAccount', fromJS(payOnAccount));
      s.set('participants', fromJS(participants));
      s.set('showWidgets', showWidgets);
      s.set('sharingActivityName', sharingActivityName);
      s.set('sharingActivityId', sharingActivityId);
      s.set('paymentMethod', paymentMethod);
      s.set('paymentType', paymentType);
    });
  }
};

export default reducerHandler(initialState, handlers);
