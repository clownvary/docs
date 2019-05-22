import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import ResourceCalendar from 'src/components/ResourceCalendar';
import HorizontalView from 'src/components/ResourceCalendar/horizontal';

import resourceJson from './horizontal/resourceInfo.json';

const setup = (props = {}) => {
  const initState = {
    displayDate: moment('2018-09-23'),
    eventOrder: 'title',
    resources: [resourceJson],
    events: [],
    cornerLabel: 'test',
    exclusiveMode: false
  };
  const state = Object.assign({}, initState, props);
  const Component = mount(<ResourceCalendar {...state} />);
  return { Component };
};

describe('components/ResourceCalendar', () => {
  it('should render horizontal view', () => {
    const { Component } = setup();
    expect(Component.find(HorizontalView).length).toEqual(1);
  });
});
