import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import toJson from 'enzyme-to-json';
import Datepicker from 'src/components/DatePicker';
import Input from 'src/components/Input';
import { Calendar } from 'src/components/Calendar';

function setup(props = {}) {
  const actions = {
    formatDate: jest.fn(),
    formatTextValue: jest.fn(),
    onValueChange: jest.fn(),
    onCalendarOpen: jest.fn(),
    onCalendarClose: jest.fn()
  };
  const defaultProps = {
    style: {
      color: 'red'
    },
    name: 'date-picker',
    'data-qa-id': 'testid',
    showIcon: true,
    errored: false,
    min: undefined,
    max: undefined,
    disabledDates: undefined
  };
  const component = mount(<Datepicker {...actions} {...defaultProps} {...props} />);
  return {
    component,
    actions
  };
}

describe('DatePicker Component', () => {
  it('component should render correctly', () => {
    const { component } = setup({ showIcon: false });
    expect(toJson(component)).toMatchSnapshot();
    expect(component.find(Input).prop('postIcon')).toEqual(undefined);
    expect(component.find(Input).parent().prop('className')).toEqual(undefined);

    component.setProps({ className: 'testClass' });
    expect(component.find(Input).parent().prop('className')).toEqual('testClass');

    component.setProps({ showIcon: true });
    expect(component.find(Input).prop('postIcon')).toEqual('icon-calendar');
  });

  it('component life cycle should work fine', () => {
    const initDate = '2018-02-10';
    const newDate = '2018-02-23';
    const { component, actions } = setup({ value: moment(initDate) });
    const _ins = component.instance();
    expect(component.instance().value).toEqual([moment(initDate)]);

    _ins.value = moment(newDate);
    expect(component.state().value).toEqual([moment(newDate)]);
    expect(actions.onValueChange).toHaveBeenCalledTimes(1);
    expect(actions.onValueChange).toHaveBeenCalledWith({ value: [moment(newDate)] });

    component.setProps({ onValueChange: null, value: moment(newDate) });
    _ins.value = moment(newDate);
    expect(actions.onValueChange).toHaveBeenCalledTimes(1);
    expect(actions.onValueChange).toHaveBeenCalledWith({ value: [moment(newDate)] });
  });

  it('getTextValue method should works fine', () => {
    const { component, actions } = setup();
    const _ins = component.instance();
    _ins.getTextValue('1927-09-21');
    expect(actions.formatTextValue).toHaveBeenCalledWith('1927-09-21');

    component.setProps({ formatTextValue: null });
    expect(_ins.getTextValue(['test', 'test2'])).toEqual('2 date(s) selected');

    _ins.getTextValue('test');
    expect(actions.formatDate).toHaveBeenCalledWith('test');

    component.setProps({ formatTextValue: null, formatDate: null });
    expect(_ins.getTextValue(null)).toEqual('');
    expect(_ins.getTextValue([])).toEqual('');
    expect(_ins.getTextValue('2018-x9-0x')).toEqual('');
    expect(_ins.getTextValue(['20x8-x9-20'])).toEqual('');
    expect(_ins.getTextValue([[111]])).toEqual('01/01/1970');
    expect(_ins.getTextValue('2018-09-20')).toEqual('09/20/2018');
    expect(_ins.getTextValue([['2018-09-20']])).toEqual('09/20/2018');
  });

  describe('events', () => {
    it('stopPropagation and stopPropagation should be triggered correctly when onFocus property is/is not function', () => {
      const { component, actions } = setup();
      const input = component.find('input');
      const tempActions = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        onFocus: jest.fn()
      };
      component.setProps({ onFocus: tempActions.onFocus });
      input.simulate('focus');
      expect(tempActions.onFocus).toHaveBeenCalled();
      expect(actions.onCalendarOpen).toHaveBeenCalled();

      component.setProps({ onFocus: undefined });
      input.simulate('focus', tempActions);
      expect(tempActions.stopPropagation).toHaveBeenCalled();
      expect(tempActions.preventDefault).toHaveBeenCalled();
    });
    it('onCalendarOpen should not be triggered when onCalendarOpen is not a function ', () => {
      const { component, actions } = setup({ onCalendarOpen: null });
      const input = component.find('input');
      input.simulate('focus');
      expect(actions.onCalendarOpen).not.toHaveBeenCalled();
    });
    it('onCalendarOpen should be triggered when onCalendarOpen is a function ', () => {
      const { component, actions } = setup();
      const input = component.find('input');
      input.simulate('focus');
      expect(actions.onCalendarOpen).toHaveBeenCalled();
    });
    it('onCalendarClose should not be triggered when onCalendarClose is not a function', () => {
      const tempPopup = Calendar.popup;
      const { component, actions } = setup({ onCalendarClose: null });
      const input = component.find('input');
      Calendar.popup = jest.fn(() => {
        return {
          result: Promise.reject()
        };
      });
      input.simulate('focus');
      expect(actions.onCalendarClose).not.toHaveBeenCalled();

      Calendar.popup = jest.fn(() => {
        return {
          result: Promise.resolve()
        };
      });
      input.simulate('focus');
      expect(actions.onCalendarClose).not.toHaveBeenCalled();
      Calendar.popup = tempPopup;
    });
    it('calendar should be render correctly when focus on input', () => {

      const initProps = {
        value: moment('2018-02-10'),
        min: moment('1990-02-02'),
        max: moment('2030-02-02'),
        disabledDates: undefined,
        'data-qa-id': 'test'
      };
      const { component } = setup(initProps);
      const _ins = component.instance();
      const input = component.find('input');
      input.simulate('focus');
      const calendarOptions = _ins.calendar.wrappedComponent.props;

      expect(calendarOptions.value).toEqual([initProps.value]);
      expect(calendarOptions.min).toEqual(initProps.min);
      expect(calendarOptions.max).toEqual(initProps.max);
      expect(calendarOptions.disabledDates).toEqual([]);
      expect(calendarOptions['data-qa-id']).toEqual('test-calendar');
    });
  });
});
