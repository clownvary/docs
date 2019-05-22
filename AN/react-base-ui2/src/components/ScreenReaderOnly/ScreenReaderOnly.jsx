import React from 'react';
import classNames from 'classnames';

const ScreenReaderOnly = ({ id, children, className }) =>
(
  <div
    id={id}
    className={
      classNames('u-screen-reader-only', className)
    }
  >
    {children}
  </div>
);

export default ScreenReaderOnly;
