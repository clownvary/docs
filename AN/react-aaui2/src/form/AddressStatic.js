import React from 'react'
import { string, bool, object } from 'prop-types'

import injectL10n from '../shared/injectL10n'
import { addressPropTypes } from './types'
import { aauiL10nShape } from '../shared/types'
import { interpolate } from '../shared/utils'
import { reduceFields } from './utils'

import countryFormatConfig from './config/addressFormat.json'

const DEFAULT_TEMPLET =
  '{address.line1}\n{address.line2}\n{address.city}, {address.stateProvince}\n{address.postalCode}\n{address.country}'

const AddressStatic = ({
  locale,
  l10n,
  wrap,
  nowrap,
  countriesFormatConfig,
  ...rest
}) => {
  const { values: address } = reduceFields(rest.address)

  const config = {
    ...countryFormatConfig,
    ...countriesFormatConfig,
  }

  // country maybe from locale in l10n
  const country = (locale || l10n.locale).split('_')
  const template = config[country[1] || country[0]] || DEFAULT_TEMPLET

  const __html = interpolate(template, { address })
    .split('\n')
    .map(field => field.trim())
    .filter(field => !!field)
    .join(wrap && !nowrap ? '<br />' : ', ')

  return <span dangerouslySetInnerHTML={{ __html }} />
}

AddressStatic.propTypes = {
  address: addressPropTypes,
  locale: string,
  wrap: bool,
  nowrap: bool,
  l10n: aauiL10nShape,
  countriesFormatConfig: object, // eslint-disable-line
}

AddressStatic.defaultProps = {
  wrap: true,
  nowrap: false,
}

export default injectL10n()(AddressStatic)
