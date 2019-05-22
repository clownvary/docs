import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import { FormError } from 'form/FormError'
import Alert from 'alert/Alert'
import formMountOptions from '../__mocks__/formMountOptions'

const { context: { aauiFormStore } } = formMountOptions

const errors = {
  firstName: 'react-aaui.validation.required',
  lastName: 'react-aaui.validation.required',
  email: 'react-aaui.validation.required',
  phone: 'react-aaui.validation.required',
  number: 'react-aaui.validation.required',
  description: 'react-aaui.validationrequired',
  address: {
    line1: 'react-aaui.validation.required',
  },
}

it('should render withoug errors', () => {
  const wrapper = mount(
    <FormError aauiFormStore={aauiFormStore} />,
    formMountOptions,
  )

  expect(wrapper).toBeTruthy()
  wrapper.unmount()
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(
      <FormError
        errors={errors}
        isValid={false}
        aauiFormStore={aauiFormStore}
      />,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render the `Alert` by default', () => {
  const wrapper = mount(
    <FormError aauiFormStore={aauiFormStore} />,
    formMountOptions,
  )

  wrapper.setState({
    errors: {
      firstName: 'react-aaui.validation.required',
    },
    isValid: false,
  })

  expect(wrapper.find(Alert).length).toBe(1)
})

it('should render `name` if provided', () => {
  const wrapper = mount(
    <FormError name="test" aauiFormStore={aauiFormStore} />,
    formMountOptions,
  )

  wrapper.setState({
    errors: {
      firstName: 'react-aaui.validation.required',
    },
    isValid: false,
  })

  expect(wrapper.find(Alert).length).toBe(1)
})

it('should trigger `onchange` when form changed', () => {
  const wrapper = mount(
    <FormError name="test" aauiFormStore={aauiFormStore} />,
    formMountOptions,
  )
  wrapper.instance().store.dispatch({
    type: 'SET_ERROR',
    payload: 'react-aaui.validation.required',
    meta: { name: 'test' },
  })

  expect(wrapper.state().name).toBe('test')
  wrapper.instance().unsubscribe = null
  wrapper.unmount()
})

it('should use context when props `aauiFormStore` absent', () => {
  FormError.contextTypes = formMountOptions.childContextTypes

  const wrapper = mount(<FormError />, formMountOptions)

  expect(wrapper.instance().store).not.toBe(undefined)
})

it('should could customize `errorText`', () => {
  const tree = renderer
    .create(
      <FormError
        errors={errors}
        isValid={false}
        errorText={<h1>CUSTOMIZED ERROR LIST</h1>}
        aauiFormStore={aauiFormStore}
      />,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should call `children` with `errors`', () => {
  const displayErrors = jest.fn()
  const wrapper = mount(
    <FormError aauiFormStore={aauiFormStore}>{displayErrors}</FormError>,
  )

  wrapper.setState({
    errors,
    isValid: false,
  })

  expect(displayErrors).toBeCalledWith({ errors })
})

it('should call `children` with `errors` for specific field name', () => {
  const name = 'firstName'
  const displayErrors = jest.fn()
  const wrapper = mount(
    <FormError name={name} aauiFormStore={aauiFormStore}>
      {displayErrors}
    </FormError>,
  )

  wrapper.setState({
    errors,
    isValid: false,
  })

  expect(displayErrors).toBeCalledWith({ errors: { [name]: errors[name] } })
})
