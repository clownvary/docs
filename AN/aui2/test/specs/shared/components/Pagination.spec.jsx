import React from 'react';
import { mount } from 'enzyme';
import Pagination from 'shared/components/Pagination';

const actions = {
  onChangePage: undefined
};

const defaultProps = {
  className: '',
  baseUrl: 'baseUrl',
  queryString: 'queryString',
  ...Pagination.defaultProps
};

const setup = (props = defaultProps) => {
  const wrapper = mount(<Pagination {...actions} {...props} />);
  const instance = wrapper.instance();

  return {
    wrapper,
    instance
  };
};

describe('shared => components => Pagination', () => {
  it('should rendered correctly invalid data', () => {
    const { wrapper } = setup({
      ...defaultProps,
      total: 0,
      current: 0,
      edgeCount: 0
    });
    expect(wrapper.find('div.aaui-pagination').length).toBe(1);
    expect(wrapper.find('a.aaui-pagination-page').length).toBe(0);

    wrapper.setProps({ total: 1, current: 2 });
    expect(wrapper.find('a.aaui-pagination-page').last().text()).toEqual('1');
  });

  it('should rendered correctly with normal data', () => {
    const { wrapper } = setup({
      ...defaultProps,
      total: 10,
      current: 1,
      edgeCount: 1
    });
    expect(wrapper.find('div.aaui-pagination').length).toBe(1);
    expect(wrapper.find('span.aaui-pagination-active').text()).toEqual('1');

    wrapper.setProps({ current: 10 });
    expect(wrapper.find('span.aaui-pagination-active').text()).toEqual('10');
  });

  it('should rendered correctly with different theme', () => {
    const { wrapper } = setup({
      ...defaultProps,
      total: 10,
      current: 5,
      edgeCount: 10,
      theme: 'b'
    });

    expect(wrapper.find('div.aaui-pagination').length).toBe(1);
    expect(wrapper.find('div.aaui-pagination-theme-b').length).toBe(1);
    expect(wrapper.find('a.aaui-pagination-page-np').first().text()).toEqual('Previous');
    expect(wrapper.find('a.aaui-pagination-page-np').last().text()).toEqual('Next');
  });

  it('should page change triggered correctly', () => {
    const { wrapper } = setup({
      ...defaultProps,
      total: 10,
      current: 5,
      edgeCount: 1
    });

    const left = wrapper.find('a.aaui-pagination-page').first();
    const right = wrapper.find('a.aaui-pagination-page').last();

    left.simulate('click');
    wrapper.setProps({ onChangePage: jest.fn() });
    left.simulate('click');
    right.simulate('click');
    expect(wrapper.props().onChangePage.mock.calls.length).toBe(2);

    wrapper.setProps({ onChangePage: jest.fn(() => true) });
    right.simulate('click');
    expect(wrapper.props().onChangePage.mock.calls.length).toBe(1);
  });
});
