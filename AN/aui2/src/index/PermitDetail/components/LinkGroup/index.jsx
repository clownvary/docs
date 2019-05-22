import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import RunningCart from 'shared/components/RunningCart';

export default class LinkGroup extends UIComponent {

  render() {
    const {
      batchID,
      receiptID,
      receiptEntryID
    } = this.props.initialData;

    return (
      <div>
        <RunningCart
          batchID={batchID}
          receiptID={receiptID}
          receiptEntryID={receiptEntryID}
          runningCart={this.props.runningCart}
          disabled={this.props.disableRunningCart}
        />
      </div>
    );
  }
}
