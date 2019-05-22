import React from 'react';
import radium from 'radium';
import PropTypes from 'prop-types';

/**
 * The color of this line needs to follow the five themes.
 */
export class SeparationLine extends React.PureComponent {

  static contextTypes = {
    theme: PropTypes.shape(
      {
        name: PropTypes.string,
        customizedColors: PropTypes.object
      }
    )
  }

  render() {
    return (
      <div className="an-footer__separation-line" />
    );
  }

}

export default radium(SeparationLine);
