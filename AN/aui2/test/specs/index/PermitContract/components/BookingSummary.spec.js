import React from 'react';
import { mount } from 'enzyme';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import BookingSummary from 'index/PermitContract/components/BookingSummary';
import ResourceBookingSummary from 'index/PermitContract/components/BookingSummary/ResourceBookingSummary';
import permitContractData from 'json/PermitContract/permit_contract_info.json';

const { events: eventsData } = permitContractData.body
const events = eventsData.map(e => convertCasingPropObj(e))

const setup = (overrides) => {
  const props = {
    resources: events[0].resources,
    ...overrides
  }

  const wrapper = mount(<BookingSummary {...props} />)

  return { wrapper }
}

describe('index/PermitContract/components/BookingSummary/index.jsx', () => {
  test('render BookingSummary correctly', () => {
    const { wrapper } = setup();
    expect(wrapper.find(CollapsePanel).length).toBe(1);
    expect(wrapper.find(ResourceBookingSummary).length).toBe(events[0].resources.length)
  })
})
