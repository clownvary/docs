import _extends from 'babel-runtime/helpers/extends';
import React from 'react';

import Viewport from './Viewport';

function HideAt(props) {
  return React.createElement(Viewport, _extends({ not: true }, props));
}

export default HideAt;