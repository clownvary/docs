import React from 'react';
import ListBox from 'shared/components/ListBox';
import { mount } from 'enzyme';
import { Icon } from 'react-base-ui/lib/components/SVG';
jest.mock('lodash/debounce', () => jest.fn(method => method));


const initialState = {
  expandAble: true,
  horizontal: false,
  maxDisplayCount: 2
};

function setup(_state = initialState) {
  const actions = {
    onExpandChange: jest.fn()
  };
  const state = Object.assign(initialState, _state);
  const component = mount(
    <ListBox className="test-listbox" {...state} {...actions}>
      <ListBox.Item className="test-listbox-item" icon="icon-pencil">item 1</ListBox.Item>
      <ListBox.Item className="test-listbox-item" icon="icon-lock">item 2</ListBox.Item>
      <ListBox.Item className="test-listbox-item" icon="icon-trash">item 3</ListBox.Item>
    </ListBox>);

  return {
    component,
    collapseModal: component.find('.listbox-collapse__modal'),
    trigger: component.find('.listbox-collapse__trigger'),
    actions
  };
}

describe('shared/components/ListBox', () => {
  it('Should render component correctly', () => {
    const { component }= setup();

    const listbox = component.find('div.listbox.test-listbox');
    expect(listbox).toHaveLength(1);
    expect(component.find('.listbox-horizontal')).toHaveLength(0);

    const items = listbox.find('div.listbox-item.test-listbox-item');
    expect(items).toHaveLength(3);

    const icons = listbox.find('.listbox-item__icon');
    expect(icons).toHaveLength(3);
    expect(items.at(0).find('.listbox-item__icon')).toHaveLength(1);
    expect(items.at(0).find('.icon-svg-icon-pencil')).toHaveLength(1);

    const contents = listbox.find('.listbox-item__content');
    expect(contents).toHaveLength(3);
    expect(contents.at(2).text()).toEqual('item 3');
  });

  it('Should render component correctly if display items horizontally', () => {
    const { component } = setup({horizontal: true});
    const listbox = component.find('div.listbox.test-listbox');
    expect(listbox).toHaveLength(1);
    expect(component.find('.listbox-horizontal')).toHaveLength(1);
  });

  it('should render folder correctly', ()=> {
    const { collapseModal, trigger, actions } = setup();
    const icon = trigger.find(Icon);

    trigger.find('a').simulate('click');
    expect(collapseModal).toHaveLength(1);
    expect(icon.prop('name')).toContain('up');
    expect(actions.onExpandChange).toHaveBeenCalled();

    trigger.find('a').simulate('click');
    expect(icon.prop('name')).toContain('down');
  });

  it('should not render folder if no list item', ()=> {
    const component = mount(<ListBox className="test-listbox" {...initialState} />);
  });
});
