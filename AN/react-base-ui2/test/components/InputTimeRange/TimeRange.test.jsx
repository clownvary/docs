import React from 'react';
import moment from 'moment';
import { TimeRange } from 'src/components/InputTimeRange';
import MomentRange from 'src/common/MomentRange';
import { mount } from 'enzyme';

const format = 'h:mm A';

const setup = (props = {}) => {
  const newProps = {
    format,
    step: 60,
    range: new MomentRange({
      start: moment('2018-06-06 02:00:00', format),
      end: moment('2018-06-06 02:00:00', format)
    }),
    onCheck: jest.fn(),
    onCancel: jest.fn(),
    ...props
  };

  const Component = <TimeRange {...newProps} />;
  const wrapper = mount(Component);

  return { Component, wrapper, newProps };
};

describe('InputTimeRange component', () => {
  it('should render well', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeTruthy();

    const InputTimes = wrapper.find('InputTime');
    expect(InputTimes.length).toBe(2);

    const gap = wrapper.find('.an-time-range-gap');
    expect(gap.length).toBe(1);


    const iconCheckIn = wrapper.find('.icon-check-thin');
    const iconCloceIn = wrapper.find('.icon-close-thin');

    expect(iconCheckIn.length).toBe(1);
    expect(iconCloceIn.length).toBe(1);
  });

  it('should render well when change start and end value', () => {
    const { wrapper } = setup();

    const InputTimes = wrapper.find('InputTime');
    expect(InputTimes.length).toBe(2);


    InputTimes.first().prop('onValueChange')({ value: moment('2018-06-06 03:00:00', 'YYYY-MM-DD HH:mm:ss') });

    const input = InputTimes.first().find('.input');
    expect(input.length).toBe(1);
    const start = input.node.value;
    expect(start).toEqual('3:00 AM');

    InputTimes.last().prop('onValueChange')({ value: moment('2018-06-06 02:00:00', 'YYYY-MM-DD HH:mm:ss') });

    InputTimes.last().prop('onValueChange')({ value: moment('2018-06-06 03:00:00', 'YYYY-MM-DD HH:mm:ss') });

    InputTimes.last().prop('onValueChange')({ value: moment('2018-06-06 06:30:00', 'YYYY-MM-DD HH:mm:ss') });

    const endInput = InputTimes.first().find('.input');
    expect(endInput.length).toBe(1);
    const end = endInput.node.value;
    expect(end).toEqual('3:00 AM');
  });

  it('should call onCanel when click cancel icon', () => {
    const { wrapper, newProps } = setup();

    const iconCloceIn = wrapper.find('.icon-close-thin');

    expect(iconCloceIn.length).toBe(1);

    iconCloceIn.simulate('click');
    expect(newProps.onCancel).toHaveBeenCalled();
  });

  it('should call onCheck when click check icon', () => {
    const { wrapper, newProps } = setup();

    const iconCheckIn = wrapper.find('.icon-check-thin');
    expect(iconCheckIn.length).toBe(1);

    iconCheckIn.simulate('click');
    expect(newProps.onCheck).toHaveBeenCalled();
  });
});
