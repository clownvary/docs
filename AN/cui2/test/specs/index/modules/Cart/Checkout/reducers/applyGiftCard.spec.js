import { fromJS } from 'immutable';
import { expect } from 'chai';
import * as actionTypes from 'index/modules/Cart/Checkout/consts/actionTypes';
import reducers from 'index/modules/Cart/Checkout/reducers/applyGiftCard';

/* eslint-disable */
import jsonGiftCard from 'Cart/Checkout/get_giftcard.json';
/* eslint-enable */

describe('index/modules/Cart/Checkout/reducers/applygiftcard', () => {
  const giftCardListJson = jsonGiftCard.body.gift_certificates.gift_certificate_list;
  const appliedListJson = jsonGiftCard.body.gift_certificates.apply_certificate_list;
  const defaultState = fromJS({
    applyBtnEnable: false,
    errorMessage: '',
    errorMessageShow: false,
    cardNumber: '',
    giftCardList: [],
    appledCardLlist: []
  });

  it('Should get giftCardList and appledCardLlist successfully', () => {
    const returnState = reducers(defaultState, {
      type: actionTypes.GIFTCARD_UI_GIFTCARD_LIST,
      payload: { gift_certificate_list: giftCardListJson, apply_certificate_list: appliedListJson }
    });
    const giftCardExpectState = giftCardListJson.map(item => ({
      id: item.gift_certificate_id,
      cardType: item.gift_certificate_type_name,
      cardNumber: item.gift_certificate_number,
      paymentAmount: item.payment_amount,
      availableAmount: item.available_amount
    }));
    const appledExpectState = appliedListJson.map(_item => ({
      id: _item.gift_certificate_id,
      value: _item.gift_certificate_number,
      text: _item.gift_certificate_type_name,
      balance: _item.available_amount
    }));
    expect(returnState.get('giftCardList').size).to.equal(giftCardExpectState.length);
    expect(returnState.get('appledCardLlist').size).to.equal(appledExpectState.length);
  });

  it('Should get cardNumber successfully', () => {
    const cardNumber = 12345;
    const returnState = reducers(defaultState, {
      type: actionTypes.GIFTCARD_ON_UPDATE,
      payload: cardNumber
    });
    expect(returnState.get('cardNumber')).to.equal(cardNumber);
  });
  it('Should get applyBtnEnable successfully', () => {
    const initState = true;
    const returnState = reducers(defaultState, {
      type: actionTypes.GIFTCARD_UI_DISABLE_APPLY,
      payload: { disable: initState }
    });
    const expectState = initState;
    expect(returnState.get('applyBtnEnable')).to.equal(expectState);
  });
  it('Should get errorMessage successfully', () => {
    const initState = { show: true, errMsg: 'test error' };
    const returnState = reducers(defaultState, {
      type: actionTypes.GIFTCARD_UI_SHOW_ERROR,
      payload: initState
    });
    const expectState = initState;
    expect(returnState.get('errorMessageShow')).to.equal(expectState.show);
    expect(returnState.get('errorMessage')).to.equal(expectState.errMsg);
  });
  it('Should get initial state successfully', () => {
    const returnState = reducers(defaultState, {
      type: actionTypes.GIFTCARD_RESET
    });
    const expectState = defaultState.toJS();
    expect(returnState.toJS()).to.deep.equal(expectState);
  });
});
