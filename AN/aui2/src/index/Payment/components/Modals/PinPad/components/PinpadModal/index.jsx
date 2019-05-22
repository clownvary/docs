import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Modal from 'react-base-ui/lib/components/Modal';
import { clearError, addError } from 'shared/actions/Error';
import UIComponent from 'shared/components/UIComponent';
import Applet from '../Pinpad/applet';
import { SinglePay, MutiplePays } from '../Pinpad';
import {
  updatePromptMessage,
  updateErrorMessage,
  getAPDServerStatus,
  processAPDResponse,
  communicatingWithDevice,
  updateSuccessMessage,
  processResolveAction,
  processRejectAction
} from '../../actions/pinpad';
import {
  showFailActionBtns
} from '../../actions/pinpadFail';
import {
  updateModalTitle,
  showModal,
  setApdInterfaceApplet
} from '../../actions/pinpadModal';
import { titles, actionTypes } from '../../consts';
import './index.less';

let initApplet = false;
let apdInterfaceApplet = null;

function clearPinpad(that) {
  const sessionTimeoutMsg = 'Your session has timed out or server error. The remaining balance will be left on account. You must log-in again.';
  that.props.clearError();
  that.props.addError({
    payload: {
      code: '0002',
      message: sessionTimeoutMsg
    }
  });
  that.props.showModal(false);
  apdInterfaceApplet.APDInputEnd();

  const { pinpad: { payment: { isNewCard } } } = that.props;
  /* istanbul ignore next */
  that.props.updateModalTitle(isNewCard ? titles.NEW_CARD_TITLE : titles.TRANSACTION_TITLE);
  that.props.showFailActionBtns(false);

  that.props.processRejectAction();
}

export class PinpadModal extends UIComponent {
  render() {
    const { pinpad } = this.props;
    const { title, shown } = pinpad.pinpadModal.toJS();

    return (
      <Modal
        className="pinpad-modal"
        title={title}
        shown={shown}
      >
        <div className="modal-body">
          {this.renderPinpad()}
          <div id="pinpad-applet-container" />
        </div>
      </Modal>
    );
  }

  renderPinpad() {
    const { pinpad } = this.props;
    const { payment, pinpadModal: myPinpadModal } = pinpad;
    const { pays } = payment.toJS();
    const paysLen = pays.length;

    if (!myPinpadModal.toJS().shown) {
      return '';
    }

    if (paysLen === 1) {
      return <SinglePay pay={pays[0]} pinpad={pinpad} />;
    }

    if (paysLen > 1) {
      return <MutiplePays pinpad={pinpad} />;
    }

    return '';
  }

  componentDidUpdate(prevProps) {
    const prevPinpad = prevProps.pinpad;
    const curPinpad = this.props.pinpad;
    const prevShown = prevPinpad.pinpadModal.toJS().shown;
    const currentShown = curPinpad.pinpadModal.toJS().shown;
    const payment = curPinpad.payment.toJS();

    if (!prevShown && currentShown) {
      /* istanbul ignore if */
      if (__STATIC__ && !initApplet) {
        ReactDOM.render(
          <Applet appletInfo={payment.apdAppletInfo} />,
          document.getElementById('pinpad-applet-container'),
          () => this.initAndStartAPD());
        initApplet = true;
      } else {
        this.initAndStartAPD();
      }

      return false;
    }

    const prevPayIndex = prevPinpad.payment.toJS().currentPayIndex;
    const curPayIndex = curPinpad.payment.toJS().currentPayIndex;
    /* istanbul ignore else */
    if (currentShown && prevPayIndex !== curPayIndex) {
      apdInterfaceApplet.APDInputEnd();
      this.initAndStartAPD();
    }

    return false;
  }

