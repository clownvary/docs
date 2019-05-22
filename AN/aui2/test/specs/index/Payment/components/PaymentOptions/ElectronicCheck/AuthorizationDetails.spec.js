import React from 'react';
import { mount } from 'enzyme';
import AuthorizationDetails from 'index/Payment/components/PaymentOptions/ElectronicCheck/AuthorizationDetails';

describe('index/Payment/components/PaymentOptions/ElectronicCheck/AuthorizationDetails', () => {
  it('AuthorizationDetails component should render without error', () => {
    const cancelShowAuthorizationDetails = jest.fn();
    const props = {
      content: 'Authorization details',
      cancelShowAuthorizationDetails
    };

    const component = mount(<AuthorizationDetails {...props} />);

    expect(component.find('.authorization-details')).toHaveLength(1);
    expect(component.find('.form-group').text()).toEqual('Authorization details');

    const agreement = component.find('input[type="checkbox"]');
    agreement.node.checked = true;
    agreement.simulate('change');

    component.find('button.btn-strong').simulate('click');
    expect(cancelShowAuthorizationDetails).toBeCalled();

    component.find('span.modal-close').simulate('click');
    expect(cancelShowAuthorizationDetails).toHaveBeenCalledTimes(2);
  });
});
