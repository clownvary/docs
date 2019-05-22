import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import MediaQuery from 'react-responsive'

import Viewport from '../../src/viewport'

const setup = (props = {}) => {
  const Component = (
    <Viewport {...props}>
      <p>Show Me</p>
    </Viewport>
  )
  const wrapper = mount(Component)

  return {
    Component,
    wrapper,
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

it('smAndAbove', () => {
  const { Component, wrapper } = setup({ smAndAbove: true })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})

it('smAndAbove with not', () => {
  const { Component, wrapper } = setup({ smAndAbove: true, not: true })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})

it('mdAndAbove', () => {
  const { Component, wrapper } = setup({ mdAndAbove: true })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})

it('mdAndAbove with not', () => {
  const { Component, wrapper } = setup({ mdAndAbove: true, not: true })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})

it('lgAndAbove', () => {
  const { Component, wrapper } = setup({ lgAndAbove: true })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})

it('lgAndAbove with not', () => {
  const { Component, wrapper } = setup({ lgAndAbove: true, not: true })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})

it('smAndAbove && mdAndAbove && lgAndAbove', () => {
  const { Component, wrapper } = setup({
    smAndAbove: true,
    mdAndAbove: true,
    lgAndAbove: true,
  })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})

it('define smAndAbove', () => {
  const { Component, wrapper } = setup({
    smAndAbove: true,
    viewports: {
      smAndAbove: { minWidth: '900px' },
    },
  })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})

it('define mdAndAbove', () => {
  const { Component, wrapper } = setup({
    mdAndAbove: true,
    viewports: {
      mdAndAbove: { minWidth: '1000px' },
    },
  })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})

it('define mdAndAbove with not', () => {
  const { Component, wrapper } = setup({
    mdAndAbove: true,
    not: true,
    viewports: {
      mdAndAbove: { minWidth: '1000px' },
    },
  })

  expect(Component).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})
