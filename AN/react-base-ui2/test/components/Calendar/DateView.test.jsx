import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import moment from 'moment/moment';
import DateView from 'src/components/Calendar/DateView';
import { FirstDayOfWeek } from 'src/components/Calendar/consts';
import { KeyCode } from 'src/consts';

describe('components/Calendar/DateView', () => {
  const today = moment(new Date(2018, 5, 5));
  const currentDate = today;

  it('DateView renders fine', () => {
    const config = {
      prefix: 'snapshot-date-view-',
      firstDayOfWeek: FirstDayOfWeek.MONDAY,
      currentDate,
      today,
      disabledDates: [moment(new Date(2018, 5, 10)), moment(new Date(2018, 5, 11))]
    };
    const snapshot = renderer.create(
      <DateView config={config} onDateClick={jest.fn()} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('DateView works fine', () => {
    const onDateClick = jest.fn();
    const config = { today, currentDate, prefix: 'test' };
    const dateView = shallow(<DateView config={config} onDateClick={onDateClick} />);
    dateView.find('td div').at(10).simulate('click');
    expect(onDateClick).toHaveBeenCalledTimes(1);
    dateView.find('td div').at(15).simulate('keydown', { keyCode: KeyCode.SPACE, preventDefault: () => {} });
    expect(onDateClick).toHaveBeenCalledTimes(2);
  });

  it('when currentDate is undefined DateView works fine', () => {
    const onDateClick = jest.fn();
    const config = { today, prefix: 'test' };
    const dateView = shallow(<DateView config={config} onDateClick={onDateClick} />);
    dateView.instance().getHeaders(currentDate);
  });
});
