import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import NumericInput from 'form/NumericInput'
import TextInput from 'form/TextInput'
import formMountOptions from '../__mocks__/formMountOptions'

it('should render without errors', () => {
  const wrapper = mount(<NumericInput />, formMountOptions)

  expect(wrapper).toBeTruthy()
})

it('should render correct things', () => {
  const wrapper = mount(
    <NumericInput name="number" type="number" />,
    formMountOptions,
  )

  expect(wrapper.find('input').length === 1).toBe(true)
  expect(wrapper.prop('name') === 'number').toBe(true)
  expect(wrapper.prop('type') === 'number').toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(
      <NumericInput
        name="number"
        type="number"
        aauiFormStore={formMountOptions.context.aauiFormStore}
      />,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should has `number` rule by default', () => {
  const wrapper = mount(
    <NumericInput name="number" type="number" />,
    formMountOptions,
  )

  expect(
    wrapper
      .find(TextInput)
      .prop('rules')
      .indexOf('number') !== -1,
  ).toBe(true)
})
