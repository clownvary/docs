import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SpecialHandlingAlert } from 'shared/components/SpecialHandling/SpecialHandlingAlert';

describe('shared/components/SpecialHandling/SpecialHandlingAlert', () => {
  const props = {
    shown: true,
    customerName: 'Amy Chen',
    notes: 'notes content',
    medicalAlert: 'medical alert content',
    medicalAlertShown: true,
    generalAlert: 'general alert content (staff only)'
  };

  it('component renders fine', () => {
    const component = mount(<SpecialHandlingAlert {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component renders fine when no content detail', () => {
    const component = mount(
      <SpecialHandlingAlert
        {...props}
        notes=""
        medicalAlert=""
        generalAlert=""
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component renders fine when no medical permission', () => {
    const component = mount(
      <SpecialHandlingAlert {...props} medicalAlertShown={false} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component works fine', () => {
    const closeSpecialHandlingAlert = jest.fn();
    const component = mount(
      <SpecialHandlingAlert
        {...props}
        onClose={closeSpecialHandlingAlert}
      />
    );

    component.find('span.icon-close.modal-close').simulate('click');
    expect(closeSpecialHandlingAlert).toHaveBeenCalledTimes(1);

    component.find('button.btn.btn-strong').simulate('click');
    expect(closeSpecialHandlingAlert).toHaveBeenCalledTimes(2);
  });
});
