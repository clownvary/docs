import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import L10nDateTime from 'shared/L10nDateTime'
import L10n from 'shared/L10n'
import { aauiL10nShape } from 'shared/types'

const date = new Date('2017-05-03 12:00:00')

const locale = 'en_US'
const aauiL10n = new L10n({ locale })
const context = { aauiL10n }

it('L10nDateTime should display without model', () => {
  const wrapper = mount(<L10nDateTime date={date} />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  expect(wrapper.instance().props.date).toBe(date)
})

it('L10nDateTime should call subscribe function when mounted and unsubscribe it when unmounted', () => {
  const unsubscribeSpy = sinon.spy()
  const subscribeSpy = sinon.stub(aauiL10n, 'subscribe')

  subscribeSpy.returns(unsubscribeSpy)

  const wrapper = mount(<L10nDateTime />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  wrapper.unmount()

  expect(subscribeSpy.called).toBe(true)
  expect(unsubscribeSpy.called).toBe(true)
})
