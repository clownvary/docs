import { is, fromJS } from 'immutable';
import normalizeData from 'shared/utils/normalizeData';
import getGiftCardReducer from 'index/Payment/reducers/paymentOptions/giftCard';
import * as actions from 'index/Payment/actions/paymentOptions/giftCard';
import issueGiftCardJSON from 'json/Payment/issueGiftCard.json';
import giftCardListJSON from 'json/Payment/giftCardList.json';
import refundGiftCardListJSON from 'json/Payment/refundGiftCardList.json';
import {GIFTCARD_REMOVE_NEW} from 'index/Payment/actions/paymentOptions/giftCard';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

const giftCardReducer = getGiftCardReducer(__payment__.__initialState__);

const initialState = {
  giftCardId: 7,
  giftCardLabel: 'Gift Card',
  giftCardTypeList: {
    data: [
      {
        external_number_numeric_only: false,
        is_external_number_enforce_mask: true,
        gift_card_number_mask: "###.###.##",
        available_for_all_sites: true,
        min_sale_amount: 30,
        condition_of_use: "",
        revenue_gl_account_id: 13,
        hide_on_internet: true,
        amount_can_be_changed_online: true,
        prevent_further_use: false,
        max_card_balance: 40,
        gc_type_name: "gc-mask1",
        text: "gc-mask1",
        amount_can_be_changed: true,
        value: 4,
        number_model: 1,
        min_refill_amount: 10,
        default_amount: 30,
        expire_type: 0,
        gc_type_id: 4,
      }, {
        external_number_numeric_only: false,
        is_external_number_enforce_mask: false,
        gift_card_number_mask: "",
        available_for_all_sites: true,
        min_sale_amount: 30,
        condition_of_use: "",
        revenue_gl_account_id: 13,
        hide_on_internet: false,
        amount_can_be_changed_online: false,
        prevent_further_use: false,
        max_card_balance: 30,
        gc_type_name: "New gift",
        text: "New gift",
        amount_can_be_changed: true,
        value: 2,
        number_model: 0,
        min_refill_amount: 30,
        default_amount: 30,
        expire_type: 0,
        gc_type_id: 2,
      }
    ],
    selected: []
  },
  giftCardTypeListValue: null,
  giftCardDropDown: {
    data: [
      {
        gc_company_id: 0,
        gc_status_id: 2,
        name: "gc-mask1 #111.222.33 ($30)",
        gc_expire_date: -2209132800000,
        gc_number: "111.222.33",
        gc_type_name: "gc-mask1",
        text: "gc-mask1 #111.222.33 ($30)",
        value: 32,
        gc_available_amount: 30,
        gc_liability_gl_account_id: 13,
        gc_is_expired: false,
        gc_status_name: "Active",
        gc_purchased_amount: 30,
        gc_redeemed_amount: 0,
        gc_customer_id: 7250,
        gc_type_id: 4,
        gc_id: 32,
        gc_refilled_amount: 0
      },
      {
        gc_company_id: 0,
        gc_status_id: 2,
        name: "Gift Certificate Type 1 #3352398323319672943236 ($20)",
        gc_expire_date: -2209132800000,
        gc_number: "3352398323319672943236",
        gc_type_name: "Gift Certificate Type 1",
        text: "Gift Certificate Type 1 #3352398323319672943236 ($20)",
        value: 31,
        gc_available_amount: 20,
        gc_liability_gl_account_id: 13,
        gc_is_expired: false,
        gc_status_name: "Active",
        gc_purchased_amount: 20,
        gc_redeemed_amount: 0,
        gc_customer_id: 7250,
        gc_type_id: 1,
        gc_id: 31,
        gc_refilled_amount: 0
      },
      {
        gc_company_id: 0,
        gc_status_id: 2,
        name: "New gift #4590431054552178715072 ($28)",
        gc_expire_date: -2209132800000,
        gc_number: "4590431054552178715072",
        gc_type_name: "New gift",
        text: "New gift #4590431054552178715072 ($28)",
        value: 30,
        gc_available_amount: 28,
        gc_liability_gl_account_id: 13,
        gc_is_expired: false,
        gc_status_name: "Active",
        gc_purchased_amount: 30,
        gc_redeemed_amount: 2,
        gc_customer_id: 7250,
        gc_type_id: 2,
        gc_id: 30,
        gc_refilled_amount: 0
      }
    ],
    selected: []
  },
  giftCardDropDownValue: null,
  isUseNewGiftCard: false,
  newGiftCardError: '',
  newGiftCardDropDown: {
    data: [{
      gc_company_id: 0,
      gc_min_sale_amount: 20,
      gc_status_id: 1,
      isMaxOverride: true,
      gc_max_card_balance: 50,
      gc_expire_date: -2209132800000,
      gc_number: "11.2.002",
      gc_type_name: "amount-external-changeable",
      text: "amount-external-changeable #11.2.002",
      value: 62,
      gc_available_amount: 0,
      gc_liability_gl_account_id: 13,
      gc_is_expired: false,
      isMinOverride: false,
      gc_status_name: "Pending",
      isNewGiftCard: true,
      gc_purchased_amount: 40,
      amount: "370.00",
      gc_redeemed_amount: 0,
      gc_customer_id: 0,
      gc_type_id: 9,
      gc_id: 62,
      gc_refilled_amount: 0
    }],
    selected: []
  },
  isNeedGiftCardNumber: true,
  isOverrideMinGiftCard: false,
  isOverrideMaxGiftCard: false,
  canUseNewGiftCard: true,
  minOverrideHasAccess: false,
  minOverrideExplanation: '',
  maxOverrideHasAccess: false,
  maxOverrideExplanation: ''
};
const expectedInitialState = fromJS(initialState);

