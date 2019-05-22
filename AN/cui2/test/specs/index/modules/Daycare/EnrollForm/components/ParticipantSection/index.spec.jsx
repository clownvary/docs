import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import Section from 'index/modules/Daycare/EnrollForm/components/Section';
import { ParticipantSection } from 'index/modules/Daycare/EnrollForm/components/ParticipantSection';
import context, { childContextTypes } from 'utils/context';

const participants = {
  id: null,
  validId: null,
  list: [
    {
      id: 1,
      name: 'Bo Xu',
      validation_msg: null
    },
    {
      id: 2,
      name: 'Flora1 Xu',
      validation_msg: 'Does not meet gender qualification.'
    }
  ]
};

const params = {
  programId: 1
};

const receipt = {
  receiptNumber: 0
};

const actions = {
  selectParticipant: jest.fn(() => new Promise(resolve => resolve())),
  expandSection: jest.fn(),
  collapseSection: jest.fn(),
  fetchParticipantsAction: jest.fn()
};

const setup = (props) => {
  const component = mountWithIntl(<ParticipantSection
    sectionNumber={1}
    participants={fromJS(participants)}
    receipt={fromJS(receipt)}
    expanded
    disabled={false}
    error={fromJS({ required: false, messages: [] })}
    params={params}
    responsive={{ isSm: false, isMd: false, isLg: true }}
    {...actions}
    {...props}
  />, { context, childContextTypes });

  return {
    component
  };
};

jest.mock('shared/utils/openTheExistingPage.js', () => jest.fn(() => ({ close() {} })));

describe('index/modules/Daycare/EnrollForm/components/ParticipantSection', () => {
  it('should render correctly', () => {
    const { component } = setup();
    expect(component.find(Section).length).toBe(1);

    expect(component.find('.is-disabled')).toHaveLength(0);

    const collapseIcon = component.find('.icon-chevron-down').at(0);
    collapseIcon.simulate('click');
    expect(actions.collapseSection).toHaveBeenCalled();

    component.setProps({ expanded: false });
    const expandIcon = component.find('.icon-chevron-down').at(0);
    expandIcon.simulate('click');
    expect(actions.collapseSection).toHaveBeenCalled();
  });

  it('should render component with required error correctly', () => {
    const { component } = setup({ error: fromJS({ required: true, messages: [] }) });
    expect(component.find('.participant__error')).toHaveLength(1);
  });


  it('should render component with server validation error correctly', () => {
    const { component } = setup({
      error: fromJS({ required: false,
        messages: [
          'mock server error#1',
          'mock server error#2',
          'mock server error#3'
        ] })
    });
    const errorBlock = component.find('.participant__error');
    expect(errorBlock).toHaveLength(1);
    expect(errorBlock.text()).toEqual('mock server error#1');
  });

  it('should selectParticipant correctly', () => {
    const { component } = setup();
    const instance = component.instance();
    const participantId = 1;
    instance.selectParticipant({ value: participantId });
    expect(actions.selectParticipant).toBeCalledWith(participantId);
  });

  it('Participant Dropdown should no New family member link', () => {
    const { component } = setup();
    expect(component.find('.dropdown--with-footer')).toHaveLength(1);
    expect(component.find('.add-member')).toHaveLength(0);
  });

  it('showNewFamilyMemberPage is __newFamilyMember params customer_id is null should correctly', () => {
    const { component } = setup();
    const instance = component.instance();
    instance.showNewFamilyMemberPage();
    const spy = jest.spyOn(instance, 'selectParticipant');
    window.__newFamilyMember({ customer_id: '', type: 'participant' });
    expect(spy).not.toHaveBeenCalled;
  });

  it('showNewFamilyMemberPage is __newFamilyMember params is null should correctly', () => {
    const { component } = setup();
    const instance = component.instance();
    instance.showNewFamilyMemberPage();
    const spy = jest.spyOn(instance, 'selectParticipant');
    window.__newFamilyMember(null);
    expect(spy).not.toHaveBeenCalled;
  });

  it('showNewFamilyMemberPage is __newFamilyMember params not Object should correctly', () => {
    const { component } = setup();
    const instance = component.instance();
    instance.showNewFamilyMemberPage();
    const spy = jest.spyOn(instance, 'closeNewFamilyMemberWindow');

    window.__newFamilyMember({ customer_id: '232', type: 'participant' });
    expect(actions.selectParticipant).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('showNewFamilyMemberPage should correctly', () => {
    const { component } = setup();
    const instance = component.instance();
    instance.showNewFamilyMemberPage();
    component.unmount();
  });
});
