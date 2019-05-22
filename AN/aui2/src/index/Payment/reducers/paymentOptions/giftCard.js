import { fromJS } from 'immutable';
import find from 'lodash/find';
import normalizeData from 'shared/utils/normalizeData';
import objArrSort from 'shared/utils/sort';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  GIFTCARD as PaymentGiftCardId,
  REFUND_GIFTCARD as RefundGiftCard
} from '../../consts/paymentTypes';
import {
  GIFTCARD_FETCH_SUCCESS,
  GIFTCARD_CHANGE_OPTION,
  GIFTCARD_RESET_LIST,
  GIFTCARD_SET_LABLE,
  GIFTCARD_NEW_SET_ERROR,
  GIFTCARD_NEW_CLOSE,
  GIFTCARD_CHANGE_TYPE,
  GIFTCARD_NEW_IS_OVERRIDE_MIN,
  GIFTCARD_NEW_IS_OVERRIDE_MAX,
  GIFTCARD_SET_MAX_OVERRIDE,
  GIFTCARD_NEW_FETCH_INFO_SUCCESS,
  GIFTCARD_SET_AVALIABLE_AMOUNT,
  GIFTCARD_REMOVE_NEW
} from '../../actions/paymentOptions/giftCard';


const USE_NEW_CARD_VALUE = 'useNewGiftCard';

function getGiftCardList(list, pIsRefund = false) {
  /* eslint-disable no-param-reassign */
  list.forEach((item) => {
    if (pIsRefund) {
      const amount = item.gc_max_card_balance - item.gc_available_amount;
      item.amount = amount > 0 ? amount : 0;
      item.isMaxOverride = false;
      item.isMinOverride = true; // existing cards don't need to verify minimum
    }
    item.name = `${item.gc_type_name} #${item.gc_number}`;
    if (!pIsRefund) {
      item.name += ` ($${item.gc_available_amount})`;
    }
    /* eslint-enable */
  });

  const giftCardList = normalizeData(objArrSort(list, 'name'), {
    valueField: 'gc_id'
  });

  return giftCardList;
}

export function getInitialState(initData) {
  const { isRefund, paymentOptions } = initData;
  const giftCardId = isRefund ? RefundGiftCard : PaymentGiftCardId;
  const giftCardOption = find(paymentOptions, item => item.id === giftCardId);
  const giftCardLabel = giftCardOption ? giftCardOption.name : 'gift card';

  return fromJS({
    giftCardId,
    giftCardLabel,
    giftCardTypeList: normalizeData([]),
    giftCardTypeListValue: null,
    giftCardDropDown: normalizeData([]),
    giftCardDropDownValue: null,
    isUseNewGiftCard: false,
    newGiftCardError: '',
    newGiftCardDropDown: normalizeData([]),
    isNeedGiftCardNumber: true,
    isOverrideMinGiftCard: false,
    isOverrideMaxGiftCard: false,
    canUseNewGiftCard: false,
    minOverrideHasAccess: false,
    minOverrideExplanation: '',
    maxOverrideHasAccess: false,
    maxOverrideExplanation: '',
    isRefund,
    isNoCardChosen: true
  });
}

