import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import TextArea from 'form/TextArea'
import { l10n } from '../__mocks__/formMountOptions'

const setup = (props = {}) => {
  const Component = <TextArea l10n={l10n} name="textarea" {...props} />
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

it('should render correct things', () => {
  const { wrapper } = setup()

  expect(wrapper.find('textarea').length).toBe(1)
  expect(wrapper.prop('name')).toBe('textarea')
})

it("should render right thing and don't change unexpected", () => {
  const { Component } = setup()
  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should call `onBlur` callback when losing focus on input', () => {
  const onBlur = jest.fn()
  const { wrapper } = setup({ onBlur })

  wrapper.find('textarea').simulate('blur')

  expect(onBlur).toBeCalled()
})

it('should call `onChange` callback when losing focus on input', () => {
  const onChange = jest.fn()
  const { wrapper } = setup({ onChange })

  wrapper.find('textarea').simulate('change')

  expect(onChange).toBeCalled()
})
