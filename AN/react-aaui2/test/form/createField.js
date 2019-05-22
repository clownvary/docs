import React from 'react'
import { shallow } from 'enzyme'

import createField, {
  registerFormField,
  isRegisteredField,
} from 'form/createField'
import formMountOptions from '../__mocks__/formMountOptions'

const WrappedLayout = () => <div>Hello, World!</div>

const Field = createField(WrappedLayout)

it('it should return a component which render the wrapped component as the container layout', () => {
  const wrapper = shallow(<Field component="div" />, formMountOptions)

  expect(wrapper.is(WrappedLayout)).toBe(true)
  expect(wrapper.childAt(0).is('div')).toBe(true)
})

it("if called without layout component, it will return a component which render it's children directly", () => {
  const EmptyLayoutField = createField()
  const wrapper = shallow(
    <EmptyLayoutField component="div" />,
    formMountOptions,
  )

  expect(wrapper.is('div')).toBe(true)
})

it('the wrapper component should pass the layout props to wrapped component', () => {
  const wrapper = shallow(
    <Field name="name" label="label" errMsg="error" required component="div" />,
    formMountOptions,
  )

  expect(wrapper.prop('name')).toBe('name')
  expect(wrapper.prop('label')).toBe('label')
  expect(wrapper.prop('required')).toBe(true)
  expect(wrapper.prop('errMsg')).toBe('error')
  expect(wrapper.prop('component')).toBe(undefined)
})

it("the wrapper component should pass rest props to the 'component'", () => {
  const wrapper = shallow(
    <Field
      rules={'number|phone'}
      name="name"
      label="label"
      errMsg="error"
      required
      component="div"
      someOther="someOther"
    />,
    formMountOptions,
  )

  expect(wrapper.find('div').prop('name')).toBe('name')
  expect(wrapper.find('div').prop('label')).toBe('label')
  expect(wrapper.find('div').prop('required')).toBe(true)
  expect(wrapper.find('div').prop('component')).toBe(undefined)
  expect(wrapper.find('div').prop('someOther')).toBe('someOther')
})

it('registerFormField', () => {
  registerFormField(Field)
  registerFormField(Field)

  expect(isRegisteredField(Field)).toBe(true)
})
