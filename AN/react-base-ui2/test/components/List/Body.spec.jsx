import React from 'react';
import { mount } from 'enzyme';
import Body from 'src/components/List/Body';
import MultipleColumnsView from 'src/components/List/MultipleColumnsList';
import SingleColumnList from 'src/components/List/SingleColumnList';

const setup = (props = {}) => mount(<Body {...props} />);

jest.mock('lodash/throttle', () => jest.fn(fn => fn()));

const initProps = {
  config: {
    prefix: 'an-'
  },
  data: [],
  columns: [],
  onScrollToBottom: jest.fn()
};

describe('components => Body', () => {
  let component;
  it('Body should works fine', () => {
    component = setup(initProps);
    expect(component.find('.an-list__body')).toHaveLength(1);
    component.setProps({
      config: {
        listType: 'single_column',
        asyncable: true
      }
    });
    expect(initProps.onScrollToBottom).toHaveBeenCalled();
  });

  it('listType is ListType.SINGLE should works fine', () => {
    component = setup(initProps);
    expect(component.find('.an-list__body')).toHaveLength(1);
    component.setProps({
      config: {
        listType: 'single_column',
        asyncable: true
      }
    });
    expect(component.find(SingleColumnList)).toHaveLength(1);
  });

  it('ListType is ListType.MULTIPLE, should works fine', () => {
    component = setup({
      ...initProps,
      config: {
        listType: 'single_column',
        asyncable: true
      }
    });
    const instance = component.instance();
    component.setProps({
      config: {
        listType: 'multiple_column',
        asyncable: false
      }
    });
    expect(component.find(MultipleColumnsView)).toHaveLength(1);
    expect(instance.body.onscroll).toEqual(null);
  });

  it('Body props has maxHeight, should works fine', () => {
    component = setup({
      ...initProps,
      config: {
        listType: 'single_column',
        prefix: 'an-',
        asyncable: true,
        maxHeight: 23
      }
    });
    const instance = component.instance();

    instance.body = {
      clientHeight: 20,
      scrollHeight: 180,
      scrollTop: 0
    };
    instance.bindScroll(true, initProps.onScrollToBottom);
    expect(component.find('.an-list__body').html()).toEqual('<div class="an-list__body" style="max-height: 23px;"><ul class="an-list__body-single" role="group"></ul></div>');
  });
});
