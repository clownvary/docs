import React from 'react';
import { mount } from 'enzyme';
import Panel from 'src/components/Collapse/Panel';

const text = 'A dog is a type of domesticated animal.';

const props = {
  prefixCls: 'an-collapse',
  Header: ({ onToggleClick }) => (<div>
    <a onClick={() => onToggleClick()} className="self-button" tabIndex="0">click</a>
    self setting title,
    <span style={{ marginLeft: 30 }} onClick={() => console.log(this.state)}>delete</span>
  </div>),
  content: text,
  disabled: false,
  onItemClick: jest.fn(),
  onPanelHeaderKeyDown: jest.fn()
};

const setup = initProps => mount(<Panel {...initProps} />);
describe('Panel Component', () => {
  it('Panel should render without errors', () => {
    const component = setup(props);
    const selfButton = component.find('.self-button');
    expect(component.find('.an-collapse-item__content')).toHaveLength(1);
    expect(selfButton).toHaveLength(1);
    selfButton.simulate('click');
    expect(props.onItemClick).toHaveBeenCalled();

    component.find('.an-collapse-item__header').simulate('click');
    component.find('.an-collapse-item__header').simulate('keyDown');
    expect(props.onItemClick).toHaveBeenCalled();
    expect(props.onPanelHeaderKeyDown).toHaveBeenCalled();
    component.find('.an-collapse-item__header').simulate('keyDown', { keyCode: 13 });
    expect(props.onPanelHeaderKeyDown).toHaveBeenCalledTimes(2);
    component.find('.an-collapse-item__header div').simulate('keyDown', { keyCode: 13 });
    expect(props.onPanelHeaderKeyDown).toHaveBeenCalledTimes(3);
  });

  it('Panel disabled is true should render without errors', () => {
    const component = setup({ ...props, disabled: true });
    const selfButton = component.find('.self-button');
    expect(selfButton).toHaveLength(1);
    expect(component.find('.an-collapse-item__header').hasClass('is-disabled')).toEqual(true);
  });

  it('Panel header is not node should render without errors', () => {
    const component = setup({ ...props, Header: 'this is header' });
    const button = component.find('.icon-chevron-down');
    expect(button).toHaveLength(1);
  });
});
