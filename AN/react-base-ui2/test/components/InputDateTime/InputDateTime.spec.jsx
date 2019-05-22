import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import toJson from 'enzyme-to-json';
import InputDateTime from 'src/components/InputDateTime';
import InputDate from 'src/components/InputDate';
import InputTime from 'src/components/InputTime';

function setup(props = {}) {
  const component = shallow(<InputDateTime {...props} />);
  return {
    component,
    inputDate: component.find(InputDate),
    inputTime: component.find(InputTime)
  };
}

describe('InputDateTime Component', () => {
  it('InputDateTime should render correctly', () => {
    const { component, inputDate, inputTime } = setup({
      timeStep: 34,
      dateFormat: 'dddd- MMM DD, YYYY',
      timeFormat: 'HH:mm ',
      'data-qa-id': 'testid'
    });
    expect(toJson(component)).toMatchSnapshot();

    expect(inputDate.length).toEqual(1);
    expect(inputDate.prop('format')).toEqual('dddd- MMM DD, YYYY');
    expect(inputTime.length).toEqual(1);
    expect(inputTime.prop('format')).toEqual('HH:mm ');
    expect(inputTime.prop('timeStep')).toEqual(34);

    expect(component.find('div').first().prop('className')).toEqual('an-input-datetime ');
    component.setProps({ className: 'test2Class' });
    expect(component.find('div').first().prop('className')).toEqual('an-input-datetime test2Class');
    expect(component.find('div').first().prop('data-qa-id')).toEqual('testid');
  });
  it('component state should be changed correctly when receive new props', () => {
    const initDateTime = '2014-02-08 09:30:12';
    const newDateTime = '2013-02-08 09:30';
    const { component } = setup({ value: initDateTime });
    component.setProps({ value: initDateTime });
    expect(component.state().value).toEqual(moment(initDateTime));

    component.setProps({ value: newDateTime });

    expect(component.state().value).toEqual(newDateTime);

    component.setProps({ value: '2x20:0x-1x' });
    expect(component.state().value).toEqual('2x20:0x-1x');

    component.setProps({ value: '01:0x-3x' });
    expect(component.state().value).toEqual('01:0x-3x');
  });

  it('inputDate should have correct value when receive new props',()=>{
    const initDateTime = '2014-02-08 09:30:12';
    const { inputDate } = setup({ value: initDateTime });
    expect(inputDate.prop('value')).toEqual(moment(initDateTime));
  });
  it('inputTime should have correct value when receive new props',()=>{
    const initDateTime = '2014-02-08 09:30:12';
    const { inputTime } = setup({ value: initDateTime });
    expect(inputTime.prop('value')).toEqual(moment(initDateTime));
  });

  it('handleValueChange should triggered correctly on InputDate', () => {
    const { component, inputDate } = setup({ value: '2014-02-08 09:30:12' });
    const _ins = component.instance();
    const handleValueChangeSpy = jest.spyOn(_ins, 'handleValueChange');
    inputDate.simulate('valueChange', { value: moment('2014-02-09') });
    expect(handleValueChangeSpy).toHaveBeenCalledWith({ value: moment('2014-02-09') }, true);
    expect(inputDate.prop('value')).toEqual(moment('2014-02-08 09:30:12'));
  });

  it('handleValueChange should triggered correctly on InputTime', () => {
    const { component, inputTime } = setup({ value: '2014-02-08 09:30:12', onValueChange: null });
    const _ins = component.instance();
    const handleValueChangeSpy = jest.spyOn(_ins, 'handleValueChange');
    _ins.handleValueChange({ value: moment('2014-02-09 09:30:12') });
    inputTime.simulate('valueChange', { value: moment('2014-02-09 09:30:12') });
    expect(handleValueChangeSpy).toHaveBeenCalledWith({ value: moment('2014-02-09 09:30:12') });
    expect(handleValueChangeSpy).toHaveBeenCalledWith({ value: moment('2014-02-09 09:30:12') }, false);
    expect(inputTime.prop('value')).toEqual(moment('2014-02-08 09:30:12'));
  });
});
