import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import moment from 'moment';
import SessionCalendarAction from 'src/components/SessionCalendar/SessionCalendarAction';

describe('components/SessionCalendar/SessionCalendarDateCell', () => {
  const currentDate = moment('2019-01-02');
  const noop = () => {};

  it('component renders fine', () => {
    const props = {
      prefixCls: 'test-an-sc',
      currentDate,
      previous: true,
      next: true,
      onPrevBtnClick: noop,
      onNextBtnClick: noop,
      customizeAction: (<div className="test-customize-action">message...</div>)
    };
    const snapshot = renderer.create(<SessionCalendarAction {...props} />)
      .toJSON();
    expect(snapshot)
      .toMatchSnapshot();
  });

  it('component renders fine if prev/next button is disabled', () => {
    const props = {
      prefixCls: 'test-an-sc',
      currentDate,
      previous: false,
      next: false
    };
    const snapshot = renderer.create(<SessionCalendarAction {...props} />)
      .toJSON();
    expect(snapshot)
      .toMatchSnapshot();
  });

  it('component works fine', () => {
    const onPrevBtnClick = jest.fn();
    const onNextBtnClick = jest.fn();
    const props = {
      prefixCls: 'test-an-sc',
      currentDate,
      previous: true,
      next: true,
      onPrevBtnClick,
      onNextBtnClick
    };
    const component = shallow(<SessionCalendarAction {...props} />);

    const buttons = component.find('button');
    const prevBtn = buttons.at(0);
    prevBtn.simulate('click');
    expect(onPrevBtnClick).toBeCalled();
    const nextBtn = buttons.at(1);
    nextBtn.simulate('click');
    expect(onNextBtnClick).toBeCalled();
  });
});
