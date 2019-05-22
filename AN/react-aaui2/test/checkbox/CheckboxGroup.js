import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import { CheckboxGroup, Checkbox } from 'Checkbox'

const checkboxGroupData = [
  { text: 'Basketball(with data)', value: 'basketball' },
  { text: 'Tennis(with data)', value: 'tennis' },
  { text: 'Swimming(with data)', value: 'swimming' },
]
const BASKETBALL = 'basketball'
const TENNIS = 'tennis'
const setup = ({ dataDriven, ...rest } = {}) => {
  let Component = (
    <CheckboxGroup name="sports" {...rest}>
      <Checkbox value={BASKETBALL}>Basketball</Checkbox>
      <Checkbox value={TENNIS}>Tennis</Checkbox>
      <Checkbox value="swimming">Swimming</Checkbox>
      <button />
    </CheckboxGroup>
  )

  if (dataDriven) {
    Component = (
      <CheckboxGroup name="sports" data={checkboxGroupData} {...rest} />
    )
  }

  const wrapper = mount(Component)

  return {
    Component,
    wrapper,
  }
}

it('should render without errors', () => {
  const { wrapper } = setup()

  expect(wrapper).toBeTruthy()
})

it("should render right thing and don't change unexpected", () => {
  const { Component } = setup({ value: [TENNIS] })
  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render right with `defaultValue`', () => {
  const { wrapper } = setup({ defaultValue: [TENNIS] })

  expect(wrapper.state('value')).toEqual([TENNIS])
})

it('should could sync props => state', () => {
  const { wrapper } = setup({ value: [TENNIS] })

  wrapper.setProps({
    value: [BASKETBALL],
  })

  expect(wrapper.state('value')).toEqual([BASKETBALL])
})

it('should not could sync props => state when not passing `value`', () => {
  const { wrapper } = setup()

  wrapper.setProps({
    UFO: 'UFO',
  })

  expect(wrapper.state('value')).toEqual([])
})

it('onChange: add one', () => {
  const onChangeMock = jest.fn()
  const { wrapper } = setup({ onChange: onChangeMock })

  wrapper.find(`input[value="${TENNIS}"]`).simulate('change', {
    target: {
      value: TENNIS,
    },
  })

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith([TENNIS])
})

it('onChange: remove one', () => {
  const onChangeMock = jest.fn()
  const { wrapper } = setup({
    value: [BASKETBALL, TENNIS],
    onChange: onChangeMock,
  })

  wrapper.find(`input[value="${TENNIS}"]`).simulate('change', {
    target: {
      value: TENNIS,
    },
  })

  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledWith([BASKETBALL])
})

it('Data-Driven CheckboxGroup', () => {
  const onChangeMock = jest.fn()
  const { wrapper, Component } = setup({
    onChange: onChangeMock,
    dataDriven: true,
  })

  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()

  wrapper.find(`input[value="${TENNIS}"]`).simulate('change', {
    target: {
      value: TENNIS,
      checked: true,
    },
  })
  expect(onChangeMock).toBeCalled()
  expect(wrapper.state('value')).toEqual([TENNIS])
})
