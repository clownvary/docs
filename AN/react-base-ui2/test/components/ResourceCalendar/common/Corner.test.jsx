import React from 'react';
import { mount } from 'enzyme';
import Corner from 'src/components/ResourceCalendar/common/Corner';
import renderer from 'react-test-renderer';

const setup = (props = {}) => {
  const Component = mount(<Corner {...props} />);
  const tree = renderer.create(<Corner {...props} />).toJSON();
  return { Component, tree };
};

describe('components/ResourceCalendar/common/Corner', () => {
  it('should render well', () => {
    const { Component, tree } = setup({ cornerLabel: 'test label' });
    expect(tree).toMatchSnapshot();
    expect(Component.find('.an-rc-grid-corner').length).toEqual(1);
    expect(Component.find('.cell-content').text()).toEqual('test label');
  });
});
