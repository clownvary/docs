import React from 'react';
import { mount } from 'enzyme';
import { DialogBox } from 'src/components/DialogBox';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import isPromise from 'src/utils/isPromise';

const setup = (props = {}) => {
  const newProps = {
    title: 'confirm',
    contentView: null,
    className: 'dialog1',
    showCancel: true,
    cancelText: 'cancel',
    confirmText: 'confirm',
    shown: false,
    onCancel: jest.fn(),
    onConfirm: jest.fn(),
    ...props
  };

  const Component = <DialogBox {...newProps} />;
  const wrapper = mount(Component);

  return { Component, wrapper, newProps };
};

describe('DialogBox component', () => {
  it('should render well when shown is false', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeTruthy();
    const dialogbox = wrapper.find('.modal');
    expect(dialogbox.length).toBe(1);
    expect(dialogbox.hasClass('is-open')).toBeFalsy();
  });

  it('should render well when shown is true', () => {
    const { wrapper } = setup({ shown: true, contentProps: {} });
    expect(wrapper).toBeTruthy();
    const dialogbox = wrapper.find('.modal');
    expect(dialogbox.length).toBe(1);
    expect(dialogbox.hasClass('is-open')).toBeTruthy();

    const Modals = wrapper.find(Modal);
    expect(Modals.length).toBe(1);
    const btns = wrapper.find(Button);
    expect(btns.length).toBe(2);
  });

  it('should call onConfirm when click the confirm button', () => {
    const { wrapper, newProps } = setup({ shown: true, showCancel: false });
    const btns = wrapper.find(Button);
    btns.last().simulate('click');
    expect(newProps.onConfirm).toHaveBeenCalled();
  });

  it('should call onCancel when click the cancel button', () => {
    const { wrapper, newProps } = setup({ shown: true });
    const btns = wrapper.find(Button);
    btns.first().simulate('click');
    expect(newProps.onCancel).toHaveBeenCalled();
  });

  it('should call onCancel when close dialog', () => {
    const { wrapper, newProps } = setup({ shown: true });
    const Modals = wrapper.find('Modal');
    wrapper.instance().updateView();
    Modals.prop('onClose')();
    expect(newProps.onCancel).toHaveBeenCalled();
  });

  it('should render well when onCancel and onConfirm are null', () => {
    const { wrapper } = setup({ shown: true, onConfirm: null, onCancel: null });
    const btns = wrapper.find(Button);
    btns.first().simulate('click');

    expect(wrapper.instance().contentView.onCancel).toBeInstanceOf(Function);
    btns.last().simulate('click');
    expect(wrapper.instance().contentView.onConfirm).toBeInstanceOf(Function);
  });

  it('should render well when onCancel and onConfirm are null', () => {
    const popupInstance = DialogBox.popup();

    expect(isPromise(popupInstance.result)).toBeTruthy();

    // popupInstance.find();

    // const c = popupInstance.getWrappedComponent();
    // c.prop('onCancel')();
    // c.prop('onConfirm')();
  });
});
