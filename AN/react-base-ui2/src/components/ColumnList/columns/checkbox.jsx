import React from 'react';
import Checkbox from '../../Checkbox';

export default function render(value, props) {
  return <Checkbox {...props} checked={value} />;
}
