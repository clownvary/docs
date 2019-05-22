import React from 'react';
import { mount } from 'enzyme';
import { Toast } from 'src/components/Toast';

const defaultProps = {
  onClose: jest.fn(),
  onClick: jest.fn()
};

describe('Toast Component', () => {
  it('Toast render without errors', () => {
    const component = mount(<Toast {...defaultProps} closable={false}>test</Toast>);
    const instance = component.instance();
    const container = component.find('.an-toast');
    jest.useFakeTimers();
    expect(component.find('.an-toast__content——close')).toHaveLength(0);
    expect(container).toHaveLength(1);
    expect(component.find('.an-toast__content').text()).toBe('test');
    container.simulate('mouseenter');
    container.simulate('mouseleave');
    jest.runAllTimers(1500);
    expect(instance.closeTimer).toBe(null);
    expect(defaultProps.onClose).toHaveBeenCalled();
    component.unmount();
  });

  it('Toast closable is true and duration is 0 render without errors', () => {
    const component = mount(<Toast {...defaultProps} closable duration={0}>test</Toast>);
    const closeNode = component.find('a');
    expect(closeNode).toHaveLength(1);
    closeNode.simulate('click');
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
