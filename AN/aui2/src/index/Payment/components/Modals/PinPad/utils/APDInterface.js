/* global applet_frame, findFrame, isXNETHost, getXNETHostFrameId, PostMessageToXnetFrame, msg */

import { isInIframe } from 'shared/utils/iframe';
import { randomUUID } from 'shared/utils/func';
import { redirect } from 'shared/utils/locationHelper';
import * as actionTypes from '../consts/actionTypes';
/* eslint-disable */

let APDSetErrorMessage = null;
let APDSetInfoMessage = null;
let newCardFromAPD = null;
let applet_frame = null;
let callerFn = null;
let callerKey = null;
let _rno = null;
let _committed_receipt_id = null;
let _receiptpayment_id = null;
let _customerId = null;
let _companyId = null;
let _companyAgentId = null;
let _cardholder_addr = null;
let _cardholder_zip = null;
let _clientTransactionId = null;
let _orderId = null;
let _orderDescriptor = null;
let _orderAmount = null;
let _isDebitCard = false;
let _isRefund = false;
let _isManualEntry = false;
let _isWalletSave = false;
const rootUrl = window.__environment__.ROOT_URL;

function APDStatusCallback(status_code, msg) {
  const isErrByDevice = (status_code === 0) ||
    (status_code === 1) ||
    (status_code == 4);

  if (isErrByDevice) { // error with retry and cancel button
    APDSetErrorMessage(msg);
  } else if (status_code === 2) { // info
    APDSetInfoMessage(msg);
  } else if (status_code == 3) { // not retryable error
    APDSetErrorMessage(msg, actionTypes.HIDE_RETRY); // don't show the retry or swipe button but show the cancel button
  } else if (status_code == 5) {
    APDSetErrorMessage('', actionTypes.SERVICE_HELP);
  }
}

function deviceCallback(
  key,
  wallet_id,
  cc_masked,
  cc_card_type,
  apd_transaction_key,
  user_error,
  amount,
  transaction_description,
  receipt_commit_error_message) {
  if (key != callerKey) {
    return false;
  }

  if (wallet_id == null) {
    return true;
  }

  if (wallet_id === 'EXIT') {
    // go to login page
    if (!__STATIC__) {
      const homeUrl = `${window.__environment__.ROOT_URL}/servlet/adminlogin.sdi?sessiontimeout=Checked`;
      redirect(homeUrl, window.top);
    } else {
      this.reload();
    }

    return false;
  }

  if (user_error) {
    APDSetErrorMessage(msg);
  } else {
    newCardFromAPD({
      key,
      wallet_id,
      cc_masked,
      cc_card_type,
      apd_transaction_key,
      user_error,
      amount,
      transaction_description,
      receipt_commit_error_message
    });
  }
  return false;
}

export function APDInputEnd() {
  if (!applet_frame) {
    return false;
  }
  if (isInIframe) {
    // Tell the device we're done
    if (isXNETHost()) {
      // We're running in XNet, use PostMessage to send request to iframe containing the applet
      const json_data = {
        messageType: 'APDPinPadDeviceRequest',
        RequestorID: getXNETHostFrameId(),
        APDRequest: 'APDInputEnd'
      };
      PostMessageToXnetFrame(json_data);
    }
  }

  _rno = null;
  _committed_receipt_id = null;
  _receiptpayment_id = null;
  _customerId = null;
  _companyId = null;
  _companyAgentId = null;
  _cardholder_addr = null;
  _cardholder_zip = null;
  _clientTransactionId = null;
  _orderId = null;
  _orderDescriptor = null;
  _orderAmount = null;
  _isDebitCard = false;
  _isRefund = false;
  _isManualEntry = false;

  APDSetInfoMessage = null;
  APDSetErrorMessage = null;
  newCardFromAPD = null;
  applet_frame.APDInputEnd(); // cleanup
}

function doStartDeviceInput() {
  // Pass the request to the page to send on to applet
  if (isXNETHost()) {
    // We're running in XNet, use PostMessage to send request to iframe containing the applet
    const json_data = {
      messageType: 'APDPinPadDeviceRequest',
      RequestorID: getXNETHostFrameId(),
      APDRequest: 'APDInputStart',
      callerKey,
      isManualEntry: _isManualEntry,
      clientTransactionId: _clientTransactionId,
      orderId: _orderId,
      orderDescriptor: _orderDescriptor,
      orderAmount: _orderAmount,
      isRefund: _isRefund,
      isDebitCard: _isDebitCard,
      isWalletSave: _isWalletSave,
      rno: _rno,
      customerId: _customerId,
      companyId: _companyId,
      companyAgentId: _companyAgentId,
      cardholderAdr: _cardholder_addr,
      cardholderZip: _cardholder_zip,
      committedReceiptId: _committed_receipt_id,
      receiptPaymentId: _receiptpayment_id
    };
    PostMessageToXnetFrame(json_data);
  } else {
    applet_frame.APDInputStart(
      APDStatusCallback,
      callerFn,
      callerKey,
      _isManualEntry,
      _clientTransactionId,
      _orderId,
      _orderDescriptor,
      _orderAmount,
      _isRefund,
      _isDebitCard,
      _isWalletSave,
      _rno,
      _customerId,
      _companyId,
      _companyAgentId,
      _cardholder_addr,
      _cardholder_zip,
      _committed_receipt_id,
      _receiptpayment_id);
  }
}

