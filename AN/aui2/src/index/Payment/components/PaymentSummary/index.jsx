import PropTypes from 'prop-types';
import React from 'react';
import HelpLink from 'shared/components/HelpLink';
import UIComponent from 'shared/components/UIComponent';
import Popover from 'react-base-ui/lib/components/Popover';
import moveToTopOfPage from 'shared/utils/moveToTopOfPage';
import PaymentAction from '../PaymentAction';
import formatCurrency from '../../utils/formatCurrency';
import './index.less';

export default class PaymentSummary extends UIComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowPaymentDetail: false
    };
  }
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    payment: PropTypes.object.isRequired,
    paymentSummary: PropTypes.object.isRequired,
    paymentAction: PropTypes.object.isRequired
  }
  /* eslint-enable react/forbid-prop-types */
  render() {
    return (
      <div className="payment-summary">
        {this.renderSummaryHeader()}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const prevChildren = prevProps.children;
    const curChildren = this.props.children;

    if (!prevChildren && curChildren) {
      moveToTopOfPage(document.getElementById('payment-container'));
    }
  }

  renderSummaryHeader() {
    const { isRefund, isPaymentActionValid } = this.props.payment.toJS();
    if (this.props.initialData.permitID > 0) {
      if (isRefund) {
        return this.renderRefund();
      }
      if (isPaymentActionValid) {
        return this.renderPaymentDetail();
      }
    }

    return this.renderPayment();
  }

  renderPayment() {
    const header = 'Payment';
    const totalTitle = 'TOTAL AMOUNT';
    const { total, transactionFee, depositFee } = this.props.payment.toJS();

    return (
      <div>
        <div className="page-title aaui-flexbox">
          <h1>{header}</h1>
          <div className="payment-total">
            {totalTitle} <span className="text-color-strong">${total}</span>
            <div className="payment-fees-summary">
              {depositFee > 0 ?
                <span>
                  <span className="payment-fee-name">Deposit Fee </span>
                  <span className="payment-fee-amount">${depositFee}</span>
                </span> : ''
              }
              {transactionFee > 0 ?
                <span>
                  <span className="payment-fee-name">Transaction Fee </span>
                  <span className="payment-fee-amount">${transactionFee}</span>
                </span> : ''
              }
            </div>
          </div>
        </div>
        { this.props.children }
      </div>
    );
  }

  renderRefund() {
    const header = 'Refund';
    const totalTitle = 'TOTAL REFUND';
    const { total, claimTaxTotal, claimDiscountTotal } = this.props.payment.toJS();

    return (
      <div>
        <div className="page-title aaui-flexbox">
          <h1>{header}</h1>
          <div className="payment-total">
            {totalTitle} <span className="text-color-strong">${total}</span>
            <div className="payment-fees-summary">
              {
                claimDiscountTotal > 0 ?
                  <span>
                    <span className="payment-fee-name">Discount </span>
                    <span className="payment-fee-amount">-${claimDiscountTotal}</span>
                  </span> : ''
              }
              {claimTaxTotal > 0 ?
                <span>
                  <span className="payment-fee-name">Tax </span>
                  <span className="payment-fee-amount">${claimTaxTotal}</span>
                </span> : ''
              }
            </div>
          </div>
        </div>
        { this.props.children }
      </div>
    );
  }
  /*
    summary information to response to the payment action
    which located at the action bar of Reservation Detail page
  */
  renderPaymentDetail() {
    const header = 'Payment Detail';
    const { paymentAction, paymentSummary, payment } = this.props;
    const hasBalance = paymentSummary.get('hasBalance');
    const isHasPayments = paymentSummary.get('hasPayments');
    const payerPayments = paymentSummary.get('payers');
    const payerRefunds = paymentSummary.get('refunds');
    const paymentPlanWording = payment.get('paymentPlanWording');
    const allowModifyPaymentPlan = payment.get('allowModifyPaymentPlan');
    const minHeightOfPaymentSummary = hasBalance ? 0 : payment.get('resize') - 155;

    return (
      <div className="page-title payment-detail-section" style={{ minHeight: `${minHeightOfPaymentSummary}px` }}>
        <div className="payment-detail-title">
          <h1>{header}</h1>
          <HelpLink pageName="Detail_Payment.jsp" />
        </div>
        { this.props.children }
        <div className="payment-detail-summary aaui-flexbox panel">
          <div>
            <span className="payment-sum-name">Total Amount</span>
            <span className="payment-sum-value">${paymentSummary.get('totalAmount')}</span>
          </div>
          <div>
            <span className="payment-sum-name">Paid Amount</span>
            <span className="payment-sum-value">
              ${ paymentSummary.get('paidAmount') }
              <i
                data-popover-trigger
                className={`icon icon-info-circle pop-base ${(isHasPayments && payerPayments.size) ? '' : 'icon-disabled'}`}
                onMouseOver={() => this.viewPayerAndRefundDetail(true)}
                onMouseOut={() => this.viewPayerAndRefundDetail(false)}
              >
                <Popover
                  className={`${(this.state.isShowPaymentDetail && isHasPayments && payerPayments.size) ? '' : 'u-hidden'}`}
                  direction="s"
                >
                  <div className="payer-type-header">Payer</div>
                  <ul className="pay-details">
                    { payerPayments.map(payer => <li className="payer-refund-detial-item">
                      <span className="detail-item-name">{payer.get('payerName')}</span>
                      <span className="detail-item-value">${formatCurrency(payer.get('paidAmount'))}</span>
                    </li>) }
                  </ul>
                  { payerRefunds && payerRefunds.size ? <div>
                    <div className="payer-type-header payer-type-refund">Refund To</div>
                    <ul>
                      { payerRefunds.map(payer => <li className="payer-refund-detial-item">
                        <span className="detail-item-name">{payer.get('payerName')}</span>
                        <span className="detail-item-value">${formatCurrency(payer.get('paidAmount'))}</span>
                      </li>) }
                    </ul>
                  </div> : '' }
                </Popover>
              </i>
            </span>
          </div>
          <div>
            <span className="payment-sum-name">Balance</span>
            <span className="payment-sum-value">${ paymentSummary.get('balanceAmount') }</span>
          </div>
        </div>
        { hasBalance && allowModifyPaymentPlan ?
          <PaymentAction
            paymentAction={paymentAction}
            paymentPlanWording={paymentPlanWording}
          /> : ''
        }
      </div>
    );
  }

  viewPayerAndRefundDetail(isShowPaymentDetail) {
    this.setState({
      isShowPaymentDetail
    });
  }
}
