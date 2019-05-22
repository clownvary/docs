import React from 'react';

export default placeHolder => (
  <div className="text-loader">
    <span className="text-loader__text">{placeHolder}</span>
    <span className="text-loader__dot">.</span>
    <span className="text-loader__dot">.</span>
    <span className="text-loader__dot">.</span>
  </div>
);
