import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import renderer from 'react-test-renderer';
import Header from 'src/components/ResourceCalendar/horizontal/Header';

moment.tz.setDefault('EST');
const setup = (props) => {
  const initState = {
    currentDate: moment('2018-09-19'),
    dateFormat: 'YYYY-MM-DD',
    dates: [{ value: moment('2018-09-19'), key: '2018-09-19' }, { value: moment('2018-09-13'), key: '2018-09-13' }, { value: moment('2018-09-21'), key: '2018-09-21' }]
  };
  const actions = {
    onDateHeaderClick: jest.fn()
  };
  const state = Object.assign({}, initState, props);
  const Component = shallow(<Header {...actions} {...state} />);
  const tree = renderer.create(<Header {...actions} {...state} />).toJSON();

  return { Component, actions, tree };
};

describe('src/components/ResourceCalendar/horizontal/Header', () => {
  it('should render well', () => {
    const { tree } = setup();
    expect(tree).toMatchSnapshot();
  });
  it('should render well when dates is null', () => {
    const { Component } = setup({ dates: undefined });
    expect(Component.find('.grid-cell').length).toEqual(0);
  });
  it('should render well when dateFormat is null', () => {
    const { Component } = setup({ dateFormat: undefined, currentDate: moment('2018-09-21') });
    expect(Component.find('.an-rc-clickable').first().text()).toEqual('19 Wed');
  });
  it('should render well when currentDate is null', () => {
    const { Component } = setup({ currentDate: undefined });
    expect(Component.find('.an-rc-clickable').first().text()).toEqual('2018-09-19');
  });
  describe('onDateHeaderClick:', () => {
    it('onDateHeaderClick should be called when onDateHeaderClick is not null', () => {
      const { Component, actions } = setup();
      const clickable = Component.find('.an-rc-clickable').first();
      const jsEvent = {
        stopPropagation: jest.fn()
      };
      clickable.simulate('click', jsEvent);
      expect(actions.onDateHeaderClick).toHaveBeenCalled();
    });
    it('onDateHeaderClick should be called when onDateHeaderClick is null', () => {
      const { Component, actions } = setup({ onDateHeaderClick: null });
      const clickable = Component.find('.an-rc-date-header').first();
      const jsEvent = {
        stopPropagation: jest.fn()
      };
      clickable.find('span').simulate('click', jsEvent);
      expect(actions.onDateHeaderClick).not.toHaveBeenCalled();
    });
  });
});
