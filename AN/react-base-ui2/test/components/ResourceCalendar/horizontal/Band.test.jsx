import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ResourceCell from 'src/components/ResourceCalendar/common/ResourceCell';
import Band from 'src/components/ResourceCalendar/horizontal/Band';

const initState = {
  rowHeight: '20'
};
const actions = {
  onResourceHeaderClick: jest.fn(),
  onRemove: jest.fn()
};
const setup = (props) => {
  const state = Object.assign({}, initState, props);
  const Component = shallow(<Band {...actions} {...state} />);
  return { Component, actions };
};

describe('src/components/ResourceCalendar/horizontal/Band', () => {

  it('should render well', () => {
    const { Component } = setup();
    const tree = renderer.create(<Band {...actions} {...initState} />).toJSON();
    expect(Component.find('.an-rc-grid-band').length).toEqual(1);
    expect(tree).toMatchSnapshot();
  });
  it('should render well when resource is not null', () => {
    const resources = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const { Component } = setup({ resources });
    expect(Component.find('.an-rc-grid-band').length).toEqual(1);
    expect(Component.find(ResourceCell).length).toEqual(resources.length);
    Component.find('.grid-row').forEach((n) => {
      expect(n.prop('style')).toEqual({ height: '20px' });
    });
  });
  it('should render well when resource is not null and rowHeight <=0', () => {
    const resources = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const { Component } = setup({ resources, rowHeight: 0 });
    expect(Component.find('.an-rc-grid-band').length).toEqual(1);
    expect(Component.find(ResourceCell).length).toEqual(resources.length);
    Component.find('.grid-row').forEach((n) => {
      expect(n.prop('style')).toEqual({});
    });
  });
});
