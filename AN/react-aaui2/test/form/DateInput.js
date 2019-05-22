import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import DateInput, { validator } from 'form/DateInput'
import { ValidationResult } from 'form/validation'
import { omit } from 'shared/utils'
import formMountOptions, { l10n } from '../__mocks__/formMountOptions'

const setup = (props = {}) => {
  const api = {
    ...props.api,
  }
  const Component = (
    <DateInput api={api} l10n={l10n} name="date" {...omit(props, ['api'])} />
  )
  const wrapper = mount(Component, formMountOptions)

  return {
    Component,
    wrapper,
  }
}

describe('DateInput', () => {
  it('should render without errors', () => {
    const { wrapper } = setup({ value: '4/1/2015' })

    expect(wrapper).toBeTruthy()
  })

  it('should render correct things', () => {
    const { wrapper } = setup({ value: '2011-01-12' })

    wrapper.find('input').simulate('blur')

    expect(wrapper.find('input').length).toBe(1)
    expect(wrapper.prop('name')).toBe('date')
  })

  it("should render right thing and don't change unexpected", () => {
    const { Component } = setup({
      value: '2017-07-12',
      today: new Date(1995, 11, 17),
    })
    const tree = renderer.create(Component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should call `onValidate` api && `onBlur` callback when losing focus', () => {
    const onValidateMock = jest.fn()
    const onBlurMock = jest.fn()
    const { wrapper } = setup({
      api: { onValidate: onValidateMock },
      onBlur: onBlurMock,
    })

    wrapper.find('input').simulate('blur')

    expect(onValidateMock).toBeCalled()
    expect(onBlurMock).toBeCalled()
  })

  it('should call `setValue` api && `onChange` callback when changing date value', () => {
    const onChange = jest.fn()
    const setValue = jest.fn()
    const { wrapper } = setup({
      value: '2017-07-12',
      api: { setValue },
      onChange,
    })

    wrapper.find('input').instance().value = '2011-01-12'
    wrapper.find('input').simulate('blur')

    expect(onChange).toBeCalled()
    expect(setValue).toBeCalled()
  })
})

describe('DateInput -> validator', () => {
  it('validate with right format', () => {
    const validationResult = validator({ l10n })(
      new ValidationResult('date', '1/1/1991'),
    )

    expect(validationResult.errMsg).toBe('')
  })

  it('validate with wrong format', () => {
    const validationResult = validator({ l10n })(
      new ValidationResult('date', '1991-01-01'),
    )

    expect(validationResult.errMsg).not.toBe('')
  })
})
