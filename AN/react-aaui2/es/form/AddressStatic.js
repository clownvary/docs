import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import { string, bool, object } from 'prop-types';

import injectL10n from '../shared/injectL10n';
import { addressPropTypes } from './types';
import { aauiL10nShape } from '../shared/types';
import { interpolate } from '../shared/utils';
import { reduceFields } from './utils';

import countryFormatConfig from './config/addressFormat.json';

var DEFAULT_TEMPLET = '{address.line1}\n{address.line2}\n{address.city}, {address.stateProvince}\n{address.postalCode}\n{address.country}';

var AddressStatic = function AddressStatic(_ref) {
  var locale = _ref.locale,
      l10n = _ref.l10n,
      wrap = _ref.wrap,
      nowrap = _ref.nowrap,
      countriesFormatConfig = _ref.countriesFormatConfig,
      rest = _objectWithoutProperties(_ref, ['locale', 'l10n', 'wrap', 'nowrap', 'countriesFormatConfig']);

  var _reduceFields = reduceFields(rest.address),
      address = _reduceFields.values;

  var config = _extends({}, countryFormatConfig, countriesFormatConfig);

  // country maybe from locale in l10n
  var country = (locale || l10n.locale).split('_');
  var template = config[country[1] || country[0]] || DEFAULT_TEMPLET;

  var __html = interpolate(template, { address: address }).split('\n').map(function (field) {
    return field.trim();
  }).filter(function (field) {
    return !!field;
  }).join(wrap && !nowrap ? '<br />' : ', ');

  return React.createElement('span', { dangerouslySetInnerHTML: { __html: __html } });
};

AddressStatic.propTypes = {
  address: addressPropTypes,
  locale: string,
  wrap: bool,
  nowrap: bool,
  l10n: aauiL10nShape,
  countriesFormatConfig: object // eslint-disable-line
};

AddressStatic.defaultProps = {
  wrap: true,
  nowrap: false
};

export default injectL10n()(AddressStatic);