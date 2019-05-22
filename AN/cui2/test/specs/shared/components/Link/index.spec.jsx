import React from 'react';
import { shallow } from 'enzyme';

import { Link, IndexLink } from 'shared/components/Link/index';

const initialState = {
  to: 'http://www.test.com'
};
function setupLink(_state = initialState) {
  const state = Object.assign(initialState, _state);
  const component = shallow(<Link to={state.to} />);
  return {
    component
  };
}
function setupIndexLink(_state = initialState) {
  const state = Object.assign(initialState, _state);
  const component = shallow(<IndexLink to={state.to} />);
  return {
    component
  };
}
describe('shared/components/Link', () => {
  it('should return link href correctly', () => {
    window.__siteBaseName = 'testbase';
    const { component } = setupLink();
    expect(component.prop('to')).toEqual(window.__siteBaseName + initialState.to);

    window.__siteBaseName = null;
    const { component: component1 } = setupLink();
    expect(component1.prop('to')).toEqual(`${initialState.to}`);
  });
  it('should return indexlink href correctly', () => {
    window.__siteBaseName = 'testbase';
    const { component } = setupIndexLink();
    expect(component.prop('to')).toEqual(window.__siteBaseName + initialState.to);
  });
});

