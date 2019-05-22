import React, { Component } from 'react';

// Defines sharable prop shapes
export default class Base extends Component {

  static contextTypes = {
    getWording: React.PropTypes.func
  }

  static propTypes = {
    item: React.PropTypes.shape({
      title: React.PropTypes.string,
      url: React.PropTypes.string,
      children: React.PropTypes.node
    }),
    itemStyles: React.PropTypes.shape({
      navItem: React.PropTypes.object,
      active: React.PropTypes.object
    }),
    cartCount: React.PropTypes.number
  }

  static defaultProps = {};
}

