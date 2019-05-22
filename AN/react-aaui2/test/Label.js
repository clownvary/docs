import React from 'react'
import { shallow } from 'enzyme'
import Label from '../src/Label'

it('should render without errors', () => {
  const wrapper = shallow(<Label />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Label />)

  expect(wrapper.find('span').length === 1).toBe(true)
})

it('should has .label and .label-info by default', () => {
  const wrapper = shallow(<Label />)

  expect(wrapper.hasClass('label')).toBe(true)
  expect(wrapper.hasClass('label-info')).toBe(true)
})

it('should accept different types("success", "warning", "danger", "info")', () => {
  const types = ['success', 'warning', 'danger', 'info']

  types.forEach(type => {
    const wrapper = shallow(<Label type={type} />)

    expect(wrapper.hasClass(`label-${type}`)).toBe(true)
  })
})

it('should could override the class names by className prop', () => {
  const className = 'label-customized'
  const wrapper = shallow(<Label className={className} />)

  expect(wrapper.hasClass(className)).toBe(true)
})
