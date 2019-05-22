import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import EmailInput from 'form/EmailInput'
import TextInput from 'form/TextInput'
import { omit } from 'shared/utils'
import formMountOptions, { l10n } from '../__mocks__/formMountOptions'

const setup = (props = {}) => {
  const api = {
    ...props.api,
  }
  const Component = (
    <EmailInput api={api} l10n={l10n} name="email" {...omit(props, ['api'])} />
  )
  const wrapper = mount(Component, formMountOptions)

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

  expect(wrapper.find('input').length).toBe(1)
  expect(wrapper.prop('name')).toBe('email')
  expect(wrapper.find(TextInput).prop('type')).toBe('email')
})

it("should render right thing and don't change unexpected", () => {
  const { Component } = setup()
  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should has `email` rule by default', () => {
  const { wrapper } = setup()

  expect(
    wrapper
      .find(TextInput)
      .prop('rules')
      .indexOf('email') !== -1,
  ).toBe(true)
})
