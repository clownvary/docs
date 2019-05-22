import { Component } from 'react';
import PropTypes from 'prop-types';

// Defines sharable prop shapes
export default class Base extends Component {

  static contextTypes = {
    getWording: PropTypes.func
  }

  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      children: PropTypes.node
    }),
    itemStyles: PropTypes.shape({
      navItem: PropTypes.object,
      active: PropTypes.object
    }),
    cartCount: PropTypes.number
  }

  static defaultProps = {};
}

