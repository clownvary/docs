import React from 'react';
import classNames from 'classnames';

export default function render(value, props) {
  return <span {...props} className={classNames(props.className, 'text')}>{value}</span>;
}
