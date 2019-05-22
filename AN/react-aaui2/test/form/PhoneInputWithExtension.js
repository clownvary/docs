import React from 'react'
import { mount } from 'enzyme'

import PhoneInputWithExtension from 'form/PhoneInputWithExtension'
import Store from 'form/store'
import TextInput from 'form/TextInput'
import formMountOptions from '../__mocks__/formMountOptions'

it('should render without errors', () => {
  const wrapper = mount(<PhoneInputWithExtension />, formMountOptions)

  expect(wrapper).toBeTruthy()
})

it('should render correct things', () => {
  const wrapper = mount(
    <PhoneInputWithExtension name="phone" type="phone" />,
    formMountOptions,
  )

  expect(wrapper.find('input').length).toBe(2)
  expect(wrapper.prop('name') === 'phone').toBe(true)
  expect(wrapper.prop('type') === 'phone').toBe(true)
})

it('should has `phone` rule by default', () => {
  const wrapper = mount(<PhoneInputWithExtension />, formMountOptions)

  expect(
    wrapper
      .find(TextInput)
      .first()
      .prop('rules')
      .indexOf('phone') !== -1,
  ).toBe(true)
})

it('should add error msg to validate phone ext when it blur with invalidate content', () => {
  const setError = jest.fn()
  const getError = jest.fn(() => true)

  const newStore = new Store()
  newStore.setError = setError
  newStore.getError = getError

  const mockedContext = {
    ...formMountOptions,
    context: {
      ...formMountOptions.context,
      aauiFormStore: newStore,
    },
  }

  const wrapper = mount(
    <PhoneInputWithExtension name="phone" rules="" />,
    mockedContext,
  )
  const phoneExtInputWrapper = wrapper.find(TextInput).at(1)
  const phoneExtInput = phoneExtInputWrapper.find('input')
  phoneExtInput.simulate('change', { target: { value: 'a' } })
  phoneExtInput.simulate('blur')
  expect(setError).toBeCalled()
})

it('should remove error msg to validate phone ext when it blur with validate content', () => {
  const setError = jest.fn()

  const newStore = new Store()

  newStore.setError = setError

  const mockedContext = {
    ...formMountOptions,
    context: {
      ...formMountOptions.context,
      aauiFormStore: newStore,
    },
  }

  const wrapper = mount(
    <PhoneInputWithExtension name="phone" rules="" />,
    mockedContext,
  )
  const phoneExtInputWrapper = wrapper.find(TextInput).at(1)
  const phoneExtInput = phoneExtInputWrapper.find('input')
  phoneExtInput.simulate('change', { target: { value: '112' } })
  phoneExtInput.simulate('blur')
  expect(setError).toHaveBeenCalledWith('phone', null)
})
