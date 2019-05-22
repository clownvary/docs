import React from 'react';
import UIComponent from 'shared/components/UIComponent';

export default class PayTitle extends UIComponent {

  render() {
    const { paymentTypeName, amount, headerHtml } = this.props.pay;

    return (
      <div className="payment-pinpad-header">
        <span>{paymentTypeName}</span>
        <span>$ {amount}</span>
        <div>{headerHtml || ''}</div>
      </div>
    );
  }
}
