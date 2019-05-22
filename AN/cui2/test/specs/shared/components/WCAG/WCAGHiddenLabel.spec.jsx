import React from 'react';
import { shallow } from 'enzyme';

import WCAGHiddenLabel from 'shared/components/WCAG/WCAGHiddenLabel';

const initialState = {
  value: 'test'
};
function setup(_state = initialState) {
  const state = Object.assign({},initialState, _state);
  const component = shallow(<WCAGHiddenLabel {...state} />);
  return {
    component,
    label: component.find('.an-hide-wcag-label')
  };
}

describe('shared/components/WCAG', () => {
  it('should render component correctly', () => {
    const { component, label } = setup();
    expect(component.length).toEqual(1);
    expect(label.text()).toEqual('test');
  });
});

