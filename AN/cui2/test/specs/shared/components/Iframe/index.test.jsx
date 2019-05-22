import React from 'react';
import Iframe from 'shared/components/Iframe';
import { mount } from 'enzyme';

describe('shared/components/Iframe', () => {
  it('Should render component correctly', () => {
    const component = mount(
      <Iframe src="abc" className="test-class" />
    );

    expect(component.find('.an-iframe')).toHaveLength(1);
    expect(component.find('.test-class')).toHaveLength(1);
    expect(component.find('.an-iframe').at(0).prop('src')).toBe('abc');
  });
});
