import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Pinpad from './pinpad';

import PinpadTransactionFail from '../PinpadTransactionFail';

export default class SinglePay extends UIComponent {

  render() {
    const { pay, pinpad } = this.props;

    return (
      <Pinpad pay={pay} pinpad={pinpad}>
        <PinpadTransactionFail
          pinpad={pinpad}
        />
      </Pinpad>
    );
  }
}
