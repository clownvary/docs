import PropTypes from 'prop-types';
import React from 'react';

import './index.less';

const IntroArrow = ({ className }) => (
  <div className={`intro-arrow ${className || ''}`}>
    <div className="intro-arrow-line-wrapper">
      <div className="intro-arrow-line" />
    </div>
  </div>
);

IntroArrow.propTypes = {
  className: PropTypes.string
};

export default IntroArrow;
