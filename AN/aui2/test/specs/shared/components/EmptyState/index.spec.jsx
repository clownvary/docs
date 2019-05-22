import React from 'react';
import { mount } from 'enzyme';
import EmptyState from 'shared/components/EmptyState';

describe('index/StageSequence/components/EmptyState', () => {
  test('EmptyState works correctly', () => {
    const component = mount(<EmptyState  />);
    expect(component.find('.empty-state')).toHaveLength(1);
    expect(component.find('.empty-state--lg')).toHaveLength(1);
    expect(component.find('.empty-state__title')).toHaveLength(1);
    expect(component.find('.empty-state__desc')).toHaveLength(0);
  });

  test('EmptyState works correctly', () => {
    const props = {
      icon: 'test-icon',
      size: 'xs',
      title: 'test title',
      desc: 'test desc',
    }
    const component = mount(<EmptyState {...props} />);
    expect(component.find('.empty-state--xs')).toHaveLength(1);
    expect(component.find('.empty-state__title').text()).toEqual('test title')
    expect(component.find('.empty-state__desc').text()).toEqual('test desc');

    component.setProps({ size: 'sm' });
    expect(component.find('.empty-state--sm')).toHaveLength(1);

    component.setProps({ size: 'm' });
    expect(component.find('.empty-state--m')).toHaveLength(1);
  });
});

