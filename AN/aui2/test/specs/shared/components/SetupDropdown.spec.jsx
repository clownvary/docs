import React from 'react';
import { mount } from 'enzyme';
import SetupDropdown from 'shared/components/SetupDropdown';

const data = [
  {
    id: -1,
    value: -1,
    name: '-1 Min',
    text: '-1 Min'
  }, {
    id: 0,
    value: 0,
    name: '0 Min',
    text: '0 Min'
  }, {
    id: 3,
    value: 3,
    name: '3 Min',
    text: '3 Min'
  }, {
    id: 5,
    value: 5,
    name: '5 Min',
    text: '5 Min'
  }, {
    id: 10,
    value: 10,
    name: '10 Min',
    text: '10 Min'
  }, {
    id: 60,
    value: 60,
    name: '60 Min',
    text: '60 min'
  }, {
    id: 90,
    value: 90,
    name: '1.5 H',
    text: '1.5 H'
  }
];

const defaultProps = {
  disabled: true,
  value: 5,
  name: 'setup-dropdown',
  disableTextInput: false,
};

const setup = (props = defaultProps) => {
  const component = mount(<SetupDropdown {...props} />);
  const instance = component.instance();

  return {
    component,
    instance
  };
};

describe('shared => components => SetupDropdown', () => {
  test('should rendered correctly', () => {
    const {
      component,
      instance
    } = setup();
    component.setState({
      isExpanded: true,
      activeItemIndex: 2,
      data
    });

    const list = component.find('ul').find('li');
    list.at(0).simulate('click');

    const dropdownInput = component.find('input').at(0);
    component.setProps({
      value: 3,
      data,
      disabled: false,
      onSelect: jest.fn(),
      isValidValue: jest.fn(() => false),
      onChange: false
    });
    list.at(0).simulate('click');

    jest.useFakeTimers();
    jest.runAllTimers();
    jest.clearAllTimers();

    const event1 = {
      target: {
        value: '/'
      }
    };

    const event2 = {
      target: {
        value: '123'
      },
      keyCode: 38
    };
    dropdownInput.simulate('input', event1);
    dropdownInput.simulate('blur', event1);

    component.setProps({
      onChange: jest.fn(),
      onBlur: jest.fn(),
      isValidValue: jest.fn(() => true)
    });
    list.at(0).simulate('click');
    dropdownInput.simulate('input', event2);

    jest.useFakeTimers();
    dropdownInput.simulate('blur', event2);
    jest.runAllTimers();
    jest.clearAllTimers();

    dropdownInput.simulate('keyDown', { keyCode: 38 });

    component.setProps({
      activeItemIndex: 3
    });
    dropdownInput.simulate('keyDown', { keyCode: 38 });
    dropdownInput.simulate('keyDown', { keyCode: 40 });
    dropdownInput.simulate('keyDown', { keyCode: 13 });
    dropdownInput.simulate('keyDown', { keyCode: 27 });
    dropdownInput.simulate('keyDown', { keyCode: 1 });

    component.setProps({
      activeItemIndex: -1
    });
    dropdownInput.simulate('keyDown', { keyCode: 13 });

    component.setProps({
      activeItemIndex: 0
    });
    dropdownInput.simulate('keyDown', { keyCode: 40 });

    component.setState({
      isExpanded: true
    });
    dropdownInput.simulate('keyDown', { keyCode: 9 });

    component.setState({
      isExpanded: true
    });
    instance.hideWhenClickOutSide({
      clientX: 10,
      clientY: 10
    });
    instance.toggleMenu();

    component.setState({
      isExpanded: false
    });
    instance.hideWhenClickOutSide({
      clientX: 10,
      clientY: 10
    });

    SetupDropdown.getMinutes(6000);
    SetupDropdown.getHours(60);
    SetupDropdown.getHours(6000);
    SetupDropdown.generateFormattedValue();
    SetupDropdown.generateFormattedValue('1 H');
    SetupDropdown.generateFormattedText();
    SetupDropdown.generateFormattedText('1 min');
    SetupDropdown.generateFormattedText('61 min');
    SetupDropdown.generateFormattedText('61 H');
    SetupDropdown.generateFormattedText('61');

    expect(component.find('div').at(0).hasClass('setup-dropdown')).toBeTruthy();
    expect(component.find('Input')).toHaveLength(1);
    expect(component.find('ul').hasClass('setup-dropdown-menu')).toBeTruthy();
    expect(list.length).toBe(7);

    instance.listData();

    component.unmount();
  });
});

