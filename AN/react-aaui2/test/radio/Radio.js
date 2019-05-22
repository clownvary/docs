import React from 'react'
import { mount } from 'enzyme'

import Radio from 'radio/Radio'

it('should render without errors', () => {
  const wrapper = mount(<Radio />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = mount(<Radio />)

  expect(wrapper.find('label.radio-wrapper').length).toBe(1)
  expect(wrapper.find('input').length).toBe(1)
  expect(wrapper.find('span.radio__inner').length).toBe(1)
})

it('should could set checked through the instance `checked` property when defaultChecked', () => {
  const wrapper = mount(<Radio defaultChecked />)

  expect(wrapper.instance().checked).toBe(true)

  wrapper.instance().checked = false
  expect(wrapper.instance().checked).toBe(false)
})

it('should could set checked through the instance `checked` property when checked', () => {
  const wrapper = mount(<Radio checked />)

  expect(wrapper.instance().checked).toBe(true)

  wrapper.instance().checked = false
  expect(wrapper.instance().checked).toBe(false)
})
