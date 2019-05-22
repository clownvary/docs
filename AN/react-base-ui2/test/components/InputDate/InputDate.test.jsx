import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import InputDate from '../../../src/components/InputDate';
import { createMoment } from '../../../src/utils/momentHelper';

const setup = (props = {}) => mount(<InputDate {...props} />);

describe('components/InputDate/InputDate.jsx', () => {
  let wrapper;
  const m1 = createMoment('2018-01-01T00:00:00+00:00').utc();

  beforeEach(() => {
    const value = m1;
    wrapper = setup({ value });
  });

  test('rendering', () => {
    const instance = wrapper.instance();
    expect(instance.isBlank()).toBe(false);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test('render fine with flexibleMenu', () => {
    const component = mount(<InputDate value={m1} flexibleCalendar />);
    expect(component).toBeTruthy();

    const calendarTrigger = component.find('.button-toggler');
    expect(calendarTrigger).toHaveLength(1);

    calendarTrigger.simulate('click');
    expect(document.querySelector('.an-input-calendar__flexible')).toBeTruthy();
  });
});
