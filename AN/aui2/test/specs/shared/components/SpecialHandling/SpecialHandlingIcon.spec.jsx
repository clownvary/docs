import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SpecialHandlingIcon } from 'shared/components/SpecialHandling/SpecialHandlingIcon';

describe('shared/components/SpecialHandling/SpecialHandlingIcon', () => {
  it('component renders fine', () => {
    const component = mount(<SpecialHandlingIcon customerId="1123" />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component works fine', () => {
    const fetchSpecialHandlingInfo = jest.fn();
    const component = mount(
      <SpecialHandlingIcon
        customerId="1123"
        fetchSpecialHandlingInfo={fetchSpecialHandlingInfo}
      />
    );

    component.find('i.special-handling-alert__icon').simulate('click');
    expect(fetchSpecialHandlingInfo).toHaveBeenCalledTimes(1);
    expect(fetchSpecialHandlingInfo).toHaveBeenCalledWith("1123");
  });
});
