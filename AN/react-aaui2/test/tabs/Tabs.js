import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import Tabs from 'tabs'
import { tabsAPIShape } from 'shared/types'

const context = {
  api: {
    select: () => {},
    getSelected: () => 'first',
  },
}

const first = 'first'
const second = 'second'
const First = 'First'
const Second = 'Second'
const tabs = props => (
  <Tabs {...props}>
    <Tabs.Header>
      <Tabs.Title className="first" name={first}>
        {First}
      </Tabs.Title>
      <Tabs.Title name={second}>{Second}</Tabs.Title>
    </Tabs.Header>
    <Tabs.Container name={first}>
      <p>This is Hello!</p>
    </Tabs.Container>
    <Tabs.Container name={second}>
      <p>This is World!</p>
    </Tabs.Container>
  </Tabs>
)

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(tabs()).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render without errors', () => {
  const wrapper = shallow(<Tabs />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Tabs className="tabs" />)

  expect(wrapper.hasClass('tabs')).toBe(true)
})

it('should get `selected` state through .selected', () => {
  const wrapper = mount(
    tabs({
      selected: first,
    }),
  )

  expect(wrapper.instance().selected).toBe(first)
})

it('should could get `selected` state through .selected', () => {
  const wrapper = mount(
    tabs({
      selected: first,
    }),
  )

  expect(wrapper.instance().selected).toBe(first)
})

it('should could set `selected` state through .selected', () => {
  const wrapper = mount(tabs())

  wrapper.instance().selected = second

  expect(
    wrapper
      .find('a.active')
      .text()
      .trim(),
  ).toBe(Second)
})

it('should change the selected tab through `selected` prop', () => {
  const wrapper = mount(
    tabs({
      selected: first,
    }),
  )

  expect(
    wrapper
      .find('a.active')
      .text()
      .trim(),
  ).toBe(First)

  wrapper.setProps({
    selected: 'second',
  })

  expect(
    wrapper
      .find('a.active')
      .text()
      .trim(),
  ).toBe(Second)
})

it('should could call onChange callback when setting selected prop(with `selected` prop)', () => {
  const onChangeMock = jest.fn()
  const wrapper = mount(
    tabs({
      selected: first,
      onChange: onChangeMock,
    }),
  )

  wrapper.instance().select(second)

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith(second)
})

it('should could call onChange callback when setting selected prop(no `selected` prop)', () => {
  const onChangeMock = jest.fn()
  const wrapper = mount(
    tabs({
      onChange: onChangeMock,
    }),
  )

  wrapper.instance().select(second)

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith(second)
})

it('should change the selected tab through `defaultSelected` prop', () => {
  const wrapper = mount(
    tabs({
      defaultSelected: first,
    }),
  )

  expect(
    wrapper
      .find('a.active')
      .text()
      .trim(),
  ).toBe(First)

  wrapper.setProps({
    defaultSelected: 'second',
  })

  expect(
    wrapper
      .find('a.active')
      .text()
      .trim(),
  ).toBe(Second)
})

it('should trigger onChange when switching tabs', () => {
  const onChangeMock = jest.fn()
  const wrapper = mount(
    tabs({
      onChange: onChangeMock,
    }),
    {
      context,
      childContextTypes: {
        api: tabsAPIShape,
      },
    },
  )

  wrapper
    .find('.first')
    .last()
    .simulate('click')

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith('first')
})

it('should change the selected tab by press left key', () => {
  const wrapper = mount(
    tabs({
      defaultSelected: first,
    }),
  )
  wrapper.find('ul').simulate('keyDown', { keyCode: 37 })
  expect(
    wrapper
      .find('a.active')
      .text()
      .trim(),
  ).toBe(Second)
})

it('should change the selected tab by press right key', () => {
  const wrapper = mount(
    tabs({
      defaultSelected: first,
    }),
  )
  wrapper.find('ul').simulate('keyDown', { keyCode: 39 })
  expect(
    wrapper
      .find('a.active')
      .text()
      .trim(),
  ).toBe(Second)
})

it('should keep origin value by press right key after left key', () => {
  const wrapper = mount(
    tabs({
      defaultSelected: first,
    }),
  )
  wrapper.find('ul').simulate('keyDown', { keyCode: 37 })
  wrapper.find('ul').simulate('keyDown', { keyCode: 37 })
  wrapper.find('ul').simulate('keyDown', { keyCode: 39 })
  wrapper.find('ul').simulate('keyDown', { keyCode: 39 })
  expect(
    wrapper
      .find('a.active')
      .text()
      .trim(),
  ).toBe(First)
})

it('should keep origin value by press keys exclude right key and left key', () => {
  const wrapper = mount(
    tabs({
      defaultSelected: first,
    }),
  )
  wrapper.find('ul').simulate('keyDown', { keyCode: 40 })
  expect(
    wrapper
      .find('a.active')
      .text()
      .trim(),
  ).toBe(First)
})
