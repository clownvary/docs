import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import Checkbox from 'Checkbox/CheckboxComponent'

it('should render without errors', () => {
  const wrapper = shallow(<Checkbox />)

  expect(wrapper).toBeTruthy()
})

it('should render right thing', () => {
  const wrapper = shallow(<Checkbox>Checkbox</Checkbox>)

  expect(wrapper.find('label.checkbox-wrapper').length === 1).toBe(true)
  expect(wrapper.find('input').length === 1).toBe(true)
  expect(wrapper.find('span.checkbox__text').length === 1).toBe(true)
})

it('should render right thing when it is a toggle', () => {
  const wrapper = shallow(<Checkbox toggle />)

  expect(wrapper.find('label.toggle').length === 1).toBe(true)
  expect(wrapper.find('input').length === 1).toBe(true)
  expect(wrapper.find('span.toggle__text').length === 1).toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer.create(<Checkbox />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('has tabIndex=-1 when disabled', () => {
  const wrapper = shallow(<Checkbox tabIndex={0} disabled />)

  expect(wrapper.find('[tabIndex=0]').length).toBe(1)
})

it('should has .checkbox by default', () => {
  const wrapper = shallow(<Checkbox>checkbox child</Checkbox>)

  expect(wrapper.hasClass('checkbox-wrapper')).toBe(true)
})

it('should has .checkbox and checkbox--sm for small sized checkbox', () => {
  const wrapper = shallow(<Checkbox size="sm" />)

  expect(wrapper.hasClass('checkbox-wrapper')).toBe(true)
  expect(wrapper.find('.checkbox').hasClass('checkbox--sm')).toBe(true)
})

it('should could checked through the instance property', () => {
  const wrapper = mount(<Checkbox defaultChecked />)

  expect(wrapper.instance().checked).toBe(true)
})

it('should could set checked through the instance `checked` property when defaultChecked', () => {
  const wrapper = mount(<Checkbox defaultChecked />)

  expect(wrapper.instance().checked).toBe(true)
  expect(wrapper.state('checked')).toBe(true)

  wrapper.instance().checked = false

  expect(wrapper.instance().checked).toBe(false)
  expect(wrapper.instance().input.checked).toBe(false)
  expect(wrapper.state('checked')).toBe(false)
})

it('should could set checked through the instance `checked` property when checked', () => {
  const wrapper = mount(<Checkbox checked />)

  expect(wrapper.instance().checked).toBe(true)
  expect(wrapper.state('checked')).toBe(true)

  wrapper.instance().checked = false

  expect(wrapper.instance().checked).toBe(false)
  expect(wrapper.instance().input.checked).toBe(false)

  expect(wrapper.state('checked')).toBe(false)
})

it('should could set checked through the instance `checked` property when unchecked', () => {
  const wrapper = mount(<Checkbox />)

  expect(wrapper.instance().checked).toBe(false)
  expect(wrapper.state('checked')).toBe(false)

  wrapper.instance().checked = true

  expect(wrapper.instance().checked).toBe(true)
  expect(wrapper.instance().input.checked).toBe(true)
  expect(wrapper.state('checked')).toBe(true)
})

it('should NOT call onChange when setting checked through the instance property', () => {
  const onChangeMock = jest.fn()
  const wrapper = mount(<Checkbox defaultChecked onChange={onChangeMock} />)

  wrapper.instance().checked = false

  expect(wrapper.instance().checked).toBe(false)
  expect(onChangeMock).not.toBeCalled()
})

it('should could sync props => state', () => {
  const wrapper = shallow(<Checkbox defaultChecked />)

  expect(wrapper.state('checked')).toBe(true)

  wrapper.setProps({
    useless: !wrapper.state('checked'),
  })

  wrapper.setProps({
    checked: !wrapper.state('checked'),
  })

  expect(wrapper.state('checked')).toBe(false)
})

it('should call onChange when triggering change event for the wrapped input', () => {
  const onChangeMock = jest.fn()
  const wrapper = shallow(<Checkbox onChange={onChangeMock} />)

  expect(wrapper.state('checked')).toBe(false)

  wrapper.find('input[type="checkbox"]').simulate('change', {
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
  const wrapper = shallow(<Checkbox disabled checked onChange={onChangeMock} />)

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
  const wrapper = shallow(<Checkbox onChange={onChangeMock} />)

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
