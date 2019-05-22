import L10n from 'shared/L10n'
import * as DateTimeSymbols from 'form/config/DateTimeSymbols'

it('should create L10n instance without error', () => {
  const l10n = new L10n()

  expect(l10n).toBeTruthy()
})

it('should has en_US locale by default', () => {
  const l10n = new L10n()

  expect(l10n.locale).toBe('en_US')
})

it('should accept parameters(locale, messages, config)', () => {
  const locale = 'en_US'
  const messages = {
    key: 'value',
  }
  const config = { dateTimeSymbol: DateTimeSymbols[locale] }
  const l10n = new L10n({
    locale,
    messages,
    config,
  })

  expect(l10n.locale).toBe(locale)
  expect(l10n.messages).toMatchObject(messages)
  expect(l10n.config).toMatchObject(config)
})

it('set locale, messages, config', () => {
  const l10n = new L10n()
  const locale = 'en_US'
  const messages = {
    key: 'value',
  }
  const config = { dateTimeSymbol: DateTimeSymbols[locale] }

  l10n.locale = locale
  l10n.messages = messages
  l10n.config = config

  expect(l10n.locale).toBe(locale)
  expect(l10n.messages).toBe(messages)
  expect(l10n.config).toMatchObject(config)
})

it('set DateTimeSymbol according to locale changes', () => {
  const l10n = new L10n()
  const config = { dateTimeSymbol: DateTimeSymbols[l10n.locale] }

  expect(l10n.config).toMatchObject(config)

  l10n.locale = 'zh_CN'

  expect(l10n.config).toMatchObject({
    dateTimeSymbol: DateTimeSymbols[l10n.locale],
  })
})

it('subscribe listener', () => {
  const l10n = new L10n()
  const listener = jest.fn()

  l10n.subscribe(listener)
  l10n.notify()

  expect(listener).toBeCalled()
  expect(listener.mock.calls.length).toBe(1)
})

it('throw error when listener is not function', () => {
  const l10n = new L10n()

  expect(() => {
    l10n.subscribe('')
  }).toThrow()
})

it('throw error when currency code is not defined in config', () => {
  const l10n = new L10n()

  expect(() => {
    l10n.formatCurrency('100', 'WHAT')
  }).toThrow()
})

describe('API', () => {
  it('formatMessage', () => {
    const NOT_FOUND_KEY = 'NOT_FOUND_KEY'
    const defaultValue = 'defaultValue'
    const key = 'key'
    const withInterpolateKey =
      'Invitation from captain {First name} {Last name}'
    const value = 'value'
    const messages = {
      [key]: value,
      [withInterpolateKey]: withInterpolateKey,
    }
    const l10n = new L10n({ messages })

    expect(l10n.formatMessage(key)).toBe(value)
    expect(l10n.formatMessage(NOT_FOUND_KEY, null, defaultValue)).toBe(
      defaultValue,
    )
    expect(
      l10n.formatMessage(withInterpolateKey, {
        'First name': 'first',
        'Last name': 'last',
      }),
    ).toMatchSnapshot()
    expect(l10n.formatMessage(withInterpolateKey, null)).toMatchSnapshot()
  })
})
