import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import FlexFormFieldLayout from 'form/FlexFormFieldLayout'

it('should render without errors', () => {
  const wrapper = mount(<FlexFormFieldLayout label="label" />)

  expect(wrapper.findWhere(n => n.is('.col.form__label')).text()).toBe('label')
  expect(
    wrapper.findWhere(n => n.is('.form__label.form__label--require')).length,
  ).toBe(0)
  expect(wrapper.find('div.form__validate').length).toBe(0)
})

it('should render right thing', () => {
  const wrapper = shallow(<FlexFormFieldLayout label="label" required />)

  expect(wrapper.find('.form__label').hasClass('form__label--require')).toBe(
    true,
  )
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(<FlexFormFieldLayout label="label" errMsg="error" />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should have `form__group--error` if passing `errMsg`', () => {
  const wrapper = shallow(
    <FlexFormFieldLayout
      label="label"
      errMsg="error"
      rules="required|min:2|max:10"
    />,
  )

  expect(wrapper.hasClass('form__group')).toBe(true)
  expect(wrapper.hasClass('form__group--error')).toBe(true)
})
