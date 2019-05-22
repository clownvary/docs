import React from 'react';
import { mount } from 'enzyme';

import {DialogScrollContainer} from 'shared/components/DialogScrollContainer/DialogScrollContainer';

const initialState = {
  maxHeight: '200px'
};
function setup(_state = initialState) {
  const state = Object.assign({},initialState, _state);
  const component = mount(<DialogScrollContainer {...state} />);
  return {
    component,
    container: component.find('.an-dialog-scroll-container')
  };
}

describe('shared/components/DialogScrollContainer', () => {
  beforeEach(() => {
    Object.defineProperties(navigator, {
      userAgent: {
        get: () => 'iphone',
        configurable: true
      }
    });
  });
  it('should render component correctly', () => {
    const { component,container } = setup();
    expect(component.length).toEqual(1);
    expect(container.props().style.maxHeight).toEqual(initialState.maxHeight);
  });
  it('should trigger touchstart event correctly ', () => {
    const { component,container } = setup();
    const _ins = component.instance();
    const event = {
      touches:[{
        pageY:100
      }]
    };
    const touchstartSpy = jest.spyOn(_ins,'touchStart');
    _ins.touchStart(event);
    expect(touchstartSpy).toHaveBeenCalled();
    expect(_ins.scrollData).toMatchObject({
      posY: 100
    });
  });
  it('should trigger touchstart event correctly when event.touches is null ', () => {
    const { component,container } = setup();
    const _ins = component.instance();
    const event = { touches:[],pageY:100 };
    const touchstartSpy = jest.spyOn(_ins,'touchStart');
    _ins.root = null;
    _ins.touchStart(event);
    expect(touchstartSpy).toHaveBeenCalled();
    expect(_ins.scrollData).toMatchObject({
      posY: 0,
      maxScroll:0
    });
  });
  it('should trigger touchmove event correctly ', () => {
    const { component,container } = setup();
    const _ins = component.instance();
    _ins.scrollData = {
      elScroll:container,
      maxScroll:0
    };
    const event = {
      touches: [{
        pageY: 100
      }],
      target: container,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    const touchmoveSpy = jest.spyOn(_ins,'touchMove');
    _ins.touchMove(event);
    expect(touchmoveSpy).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
  it('should trigger touchmove event correctly when maxScroll > 0 && distanceY > 0', () => {
    const { component,container } = setup();
    const _ins = component.instance();
    _ins.scrollData = {
      elScroll:container,
      maxScroll:10,
      posY:20
    };
    container.scrollTop = 0
    const event = {
      touches: [{
        pageY: 100
      }],
      target: container,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    const touchmoveSpy = jest.spyOn(_ins,'touchMove');
    _ins.touchMove(event);
    expect(touchmoveSpy).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
  it('should trigger touchmove event correctly when maxScroll > 0 && distanceY < 0', () => {
    const { component,container } = setup();
    const _ins = component.instance();
    _ins.scrollData = {
      elScroll:container,
      maxScroll:11,
      posY:20
    };
    container.scrollTop = 10
    const event = {
      touches: [{
        pageY: 10
      }],
      target: container,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    const touchmoveSpy = jest.spyOn(_ins,'touchMove');
    _ins.touchMove(event);
    expect(touchmoveSpy).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should trigger touchmove event correctly when target is wrong', () => {
    const { component,container } = setup();
    const _ins = component.instance();
    _ins.scrollData = {
      elScroll:container
    };
    container.contains = jest.fn().mockReturnValue(false);
    const event = {
      touches: [{
        pageY: 100
      }],
      target: null,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    const touchmoveSpy = jest.spyOn(_ins,'touchMove');
    _ins.touchMove(event);
    expect(touchmoveSpy).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
  it('should trigger touchend event correctly ', () => {
    const { component,container } = setup();
    const _ins = component.instance();
    const event = {
     target:container
    };
    const touchendSpy = jest.spyOn(_ins,'touchEnd');
    _ins.touchEnd();
    expect(touchendSpy).toHaveBeenCalled();
    expect(_ins.scrollData).toEqual({});
  });

  it('should render component correctly', () => {
    const { component } = setup();
    component.unmount();
    expect(component.length).toEqual(1);
  });
});

