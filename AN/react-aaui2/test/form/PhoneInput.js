import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import PhoneInput from 'form/PhoneInput'
import TextInput from 'form/TextInput'
import formMountOptions from '../__mocks__/formMountOptions'

it('should render without errors', () => {
  const wrapper = mount(<PhoneInput />, formMountOptions)

  expect(wrapper).toBeTruthy()
})

it('should render correct things', () => {
  const wrapper = mount(
    <PhoneInput name="phone" type="phone" />,
    formMountOptions,
  )

  expect(wrapper.find('input').length === 1).toBe(true)
  expect(wrapper.prop('name') === 'phone').toBe(true)
  expect(wrapper.prop('type') === 'phone').toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(<PhoneInput name="phone" type="phone" />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should has `phone` rule by default', () => {
  const wrapper = mount(<PhoneInput />, formMountOptions)

  expect(
    wrapper
      .find(TextInput)
      .prop('rules')
      .indexOf('phone') !== -1,
  ).toBe(true)
})
