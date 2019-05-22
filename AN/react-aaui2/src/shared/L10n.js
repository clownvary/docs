import createListenerCollection from './createListenerCollection'
import * as DateTimeSymbols from '../form/config/DateTimeSymbols'
import * as currenciesConfig from '../form/config/currenciesConfig'
import { interpolate } from './utils'
import dateTimeParser from './dateTimeParser'
import dateTimeFormatter from './dateTimeFormatter'
import currencyFormatter from './currencyFormatter'
import DEFAULT_MESSAGES from '../../i18n/en_US.json'

export const defaultValidationMsgKeys = {
  required: 'react-aaui.validation.required',
  limit: 'react-aaui.validation.limitation',
  max: 'react-aaui.validation.max',
  min: 'react-aaui.validation.min',
  invalid: 'react-aaui.validation.invalid',
}
const DEFAULT_LOCALE = 'en_US'
const DEFAULT_CURRENCY_CODE = 'USD'

export default class L10n {
  constructor({ locale = DEFAULT_LOCALE, messages = {}, config = {} } = {}) {
    this._locale = locale
    this._messages = { ...DEFAULT_MESSAGES, ...messages }
    this._config = {
      dateTimeSymbol: DateTimeSymbols[DEFAULT_LOCALE],
      currenciesConfig,
      ...config,
    }
    this.initDefaultMsg()
    this.listeners = createListenerCollection()
  }

  get locale() {
    return this._locale
  }

  set locale(value) {
    this._locale = value
    this._config.dateTimeSymbol = DateTimeSymbols[this._locale]

    this.notify()
  }

  get messages() {
    return this._messages
  }

  set messages(value) {
    this._messages = value
    this.notify()
  }

  get config() {
    return this._config
  }

  set config(value) {
    this._config = value
  }

  initDefaultMsg() {
    Object.keys(defaultValidationMsgKeys).forEach(k => {
      this[k] = defaultValidationMsgKeys[k]
    })
  }

  notify() {
    this.listeners.notify()
  }

  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    return this.listeners.subscribe(listener)
  }

  formatMessage(id, values, defaultMessage = '') {
    const message = this.messages[id]

    if (message) {
      if (values) {
        return interpolate(message, values)
      }

      return message
    }

    return defaultMessage
  }

  formatDateTime(date, format = '') {
    const dateFormatter = dateTimeFormatter(this.config.dateTimeSymbol)
    const template = this.config.dateTimeSymbol.FORMAT[format] || format

    return dateFormatter(template, date)
  }

  parseDateTime(value, format) {
    const dateParser = dateTimeParser(this.config.dateTimeSymbol)
    const template = this.config.dateTimeSymbol.FORMAT[format] || format

    return dateParser(value, template)
  }

  formatCurrency(amount, code = DEFAULT_CURRENCY_CODE, format = {}) {
    const currencyConfig = this.config.currenciesConfig[code]
    if (!currencyConfig) {
      throw Error(`Unable to identify currency code: "${code}"`)
    }

    const { formatConfig, getLocalizeTemplate } = currencyConfig
    const config = {
      template: getLocalizeTemplate(this.locale),
      ...formatConfig,
      ...format,
    }

    return currencyFormatter(amount, config)
  }
}
