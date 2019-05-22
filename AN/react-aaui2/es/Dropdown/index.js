import React from 'react';
import Dropdown from './Dropdown';
import NativeSelect from './NativeSelect';
import { ShowAt, HideAt } from '../viewport';

var Select = function Select(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ShowAt,
      { smAndAbove: true },
      React.createElement(Dropdown, props)
    ),
    React.createElement(
      HideAt,
      { smAndAbove: true },
      React.createElement(NativeSelect, props)
    )
  );
};

export { Select };
export default Dropdown;