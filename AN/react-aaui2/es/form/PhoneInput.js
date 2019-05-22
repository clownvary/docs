import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import { string } from 'prop-types';

import TextInput from './TextInput';

var propTypes = { rules: string };
var PhoneInput = function PhoneInput(props) {
  return React.createElement(TextInput, _extends({ type: 'phone' }, props, { rules: props.rules + '|phone' }));
};

PhoneInput.propTypes = propTypes;
PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;