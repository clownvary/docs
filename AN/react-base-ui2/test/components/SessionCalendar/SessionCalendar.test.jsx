import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import SessionCalendar from 'src/components/SessionCalendar';

describe('components/SessionCalendar/SessionCalendarRow', () => {
  const currentDate = new Date('December 24, 2018 03:24:00');
  const today = currentDate;
  const sessionDates = [
    { date: moment('2018-12-24'), waiting: true },
    { date: moment('2018-12-25'), waiting: true },
    { date: moment('2018-12-26'), waiting: false },
    { date: moment('2018-11-27'), waiting: false },
    { date: moment('2018-11-28'), waiting: false },
    { date: moment('2018-12-01'), waiting: false },
    { date: moment('2018-12-04'), waiting: false },
    { date: moment('2018-12-05'), waiting: false },
    { date: moment('2018-12-06'), waiting: false }
  ];

  const selectedDates = [
    moment('2018-12-23'),
    moment('2018-12-24'),
    moment('2018-12-25'),
    moment('2018-12-26'),
    moment('2018-12-27'),
    moment('2018-12-28'),
    moment('2018-12-29')
  ];

  it('component works fine', () => {
    const props = {
      prefixCls: 'test-an-sc',
      currentDate,
      today,
      sessionDates,
      selectedDates
    };

    const component = mount(<SessionCalendar {...props} />);

    const selectedCellCount = component.find('.test-an-sc-day__selected').length;
    expect(selectedCellCount).toEqual(7);

    const dateLabel = component.find('.test-an-sc-action-date');
    expect(dateLabel.text()).toEqual('Dec 2018');

    const todayCell = component.find('.test-an-sc-day__today');
    expect(todayCell.text()).toEqual('24');

    const nextCurrentDate = new Date('November 24, 2018 03:24:00');
    component.setProps({ currentDate: nextCurrentDate });
    expect(dateLabel.text()).toEqual('Nov 2018');

    const nextToday = new Date('November 11, 2018 03:24:00');
    component.setProps({ today: nextToday });
    const nextTodayCell = component.find('.test-an-sc-day__today');
    expect(nextTodayCell.text()).toEqual('11');

    const propsWithoutSessionDates = { ...props, sessionDates: [] };
    const componentWithoutSessionDates = mount(<SessionCalendar {...propsWithoutSessionDates} />);
    expect(componentWithoutSessionDates.find('.test-an-sc-day__disabled')).toHaveLength(42);
  });
});
