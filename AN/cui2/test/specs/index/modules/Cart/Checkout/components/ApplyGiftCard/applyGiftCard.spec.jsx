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
import messages from 'source/en-US';
/*eslint-enable*/
const intl = {
  messages
};
const { body: { order_summary: defaultOrderSummary } } = jsonOrderSummary;
const initialState = {
  applyBtnEnable: false,
  errorMessage: false,
  cardNumber: '',
  giftCardList: [],
  appledCardLlist: []
};

function setup(_state, _context = context, _orderSummary) {
  const actions = {
    fetchGiftCardAction: expect.createSpy(),
    updateCardNumberAction: expect.createSpy(),
    applyGiftCardAction: expect.createSpy(),
    removeGiftCardAction: expect.createSpy(),
    resetGiftCardStateAction: expect.createSpy()
  };

  const state = Object.assign(initialState, _state);
  const summaryData = Object.assign(defaultOrderSummary, _orderSummary);

  const component = mountWithIntl(
    <ApplyGiftCard
      applyGiftCardData={fromJS(state)}
      orderSummaryData={fromJS(summaryData)}
      responsive={{ isLg: true }}
      {...actions}
      intl={intl}
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


describe('index/modules/Cart/Checkout/components/ApplyGiftCard', () => {
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
  it('should enable button correctly when applyBtnEnable is true  ', () => {
    const { button } = setup({ applyBtnEnable: true }, giftCardEnable(true), { due_now: 10 });
    expect(button.length).toEqual(1);
    expect(button.node.disabled).toBe(false);
  });
  it('should disable button correctly when applyBtnEnable is true  ', () => {
    const { button } = setup({ applyBtnEnable: false }, giftCardEnable(true), { due_now: 10 });
    expect(button.length).toEqual(1);
    expect(button.node.disabled).toBe(true);
  });
  it('fetchGiftCardAction should be triggered when component  be mounted', () => {
    const { actions } = setup(null, giftCardEnable(true), null);
    expect(actions.fetchGiftCardAction).toHaveBeenCalled();
  });
  it('handleChange should be trigger by comboBox ', () => {
    const { component, comboBox } = setup({ applyBtnEnable: false }, giftCardEnable(true), { due_now: 10 });
    const _ins = component.instance();
    const spy = expect.spyOn(_ins, 'handleChange');
    comboBox.prop('onTextChange')({ target: { value: 20 } });
    expect(spy).toHaveBeenCalledWith(20);
  });
  it('optionRenderHandle should be trigger by comboBox ', () => {
    const { component, comboBox } = setup({ applyBtnEnable: false }, giftCardEnable(true), { due_now: 10 });
    const _ins = component.instance();
    const spy = expect.spyOn(_ins, 'optionRenderHandle');
    const option = { label: 'test', value: 10, balance: 20 };
    comboBox.prop('onListRender')({ item: option });
    expect(spy).toHaveBeenCalledWith(option);
  });
  it('optionRenderHandle should return result correctly', () => {
    const { component, comboBox } = setup({ applyBtnEnable: false }, giftCardEnable(true), { due_now: 10 });
    const _ins = component.instance();
    const option = { label: 'test', value: 10, balance: 20 };
    const result = _ins.optionRenderHandle(option);
    expect(result.props.className).toEqual('custom-option-render');
  });
  it('resetGiftCardStateAction should be triggered when component be unmounted', () => {
    const { component, actions } = setup(null, giftCardEnable(true), null);
    component.unmount();
    expect(actions.resetGiftCardStateAction).toHaveBeenCalled();
  });
  it('combobox width should be render correctly ', () => {
    const { component, comboBox } = setup({ applyBtnEnable: false }, giftCardEnable(true), { due_now: 10 });
    component.setProps({ responsive: { isLg: false } });
    expect(comboBox.prop('width')).toEqual(null);
  });
  it('combobox should be render correctly ', () => {
    const { component, comboBox } = setup({ applyBtnEnable: false }, giftCardEnable(false), { due_now: 10 });
    component.setProps({ expanded: false });
    expect(comboBox.length).toEqual(0);
  });
});
