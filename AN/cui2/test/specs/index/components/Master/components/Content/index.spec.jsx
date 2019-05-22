import React from 'react';
import { mount } from 'enzyme';
import Content from 'index/components/Master/components/content/index';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';
import routes from '../data/routes';

function setup(props = {}, _context = context) {
  const child = React.createClass({
    render() {
      return (
        <h1>UT</h1>
      );
    }
  });
  const component = mount(
    <Content
      routes={routes}
      params={{}}
      childrenNodes={child}
      {...props}
    />, { context: _context, childContextTypes });

  return {
    component,
    MessageBoard: component.find('MessageBoard'),
    PageHeader: component.find('PageHeader')
  };
}

describe('index/components/Master/components/content/index', () => {
  it('should render out all expected Content child components', () => {
    const {
      component,
      MessageBoard,
      PageHeader
    } = setup();
    expect(MessageBoard).toEqual(MessageBoard);
    expect(PageHeader).toEqual(PageHeader);

    const instance = component.instance();
    expect(instance.node.classList).toContain('an-main');
  });

  it('should render out all expected Content child components', () => {
    const {
      component,
      PageHeader
    } = setup();
    component.setProps({ routes: [{ status: 404 }] });
    expect(PageHeader.length).toEqual(1);
  });
});
