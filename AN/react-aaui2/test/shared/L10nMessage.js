import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import L10nMessage from 'shared/L10nMessage'
import L10n from 'shared/L10n'
import { aauiL10nShape } from 'shared/types'

const locale = 'en-US'
const messages = { a: '1' }

const aauiL10n = new L10n({
  locale,
  messages,
})
const context = {
  aauiL10n,
}

it('L10nMessage should display right message according to id property', () => {
  const wrapper = mount(<L10nMessage id="a" />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  expect(
    wrapper.context('aauiL10n').messages[wrapper.instance().props.id],
  ).toBe('1')
})

it('L10nMessage should call subscribe function when mounted and unsubscribe it when unmounted', () => {
  const unsubscribeSpy = sinon.spy()
  const subscribeSpy = sinon.stub(aauiL10n, 'subscribe')

  subscribeSpy.returns(unsubscribeSpy)

  const wrapper = mount(<L10nMessage id="a" />, {
    context,
    childContextTypes: { aauiL10n: aauiL10nShape },
  })

  wrapper.unmount()

  expect(subscribeSpy.called).toBe(true)
  expect(unsubscribeSpy.called).toBe(true)
})
