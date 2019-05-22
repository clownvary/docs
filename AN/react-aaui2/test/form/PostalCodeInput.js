import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import sinon from 'sinon'

import PostalCodeInput from '../../src/form/PostalCodeInput'
import formMountOptions from '../__mocks__/formMountOptions'

const COUNTRY_CONFIG_1 = {
  addressForm: {
    addressFields: {
      City: {
        addressPart: 'city',
        validationRegex: '',
      },
      ZIP: {
        addressPart: 'postalCode',
        validationRegex: '^(\\d{5}|\\d{5}-\\d{4})$',
      },
    },
  },
}

const COUNTRY_CONFIG_2 = {
  addressForm: {
    addressFields: {
      ZIP: {
        addressPart: 'postalCode',
      },
    },
  },
}

const COUNTRY_CONFIG_3 = {}

const COUNTRY_CONFIG_4 = {
  addressForm: {
    addressFields: {
      City: {
        addressPart: 'city',
        validationRegex: '',
      },
      ZIP: {
        addressPart: 'abc',
        validationRegex: '^(\\d{5}|\\d{5}-\\d{4})$',
      },
    },
  },
}

it('should render without errors', () => {
  const wrapper = mount(
    <PostalCodeInput countryConfig={COUNTRY_CONFIG_1} />,
    formMountOptions,
  )

  expect(wrapper).toBeTruthy()
})

it('should render without postal code config', () => {
  const wrapper = mount(
    <PostalCodeInput countryConfig={COUNTRY_CONFIG_2} />,
    formMountOptions,
  )

  expect(wrapper).toBeTruthy()
})

it('should render without any config', () => {
  const wrapper = mount(
    <PostalCodeInput countryConfig={COUNTRY_CONFIG_3} />,
    formMountOptions,
  )

  expect(wrapper).toBeTruthy()
})

it('should render correct things', () => {
  const wrapper = mount(
    <PostalCodeInput
      name="postalCode"
      type="postalCode"
      countryConfig={COUNTRY_CONFIG_1}
    />,
    formMountOptions,
  )

  expect(wrapper.find('input').length === 1).toBe(true)
  expect(wrapper.prop('name') === 'postalCode').toBe(true)
  expect(wrapper.prop('type') === 'postalCode').toBe(true)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(
      <PostalCodeInput
        name="postalCode"
        type="postalCode"
        countryConfig={COUNTRY_CONFIG_1}
        aauiFormStore={formMountOptions.context.aauiFormStore}
      />,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should accept valid value', () => {
  const validPostalCode = '12345'
  const wrapper = mount(
    <PostalCodeInput
      name="postalCode"
      type="postalCode"
      countryConfig={COUNTRY_CONFIG_1}
      value={validPostalCode}
    />,
    formMountOptions,
  )

  expect(wrapper.find('input').prop('value') === validPostalCode).toBe(true)
})

it('should call `connectForm.dispatch` when losing focus', () => {
  const dispatchSpy = sinon.spy(
    formMountOptions.context.aauiFormStore,
    'dispatch',
  )
  const injectReducerSpy = sinon.spy(
    formMountOptions.context.aauiFormStore,
    'injectReducer',
  )
  const name = 'postalCode'

  const wrapper = mount(
    <PostalCodeInput
      name={name}
      type="postalCode"
      countryConfig={COUNTRY_CONFIG_1}
    />,
    formMountOptions,
  )
  wrapper.find('input').simulate('blur')

  expect(injectReducerSpy.calledWith(name)).toBe(true)
  expect(injectReducerSpy.callCount === 1).toBe(true)
  expect(dispatchSpy.callCount === 1).toBe(true)
})

it('should accept valid value with unknown postal code in country config', () => {
  const validPostalCode = 'abcdefg'
  const wrapper = mount(
    <PostalCodeInput
      name="postalCode"
      type="postalCode"
      countryConfig={COUNTRY_CONFIG_4}
      value={validPostalCode}
    />,
    formMountOptions,
  )

  expect(wrapper.find('input').prop('value') === validPostalCode).toBe(true)
})
