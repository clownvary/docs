import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import { string } from 'prop-types';

import TextInput from './TextInput';

var propTypes = { rules: string };
var NumericInput = function NumericInput(props) {
  return React.createElement(TextInput, _extends({ type: 'number' }, props, { rules: props.rules + '|number' }));
};

NumericInput.propTypes = propTypes;
NumericInput.displayName = 'NumericInput';

export default NumericInput;