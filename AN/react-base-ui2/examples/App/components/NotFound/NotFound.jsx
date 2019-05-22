import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="error-page__circle rounded-circle">
        <div className="error-page__icon">
          <svg width="24" height="24" fill="#000" viewBox="0 0 24 24" className="mdi-icon">
            <path d="M11,12H3.5L6,9.5L3.5,7H11V3L12,2L13,3V7H18L20.5,9.5L18,12H13V20C14.1,20 15,20.9 15,22H9C9,20.9 9.9,20 11,20V12Z"></path>
          </svg>
        </div>
      </div>
      <h1>404: Not Found</h1>
      <p>Sorry, the requested URL was not found.</p>
    </div>
  );
}

export default NotFound;
