import React from 'react';
import { mount } from 'enzyme';

import Portal from 'src/components/Portal';

describe('components/Portal', () => {
  it('component works fine', () => {
    const component = mount(
      <Portal CSSPrefix="an-test">
        <div className="an-test-portal-children">
          children content...
        </div>
      </Portal>
    );

    expect(component).toBeTruthy();
    expect(document.querySelector('.an-test-portal')).toBeTruthy();
    expect(document.querySelector('.an-test-portal-children')).toBeTruthy();

    component.unmount();
    expect(document.querySelector('.an-test-portal')).toBeNull();
  });
});
