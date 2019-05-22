import React from 'react';

export default placeHolder => (
  <div className="icon-loader">
    <div className="icon-loader__icon">
      <i className="icon icon-loading-m icon-spin" />
      <div className="icon-loader__text">{placeHolder}...</div>
    </div>
  </div>
);
