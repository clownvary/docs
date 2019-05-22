import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSpecialHandlingInfo } from 'shared/actions/specialHandling';

import './SpecialHandlingIcon.less';

export class SpecialHandlingIcon extends Component {
  render() {
    const { customerId } = this.props;
    return (
      <i
        className="icon icon-exclamation-triangle special-handling-alert__icon"
        onClick={() => this.props.fetchSpecialHandlingInfo(customerId)}
      />
    );
  }
}

export default connect(
  null,
  {
    fetchSpecialHandlingInfo
  }
)(SpecialHandlingIcon);
