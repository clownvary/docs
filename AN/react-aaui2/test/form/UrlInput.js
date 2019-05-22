import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import UrlInput from 'form/UrlInput'
import TextInput from 'form/TextInput'
import { omit } from 'shared/utils'
import formMountOptions, { l10n } from '../__mocks__/formMountOptions'

const setup = (props = {}) => {
  const api = {
    ...props.api,
  }
  const Component = (
    <UrlInput api={api} l10n={l10n} name="url" {...omit(props, ['api'])} />
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
  expect(wrapper.prop('name')).toBe('url')
  expect(wrapper.find(TextInput).prop('type')).toBe('url')
})

it("should render right thing and don't change unexpected", () => {
  const { Component } = setup()
  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should accept valid value', () => {
  const validUrl = 'http://www.baidu.com/'
  const { wrapper } = setup({ value: validUrl })

  expect(wrapper.find('input').prop('value')).toBe(validUrl)
})
