import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Form from 'form'
import Button from 'Button'
import countriesConfig from '../__mocks__/countriesConfig'

const initFields = {
  country: 'US',
  line1: 'line1',
  line2: 'line2',
  city: 'city',
  stateProvince: 'AA',
  postalCode: '12345',
}
const { AddressEditor } = Form
const setup = (props = {}) => {
  const fields = { ...initFields, ...props.fields }

  const Component = (
    <Form fields={{ address: { value: fields } }} {...props.form}>
      <Form.Field
        name="address"
        component={AddressEditor}
        countriesConfig={countriesConfig}
      />
      <Button>Submit</Button>
    </Form>
  )
  const wrapper = mount(Component)

  return {
    wrapper,
    Component,
  }
}

it("should render right thing and don't change unexpected", () => {
  const { Component } = setup()
  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should stop submitting when error occurs', () => {
  const onSubmit = jest.fn()
  const { wrapper } = setup({
    fields: { city: null },
    form: {
      onSubmit,
    },
  })
  const city = wrapper.find('[name="city"]').last()
  wrapper.simulate('submit')

  expect(onSubmit).not.toBeCalled()

  const test = 'test'
  // Trigger `setValue`
  city.simulate('change', { target: { value: test } })
  city.simulate('blur')
  wrapper.simulate('submit')

  expect(onSubmit).toBeCalledWith(
    expect.objectContaining({
      address: expect.objectContaining({
        city: test,
      }),
    }),
  )
})

it('clear value', () => {
  const { wrapper } = setup()
  const fields = {
    address: {
      value: {
        line1: '',
        line2: '',
        city: '',
      },
    },
  }

  wrapper.setProps({ fields })

  expect(
    wrapper
      .find('[name="line1"]')
      .last()
      .text(),
  ).toBe('')
  expect(
    wrapper
      .find('[name="line2"]')
      .last()
      .text(),
  ).toBe('')
  expect(
    wrapper
      .find('[name="city"]')
      .last()
      .text(),
  ).toBe('')
})

it('should not call `onChange` when submitting Form correctly', () => {
  const onSubmit = jest.fn()
  const onChange = jest.fn()
  const { wrapper, Component } = setup({
    form: {
      onSubmit,
      onChange,
    },
  })
  const tree = renderer.create(Component).toJSON()

  wrapper.simulate('submit')
  expect(onSubmit).toBeCalled()
  expect(onChange).not.toBeCalled()

  expect(tree).toMatchSnapshot()
})

it('should call `onChange` when submitting Form with errors', () => {
  const onSubmit = jest.fn()
  const onChange = jest.fn()
  const onFail = jest.fn()
  const { wrapper, Component } = setup({
    fields: {
      line1: '',
    },
    form: {
      onSubmit,
      onChange,
      onFail,
    },
  })
  const tree = renderer.create(Component).toJSON()

  wrapper.simulate('submit')
  expect(onSubmit).not.toBeCalled()
  expect(onFail).toBeCalled()
  expect(onChange).toBeCalled()

  expect(tree).toMatchSnapshot()
})

it('should clear Combobox value when chaning country but can not find matched value', () => {
  const onFail = jest.fn()
  const { wrapper } = setup({
    form: {
      onFail,
    },
  })

  wrapper.setProps({
    fields: { address: { value: { country: 'CA', postalCode: 'a2b 2b2' } } },
  })
  wrapper.simulate('submit')

  expect(onFail).toBeCalledWith(
    expect.objectContaining({
      address: { stateProvince: 'react-aaui.validation.required' },
    }),
  )
})
