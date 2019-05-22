import React from 'react';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import classNames from 'classnames';
import selfMessages from './translations';
import transactionTypes from '../../consts/transactionTypes';

import './transactiongrid.less';

export class TransactionFeeDetail extends React.PureComponent {

  static contextTypes = {
    getWording: React.PropTypes.func
  }

  render() {
    const { getWording } = this.context;
    const { transaction, hasExpanded, intl: { messages }, responsive } = this.props;
    const {
      amount,
      taxes,
      description,
      transaction_type: transactionType,
      primary_price_grid: primaryPriceGrid,
      deferred_amount: deferredAmount,
      due_now: dueNow,
      activity_enrollment_package: activityEnrollmentPackage,
      amount_include_tax: amountIncludeTax,
      primary_enrollee_sub_total: subtotalPerParticipant,
      transaction_qty: seatAmount,
      activity_transfer_out: activityTransferOut,
      refund_prior_enrollment: refundPriorEnrollment
    } = transaction;

    const packageActivity = activityEnrollmentPackage;
    if (transactionType === transactionTypes.ACTIVITY_ENROLLMENT_PACKAGE
      && hasExpanded && activityEnrollmentPackage.length) {
      transaction.item_name = messages[selfMessages.packageRelated.id];
      packageActivity.push(transaction);
    }
    const datas = activityEnrollmentPackage.length ? packageActivity :
    [{ primary_price_grid: primaryPriceGrid,
      deferred_amount: deferredAmount,
      due_now: dueNow,
      transaction_type: transactionType,
      amount,
      taxes }];

    return (
      <div>
        {
          transactionType === transactionTypes.ACTIVITY_ENROLLMENT_PACKAGE && activityTransferOut ?
            <div className="transaction__title">
              <FormattedMessage {...selfMessages.transferTo} />
              {' '}
              <FormattedDyncMessage value={description} />
            </div> : null
        }
        {
          datas.map((data, i) => {
            const {
              amount: amountValue,
              taxes: taxesValue,
              primary_price_grid: priceGrid,
              deferred_amount: deferredAmountValue,
              due_now: dueNowValue
            } = data;

            const isSubTransactionFree = amountValue === 0 && priceGrid.length === 0 &&
            transactionType === transactionTypes.ACTIVITY_ENROLLMENT_PACKAGE;

            return (priceGrid.length || isSubTransactionFree ?
              <div key={`feeTable-${i}`}>
                {
                  transactionType !== transactionTypes.ACTIVITY_ENROLLMENT_PACKAGE
                  && data.description ? <div className="transaction__title"><FormattedDyncMessage value={data.description} /></div> : null
                }

                {
                  transactionType === transactionTypes.ACTIVITY_ENROLLMENT_PACKAGE
                  && activityEnrollmentPackage.length && data.item_name ? <div className="transaction__title"><FormattedDyncMessage value={data.item_name} /></div> : null
                }

                {
                  transactionType === transactionTypes.TRANSFER_IN ?
                    <div className="transaction__title">
                      <FormattedMessage {...selfMessages.transferTo} />
                      {' '}
                      <FormattedDyncMessage value={description} />
                    </div> : null
                }
                { /* Primary price grid */}
                { priceGrid.length ?
                  <table className={classNames('an-simple-table', 'fee-detail-table', { 'an-sm-simple-table': responsive.isSm })} >
                    <thead>
                      <tr>
                        <td>
                          <FormattedMessage {...selfMessages.tableThDescription} />
                        </td>
                        <td>
                          <FormattedMessage {...selfMessages.tableThQty} />
                        </td>
                        <td>
                          <FormattedMessage {...selfMessages.tableThUnitFee} />
                        </td>
                        <td>
                          <FormattedMessage {...selfMessages.tableThAmount} />
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        priceGrid.map((item, index) => (item ? (
                          <tr key={index}>
                            <td data-label={messages[selfMessages.tableThDescription.id]}>
                              <FormattedDyncMessage value={item.description} />
                            </td>
                            <td data-label={messages[selfMessages.tableThQty.id]}>
                              <FormattedDyncMessage value={item.qty} />
                            </td>
                            <td data-label={messages[selfMessages.tableThUnitFee.id]}>
                              { item.is_percentage_discount ?
                                <FormattedNumber numberStyle="percent" value={item.discount_percent} /> :
                                <FormattedNumber numberStyle="currency" currency="USD" value={item.unit_price} /> }
                            </td>
                            <td data-label={messages[selfMessages.tableThAmount.id]}>
                              <FormattedNumber numberStyle="currency" currency="USD" value={item.price} />
                            </td>
                          </tr>
                      ) : null))
                    }
                    </tbody>
                  </table> : null
                }
                { /* Primary price summary */}
                {

                  (transactionType === transactionTypes.ACTIVITY_ENROLLMENT_TEAM_GROUP)
                   && seatAmount > 1 ?
                     <div>
                       <div className="transaction__gather u-bg-color--light-neutral">
                         <b><FormattedMessage {...selfMessages.subtotalPerParticipant} /></b>
                         <FormattedNumber numberStyle="currency" currency="USD" value={subtotalPerParticipant} />
                       </div>
                       <div className="transaction__gather u-bg-color--light-neutral">
                         <b><FormattedMessage {...selfMessages.seatAmount} /></b>
                         <FormattedDyncMessage value={seatAmount} />
                       </div>
                     </div> : null
                }
                {
                  refundPriorEnrollment < 0 ?
                    <div className="transaction__gather u-bg-color--light-neutral">
                      <b><FormattedMessage {...selfMessages.refundPriorEnrollment} /></b>
                      <FormattedNumber numberStyle="currency" currency="USD" value={refundPriorEnrollment} />
                    </div> : null
                }
                {
                  isSubTransactionFree ?
                    <div className="transaction__gather transaction__no_charges u-bg-color--light-neutral">
                      <FormattedMessage {...selfMessages.noCharges} />
                    </div> :
                    <div className="transaction__gather u-bg-color--light-neutral">
                      <b><FormattedMessage {...orderSummaryMessages.subtotal} /></b>
                      <FormattedNumber numberStyle="currency" currency="USD" value={amountValue} />
                    </div>
                }
                { taxesValue ?
                  <div className="transaction__gather u-bg-color--light-neutral">
                    <b><FormattedMessage {...orderSummaryMessages.taxes} /></b>
                    <FormattedNumber numberStyle="currency" currency="USD" value={taxesValue} />
                  </div> : null }
                { data.transaction_type === transactionTypes.ACTIVITY_ENROLLMENT_PACKAGE ?
                  <div className="transaction__gather transaction__package_amount u-bg-color--light-neutral">
                    <b><FormattedMessage {...selfMessages.subtotalForPackage} /></b>
                    <FormattedNumber numberStyle="currency" currency="USD" value={amountIncludeTax} />
                  </div> : null }
                { deferredAmountValue !== 0 ?
                  <div className="transaction__gather transaction__gather-others u-bg-color--dark-accent">
                    <b><FormattedMessage {...orderSummaryMessages.deferredToPaymentPlan} values={{ payment_plan_label: getWording('payment_plan_label') }} /></b>
                    <FormattedNumber numberStyle="currency" currency="USD" value={deferredAmountValue} />
                  </div> : null }
                { deferredAmountValue !== 0 ?
                  <div className="transaction__gather transaction__gather-others u-bg-color--dark-accent">
                    <b><FormattedMessage {...orderSummaryMessages.dueNow} /></b>
                    <FormattedNumber numberStyle="currency" currency="USD" value={dueNowValue} />
                  </div> : null }
              </div>
             : null);
          })
        }
      </div>
    );
  }
}

export default injectIntl(withResponsiveProvider(TransactionFeeDetail));
