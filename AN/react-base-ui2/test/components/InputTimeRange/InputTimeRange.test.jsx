import React from 'react';
import moment from 'moment';
import { InputTimeRange } from 'src/components/InputTimeRange';
import MomentRange from 'src/common/MomentRange';
import { mount } from 'enzyme';

const format = 'h:mm A';

const value = new MomentRange({
  start: moment('9:00 AM', format),
  end: moment('12:00 PM', format)
});

const items = [{
  value,
  text: '9:00 AM to 12:00 PM',
  selected: false
}, {
  value: new MomentRange({
    start: moment('8:00 PM', format),
    end: moment('9:00 PM', format)
  }),
  text: '8:00 PM to 9:00 PM',
  selected: false
}, {
  value: new MomentRange({
    start: moment('1:20 PM', format),
    end: moment('2:50 PM', format)
  }),
  text: '1:20 PM to 2:50 PM',
  selected: false
}, {
  value: new MomentRange({
    start: moment('4:06 PM', format),
    end: moment('6:00 PM', format)
  }),
  text: '4:06 PM to 6:00 PM',
  selected: false
}];

const setup = (props = {}) => {
  const newProps = {
    format,
    value,
    items,
    onValueChange: jest.fn(),
    ...props
  };

  const Component = <InputTimeRange {...newProps} />;
  const wrapper = mount(Component);

  return { Component, wrapper, newProps };
};

describe('InputTimeRange component', () => {
  it('should render well', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeTruthy();

    const d = wrapper.find('.aaui-dropdown');
    expect(d.length).toBe(1);

    const timeRange = wrapper.find('.an-input-time-range-edit-area');
    expect(timeRange.length).toBe(1);
    expect(timeRange.hasClass('u-hidden')).toBe(true);

    const iconEdit = wrapper.find('.icon-edit');
    expect(iconEdit.length).toBe(1);
  });

  it('should render well when no value', () => {
    const { wrapper } = setup({ value: null });
    expect(wrapper).toBeTruthy();

    const d = wrapper.find('.aaui-dropdown');
    expect(d.length).toBe(1);

    const timeRange = wrapper.find('.an-input-time-range-edit-area');
    expect(timeRange.length).toBe(1);
    expect(timeRange.hasClass('u-hidden')).toBe(true);

    const iconEdit = wrapper.find('.icon-edit');
    expect(iconEdit.length).toBe(1);
  });

  it('should render well when start and end is empty string', () => {
    const { wrapper } = setup({ value: { start: '', end: '' } });
    expect(wrapper).toBeTruthy();

    const d = wrapper.find('.aaui-dropdown');
    expect(d.length).toBe(1);

    const timeRange = wrapper.find('.an-input-time-range-edit-area');
    expect(timeRange.length).toBe(1);
    expect(timeRange.hasClass('u-hidden')).toBe(true);

    const iconEdit = wrapper.find('.icon-edit');
    expect(iconEdit.length).toBe(1);
  });

  it('should rerender well when click edit icon', () => {
    const { wrapper } = setup();


    const iconEdit = wrapper.find('.icon-edit');
    iconEdit.simulate('click');

    const d = wrapper.find('.an-input-time-range-text-area');
    expect(d.length).toBe(1);
    expect(d.hasClass('u-hidden')).toBe(true);

    const timeRange = wrapper.find('.an-input-time-range-edit-area');
    expect(timeRange.length).toBe(1);
    expect(timeRange.hasClass('u-hidden')).toBe(false);

    const iconCheckIn = wrapper.find('.icon-check-thin');
    const iconCloceIn = wrapper.find('.icon-close-thin');

    expect(iconCheckIn.length).toBe(1);
    expect(iconCloceIn.length).toBe(1);
  });


  it('should rerender well when click cancel icon', () => {
    const { wrapper } = setup();

    const iconEdit = wrapper.find('.icon-edit');
    iconEdit.simulate('click');


    const iconCloceIn = wrapper.find('.icon-close-thin');

    expect(iconCloceIn.length).toBe(1);

    iconCloceIn.simulate('click');

    const d = wrapper.find('.an-input-time-range-text-area');
    expect(d.length).toBe(1);
    expect(d.hasClass('u-hidden')).toBe(false);
  });

  it('should rerender well when click check icon', () => {
    const { wrapper } = setup();

    const iconEdit = wrapper.find('.icon-edit');
    iconEdit.simulate('click');


    const iconCheckIn = wrapper.find('.icon-check-thin');

    expect(iconCheckIn.length).toBe(1);

    iconCheckIn.simulate('click');

    const d = wrapper.find('.an-input-time-range-text-area');
    expect(d.length).toBe(1);
    expect(d.hasClass('u-hidden')).toBe(false);
  });

  it('should rerender well when change dropdown value', () => {
    const { wrapper } = setup();

    const d = wrapper.find('Dropdown').first();
    expect(d.length).toBe(1);
    d.prop('onChange')({ value: {
      start: moment('4:06 PM', format),
      end: moment('6:00 PM', format)
    } });


    const timeRange = wrapper.find('.an-input-time-range-edit-area');
    expect(timeRange.length).toBe(1);
    expect(timeRange.hasClass('u-hidden')).toBe(true);
  });


  it('edit icon should be disabled', () => {
    const { wrapper } = setup({ disabled: true });
    expect(wrapper).toBeTruthy();

    const iconEdit = wrapper.find('.icon-edit');
    expect(iconEdit.length).toBe(1);
    expect(iconEdit.hasClass('icon-edit-disabled')).toBe(true);
  });
});
