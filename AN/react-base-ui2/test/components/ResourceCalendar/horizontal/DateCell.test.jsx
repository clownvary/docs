import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment-timezone';
import merge from 'lodash/merge';

import DateCell from 'src/components/ResourceCalendar/horizontal/DateCell';
import resourceJson from './resourceInfo.json';

moment.tz.setDefault('EST');
const setup = (props) => {
  const initState = {
    date: { value: moment('2018-09-19'), key: '2018-09-19' },
    resource: resourceJson
  };
  const actions = {
    onSegMouseEnter: jest.fn(),
    onSegMouseLeave: jest.fn(),
    onSelectionChange: jest.fn(),
    onEventOpen: jest.fn(),
    onMoreClick: jest.fn()
  };
  const state = merge(initState, props);
  const Component = mount(<DateCell {...actions} {...state} />);
  return { Component, actions };
};

describe('src/components/ResourceCalendar/horizontal/DateCell', () => {
  it('should render well', () => {
    const { Component } = setup();
    const segs = Component.find('.an-rc-event-seg');
    expect(Component.find('.cell-content').length).toEqual(1);
    segs.forEach((seg) => {
      expect(seg.prop('title')).toBeUndefined();
    });
  });
  describe('seg events:', () => {
    describe('onMouseEnter:', () => {
      it('onMouseEnter should be called when onMouseEnter is not null', () => {
        const { Component, actions } = setup();
        const seg = Component.find('.an-rc-event-seg').first();
        seg.simulate('mouseEnter');
        expect(actions.onSegMouseEnter).toHaveBeenCalled();
      });
      it('onMouseEnter should not be called when onMouseEnter is null', () => {
        const { Component, actions } = setup({ onSegMouseEnter: null });
        const seg = Component.find('.an-rc-event-seg').first();
        seg.simulate('mouseEnter');
        expect(actions.onSegMouseEnter).not.toHaveBeenCalled();
        const html = seg.html();
        const backgroundColorIndex = html.indexOf('background-color: red;');
        expect(backgroundColorIndex > -1).toBeFalsy();
        const colorIndex = html.indexOf('color: red;');
        expect(colorIndex > -1).toBeTruthy();
      });
    });
    describe('onMouseLeave:', () => {
      it('onMouseLeave should be called when onMouseLeave is not null', () => {
        const { Component, actions } = setup();
        const seg = Component.find('.an-rc-event-seg').first();
        seg.simulate('mouseLeave');
        expect(actions.onSegMouseLeave).toHaveBeenCalled();
      });
      it('onMouseLeave should not be called when onMouseLeave is null', () => {
        const { Component, actions } = setup({ onSegMouseLeave: null });
        const seg = Component.find('.an-rc-event-seg').first();
        seg.simulate('mouseLeave');
        expect(actions.onSegMouseLeave).not.toHaveBeenCalled();
      });
    });
    describe('onSelectionChange:', () => {
      it('onSelectionChange should be called when onSelectionChange is not null', () => {
        const { Component, actions } = setup();
        const seg = Component.find('.an-rc-event-seg').first();
        seg.simulate('click');
        expect(actions.onSelectionChange).toHaveBeenCalled();
      });
      it('onSelectionChange should not be called when onSelectionChange is null', () => {
        const { Component, actions } = setup({ onSelectionChange: null });
        const seg = Component.find('.an-rc-event-seg').first();
        seg.simulate('click');
        expect(actions.onSelectionChange).not.toHaveBeenCalled();
      });
      it('onSelectionChange should be called when click cell-content', () => {
        const { Component, actions } = setup();
        const content = Component.find('.cell-content');
        content.simulate('click');
        expect(actions.onSelectionChange).toHaveBeenCalledWith([]);
      });
      it('onSelectionChange should not be called when click cell-content and onSelectionChange is null', () => {
        const { Component, actions } = setup({ onSelectionChange: null });
        const content = Component.find('.cell-content');
        content.simulate('click');
        expect(actions.onSelectionChange).not.toHaveBeenCalled();
      });
    });
    describe('onEventOpen:', () => {
      it('onEventOpen should be called when onEventOpen is not null', () => {
        const { Component, actions } = setup();
        const seg = Component.find('.an-rc-event-seg').first();
        seg.simulate('doubleClick');
        expect(actions.onEventOpen).toHaveBeenCalled();
      });
      it('onEventOpen should not be called when onEventOpen is null', () => {
        const { Component, actions } = setup({ onEventOpen: null });
        const seg = Component.find('.an-rc-event-seg').first();
        seg.simulate('doubleClick');
        expect(actions.onEventOpen).not.toHaveBeenCalled();
      });
    });
    describe('onMoreClick:', () => {
      it('onMoreClick should be called when onMoreClick is not null', () => {
        const { Component, actions } = setup();
        const segMore = Component.find('.seg-more');
        segMore.find('a').simulate('mouseDown');
        expect(actions.onMoreClick).toHaveBeenCalledWith({
          date: { value: moment('2018-09-19'), key: '2018-09-19' },
          resource: resourceJson
        });
      });
      it('onMoreClick should not be called when onMoreClick is null', () => {
        const { Component, actions } = setup({ onMoreClick: null });
        const segMore = Component.find('.seg-more');
        segMore.find('a').simulate('mouseDown');
        expect(actions.onMoreClick).not.toHaveBeenCalled();
      });
    });
    it('onMouseUp should work well', () => {
      const { Component } = setup();
      const segMore = Component.find('.seg-more');
      const jsEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      };
      segMore.find('a').simulate('mouseUp', jsEvent);
      expect(jsEvent.preventDefault).toHaveBeenCalled();
      expect(jsEvent.stopPropagation).toHaveBeenCalled();
    });
    it('onBlur should work well', () => {
      const { Component } = setup();
      const content = Component.find('.cell-content');
      content.simulate('blur');
    });
  });
  it('should render well when showtooltip is true', () => {
    const { Component } = setup({ showTooltip: true });
    const segs = Component.find('.an-rc-event-seg').first();

    expect(Component.find('.cell-content').length).toEqual(1);
    segs.forEach((seg) => {
      expect(seg.prop('title')).toEqual('testing');
    });
  });
  it('should render well when level greater than morelevel', () => {
    const tempJson = resourceJson;
    tempJson.dates['2018-09-19'].segs.forEach(seg => seg.level = 5);
    const { Component } = setup({ resource: tempJson });
    const segs = Component.find('.an-rc-event-seg').first();
    expect(Component.find('.cell-content').length).toEqual(1);
    expect(segs.length).toEqual(1);
  });
  it('should not render countMore when display is true', () => {
    const tempJson = resourceJson;
    tempJson.dates['2018-09-19'].levels = [{ display: true }];
    const { Component } = setup({
      resource: tempJson,
      onMoreClick: jest.fn()
    });
    expect(Component.find('.seg-more').length).toEqual(1);
  });
  it('should render nothing when display is false', () => {
    const resource = resourceJson;
    resource.dates['2018-09-19'].segs[2].display = false;
    resource.dates['2018-09-19'].more = 0;
    const { Component } = setup({
      resource,
      rowHeight: 50
    });
    expect(Component.find('.an-rc-event-seg').length).toBe(2);
    expect(Component.find('.an-rc-event').length).toBe(2);
  });
});
