import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import TextInput from 'form/TextInput'

it('should render without errors', () => {
  const wrapper = mount(<TextInput />)

  expect(wrapper).toBeTruthy()
})

it('should render correct things', () => {
  const wrapper = mount(<TextInput name="text" type="text" />)

  expect(wrapper.find('input').length).toBe(1)
  expect(wrapper.prop('name')).toBe('text')
  expect(wrapper.prop('type')).toBe('text')
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<TextInput name="text" type="text" />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should call `onBlur` callback when losing focus on input', () => {
  const onBlur = jest.fn()
  const wrapper = mount(<TextInput onBlur={onBlur} name="text" type="text" />)

  wrapper.find('input').simulate('blur')

  expect(onBlur).toBeCalled()
})

it('should call `onChange` callback when losing focus on input', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <TextInput onChange={onChange} name="text" type="text" />,
  )

  wrapper.find('input').simulate('change')

  expect(onChange).toBeCalled()
})
