import { fromJS } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';
import Participant from 'index/modules/Cart/ShoppingCart/components/Transactions/Participant';

import jsonTransactions from 'Cart/ShoppingCart/get_transactions.json';// eslint-disable-line

const { body: { participants } } = jsonTransactions;
const initialState = {
  index: 1,
  participant: participants[0],
  expandedStatus: fromJS({}),
  hasExpandedStatus: fromJS({})
};
function setup(_state = initialState) {
  const state = Object.assign(initialState, _state);
  const component = shallow(<Participant {...state} />);
  return {
    component
  };
}

describe('index/modules/Cart/ShoppingCart/components/Transactions/Participant', () => {
  it('should render component correctly', () => {
    const { component } = setup();
    expect(component.length).toEqual(1);
  });

  it('should render component correctly', () => {
    const participant = jsonTransactions.body.participants[0];
    participant.first_name = '';
    participant.last_name = 'asd';
    const mockState = {
      index: 1,
      participant
    };
    const { component } = setup(mockState);
    expect(component.length).toEqual(1);
  });
});

