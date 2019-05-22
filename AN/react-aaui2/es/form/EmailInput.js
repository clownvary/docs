import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import { string } from 'prop-types';

import TextInput from './TextInput';

var propTypes = { rules: string };
var EmailInput = function EmailInput(props) {
  return React.createElement(TextInput, _extends({ type: 'email' }, props, { rules: props.rules + '|email' }));
};

EmailInput.propTypes = propTypes;
EmailInput.displayName = 'EmailInput';

export default EmailInput;