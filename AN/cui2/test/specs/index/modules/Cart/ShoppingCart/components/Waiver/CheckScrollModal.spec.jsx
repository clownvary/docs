
import expect from 'expect';
import React from 'react';
import Modal from 'react-base-ui/lib/components/Modal';
import Button from 'react-base-ui/lib/components/Button';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import { CheckScrollModal } from 'index/modules/Cart/ShoppingCart/components/Waiver/CheckScrollModal';

const initialState = {
  waiverText: 'waiver box',
  shown: false,
  onClose: () => true
};

function setup(_state) {
  const actions = {
    onScrollToBottom: expect.createSpy(),
    onClose: expect.createSpy()
  };
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(
    <CheckScrollModal
      {...state}
      {...actions}
    />);
  return {
    component,
    modalBody: component.find('.modal-body'),
    modalFooter: component.find('.modal-footer'),
    button: component.find(Button),
    modal: component.find(Modal),
    actions
  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/CheckScrollModal', () => {
  it('should render CheckScrollModal correctly', () => {
    const { modalBody, modalFooter } = setup();
    expect(modalBody.length).toEqual(1);
    expect(modalFooter.length).toEqual(1);
  });
  it('should render body text correctly', () => {
    const state = { waiverText: 'test' };
    const { modalBody } = setup(state);
    expect(modalBody.html()).toContain(state.waiverText);
  });
  it('should trigger onScrollToBottom when user trigger handlScroll', () => {
    const { component, actions } = setup();
    const _ins = component.instance();
    _ins.container.getBoundingClientRect = () => ({ bottom: 10 });
    _ins.flag.getBoundingClientRect = () => ({ bottom: 5 });
    _ins.handleScroll();
    expect(actions.onScrollToBottom).toHaveBeenCalled();
  });
  it('should not trigger onScrollToBottom when inner contanier is null', () => {
    const { component, actions } = setup();
    const _ins = component.instance();
    _ins.container = null;
    _ins.handleScroll();
    expect(actions.onScrollToBottom).toNotHaveBeenCalled();
  });
  it('should trigger handleScroll correctly', () => {
    const { component, modalBody } = setup();
    const _ins = component.instance();
    const handleScroll = expect.spyOn(_ins, 'handleScroll');
    modalBody.simulate('scroll');
    expect(handleScroll).toHaveBeenCalled();
  });
  it('should trigger onClose correctly', () => {
    const { button, modal, actions } = setup();
    button.simulate('click');
    modal.prop('onClose')(() => 1);
    expect(actions.onClose.calls.length).toEqual(2);
  });
  it('should trigger componentWillUpdate correctly', () => {
    const { component } = setup();
    const _ins = component.instance();
    const componentWillUpdate = expect.spyOn(_ins, 'componentWillUpdate').andCallThrough();
    const handleScroll = expect.spyOn(_ins, 'handleScroll');
    component.setProps({ shown: true });
    expect(componentWillUpdate).toHaveBeenCalled();
    expect(handleScroll).toHaveBeenCalled();
    const { component: component1 } = setup({ shown: true });
    const _ins1 = component1.instance();
    component1.setProps({ shown: false });
    expect(_ins1.container.scrollTop).toEqual(0);
  });
});

