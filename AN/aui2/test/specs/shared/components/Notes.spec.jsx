import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import Notes from 'shared/components/Notes';
import { STAFF_NOTE, CUSTOMER_NOTE } from 'shared/consts/noteTypes';

const NEW_STAFF_NOTE = 'new stuff note';
const NEW_CUSTOMER_NOTE = 'new customer note';

const actions = {
  saveNotes: jest.fn(() => Promise.resolve('')),
  showUpdated: jest.fn(),
  setActionBarDisabled: jest.fn(),
  permitDetailsChanged: jest.fn(),
}

const notes = fromJS({
  [STAFF_NOTE]: 'staff note',
  [CUSTOMER_NOTE]: 'customer note',
  isExpand: false,
  showSection: false,
})

const defaultProps = {
  notes,
  readOnly: false,
}

const setup = (props = defaultProps) => {

  const wrapper = mount(<Notes {...props}  {...actions} />);
  const instance = wrapper.instance();

  return {
    wrapper,
    instance
  };
}

describe('shared => components => Notes', () => {
  it('should rendered correctly', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.notes-section.u-hidden')).toHaveLength(1);

    wrapper.setProps({ notes: notes.set('showSection', true)});
    expect(wrapper.find('.notes-section.u-hidden')).toHaveLength(0);

    expect(wrapper.find('#staffNote').first().props().value).toEqual(notes.get(STAFF_NOTE));
    expect(wrapper.find('#customerNote').first().props().value).toEqual(notes.get(CUSTOMER_NOTE));

    wrapper.setProps({ notes: fromJS({}) });
    expect(wrapper.state()[STAFF_NOTE]).toEqual('');
    expect(wrapper.state()[CUSTOMER_NOTE]).toEqual('');
  });

  it('should render disabled textares when readonly', () => {
    const { wrapper } = setup({ ...defaultProps, readOnly: true});
    expect(wrapper.find('textarea')).toHaveLength(2);
    expect(wrapper.find('textarea').every('.textarea-disabled')).toBe(true);
  });

  it('should handle changes correctly', () => {
    const { wrapper } = setup();

    const staffNote = wrapper.find('#staffNote');
    staffNote.simulate('change', { target: { value: NEW_STAFF_NOTE } });
    expect(wrapper.state()[STAFF_NOTE]).toEqual(NEW_STAFF_NOTE);

    const customerNote = wrapper.find('#customerNote');
    customerNote.simulate('change', { target: { value: NEW_CUSTOMER_NOTE } });
    expect(wrapper.state()[CUSTOMER_NOTE]).toEqual(NEW_CUSTOMER_NOTE);
  });

  it('should save note correctly', () => {
    const { wrapper, instance } = setup();

    const staffNote = wrapper.find('#staffNote');
    staffNote.simulate('blur');
    staffNote.simulate('change', { target: { value: NEW_STAFF_NOTE } });
    staffNote.simulate('blur');

    const customerNote = wrapper.find('#customerNote');
    customerNote.simulate('blur');
    customerNote.simulate('change', { target: { value: NEW_CUSTOMER_NOTE } });
    customerNote.simulate('blur');

    wrapper.setState({isChanged: true});
    instance.onNotesSaved();
    expect(wrapper.state().isChanged).toBe(false);
  });
});
