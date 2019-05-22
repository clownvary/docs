import React from 'react'
import { number, string, object, oneOfType } from 'prop-types'

import injectL10n from './injectL10n'
import { aauiL10nShape } from './types'

function L10nCurrency({ amount, code, format, l10n }) {
  return <span>{l10n.formatCurrency(amount, code, format)}</span>
}

L10nCurrency.propTypes = {
  amount: oneOfType([number, string]),
  code: string,
  format: object, // eslint-disable-line
  l10n: aauiL10nShape,
}

export default injectL10n()(L10nCurrency)
