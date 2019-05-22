import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import { RadioGroup, Radio } from 'radio'

const radioGroupData = [
  { text: 'Basketball(with data)', value: 'basketball' },
  { text: 'Tennis(with data)', value: 'tennis' },
  { text: 'Swimming(with data)', value: 'swimming' },
]
const BASKETBALL = 'basketball'
const TENNIS = 'tennis'
const setup = ({ dataDriven, ...rest } = {}) => {
  let Component = (
    <RadioGroup {...rest}>
      <Radio value={BASKETBALL}>Basketball</Radio>
      <Radio value={TENNIS}>Tennis</Radio>
      <Radio value="swimming">Swimming</Radio>
      <button />
    </RadioGroup>
  )

  if (dataDriven) {
    Component = <RadioGroup data={radioGroupData} {...rest} />
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
  const { Component } = setup({ value: TENNIS })
  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render right with `defaultValue`', () => {
  const { wrapper } = setup({ defaultValue: TENNIS })

  expect(wrapper.state('value')).toBe(TENNIS)
})

it('should could sync props => state', () => {
  const { wrapper } = setup({ value: TENNIS })

  wrapper.setProps({
    value: BASKETBALL,
  })

  expect(wrapper.state('value')).toBe(BASKETBALL)
})

it('should not could sync props => state when not passing `value`', () => {
  const { wrapper } = setup()

  wrapper.setProps({
    UFO: 'UFO',
  })

  expect(wrapper.state('value')).not.toBeTruthy()
})

it('onChange', () => {
  const onChangeMock = jest.fn()
  const { wrapper } = setup({ onChange: onChangeMock })

  wrapper.find(`input[value="${TENNIS}"]`).simulate('change', {
    target: {
      value: TENNIS,
      checked: true,
    },
  })

  expect(onChangeMock).toBeCalled()
  expect(wrapper.state('value')).toBe(TENNIS)
})

it('Data-Driven RadioGroup', () => {
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
  expect(wrapper.state('value')).toBe(TENNIS)
})
