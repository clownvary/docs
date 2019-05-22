import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import Label from 'react-base-ui/lib/components/Label';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { formatI18n } from 'shared/translation/formatI18n';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import TransactionGrid from './TransactionGrid';
import PaymentPlanDetail from './PaymentPlanDetail';
import selfMessages from './translations';

import transactionLabelTypes from '../../consts/transactionLabelTypes';
import transactionTypes from '../../consts/transactionTypes';
import { enablePaymentPlanAction } from '../../actions/transactions';

import './transactions.less';
/* eslint-disable no-script-url */
/* eslint-disable max-len */
export class Transaction extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object,
    getWording: React.PropTypes.func
  }

  static getTrasactionType = (configurations, id, messages, activityTransferOut) => {
    const typeKey = transactionLabelTypes[id];
    let type = configurations.get(typeKey) || typeKey;

    transactionTypes.TRANSFER_IN === id && (type = `${type} ${messages[selfMessages.transferLabel.id]}`);
    transactionTypes.REFUND === id && (type = `${type} ${messages[selfMessages.withdrawalLabel.id]}`);
    transactionTypes.ACTIVITY_ENROLLMENT_PACKAGE === id && activityTransferOut && (type = `${type} ${messages[selfMessages.transferLabel.id]}`);

    return type;
  };

  onChange = (e) => {
    const { transaction: { reno } } = this.props;
    this.props.enablePaymentPlanAction(reno, e.target.checked);
  }

  render() {
    const { configurations, getWording } = this.context;
    const { isLastOne,
            transaction,
            showDeleteTransactionAlert,
            isNameUnspecified,
            expandedStatus,
            hasExpandedStatus,
            paymentPlan,
            intl: { messages } } = this.props;
    const {
      reno,
      description,
      item_id: itemId,
      transaction_type: transactionType,
      detail_url: detailUrl,
      amount_include_tax: amountIncludeTax,
      item_descriptions: itemDescriptions,
      primary_price_grid: primaryPriceGrid,
      transaction_url: transactionUrl,
      online_entry_completed: onlineEntryCompleted,
      has_payment_plan: hasPaymentPlan,
      check_payment_plan: checkPaymentPlan,
      show_payment_plan: showPaymentPlan,
      is_recurring: isRecurring,
      activity_enrollment_package: activityEnrollmentPackage,
      activity_transfer_out: activityTransferOut,
      refund_fee_summary_grid: refundFeeSummaryGrid,
      refund_fee: refundFee,
      receipt_entry_identity: receiptEntryIdentity,
      original_amount: originalAmount
    } = transaction;

    const refundPriceGrid = activityTransferOut ? activityTransferOut.refund_fee_summary_grid : refundFeeSummaryGrid;
    const transferFee = activityTransferOut ? activityTransferOut.refund_fee : refundFee;
    const transType = this.constructor.getTrasactionType(configurations, transactionType, messages, activityTransferOut);
    const haveLabel = !onlineEntryCompleted || hasPaymentPlan || isRecurring;
    const isSubtansactionsHasPrimaryFee = activityEnrollmentPackage.some(transacions => transacions.primary_price_grid.length);
    const expandable = primaryPriceGrid.length || isSubtansactionsHasPrimaryFee || (refundPriceGrid.length || transferFee);

    const descriptionValue = activityTransferOut ? activityTransferOut.description : description;
    const detailUrlValue = activityTransferOut ? activityTransferOut.detail_url : detailUrl;
    const transferTo = activityTransferOut ? description : '';

    return (
      <div>
        <div className="transaction">
          { /* header part */ }
          <div className="an-grid transaction-header">
            <h3 className="an-col an-col-grow-1">
              {
                detailUrlValue ?
                  <a href={detailUrlValue}>
                    <FormattedDyncMessage value={descriptionValue} />
                  </a> : <FormattedDyncMessage value={descriptionValue} />
              }
            </h3>
            <h3 className="an-col">
              {
                expandable ?
                  <div>
                    <a
                      onClick={debounce(() => this.props.toggleTransactionExpandStatus(receiptEntryIdentity), 100)}
                      className="transaction-header__collapse"
                      href="javascript:void(0);"
                      aria-expanded={expandedStatus[receiptEntryIdentity]}
                    >
                      <FormattedNumber numberStyle="currency" currency="USD" value={amountIncludeTax} />
                      <div className="trans-collapse-arrow">
                        <Icon
                          type="link"
                          name={`chevron-${expandedStatus[receiptEntryIdentity] ? 'up' : 'down'}`}
                          aria-label={`chevron ${expandedStatus[receiptEntryIdentity] ? 'up icon' : 'down icon'}`}
                        />
                      </div>
                    </a>
                    {
                      originalAmount !== amountIncludeTax && !expandedStatus[receiptEntryIdentity] ?
                        <p className="coupon-amount">
                          <FormattedNumber numberStyle="currency" currency="USD" value={originalAmount} />
                        </p> : null
                    }
                  </div>
                  :
                  <span>
                    <FormattedNumber numberStyle="currency" currency="USD" value={amountIncludeTax} />
                  </span>
              }
            </h3>
          </div>
          {
            transferTo ?
              <div className="transaction-header">
                <div>
                  <Icon
                    name="arrow-down"
                    className="transaction-header__icon-wrapper"
                    aria-label="transfer to icon"
                  />
                </div>
                <h3>
                  {
                    detailUrl ?
                      <a href={detailUrl}>
                        <FormattedDyncMessage value={transferTo} />
                      </a> : <FormattedDyncMessage value={transferTo} />
                  }
                </h3>
              </div> : null
          }
          { /* body part */
            expandable && expandedStatus[receiptEntryIdentity] ?
              <div className="transaction-body">
                <TransactionGrid transaction={transaction} hasExpanded={hasExpandedStatus[receiptEntryIdentity]} />
              </div> : null
          }
          { /* footer part */ }
          <div className="an-col-1-1 transaction-footer">
            <div className="transaction-footer__detail">
              <div className="u-color-secondarytext">
                <FormattedDyncMessage value={transType} />
              </div>
              {
                itemDescriptions && itemDescriptions.length > 0 ?
                  <div>
                    {
                      itemDescriptions.map((item, index) => (
                        <div key={index}>
                          <FormattedDyncMessage value={`${item.key}${item.value ? `: ${item.value}` : ''}`} />
                        </div>
                      ))
                    }
                  </div> : null
              }
              {
                isNameUnspecified && transactionTypes.GIFT_CERTIFICATE === transactionType ?
                  <div className="transaction-footer__name-unspecified u-color-warningtext">
                    <Icon name="info-circle" type="warning" />
                    <span><FormattedMessage {...selfMessages.noPurchaser} /></span>
                  </div> : null
              }
            </div>
            {
              showPaymentPlan ?
                <div className="an-col-1-1">
                  <Checkbox
                    aria-label={formatI18n(messages[selfMessages.usePaymentPlan.id], { payment_plan_label: getWording('payment_plan_label') })}
                    className="payment-plan"
                    size="m"
                    checked={checkPaymentPlan}
                    onChange={this.onChange}
                  >
                    <FormattedMessage {...selfMessages.usePaymentPlan} values={{ payment_plan_label: getWording('payment_plan_label') }} />
                  </Checkbox>
                  {
                    checkPaymentPlan && <PaymentPlanDetail itemId={itemId} paymentPlan={paymentPlan} />
                  }
                </div> : null
            }
            {
              haveLabel ?
                <div className={classNames('operation__labels', { 'mod-label': haveLabel })}>
                  {
                    !onlineEntryCompleted ?
                      <Label type="warning">
                        <FormattedMessage {...selfMessages.labelsIncomplete} />
                      </Label> : null
                  }
                  {
                    hasPaymentPlan && !showPaymentPlan ?
                      <Label type="success">
                        <FormattedDyncMessage value={getWording('payment_plan_label')} />
                      </Label> : null
                  }
                  {
                    isRecurring ?
                      <Label type="success">
                        <FormattedMessage {...selfMessages.labelsRecurring} />
                      </Label> : null
                  }
                </div> : null
            }
            <span className="operation__actions">
              {
                transactionUrl ?
                  <a href={transactionUrl} aria-label={messages[selfMessages.editTransactionAriaLabelText.id]}>
                    <Icon name="sign-m" type="link" aria-label="edit icon" />
                  </a> : null
              }
              <a
                href="javascript:void(0);"
                aria-label={messages[selfMessages.deleteTransactionAriaLabelText.id]}
                onClick={() => showDeleteTransactionAlert(reno, receiptEntryIdentity).then(() => {
                  window.scrollTo(0, 0);
                })}
              >
                <Icon name="trash" type="link" aria-label="delete icon" />
              </a>
            </span>
          </div>
        </div>
        {
          !isLastOne ? <div className="an-split-line an-split-line-dotted" /> : null
        }
      </div>
    );
  }
}
export default connect(
  null,
  {
    enablePaymentPlanAction
  }
)(injectIntl(Transaction));
