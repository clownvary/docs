import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import moment from 'moment';
import SessionCalendarRow from 'src/components/SessionCalendar/SessionCalendarRow';

jest.mock('src/components/SessionCalendar/SessionCalendarDateCell', () => 'SessionCalendarDateCell');

describe('components/SessionCalendar/SessionCalendarRow', () => {
  const today = moment('2018-12-24T00:00:00.000Z');
  const rowDates = [];
  for (let i = 0; i < 7; i += 1) {
    rowDates.push(today.clone().add(i - 1, 'd'));
  }
  const rowSessionDates = rowDates.map((date, index) => ({ date, waiting: index > 3 }));
  const getProps = (props = {}) => Object.assign({
    prefixCls: 'test-an-sc',
    rowDates,
    rowSessionDates,
    rowDisabled: false,
    today,
    sessionLastDay: moment('2018-12-28T00:00:00.000Z')
  }, props);

  it('component renders fine', () => {
    const props = getProps();
    const snapshot = renderer.create(<SessionCalendarRow {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component renders fine if it do not disable expired dates', () => {
    const props = getProps({ disableExpired: false });
    const snapshot = renderer.create(<SessionCalendarRow {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component renders fine if it do not disable the date which are after the last session day', () => {
    const props = getProps({ disableFutureUnavailable: false })
    const snapshot = renderer.create(<SessionCalendarRow {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component renders fine with selected session dates', () => {
    const props = getProps({ rowSelectedDates: rowDates })
    const snapshot = renderer.create(<SessionCalendarRow {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component renders fine if the whole row is disabled', () => {
    const props = getProps({ rowDisabled: true })
    const snapshot = renderer.create(<SessionCalendarRow {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component works fine', () => {
    const onDateRowClick = jest.fn();
    const props = getProps({ onDateRowClick })
    const component = shallow(<SessionCalendarRow {...props} />);

    const row = component.find('tr');
    row.simulate('click');
    expect(onDateRowClick).toHaveBeenCalledTimes(1);

    row.simulate('keydown', { keyCode: 32, preventDefault: () => {} });
    expect(onDateRowClick).toHaveBeenCalledTimes(2);
  });
});
