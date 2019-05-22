import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import MoreButton from 'MoreButton'

const setup = (props = { alert: jest.fn() }) => {
  const data = {
    'first item': () => props.alert('first action'),
    'second item': () => props.alert('second action'),
    'third item': () => props.alert('third action'),
  }
  const Component = (
    <MoreButton
      data={data}
      filter
      className="dropdown--with-search"
      filterPlaceholder="Search..."
      title="Actions"
    />
  )

  return {
    Component,
    shallowWrapper: shallow(Component),
    mountWrapper: mount(Component),
  }
}

it("More Button should render right thing and don't change unexpected", () => {
  const { Component } = setup()
  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('has more-button class name and dropdown class name.', () => {
  const { mountWrapper: wrapper } = setup()
  expect(wrapper.findWhere(n => n.hasClass('dropdown')).length).toBe(1)
  expect(wrapper.findWhere(n => n.hasClass('dropdown__button')).length).toBe(1)
  expect(wrapper.findWhere(n => n.hasClass('dropdown__menu')).length).toBe(1)
})

it('should open the menu and be clickable', () => {
  const { mountWrapper: wrapper } = setup()

  expect(wrapper.findWhere(n => n.hasClass('show')).length).toBe(0)

  wrapper.find('button').simulate('click')

  expect(wrapper.findWhere(n => n.is('button.show')).length).toBe(1)

  wrapper
    .find('ul')
    .childAt(2)
    .find('a')
    .simulate('click')
  expect(wrapper.find('button').hasClass('show')).toBe(false)
})

it('should call callback function when trigger', () => {
  const alert = jest.fn()
  const alert2 = jest.fn()
  const data = {
    'first item': () => alert('first action'),
    'second item': () => alert2('second action'),
    'third item': 'third item',
  }

  const wrapper = mount(
    <MoreButton
      data={data}
      filter
      filterPlaceholder="Search..."
      title="Actions"
    />,
  )
  wrapper.find('button').simulate('click')

  expect(wrapper.find('button').hasClass('show')).toBe(true)

  wrapper
    .find('ul')
    .childAt(2)
    .find('a')
    .simulate('click')
  expect(alert).toBeCalledWith('first action')
  expect(wrapper.props().title).toBe('Actions')
  expect(wrapper.props().filter).toBe(true)

  wrapper
    .find('ul')
    .childAt(4)
    .find('a')
    .simulate('click')
})
