import React from 'react';
import { mount } from 'enzyme';
import { ContentView } from 'src/components/DialogBox';

const setup = (props = {}) => {
  const newProps = {
    title: 'confirm',
    message: 'Detele it',
    showCancel: true,
    cancelText: 'cancel',
    confirmText: 'confirm',
    onCancel: jest.fn(),
    onConfirm: jest.fn(),
    onChange: jest.fn(),
    ...props
  };

  const Component = <ContentView {...newProps} />;
  const wrapper = mount(Component);

  return { Component, wrapper, newProps };
};

describe('ContentView component', () => {
  it('should render well', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeTruthy();
  });

  it('should call onChange', () => {
    const { wrapper, newProps } = setup({ shown: true, showCancel: false });
    wrapper.instance().onChange();
    expect(newProps.onChange).toHaveBeenCalled();
  });

  it('should call onCancel', () => {
    const { wrapper, newProps } = setup({ shown: true, showCancel: false });
    wrapper.instance().onCancel();
    expect(newProps.onCancel).toHaveBeenCalled();
  });

  it('should call onConfirm ', () => {
    const { wrapper, newProps } = setup({ shown: true, showCancel: false });
    wrapper.instance().onConfirm();
    expect(newProps.onConfirm).toHaveBeenCalled();
  });
});
