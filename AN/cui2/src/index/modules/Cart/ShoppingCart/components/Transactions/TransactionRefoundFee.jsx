import React from 'react';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import selfMessages from './translations';
import transactionTypes from '../../consts/transactionTypes';

import './transactiongrid.less';

export class TransactionRefoundFee extends React.PureComponent {

  render() {
    const { transaction, intl: { messages }, responsive } = this.props;
    const {
      amount,
      transaction_type: transactionType,
      final_refund: finalRefund,
      you_refund: refund,
      activity_transfer_out: activityTransferOut,
      refund_fee_summary_grid: refundFeeSummaryGrid
    } = transaction;
    const refundPriceGrid = activityTransferOut ? activityTransferOut.refund_fee_summary_grid
     : refundFeeSummaryGrid;

    const subTotal = activityTransferOut ? activityTransferOut.amount : amount;
    const refundAmount = activityTransferOut ? activityTransferOut.you_refund : refund;
    const finalRefundAmount = activityTransferOut ? activityTransferOut.final_refund
      : finalRefund;
    const refundFee = activityTransferOut ? activityTransferOut.refund_fee : transaction.refund_fee;

    return (
      <div>
        {
          transactionType === transactionTypes.TRANSFER_IN || activityTransferOut ?
            <div className="transaction__title">
              <FormattedMessage {...selfMessages.transferOutfrom} />
              {' '}
              <FormattedDyncMessage value={activityTransferOut.description} />
            </div> : null
        }
        { /* Primary price grid */}
        {
          refundPriceGrid.length ?
            <table className={classNames('an-simple-table', { 'an-sm-simple-table': responsive.isSm })}>
              <thead>
                <tr>
                  <td>
                    <FormattedMessage {...selfMessages.originalPayer} />
                  </td>
                  <td>
                    <FormattedMessage {...selfMessages.refundTo} />
                  </td>
                  <td>
                    <FormattedMessage {...selfMessages.amount} />
                  </td>
                </tr>
              </thead>
              <tbody>
                {
              refundPriceGrid.map((item, index) => (item ? (
                <tr key={index}>
                  <td data-label={messages[selfMessages.originalPayer.id]}>
                    <FormattedDyncMessage value={item.payer_name} />
                  </td>
                  <td data-label={messages[selfMessages.refundTo.id]}>
                    <FormattedDyncMessage value={item.pay_to} />
                  </td>
                  <td data-label={messages[selfMessages.amount.id]}>
                    <FormattedNumber numberStyle="currency" currency="USD" value={item.amount} />
                  </td>
                </tr>
              ) : null))
            }
              </tbody>
            </table>
          : null
        }
        { /* Primary price summary */}
        <div className="transaction__gather u-bg-color--light-neutral">
          <b><FormattedMessage {...orderSummaryMessages.subtotal} /></b>
          <FormattedNumber numberStyle="currency" currency="USD" value={subTotal} />
        </div>
        { refundAmount ?
          <div className="transaction__gather transaction__gather-others u-bg-color--dark-accent ">
            <b><FormattedMessage {...selfMessages.yourRefund} /></b>
            <FormattedNumber numberStyle="currency" currency="USD" value={refundAmount} />
          </div> : null }
        { refundFee ?
          <div className="transaction__gather transaction__gather-others u-bg-color--dark-accent">
            <b>
              {
                transactionType === transactionTypes.TRANSFER_IN ?
                  <FormattedMessage {...selfMessages.transferFee} /> :
                  <FormattedMessage {...selfMessages.refundFee} />
              }
            </b>
            <FormattedNumber numberStyle="currency" currency="USD" value={refundFee} />
          </div> : null }
        <div className="transaction__gather transaction__gather-others u-bg-color--dark-accent">
          <b>
            {
              finalRefundAmount <= 0 ? <FormattedMessage {...selfMessages.finalRefundtoYou} /> :
              <FormattedMessage {...selfMessages.youNeedtoPay} />
            }
          </b>
          <FormattedNumber numberStyle="currency" currency="USD" value={finalRefundAmount} />
        </div>
      </div>
    );
  }
}

export default injectIntl(withResponsiveProvider(TransactionRefoundFee));
