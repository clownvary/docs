import React from 'react';
import { mount } from 'enzyme';
import Daycare from 'index/modules/Daycare';

describe('index/modules/Daycare', () => {
  it('component renders fine', () => {
    const children = (<div className="mock-children">content...</div>);
    const component = mount(<Daycare>{children}</Daycare>);

    expect(component).toBeTruthy();
    expect(component.find('.mock-children')).toHaveLength(1);
  });
});
