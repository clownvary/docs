import React from 'react';
import { mount } from 'enzyme';
import Progress from 'src/components/Progress';

const showInfo = true;
const size = 'md';
const percent = 30;

const setup = (props = {}) => {
  const newProps = {
    showInfo,
    size,
    percent,
    ...props
  };

  const Component = <Progress {...newProps} />;
  const wrapper = mount(Component);

  return { Component, wrapper, newProps };
};

describe('components/Progress', () => {
  it('should render well', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeTruthy();

    const meter = wrapper.find('.meter');
    const text = wrapper.find('.an-progress__text');

    expect(meter.length).toBe(1);
    expect(text.length).toBe(1);
    expect(text.text()).toEqual(`${percent}%`);
    expect(meter.node.getAttribute('style')).toEqual(`width: ${percent}%;`);
  });

  it('should render well when percent is 0', () => {
    const percentValue = 0;
    const { wrapper } = setup({ percent: percentValue });
    expect(wrapper).toBeTruthy();

    const meter = wrapper.find('.meter');
    const text = wrapper.find('.an-progress__text');

    expect(meter.length).toBe(1);
    expect(text.length).toBe(1);
    expect(text.text()).toEqual(`${percentValue}%`);
    expect(meter.node.getAttribute('style')).toEqual(`width: ${percentValue}%;`);
  });

  it('should render well when showinfo is false', () => {
    const { wrapper } = setup({ showInfo: false });
    expect(wrapper).toBeTruthy();

    const meter = wrapper.find('.meter');
    const text = wrapper.find('.an-progress__text');

    expect(meter.length).toBe(1);
    expect(text.node).toBeFalsy();
  });
});
