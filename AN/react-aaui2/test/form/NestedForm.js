import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Form from 'form'
import TextInput from 'form/TextInput'
import NestedForm from 'form/NestedForm'
import L10nProvider from 'shared/L10nProvider'
import formMountOptions, { l10n } from '../__mocks__/formMountOptions'

const setup = (props = {}) => {
  const Component = (
    <L10nProvider>
      <NestedForm l10n={l10n} {...props}>
        <Form>
          <Form.HField
            name="name"
            label="Name"
            required
            component={TextInput}
          />
        </Form>
      </NestedForm>
    </L10nProvider>
  )

  const wrapper = mount(Component, formMountOptions)

  return {
    props,
    Component,
    wrapper,
  }
}

it('should render withoug errors', () => {
  const { wrapper } = setup()

  expect(wrapper).toBeTruthy()

  wrapper.unmount()
})

it("should render right thing and don't change unexpected", () => {
  const { Component } = setup()
  const tree = renderer.create(Component).toJSON()

  expect(tree).toMatchSnapshot()
})

it('handleChange', () => {
  const setValueMock = jest.fn()
  const setErrorMock = jest.fn()
  const { wrapper } = setup({
    api: {
      setValue: setValueMock,
      setError: setErrorMock,
    },
  })

  wrapper.find('input').simulate('change', {
    target: {
      value: 'test',
    },
  })

  expect(setValueMock).toBeCalled()
  expect(setErrorMock).toBeCalled()
})

it('call `onChange` callback when trigger change event', () => {
  const onChangeMock = jest.fn()
  const { wrapper } = setup({ onChange: onChangeMock })

  wrapper.find('input').simulate('change', {
    target: {
      value: 'test',
    },
  })

  expect(onChangeMock).toBeCalled()
})