export function APDInputStart(isManualEntry, isDebitCard) {
  if (!applet_frame) {
    APDSetErrorMessage('Unable to initialize ACTIVE Net Workstation Service.');
    return false;
  }

  if (typeof isManualEntry !== 'undefined') {
    _isManualEntry = isManualEntry;
  }

  if (typeof isDebitCard !== 'undefined') {
    _isDebitCard = isDebitCard;
  }

  if (_isManualEntry) {
    APDSetInfoMessage('Waiting for credit card number to be keyed in ...');
  } else {
    APDSetInfoMessage('Please swipe the card...');
  }
  /* Wait a second to give the dialog time to be positioned
     and status message displayed before call to library*/
  setTimeout(() => {
    doStartDeviceInput();
  }, 500); // 1/2 second
}


function APDInputReset(
  fn,
  key,
  clientTransactionId,
  orderId,
  orderDescriptor,
  orderAmount,
  isDebitCard,
  isRefund,
  isManualEntry,
  isWalletSave,
  rno,
  customer_id,
  company_id,
  company_agent_id,
  cardholder_addr,
  cardholder_zip,
  committed_receipt_id,
  receiptpayment_id,
  resetCallback) {
  callerFn = fn;
  callerKey = key;
  if (rno != null && typeof(rno) !== 'undefined') {
    _rno = rno;
    _committed_receipt_id = committed_receipt_id;
    _receiptpayment_id = receiptpayment_id;
    _customerId = customer_id;
    _companyId = company_id;
    _companyAgentId = company_agent_id;
    if (cardholder_addr != null && typeof(cardholder_addr) !== 'undefined') {
      _cardholder_addr = cardholder_addr;
    }
    if (cardholder_zip != null && typeof(cardholder_zip) !== 'undefined') {
      _cardholder_zip = cardholder_zip;
    }
  }
  _clientTransactionId = clientTransactionId;
  _orderId = orderId;
  _orderDescriptor = orderDescriptor;
  _orderAmount = orderAmount;
  _isDebitCard = isDebitCard;
  _isRefund = isRefund;
  _isManualEntry = isManualEntry;
  _isWalletSave = isWalletSave;

  if (resetCallback && typeof resetCallback === 'function') {
    resetCallback();
  }
}

export function init(payInfo) {
  const clientTransactionId = randomUUID();
  APDSetInfoMessage = payInfo.methods.updateMessage;
  APDSetErrorMessage = payInfo.methods.updateErrMsgAndEnableFailBtns;
  newCardFromAPD = payInfo.methods.newCardFromAPD;

  if (!applet_frame) {
    if (isInIframe) {
      if (!isXNETHost()) {
        /* ANE-14240 If applet iframe not found then insert it now.
           If we're executing in a popup window then this is necessary.
           For main window the applet iframe is in the tab frame.*/
        applet_frame = findFrame('APDInterface');

        if (!applet_frame || applet_frame == null) {
          const APDInterfacePath = `${rootUrl}/APDInterface.sdi`;
          const iframeDomStr = `<iframe id="APDInterface" name="APDInterface" style="width:0;height:0;" scrolling="no" frameborder="0" src="${APDInterfacePath}"></iframe>`;
          // We must be in a popup window, inject the applet into an iframe
          const div = document.createElement('div');
          div.innerHTML = iframeDomStr;
          document.body.appendChild(div);
          // Set delay to give iframe contents time to load, then try this call again
          APDSetInfoMessage('Initializing device...');
          setTimeout(() => {
            init(payInfo);
          }, 4000);

          return;
        }
      }
    } else {
      APDSetErrorMessage('Unable to initialize ACTIVE Net Workstation Service.');
    }
  }

  APDInputReset(
    deviceCallback,
    payInfo.requestKey,
    clientTransactionId,
    payInfo.orderId,
    payInfo.orderDescriptor,
    payInfo.orderAmount,
    payInfo.isDebitCard,
    payInfo.isRefund,
    false, // isManualEntry
    payInfo.isWalletSave, // isWalletSave
    payInfo.rno,
    payInfo.customerId,
    payInfo.companyId,
    payInfo.companyAgentId,
    payInfo.cardholderAddr,
    payInfo.cardholderZip,
    payInfo.committedReceiptId,
    payInfo.receiptPaymentId,
    APDInputStart);
}
