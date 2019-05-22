import React from 'react';
import { mount } from 'enzyme';
import TransactionItem from 'index/Confirmation/components/PermitConfirmation/TransactionItem';

const setup = props => mount(<TransactionItem {...props} />);

describe('index/Confirmation/components/PermitConfirmation/TransactionItem', () => {
  const props = {
    transaction: {
      reservation_summary: 'Annual Party Reservation 2017 - 1',
      total_charge: 25,
      facility_details: [
        {
          name: 'Party Room',
          quantity: 1,
          center_name:'test'
        },
        {
          name: 'Living Room',
          quantity: 2
        }
      ]
    }
  };

  const component = setup(props);

  it('component and initialization works fine', () => {
    const container = component.find('.transaction-item');
    expect(container).toHaveLength(1);

    const itemTitle = container.find('.item-title');
    expect(itemTitle).toHaveLength(1);
    expect(itemTitle.text()).toBe('Annual Party Reservation 2017 - 1');

    const facilityDetailDiv = container.find('.facility-detail').nodes;
    expect(facilityDetailDiv).toHaveLength(2);
    const details = props.transaction.facility_details;
    expect(facilityDetailDiv[0].textContent).toBe(`${details[0].name}Centertest`);
    expect(facilityDetailDiv[1].textContent).toBe(`${details[1].name}Center--`);
  });
});
