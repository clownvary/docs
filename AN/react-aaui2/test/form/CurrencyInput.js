import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import CurrencyInput from 'form/CurrencyInput'
import { omit } from 'shared/utils'
import KEY_CODES from 'shared/keyCodes'
import { l10n } from '../__mocks__/formMountOptions'

const setup = (props = {}) => {
  const api = {
    ...props.api,
  }

  const Component = (
    <CurrencyInput
      api={api}
      l10n={l10n}
      name="currency"
      {...omit(props, ['api'])}
    />
  )
  const wrapper = mount(Component)

  return {
    Component,
    wrapper,
  }
}

describe('CurrencyInput', () => {
  it('should render without errors', () => {
    const { wrapper } = setup()

    expect(wrapper).toBeTruthy()
  })

  it('should render correct things', () => {
    const { wrapper } = setup({ code: 'RMB' })

    expect(wrapper.text()).toEqual(expect.stringContaining('RMB'))
  })

  it("should render right thing and don't change unexpected", () => {
    const { Component } = setup({ value: 1234 })
    const tree = renderer.create(Component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("should render right thing and don't change unexpected for JPY", () => {
    const { Component } = setup({ code: 'JPY' }) // integerOnly
    const tree = renderer.create(Component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('componentWillReceiveProps -> props.value', () => {
    const { wrapper, Component } = setup({ value: 1234 })
    const receiveValue = 9999

    wrapper.setProps({ value: receiveValue })

    const tree = renderer.create(Component).toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('CurrencyInput: change & blur', () => {
  it('change', () => {
    const onChange = jest.fn()
    const { wrapper } = setup({ onChange })
    const value = '1111'

    wrapper.find('input').simulate('change', {
      target: {
        value,
      },
    })

    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        target: {
          value,
        },
      }),
    )
  })

  it('blur', () => {
    const setValue = jest.fn()
    const onValidate = jest.fn()
    const onBlur = jest.fn()
    const value = 1111
    const { wrapper } = setup({
      code: 'JPY',
      value,
      api: { setValue, onValidate },
      onBlur,
    })

    wrapper.find('input').simulate('blur')

    expect(setValue).toBeCalledWith(value)
    expect(onValidate).toBeCalledWith(value)
    expect(onBlur).toBeCalled()
  })
})

describe('CurrencyInput: keyDown', () => {
  it('None numerical', () => {
    const preventDefault = jest.fn()
    const { wrapper } = setup()

    wrapper
      .find('input')
      .simulate('keyDown', { preventDefault, keyCode: KEY_CODES.BACKSPACE })

    expect(preventDefault).not.toBeCalled()
  })

  it('Numerical', () => {
    const preventDefault = jest.fn()
    const { wrapper } = setup()

    wrapper
      .find('input')
      .simulate('keyDown', { preventDefault, keyCode: KEY_CODES.NUMBER0 })

    expect(preventDefault).not.toBeCalled()
  })

  it('Disallow decimal point when integerOnly', () => {
    const preventDefault = jest.fn()
    const { wrapper } = setup({ code: 'JPY', value: 1234 })

    wrapper
      .find('input')
      .simulate('keyDown', { preventDefault, keyCode: KEY_CODES.DECIMAL_POINT })

    expect(preventDefault).toBeCalled()
  })

  it('Disallows more than one decimal point', () => {
    const preventDefault = jest.fn()
    const { wrapper } = setup({ value: 1234 })

    wrapper
      .find('input')
      .simulate('keyDown', { preventDefault, keyCode: KEY_CODES.DECIMAL_POINT })

    expect(preventDefault).toBeCalled()
  })

  it('Disallows a period before a negative', () => {
    const preventDefault = jest.fn()
    const { wrapper } = setup({ value: -1234 })
    const input = wrapper.find('input')

    input.instance().selectionStart = 0

    input.simulate('keyDown', {
      preventDefault,
      keyCode: KEY_CODES.DECIMAL_POINT,
    })

    expect(preventDefault).toBeCalled()
  })

  it('Disallows a dash in any other places in addition to the first character for negative number', () => {
    const preventDefault = jest.fn()
    const { wrapper } = setup({ value: -1234 })
    const input = wrapper.find('input')

    input.simulate('keyDown', {
      preventDefault,
      keyCode: KEY_CODES.DASH,
    })

    expect(preventDefault).toBeCalled()
  })

  it('Disallows a dash in any other places in addition to the first character for positive number', () => {
    const preventDefault = jest.fn()
    const { wrapper } = setup({ value: 1234 })
    const input = wrapper.find('input')

    input.instance().selectionStart = 5

    input.simulate('keyDown', {
      preventDefault,
      keyCode: KEY_CODES.DASH,
    })

    expect(preventDefault).toBeCalled()
  })

  it('Disallows numbers before a negative', () => {
    const preventDefault = jest.fn()
    const { wrapper } = setup({ value: -1234 })
    const input = wrapper.find('input')

    input.simulate('keyDown', {
      preventDefault,
      keyCode: KEY_CODES.NUMBER9,
    })

    expect(preventDefault).toBeCalled()
  })

  it('Allow a dash as the first character', () => {
    const preventDefault = jest.fn()
    const { wrapper } = setup({ value: 1234 })
    const input = wrapper.find('input')

    input.simulate('keyDown', {
      preventDefault,
      keyCode: KEY_CODES.DASH,
    })

    expect(preventDefault).not.toBeCalled()
  })
})
