/* eslint react/forbid-prop-types: off */

import React from 'react';
import Program from './Program';
import EnrollForm from './EnrollForm';
import { routes } from './routes';

export {
  Program,
  EnrollForm,
  routes
};

class Daycare extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  static defaultProps = {};

  render() {
    return (
      <div className="an-module-container">
        {this.props.children}
      </div>
    );
  }
}

export default Daycare;
