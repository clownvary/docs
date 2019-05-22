import React from 'react';

import {
  mount
} from 'enzyme';

import Notes from 'index/RefundDeposits/components/Notes';

const initialState = {
  staffNotes: 'staff notes',
  customerNotes: 'customer notes',
  displayNotes: true
};

function setup(defaultState) {
  const state = Object.assign({}, initialState, defaultState);

  const actions = {
    onUpdateCustomerNotes: jest.fn(),
    onUpdateStaffNotes: jest.fn(),
    onShow: jest.fn(),
    onHide: jest.fn()
  };

  const component = mount(
    <Notes
      displayNotes={state.displayNotes}
      staffNotes={state.staffNotes}
      customerNotes={state.customerNotes}
      onUpdateCustomerNotes={actions.onUpdateCustomerNotes}
      onUpdateStaffNotes={actions.onUpdateStaffNotes}
      onShow={actions.onShow}
      onHide={actions.onHide}
    />);

  return {
    component,
    h3: component.find('h3'),
    icon: component.find('i'),
    notesContainer: component.find('.notes'),
    staffTextarea: component.find('#staffNote'),
    customerTextarea: component.find('#customerNote'),
    actions,
    state
  };
}

describe('index -> Refund Deposits -> components -> notes', () => {
  it('should render correctly when displayNotes === true', () => {
    const {
      h3,
      icon,
      notesContainer,
      staffTextarea,
      customerTextarea,
      state,
      actions
    } = setup();
    expect(h3.length).toEqual(1);
    expect(icon.length).toEqual(1);
    expect(icon.hasClass('icon-chevron-up')).toEqual(true);
    expect(icon.hasClass('icon-chevron-down')).toEqual(false);
    expect(notesContainer.length).toEqual(1);
    expect(staffTextarea.length).toEqual(1);
    expect(customerTextarea.length).toEqual(1);
    expect(staffTextarea.node.value).toEqual(state.staffNotes);
    expect(customerTextarea.node.value).toEqual(state.customerNotes);

    icon.simulate('click');
    expect(actions.onHide).toHaveBeenCalled();
  });

  it('should render correctly when displayNotes === false', () => {
    const {
      h3,
      icon,
      notesContainer,
      actions
    } = setup({ displayNotes: false });

    expect(h3.length).toEqual(1);
    expect(icon.length).toEqual(1);
    expect(icon.hasClass('icon-chevron-up')).toEqual(false);
    expect(icon.hasClass('icon-chevron-down')).toEqual(true);
    expect(notesContainer.length).toEqual(0);

    icon.simulate('click');
    expect(actions.onShow).toHaveBeenCalled();
  });

  it('should trigger blur event correctly when displayNotes === true', () => {
    const {
      staffTextarea,
      customerTextarea,
      actions
    } = setup();

    staffTextarea.simulate('blur');
    expect(actions.onUpdateStaffNotes).toHaveBeenCalled();

    customerTextarea.simulate('blur');
    expect(actions.onUpdateCustomerNotes).toHaveBeenCalled();
  });
});
