import React from 'react';
import { mount } from 'enzyme';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import EventInfo from 'index/PermitContract/components/EventInfo';
import Information from 'index/PermitContract/components/WaiverInformation/Information';
import Waiver from 'index/PermitContract/components/WaiverInformation/Waiver';
import permitContractData from 'json/PermitContract/permit_contract_info.json';

const { events: eventsData } = permitContractData.body
const events = eventsData.map((e) => {
  const event = convertCasingPropObj(e);
  if (event.checklist) {
    event.waivers = event.checklist.waivers;
  }
  delete event.checklist;
  return event;
})

const infos = [
    {
      description: 'A waiver is the voluntary relinquishment or surrender of some known right or privilege.',
      signingStatus: 'Checked',
      transactionstageID: 3518
    },
    {
      description: 'An agreement that you do not have to pay or obey something',
      signingStatus: 'Checked',
      transactionstageID: 3519
    }
  ];

const setup = (overrides) => {
  const props = {
    events,
    ...overrides
  }

  const wrapper = mount(<EventInfo {...props} />)

  return { wrapper }
}

describe('index/PermitContract/components/EventInfo/index.jsx', () => {
  test('render EventInfo correctly', () => {
    const { wrapper: wrapper1 } = setup();
    expect(wrapper1.find(Waiver).length).toBe(2);

    const { wrapper: wrapper2 } = setup({ events: events.map((e) => {
      delete e.waivers
      e.infos = infos
      return e
    })});
    expect(wrapper2.find(Information).length).toBe(2);

    const { wrapper: wrapper3 } = setup({ events: undefined });
    expect(wrapper3.find(Information).length).toBe(0);
    expect(wrapper3.find(Waiver).length).toBe(0);
  })
})
