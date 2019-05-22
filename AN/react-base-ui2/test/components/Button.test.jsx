import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Button } from 'src/components/Button';
import { STRONG } from 'src/components/Button/consts/ButtonType';

describe('components/Button', () => {
  it('Button renders fine', () => {
    const snapshot = renderer.create(<Button>button</Button>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Button with loading renders fine', () => {
    const snapshot = renderer.create(<Button loading>button</Button>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Button with no submit renders fine', () => {
    const snapshot = renderer.create(<Button noSubmit>button</Button>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Button with event handlers works fine', () => {
    const onClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onMouseHover = jest.fn();
    const component = mount(<Button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseHover={onMouseHover}
    />);

    component.simulate('click');
    expect(onClick).toHaveBeenCalled();

    component.simulate('mouseEnter');
    expect(onMouseEnter).toHaveBeenCalled();

    component.simulate('mouseLeave');
    expect(onMouseLeave).toHaveBeenCalled();

    component.simulate('mouseOver');
    expect(onMouseHover).toHaveBeenCalled();
  });

  it('Button with menu data works fine', () => {
    const menuData = [{
      text: 'option 1',
      value: '1'
    }];
    const component = mount(<Button
      menuData={menuData}
    />);

    component.node.button.dispatchEvent(new MouseEvent('click'));
    expect(component.node.button.__menuAttached).toBeTruthy();
    expect(document.querySelector('.an-list li').textContent).toEqual('option 1');
  });

  it('Button properties work fine', () => {
    const component = mount(
      <Button
        type={STRONG}
        size="lg"
        className="test-button"
      >
        Proceed
      </Button>
    );

    const button = component.find('button.btn.btn-strong.btn--lg.test-button');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('Proceed');

    component.setProps({ loading: true });
    expect(component.find('i.icon.icon--loading')).toHaveLength(1);

    component.setProps({ disabled: true });
    expect(button.node.disabled).toBeTruthy();
  });
});
