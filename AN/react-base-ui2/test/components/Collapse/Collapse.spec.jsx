import React from 'react';
import { mount } from 'enzyme';
import Collapse from 'src/components/Collapse';
import Panel from 'src/components/Collapse/Panel';
import { KeyCode } from 'src/consts';

const props = {
  accordion: false,
  dataSource: [],
  onChange: jest.fn(),
  onPanelHeaderKeyDown: jest.fn()
};

const text = 'A dog is a type of domesticated animal.';

const dataSource = [
  {
    Header: ({ onToggleClick }) => (<div>
      <a className="self-button" onClick={() => onToggleClick()} tabIndex="0">click</a>
      self setting title,
      <span style={{ marginLeft: 30 }} onClick={() => console.log(this.state)}>delete</span>
    </div>),
    content: text
  },
  {
    Header: 'Rec Alcohol Permit-Area II',
    content: text
  },
  {
    Header: 'Rec Alcohol Permit-Area II',
    content: text
  },
  {
    Header: 'Permit Approval - CUPF to Parks',
    content: text,
    disabled: true
  },
  {
    Header: 'A CC site Manager  Approval',
    content: <p>Approval content</p>
  }
];


const setup = initProps => mount(<Collapse {...initProps} />);
describe('Collapse Component', () => {
  it('Collapse if dataSource is [] should render without errors', () => {
    const component = setup(props);

    expect(component.find(Panel)).toHaveLength(0);
  });

  it('Collapse should render without errors', () => {
    const component = setup({ ...props, dataSource });
    const instance = component.instance();
    expect(component.find(Panel)).toHaveLength(5);
    component.find('.icon-chevron-down').at(0).simulate('click');
    expect(instance.state.activeKey).toEqual(['1']);
    component.find('.icon-chevron-down').at(1).simulate('click');
    expect(instance.state.activeKey).toEqual(['1', '2']);
    component.find('.icon-chevron-down').at(1).simulate('click');
    expect(instance.state.activeKey).toEqual(['1']);

    // test disable
    component.find('.icon-chevron-down').at(2).simulate('click');
    expect(instance.state.activeKey).toEqual(['1']);

    component.setProps({ multiple: false });
    component.setProps({ activeKey: ['2'] });
    expect(instance.state.activeKey).toEqual(['2']);
    component.find('.icon-chevron-down').at(1).simulate('click');

    component.find('.an-collapse-item__header').at(0).simulate('keyDown');
    expect(props.onPanelHeaderKeyDown).toHaveBeenCalledTimes(1);
    const target = component.find('.an-collapse-item__header').at(0).node;
    component.find('.an-collapse-item__header').at(0).simulate('keyDown', { target, keyCode: KeyCode.HOME });
    component.find('.an-collapse-item__header').at(0).simulate('keyDown', { target, keyCode: KeyCode.END });
    component.find('.an-collapse-item__header').at(0).simulate('keyDown', { target, keyCode: KeyCode.UP });
    component.find('.an-collapse-item__header').at(0).simulate('keyDown', { target, keyCode: KeyCode.DOWN });
    component.find('.an-collapse-item__header').at(0).simulate('keyDown', { target, keyCode: KeyCode.LEFT });
    component.find('.an-collapse-item__header').at(0).simulate('keyDown', { target, keyCode: KeyCode.RIGHT });
    component.find('.an-collapse-item__header div').at(0).simulate('keyDown', { target: component.find('.an-collapse-item__header div').at(0).node, keyCode: KeyCode.RIGHT });
    expect(props.onPanelHeaderKeyDown).toHaveBeenCalledTimes(8);
  });

  it('Collapse have children should render errors', () => {
    const component = mount(
      <Collapse {...props}>
        {
          dataSource.map(item => (
            <Panel
              Header={item.Header}
              content={item.content}
              disabled={item.disabled}
            />
          ))
        }
      </Collapse>
    );
    const instance = component.instance();
    expect(component.find(Panel)).toHaveLength(5);
    component.find('.icon-chevron-down').at(0).simulate('click');
    expect(instance.state.activeKey).toEqual(['1']);
    component.find('.icon-chevron-down').at(1).simulate('click');
    expect(instance.state.activeKey).toEqual(['1', '2']);
    component.find('.icon-chevron-down').at(1).simulate('click');
    expect(instance.state.activeKey).toEqual(['1']);

    // test disable
    component.find('.icon-chevron-down').at(2).simulate('click');
    expect(instance.state.activeKey).toEqual(['1']);

    component.setProps({ multiple: false });
    component.setProps({ activeKey: ['2'] });
    expect(instance.state.activeKey).toEqual(['2']);
    component.find('.icon-chevron-down').at(1).simulate('click');
  });

  it('Collapse has activeKey should render without errors', () => {
    const component = setup({ ...props, dataSource, activeKey: '0' });
    const instance = component.instance();
    expect(instance.state.activeKey).toEqual(['0']);
    component.find('.self-button').simulate('click');
    expect(props.onChange).toHaveBeenCalled();
  });

  it('Collapse multiple is false should render without errors', () => {
    const component = setup({ ...props, dataSource, multiple: false });
    const instance = component.instance();
    component.find('.icon-chevron-down').at(0).simulate('click');
    expect(instance.state.activeKey).toEqual(['1']);
    component.find('.icon-chevron-down').at(1).simulate('click');
    expect(instance.state.activeKey).toEqual(['2']);
    component.find('.icon-chevron-down').at(1).simulate('click');
    expect(instance.state.activeKey).toEqual([]);
  });
});
