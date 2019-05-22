import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import CalendarTooltip from 'index/Resource/components/CalendarTooltip';

const { event } = __resourceCalender__.__initialState__;

const pendingLabel = ' PENDING RESERVATION';

const initialData = {
  permitID: -1
}
const props = {
  event,
  initialData
};

describe('index/Resource/components/CalendarTooltip', () => {
  const setup = initProps => mount(<CalendarTooltip {...initProps} />);

  it('The tooltip bookingAssignment equal to 0 should render without errors', () => {
    const nextEvent = {
      ...event,
      ...{
        bookingAssignment: 0,
        eventName: '',
        customerType: '',
        customerName: 'mord',
        resourceNumber: '',
        eventType: '',
        customer: 'alice',
        companyName: '',
        attendance: '',
        scheduleType: ''
      }
    };

    const component = setup({ event: nextEvent, initialData });
    expect(component.find('dl').length).toEqual(12);

    nextEvent.companyName = 'company facebook';
    const componentForCompany = setup({ event: nextEvent, initialData });
    expect(componentForCompany.find('dl').length).toEqual(12);
    const companyDl = componentForCompany.find('dl').at(2);
    expect(companyDl.find('dt').text()).toEqual('company');
    expect(companyDl.find('dd').text()).toEqual(nextEvent.companyName);
    const companyAgentDl = componentForCompany.find('dl').at(3);
    expect(companyAgentDl.find('dt').text()).toEqual('company Agent');
  });

  it('The tooltip should have the pending label when the permit doesn\'t be generated', () => {
    const component = setup(props);
    expect(component.find('.tooltip-title').text()).toBe(pendingLabel);
    const nextEvent = { ...event, ...{ type: 'skip' } };
    component.setProps({ event: nextEvent });
  });

  it('The tooltip bookingAssignment equal to 2 should render without errors', () => {
    const nextEvent = { ...event, ...{ bookingAssignment: 2, activityIgnoreMaximum: '23', resourceName: 'natatorium' } };
    const component = setup({ event: nextEvent, initialData });

    expect(component.find('dl').length).toEqual(6);
  });

  it('The tooltip bookingAssignment equal to 2 and activityIgnoreMaximum equal to null', () => {
    const nextEvent = {
      ...event,
      ...{
        bookingAssignment: 2, activityIgnoreMaximum: '', eventName: '', attendance: '', resourceNumber: ''
      }
    };

    const component = setup({ event: nextEvent, initialData });
    expect(component.find('dl').length).toEqual(6);
  });

  it('The tooltip bookingAssignment equal to 4 should render without errors', () => {
    const nextEvent = { ...event, ...{ bookingAssignment: 4, eventName: '', resourceName: 'facility' } };

    const component = setup({ event: nextEvent, initialData });
    expect(component.find('dl').length).toEqual(5);
  });

  it('The tooltip bookingAssignment equal to 4 should render without errors', () => {
    const nextEvent = { ...event, ...{ bookingAssignment: 4 } };

    const component = setup({ event: nextEvent, initialData });
    expect(component.find('dl').length).toEqual(5);
  });

  it('The tooltip resourceType equal to 1 should render without errors', () => {
    const nextEvent = { ...event, ...{ resourceType: 1 } };

    const component = setup({ event: nextEvent, initialData });
    expect(component.find('dl').length).toEqual(12);
  });

  it('The tooltip isAllDay equal to true should render without errors', () => {
    const nextEvent = { ...event, ...{ isAllDay: true, type: 'closed', permitID: '2323' } };

    const component = setup({ event: nextEvent, initialData });
    expect(component.find('dl').length).toEqual(1);
  });

  it('The tooltip should only have the pending description when the permit has been generated and in the process of modification', () => {
    const _event = fromJS(event).set('permitID', 12).toJS();
    const nextProps = { ...props, ...{ event: _event }, initialData: { permitID: '12' } };
    const calendarTooltip = setup(nextProps);

    expect(calendarTooltip.find('.tooltip-title').text()).toBe(pendingLabel);
  });

  it('The tooltip should not have any status description when the permit has been generated and not in the process of modification', () => {
    const _event = fromJS(event).set('permitID', 12).toJS();
    const calendarTooltip = setup({event: _event, initialData});
    expect(calendarTooltip.find('.tooltip-title')).toHaveLength(0);
  });
});
