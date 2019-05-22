import React from 'react';
import { GlobalizeSink } from 'src/services/i18n';
import { mount } from 'enzyme';


const setup = (props = {}) => {
  const newProps = {
    ...props
  };

  const Component = <GlobalizeSink {...newProps} />;
  const wrapper = mount(Component);

  return { Component, wrapper, newProps };
};

describe('GlobalizeSink component', () => {
  it('should render well', () => {
    const { wrapper } = setup();
    wrapper.setProps({ onIntlChange: null });

    expect(wrapper).toBeTruthy();
    const span = wrapper.find('span');
    expect(span.hasClass('u-hidden')).toBe(true);
  });

  it('should call onIntlChange', () => {
    const { newProps } = setup({ onIntlChange: jest.fn() });

    expect(newProps.onIntlChange).toHaveBeenCalled();
  });

  it('should call onIntlChange', () => {
    const { wrapper } = setup();
    wrapper.setProps({ onIntlChange: null });
    expect(wrapper.props.onIntlChange).toBeUndefined();
  });
});
