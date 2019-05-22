import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import { mount } from 'enzyme';
import AuthorizedPickupWrap, { AuthorizedPickup }
  from 'index/modules/Daycare/EnrollForm/components/EnrollDetailSection/AuthorizedPickup';
import context, { childContextTypes } from 'utils/context';

jest.mock('shared/utils/openTheExistingPage.js', () => jest.fn(() => ({ close() {} })));

describe('index/modules/Daycare/EnrollForm/components/EnrollDetailSection/AuthorizedPickup', () => {
  const props = {
    participantName: 'unit-tester',
    requiredPreMark: (<i className="test-pre-mark">*</i>),
    requiredPostMark: <i className="test-post-mark">(required)</i>,
    pickupList: [
      {
        name: 'pickup-tester#1',
        customer_id: 1,
        phone: '667-1193251',
        email: 'tester1@unittest.com'
      },
      { name: 'pickup-tester#2', customer_id: 2, phone: '667-1193252', email: '' },
      { name: 'pickup-tester#3', customer_id: 3, phone: '', email: 'tester3@unittest.com' }
    ],
    selectedPickupIds: [],
    error: fromJS({ required: false, messages: [] }),
    fetchPickups: jest.fn(() => new Promise(resolve => resolve())),
    onPickupSelect: jest.fn()
  };

  it('component renders fine', () => {
    const component = mountWithIntl(
      <AuthorizedPickupWrap {...props} />,
      { context, childContextTypes }
    );

    expect(component.find('.enroll-pickup')).toHaveLength(1);
    expect(component.find('.enroll-pickup-title').text())
      .toEqual('* Who is authorized to pick unit-tester (required)');
    expect(component.find('.enroll-pickup__error')).toHaveLength(0);
    expect(component.find('.enroll-pickup-option-footer')).toHaveLength(0);

    expect(component.find('.an-select-placeholder').text()).toEqual('Please select pickups from family list');
  });

  it('component renders fine if meet required error', () => {
    const errorProps = Object.assign({}, props, {
      error: fromJS({ required: true, messages: [] })
    });
    const component = mountWithIntl(<AuthorizedPickupWrap {...errorProps} />);

    expect(component.find('.enroll-pickup-select__error')).toHaveLength(1);
    expect(component.find('.enroll-pickup__error')).toHaveLength(1);
  });

  it('showNewFamilyMemberPage is onmessage params not Object should correctly', () => {
    const component = mount(
      <AuthorizedPickup {...props} intl={{ messages: 'test' }} />,
      { context, childContextTypes }
    );
    const instance = component.instance();
    const renderer = component.find('.an-select');
    renderer.simulate('click');

    instance.showNewFamilyMemberPage();

    const spy = jest.spyOn(instance, 'closeNewFamilyMemberWindow');

    window.__newFamilyMember({ customer_id: '232', type: 'pickup' });
    expect(props.fetchPickups).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    window.__newFamilyMember({ customer_id: '', type: 'pickup' });
    window.__newFamilyMember({ });
    component.unmount();
  });

  it('if window name not New family member should correctly', () => {
    window.name = 'New family member';
    const component = mount(
      <AuthorizedPickup {...props} intl={{ messages: 'test' }} />,
      { context, childContextTypes }
    );
    expect(component.find('.enroll-pickup-option-footer__text')).toHaveLength(0);
  });
});
