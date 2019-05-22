import React from 'react';
import { shallow } from 'enzyme';

import PageFooter from 'shared/components/PageFooter/index';

const initialState = {
  className: 'test',
  classes: 'tests',
  children: '<h1>test</h1>',
  specificContent: 'test'
};
function setupLink(_state = initialState) {
  const state = Object.assign(initialState, _state);
  const component = shallow(<PageFooter {...state} />);
  return {
    component,
    specificContent: component.find('.page-footer-specific')
  };
}

describe('shared/components/PageFooter', () => {
  it('should render component correctly', () => {
    const { component, specificContent } = setupLink();
    expect(specificContent.length).toEqual(1);
    expect(component.find('div').first().prop('className')).toEqual(`${initialState.classes} ${initialState.className}`);
    const { specificContent: specificContent1 } = setupLink({ specificContent: null });
    expect(specificContent1.length).toEqual(0);
  });
});

