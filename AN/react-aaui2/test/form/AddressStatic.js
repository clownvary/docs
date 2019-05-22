import React from 'react'
import { mount } from 'enzyme'

import AddressStatic from 'form/AddressStatic'
import L10n from 'shared/L10n'
import { aauiL10nShape } from 'shared/types'

const address = {
  country: 'United States',
  line1: 'line1',
  line2: 'line2',
  city: 'city',
  stateProvince: 'California',
  postalCode: '11111',
}

const locale = 'en_US'
const aauiL10n = new L10n({ locale })
const context = { aauiL10n }

it('Address should display with default config', () => {
  const wrapper = mount(<AddressStatic address={address} />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  expect(wrapper.find('span').html()).toBe(
    '<span>line1<br>line2<br>city California 11111</span>',
  )
})

it('Address should handle specific locale', () => {
  const wrapper = mount(<AddressStatic address={address} locale="CA" />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  expect(wrapper.find('span').html()).toBe(
    '<span>line1<br>line2<br>city, California<br>11111<br>United States</span>',
  )
})

it('Address should display with handle wrong locale', () => {
  const wrapper = mount(<AddressStatic address={address} locale="MMKK" />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  expect(wrapper.find('span').html()).toBe(
    '<span>line1<br>line2<br>city, California<br>11111<br>United States</span>',
  )
})

it('Address should handle no wrap address', () => {
  const wrapper = mount(<AddressStatic address={address} wrap={false} />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  expect(wrapper.find('span').html()).toBe(
    '<span>line1, line2, city California 11111</span>',
  )
})
