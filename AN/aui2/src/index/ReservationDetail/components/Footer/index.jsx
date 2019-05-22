import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import Button from 'react-base-ui/lib/components/Button';
import Radio from 'react-base-ui/lib/components/Radio';
import { redirect } from 'shared/actions/route';
import { pages } from 'shared/consts';
import Alert from 'shared/components/Alert';
import {
  cancelReceiptAndReloadPage,
  isChangeNeedPay,
  gotoPaymentOrRefundPage,
  leaveToPaymentPlanAndNext
} from '../../actions/footer';
import './index.less';

export class Footer extends UIComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.confirmAlert = {
      cancel: {
        title: 'Cancel Changes',
        message: (() => 'Changes will not be saved. Are you sure you want to cancel?')
      },
      confirm: {
        title: 'Confirm Changes',
        message: (() => this.renderConfirmChange())
      }
    };

    this.state = {
      confirmActionType: 'cancel',
      selectedPaymentType: pages.PAY_NOW
    };
  }

  render() {
    const { main, initialData: { hasRefundAmount, isReservationDetailUpdated } } = this.props;
    const isPermitDetailsChanged = main.get('isPermitDetailsChanged');
    const { confirmActionType } = this.state;
    const confirmAlert = this.confirmAlert;
    return (
      <div>
        <div className="an-page__placeholder" />
        <div className="reservation-detail__footer an-page__footer fixed">
          {(
            isPermitDetailsChanged || isReservationDetailUpdated || hasRefundAmount
          ) ?
            <div className="reservation-change-actions an-page__footer__content">
              { (!isPermitDetailsChanged && !isReservationDetailUpdated) && hasRefundAmount ?
                <Button onClick={this.onClickBackBtn}>Back</Button> :
                <Button onClick={this.onClickCancel}>Cancel</Button>
              }
              <div className="aaui-flexbox">
                <Button
                  type="strong"
                  onClick={this.props.handleSubmit}
                >
                  Confirm Changes
                </Button>
              </div>
            </div> :
            <div className="reservation-no-change-actions an-page__footer__content u-justify-content-end">
              <Button onClick={this.onClickBackBtn}>Done</Button>
            </div>
          }
          <Alert
            onClose={() => this.onCancel()}
            ref={(alert) => { this._refs.confirmAlert = alert; }}
            title={confirmAlert[confirmActionType].title}
            onCancel={() => this.onCancel()}
            onConfirm={closeAlert => this.onConfirm(closeAlert)}
            cancelText="No"
            confirmText="Yes"
          >
            { confirmAlert[confirmActionType].message() }
          </Alert>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    if (props.footer.get('isShouldPay') && !this.props.footer.get('isShouldPay')) {
      this.setState({
        confirmActionType: 'confirm'
      }, () => {
        this._refs.confirmAlert.open();
      });
    }
  }

  onClickBackBtn = () => {
    const { initialData: { batchID, receiptID }, breadCrumb } = this.props;
    const breadCrumbSize = breadCrumb.size;
    let backUrl = '';

    if (breadCrumbSize < 2) {
      backUrl = pages.buildUrl(pages.reservationsPage);
    } else {
      backUrl = breadCrumb.getIn([breadCrumbSize - 2, 'url']);
    }

    /* istanbul ignore else */
    if (typeof window.cleanOnLeaving === 'function' &&
      window.cleanOnLeaving({ batchID, receiptID })
    ) {
      this.props.redirect(backUrl);
    }
  }

  renderConfirmChange() {
    const { isPermitHolderBeDropIn, paymentPlanInformation, initialData } = this.props;
    const { selectedPaymentType } = this.state;
    const {
      PAY_NOW,
      PAY_PLAN
    } = pages;
    const isNoBalance = !(paymentPlanInformation.nextDueAmount > 0 ||
      paymentPlanInformation.overDueAmount > 0);
    const isPayerOfPaymentPlanBeDropIn =
      +paymentPlanInformation.customerID === initialData.cashCustomerId;
    const isDisablePPWhenPerHolderIsDropInAndNoBalance = isPayerOfPaymentPlanBeDropIn ||
      (isPermitHolderBeDropIn && isNoBalance);

    return (
      <div>
        <Radio
          className="change-radio"
          name="payment-action"
          value={PAY_NOW}
          checked={selectedPaymentType === PAY_NOW}
          onChange={e => this.changePaymentType(e)}
        >Pay now</Radio>
        {!isDisablePPWhenPerHolderIsDropInAndNoBalance &&
          <Radio
            className="change-radio"
            name="payment-action"
            value={PAY_PLAN}
            checked={selectedPaymentType === PAY_PLAN}
            onChange={e => this.changePaymentType(e)}
          >Add to payment plan</Radio>
        }
      </div>
    );
  }

  onClickCancel = () => {
    this.setState({
      confirmActionType: 'cancel'
    }, () => {
      this._refs.confirmAlert.open();
    });
  }

  onCancel() {
    /* istanbul ignore else */
    if (this.state.confirmActionType === 'confirm') {
      this.props.isChangeNeedPay(false);
    }
  }

  onConfirm(closeAlert) {
    const confirmActionType = this.state.confirmActionType;
    /* istanbul ignore else */
    if (typeof closeAlert === 'function') {
      closeAlert();
    }

    if (confirmActionType === 'cancel') {
      this.onConfirmCancel();
    } else {
      this.onConfirmChange();
    }
  }

  onConfirmCancel() {
    this.props.cancelReceiptAndReloadPage();
  }

  changePaymentType(e) {
    this.setState({
      selectedPaymentType: +e.target.value
    });
  }

  onConfirmChange() {
    const { selectedPaymentType } = this.state;
    const paymentQuery = {
      [pages.paymentPageIndex]: selectedPaymentType
    };
    if (selectedPaymentType === pages.PAY_NOW) {
      this.props.gotoPaymentOrRefundPage(paymentQuery);
    } else {
      this.props.leaveToPaymentPlanAndNext(paymentQuery);
    }
  }
}

export default connect(
  null,
  {
    redirect,
    cancelReceiptAndReloadPage,
    isChangeNeedPay,
    gotoPaymentOrRefundPage,
    leaveToPaymentPlanAndNext
  }
)(Footer);
