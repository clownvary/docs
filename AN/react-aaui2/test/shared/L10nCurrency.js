import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import L10nCurrency from 'shared/L10nCurrency'
import L10n from 'shared/L10n'
import { aauiL10nShape } from 'shared/types'

const locale = 'en_US'
const aauiL10n = new L10n({ locale })
const context = { aauiL10n }

it('LocalizeCurrency should display with default currency code', () => {
  const wrapper = mount(<L10nCurrency amount={100} />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  expect(wrapper.find('span').text()).toBe('$100.00')
})

it('LocalizeCurrency should call subscribe function when mounted and unsubscribe it when unmounted', () => {
  const unsubscribeSpy = sinon.spy()
  const subscribeSpy = sinon.stub(aauiL10n, 'subscribe')

  subscribeSpy.returns(unsubscribeSpy)

  const wrapper = mount(<L10nCurrency />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  wrapper.unmount()

  expect(subscribeSpy.called).toBe(true)
  expect(unsubscribeSpy.called).toBe(true)
})
