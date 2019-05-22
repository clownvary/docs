import React from 'react';
import classNames from 'classnames';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import selfMessages from './translations';
import './paymentPlanDetail.less';

/* eslint-disable jsx-a11y/aria-props */
/* eslint-disable jsx-a11y/aria-role */
export class PaymentPlanDetail extends React.PureComponent {
  render() {
    const {
      itemId,
      paymentPlan: {
        total_due_amount: totalDueAmount,
        payment_schedule: paymentSchedule
      }
    } = this.props;
    const tableClasses = classNames(
      'an-simple-table',
      'paymentplan-detail-table'
    );

    return (
      <div className="payment-plan-wrapper" >
        <table className={tableClasses} role="table" aria-label="payment plan detail table">
          <thead>
            <tr role="row">
              <td className="paymentplan-thead__count" role="columnheader">
                <FormattedMessage {...selfMessages.tableThCount} />
              </td>
              <td className="paymentplan-thead__due-date" role="columnheader">
                <FormattedMessage {...selfMessages.tableThDueDate} />
              </td>
              <td className="paymentplan-thead__amount-due-date" role="columnheader">
                <FormattedMessage {...selfMessages.tableThAmountDue} />
              </td>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {
              paymentSchedule && paymentSchedule.map((schedule, index) => (
                <tr key={`payment-plan-${itemId}-${index}`} role="row">
                  <td className="paymentplan-tbody__count" role="cell">
                    <FormattedDyncMessage value={schedule.count} />
                  </td>
                  <td className="paymentplan-tbody__due-date" role="cell">
                    <span>
                      <FormattedDyncMessage value={schedule.due_date.split(',')[0]} />
                      <span className="week-text">
                        <FormattedDyncMessage value={schedule.due_date.split(',')[1]} />
                      </span>
                    </span>
                  </td>
                  <td className="paymentplan-tbody__amount-due-date" role="cell">
                    <FormattedNumber numberStyle="currency" currency="USD" value={schedule.due_amount} />
                  </td>
                </tr>
              ))
            }
            <tr role="row">
              <div className="transaction__gather u-bg-color--light-neutral" role="cell" aria-colspan="3">
                <b><FormattedMessage {...selfMessages.totalPaymentPlan} /></b>
                <FormattedNumber numberStyle="currency" currency="USD" value={totalDueAmount} />
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PaymentPlanDetail;
