import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import {
  FormattedMessage,
  FormattedNumber,
  FormattedDyncMessage
} from 'shared/translation/formatted';
import messages from 'shared/translation/messages/Cart/orderSummary';

import './index.less';

export class PaymentPlan extends PureComponent {
  render() {
    const { data, total, className, responsive: { isSm } } = this.props;
    const phase = data.length;
    return (
      <div className={classNames('payment-plan', className)}>
        <table className="an-simple-table">
          <thead>
          <tr className="payment-plan-header">
            <td className="an-col-1-8 an-md-col-1-6 an-sm-col-1-6 payment-plan-header__phase" />
            <td className="an-col-3-8 an-md-col-2-6 an-sm-col-3-6 payment-plan-header__due">
              <FormattedMessage {...messages.dueDate} />
            </td>
            <td className="an-col-4-8 an-md-col-3-6 an-sm-col-2-6 payment-plan-header__amount">
              {
                isSm ?
                  <FormattedMessage {...messages.amount} /> :
                  <FormattedMessage {...messages.amountDue} />
              }
            </td>
          </tr>
          </thead>
          <tbody>
          {
            data.map((item, index) => (
              <tr className="payment-plan-item" key={`payment-plan-item-${index}`}>
                <td className="an-col-1-8 an-md-col-1-6 an-sm-col-1-6 payment-plan-item__phase">
                  {index + 1}/{phase}
                </td>
                <td className="an-col-3-8 an-md-col-2-6 an-sm-col-3-6 payment-plan-item__date">
                  <FormattedDyncMessage value={item.date} />
                  <span className="payment-plan-item-day">
                  <FormattedDyncMessage value={item.day} />
                </span>
                </td>
                <td className="an-col-4-8 an-md-col-3-6 an-sm-col-2-6 payment-plan-item__amount">
                  <FormattedNumber numberStyle="currency" currency="USD" value={item.amount} />
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <div className="u-bg-color--dark-accent payment-plan-footer">
          <div>
            <FormattedMessage {...messages.total} />
          </div>
          <div className="payment-plan-footer__amount">
            <FormattedNumber numberStyle="currency" currency="USD" value={total} />
          </div>
        </div>
      </div>
    );
  }
}

export default withResponsiveProvider(
  injectIntl(PaymentPlan)
);
