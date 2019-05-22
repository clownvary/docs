import React from 'react';
import classNames from 'classnames';

export default function render(value, props) {
  return <i {...props} className={classNames(props.className, value)} />;
}