const handlers = {

  [GIFTCARD_SET_AVALIABLE_AMOUNT](state, { payload: { giftCardId: id, amount } }) {
    return state.withMutations((s) => {
      s.updateIn(['giftCardDropDown', 'data'], list =>
        list.map((gc) => {
          // istanbul ignore else
          if (gc.get('value') === id) {
            return gc.set('amount', amount);
          }
          return gc;
        })
      );

      s.updateIn(['newGiftCardDropDown', 'data'], list =>
        list.map((gc) => {
          // istanbul ignore else
          if (gc.get('value') === id) {
            return gc.set('amount', amount);
          }
          return gc;
        })
      );
    });
  },

  [GIFTCARD_NEW_FETCH_INFO_SUCCESS](state, { payload: { body: data } }) {
    return state.withMutations((s) => {
      const gcObj = data.gc;
      gcObj.value = gcObj.gc_id;
      gcObj.amount = 0;
      gcObj.isNewGiftCard = true;
      gcObj.text = gcObj.gc_type_name;
      gcObj.gc_available_amount = 0; // new card gc_available_amount should eq 0
      // istanbul ignore else
      if (gcObj.gc_number) {
        gcObj.text += ` #${gcObj.gc_number}`;
      }
      gcObj.isMinOverride = s.get('isOverrideMinGiftCard');
      gcObj.isMaxOverride = s.get('isOverrideMaxGiftCard');

      s.updateIn(['newGiftCardDropDown', 'data'], arr => arr.push(fromJS(gcObj)));
      s.set('newGiftCardError', '');
      s.set('isOverrideMinGiftCard', false);
      s.set('isOverrideMaxGiftCard', false);
      s.set('isUseNewGiftCard', false);
      s.set('giftCardDropDownValue', gcObj.value);
      s.set('isNoCardChosen', false);
    });
  },

  [GIFTCARD_SET_MAX_OVERRIDE](state, { payload: { value, isMax } }) {
    return state.withMutations((s) => {
      s.updateIn(['giftCardDropDown', 'data'], list =>
        list.map((gc) => {
          if (gc.get('value') === value) {
            // istanbul ignore else
            if (isMax) {
              return gc.set('isMaxOverride', true);
            }
          }
          return gc;
        })
      );

      s.updateIn(['newGiftCardDropDown', 'data'], list =>
        list.map((gc) => {
          if (gc.get('value') === value) {
            if (isMax) {
              return gc.set('isMaxOverride', true);
            }
            return gc.set('isMinOverride', true);
          }
          return gc;
        })
      );
    });
  },

  [GIFTCARD_NEW_IS_OVERRIDE_MIN](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('isOverrideMinGiftCard', value);
    });
  },

  [GIFTCARD_NEW_IS_OVERRIDE_MAX](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('isOverrideMaxGiftCard', value);
    });
  },

  [GIFTCARD_CHANGE_TYPE](state, { payload: { value } }) {
    return state.withMutations((s) => {
      const giftCardTypeList = s.get('giftCardTypeList').toJS();

      giftCardTypeList.data.forEach((type) => {
        if (type.value === value) {
          s.set('isNeedGiftCardNumber', type.number_model === 1);
        }
      });
      s.set('giftCardTypeListValue', value);
      s.set('isNoCardChosen', false);
    });
  },

  [GIFTCARD_NEW_CLOSE](state) {
    return state.withMutations((s) => {
      s.set('isUseNewGiftCard', false);
      s.set('isOverrideMinGiftCard', false);
      s.set('isOverrideMaxGiftCard', false);
      s.set('giftCardDropDownValue', null);
      s.set('isNoCardChosen', true);
    });
  },

  [GIFTCARD_NEW_SET_ERROR](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('newGiftCardError', value);
    });
  },

  [GIFTCARD_SET_LABLE](state, { payload: { value } }) {
    return state.withMutations((s) => {
      const giftCardTypeList = s.get('giftCardTypeList').toJS();

      if (s.get('isRefund') && giftCardTypeList) {
        const giftCardListData = s.get('giftCardDropDown').toJS();
        const values = giftCardListData.data.map(item => item.value);

        // istanbul ignore else
        if (s.get('canUseNewGiftCard')) {
          // istanbul ignore else
          if (!values.some(val => val === USE_NEW_CARD_VALUE)) {
            const USE_NEW_CARD_ENTITY = {
              value: USE_NEW_CARD_VALUE,
              text: `Issue a new ${value}`
            };

            giftCardListData.data.push(USE_NEW_CARD_ENTITY);
            s.set('giftCardDropDown', fromJS(giftCardListData));
          }
        }

        // istanbul ignore else
        if (giftCardTypeList.data.length) {
          s.set('giftCardTypeListValue', giftCardTypeList.data[0].value);
          s.set('isNeedGiftCardNumber', giftCardTypeList.data[0].number_model === 1);
        }
      }

      s.set('giftCardLabel', value);
    });
  },

  [GIFTCARD_FETCH_SUCCESS](state, { payload: { body: data } }) {
    return state.withMutations((s) => {
      let giftCardListData = null;
      const isInRefund = s.get('isRefund');
      if (isInRefund) {
        const refundData = data.gc_refund_info;
        const sortGiftCardTypeList = objArrSort(refundData.gc_type_list, 'gc_type_name');
        const giftCardTypeList = sortGiftCardTypeList.length ?
          normalizeData(sortGiftCardTypeList, {
            valueField: 'gc_type_id',
            textField: 'gc_type_name'
          }) : null;

        giftCardListData = getGiftCardList(refundData.gc_list, isInRefund);

        if (giftCardTypeList) {
          s.set('giftCardTypeList', fromJS(giftCardTypeList));
        }

        s.set('canUseNewGiftCard', refundData.refund_to_new_gc);
        s.set('minOverrideHasAccess', refundData.min_override_has_access);
        s.set('minOverrideExplanation', refundData.min_override_explanation);
        s.set('maxOverrideHasAccess', refundData.max_override_has_access);
        s.set('maxOverrideExplanation', refundData.max_override_explanation);
      } else {
        giftCardListData = getGiftCardList(data.gc_list);
      }

      s.set('giftCardDropDown', fromJS(giftCardListData));
      s.set('giftCardDropDownValue', null);
      s.set('isNoCardChosen', false);
    });
  },

  [GIFTCARD_CHANGE_OPTION](state, { payload: { value } }) {
    return state.withMutations((s) => {
      // istanbul ignore else
      if (value !== USE_NEW_CARD_VALUE) {
        s.set('giftCardDropDownValue', value);
      }
      s.set('isUseNewGiftCard', value === USE_NEW_CARD_VALUE);
    });
  },

  [GIFTCARD_RESET_LIST](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('giftCardDropDownValue', value);
      s.set('isNoCardChosen', false);
    });
  },

  [GIFTCARD_REMOVE_NEW](state, { payload: { delGiftCardId } }) {
    return state.withMutations((s) => {
      s.updateIn(['newGiftCardDropDown', 'data'], list =>
        list.filterNot(item => item.get('gc_id') === delGiftCardId)
      );
    });
  }
};

export default function getGiftCardReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