describe('index -> Payment -> reducers -> paymentOptions -> giftCard', () => {
  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, giftCardReducer(expectedInitialState, {}))).toEqual(true);
  });

  it('Should update the gift card amount correctly', () => {
    const { GIFTCARD_SET_AVALIABLE_AMOUNT } = actions;
    const giftCardId = 0;
    const amount = 120;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_SET_AVALIABLE_AMOUNT,
      payload: {
        giftCardId,
        amount
      }
    });

    expect(state.get('giftCardDropDown')).toEqual(expectedInitialState.get('giftCardDropDown'));
    expect(state.get('newGiftCardDropDown')).toEqual(expectedInitialState.get('newGiftCardDropDown'));
  });

  it('Should update the gift card amount correctly when updated gift card exist in the giftCardDropDown list.', () => {
    const { GIFTCARD_SET_AVALIABLE_AMOUNT } = actions;
    const giftCardId = 32;
    const amount = 120;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_SET_AVALIABLE_AMOUNT,
      payload: {
        giftCardId,
        amount
      }
    });

    expect(state.get('giftCardDropDown')).toEqual(expectedInitialState.setIn(
      ['giftCardDropDown', 'data', 0, 'amount'], amount).get('giftCardDropDown')
    );
    expect(state.get('newGiftCardDropDown')).toEqual(expectedInitialState.get('newGiftCardDropDown'));
  });

  it('Should update the gift card amount correctly when updated gift card exist in the newGiftCardDropDown list.', () => {
    const { GIFTCARD_SET_AVALIABLE_AMOUNT } = actions;
    const giftCardId = 62;
    const amount = 120;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_SET_AVALIABLE_AMOUNT,
      payload: {
        giftCardId,
        amount
      }
    });

    expect(state).toEqual(expectedInitialState.setIn(
      ['newGiftCardDropDown', 'data', 0, 'amount'], amount)
    );
  });

  it('Should set data correctly after add new gift card succuessfully.', () => {
    const { GIFTCARD_NEW_FETCH_INFO_SUCCESS } = actions;
    const giftCardId = 0;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_NEW_FETCH_INFO_SUCCESS,
      payload: issueGiftCardJSON
    });

    expect(state.get('newGiftCardError')).toEqual('');
    expect(state.get('isOverrideMinGiftCard')).toEqual(false);
    expect(state.get('isOverrideMaxGiftCard')).toEqual(false);
    expect(state.get('isUseNewGiftCard')).toEqual(false);
    expect(state.get('newGiftCardError')).toEqual('');
    expect(state.get('giftCardDropDownValue')).toEqual(62);
  });

  it('Should set max override correctly', () => {
    const { GIFTCARD_SET_MAX_OVERRIDE } = actions;
    const value = 0;
    const isMax = false;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_SET_MAX_OVERRIDE,
      payload: {
        value,
        isMax
      }
    });

    expect(state.get('giftCardDropDown')).toEqual(expectedInitialState.get('giftCardDropDown'));
    expect(state.get('newGiftCardDropDown')).toEqual(expectedInitialState.get('newGiftCardDropDown'));
  });

  it('Should set max override correctly when updated value existed in the giftCardDropDown', () => {
    const { GIFTCARD_SET_MAX_OVERRIDE } = actions;
    const value = 32;
    const isMax = true;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_SET_MAX_OVERRIDE,
      payload: {
        value,
        isMax
      }
    });

    expect(state).toEqual(expectedInitialState.setIn(
      ['giftCardDropDown', 'data', 0, 'isMaxOverride'], isMax));
    expect(state.get('newGiftCardDropDown')).toEqual(expectedInitialState.get('newGiftCardDropDown'));
  });

  it('Should set max override correctly when updated value existed in the newGiftCardDropDown', () => {
    const { GIFTCARD_SET_MAX_OVERRIDE } = actions;
    const value = 62;
    const isMax = true;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_SET_MAX_OVERRIDE,
      payload: {
        value,
        isMax
      }
    });

    expect(state.get('giftCardDropDown')).toEqual(expectedInitialState.get('giftCardDropDown'));
    expect(state).toEqual(expectedInitialState.setIn(
      ['newGiftCardDropDown', 'data', 0, 'isMaxOverride'], isMax)
    );
  });

  it('Should set max override correctly when updated value existed in the newGiftCardDropDown and isMax is false', () => {
    const { GIFTCARD_SET_MAX_OVERRIDE } = actions;
    const value = 62;
    const isMax = false;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_SET_MAX_OVERRIDE,
      payload: {
        value,
        isMax
      }
    });

    expect(state).toEqual(expectedInitialState.setIn(
      ['newGiftCardDropDown', 'data', 0, 'isMinOverride'], true)
    );
  });

  it('Should set min override gift card amount correctly', () => {
    const { GIFTCARD_NEW_IS_OVERRIDE_MIN } = actions;
    const value = true;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_NEW_IS_OVERRIDE_MIN,
      payload: {
        value
      }
    });

    expect(state.get('isOverrideMinGiftCard')).toEqual(value);
  });

  it('Should set max override gift card amount correctly', () => {
    const { GIFTCARD_NEW_IS_OVERRIDE_MAX } = actions;
    const value = true;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_NEW_IS_OVERRIDE_MAX,
      payload: {
        value
      }
    });

    expect(state.get('isOverrideMaxGiftCard')).toEqual(value);
  });

  it('Should set gift card type correctly', () => {
    const { GIFTCARD_CHANGE_TYPE } = actions;
    const value = -1;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_CHANGE_TYPE,
      payload: {
        value
      }
    });

    expect(state.get('giftCardTypeListValue')).toEqual(value);
  });

  it('Should set gift card type correctly when updated gift card type existed in the giftCardTypeList.', () => {
    const { GIFTCARD_CHANGE_TYPE } = actions;
    const value = 4;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_CHANGE_TYPE,
      payload: {
        value
      }
    });

    expect(state.get('isNeedGiftCardNumber')).toEqual(true);
    expect(state.get('giftCardTypeListValue')).toEqual(value);
  });

  it('Should reset data after closing gift card modal.', () => {
    const { GIFTCARD_NEW_CLOSE } = actions;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_NEW_CLOSE
    });

    expect(state.get('isUseNewGiftCard')).toEqual(false);
    expect(state.get('isOverrideMinGiftCard')).toEqual(false);
    expect(state.get('isOverrideMaxGiftCard')).toEqual(false);
  });

  it('Should set gift card error correctly.', () => {
    const { GIFTCARD_NEW_SET_ERROR } = actions;
    const value = 'error happend when adding new gift card.';
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_NEW_SET_ERROR,
      payload: {
        value
      }
    });

    expect(state.get('newGiftCardError')).toEqual(value);
  });

  it('Should set gift card label correctly', () => {
    const { GIFTCARD_SET_LABLE } = actions;
    const value = 'new gift card';
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_SET_LABLE,
      payload: {
        value
      }
    });

    expect(state.get('giftCardLabel')).toEqual(value);
  });

  it('Should set gift card label correctly when in refund workflow.', () => {
    const { GIFTCARD_SET_LABLE } = actions;
    const initState = expectedInitialState.set('isRefund', true);
    const value = 'new gift card';
    const state = giftCardReducer(initState, {
      type: GIFTCARD_SET_LABLE,
      payload: {
        value
      }
    });

    expect(state.get('giftCardDropDown').toJS()).toEqual({
      data: [...initialState.giftCardDropDown.data, {
        value: 'useNewGiftCard',
        text: `Issue a new ${value}`
      }],
      selected: []
    });
    expect(state.get('giftCardTypeListValue')).toEqual(4);
    expect(state.get('isNeedGiftCardNumber')).toEqual(true);
    expect(state.get('giftCardLabel')).toEqual(value);
  });

  it('Should set data correctly after fetch gift card successfully.', () => {
    const { GIFTCARD_FETCH_SUCCESS } = actions;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_FETCH_SUCCESS,
      payload: giftCardListJSON
    });

    expect(state.get('giftCardDropDown')).toEqual(expectedInitialState.get('giftCardDropDown'));
  });

  it('Should set data correctly after fetch gift card successfully when in refund workflow.', () => {
    const { GIFTCARD_FETCH_SUCCESS } = actions;
    const initState = expectedInitialState.set('isRefund', true);
    const state = giftCardReducer(initState, {
      type: GIFTCARD_FETCH_SUCCESS,
      payload: refundGiftCardListJSON
    });

    expect(state.get('giftCardTypeList')).toEqual(expectedInitialState.get('giftCardTypeList'));
    expect(state.get('canUseNewGiftCard')).toEqual(true);
    expect(state.get('minOverrideHasAccess')).toEqual(true);
    expect(state.get('minOverrideExplanation')).toEqual(refundGiftCardListJSON.body.gc_refund_info.min_override_explanation);
    expect(state.get('maxOverrideHasAccess')).toEqual(true);
    expect(state.get('maxOverrideExplanation')).toEqual(refundGiftCardListJSON.body.gc_refund_info.max_override_explanation);
    
    const refundGiftCardList = {
      body: {
        gc_refund_info: {
          gc_type_list: [],
          gc_list: []
        }
      }
    }

    const state1 = giftCardReducer(initState, {
      type: GIFTCARD_FETCH_SUCCESS,
      payload: refundGiftCardList
    });
  });

  it('Should change gift card option correctly', () => {
    const { GIFTCARD_CHANGE_OPTION } = actions;
    const value = '22';
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_CHANGE_OPTION,
      payload: {
        value
      }
    });

    expect(state.get('giftCardDropDownValue')).toEqual(value);
    expect(state.get('isUseNewGiftCard')).toEqual(false);
  });

  it('Should change gift card value correctly', () => {
    const { GIFTCARD_RESET_LIST } = actions;
    const value = 34;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_RESET_LIST,
      payload: {
        value
      }
    });
    expect(state.get('giftCardDropDownValue')).toEqual(value);
  });

  it('Should remove new gift card correctly', () => {
    const { GIFTCARD_REMOVE_NEW } = actions;
    const delGiftCardId = 62;
    const state = giftCardReducer(expectedInitialState, {
      type: GIFTCARD_REMOVE_NEW,
      payload: {
        delGiftCardId
      }
    });
    expect(state.get('newGiftCardDropDown').toJS().data.length).toBe(0);
  });
});
