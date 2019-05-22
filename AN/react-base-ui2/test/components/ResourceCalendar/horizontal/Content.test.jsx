import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import set from 'lodash/set';
import Content from 'src/components/ResourceCalendar/horizontal/Content';
import resourceJson from './resourceInfo.json';

const initState = {
  rowHeight: '20',
  exclusiveMode: false,
  currentDate: moment('2018-09-21 13:27:13').utcOffset(8),
  dates: [{ value: moment('2018-09-23'), key: '2018-09-23' }, {
    value: moment('2018-09-13'),
    key: '2018-09-13'
  }, { value: moment('2018-09-21'), key: '2018-09-21' }]
};
const resources = [resourceJson];

const setup = (props) => {
  const actions = {
    onMarqueeEnd: jest.fn()
  };
  const state = Object.assign({}, initState, props);
  const Component = mount(<Content {...actions} {...state} />);
  return { Component, actions };
};

describe('src/components/ResourceCalendar/horizontal/Content', () => {
  it('should render well', () => {
    const { Component } = setup();
    expect(Component.find('.an-rc-grid-content').length).toEqual(1);
  });
  describe('should render well when resources is not null', () => {
    it('should render well', () => {
      const { Component } = setup({ resources });
      expect(Component.find('.an-rc-grid-content').length).toEqual(1);
      expect(Component.find('.grid-cell').length).toEqual(resources.length * initState.dates.length);
      expect(Component.find('.today').length).toEqual(1);
      Component.find('.grid-row').forEach((n) => {
        expect(n.prop('style')).toEqual({ height: '20px' });
      });
    });
    it('should have no style when rowHeight is <=0', () => {
      const { Component } = setup({ resources, rowHeight: 0 });
      Component.find('.grid-row').forEach((n) => {
        expect(n.prop('style')).toEqual({});
      });
    });
    it('should have no today class when currentDate is null', () => {
      const { Component } = setup({ resources, currentDate: null });
      expect(Component.find('.today').length).toEqual(0);
    });
  });

  describe('events:', () => {
    it('events should be called correctly when cell\'s date-info is not null', () => {
      const { Component, actions } = setup({ resources });
      const _instance = Component.instance();
      const dateDoubleClickSpy = jest.spyOn(_instance, 'onDateDoubleClick');
      const marqueeStartSpy = jest.spyOn(_instance, 'onMarqueeStart');
      const marqueeEndSpy = jest.spyOn(_instance, 'onMarqueeEnd');

      const eles = Component.find('.grid-cell');
      eles.forEach((ele) => {
        ele.simulate('doubleClick');
        expect(dateDoubleClickSpy).toHaveBeenCalled();
        expect(marqueeStartSpy).toHaveBeenCalled();
        expect(marqueeEndSpy).toHaveBeenCalled();
        expect(actions.onMarqueeEnd).toHaveBeenCalledWith({
          endDate: moment('2018-09-23', 'YYYY-MM-DD').add(1, 'day').subtract(1, 'millisecond'),
          startDate: moment('2018-09-23', 'YYYY-MM-DD'),
          resources: [resourceJson]
        });
      });
    });
    it('events should be called correctly when cell\'s date-info is not null and date-info length !=2', () => {
      const { Component, actions } = setup({ resources });
      const _instance = Component.instance();
      const tempEle = document.createElement('div');
      tempEle.setAttribute('class', 'an-rc-date');
      tempEle.setAttribute('data-info', 'r1/2018-09-21/test');
      document.body.appendChild(tempEle);

      const dateDoubleClickSpy = jest.spyOn(_instance, 'onDateDoubleClick');
      const marqueeStartSpy = jest.spyOn(_instance, 'onMarqueeStart');
      const marqueeEndSpy = jest.spyOn(_instance, 'onMarqueeEnd');

      const eles = Component.find('.grid-cell');
      eles.forEach((ele) => {
        ele.simulate('doubleClick', { target: tempEle });
        expect(dateDoubleClickSpy).toHaveBeenCalled();
        expect(marqueeStartSpy).toHaveBeenCalled();
        expect(marqueeEndSpy).toHaveBeenCalled();
        expect(actions.onMarqueeEnd).not.toHaveBeenCalled();
      });
    });
    it('events should be called correctly when cell\'s date-info is null', () => {
      const { Component, actions } = setup({ resources });
      const _instance = Component.instance();
      const tempEle = document.createElement('div');
      tempEle.setAttribute('class', 'an-rc-date');
      document.body.appendChild(tempEle);

      const dateDoubleClickSpy = jest.spyOn(_instance, 'onDateDoubleClick');
      const marqueeStartSpy = jest.spyOn(_instance, 'onMarqueeStart');
      const marqueeEndSpy = jest.spyOn(_instance, 'onMarqueeEnd');

      const eles = Component.find('.grid-cell');
      eles.forEach((ele) => {
        ele.simulate('doubleClick', { target: tempEle });
        expect(dateDoubleClickSpy).toHaveBeenCalled();
        expect(marqueeStartSpy).toHaveBeenCalled();
        expect(marqueeEndSpy).toHaveBeenCalled();
        expect(actions.onMarqueeEnd).not.toHaveBeenCalled();
      });
    });
    it('disableClearable shuld be called when component unmount', () => {
      const { Component } = setup();
      Component.unmount();
    });
    it('onMarqueeEnd should be called correcly when startIndex > endIndex', () => {
      const tempResources = resources;
      tempResources.push(set(resourceJson, 'id', 'r2'));
      const { Component, actions } = setup({ resources: tempResources });
      const _instance = Component.instance();
      const tempEle = document.createElement('div');
      tempEle.setAttribute('class', 'an-rc-date');
      tempEle.setAttribute('data-info', 'r1/2018-09-21');
      document.body.appendChild(tempEle);
      _instance.startCellInfo = { resourceId: 'r2', date: moment('2018-11-12', 'YYYY-MM-DD') };
      _instance.onMarqueeEnd({ target: tempEle }, tempEle);

      expect(actions.onMarqueeEnd).toHaveBeenCalledWith({
        endDate: moment('2018-11-12', 'YYYY-MM-DD').add(1, 'day').subtract(1, 'millisecond'),
        startDate: moment('2018-09-21', 'YYYY-MM-DD'),
        resources: []
      });
    });
  });
});
