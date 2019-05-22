import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import Button from 'react-base-ui/lib/components/Button';
import { InputNumeric } from 'react-base-ui/lib/components/InputNumeric';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedMessage, FormattedNumber, FormattedHtmlMessage } from 'shared/translation/formatted';
import buttonsMessages from 'shared/translation/messages/button';
import { formatI18n } from 'shared/translation/formatI18n';
import selfMessages from './translations';
import {
  uiShowMessageAction,
  onValidateBalanceAction,
  onUpdateBalanceAction,
  clearErrorStateAction
} from '../actions/balance';

import './receipt.less';

export class Receipt extends React.PureComponent {

  static propTypes = {
    balance: PropTypes.shape({}).isRequired,
    intl: PropTypes.shape({
      messages: PropTypes.shape({}).isRequired
    }).isRequired,
    onValidateBalanceAction: PropTypes.func.isRequired,
    onUpdateBalanceAction: PropTypes.func.isRequired,
    uiShowMessageAction: PropTypes.func.isRequired,
    clearErrorStateAction: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.clearErrorStateAction();
  }

  componentDidMount() {
    this.props.uiShowMessageAction();
  }

  render() {
    const { balance, responsive: { isSm } } = this.props;
    const { messages } = this.props.intl;
    const isRequired = balance.get('require');
    const text = formatI18n(messages[selfMessages.info.id], {
      customerName: balance.get('customerName'),
      balanceDate: balance.get('balanceDate')
    });

    return (
      <div className="module-balance">
        <div className="module-balance__info">
          <FormattedHtmlMessage value={text} />
        </div>
        <div className="module-balance__content">
          <div className="module-balance__list">
            <table className="an-simple-table an-sm-simple-table">
              <thead>
                <tr className="module-balance__header">
                  <td className="module-balance__receipt">
                    <FormattedHtmlMessage value={messages[selfMessages.receipt.id]} />
                  </td>
                  <td className="module-balance__date-issued">
                    <FormattedHtmlMessage value={messages[selfMessages.dateIssued.id]} />
                  </td>
                  <td className="module-balance__next-payment-date">
                    <FormattedHtmlMessage value={messages[selfMessages.nextPaymentDate.id]} />
                  </td>
                  <td className="module-balance__original-balance">
                    <FormattedHtmlMessage value={messages[selfMessages.originalBalance.id]} />
                  </td>
                  <td className="module-balance__current-balance">
                    <FormattedHtmlMessage value={messages[selfMessages.currentBalance.id]} />
                  </td>
                  <td className="module-balance__payment-amount">
                    <FormattedHtmlMessage value={messages[selfMessages.paymentAmount.id]} />
                  </td>
                  <td className="module-balance__remaining-balance">
                    <FormattedHtmlMessage value={messages[selfMessages.remainingBalance.id]} />
                  </td>
                </tr>
              </thead>

              {
            balance.get('outstandingBalances').map((item, index) => {
              const id = item.get('id');
              const error = balance.get('errors').get(`${id}`);

              let receiptInputMsg = isRequired ? messages[selfMessages.receiptInputRequiredMsg.id]
              : messages[selfMessages.receiptInputMsg.id];

              receiptInputMsg = formatI18n(receiptInputMsg, {
                min: item.get('min'),
                max: item.get('max')
              });

              const remanningBalance = item.get('current_balance') - item.get('pending_payment');
              const wcagDescribedby = error ? { 'aria-describedby': `input-${id}-error` } : {};


              return (
                <tbody>
                  <tr key={`receiptID1-${id}`} className="module-balance__item">
                    <td data-label={messages[selfMessages.receipt.id]} className="module-balance__receipt">
                      <span>
                        <a href={item.get('receipt_url')} target="view_window">
                          <span>{item.get('receipt_number')}</span>
                        </a>
                        <Icon
                          name="ex-link-m"
                          aria-label="link icon"
                        />
                      </span>
                    </td>
                    <td data-label={messages[selfMessages.dateIssued.id]} className="module-balance__date-issued">
                      <span>{item.get('issued_date')}</span>
                    </td>
                    <td data-label={messages[selfMessages.nextPaymentDate.id]} className="module-balance__next-payment-date">
                      <span>{item.get('next_payment_date')}</span>
                    </td>
                    <td data-label={messages[selfMessages.originalBalance.id]} className="module-balance__original-balance">
                      <FormattedNumber numberStyle="currency" currency="USD" value={item.get('original_balance')} />
                    </td>
                    <td data-label={messages[selfMessages.currentBalance.id]} className="module-balance__current-balance">
                      <FormattedNumber numberStyle="currency" currency="USD" value={item.get('current_balance')} />
                    </td>
                    <td data-label={messages[selfMessages.paymentAmount.id]} className="module-balance__payment-amount">
                      <span>
                        <span>$</span>
                        <InputNumeric
                          allowBlank={false}
                          aria-label={receiptInputMsg}
                          {...wcagDescribedby}
                          className={classNames({ 'module-balance__input-error': error })}
                          value={item.get('pending_payment')}
                          onBlur={({ value }) => {
                            this.props.onUpdateBalanceAction(index, value);
                          }}
                        />
                      </span>
                    </td>
                    {
                      isSm && error ?
                        <td className="module-balance-error u-color-errortext"><div>&nbsp;</div><div id={`input-${id}-error`} role="alert">{error}</div></td> : null
                    }
                    <td data-label={messages[selfMessages.remainingBalance.id]} className="module-balance__remaining-balance">
                      <FormattedNumber numberStyle="currency" currency="USD" value={remanningBalance > 0 ? remanningBalance : 0} />
                    </td>
                  </tr>
                  {
                    !isSm && error ?
                      <tr key={`receiptID-${id}-error`}>
                        <td colSpan="7" className="module-balance-error u-color-errortext">
                          <div id={`input-${id}-error`} role="alert">{error}</div>
                        </td>
                      </tr> : null
                  }
                </tbody>
              );
            })
          }

            </table>
          </div>
          <div className="module-balance__subtotal">
            <FormattedHtmlMessage value={messages[selfMessages.subtotal.id]} />
            <FormattedNumber
              numberStyle="currency"
              currency="USD"
              value={balance.get('subTotal')}
            />
          </div>
          <div className="module-balance__footer">
            <Button type="strong" onClick={() => { this.props.onValidateBalanceAction(); }}>
              <FormattedMessage {...buttonsMessages.next} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withResponsiveProvider(injectIntl(connect(
  null,
  {
    uiShowMessageAction,
    onValidateBalanceAction,
    onUpdateBalanceAction,
    clearErrorStateAction
  }
)(Receipt)));
