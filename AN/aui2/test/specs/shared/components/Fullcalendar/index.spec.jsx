import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Fullcalendar from 'shared/components/Fullcalendar';
import config from '../../../../../src/index/Resource/components/FullCalendar/config';

const businessHours = {
  start: '08:00:00',
  end: '18:00:00'
};

const resources = fromJS([{
  id: 'a',
  title: 'Resource A'
}]);

const events = fromJS([{
  id: '1',
  resourceID: 'a',
  start: '2016-04-02T07:00:00',
  end: '2016-04-02T14:00:00',
  title: 'event 1'
}]);

const updateResources = fromJS([{
  id: 'a',
  title: 'Resource A'
}, {
  id2: 'b',
  title: 'Resource B'
}]);

const updateEvents = fromJS([{
  id: '1',
  resourceID: 'a',
  start: '2016-04-02T07:00:00',
  end: '2016-04-02T14:00:00',
  title: 'event 1'
}, {
  id: '2',
  resourceId: 'b',
  start: '2016-04-02T09:00:00',
  end: '2016-04-02T14:00:00',
  title: 'event 2',
  color: '#257e4a'
}]);

const updateBusinessHours = {
  start: '09:00:00',
  end: '19:00:00'
};

const businessHoursNoEnd = {
  start: '09:00:00'
};

const defaultProps = {
  resourceIdField: 'id',
  resources,
  events,
  businessHours,
  showBusinessHours: true,
  minTime: '00:00:00',
  maxTime: '24:00:00',
  now: '2016-04-02T11:50:00'
};

const setup = (props = defaultProps) => {
  const actions = {};

  const component = mount(
    <Fullcalendar
      {...config}
      {...props}
      {...actions}
    />,
  { attachTo: document.getElementById('app') });

  const instance = component.instance();
  return {
    component,
    instance,
    actions
  };
};

describe('shared/components/Fullcalendar/index', () => {
  let component = null;
  let instance = null;

  beforeEach(() => {
    const app = document.createElement('div');
    app.setAttribute('id', 'app');
    document.body.appendChild(app);

    const fullcalendar = setup();
    component = fullcalendar.component;
    instance = fullcalendar.instance;
  });

  afterEach(() => {
    const app = document.getElementById('app');
    document.body.removeChild(app);
  });

  it('should render Fullcalendar correctly', () => {
    const $container = $('.fc-view-container');
    expect($container.find('.fc-view').length).toEqual(1);
    expect(typeof component.node.calendarDiv).toEqual('object');
  });

  it('update events and resource correctly', () => {
    component.setProps({
      showBusinessHours: true,
      resources: updateResources,
      events: updateEvents,
      now: '2017-04-02T11:50:00'
    });

  });

  it('set minTime correctly if showBusinessHours if false', () => {
    component.setProps({
      resources,
      events,
      showBusinessHours: false,
      businessHours: updateBusinessHours,
      minTime: '02:00:00'
    });

  });

  it('change showBusinessHours correctly', () => {
    component.setProps({
      resources: updateResources,
      events: updateEvents,
      showBusinessHours: false,
      businessHours: businessHoursNoEnd
    });
    instance.updateTitle('2017/12/12');
    instance.setOption('setOption', 'minTime', businessHours.start, true);
    const $setStartTime = $('.fc-slats-labels').find('.fc-time').first();

    component.setProps({
      showBusinessHours: true
    });
  });

  it('should render Fullcalendar correctly when showBusinessHours default is false', () => {
    setup(Object.assign(defaultProps, {
      showBusinessHours: false
    }));
    const $noBuinessHoursStartTime = $('.fc-slats-labels').find('.fc-time').first();
  });

  it('should remove Fullcalendar correctly', () => {
    component.unmount();
    expect(component.node.calendarDiv).toEqual(null);
  });
});
