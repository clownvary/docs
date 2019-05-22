import PropTypes from 'prop-types';
import React from 'react';

export default class Container extends React.Component {

  static contextTypes = {
    sticky: PropTypes.any
  }

  static childContextTypes = {
    sticky: PropTypes.any
  }

  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      sticky: {
        node: null
      }
    };
  }

  getChildContext() {
    return { sticky: this.state.sticky };
  }

  componentDidMount() {
    this.setStickyContainer(this.node);
  }

  componentWillUnmount() {
    this.setStickyContainer(null);
  }

  setStickyContainer(item) {
    this.state.sticky.node = item;
  }

  render() {
    return (<div {...this.props} ref={(node) => { this.node = node; }}>
      {this.props.children}
    </div>);
  }
}
