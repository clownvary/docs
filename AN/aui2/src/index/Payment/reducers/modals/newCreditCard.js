import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import {
  FETCH_CARD_TYPE_ACTION_SUCCESS,
  SHOW_CC_MODAL_ACTION,
  CHANGE_EXPIRATION_DATE_MONTH_ACTION,
  CHANGE_EXPIRATION_DATE_YEAR_ACTION,
  IS_CHECKED_FOR_PAY_ACTION
} from '../../actions/modals/NewCreditCard';

const EMPTYERROR = {
  ccNumber: '',
  ccNumber_cardType: '',
  ccExpiry: '',
  savedCard: ''
};

let initialData = {};

const getInitialState = (initData) => {
  const {
    cardTypeList
  } = initData;
  const currentMonth = DateTimeFormat.getServerTodayDate().getMonth() + 1;
  const currentYear = DateTimeFormat.getServerTodayDate().getFullYear();
  /* istanbul ignore next */
  return {
    cardTypeName: null,
    cardTypeID: null,
    cardTypeValue: null,
    cardTypeList: normalizeData(cardTypeList || [], {
      valueField: 'id',
      textField: 'card_type'
    }),
    cardTypeValidation: {
      validation: null,
      showIcon: false,
      showDropDown: false
    },
    ExpirationDateMonthValue: currentMonth || '',
    ExpirationDateMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      .map(item => ({ value: item, text: item })),
    ExpirationDateYearValue: currentYear || '',
    ExpirationDateYear: Array(...{ length: 11 }).map((v, i) => {
      const val = i + currentYear;
      return { value: val, text: val };
    }),
    errorMsgs: fromJS(EMPTYERROR),
    showModel: false,
    ccTypeDropdown: false,
    CCNumberValue: '',
    isCheckedForPay: false
  };
};

const handlers = {

  [IS_CHECKED_FOR_PAY_ACTION](state, { payload: { value } }) {
    return state.set('isCheckedForPay', value);
  },

  [CHANGE_EXPIRATION_DATE_MONTH_ACTION](state, { payload: { value } }) {
    return state.set('ExpirationDateMonthValue', value);
  },

  [CHANGE_EXPIRATION_DATE_YEAR_ACTION](state, { payload: { value } }) {
    return state.set('ExpirationDateYearValue', value);
  },

  [SHOW_CC_MODAL_ACTION](state, { payload: { value } }) {
    if (!value) {
      return fromJS(initialData).set('cardTypeList', state.get('cardTypeList'));
    }

    return state.withMutations((s) => {
      s.set('isCheckedForPay', false);
      s.set('showModel', value);
    });
  },

  [FETCH_CARD_TYPE_ACTION_SUCCESS](state, { payload: { body: { card_type_list } } }) {
    const dropDownData = normalizeData(card_type_list, {
      valueField: 'id',
      textField: 'card_type'
    });
    return state.withMutations((s) => {
      dropDownData.selected[0] && s.set('cardTypeValue', dropDownData.selected[0].value);
      s.set('cardTypeList', fromJS(dropDownData));
    });
  }

};

export default function getNewCreditCardReducer(initData) {
  const initialState = getInitialState(initData);
  initialData = initialState;
  return reducerHandler(fromJS(initialState), handlers);
}
