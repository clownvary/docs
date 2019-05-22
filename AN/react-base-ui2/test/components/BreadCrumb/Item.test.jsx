import React from 'react';
import { mount } from 'enzyme';

import Item from 'src/components/Breadcrumb/Item';

describe('components/Breadcrumb/Item', () => {
  it('Item shall work fine if link has href property', () => {
    const component = mount(
      <Item
        className="test-breadcrumb-item"
        href="https://www.activenetwork.com/solutions/active-net"
        separator="|"
      >
        test item
      </Item>
    );

    expect(component.find('li.test-breadcrumb-item')).toHaveLength(1);

    const anchor = component.find('a');
    expect(anchor.text()).toEqual('test item');
    expect(anchor.node.href).toEqual('https://www.activenetwork.com/solutions/active-net');

    expect(component.find('span.an-breadcrumb__separator').text()).toEqual('|');
  });

  it('Item shall work fine with react router link component', () => {
    const component = mount(
      <Item
        link="/newcart"
        separator="|"
      >
        cart
      </Item>
    );

    expect(component.find('li.an-breadcrumb__item')).toHaveLength(1);
    expect(component.find('Link').text()).toEqual('cart');
    expect(component.find('span.an-breadcrumb__separator').text()).toEqual('|');
  });

  it('Item shall work fine if it\'s last breadcrumb item', () => {
    const component = mount(
      <Item
        isLast
        separator="|"
      >
        confirmation
      </Item>
    );
    expect(component.find('li.an-breadcrumb__item')).toHaveLength(1);
    expect(component.find('span').text()).toEqual('confirmation');
    expect(component.find('span.an-breadcrumb__separator')).toHaveLength(0);
  });
});
