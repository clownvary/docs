import React from 'react';
import { Card } from 'shared/components/Card';
import { mount } from 'enzyme';

describe('shared/components/Card', () => {
  it('Should render component correctly', () => {
    const component = mount(
      <Card className="test-card-class">
        card content
      </Card>
    );

    expect(component.find('.test-card-class').text()).toEqual('card content');
  });
});
