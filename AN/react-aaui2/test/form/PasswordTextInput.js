import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import PasswordTextInput from 'form/PasswordTextInput'
import formMountOptions from '../__mocks__/formMountOptions'

it('should render without errors', () => {
  const wrapper = mount(<PasswordTextInput />, formMountOptions)

  expect(wrapper).toBeTruthy()
})

it('should render correct things', () => {
  const wrapper = mount(
    <PasswordTextInput name="password" type="password" />,
    formMountOptions,
  )

  expect(wrapper.find('input').length).toBe(1)
  expect(wrapper.prop('name')).toBe('password')
  expect(wrapper.prop('type')).toBe('password')
  expect(wrapper.find('.icon.icon-lock')).toHaveLength(1)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(<PasswordTextInput name="password" type="password" />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should could change type of input when clicking icon', () => {
  const wrapper = mount(<PasswordTextInput />, formMountOptions)

  wrapper.find('.icon').simulate('click')

  expect(wrapper.state('type')).toBe('text')
  expect(wrapper.find('.icon.icon-lock')).toHaveLength(0)
  expect(wrapper.find('.icon.icon-unlock')).toHaveLength(1)

  wrapper.find('.icon').simulate('click')

  expect(wrapper.state('type')).toBe('password')
  expect(wrapper.find('.icon.icon-unlock')).toHaveLength(0)
  expect(wrapper.find('.icon.icon-lock')).toHaveLength(1)
})
