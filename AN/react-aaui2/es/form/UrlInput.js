import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import { string } from 'prop-types';

import TextInput from './TextInput';

var propTypes = { rules: string };
var UrlInput = function UrlInput(props) {
  return React.createElement(TextInput, _extends({ type: 'url' }, props, { rules: props.rules + '|url' }));
};

UrlInput.propTypes = propTypes;
UrlInput.displayName = 'UrlInput';

export default UrlInput;