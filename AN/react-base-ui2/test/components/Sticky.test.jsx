import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { StickyContainer, Sticky } from 'src/components/Sticky';

const mountDiv = document.createElement('div');
mountDiv.id = 'mountDiv';
document.body.appendChild(mountDiv);
const attachTo = document.getElementById('mountDiv');

describe('StickyContainer', () => {
  let container;
  let containerNode;
  beforeEach(() => {
    container = mount(<StickyContainer />, { attachTo });
    containerNode = container.node;
  });

  describe('getChildContext', () => {
    let childContext;
    beforeEach(() => { childContext = containerNode.getChildContext(); });

    it('should expose a getContainerNode function that returns the container\'s underlying DOM ref', () => {
      expect(childContext.getContainerNode()).toEqual(containerNode.node);
    });
  });
});

describe('Invalid Sticky', () => {
  it('should complain if StickyContainer is not found', () => {
    expect(() => mount(<Sticky><div /></Sticky>, { attachTo })).toThrow(TypeError);
  });
});

describe('Valid Sticky', () => {
  const componentFactory = props => <StickyContainer><Sticky {...props} /></StickyContainer>;

  describe('with no props', () => {
    const expectedStickyStyle = {
      left: 10,
      top: 0,
      width: 100,
      position: 'fixed',
      transform: 'translateZ(0)'
    };

    let sticky;
    beforeEach(() => {
      const wrapper = mount(componentFactory({
        children: <div />
      }), { attachTo });

      const { ...boundingClientRect } = expectedStickyStyle;
      sticky = wrapper.children().node;
      sticky.content.getBoundingClientRect = () => ({ ...boundingClientRect, height: 100 });
      sticky.placeholder.getBoundingClientRect = () => ({ ...boundingClientRect, height: 100 });
    });

    it('should change have an expected start state', () => {
      expect(sticky.state).toEqual({
        isSticky: false,
        style: {}
      });
    });

    it('should be sticky when distanceFromTop is 0', () => {
      sticky.handleContainerEvent(
        { distanceFromTop: 0, distanceFromBottom: 1000, eventSource: document.body }
      );
      expect(sticky.placeholder.style.paddingBottom).toEqual('100px');
    });

    it('should be sticky when distanceFromTop is negative', () => {
      sticky.handleContainerEvent(
        { distanceFromTop: -1, distanceFromBottom: 999, eventSource: document.body }
      );
      expect(sticky.placeholder.style.paddingBottom).toEqual('100px');
    });

    it('should continue to be sticky when distanceFromTop becomes increasingly negative', () => {
      sticky.handleContainerEvent(
        { distanceFromTop: -1, distanceFromBottom: 999, eventSource: document.body }
      );
      sticky.handleContainerEvent(
        { distanceFromTop: -2, distanceFromBottom: 998, eventSource: document.body }
      );
      expect(sticky.placeholder.style.paddingBottom).toEqual('100px');
    });

    it('should cease to be sticky when distanceFromTop becomes greater than 0', () => {
      sticky.handleContainerEvent({
        distanceFromTop: -1, distanceFromBottom: 999, eventSource: document.body
      });
      sticky.handleContainerEvent({
        distanceFromTop: 1, distanceFromBottom: 1001, eventSource: document.body
      });
      expect(sticky.placeholder.style.paddingBottom).toEqual('0px');
    });

    it('should compensate sticky style height when distanceFromBottom is < 0', () => {
      sticky.handleContainerEvent({
        distanceFromTop: -901, distanceFromBottom: 99, eventSource: document.body
      });
      expect(sticky.placeholder.style.paddingBottom).toEqual('100px');
    });
  });

  describe('with topOffset not equal to 0', () => {
    it('should attach lazily when topOffset is positive', () => {
      const wrapper = mount(componentFactory({
        topOffset: 1,
        children: <div />
      }), { attachTo });

      const sticky = wrapper.children().node;
      sticky.handleContainerEvent({
        distanceFromTop: 0, distanceFromBottom: 100, eventSource: document.body
      });
      expect(sticky.state.isSticky).toBe(false);
      sticky.handleContainerEvent({
        distanceFromTop: -1, distanceFromBottom: 99, eventSource: document.body
      });
      expect(sticky.state.isSticky).toBe(true);
    });

    it('should attach aggressively when topOffset is negative', () => {
      const wrapper = mount(componentFactory({
        topOffset: -1,
        children: <div />
      }), { attachTo });

      const sticky = wrapper.children().node;
      sticky.handleContainerEvent({
        distanceFromTop: 2, distanceFromBottom: 99, eventSource: document.body
      });
      expect(sticky.state.isSticky).toBe(false);
      sticky.handleContainerEvent({
        distanceFromTop: 1, distanceFromBottom: 98, eventSource: document.body
      });
      expect(sticky.state.isSticky).toBe(true);
    });
  });
});
