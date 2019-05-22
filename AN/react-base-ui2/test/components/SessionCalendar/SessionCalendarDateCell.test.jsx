import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import SessionCalendarDateCell from 'src/components/SessionCalendar/SessionCalendarDateCell';

describe('components/SessionCalendar/SessionCalendarDateCell', () => {
  const rowDate = moment('2019-01-02');

  it('component renders fine with default props', () => {
    const props = { prefixCls: '', rowDate };
    const snapshot = renderer.create(<SessionCalendarDateCell {...props} />)
      .toJSON();
    expect(snapshot)
      .toMatchSnapshot();
  });

  it('component renders fine', () => {
    const props = {
      prefixCls: 'test-an-sc',
      rowDate,
      today: true,
      disabled: true,
      waiting: true,
      selected: true,
      selectionStart: true,
      selectionEnd: true
    };
    const snapshot = renderer.create(<SessionCalendarDateCell {...props} />)
      .toJSON();
    expect(snapshot)
      .toMatchSnapshot();
  });
});
