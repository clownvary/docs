import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-base-ui/lib/components/Alert';
import UIComponent from 'shared/components/UIComponent';
import Error from 'shared/components/Error';
import { pages } from 'shared/consts';
import BreadCrumb from 'shared/components/BreadCrumb';
import HelpLink from 'shared/components/HelpLink';
import 'shared/components/CancelPermit/index.less';
import { makePayment, showECPAuthDetails } from './actions';
import PaymentOptions from './components/PaymentOptions';
import PaymentSummary from './components/PaymentSummary';
import PaymentFooter from './components/PaymentFooter';
import Payer from './components/Payer';
import RefundPayer from './components/RefundPayer';
import Magtek from './components/Modals/MagTek';
import PinpadModal from './components/Modals/PinPad/components/PinpadModal';
import ECheckModal from './components/Modals/ElectronicCheck';

import {
  resetUseNewECheckSelectedValue
} from './actions/paymentOptions/electronicCheck';

import {
  changeECheckAccountType,
  changeECheckSaveInformation,
  setECheckError,
  saveNewECheck,
  cancelAction
} from './actions/modals/NewECheck';

import { resetTypes } from './consts';

import './index.less';

/* istanbul ignore next */
const promptsWhenHasUnfinishedTasks = [
  () => {
    if (window.isInPendingPayment) {
      /* eslint-disable no-alert */
      alert('Your transaction is being processed, please do not leave this page.');
      return true;
    }
    return false;
  },
  () => {
    if (window.isReceiptCantCancel) {
      /* eslint-disable no-alert */
      alert('This receipt cannot be canceled. A credit or debit card has already been processed for this receipt. You must finish the receipt and then issue a refund.');
      return true;
    }

    return false;
  }
];

export class Payment extends UIComponent {
  cancelShowAuthorizationDetails = (agreement = false) => {
    this.props.showECPAuthDetails({
      shown: false
    });

    if (agreement) {
      this.props.makePayment(this.props.payment.toJS().ecpAuthDetails.paymentInfos);
    }
  };

  getPageName = () => {
    const { isRefund, isPaymentActionValid } = this.props.payment.toJS();
    /* istanbul ignore else */
    if (this.props.initialData.permitID > 0) {
      /* istanbul ignore else */
      if (isRefund) {
        return 'Refund_Payment.jsp';
      }
      /* istanbul ignore else */
      if (isPaymentActionValid) {
        return 'Detail_Payment.jsp';
      }
    }

    return 'Payment.jsp';
  };

  render() {
    const {
      paymentOptions,
      error,
      payment,
      newECheck,
      pinpad,
      magtek,
      payer,
      paymentAction,
      paymentSummary,
      breadCrumb,
      initialData
    } = this.props;

    const { eCheckConfig: { show_prior_ecp: showPriorEcp },
      eCheckLabel
    } = paymentOptions.eCheck.toJS();
    const paymentMethodIsEmpty = paymentOptions.options.getIn(['reset', 'type']) !== resetTypes.NONE;

    const { ccScanWithApdDevice, ccScanWithMagesafeDevice } = initialData;

    const isRefund = payment.get('isRefund');
    const isPaymentActionValid = payment.get('isPaymentActionValid');
    const pinpadForPaymentIsGoing = pinpad.pinpadModal.get('shown');
    const isShowAuthorizationDetails = !!payment.get('ecpAuthDetails').shown;
    const isPayByClickPaymentInRDActionBar = payment.get('paymentPageIndex') === pages.PAY_IN_RESERVATION;
    const isNotShowPayerAndPaymentMethods = isPayByClickPaymentInRDActionBar && !paymentSummary.get('hasBalance');
    const isPayerBeDropIn = payer.get('isPayerBeDropIn');
    const isPermitHolderBeDropIn = payer.get('isPermitHolderBeDropIn');

    return (
      <section className="an-page payment" style={{ height: window.forcedSetIFrameHeight }}>
        {__STATIC__ ?
          undefined :
          <BreadCrumb
            isPromptUser
            breadCrumb={breadCrumb}
            promptsWhenHasUnfinishedTasks={promptsWhenHasUnfinishedTasks}
          />
        }
        <div id="payment-container" >
          {!isPaymentActionValid && <HelpLink pageName={this.getPageName()} />}
          <PaymentSummary
            payment={payment}
            paymentAction={paymentAction}
            paymentSummary={paymentSummary}
            initialData={initialData}
          >
            {!isNotShowPayerAndPaymentMethods && this.renderError(pinpadForPaymentIsGoing)}
          </PaymentSummary>
          {!isNotShowPayerAndPaymentMethods && this.renderPayer()}
          {!isNotShowPayerAndPaymentMethods &&
            <PaymentOptions
              isRefund={isRefund}
              payment={payment}
              paymentOptions={paymentOptions}
              paymentMethodIsEmpty={paymentMethodIsEmpty}
              payer={payer}
              newECheck={newECheck}
              showAuthorizationDetails={isShowAuthorizationDetails}
              cancelShowAuthorizationDetails={this.cancelShowAuthorizationDetails}
              paymentAction={paymentAction}
              initialData={initialData}
              ccScanWithApdDevice={ccScanWithApdDevice}
              ccScanWithMagesafeDevice={ccScanWithMagesafeDevice}
              isPayerBeDropIn={isPayerBeDropIn}
              isPermitHolderBeDropIn={isPermitHolderBeDropIn}
            />}
          <PaymentFooter
            payment={payment}
            paymentAction={paymentAction}
            paymentSummary={paymentSummary}
            initialData={initialData}
            paymentMethodIsEmpty={paymentMethodIsEmpty}
          />
          <Magtek data={magtek} initialData={initialData} />
          <PinpadModal pinpad={pinpad} />

          <ECheckModal
            title={`New ${eCheckLabel}`}
            showPriorEcp={showPriorEcp}
            data={this.props.newECheck.toJS()}

            onCancel={this.props.cancelAction}
            onSubmit={this.props.saveNewECheck}
            onError={this.props.setECheckError}
            changeSaveAccountInformation={this.props.changeECheckSaveInformation}
            changeAccountType={this.props.changeECheckAccountType}
          />

          <Error error={{ list: error.get('systemErrors') }} />
        </div>
      </section>
    );
  }

