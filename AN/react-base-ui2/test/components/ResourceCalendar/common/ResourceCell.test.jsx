import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ResourceCell from 'src/components/ResourceCalendar/common/ResourceCell';
import { enableClearable, disableClearable } from 'src/services/decoration';

jest.mock('src/services/decoration', () => {
  return {
    enableClearable: jest.fn((ele, option) => {
      option.onClear();
    }),
    disableClearable: jest.fn()
  };
});
const initState = {
  resource: {
    label: 'test resource'
  }
};
const actions = {
  onResourceHeaderClick: jest.fn(),
  onClear: jest.fn()
};
const setup = (props = {}) => {
  const state = Object.assign({}, initState, props);
  const Component = mount(<ResourceCell {...actions} {...state} />);
  return { Component, actions };
};

describe('components/ResourceCalendar/common/ResourceCell', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render well', () => {
    const { Component } = setup();
    const tree = renderer.create(<ResourceCell {...actions} {...initState} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(Component.find('.resource-cell').length).toEqual(1);
    expect(Component.find('.resource-tag').text()).toEqual('T');
    expect(Component.find('.resource-tag').prop('className')).toContain('resource-tag-facility');
  });
  it('should render well when isHeader is fasle', () => {
    const { Component } = setup({ isHeader: false, resource: { label: null } });

    expect(Component.find('.resource-cell').length).toEqual(0);
    expect(Component.find('.resource-tag').text()).toEqual('F');
    expect(Component.find('.resource-tag').prop('className')).toContain('resource-tag-facility');
  });
  describe('events:', () => {
    it('enableClearable should be called when component did mount', () => {
      setup();
      expect(enableClearable).toHaveBeenCalled();
    });
    it('disableClearable should be called when component did mount', () => {
      const { Component } = setup();
      const cell = Component.instance().cell;
      Component.unmount();
      expect(disableClearable).toHaveBeenCalledWith(cell);
    });
    describe('onResourceHeaderClick Event:', () => {
      it('onResourceHeaderClick should be called correctly when isHeader is true', () => {
        const { Component } = setup();
        const span = Component.find('.resource-name');
        span.simulate('click');
        expect(actions.onResourceHeaderClick).toHaveBeenCalled();
      });
      it('onResourceHeaderClick should be called correctly when isHeader is false', () => {
        const { Component } = setup({ isHeader: false });
        const span = Component.find('.resource-name');
        span.simulate('click');
        expect(actions.onResourceHeaderClick).toHaveBeenCalled();
      });
      it('onResourceHeaderClick should not be called when onResourceHeaderClick is not a function', () => {
        const { Component } = setup({ onResourceHeaderClick: '' });
        const span = Component.find('.resource-name');
        span.simulate('click');
        expect(actions.onResourceHeaderClick).not.toHaveBeenCalled();
      });
    });
  });
});
