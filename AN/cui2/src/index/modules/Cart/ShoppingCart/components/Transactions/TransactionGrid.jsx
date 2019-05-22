import React from 'react';
import TransactionRefoundFee from './TransactionRefoundFee';
import TransactionFeeDetail from './TransactionFeeDetail';
import transactionTypes from '../../consts/transactionTypes';

import './transactiongrid.less';

export class TransactionGrid extends React.PureComponent {

  render() {
    const { transaction, hasExpanded } = this.props;
    const {
      transaction_type: transactionType,
      primary_price_grid: primaryPriceGrid,
      activity_enrollment_package: activityEnrollmentPackage,
      activity_transfer_out: activityTransferOut
    } = transaction;

    const isShowRefundFee = (transactionType === transactionTypes.REFUND) ||
    (transactionType === transactionTypes.TRANSFER_IN) || activityTransferOut;

    return (
      <div className="transaction__list">
        { isShowRefundFee ? <TransactionRefoundFee transaction={transaction} /> : null }
        {
          primaryPriceGrid.length || activityEnrollmentPackage.length ?
            <TransactionFeeDetail transaction={transaction} hasExpanded={hasExpanded} /> : null
        }
      </div>
    );
  }
}

export default TransactionGrid;
