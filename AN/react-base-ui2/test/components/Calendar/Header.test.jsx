import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Header from 'src/components/Calendar/Header';
import { KeyCode } from 'src/consts';

describe('components/Calendar/Header', () => {
  it('CalendarHeader renders fine', () => {
    const snapshot = renderer.create(
      <Header
        title={'2018-06-05'}
        prefix={'snapshot-calendar-prefix-'}
        displayToday
        todayLabel={'Today'}
        onPrevClick={jest.fn()}
        onTodayClick={jest.fn()}
        onTitleClick={jest.fn()}
        onNextClick={jest.fn()}
      />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('CalendarHeader works fine', () => {
    const props = {
      prefix: 'ut-',
      displayToday: true,
      title: 'Header',
      todayLabel: 'Today',
      onPrevClick: jest.fn(),
      onTodayClick: jest.fn(),
      onTitleClick: jest.fn(),
      onNextClick: jest.fn()
    };
    const header = shallow(<Header {...props} />);

    const prev = header.find('i.icon-chevron-left');
    expect(prev).toHaveLength(1);
    prev.simulate('keydown', { keyCode: KeyCode.ENTER, preventDefault: () => {} });
    expect(props.onPrevClick).toHaveBeenCalledTimes(1);

    const today = header.find(`span.${props.prefix}calendar-header-today`);
    expect(today).toHaveLength(1);
    today.simulate('keydown', { keyCode: KeyCode.SPACE, preventDefault: () => {} });
    expect(props.onTodayClick).toHaveBeenCalledTimes(1);

    const title = header.find(`span.${props.prefix}calendar-header-title`);
    expect(title).toHaveLength(1);
    title.simulate('keydown', { keyCode: KeyCode.SPACE, preventDefault: () => {} });
    expect(props.onTitleClick).toHaveBeenCalledTimes(1);

    const next = header.find('i.icon-chevron-right');
    expect(next).toHaveLength(1);
    next.simulate('keydown', { keyCode: KeyCode.ENTER, preventDefault: () => {} });
    expect(props.onNextClick).toHaveBeenCalledTimes(1);
  });
});
