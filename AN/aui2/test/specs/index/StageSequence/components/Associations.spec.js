import React from 'react';
import { mount } from 'enzyme';
import Associations from 'index/StageSequence/components/Associations';

jest.mock('lodash/debounce', () => jest.fn((fn) => {
  fn.cancel = () => { };
  return fn;
}));

describe('index/StageSequence/components/Associations', () => {
  test('Associations works correctly', () => {
    const component = mount(<Associations data={['23', '2323']} />);
    const stageAssociations = component.find('.stage-associations');
    stageAssociations.simulate('mouseenter', { persist: () => { '23'; } });
    stageAssociations.simulate('mouseleave');

    expect(stageAssociations).toHaveLength(1);
  });
});
