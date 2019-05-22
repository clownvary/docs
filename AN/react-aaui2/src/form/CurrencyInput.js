import React, { PureComponent } from 'react'

import connectForm from './connectForm'
import Input from '../Input'
import { omit, noop } from '../shared/utils'
import { FormFieldAPIPropTypes } from './types'
import KEY_CODES from '../shared/keyCodes'

const isNumber = keyCode =>
  (keyCode >= KEY_CODES.NUMBER0 && keyCode <= KEY_CODES.NUMBER9) ||
  (keyCode >= KEY_CODES.NUMBERPAD0 && keyCode <= KEY_CODES.NUMBERPAD9)

const isDash = keyCode =>
  keyCode === KEY_CODES.DASH || keyCode === KEY_CODES.SUBTRACT

const isDecimalPoint = keyCode =>
  keyCode === KEY_CODES.PERIOD || keyCode === KEY_CODES.DECIMAL_POINT

const getCaret = element => {
  /* istanbul ignore else */
  if (element.selectionStart) {
    return element.selectionStart
  } else if (document.selection) {
    // IE-specific
    element.focus()

    const r = document.selection.createRange()
    if (r == null) {
      return 0
    }

    const re = element.createTextRange()
    const rc = re.duplicate()

    re.moveToBookmark(r.getBookmark())
    rc.setEndPoint('EndToStart', re)
    return rc.text.length
  }

  return 0
}

class CurrencyInput extends PureComponent {
  static displayName = 'CurrencyInput'

  static propTypes = { ...FormFieldAPIPropTypes }

  static defaultProps = {
    defaultValue: '',
    code: 'USD',
    onChange: noop,
    onBlur: noop,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: 'value' in props ? props.value : props.defaultValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  handleBlur = e => {
    const { api: { setValue, onValidate }, onBlur } = this.props
    const value = parseFloat(e.target.value)

    setValue(value)
    onValidate(value)
    onBlur(e)
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
    })

    this.props.onChange(e)
  }

  handleKeyDown = e => {
    const { l10n, code } = this.props
    const { formatConfig: { integerOnly } } = l10n.config.currenciesConfig[code]
    const { keyCode, target, target: { value } } = e

    // Numerical inputs plus decimal and minus.
    if (isNumber(keyCode) || isDecimalPoint(keyCode) || isDash(keyCode)) {
      // Disallow decimal point when `integerOnly`
      if (integerOnly && isDecimalPoint(keyCode)) {
        e.preventDefault()

        return
      }

      if (isDecimalPoint(keyCode)) {
        // Disallows a period before a negative
        if (getCaret(target) === 0 && value.indexOf('-') === 0) {
          e.preventDefault()

          return
        }
        // Disallows more than one decimal point
        if (value.match(/\./)) {
          e.preventDefault()
        }
      } else if (isDash(keyCode)) {
        // Disallows a dash in any other places in addition to the first character
        // negative number
        if (value.indexOf('-') === 0) {
          e.preventDefault()

          return
        }

        // positive number
        if (getCaret(target) !== 0) {
          e.preventDefault()
        }
      } else if (value.indexOf('-') === 0 && getCaret(target) === 0) {
        // Disallows numbers before a negative.
        e.preventDefault()
      }
    }
  }

  render() {
    const { code, ...rest } = this.props

    return (
      <Input
        type="text"
        postText={code}
        {...omit(rest, ['api', 'rules', 'l10n', 'value'])}
        value={this.state.value}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}

const formatter = (value, { l10n, code = 'USD' }) => {
  let formattedValue = ''
  const { formatConfig: { integerOnly } } = l10n.config.currenciesConfig[code]

  if (value && !isNaN(value)) {
    const parseValue = parseFloat(value)

    formattedValue = integerOnly ? parseValue.toFixed() : parseValue.toFixed(2)
  }

  return formattedValue
}

export default connectForm({
  formatter,
})(CurrencyInput)
