import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import AddressEditor from 'form/AddressEditor'
import L10nProvider from 'shared/L10nProvider'
import Combobox from 'form/Combobox'
import TextInput from 'form/TextInput'

import formMountOptions from '../__mocks__/formMountOptions'
import countriesConfig from '../__mocks__/countriesConfig'

const FIELDS_1 = {
  country: 'US',
  line1: 'line1',
  line2: 'line2',
  city: 'city',
  stateProvince: 'AA',
  postalCode: '12345',
}

const FIELDS_WITH_MULTIPLE = {
  country: 'ID',
  line1: 'line1',
  line2: 'line2',
  city: 'cityPart1\ncityPart2',
  stateProvince: 'stateProvince1\nstateProvice2',
}

const FIELDS_WITH_NULL = {
  country: null,
  line1: 'line1',
  line2: null,
  city: {
    value: 'city',
    validator: () => () => {},
  },
}

const UFO_FIELDS = {
  country: 'UFO',
}

it('should render without errors', () => {
  const wrapper = mount(
    <AddressEditor countriesConfig={countriesConfig} />,
    formMountOptions,
  )

  expect(wrapper).toBeTruthy()
  wrapper.unmount()
})

it('should render correct things when changing country', () => {
  const wrapper = mount(
    <AddressEditor countriesConfig={countriesConfig} />,
    formMountOptions,
  )

  expect(wrapper.find('.dropdown').length).toBe(2)
  expect(wrapper.find('.input').length).toBe(4)

  const countryField = wrapper.find(Combobox).at(0)
  countryField.find('.dropdown__button').simulate('click')
  countryField
    .find('ul')
    .childAt(1)
    .find('a')
    .simulate('click')

  expect(wrapper.find('.dropdown').length).toBe(2)
  expect(wrapper.find('.input').length).toBe(4)
})

it('should render correct things when changing country by prop', () => {
  const wrapper = mount(
    <AddressEditor name="address" countriesConfig={countriesConfig} />,
    formMountOptions,
  )

  expect(wrapper.find('.dropdown').length).toBe(2)
  expect(wrapper.find('.input').length).toBe(4)

  wrapper.setProps({
    country: 'ID',
  })

  expect(wrapper.find('.dropdown').length).toBe(1)
  expect(wrapper.find('.input').length).toBe(6)
})

it('should render correct things for set fields', () => {
  const wrapper = mount(
    <AddressEditor countriesConfig={countriesConfig} value={FIELDS_1} />,
    formMountOptions,
  )

  expect(wrapper.find(Combobox).get(0).props.value).toBe(FIELDS_1.country)
  expect(wrapper.find(TextInput).get(0).props.value).toBe(FIELDS_1.line1)
  expect(wrapper.find(TextInput).get(1).props.value).toBe(FIELDS_1.line2)
  expect(wrapper.find(TextInput).get(2).props.value).toBe(FIELDS_1.city)
  expect(wrapper.find(Combobox).get(1).props.value).toBe(FIELDS_1.stateProvince)
  expect(wrapper.find(TextInput).get(3).props.value).toBe(FIELDS_1.postalCode)
})

it('should render correct things for set fields with multiple fields', () => {
  const wrapper = mount(
    <AddressEditor
      countriesConfig={countriesConfig}
      value={FIELDS_WITH_MULTIPLE}
    />,
    formMountOptions,
  )

  expect(wrapper.find(Combobox).get(0).props.value).toBe(
    FIELDS_WITH_MULTIPLE.country,
  )
  expect(wrapper.find(TextInput).get(0).props.value).toBe(
    FIELDS_WITH_MULTIPLE.line1,
  )
  expect(wrapper.find(TextInput).get(1).props.value).toBe(
    FIELDS_WITH_MULTIPLE.line2,
  )
  expect(wrapper.find(TextInput).get(2).props.value).toBe(
    FIELDS_WITH_MULTIPLE.city.split('\n')[0],
  )
  expect(wrapper.find(TextInput).get(3).props.value).toBe(
    FIELDS_WITH_MULTIPLE.city.split('\n')[1],
  )
  expect(wrapper.find(TextInput).get(4).props.value).toBe(
    FIELDS_WITH_MULTIPLE.stateProvince.split('\n')[0],
  )
  expect(wrapper.find(TextInput).get(5).props.value).toBe(
    FIELDS_WITH_MULTIPLE.stateProvince.split('\n')[1],
  )
})

