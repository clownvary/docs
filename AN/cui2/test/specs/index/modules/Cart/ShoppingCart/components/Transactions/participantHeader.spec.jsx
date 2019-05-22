import React from 'react';
import { shallowWithIntl, mountWithIntl } from 'utils/enzymeWithIntl';// eslint-disable-line
import { ParticipantHeader } from 'index/modules/Cart/ShoppingCart/components/Transactions/ParticipantHeader';
import { FormattedDyncMessage, FormattedNumber, FormattedMessage } from 'shared/translation/formatted';
import messages from 'source/en-US';
import jsonTransactions from 'Cart/ShoppingCart/get_transactions.json';// eslint-disable-line

const intl = {
  messages
};
const { body: { participants } } = jsonTransactions;
const initialState = {
  intl,
  index: 1,
  participant: participants[0]
};
function setup(_state = initialState) {
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(<ParticipantHeader {...state} />);
  return {
    component,
    bubble: component.find('.an-bubble')
  };
}

describe('index/modules/Cart/ShoppingCart/components/Transactions/ParticipantHeader', () => {
  it('should render component correctly', () => {
    const { component } = setup();
    expect(component.length).toEqual(1);
  });
  it('should render name message correctly', () => {
    const { component } = setup({ participant: { first_name: 'test', last_name: 'name' } });
    const tempsFirstName = component.find(FormattedDyncMessage).filterWhere(n => n.prop('value') === 'test');
    const tempsLastName = component.find(FormattedDyncMessage).filterWhere(n => n.prop('value') === 'name');
    expect(tempsFirstName.length).toEqual(1);
    expect(tempsLastName.length).toEqual(1);
  });
  it('should render bubble correctly', () => {
    const { bubble } = setup();
    expect(bubble.length).toEqual(1);
  });
  it('should render bubble message correctly', () => {
    const { component, bubble } = setup({ participant: { item_number: 1, sub_total: 100 } });
    const tempsMsg = bubble.find(FormattedNumber).find(FormattedMessage);
    expect(tempsMsg.text()).toEqual('1 item, $100.00 in total.');
    component.setProps({ participant: { item_number: 10, sub_total: 100 } });
    const tempsMsg1 = bubble.find(FormattedNumber).find(FormattedMessage);
    expect(tempsMsg1.text()).toEqual('10 items, $100.00 in total.');
  });
});

