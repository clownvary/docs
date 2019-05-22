import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import MediaQuery from 'react-responsive'

import HideAt from '../../src/viewport/HideAt'

beforeAll(() => {
  MediaQuery.defaultProps.values = { width: 900 }
})

afterAll(() => {
  MediaQuery.defaultProps.values = {}
})

const setup = (props = {}) => {
  const Component = (
    <HideAt {...props}>
      <p>Hide Me</p>
    </HideAt>
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
  const { Component, wrapper } = setup({ smAndAbove: true })
  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
  expect(wrapper.find(MediaQuery).props()).toMatchSnapshot()
})
