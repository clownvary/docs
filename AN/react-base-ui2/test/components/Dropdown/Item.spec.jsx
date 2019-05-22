import React from 'react';
import { mount } from 'enzyme';
import Item from 'src/components/Dropdown/Item';

const itemValue = {
  id: 1,
  name: 'reco&amp;urce1',
  selected: true,
  text: 'reco&urce1',
  type: 0,
  value: 1
};

const initProps = {
  data: itemValue,
  showTextTip: false,
  ccs: 'ccs',
  click: jest.fn(),
  errorInfo: '',
  isChecked: true

};

function setup(props = {}) {
  const component = mount(<Item {...props} />);

  return component;
}

describe('shared => components => Dropdown/Item', () => {
  let component;
  beforeEach(() => {
    component = setup(initProps);
  });
  afterEach(() => {
    component.unmount();
  });


  it('When showTextTip equal to false Dropdown/Item should rendered correctly', () => {
    expect(component.find('.ccs')).toHaveLength(1);
    const li = component.find('li');
    li.simulate('click');
    expect(initProps.click).toHaveBeenCalled();
    expect(component.find('.checkbox')).toHaveLength(1);
    expect(component.find('.dropdown-item__label')).toHaveLength(1);
  });

  it('When showTextTip equal to true Dropdown/Item should rendered correctly', () => {
    component.setProps({ showTextTip: true });

    expect(component.find('.ccs')).toHaveLength(1);
    expect(component.find('.checkbox')).toHaveLength(1);
    expect(component.find('.dropdown-item__label')).toHaveLength(1);
    expect(component.find('[title="reco&urce1"]')).toHaveLength(1);
    const li = component.find('.aaui-flexbox');
    li.simulate('click');
    expect(initProps.click).toHaveBeenCalled();
  });
});
