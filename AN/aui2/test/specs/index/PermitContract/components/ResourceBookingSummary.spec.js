import React from 'react';
import { mount } from 'enzyme';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import ResourceBookingSummary from 'index/PermitContract/components/BookingSummary/ResourceBookingSummary';
import permitContractData from 'json/PermitContract/permit_contract_info.json';

const { events: eventsData } = permitContractData.body
const events = eventsData.map(e => convertCasingPropObj(e))

const setup = (r, overrides) => {
  const resource = r || events[1].resources[0];
  const props = {
    firstResource: events[1].resources[0],
    resource,
    ...overrides
  }
  const wrapper = mount(<ResourceBookingSummary {...props} />)

  return { resource, wrapper }
}

describe('index/PermitContract/components/BookingSummary/ResourceBookingSummary.jsx', () => {
  test('render ResourceBookingSummary correctly', () => {
    const { wrapper, resource } = setup();
    const { resourceName, eventType } = resource;
    expect(wrapper.find('div.resource-info > div').first().text()).toEqual(`${resourceName} (${eventType})`)
  })

  test('render ResourceBookingSummary correctly', () => {
    const r = events[1].resources[1];
    const { wrapper, resource } = setup(r);
    const { resourceName, eventType } = resource;
    expect(wrapper.find('div.resource-info > div').first().text()).toEqual(`${resourceName} (${eventType})`)
  })

  test('render ResourceBookingSummary correctly', () => {
    const { wrapper, resource } = setup();
    const { resourceName, eventType } = resource;
    expect(wrapper.find('div.resource-info > div').first().text()).toEqual(`${resourceName} (${eventType})`)
  })

  test('Render fee items correctly', () => {
    const { wrapper } = setup();
    const expandControl = wrapper.find('tr.normal-booking i.expand-control').first();
    expect(expandControl.hasClass('icon-chevron-down')).toBe(true);
    expect(wrapper.find('tr.child').length).toBe(10);

    expandControl.simulate('click');
    expect(expandControl.hasClass('icon-chevron-up')).toBe(true);
    expect(wrapper.find('tr.child').length).toBeGreaterThan(0);

    expandControl.simulate('click');
    expect(expandControl.hasClass('icon-chevron-down')).toBe(true);
    expect(wrapper.find('tr.child').length).toBe(10);
  })

  test('Expand and Collapse recurring booking correctly', () => {
    const { wrapper } = setup();
    const expandControl = wrapper.find('tr.recurring-booking i.expand-control').first();
    expect(expandControl.hasClass('icon-chevron-down')).toBe(true);
    expect(wrapper.find('tr.child').length).toBe(10);

    expandControl.simulate('click');
    expect(expandControl.hasClass('icon-chevron-up')).toBe(true);
    expect(wrapper.find('tr.child').length).toBeGreaterThan(0);

    expandControl.simulate('click');
    expect(expandControl.hasClass('icon-chevron-down')).toBe(true);
    expect(wrapper.find('tr.child').length).toBe(10);
  })
})
