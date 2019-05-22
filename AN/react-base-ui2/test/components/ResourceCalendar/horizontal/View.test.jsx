import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment-timezone';
import toJson from 'enzyme-to-json';
import cloneDeep from 'lodash/cloneDeep';
import View from 'src/components/ResourceCalendar/horizontal/View';
import Scroller from 'src/components/Scroller/Scroller';

import resourceJson from './resourceInfo.json';

moment.tz.setDefault('EST');
const initState = {
  displayDate: moment('2018-09-19'),
  eventOrder: 'title',
  resources: [resourceJson],
  events: [],
  cornerLabel: 'test',
  exclusiveMode: false,
  currentDate: moment('2018-08-13')
};
const actions = {
  onResourceRemove: jest.fn(),
  onDateHeaderClick: jest.fn(),
  onResourceHeaderClick: jest.fn(),
  onEventOpen: jest.fn()
};
const setup = (props) => {
  const state = Object.assign({}, initState, props);
  const Component = mount(<View {...actions} {...state} />);

  return { Component, actions };
};

describe('src/components/ResourceCalendar/horizontal/View', () => {
  it('should render well', () => {
    const { Component } = setup({ theme: 'test' });
    const tree = toJson(Component);
    const scroller = Component.find(Scroller);
    expect(tree).toMatchSnapshot();
    expect(scroller.length).toEqual(1);
    expect(scroller.prop('className')).toContain('test');
  });
  it('onContentResize should work well', () => {
    const { Component } = setup();
    const scroller = Component.find(Scroller);
    const _instance = Component.instance();
    const updateRowHeightSpy = jest.spyOn(_instance, 'updateRowHeight');
    scroller.node.onContentResize({ scrollbarSize: { width: 20, height: 30 } });
    expect(updateRowHeightSpy).toHaveBeenCalled();
    expect(_instance.state.rowHeight).toEqual(48);
  });
  describe('update props:', () => {
    it('should work well when set exclusiveMode', () => {
      const { Component } = setup();
      const _instance = Component.instance();
      Component.setProps({ resources: [resourceJson], exclusiveMode: true });
      Component.setProps({ exclusiveMode: true });
      expect(_instance.state.segResources).toEqual([{ dates: {}, events: [], id: 'r1', key: 'r1' }]);
    });
    it('should work well when set events', () => {
      const { Component } = setup();
      const _instance = Component.instance();
      Component.setProps({ events: [''] });
      expect(_instance.state.segResources).toEqual([{ dates: {}, events: [], id: 'r1', key: 'r1' }]);
    });
    it('should work well when set displayDate', () => {
      const { Component } = setup();
      const _instance = Component.instance();
      Component.setProps({ displayDate: '2018-03-03' });
      expect(_instance.state.segResources).toEqual([{ dates: {}, events: [], id: 'r1', key: 'r1' }]);
    });
    it('should work well when set resources', () => {
      const { Component } = setup();
      const _instance = Component.instance();
      Component.setProps({ resources: [] });
      expect(_instance.state.segResources).toEqual([]);
    });
  });


  describe('recalcRowHeight:', () => {
    it('recalcRowHeight should work well', () => {
      const { Component } = setup();
      const _instance = Component.instance();
      _instance.updateRowHeight();

      expect(_instance.state.rowHeight).toEqual(48);

      Component.setState({ rowHeight: 90 });
      _instance.updateRowHeight();
      expect(_instance.state.rowHeight).toEqual(48);
    });
    it('recalcRowHeight should work well when resource length <=0', () => {
      const { Component } = setup();
      const _instance = Component.instance();
      _instance.updateRowHeight([]);
      expect(_instance.state.rowHeight).toEqual(48);
    });
  });

  describe('updateVisibility:', () => {
    it('works fine when event more than max visible event', () => {
      const { Component } = setup();
      const dates = cloneDeep(resourceJson.dates);
      dates['2018-09-19'].levels['1'].display = true;
      dates['2018-09-19'].levels['1'].owner = { more: 0 };
      dates['2018-09-19'].levels['3'].display = true;
      Component.setState({ segResources: [{ dates }] });
      const _instance = Component.instance();
      expect(dates['2018-09-19'].more).toBe(2);
      expect(dates['2018-09-19'].moreLevel).toBe(3);
      _instance.updateVisibility();
      expect(dates['2018-09-19'].more).toBe(2);
      expect(dates['2018-09-19'].moreLevel).toBe(1);
      expect(dates['2018-09-19'].levels['1'].owner.more).toBe(1);
    });

    it('works fine when event more less max visible event', () => {
      const { Component } = setup();
      const dates = cloneDeep({ '2018-09-19': resourceJson.dates['2018-09-19'] });
      dates['2018-09-19'].count = 1;
      Component.setState({ segResources: [{ dates }] });
      const _instance = Component.instance();
      _instance.updateVisibility();
      expect(dates['2018-09-19'].more).toBe(4);
    });
  });
});
