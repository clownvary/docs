import React from 'react'
import { mount } from 'enzyme'

import Checkbox from 'Checkbox/Checkbox'

it('should render without errors', () => {
  const wrapper = mount(<Checkbox />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = mount(<Checkbox />)

  expect(wrapper.find('label.checkbox-wrapper').length).toBe(1)
  expect(wrapper.find('input').length).toBe(1)
  expect(wrapper.find('span.checkbox__inner').length).toBe(1)
})

it('should could set checked through the instance `checked` property when defaultChecked', () => {
  const wrapper = mount(<Checkbox defaultChecked />)

  expect(wrapper.instance().checked).toBe(true)

  wrapper.instance().checked = false
  expect(wrapper.instance().checked).toBe(false)
})

it('should could set checked through the instance `checked` property when checked', () => {
  const wrapper = mount(<Checkbox checked />)

  expect(wrapper.instance().checked).toBe(true)

  wrapper.instance().checked = false
  expect(wrapper.instance().checked).toBe(false)
})
