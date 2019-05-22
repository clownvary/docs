import { fromJS } from 'immutable';
import map from 'lodash/map';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  GIFTCARD_UI_DISABLE_APPLY,
  GIFTCARD_UI_GIFTCARD_LIST,
  GIFTCARD_UI_SHOW_ERROR,
  GIFTCARD_ON_UPDATE,
  GIFTCARD_RESET
} from '../consts/actionTypes';

const initialState = fromJS({
  applyBtnEnable: false,
  errorMessage: '',
  errorMessageShow: false,
  cardNumber: '',
  giftCardList: [],
  appledCardLlist: []
});

const handlers = {
  [GIFTCARD_UI_GIFTCARD_LIST](state,
    { payload: { gift_certificate_list, apply_certificate_list } }) {
    const noAppliedList = map(gift_certificate_list, item => ({
      id: item.gift_certificate_id,
      value: item.gift_certificate_number,
      text: item.gift_certificate_number,
      label: item.gift_certificate_type_name,
      balance: item.available_amount
    }));
    const appliedlist = map(apply_certificate_list, _item => ({
      id: _item.gift_certificate_id,
      cardType: _item.gift_certificate_type_name,
      cardNumber: _item.gift_certificate_number,
      paymentAmount: _item.payment_amount,
      availableAmount: _item.available_amount
    }));
    return state.withMutations((s) => {
      s.set('giftCardList', fromJS(noAppliedList));
      s.set('appledCardLlist', fromJS(appliedlist));
    });
  },
  [GIFTCARD_ON_UPDATE](state, { payload }) {
    return state.withMutations(
      s => s.set('cardNumber', payload)
    );
  },
  [GIFTCARD_UI_DISABLE_APPLY](state, { payload: { disable } }) {
    return state.withMutations(
      s => s.set('applyBtnEnable', disable)
    );
  },
  [GIFTCARD_UI_SHOW_ERROR](state, { payload: { show, errMsg } }) {
    return state.withMutations(
      (s) => {
        s.set('errorMessageShow', show);
        s.set('errorMessage', errMsg);
      }
    );
  },
  [GIFTCARD_RESET]() {
    return initialState;
  }
};

export default reducerHandler(initialState, handlers);
