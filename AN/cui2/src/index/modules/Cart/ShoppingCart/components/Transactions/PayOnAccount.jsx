import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { Link } from 'shared/components/Link';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import TransactionTypes from 'index/modules/Cart/ShoppingCart/consts/transactionTypes';
import './payonaccount.less';
import selfMessages from './translations';
import { confirmBalanceDeleteAction } from '../../actions/transactions';
/* eslint-disable no-nested-ternary */
export class PayOnAccount extends React.PureComponent {

  static propTypes = {
    showDeleteTransactionAlert: PropTypes.func
  }

  render() {
    const {
      isRequired, payOnAccountList, showDeleteTransactionAlert, intl: { messages } } = this.props;
    const {
        reno,
      item_name: itemName,
      company_id: companyId,
      amount_include_tax: amountIncludeTax,
      receipt_numbers: receiptNumbers,
      transaction_url: transactionUrl,
      transaction_type: transactionType
        } = payOnAccountList;

    return (
      <div className="an-panel an-col-1 pay-on-account">
        <div className="an-grid pay-on-account__header">
          <h3 className="an-col an-col-grow-1">
            <FormattedDyncMessage value={itemName} />
          </h3>
          <h3 className="an-col">
            <span>
              <FormattedNumber numberStyle="currency" currency="USD" value={amountIncludeTax} />
            </span>
          </h3>
        </div>

        <div className="pay-on-account__footer">
          <div className="an-grid an-col-bottom">
            <div className="an-col-grow-1 an-col-basis-0 pay-on-account__footer__detail">
              <div className="pay-on-account__title u-color-secondarytext">
                <FormattedMessage {...selfMessages.payOnAccountBalance} />
              </div>
              {
                receiptNumbers && receiptNumbers.length > 0 ?
                  <div className="pay-on-account__balances">
                    <FormattedMessage {...selfMessages.balancesOnReceipts} />
                    {
                      receiptNumbers.map((item, index) => (
                        <div key={index} className="pay-on-account__receipts">
                          <a href={item.value} target="_blank" rel="noopener noreferrer">
                            <FormattedDyncMessage value={`${item.key} `} />
                          </a>
                          <Icon name="ex-link-m" aria-label="open receipt icon" className="arrows" />
                          {
                            index !== receiptNumbers.length - 1 ? <span>{','}</span> : null
                          }
                        </div>
                      ))
                    }
                  </div> : null
              }
            </div>
            <div className="pay-on-account__footer__operation">
              {
                transactionUrl ?
                  (transactionType === TransactionTypes.OUTSTANDING_BALANCE_PAYMENT
                  && companyId > 0) ?
                    <a href={transactionUrl} aria-label={messages[selfMessages.editTransactionAriaLabelText.id]} className="pay-on-account__edit">
                      <Icon name="sign-m" type="link" aria-label="edit icon" />
                    </a>
                    :
                    <Link to="/newcart/balance" aria-label={messages[selfMessages.editTransactionAriaLabelText.id]} className="pay-on-account__edit">
                      <Icon name="sign-m" type="link" aria-label="edit icon" />
                    </Link> : null
              }
              {
                companyId > 0 ?
                  <a href=" javascript:void(0);" className="pay-on-account__delete" aria-label={messages[selfMessages.deleteTransactionAriaLabelText.id]} onClick={() => showDeleteTransactionAlert(reno)} >
                    <Icon name="trash" type="link" aria-label="delete icon" />
                  </a> : null
              }
              {
                companyId <= 0 && !isRequired ?
                  <a href=" javascript:void(0);" className="pay-on-account__delete" aria-label={messages[selfMessages.deleteTransactionAriaLabelText.id]} onClick={() => this.props.confirmBalanceDeleteAction(reno)} >
                    <Icon name="trash" type="link" aria-label="delete icon" />
                  </a> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  {
    confirmBalanceDeleteAction
  }
)(injectIntl(PayOnAccount));
