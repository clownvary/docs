import React from 'react';
import { mount } from 'enzyme';
import Breadcrumb from 'src/components/Breadcrumb';
import BreadcrumbItem from 'src/components/Breadcrumb/Item';

describe('components/Breadcrumb', () => {
  it('Breadcrumb shall work fine', () => {
    const routes = [
      { path: 'home', breadcrumbOptions: { name: 'Home' } },
      { path: 'activity', breadcrumbOptions: { name: 'Activity' } },
      { path: 'search' },
      { path: ':keyword', breadcrumbOptions: { name: 'Activities Search' } },
      { path: '/', breadcrumbOptions: { name: 'Program', hideIndex: [0] } }
    ];
    const params = { keyword: 'facility' };
    const separator = '=>';
    const component = mount(
      <Breadcrumb
        routes={routes}
        params={params}
        separator={separator}
      />);

    const items = component.find('li.an-breadcrumb__item');
    expect(items).toHaveLength(3);
    expect(items.at(0).text()).toEqual(`${routes[1].breadcrumbOptions.name}${separator}`);
    expect(items.at(1).text()).toEqual(`${routes[3].breadcrumbOptions.name}${separator}`);
    expect(items.at(2).text()).toEqual(`${routes[4].breadcrumbOptions.name}`);

    const anchors = component.find('a');
    expect(anchors).toHaveLength(2);
  });

  it('Breadcrumb shall work fine if no routes setup', () => {
    const component = mount(<Breadcrumb />);
    expect(component.find('ul')).toHaveLength(1);
  });

  it('Breadcrumb shall work fine with BreadcrumbItem', () => {
    const component = mount(
      <Breadcrumb>
        <BreadcrumbItem href="home">Home</BreadcrumbItem>
        <BreadcrumbItem href="activity">Activities</BreadcrumbItem>
        <BreadcrumbItem isLast>Daycare Program</BreadcrumbItem>
      </Breadcrumb>
    );

    const items = component.find('li.an-breadcrumb__item');
    expect(items).toHaveLength(3);
  });
});
