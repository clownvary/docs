import React from 'react'
import { string, object } from 'prop-types'

import injectL10n from './injectL10n'
import { aauiL10nShape } from './types'

function L10nMessage({ id, values, l10n }) {
  return <span>{l10n.formatMessage(id, values, id)}</span>
}

L10nMessage.propTypes = {
  id: string,
  values: object, // eslint-disable-line
  l10n: aauiL10nShape,
}

export default injectL10n()(L10nMessage)