  initAndStartAPD() {
    const that = this;
    const pinpad = that.props.pinpad;
    const {
      receiptHeaderId,
      companyId,
      agentId,
      customerId,
      isRefund,
      cardHolderInfo,
      apdPaymentInfo,
      receiptID,
      batchID,
      debitCardId,
      pays,
      currentPayIndex,
      apdAppletInfo,
      isNewCard
    } = pinpad.payment.toJS();
    /* istanbul ignore next */
    const {
      committedReceiptId,
      receiptPaymentId,
      rno,
      orderId,
      orderDescriptor
    } = apdPaymentInfo || {};
    const {
      cardholderAddr,
      cardholderZip
    } = cardHolderInfo;
    const curPay = pays[currentPayIndex];
    const { amount, paymentTypeId, hasError } = curPay;

    const apdInitInfo = {
      orderId,
      orderDescriptor,
      orderAmount: amount,
      customerId: `${customerId}`,
      companyId: `${companyId}`,
      companyAgentId: `${agentId}`,
      cardholderAddr,
      cardholderZip,
      rno: `${rno}`,
      committedReceiptId,
      receiptPaymentId: `${receiptPaymentId || ''}`,
      requestKey: `${pays[currentPayIndex].requestKey}`,
      isRefund,
      isDebitCard: paymentTypeId === debitCardId,
      isWalletSave: false,
      methods: {

        updateMessage(message, actionType) {
          that.props.updatePromptMessage(message, actionType);
        },

        updateErrMsgAndEnableFailBtns(errMsg, actionType) {
          const pinpadFail = that.props.pinpad.pinpadFail.toJS();

          that.props.updateErrorMessage({
            message: errMsg,
            actionType
          });

          that.props.communicatingWithDevice(false);

          !pinpadFail.shown && that.props.showFailActionBtns(true);

          /* istanbul ignore next */
          pays.length === 1 && that.props.updateModalTitle(isNewCard ?
              titles.NEW_CARD_FAILED_TITLE : titles.TRANSACTION_FAILED_TITLE);
        },

        newCardFromAPD({
          transaction_description: transactionDescription,
          receipt_commit_error_message: receiptCommitErrorMessage
        }) {
          apdInterfaceApplet && apdInterfaceApplet.APDInputEnd && apdInterfaceApplet.APDInputEnd();
          that.props.communicatingWithDevice(false);
          that.props.updateSuccessMessage({
            message: transactionDescription,
            finishReceiptErrorMessage: receiptCommitErrorMessage
          });
        },

        clearPinpad() {
          clearPinpad(that);
        }
      }
    };

    if (isNewCard) {
      apdInitInfo.requestKey = '1';
      apdInitInfo.orderId = 'Future Charge Pre-Authorization';
      apdInitInfo.orderDescriptor = 'Future Charge Pre-Authorization';
      apdInitInfo.orderAmount = '0.11';
      apdInitInfo.isRefund = false;
      apdInitInfo.isDebitCard = false;
      apdInitInfo.isWalletSave = true;
      apdInitInfo.methods.newCardFromAPD = ({
        wallet_id: walletId,
        cc_masked: ccMasked,
        cc_card_type: ccCardTypeName }) => {
        apdInterfaceApplet && apdInterfaceApplet.APDInputEnd && apdInterfaceApplet.APDInputEnd();
        that.props.communicatingWithDevice(false);
        that.props.processResolveAction({ walletId, ccMasked, ccCardTypeName });
      };
    }

    if (__STATIC__) { // Only use in new device logic
      const { device_type_id: deviceTypeId,
        avs_full_addr: avsFullAddr,
        avs_zip: avsZip } = apdAppletInfo;
      apdInitInfo.receiptId = receiptID;
      apdInitInfo.batchId = batchID;
      apdInitInfo.pinpadType = deviceTypeId;
      apdInitInfo.receiptHeaderId = receiptHeaderId;
      apdInitInfo.avsZip = avsZip;
      apdInitInfo.avsFullAddr = avsFullAddr;

      apdInitInfo.methods.checkAPDServerStatus = (successCallback) => {
        that.props.getAPDServerStatus({
          batchID,
          receiptID
        }, successCallback, () => clearPinpad(that));
      };

      apdInitInfo.methods.processAPDResponse = (params, successCallback, failCallback) => {
        that.props.processAPDResponse({ batchID, receiptID }, successCallback, failCallback);
      };
    }

    hasError && that.props.updateErrorMessage({
      message: '',
      actionType: actionTypes.HIDE_RETRY,
      hasError: false
    });

    apdInterfaceApplet.init(apdInitInfo);
    return apdInitInfo;
  }

  componentDidMount() {
    /* eslint-disable global-require */
    if (__STATIC__) {
      apdInterfaceApplet = require('../../utils/APDInterface_new_design');
    } else {
      apdInterfaceApplet = require('../../utils/APDInterface');
    }
    /* eslint-enable global-require */

    this.props.setApdInterfaceApplet(apdInterfaceApplet);
  }

  componentWillUnmount() {
    /* istanbul ignore else */
    if (__STATIC__) {
      const appletDom = document.getElementById('pinpad-applet-container');
      /* istanbul ignore next */
      appletDom && ReactDOM.unmountComponentAtNode(appletDom);
      initApplet = false;
    }
  }
}

export default connect(
  null,
  {
    updatePromptMessage,
    updateErrorMessage,
    getAPDServerStatus, // Only use in new device logic
    showFailActionBtns,
    processAPDResponse, // Only use in new device logic
    updateModalTitle,
    showModal,
    clearError,
    addError,
    communicatingWithDevice,
    updateSuccessMessage,
    setApdInterfaceApplet,
    processResolveAction,
    processRejectAction
  }
)(PinpadModal);
