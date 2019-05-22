import React from 'react';
import { number, string, object, oneOfType } from 'prop-types';

import injectL10n from './injectL10n';
import { aauiL10nShape } from './types';

function L10nCurrency(_ref) {
  var amount = _ref.amount,
      code = _ref.code,
      format = _ref.format,
      l10n = _ref.l10n;

  return React.createElement(
    'span',
    null,
    l10n.formatCurrency(amount, code, format)
  );
}

L10nCurrency.propTypes = {
  amount: oneOfType([number, string]),
  code: string,
  format: object, // eslint-disable-line
  l10n: aauiL10nShape
};

export default injectL10n()(L10nCurrency);