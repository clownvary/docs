import React from 'react';
import { mount } from 'enzyme';
import HeaderAndFooter from 'index/PermitContract/components/HeaderAndFooter';

const setup = (props) => {
  const wrapper = mount(<HeaderAndFooter {...props} />)
  return { wrapper }
}

describe('index/PermitContract/components/HeaderAndFooter/index.jsx', () => {
  test('render header correctly', () => {
    const header = 'header content';
    const { wrapper: headerWrapper } = setup({
      header
    });
    expect(headerWrapper.length).toBe(1);
    expect(headerWrapper.node.props.header).toEqual(header);
  });

  test('render footer correctly', () => {
    const footer = '<div>footer content</div>';
    const { wrapper: footerWrapper } = setup({
      footer
    });
    expect(footerWrapper.length).toBe(1);
    expect(footerWrapper.node.props.footer).toEqual(footer);
  })
})
