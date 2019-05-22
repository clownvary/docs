import React from 'react';

import './Loading.less';
import img from './Loading.gif';

export default function Loading() {
  return React.createElement(
    'div',
    { className: 'loading' },
    React.createElement('img', { alt: '', src: img })
  );
}