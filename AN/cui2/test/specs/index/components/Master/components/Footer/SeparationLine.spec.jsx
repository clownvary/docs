import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { SeparationLine } from 'index/components/Master/components/Footer/SeparationLine';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

function setup(_context = context) {

  const component = mount(
    <SeparationLine />, { context: _context, childContextTypes });

  return {
    component,
    separationLine: component.find('.an-footer__separation-line')
  };
}

describe('index/components/Master/components/Footer/SeparationLine', () => {
  it('should render out all expected Content child components', () => {
    const {
      separationLine
    } = setup();

    expect(separationLine.length).toEqual(1);
  });
});

