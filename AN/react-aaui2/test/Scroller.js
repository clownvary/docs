import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Scroller from 'Scroller'

const setup = () => {
  const Hello = () => <h1>123</h1>

  const Component = <Scroller>{() => <Hello />}</Scroller>
  const wrapper = mount(Component)

  return {
    wrapper,
    Component,
  }
}

it('should render without errors', () => {
  const { wrapper } = setup()

  expect(wrapper).toBeTruthy()
})

it("should render right thing and don't change unexpected", () => {
  const { Component } = setup()

  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should fix menu when scroll down over thresholdHeight', () => {
  const { wrapper } = setup()

  document.body.scrollTop = 500

  wrapper.instance().onScroll()

  expect(wrapper.state('scrolled')).toBe(true)
  wrapper.unmount()
})
