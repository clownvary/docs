import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import MediaQuery from 'react-responsive'

import ShowAt from '../../src/viewport/ShowAt'

const setup = (props = {}) => {
  const Component = (
    <ShowAt {...props}>
      <p>Show Me</p>
    </ShowAt>
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
