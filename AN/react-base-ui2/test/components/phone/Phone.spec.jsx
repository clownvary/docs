import React from 'react';
import { mount,shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Phone from 'src/components/Phone';
import Input from 'src/components/Input';

function setup(props = {}) {
  const actions = {
    onChange:jest.fn()
  };
  const defaultProps = {
    value: '110-123456-09',
    disabled: false,
    onChange: actions.onChange,
    ariaLabel: 'ariaLabel'
  };
  const initState = Object.assign({}, defaultProps, props);
  const component = mount(<Phone {...actions} {...initState} />);
  return {
    component,
    actions
  };
}
jest.useFakeTimers();

describe('Phone Component', () => {
  it('component should render correctly', () => {
    const { component } = setup();
    expect(toJson(component)).toMatchSnapshot();
  });
  it('areaCode input should be render correctly', () => {
    const { component } = setup();
    expect(component.find(Input).at(0).prop('disabled') === false).toBeTruthy();
    expect(component.find(Input).at(0).prop('defaultValue')).toEqual('110');
    expect(component.find(Input).at(0).prop('ariaLabel')).toEqual('ariaLabel area code current value is');
    component.setProps({ value: '10033-3545656-12', disabled: true });
    expect(component.find(Input).at(0).prop('disabled') === true).toBeTruthy();
    expect(component.find(Input).at(0).prop('defaultValue')).toEqual('10033');
  });
  it('mainCode input should be render correctly', () => {
    const { component } = setup();
    expect(component.find(Input).at(1).prop('disabled') === false).toBeTruthy();
    expect(component.find(Input).at(1).prop('defaultValue')).toEqual('123456');
    expect(component.find(Input).at(1).prop('ariaLabel')).toEqual('ariaLabel phone number current value is');
    component.setProps({ value: '10033-3545656-12', disabled: true });
    expect(component.find(Input).at(1).prop('disabled') === true).toBeTruthy();
    expect(component.find(Input).at(1).prop('defaultValue')).toEqual('3545656');
  });
  it('extendCode input should be render correctly', () => {
    const { component } = setup();
    expect(component.find(Input).at(2).prop('disabled') === false).toBeTruthy();
    expect(component.find(Input).at(2).prop('defaultValue')).toEqual('09');
    expect(component.find(Input).at(2).prop('ariaLabel')).toEqual('ariaLabel extension number current value is');
    component.setProps({ value: '10033-3545656-12', disabled: true });
    expect(component.find(Input).at(2).prop('disabled') === true).toBeTruthy();
    expect(component.find(Input).at(2).prop('defaultValue')).toEqual('12');
  });
  it('value should not be change when newvalue equal old value', () => {
    const { component } = setup();
    const preState = component.state();
    component.setProps({ value: '110-123456-09' });
    expect(preState).toMatchObject(component.state());
  });
  it('getCodes method should works fine', () => {
    const { component } = setup();
    const _ins = component.instance();
    expect(_ins.getCodes()).toMatchObject({
      areaCode: '',
      mainCode: '',
      extendCode: ''
    });
    expect(_ins.getCodes('')).toMatchObject({
      areaCode: '',
      mainCode: '',
      extendCode: ''
    });
    expect(_ins.getCodes('123')).toMatchObject({
      areaCode: '123',
      mainCode: '',
      extendCode: ''
    });
    expect(_ins.getCodes('xxxxx12-')).toMatchObject({
      areaCode: 'xxxxx12',
      mainCode: '',
      extendCode: ''
    });
    expect(_ins.getCodes('xxxxx12-12')).toMatchObject({
      areaCode: 'xxxxx12',
      mainCode: '12',
      extendCode: ''
    });
    expect(_ins.getCodes('xxxxx12-12-1222')).toMatchObject({
      areaCode: 'xxxxx12',
      mainCode: '12',
      extendCode: '1222'
    });
    expect(_ins.getCodes('xxxxx12-12-1222-321')).toMatchObject({
      areaCode: 'xxxxx12',
      mainCode: '12',
      extendCode: '1222'
    });
  });

  describe('Events', () => {
    it('onChange should change state correclty', () => {
      const { component } = setup();
      component.find('input').forEach(n => n.simulate('change'));
      expect(component.state()).toMatchObject({ areaCode: '110', extendCode: '09', mainCode: '123456' });

      component.setProps({ value: 'xxx1-2311-321x' });
      component.find('input').forEach(n => n.simulate('change'));
      expect(component.state()).toMatchObject({ areaCode: 'xxx1', extendCode: '321x', mainCode: '2311' });
    });
    it('onBlur should tirgger customize onChange correctly', () => {
      const { component, actions } = setup();
      component.find('input').forEach(n => n.simulate('blur'));
      jest.runAllTimers();
      expect(actions.onChange).toHaveBeenCalledTimes(3);
      expect(actions.onChange).toHaveBeenCalledWith('110-123456-09');

      component.setProps({ value: '' });
      component.find('input').forEach(n => n.simulate('blur'));
      jest.runAllTimers();
      expect(actions.onChange).toHaveBeenCalledTimes(6);
      expect(actions.onChange).toHaveBeenCalledWith('');
    });
  });
});
