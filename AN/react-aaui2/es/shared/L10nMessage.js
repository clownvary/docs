import React from 'react';
import { string, object } from 'prop-types';

import injectL10n from './injectL10n';
import { aauiL10nShape } from './types';

function L10nMessage(_ref) {
  var id = _ref.id,
      values = _ref.values,
      l10n = _ref.l10n;

  return React.createElement(
    'span',
    null,
    l10n.formatMessage(id, values, id)
  );
}

L10nMessage.propTypes = {
  id: string,
  values: object, // eslint-disable-line
  l10n: aauiL10nShape
};

export default injectL10n()(L10nMessage);