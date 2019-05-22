import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default class WCAGHiddenLabel extends React.PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired
  }

  static defaultProps = {
    value: 'wcag_hidden_label_value'
  }

  render() {
    return (
      <span className="an-hide-wcag-label">
      {this.props.value}
      </span>
    )
  }
}
