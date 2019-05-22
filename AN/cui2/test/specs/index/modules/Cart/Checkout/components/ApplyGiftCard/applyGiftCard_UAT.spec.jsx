import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { ComboBox } from 'react-base-ui/lib/components';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { ApplyGiftCard } from 'index/modules/Cart/Checkout/components/ApplyGiftCard';
/*eslint-disable*/
import jsonOrderSummary from 'Cart/Checkout/get_ordersummary.json';
import jsonGiftCard from 'Cart/Checkout/get_giftcard.json';


const { body: { order_summary: defaultOrderSummary } } = jsonOrderSummary;
const initialState = {
  applyBtnEnable: false,
  errorMessageShow: false,
  errorMessage: '',
  cardNumber: '',
  giftCardList: [],
  appledCardLlist: []
};

function setup(_state, _context = context, _orderSummary) {
  const actions = {
    fetchGiftCardAction: expect.createSpy(),
    updateCardNumberAction: expect.createSpy(),
    applyGiftCardAction: expect.createSpy(),
    removeGiftCardAction: expect.createSpy()
  };

  const state = Object.assign(initialState, _state);
  const summaryData = Object.assign(defaultOrderSummary, _orderSummary);

  const component = mountWithIntl(
    <ApplyGiftCard
      applyGiftCardData={fromJS(state)}
      orderSummaryData={fromJS(summaryData)}
      responsive={{ isLg: true }}
      {...actions}
    />, { context: _context, childContextTypes });
  return {
    component,
    container: component.find('.applygiftcard-panel'),
    panelForm: component.find('.applygiftcard-panel__form'),
    appliedItemsBox: component.find('.applieditems-box'),
    comboBox: component.find(ComboBox),
    errorMessage: component.find('.error-message'),
    itemsList: component.find('.items-list'),
    button: component.find('.btn-primary'),
    actions
  };
}
describe('index/modules/Cart/Checkout/components/ApplyGiftCard(UAT)', () => {
  let giftCardEnable = null;
  beforeEach(() => {
    const tempFunc = enable => ({
      ...context,
      configurations: context.configurations.set('pay_by_gift_certificate_online', enable)
    });
    giftCardEnable = tempFunc;
  });
  afterEach(() => {
    giftCardEnable(true);
  });
  it('should not render container when pay_by_gift_certificate_online is false', () => {
    const { container } = setup(null, giftCardEnable(false), null);
    expect(container.length).toEqual(0);
  });
  it('should render container  when pay_by_gift_certificate_online is ture and due_now > 0', () => {
    const { container } = setup(null, giftCardEnable(true), { due_now: 10 });
    expect(container.length).toEqual(1);
  });
  it('should render errorMessage correctly when errorMessageShow is true and errorMessage has value ', () => {
    const { errorMessage } = setup({ errorMessageShow: true, errorMessage: 'test error' }, giftCardEnable(true), null);
    expect(errorMessage.length).toEqual(1);
    expect(errorMessage.html()).toMatch('test error');
  });
  it('should not render errorMessage when errorMessage is false  ', () => {
    const { errorMessage } = setup({ errorMessageShow: false }, giftCardEnable(true), null);
    expect(errorMessage.length).toEqual(0);
  });
  it('should render panelForm and comboBox when due_now > 0  ', () => {
    const { panelForm, comboBox } = setup(null, giftCardEnable(true), { due_now: 12 });
    expect(panelForm.length).toEqual(1);
    expect(comboBox.length).toEqual(1);
  });
  it('should not render panelForm and comboBox when due_now = 0  ', () => {
    const { panelForm, comboBox } = setup(null, giftCardEnable(true), { due_now: 0 });
    expect(panelForm.length).toEqual(0);
    expect(comboBox.length).toEqual(0);
  });
  it('applyGiftCardAction should be triggered correctly when apply button be clicked and applyBtnEnable is true ', () => {
    const { button, actions } = setup({ cardNumber: '123456', applyBtnEnable: true }, giftCardEnable(true), { due_now: 10 });
    button.simulate('click');
    expect(actions.applyGiftCardAction).toHaveBeenCalledWith('123456');
  });
  it('updateCardNumberAction should be triggered correctly ', () => {
    const { comboBox, actions } = setup(null, giftCardEnable(true), null);
    comboBox.prop('onTextChange')({ target: { value: 'test' } });
    expect(actions.updateCardNumberAction).toHaveBeenCalledWith('test');
  });
  it('should render itemsList  correctly when appledCardLlist has value  ', () => {
    const { body: { gift_certificates: { apply_certificate_list } } } = jsonGiftCard;
    const list = apply_certificate_list.map(item => ({
      id: item.gift_certificate_id,
      cardType: item.gift_certificate_type_name,
      cardNumber: item.gift_certificate_number,
      paymentAmount: item.payment_amount,
      availableAmount: item.available_amount
    }));
    const { itemsList } = setup({ appledCardLlist: list }, giftCardEnable(true), null);
    expect(itemsList.length).toEqual(1);
    expect(itemsList.find('li').length).toEqual(list.length);
    const { itemsList: itemsList2 } = setup({ appledCardLlist: null }, giftCardEnable(true), null);
    expect(itemsList2.length).toEqual(0);

  });
  it('should render title in item-list correctly', () => {
    const { body: { gift_certificates: { apply_certificate_list } } } = jsonGiftCard;
    const list = apply_certificate_list.map(item => ({
      id: item.gift_Certificwate_id,
      cardType: null,
      cardNumber: null,
      paymentAmount: item.payment_amount,
      availableAmount: item.available_amount
    }));
    const { itemsList } = setup({ appledCardLlist: list }, giftCardEnable(true), null);
    const span = itemsList.find('span').filterWhere(n => n.prop('title')==='');
    expect(span.length).toEqual(list.length*2);
  });
  it('removeGiftCardAction should be triggered correctly when applied item remove icon be clicked', () => {
    const { body: { gift_certificates: { apply_certificate_list } } } = jsonGiftCard;
    const list = apply_certificate_list.map(item => ({
      id: item.gift_certificate_id,
      cardType: item.gift_certificate_type_name,
      cardNumber: item.gift_certificate_number,
      paymentAmount: item.payment_amount,
      availableAmount: item.available_amount
    }));
    const { itemsList, actions } = setup({ appledCardLlist: list }, giftCardEnable(true), null);
    itemsList.find('li').map((item, index) => {
      const spanBtn = item.find('.icon-svg-remove');
      spanBtn.simulate('click');
      return expect(actions.removeGiftCardAction).toHaveBeenCalledWith(list[index].id);
    });
  });
});
