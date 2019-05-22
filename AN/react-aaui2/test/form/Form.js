import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import L10nProvider from 'shared/L10nProvider'
import Form from 'form'
import CheckboxGroup from 'form/CheckboxGroup'
import TextInput from 'form/TextInput'
import EmailInput from 'form/EmailInput'
import Button from 'Button'
import Alert from 'alert'
import formMountOptions from '../__mocks__/formMountOptions'

const name = 'field'
const setup = (props = {}) => {
  const FieldComponent = props.FieldComponent || TextInput
  const Component = (
    <Form {...props}>
      <Form.HField
        name={name}
        label="field"
        component={FieldComponent}
        required={props.required}
        value={props.value || ''}
      />
      <Button>Submit</Button>
    </Form>
  )

  let wrapper = mount(Component)

  if (props.parentStore) {
    wrapper = mount(Component, formMountOptions)
  }

  return {
    props,
    Component,
    wrapper,
  }
}

describe('Form', () => {
  it('should render withoug errors', () => {
    const { wrapper } = setup()

    expect(wrapper).toBeTruthy()

    wrapper.unmount()
  })

  it('should render correct thing', () => {
    const { wrapper } = setup({ onSubmit: () => {} })

    expect(typeof wrapper.find(Form).props().onSubmit === 'function').toBe(true)
    expect(wrapper.find(Form.HField).length).toBe(1)
    expect(wrapper.find('button').length).toBe(1)
  })

  it("should render right thing and don't change unexpected", () => {
    const { Component } = setup({ onSubmit: () => {}, required: true })
    const tree = renderer.create(Component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("should render right thing and don't change unexpected when nesting Form", () => {
    const { Component } = setup({
      onSubmit: () => {},
      required: true,
      parentStore: true,
    })
    const tree = renderer.create(Component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('set default values for form fields through `defalutValue`', () => {
    const defaultValue = 'defaultValue'
    const fields = { [name]: { defaultValue } }
    const { wrapper } = setup({ fields })

    expect(
      wrapper
        .find(`[name="${name}"]`)
        .last()
        .prop('value'),
    ).toBe(defaultValue)
  })

  it('set default values for form fields directly', () => {
    const defaultValue = 'defaultValue'
    const fields = { [name]: defaultValue }
    const { wrapper } = setup({ fields })

    expect(
      wrapper
        .find(`[name="${name}"]`)
        .last()
        .prop('value'),
    ).toBe(defaultValue)
  })

  it('createForm', () => {
    const MyForm = Form.createForm()(props => (
      <L10nProvider>
        <Form {...props}>
          <Form.HField
            name="field"
            label="field"
            component={TextInput}
            required={props.required}
          />
          <button type="submit">Submit</button>
        </Form>
      </L10nProvider>
    ))

    const wrapper = mount(<MyForm required />)

    expect(wrapper).toBeTruthy()
  })

  it('EmailInput validation', () => {
    const { wrapper } = setup({ FieldComponent: EmailInput })
    const input = wrapper.find('input')
    const test = 'test'

    input.simulate('change', { target: { value: test } })
    // input.getElement().value = test
    input.simulate('blur', input)

    expect(wrapper.find('.form__group--error').length).toBeGreaterThanOrEqual(1)
    expect(
      wrapper
        .find('.form__validate')
        .last()
        .text(),
    ).toBe('This field is invalid.')
  })
})

describe('Form API', () => {
  it('lifecycle methods', () => {
    const preSubmitMock = jest.fn()
    const shouldSubmitMock = jest.fn()
    const onSubmitMock = jest.fn()
    const postSubmitMock = jest.fn()
    const onFailMock = jest.fn()
    const onChangeMock = jest.fn()
    const { wrapper } = setup({
      required: false,
      preSubmit: preSubmitMock,
      shouldSubmit: shouldSubmitMock,
      onSubmit: onSubmitMock,
      postSubmit: postSubmitMock,
      onFail: onFailMock,
      onChange: onChangeMock,
    })

    preSubmitMock.mockReturnValue('preSubmit')
    shouldSubmitMock.mockReturnValue(true)

    wrapper.simulate('submit')

    expect(preSubmitMock).toBeCalled()
    expect(shouldSubmitMock).toBeCalled()
    expect(shouldSubmitMock).toBeCalledWith({ [name]: undefined }, 'preSubmit')
    expect(onSubmitMock).toBeCalled()
    expect(postSubmitMock).toBeCalled()
    expect(onChangeMock).not.toBeCalled()

    shouldSubmitMock.mockReturnValue(false)

    wrapper.simulate('submit')
  })

  it('submit', () => {
    const onSubmitMock = jest.fn()
    const onFailMock = jest.fn()
    const onChangeMock = jest.fn()
    const { wrapper } = setup({
      required: true,
      onSubmit: onSubmitMock,
      onFail: onFailMock,
      onChange: onChangeMock,
    })
    // "Event propagation is not supported". I assume that's what causes this problem.
    // See https://github.com/airbnb/enzyme/blob/master/docs/future.md
    // wrapper.find('button[type="submit"]').simulate('click')
    wrapper.simulate('submit')

    expect(onSubmitMock.mock.calls.length).toBe(0)
    expect(onFailMock.mock.calls.length).toBe(1)
    expect(onChangeMock.mock.calls.length).toBe(1)

    const input = wrapper.find('input')
    const test = 'test'
    // Trigger `setValue`
    input.simulate('change', { target: { value: test } })
    // input.getElement().value = test
    // Trigger `onValidate`
    input.simulate('blur', input)

    expect(wrapper.find(Alert).length === 0).toBe(true)

    wrapper.simulate('submit')
    wrapper.simulate('submit')
    wrapper.simulate('submit')
    wrapper.simulate('submit')

    expect(onChangeMock.mock.calls.length).toBeGreaterThanOrEqual(3)
    expect(onSubmitMock.mock.calls.length).toBe(4)
    expect(onSubmitMock.mock.calls[0][0]).toMatchObject({ [name]: test })
  })

  it('call `parser` func before triggering validation', () => {
    const parserMock = jest.fn()
    const fields = { [name]: { parser: parserMock } }
    const { wrapper } = setup({ fields, required: true })

    const input = wrapper.find('input')
    // Trigger validation
    input.simulate('blur', input)

    expect(parserMock).toBeCalled()

    const test = 'test'
    // Trigger `setValue`
    input.simulate('change', {
      target: {
        value: test,
      },
    })
    // input.getElement().value = test

    // Trigger validation
    input.simulate('blur', input)
    expect(parserMock).toHaveBeenCalledTimes(2)
    expect(parserMock).toBeCalledWith(test, expect.anything())
  })

  it('call `formatter` func if the value is valid', () => {
    const formatterMock = jest.fn()
    const fields = { [name]: { formatter: formatterMock } }
    const { wrapper } = setup({ fields, required: true })

    const input = wrapper.find('input')
    // Trigger validation
    input.simulate('blur', input)

    expect(formatterMock).toBeCalled()

    const test = 'test'
    // Trigger `setValue`
    input.simulate('change', { target: { value: test } })
    // input.getElement().value = test

    // Trigger validation
    input.simulate('blur', input)

    expect(formatterMock).toHaveBeenCalledTimes(2)
    expect(formatterMock).toBeCalledWith(test, expect.anything())
  })
})

describe('Form fields', () => {
  it('should accept field value with type of array', () => {
    const onSubmit = jest.fn()
    const value = ['tennis', 'basketball']
    const fields = { [name]: value }
    const { wrapper } = setup({
      fields,
      onSubmit,
      FieldComponent: CheckboxGroup,
    })

    wrapper.simulate('submit')

    expect(onSubmit).toBeCalledWith(expect.objectContaining({ [name]: value }))
  })

  it('update', () => {
    const defaultValue = 'defaultValue'
    const updatedValue = `${defaultValue}--updated`
    const fields = { [name]: { defaultValue } }
    const { wrapper } = setup({ fields, needL10nProvider: true })

    expect(
      wrapper
        .find(`[name="${name}"]`)
        .last()
        .prop('value'),
    ).toBe(defaultValue)

    const updatedProps = { fields: { [name]: updatedValue } }
    wrapper.setProps(updatedProps)
    expect(
      wrapper
        .find(`[name="${name}"]`)
        .last()
        .prop('value'),
    ).toBe(updatedValue)

    wrapper.setProps(updatedProps)
    expect(
      wrapper
        .find(`[name="${name}"]`)
        .last()
        .prop('value'),
    ).toBe(updatedValue)
  })

  it('clear', () => {
    const defaultValue = 'defaultValue'
    const updatedValue = ''
    const fields = { [name]: { defaultValue } }
    const { wrapper } = setup({ fields, needL10nProvider: true })

    expect(
      wrapper
        .find(`[name="${name}"]`)
        .last()
        .prop('value'),
    ).toBe(defaultValue)

    const updatedProps = { fields: { [name]: updatedValue } }
    wrapper.setProps(updatedProps)
    expect(
      wrapper
        .find(`[name="${name}"]`)
        .last()
        .prop('value'),
    ).toBe(updatedValue)
  })
})
