import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import EmailPopup from 'index/PermitContract/components/ActionBar/EmailPopup';

describe('index/PermitContract/components/ActionBar/EmailPopup', () => {
  it('should render without errors', () => {
    const component = mount(<EmailPopup />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine', () => {
    const emailContract = jest.fn();
    const props = {
      title: 'Email Detail',
      confirmText: 'Send',
      cancelText: 'Cancel',
      permitNumber: 'RX102375',
      signatures: { customer: { email_address: 'test@ant.com' } },
      emailContract
    };

    const component = mount(<EmailPopup {...props} />);
    const instance = component.instance();

    expect(component).toBeTruthy();

    instance.open();

    const recipientsInput = component.find('input').at(0);
    const subjectInput = component.find('input').at(1);
    const contentTextArea = component.find('textarea');
    const sendBtn = component.find('button.btn-strong');
    expect(recipientsInput.node.value).toEqual('test@ant.com');
    recipientsInput.simulate('focus');
    expect(recipientsInput.node.value).toEqual('test@ant.com,');

    expect(subjectInput.node.value).toEqual('Permit #RX102375');
    expect(contentTextArea.node.value).toEqual('Hello,\nThis is an automated email notification regarding the Permit #RX102375.');
    expect(!sendBtn.node.disabled).toBeTruthy();

    const newSubject = 'Permit #RX102375 Email';
    subjectInput.simulate('change', { target: { value: newSubject } });
    expect(subjectInput.node.value).toEqual(newSubject);
    expect(instance.state.subject).toEqual(newSubject);

    const newContent = 'Here\'s your permit contract.'
    contentTextArea.simulate('change', { target: { value: newContent } });
    expect(contentTextArea.node.value).toEqual(newContent);
    expect(instance.state.content).toEqual(newContent);

    expect(!sendBtn.node.disabled).toBeTruthy();

    const invalidRecipients = 'invalidRecipients';
    recipientsInput.simulate('change', { target: { value: invalidRecipients } });
    expect(recipientsInput.node.value).toEqual(invalidRecipients);
    expect(instance.state.to).toEqual(invalidRecipients);

    expect(sendBtn.node.disabled).toBeFalsy();
    sendBtn.simulate('click');

    expect(component.find('div.alert-error').text()).toEqual('The address for Recipients is incorrectly formed.');

    const validRecipients = 'recipient1@example.com';
    recipientsInput.simulate('change', { target: { value: validRecipients } });
    expect(recipientsInput.node.value).toEqual(validRecipients);
    expect(instance.state.to).toEqual(validRecipients);

    expect(sendBtn.node.disabled).toBeFalsy();
    sendBtn.simulate('click');

    expect(component.find('div.alert-error')).toHaveLength(0);
  });

it('component should work fine', () => {
    const emailContract = jest.fn();
    const props = {
      title: 'Email Detail',
      confirmText: 'Send',
      cancelText: 'Cancel',
      permitNumber: 'RX102375',
      signatures: { },
      emailContract
    };

    const component = mount(<EmailPopup {...props} />);
    const instance = component.instance();
    instance.open();

    const recipientsInput = component.find('input').at(0);
    expect(recipientsInput.node.value).toEqual('');
    recipientsInput.simulate('focus');
    expect(component.find('.emailPopup__item--prompt')).toHaveLength(1);
  });
});
