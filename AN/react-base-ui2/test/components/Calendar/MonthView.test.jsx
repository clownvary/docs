import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import moment from 'moment/moment';
import MonthView from 'src/components/Calendar/MonthView';
import { KeyCode } from 'src/consts';

describe('components/Calendar/MonthView', () => {
  const today = moment(new Date(2018, 5, 5));
  const currentDate = today;
  const value = [today];

  it('MonthView renders fine', () => {
    const config = {
      prefix: 'snapshot-month-view-',
      value,
      currentDate,
      today
    };
    const snapshot = renderer.create(
      <MonthView config={config} onMonthClick={jest.fn()} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('MonthView works fine', () => {
    const onMonthClick = jest.fn();
    const config = {
      prefix: 'test',
      value,
      currentDate,
      today
    };
    const monthView = shallow(<MonthView config={config} onMonthClick={onMonthClick} />);
    monthView.find('td div').at(2).simulate('click');
    expect(onMonthClick).toHaveBeenCalledTimes(1);
    monthView.find('td div').at(4).simulate('keydown', { keyCode: KeyCode.SPACE, preventDefault: () => {} });
    expect(onMonthClick).toHaveBeenCalledTimes(2);
  });
});
