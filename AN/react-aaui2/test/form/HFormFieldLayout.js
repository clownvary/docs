import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import HFormFieldLayout from 'form/HFormFieldLayout'

it('should render without errors', () => {
  const wrapper = mount(<HFormFieldLayout label="label" />)

  expect(wrapper.find('label').text()).toBe('label')
  expect(wrapper.find('.form__label--require').length).toBe(0)
  expect(wrapper.find('div.form__validate').length).toBe(0)
})

it('should render right thing', () => {
  const wrapper = shallow(<HFormFieldLayout label="label" required />)

  expect(wrapper.find('.form__label--require').length).toBe(1)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(<HFormFieldLayout label="label" errMsg="error" />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should have `form__group--error` if passing `errMsg`', () => {
  const wrapper = shallow(
    <HFormFieldLayout
      label="label"
      errMsg="error"
      rules="required|min:2|max:10"
    />,
  )

  expect(wrapper.hasClass('form__group')).toBe(true)
  expect(wrapper.hasClass('form__group--error')).toBe(true)
})

it('should have `form__control--static` if passing `static`', () => {
  const wrapper = shallow(<HFormFieldLayout static label="label" />)

  expect(wrapper.find('.form__control--static').length).toBe(1)
})
