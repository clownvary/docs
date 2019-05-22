import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import Radio from 'radio/RadioComponent'

it('should render without errors', () => {
  const wrapper = shallow(<Radio />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Radio />)

  expect(wrapper.find('label.radio-wrapper').length).toBe(1)
  expect(wrapper.find('input').length).toBe(1)
  expect(wrapper.find('span.radio__inner').length).toBe(1)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<Radio />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('has a .radio-wrapper class name for the default Radio', () => {
  const wrapper = shallow(<Radio />)

  expect(wrapper.hasClass('radio-wrapper')).toBe(true)
})

it('disaled', () => {
  const wrapper = shallow(<Radio disabled />)

  expect(wrapper.find('input[disabled]').length).toBe(1)
})

it('has a .radio and .radio--sm class name for the common size Radio', () => {
  const wrapper = shallow(<Radio size="sm" />)

  expect(wrapper.find('.radio.radio--sm').length).toBe(1)
})

it('has a .radio and .radio--lg class name for the large Radio', () => {
  const wrapper = shallow(<Radio size="lg" />)

  expect(wrapper.find('.radio.radio--lg').length).toBe(1)
})

it('should could checked through the instance property', () => {
  const wrapper = mount(<Radio defaultChecked />)

  expect(wrapper.instance().checked).toBe(true)
})

it('should could set checked through the instance `checked` property when defaultChecked', () => {
  const wrapper = mount(<Radio defaultChecked />)

  expect(wrapper.instance().checked).toBe(true)
  expect(wrapper.state('checked')).toBe(true)

  wrapper.instance().checked = false

  expect(wrapper.instance().checked).toBe(false)
  expect(wrapper.instance().input.checked).toBe(false)
  expect(wrapper.state('checked')).toBe(false)
})

it('should could set checked through the instance `checked` property when checked', () => {
  const wrapper = mount(<Radio checked />)

  expect(wrapper.instance().checked).toBe(true)
  expect(wrapper.state('checked')).toBe(true)

  wrapper.instance().checked = false

  expect(wrapper.instance().checked).toBe(false)
  expect(wrapper.instance().input.checked).toBe(false)
  expect(wrapper.state('checked')).toBe(false)
  expect(wrapper.state('checked')).toBe(false)
})

it('should could set checked through the instance `checked` property when unchecked', () => {
  const wrapper = mount(<Radio />)

  expect(wrapper.instance().checked).toBe(false)
  expect(wrapper.state('checked')).toBe(false)

  wrapper.instance().checked = true

  expect(wrapper.instance().checked).toBe(true)
  expect(wrapper.instance().input.checked).toBe(true)
  expect(wrapper.state('checked')).toBe(true)
})

it('should NOT call onChange when setting checked through the instance property', () => {
  const onChangeMock = jest.fn()
  const wrapper = mount(<Radio defaultChecked onChange={onChangeMock} />)

  wrapper.instance().checked = false

  expect(wrapper.instance().checked).toBe(false)
  expect(onChangeMock).not.toBeCalled()
})

it('should could sync props => state', () => {
  const wrapper = shallow(<Radio defaultChecked />)

  expect(wrapper.state('checked')).toBe(true)

  wrapper.setProps({
    useless: !wrapper.state('checked'),
  })

  wrapper.setProps({
    checked: !wrapper.state('checked'),
  })

  expect(wrapper.state('checked')).toBe(false)

  wrapper.setProps({
    checked: wrapper.state('checked'),
  })
})

it('should call onChange when triggering change event for the wrapped input', () => {
  const onChangeMock = jest.fn()
  const wrapper = shallow(<Radio onChange={onChangeMock} />)

  expect(wrapper.state('checked')).toBe(false)

  wrapper.find('input[type="radio"]').simulate('change', {
    persist: () => {},
    preventDefault: () => {},
    target: {
      checked: true,
    },
  })

  expect(onChangeMock).toBeCalled()
  expect(wrapper.state('checked')).toBe(true)
})

it("don't handle `onChange` event when setting `disabled` as true", () => {
  const onChangeMock = jest.fn()
  const wrapper = shallow(<Radio disabled checked onChange={onChangeMock} />)

  wrapper.find('input').simulate('change', {
    target: {
      value: false,
    },
  })

  expect(onChangeMock).not.toBeCalled()
})

it('should could call `stopPropagation` & `preventDefault`', () => {
  const stopPropagationMock = jest.fn()
  const preventDefaultMock = jest.fn()
  const onChangeMock = jest.fn(e => {
    e.stopPropagation()
    e.preventDefault()
  })
  const wrapper = shallow(<Radio onChange={onChangeMock} />)

  wrapper.find('input').simulate('change', {
    target: {
      checked: true,
    },
    stopPropagation: stopPropagationMock,
    preventDefault: preventDefaultMock,
  })

  expect(stopPropagationMock).toBeCalled()
  expect(preventDefaultMock).toBeCalled()
})
