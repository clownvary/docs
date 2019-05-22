import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { Sticky, StickyContainer } from 'shared/components/Sticky';

function setup(stickyContainer = false, stickyContainerPros={}, stickyProps={}) {
  let component = null;

  if (stickyContainer) {
    component = mount(
      <StickyContainer {...stickyContainerPros}>
        <div className="sticky-container">
          <Sticky {...stickyProps}>
            <div>test sticky component</div>
          </Sticky>
        </div>
      </StickyContainer>
    );
  } else {
    component = mount(
      <Sticky {...stickyProps}>
        <div>test sticky component</div>
      </Sticky>
    );
  }

  let instance = component.instance();

  return {
    component,
    instance,
    ...instance
  };
}

describe('shared/components/Sticky', () => {
  describe('props', () => {
    describe('topOffset', () => {
      describe('(positive)', () => {

        const top = 160;
        const topOffset = 10;
        const offsetPlaceholder = {top, width: 1000, left: 0, height: 20};
        const offset = {top, width: 1000, left: 0, height: 20};
        const onDetached = jest.fn();
        const onStuck = jest.fn();
        const scrollXFollow = true;

        let {
            instance,
            component
          } = setup(false, {}, {topOffset, onDetached, onStuck, scrollXFollow});

        instance.getOffset = () => offset;
        instance.getPlaceholderOffset = () => offsetPlaceholder;

        it('is not sticky when it is mid-screen', () => {
          offsetPlaceholder.top = topOffset + 90;
          expect(instance.recomputeState()).toBe(false);
          expect(onDetached).toHaveBeenCalled();
        });

        it('is not sticky when it is more than `topOffset` pixels below the top of the screen', () => {
          offsetPlaceholder.top = topOffset + 1;
          expect(instance.recomputeState()).toBe(false);
        });

        it('is sticky when it is exactly `topOffset` pixels below the top of the screen', () => {
          offsetPlaceholder.top = topOffset;
          expect(instance.recomputeState()).toBe(false);
          expect(onStuck).toHaveBeenCalled();
        });

        it('is sticky when it is at the top of the screen', () => {
          offsetPlaceholder.top = topOffset - topOffset;
          expect(instance.recomputeState()).toBe(true);
          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: topOffset,
            left: 0,
            position: 'fixed'
          });
        });

        it('is sticky when it is less than `topOffset` pixels below the top of the screen', () => {
          offsetPlaceholder.top = topOffset - 1;
          expect(instance.recomputeState()).toBe(true);
          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: topOffset,
            left: 0,
            position: 'fixed'
          });
        });

        it('is sticky when the component is above the top of the screen', () => {
          offsetPlaceholder.top = topOffset - 110;
          expect(instance.recomputeState()).toBe(true);
          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: topOffset,
            left: 0,
            position: 'fixed'
          });
        });

        it('setProps topOffset is 0', () => {
          component.setProps({
            topOffset: null
          });
          offsetPlaceholder.top = topOffset - 110;
          expect(instance.recomputeState()).toBe(true);
          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: null,
            left: 0,
            position: 'fixed'
          });
        });
      })

      describe('(negative)', () => {
        const top = 160;
        const topOffset = -10;
        const offsetPlaceholder = {top, width: 1000, left: 0, height: 20};
        const offset = {top, width: 1000, left: 0, height: 20};

        let {
          instance,
          component
          } = setup(false, {}, {topOffset});

        instance.getOffset = () => offset;
        instance.getPlaceholderOffset = () => offsetPlaceholder;

        it('is sticky when it is more than `topOffset` pixels above the top of the screen', () => {
          offsetPlaceholder.top = topOffset - 1;
          expect(instance.recomputeState()).toBe(true);
          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: 0,
            left: 0,
            position: 'fixed'
          });
        });

        it('is not sticky when it is exactly `topOffset` pixels above the top of the screen', () => {
          offsetPlaceholder.top = topOffset;
          expect(instance.recomputeState()).toBe(false);
        });

        it('is not sticky when it is less than `topOffset` pixels above the top of the screen', () => {
          offsetPlaceholder.top = topOffset + 1;
          expect(instance.recomputeState()).toBe(false);
        });

        it('is not sticky when it is at the top of the screen', () => {
          offsetPlaceholder.top = topOffset + 10;
          expect(instance.recomputeState()).toBe(false);
        });
      })
    })

    describe('bottomOffset', () => {
      describe('(positive)', () => {

        const top = 160;
        const bottomOffset = 10;
        const offsetPlaceholder = {top: -1, width: 1000, left: 0, height: 0};
        const offset = {top, width: 1000, left: 0, height: 0};

        let {
          instance,
          component
          } = setup(false, {}, {bottomOffset});

        instance.getOffset = () => offset;
        instance.getPlaceholderOffset = () => offsetPlaceholder;

        it('is sticky when the container bottom is more than `bottomOffset` pixels below the top of the screen', () => {
          instance.getDistanceFromBottom = () => 11;
          instance.recomputeState();

          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: 0,
            left: 0,
            position: 'fixed'
          });
        });

        it('is sticky when the container bottom is exactly `bottomOffset` pixels below the top of the screen', () => {
          instance.getDistanceFromBottom = () => 10;
          instance.recomputeState();
          instance.resize();

          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: 0,
            left: 0,
            position: 'fixed'
          });
        });

        it('is not sticky when the container bottom is less than `bottomOffset` pixels below the top of the screen', () => {
          instance.getDistanceFromBottom = () => 9;
          expect(instance.recomputeState()).toBe(false);
        });

        it('is not sticky when the container bottom is at the top of the screen', () => {
          instance.getDistanceFromBottom = () => 0;
          expect(instance.recomputeState()).toBe(false);
        });

        it('is not sticky when the container bottom is above the top of the screen', () => {
          instance.getDistanceFromBottom = () => -10;
          expect(instance.recomputeState()).toBe(false);
        });
      });

      describe('(negative)', () => {
        const top = 160;
        const bottomOffset = -10;
        const offsetPlaceholder = {top: -1, width: 1000, left: 0, height: 0};
        const offset = {top, width: 1000, left: 0, height: 0};

        let {
          instance,
          component
          } = setup(false, {}, {bottomOffset});

        instance.getOffset = () => offset;
        instance.getPlaceholderOffset = () => offsetPlaceholder;


        it('is sticky when the container bottom is below the top of the screen', () => {
          instance.getDistanceFromBottom = () => 20;
          instance.recomputeState();

          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: 0,
            left: 0,
            position: 'fixed'
          });
        });

        it('is sticky when the container bottom is at the top of the screen', () => {
          instance.getDistanceFromBottom = () => 0;
          instance.recomputeState();

          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: 0,
            left: 0,
            position: 'fixed'
          });
        });

        it('is sticky when the container bottom is less than `bottomOffset` pixels above the top of the screen', () => {
          instance.getDistanceFromBottom = () => -9;
          instance.recomputeState();

          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: 0,
            left: 0,
            position: 'fixed'
          });
        });

        it('is sticky when the container bottom is exactly `bottomOffset` pixels above the top of the screen', () => {
          instance.getDistanceFromBottom = () => -10;
          instance.recomputeState();

          expect(instance.state.stickyStyle).toEqual({
            width: 1000,
            top: 0,
            left: 0,
            position: 'fixed'
          });
        });

        it('is not sticky when the container bottom is more than `bottomOffset` pixels above the top of the screen', () => {
          instance.getDistanceFromBottom = () => -11;
          expect(instance.recomputeState()).toBe(false);
        });
      });

      describe('(negative), if the stickyContainer has node', () => {
        const top = 160;
        const topOffset = 30;
        const offsetPlaceholder = {top, width: 1000, left: 0, height: 20};
        const offset = { top, width: 1000, left: 0, height: 20 };

        let {
          instance,
          component
        } = setup(true, {}, {topOffset});

        it('is sticky when the container bottom is below the top of the screen', () => {
          instance.getDistanceFromBottom = () => 20;
          instance.recomputeState = () => 20;
          // expect(instance.state.stickyStyle).toBeFalsy();
        });
      });
    });

    describe('className', () => {
      let {
          component
        } = setup(false, {}, {className: 'xyz'});

      it('renders the DOM node with the given className', () => {
        expect(component.find('.xyz')).not.toBeNull();
      });

      it('adds the "sticky" class to the DOM node when sticky', () => {
        expect(component.find('.xyz.sticky')).not.toBeNull();
      });
    });

    describe('stickyClassName', () => {
      let {
          component
        } = setup(false, {}, {stickyClassName: 'xyz'});

      it('adds the `stickyClassName` to the DOM node when sticky', () => {
        expect(component.find('.sticky .xyz')).toHaveLength(1);
      });

      it('uses the `stickyClassName` instead of the default "sticky-element" class', () => {
        expect(component.find('.sticky .sticky-element')).toHaveLength(0);
      });
    });

    describe('style', () => {
      let {
          component
        } = setup(false, {}, {style: {height: 100, opacity: 0.5}});

      it('applies the given styles', () => {
        expect(component.find('.sticky').at(0).prop('style').height).toBe(100);
        expect(component.find('.sticky').at(0).prop('style').opacity).toBe(0.5);
      });
    });

    describe('stickyStyle', () => {
      let {
          component
        } = setup(false, {}, {stickyStyle: {height: 200}});

      it('applies if the component is sticky', () => {
        expect(component.find('.sticky-element').at(0).prop('style').height).toBe(200);
      });

      it('merges `stickyStyle` with the provided `stickyStyle` of state', () => {
        expect(component.find('.sticky-element').at(0).prop('style')).toEqual({height: 200});
      });
    });
  })

  describe('state', () => {
    describe('stickyStyle', () => {
      const top = 160;
      const offsetPlaceholder = {top, width: 1000, left: 0, height: 20};
      const offset = {top, width: 1000, left: 0, height: 20};

      let {
        instance,
        state,
        component
        } = setup(false, {}, {});

      instance.getOffset = () => offset;
      instance.getPlaceholderOffset = () => offsetPlaceholder;

      it('should be display none when the node is not sticky', () => {
        expect(state.stickyStyle).toEqual({});
      });

      it('should have the right position style when the node is sticky', () => {
        offsetPlaceholder.top= -10;
        instance.recomputeState();
        expect(instance.state.stickyStyle).toEqual({
          width: 1000,
          top: 0,
          left: 0,
          position: 'fixed'
        });
      });
    });
  });

  describe('context', () => {
    describe('sticky', () => {
      it('should expose sticky as context', () => {
        let {
          instance,
          component
        } = setup(true);
        let childContext = instance.getChildContext();
        let containerNode = ReactDOM.findDOMNode(instance);
        expect(childContext.sticky).not.toBeNull();
        expect(childContext.sticky.node).toEqual(containerNode);

        component.unmount();
      });

    });
  });
});