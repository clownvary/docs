import React from 'react';
import { Heading } from 'shared/components/Heading';
import { mount } from 'enzyme';

describe('shared/components/Heading', () => {
  it('Should render component correctly', () => {
    const component = mount(
      <Heading className="test-head-1" level={1} align="right">
        Head 1
      </Heading>
    );

    expect(component.find('h1.test-head-1.u-text-right').text()).toEqual('Head 1');
  });
});
