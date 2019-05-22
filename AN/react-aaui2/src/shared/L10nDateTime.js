import React from 'react'
import { string, instanceOf } from 'prop-types'

import injectL10n from './injectL10n'
import { aauiL10nShape } from './types'

function L10nDateTime({ date, format, l10n }) {
  return <span>{l10n.formatDateTime(date, format)}</span>
}

L10nDateTime.propTypes = {
  date: instanceOf(Date),
  format: string,
  l10n: aauiL10nShape,
}

export default injectL10n()(L10nDateTime)
