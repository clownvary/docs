import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Duration from 'src/components/Duration';
import Dropdown from 'src/components/Dropdown';

function setup(props = {}) {
  const onChangeSpy = jest.fn();
  const component = shallow(<Duration onChange={onChangeSpy} {...props} />);
  return {
    component,
    onChangeSpy
  };
}

describe('Duration Component', () => {
  it('component should render correctly', () => {
    const tree = renderer.create(<Duration value={'09:20:32'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('static method fixTwo should works fine', () => {
    expect(Duration.fixTwo(null)).toEqual('');
    expect(Duration.fixTwo(2333)).toEqual('33');
  });
  it('should works fine when receive new props', () => {
    const { component } = setup({ value: '09:20:32' });
    component.setProps({ value: '09:20:32' });
    expect(component.state()).toMatchObject({
      hour: '09',
      minute: '20',
      second: '32'
    });

    component.setProps({ value: '09:20:34' });
    expect(component.state()).toMatchObject({
      hour: '09',
      minute: '20',
      second: '34'
    });

    component.setProps({ value: 1111 });
    expect(component.state()).toMatchObject({
      hour: '00',
      minute: '00',
      second: '00'
    });

    component.setProps({ value: 'x1:11:22' });
    expect(component.state()).toMatchObject({
      hour: '00',
      minute: '00',
      second: '00'
    });

    component.setProps({ value: '01:1x:22' });
    expect(component.state()).toMatchObject({
      hour: '00',
      minute: '00',
      second: '00'
    });

    component.setProps({ value: '01:1x:xx' });
    expect(component.state()).toMatchObject({
      hour: '00',
      minute: '00',
      second: '00'
    });
  });
  it('onChange should be triggered correctly', () => {
    const { component, onChangeSpy } = setup();
    component.find(Dropdown).first().simulate('change', { value: '10' });
    expect(onChangeSpy).toHaveBeenCalledWith('10:00:00');

    component.find(Dropdown).at(1).simulate('change', { value: '20' });
    expect(onChangeSpy).toHaveBeenCalledWith('10:20:00');

    component.find(Dropdown).at(2).simulate('change', { value: '30' });
    expect(onChangeSpy).toHaveBeenCalledWith('10:20:30');

    component.setProps({ onChange: null });
    component.find(Dropdown).at(2).simulate('change', { value: '40' });
    expect(onChangeSpy).not.toHaveBeenCalledWith('10:20:40');
  });
  it('DropDown component should be enabled/disabled when disabled is false/true', () => {
    const { component } = setup({ disabled: false });
    expect(component.find(Dropdown).everyWhere(node =>
      node.props().disabled === false)).toBeTruthy();
    component.setProps({ disabled: true });
    expect(component.find(Dropdown).everyWhere(node =>
      node.props().disabled === true)).toBeTruthy();
  });
});