  renderError(pinpadForPaymentIsGoing) {
    const { error, payment } = this.props;
    const businessErrors = error.get('businessErrors').toJS();
    const paymentWarning = [];
    let paymentError = payment.get('errors').toJS();
    paymentError = paymentError.filter((err) => {
      if (err.type) {
        paymentWarning.push(err);
        return false;
      }

      return true;
    });

    paymentError = paymentError.concat(businessErrors);
    /* istanbul ignore else */
    if (!pinpadForPaymentIsGoing) {
      if (paymentError.length) {
        return (<Alert type="error" className="payment-aaui-alert" noClose>
          <div className="error-content">
            <ul>
              {
                paymentError.map((item, k) => <li key={k}>{item.message}</li>)
              }
            </ul>
          </div>
        </Alert>);
      }

      if (paymentWarning.length) {
        return (<Alert type="warning" className="payment-aaui-alert" noClose>
          <div className="error-content">
            <ul>
              {
                paymentWarning.map((item, k) => <li key={k}>{item.message}</li>)
              }
            </ul>
          </div>
        </Alert>);
      }
    }

    return '';
  }

  renderPayer() {
    const {
      payment,
      payer,
      paymentOptions,
      paymentAction,
      initialData: {
        limitPayer
      }
    } = this.props;
    const isRefund = payment.get('isRefund');
    const paymentOptionsSize = paymentOptions.options.get('data').size;
    let payerComp = (<Payer
      payer={payer}
      payment={payment}
      paymentAction={paymentAction}
      paymentOptionsSize={paymentOptionsSize}
      limitPayer={limitPayer}
    />);

    if (isRefund) {
      payerComp = (<RefundPayer
        payer={payer}
        payment={payment}
        paymentOptionsSize={paymentOptionsSize}
      />);
    }

    return payerComp;
  }
}

export default connect(
  // istanbul ignore next
  state => ({
    paymentOptions: state.paymentOptions,
    payer: state.payer,
    error: state.error,
    payment: state.payment,
    newCreditCard: state.paymentModals.newCreditCard,
    magtek: state.paymentModals.magtek,
    pinpad: state.paymentModals.pinpad,
    newECheck: state.paymentModals.newECheck,
    paymentSummary: state.paymentSummary,
    paymentAction: state.paymentAction,
    breadCrumb: state.breadCrumb,
    initialData: state.initialData
  }),
  {
    makePayment,
    showECPAuthDetails,
    resetUseNewECheckSelectedValue,
    saveNewECheck,
    setECheckError,
    changeECheckSaveInformation,
    changeECheckAccountType,
    cancelAction
  }
)(Payment);
