import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import moment from 'moment/moment';
import YearView from 'src/components/Calendar/YearView';
import { KeyCode } from 'src/consts';

describe('components/Calendar/YearView', () => {
  const today = moment(new Date(2018, 5, 5));
  const currentDate = today;
  const value = [today];
  const onYearClick = jest.fn();

  it('YearView renders fine', () => {
    const config = {
      prefix: 'snapshot-year-view-',
      value,
      currentDate,
      today
    };
    const snapshot = renderer.create(
      <YearView config={config} onYearClick={onYearClick} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('when currentDate is undefined YearView works fine', () => {
    const config = {
      value,
      today,
      prefix: 'test'
    };
    const monthView = shallow(<YearView config={config} onYearClick={onYearClick} />);
    monthView.find('td div').at(2).simulate('click');
    expect(onYearClick).toHaveBeenCalledTimes(1);
    monthView.find('td div').at(4).simulate('keydown', { keyCode: KeyCode.SPACE, preventDefault: () => {} });
    expect(onYearClick).toHaveBeenCalledTimes(2);
  });

  it('YearView works fine', () => {
    const config = {
      value,
      currentDate,
      today,
      prefix: 'test'
    };
    const monthView = shallow(<YearView config={config} onYearClick={onYearClick} />);
    monthView.find('td div').at(2).simulate('click');
    expect(onYearClick).toHaveBeenCalledTimes(3);
    monthView.find('td div').at(4).simulate('keydown', { keyCode: KeyCode.SPACE, preventDefault: () => {} });
    expect(onYearClick).toHaveBeenCalledTimes(4);
  });
});
