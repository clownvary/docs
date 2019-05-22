import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import BackTop from 'src/components/BackTop';

describe('components/BackTop', () => {
  it('BackTop component renders fine', async () => {
    window.requestAnimationFrame = jest.fn(fn => fn());
    const mockOnClick = jest.fn();
    document.documentElement.scrollTop = 400;
    const component = mount(
      <BackTop
        visibilityHeight={-1}
        scrollDuration={10}
        onClick={mockOnClick}
      />
    );
    component.instance().handleScroll();

    await new Promise(resolve => setTimeout(resolve, 0));
    new ReactWrapper(document.querySelector('.an-back-top__btn'), true).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(Math.abs(Math.round(document.documentElement.scrollTop))).toBe(0);

    expect(mockOnClick).toHaveBeenCalled();

    component.unmount();
  });
});