it('should render correct things for set fields with multiple fields when changing field values', () => {
  const wrapper = mount(
    <AddressEditor
      countriesConfig={countriesConfig}
      value={FIELDS_WITH_MULTIPLE}
    />,
    formMountOptions,
  )

  const stateProvice2 = 'UPDATTTTEEED-stateProvice2'
  wrapper
    .find('[name="stateProvince.2"]')
    .last()
    .simulate('change', { target: { value: stateProvice2 } })

  expect(wrapper.find(Combobox).get(0).props.value).toBe(
    FIELDS_WITH_MULTIPLE.country,
  )
  expect(wrapper.find(TextInput).get(0).props.value).toBe(
    FIELDS_WITH_MULTIPLE.line1,
  )
  expect(wrapper.find(TextInput).get(1).props.value).toBe(
    FIELDS_WITH_MULTIPLE.line2,
  )
  expect(wrapper.find(TextInput).get(2).props.value).toBe(
    FIELDS_WITH_MULTIPLE.city.split('\n')[0],
  )
  expect(wrapper.find(TextInput).get(3).props.value).toBe(
    FIELDS_WITH_MULTIPLE.city.split('\n')[1],
  )
  expect(wrapper.find(TextInput).get(4).props.value).toBe(
    FIELDS_WITH_MULTIPLE.stateProvince.split('\n')[0],
  )
  expect(wrapper.find(TextInput).get(5).props.value).toBe(stateProvice2)
})

it("should render right thing and don't change unexpected", () => {
  const tree = renderer
    .create(
      <L10nProvider>
        <AddressEditor
          name="address"
          countriesConfig={countriesConfig}
          value={FIELDS_1}
        />
      </L10nProvider>,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it("should render right thing and don't change unexpected for FIELDS_WITH_NULL", () => {
  const tree = renderer
    .create(
      <L10nProvider>
        <AddressEditor
          name="address"
          countriesConfig={countriesConfig}
          value={FIELDS_WITH_NULL}
        />
      </L10nProvider>,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it('should not render fields if country is not found', () => {
  const wrapper = mount(
    <AddressEditor countriesConfig={countriesConfig} value={UFO_FIELDS} />,
    formMountOptions,
  )

  expect(wrapper.find(Combobox).get(0).props.value).toBe(UFO_FIELDS.country)
  expect(wrapper.find(TextInput).length).toBe(0)
})

it('should Load `countryConfig.json` if not passed as prop', () => {
  const wrapper = mount(
    <L10nProvider>
      <AddressEditor name="address" value={FIELDS_1} />
    </L10nProvider>,
    formMountOptions,
  )

  expect(
    wrapper
      .find('[aria-label]')
      .instance()
      .getAttribute('aria-label'),
  ).toBe('Select one...')
})

it('should re-render when `country` changed and verse visa', () => {
  const wrapper = mount(
    <AddressEditor country="US" value={UFO_FIELDS} />,
    formMountOptions,
  )

  wrapper.setProps({ country: 'UFO' })
  wrapper.setProps({ country: 'UFO' })

  expect(wrapper.props().country).toBe('UFO')
})

it('should show error message when clearing required field', () => {
  const wrapper = mount(
    <AddressEditor countriesConfig={countriesConfig} value={FIELDS_1} />,
    formMountOptions,
  )

  wrapper
    .find('[name="line1"]')
    .last()
    .simulate('change', {
      persist: () => {},
      target: {
        value: '',
      },
    })

  wrapper
    .find('[name="line1"]')
    .last()
    .simulate('blur')

  expect(wrapper.find('.form__group--error').length).toBeGreaterThanOrEqual(1)
})
