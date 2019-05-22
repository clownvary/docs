import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import PrintOptionPopup from 'index/PermitContract/components/ActionBar/PrintOptionPopup';

describe('index/PermitContract/components/ActionBar/PrintOptionPopup', () => {
  it('should render without errors', () => {
    const component = mount(<PrintOptionPopup />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine', () => {
    const component = mount(<PrintOptionPopup />);
    const instance = component.instance();
    expect(component).toBeTruthy();

    component.node.open(true);
    expect(component.find('div.is-open')).toHaveLength(1);
    expect(component.find('div.options-option-selected')).toHaveLength(1);

    const printOptions = component.find('div.options-option');
    expect(printOptions).toHaveLength(3);

    printOptions.at(0).simulate('click');

    expect(component.find('div.options-recurring')).toHaveLength(2);
    const recurringCheckbox = component.find('input[type="checkbox"]').first();
    recurringCheckbox.simulate('change', { target: {} });

    recurringCheckbox.node.value = true;
    recurringCheckbox.simulate('change', { target: { value: true } });

    printOptions.at(0).simulate('click');
    const breakdownFeeCheckbox = component.find('input[type="checkbox"]').last();
    breakdownFeeCheckbox.simulate('change', { target: {} })

    printOptions.at(1).simulate('click');
    expect(instance.state.option).toEqual('schedule');
    const printButton = component.find('button.btn-strong');
    printButton.simulate('click');

    breakdownFeeCheckbox.node.value = true;
    breakdownFeeCheckbox.simulate('change', { target: { value: true } });

    printOptions.at(0).simulate('click');

    printButton.simulate('click');

    const cancelButton = component.find('button.btn-secondary');
    cancelButton.simulate('click');

    component.node.open(false);
    expect(component.find('div.options-option')).toHaveLength(3);

    expect(instance.state.option).toEqual('permit');
    expect(component.find('div.options-option.is-disabled')).toHaveLength(1);
    printOptions.at(2).simulate('click');
    expect(instance.state.option).toEqual('permit');
  });

  it('handlePopupConfirm correctly', () => {
    const component = mount(<PrintOptionPopup />);
    const instance = component.instance();
    const pageContainer = document.createElement('div');
    pageContainer.classList.add('page-container');

    component.node.open(true);
    expect(component.find('div.is-open')).toHaveLength(1);
    component.setState({ containsRecurring: true})
    document.body.appendChild(pageContainer);
    instance.handlePopupConfirm();
    expect(component.find('div.is-open')).toHaveLength(0);
    expect(pageContainer.classList.contains('printing'));

    component.setState({ option: null });
    component.node.open(true);
    expect(component.find('div.is-open')).toHaveLength(1);

    instance.handlePopupConfirm();
    expect(component.find('div.is-open')).toHaveLength(0);
  })
});
