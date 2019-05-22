import React from 'react';
import { mount } from 'enzyme';
import Bottom from 'src/components/List/Bottom';
import Checkbox from 'src/components/Checkbox';
import { FormattedHTMLMessage } from 'react-intl';

const setup = (props = {}) => mount(<Bottom {...props} />);

const config = {
  checkable: true,
  prefix: 'an-',
  showCheckAll: true,
  sortable: true,
  asyncable: true
};

const initProps = {
  onSort: jest.fn(),
  config,
  isLoading: true,
  data: [],
  onCheckAll: jest.fn()
};

describe('components => Bottom', () => {
  let component;

  it('checkable && showCheckAll renderCheckbox should works fine', () => {
    component = setup(initProps);
    component.find('input').simulate('change');
    expect(initProps.onCheckAll).toHaveBeenCalled();
  });

  it('disabled equal to true renderCheckbox should works fine', () => {
    component = setup({ ...initProps,
      config: {
        ...config,
        checkable: false,
        showCheckAll: false,
        disabled: true
      }
    });
    expect(component.find('input').length).toEqual(0);
  });

  it('Bottom icon-caret* should works fine', () => {
    component = setup(initProps);
    component.find('.icon-caret-up').simulate('click');
    expect(initProps.onSort).toHaveBeenCalled();
    component.find('.icon-caret-down').simulate('click');
    expect(initProps.onSort).toHaveBeenCalled();
    expect(component.find('.an-list__bottom')).toHaveLength(1);
  });

  it('Bottom checkable equal to false  should works fine', () => {
    component = setup({ ...initProps,
      config: {
        ...config,
        checkable: false,
        showCheckAll: false
      }
    });
    expect(component.find('.an-list__bottom')).toHaveLength(1);
    expect(component.find(Checkbox)).toHaveLength(0);
  });

  it('Bottom sortable, isLoading equal to false  should works fine', () => {
    component = setup({ ...initProps,
      config: {
        ...config,
        checkable: true,
        showCheckAll: false,
        sortable: false,
        asyncable: true
      },
      isLoading: false
    });
    expect(component.find(Checkbox)).toHaveLength(0);
    expect(component.find('.an-list__bottom')).toHaveLength(1);
    expect(component.find('.icon-caret-up')).toHaveLength(0);
    expect(component.find('.icon-caret-down')).toHaveLength(0);
    expect(component.find('.icon-loading-m')).toHaveLength(0);
  });

  it('Bottom,asyncable equal to false  should works fine', () => {
    component = setup({ ...initProps,
      config: {
        ...config,
        checkable: false,
        showCheckAll: true,
        sortable: true,
        asyncable: false
      },
      isLoading: true
    });
    const instance = component.instance();
    expect(component.find(Checkbox)).toHaveLength(0);
    expect(component.find('.icon-caret-up')).toHaveLength(1);
    expect(component.find('.icon-caret-down')).toHaveLength(1);
    expect(instance.renderPageCount()).toEqual(false);
  });
});
