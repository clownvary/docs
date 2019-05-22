import React from 'react';
import { string, instanceOf } from 'prop-types';

import injectL10n from './injectL10n';
import { aauiL10nShape } from './types';

function L10nDateTime(_ref) {
  var date = _ref.date,
      format = _ref.format,
      l10n = _ref.l10n;

  return React.createElement(
    'span',
    null,
    l10n.formatDateTime(date, format)
  );
}

L10nDateTime.propTypes = {
  date: instanceOf(Date),
  format: string,
  l10n: aauiL10nShape
};

export default injectL10n()(L10nDateTime);