import React from 'react';
import queryString from 'query-string';
import find from 'lodash/find';
import Alert from 'react-base-ui/lib/components/Alert';
import { messages } from 'shared/consts';

import UIComponent from '../UIComponent';

export default class Messager extends UIComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDisplay: true
    };
  }

  render() {
    const qs = queryString.parse(location.search);
    const messageCode = parseInt(qs[messages.messageKey] || -1, 10);
    const objMsg = messageCode > 0 ?
      find(messages.reservationDetails, msg => msg.code === messageCode)
      : null;

    return (
      objMsg && this.state.isDisplay ?
        <div>
          <Alert type={objMsg.type} onClose={() => this.setState({ isDisplay: false })}>
            {objMsg.value}
          </Alert>
          <br />
        </div>
        : null
    );
  }
}
