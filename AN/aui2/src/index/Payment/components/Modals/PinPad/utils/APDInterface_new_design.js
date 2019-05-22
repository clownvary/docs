import { randomUUID } from 'shared/utils/func';

/* eslint-disable */

var isBusy = false;
var AMSResponse = null;
var isReversingTransaction = false; //are we reversing swipe (undo) because of server-side error, or AVS validation didn't pass
var isFailedReverseTransaction = false;
var apdAppletLoadError = null;
var apdAppletInitialized = false;
var apdInitTimedOut = false;
var apdInitTimer = null;
var doAVS = false;
var isAVSFailed = false;
var originalAMSTransactionId = null;
var isCapturePending = false;
var retryReverseTransactionAttempt = 0;
var clientTransactionId = null;
var updateMessage = null;
var updateErrMsgAndEnableFailBtns = null;

var paymentInfo = null;
var paymentInitInfo = {
  rno: null,
  committedReceiptId: null,
  receiptPaymentId: null,
  customerId: null,
  companyId: null,
  companyAgentId: null,
  cardholderAddr: null,
  cardholderZip: null,
  orderId: null,
  orderDescriptor: null,
  orderAmount: null,
  isDebitCard: false,
  isRefund: false,
  isManualEntry: false
};

var isWalletSave = false; //It is always false for facility redesign, maybe it will be controlled by setting some other day.

export function init(payInfo) {
  updateMessage = payInfo.methods.updateMessage;
  updateErrMsgAndEnableFailBtns = payInfo.methods.updateErrMsgAndEnableFailBtns;
  paymentInfo = Object.assign({}, paymentInitInfo, payInfo);
  APDInputStart();
}

export function APDInputEnd() {
  isBusy = false;
  AMSResponse = null;
  isReversingTransaction = false;
  isFailedReverseTransaction = false;
  apdAppletLoadError = null;
  apdAppletInitialized = false;
  apdInitTimedOut = false;
  apdInitTimer = null;
  doAVS = false;
  isAVSFailed = false;
  originalAMSTransactionId = null;
  isCapturePending = false;
  retryReverseTransactionAttempt = 0;
  clientTransactionId = null;
  updateMessage = null;
  updateErrMsgAndEnableFailBtns = null;
  paymentInfo = null;
  return;
}

export function APDInputStart(isManualEntry, isDebitCard) {
  if (typeof isManualEntry != 'undefined') {
    paymentInfo.isManualEntry = isManualEntry;
  }

  if (typeof isDebitCard != 'undefined') {
    paymentInfo.isDebitCard = isDebitCard;
  }

  if (isBusy) {
    updateMessage('Busy processing another card');
  }
  clientTransactionId = randomUUID();
  isBusy = true;
  AMSResponse = null;
  isReversingTransaction = false;
  isFailedReverseTransaction = false;

  doAppletRequest();
}

function isAppletReady() {
  var iResult = false;
  apdAppletLoadError = null;

  try {
    iResult = document.APDInterfaceApplet.APDIsReady();
    if (iResult) {
      apdAppletInitialized = true;
      return true;
    }
  } catch (err) {
    apdAppletLoadError = err.message;
  }

  apdAppletInitialized = false;
  return false;
}

function doInit() {
  apdInitTimedOut = false;
  apdInitTimer = null;

  if (isAppletReady()) {
    return true;
  } else {
    //Start the timer to wait some more for applet status
    apdInitTimer = setTimeout(function() {
      checkAppletLoadTimeout();
    }, 4000); // 4 seconds
    // Start timer for total time to wait for applet initialization
    setTimeout(function() {
      initTimeout();
    }, 30000); // total init time should be within 30 seconds
  }
}

function initTimeout() {
  if (apdAppletInitialized) return;

  apdInitTimedOut = true;
  apdInitTimer = null;

  if (apdAppletLoadError) {
    APDSetErrorMessage('Unable to initialize applet: ' + apdAppletLoadError);
  } else {
    APDSetErrorMessage('Unab le to initialize applet');
  }
}

function checkAppletLoadTimeout() {
  apdInitTimer = null;

  if (isAppletReady()) {
    doAppletRequest();
    return;
  }

  if (!apdInitTimedOut) {
    //Restart the timer to wait some more for applet status
    apdInitTimer = setTimeout(function() {
      checkAppletLoadTimeout();
    }, 4000); // 4 seconds
  }
}

function APDSetErrorMessage(msg) {
  isBusy = false;
  updateErrMsgAndEnableFailBtns(msg);
}

// Make applet request to get input from Active Payment Device library.
function doAppletRequest() {
  if (!isAppletReady()) {
    if (!doInit()) {
      return false;
    }
  }

  // Make sure we're still logged in to the server and have a valid receipt.
  try {
    updateMessage('Verifying server session status...');

    paymentInfo.methods.checkAPDServerStatus(({ logged_on, receipt_valid }) => {
      var validSession = isWalletSave ? logged_on : logged_on && receipt_valid;

      if (validSession) {
        doAppletCardInputRequest();
      } else {
        paymentInfo.methods.clearPinpad();
      }
    }, () => {
      paymentInfo.methods.clearPinpad();
    });
  } catch (err) {
    paymentInfo.methods.clearPinpad();
  }
}

// Abnormal error, notify client so they can exit
function exitRequest(err) {
  if (err) {
    alert(err);
  }

  paymentInfo.methods.newCardFromAPD();
  isBusy = false;
}

function doAppletCardInputRequest() {
  if (paymentInfo.isManualEntry) {
    updateMessage('Waiting for credit card number to be keyed in ...');
  } else {
    updateMessage('Please swipe the card...');
  }

  // Set timeout to call requestInput. Fixes issue in some browsers where info message doesn't display if immediately request input.
  setTimeout(function() {
    requestInput();
  }, 100);
}


function requestInput() {
  var amsResponse = null;
  var clientRequest = null;
  var isDebitCard = paymentInfo.isDebitCard;
  var userErrorMsg = '';
  var amsResultCode = null;
  var pinpadType = paymentInfo.pinpadType;
  try {
    // make sure we use the unique client transaction id each request.
    clientRequest = initClientRequest(true, paymentInfo.isManualEntry);
    doAVS = false;
    isAVSFailed = false;

    if (pinpadType != 2) {
      // Check if we need to do address verification (unless using Moneris pinpad, the AMS Moneris ActivePinPad library doesn't support AVS)
      doAddressVerify(clientRequest);
    }

    // Send the request to the ACTIVE Payment Device library now (via applet and JNI bridge) and get response
    if (isWalletSave) {
      amsResponse = clientRequest.processAPDWalletSave();
    } else if (paymentInfo.isRefund) {
      amsResponse = clientRequest.processAPDRefund(isDebitCard);
    } else {
      if (doAVS) {
        amsResponse = clientRequest.processAPDAuth();
      } else {
        amsResponse = clientRequest.processAPDPayment(isDebitCard);
      }
    }
  } catch (err) {
    if (!amsResponse) {
      APDSetErrorMessage('Exception getting input from device:' + err.message);
    } else {
      APDSetErrorMessage('Input exception: ' + err.message + '. \nReversing card transaction now...');
      // log the AMS request first.
      notifyServer(true, clientRequest, amsResponse, false, false, false, function() {}, function() {});

      // Cancel the payment card swipe if necessary
      reverseTransaction(amsResponse.getAccountID(), amsResponse.getAMSTransactionID());
    }
    return;
  }

  // if response is null, that means some error happend in AN side, the request has not been sent to AMS yet.
  if (!amsResponse) {
    APDSetErrorMessage('No response from AMS PinPad Payment Device library');
    return;
  }

  // if exception happen when get response from AMS, then save the request in AN side, and void the request in back end if necessary.
  if (amsResponse.getCallStatus() == null || amsResponse.getCallStatus() != '0') {
    APDSetErrorMessage('Bad call status in response. Reversing card transaction...');
    // log the AMS request first.
    notifyServer(true, clientRequest, amsResponse, false, false, false, function() {}, function() {});
    // Cancel the payment card swipe if necessary
    reverseTransaction(amsResponse.getAccountID(), amsResponse.getAMSTransactionID());
    return;
  }

  // Process the response from the device
  try {
    // AMS ActivePinPad library (used for Moneris) doesn't respect TenderType, we may be expecting debit card but get credit card (or vice versa).
    updateCardTypeWhenProcess(clientRequest, amsResponse);

    // Process the response
    userErrorMsg = amsResponse.getUserErrorMessage();
    if (userErrorMsg && userErrorMsg != 'Approved') {
      APDSetErrorMessage(userErrorMsg);

      if (paymentInfo.rno != 0) { // no receipt number if invoked from APDTest.html
        // Error, write to server icverifylog
        amsResultCode = parseInt(amsResponse.getTransactionResultCode());
        if (!isNaN(amsResultCode) && amsResultCode > 0 && amsResponse.getLastFourDigits().length) {
          notifyServer(true, clientRequest, amsResponse, false, false, false, function() {}, function() {});
        }
      }

      return;
    }

    // Debit card not allowed for future payments
    if (isWalletSave && paymentInfo.isDebitCard) {
      doNotifyCaller(amsResponse, paymentInfo.requestKey, 'Debit card cannot be used for future charges. Please input a valid credit card.');
      isBusy = false;
      return;
    }

    updateMessage('Please wait, while we process your transaction...');

    if (doAVS) {
      if (amsResponse.getCCGAVSAddress() == 'N' || amsResponse.getCCGAVSZIP() == 'N') {
        isAVSFailed = true;
      } else {
        isCapturePending = true;
      }
    }

    if (isWalletSave) {
      // Success, send Ajax request to server with data.
      // Once server has been sucessfully notified, doNotifyCaller will be called.
      notifyServer(!!doAVS, clientRequest, amsResponse, false, false, false, handleServerNotifySuccess, function() {});
    } else if (paymentInfo.rno != 0) { // no receipt number if invoked from APDTest.html
      // Success, send Ajax request to server with data. If didn't just do AUTH for AVS verification then server will
      // process the payment or credit, otherwise server will process the payment when get subsequent notify after CAPTURE.
      // Once server has been sucessfully notified, doNotifyCaller will be called.
      notifyServer(!!doAVS, clientRequest, amsResponse, false, false, false, handleServerNotifySuccess, handleServerNotifyError);
    } else {
      isBusy = false;
    }

  } catch (err) {
    // Handle error, void the card transaction now
    handleServerError('Error processing card: ' + err.message)
  }
}

function notifyServer(logOnly, clientRequest, amsResponse, isAvsFailVoid, isAuthCapture, isReverseTransaction, fnOnSuccess, fnOnError) {
  var ccExpYear = '';
  var ccExpMonth = '';
  var isError = false;
  var cardNum = '';
  var url = '';
  var userErrorMsg = '';
  var params = null;

  try {
    isReversingTransaction = isReverseTransaction;
    AMSResponse = amsResponse;
    if (originalAMSTransactionId == null) {
      originalAMSTransactionId = amsResponse.getAMSTransactionID();
    }

    try {
      ccExpYear = amsResponse.getCCExpYear();
      ccExpMonth = amsResponse.getCCExpMonth();
    } catch (e) {}

    userErrorMsg = amsResponse.getUserErrorMessage();

    if (userErrorMsg && userErrorMsg != 'Approved') {
      isError = true;
    }

    if (cardNum = amsResponse.getLastFourDigits()) {
      cardNum = 'xxx' + cardNum;
    }

    params = {
      key: paymentInfo.requestKey,
      error: isError,
      receiptId: paymentInfo.receiptId,
      orderId: paymentInfo.orderId,
      resultCode: amsResponse.getTransactionResultCode(),
      logOnly: logOnly,
      rno: paymentInfo.rno,
      ctr: amsResponse.getMerchantCTR(),
      ccgCSC: amsResponse.getCCGCSC(),
      clientTrxId: clientTransactionId,
      ccgAuthCode: amsResponse.getCCGAUTHCode(),
      authCaptured: isAuthCapture,
      avsFailed: isAvsFailVoid,
      ccgResultCode: amsResponse.getCCGResultCode(),
      ccAVSZip: amsResponse.getCCGAVSZIP(),
      cardNum: cardNum,
      ccgAVSAddress: amsResponse.getCCGAVSAddress(),
      batchId: paymentInfo.batchId,
      apdDeviceType: paymentInfo.pinpadType,
      ccExpYear: ccExpYear,
      ccExpMonth: ccExpMonth,
      tenderType: clientRequest.getTenderType(),
      transactionMessage: userErrorMsg,
      originalAMSTransactionId: originalAMSTransactionId,
      receiptPaymentId: paymentInfo.receiptPaymentId,
      amsTransactionId: amsResponse.getAMSTransactionID(),
      transactionType: clientRequest.getTransactionType(),
      amsAccountId: amsResponse.getAccountID() || '',
      cardType: amsResponse.getCardType(),
      receiptHeaderId: paymentInfo.receiptHeaderId,
      refund: paymentInfo.isRefund,
      amount: paymentInfo.orderAmount,
      companyAgentId: paymentInfo.companyAgentId,
      walletSave: isWalletSave,
      debitCard: paymentInfo.isDebitCard,
      customerId: paymentInfo.customerId,
      companyId: paymentInfo.companyId,
      failedReverseTransaction: isFailedReverseTransaction
    }

    paymentInfo.methods.processAPDResponse(params, fnOnSuccess, fnOnError);
  } catch (err) {
    handleServerError('Exception submitting processAPDResponse request: ' + err.message + '. Please try again.');
  }
}

function handleServerNotifySuccess({ server_error, server_message, key }) {
  // If server returned processing error then handle it (the transaction will be voided)
  if (server_error) {
    handleServerError(server_error);
    isBusy = false;
    return;
  }

  if (server_message) {
    if (isFailedReverseTransaction) {
      // All done
      exitRequest(server_message);
      return;
    }
    updateMessage(server_message);
  }

  if (isReversingTransaction) {
    // Successfully notified server of reversed transaction, nothing more to do here. Return and wait for next swipe.
    isReversingTransaction = false;
    isBusy = false;
    return;
  }

  if (isWalletSave) {
    doNotifyCaller(AMSResponse, key);
    isBusy = false;
    return;
  }

  // If AVS is enabled then initial transaction was an AUTH. If AVS succeeded then capture payment otherwise void the auth.
  if (doAVS) {
    doAVS = false;
    if (isAVSFailed) {
      // Cancel the payment card swipe
      reverseTransaction(AMSResponse.getAccountID(), AMSResponse.getAMSTransactionID());
    } else if (isCapturePending) {
      // AVS succeeded , capture the payment now
      doAppletCaptureRequest(AMSResponse.getAccountID(), AMSResponse.getAMSTransactionID());
    } else {
      APDSetErrorMessage('Unknown status pending');
    }
    return;
  }

  // If AVS failed then this is response from server notification of the void, show error to user
  if (isAVSFailed) {
    if (paymentInfo.avsZip) {
      APDSetErrorMessage('Cardholder zip code verification failed');
    } else {
      APDSetErrorMessage('Cardholder address verification failed');
    }
    return;
  }

  doNotifyCaller(AMSResponse, key);
  isBusy = false;
}

function handleServerNotifyError() {
  handleServerError('See server log for details.')
}

function doNotifyCaller(amsResponse, key, error) {
  // Pass data, including wallet id to caller callback
  if (error) {
    APDSetErrorMessage(error);
  } else {
    let cardDigits = amsResponse.getLastFourDigits();
    let authCode = amsResponse.getCCGAUTHCode();
    let cardType = amsResponse.getCardType();
    cardDigits = cardDigits.length ? '**** ' + cardDigits : '';
    let transactionDescription = cardType + ' ' + cardDigits + ',Auth # ' + authCode
    paymentInfo.methods.newCardFromAPD(transactionDescription);
  }
}

//Reverse a transaction
function reverseTransaction(amsWalletId, amsReferenceNumber) {
  var transactionType = !paymentInfo.isRefund ? 'payment' : 'refund';
  var error = null;
  var exceptionError = '';
  retryReverseTransactionAttempt = 0;

  while (true) {
    error = doReverseTransaction(amsWalletId, amsReferenceNumber, transactionType);
    if (!error) { //Success
      return true;
    }

    APDSetErrorMessage('Unable to reverse ' + transactionType + ': ' + error);

    if (paymentInfo.rno != 0) {
      try {
        // Error, write to server icverifylog
        if (error.toLowerCase().indexOf('cancelled') >= 0) {
          if (retryReverseTransactionAttempt < 2) {
            APDSetErrorMessage('Please do not cancel PIN Pad prompts trying to reverse transaction. The transaction must be reversed in order to avoid a double ' + transactionType + '. Trying again to reverse the transaction...Trying again to reverse card transaction ...');
            continue;
          }
        }
      } catch (err) {
        exceptionError = 'Exception in doReverseTransaction: ' + err.message;
      }

      // Give up
      APDSetErrorMessage(exceptionError + 'Unable to reverse previous ' + transactionType + ' attempt: ' + error + ', customer account should be manually adjusted.\nPlease try ' + transactionType + ' again.');
      return;
    }
  }
}

function doReverseTransaction(amsWalletId, amsReferenceNumber, transactionType) {
  var errorMsg = '';
  var clientRequest = null;
  var amsResponse = null;
  var userErrorMsg = '';
  var errorMsg = '';
  var isDebitCard = paymentInfo.isDebitCard;

  isFailedReverseTransaction = false;
  // First try to void the transaction
  try {
    // Call applet method to initialize request object
    clientRequest = initClientRequest(false, paymentInfo.isManualEntry);
    // Send the request to the ACTIVE Payment Device library now (via applet and JNI bridge) and get response
    clientRequest.setAccountID(amsWalletId);
    clientRequest.setReferenceID(amsReferenceNumber);
    amsResponse = clientRequest.processAPDVoid(isDebitCard);

    if (!amsResponse) {
      errorMsg = 'No response from device library for request to reverse payment by voiding';
    } else if ((userErrorMsg = amsResponse.getUserErrorMessage()) && userErrorMsg != 'Approved') {
      errorMsg = userErrorMsg;
    } else if (amsResponse.getCallStatus() == null || amsResponse.getCallStatus() != '0') {
      errorMsg = 'Invalid call status trying to void the transaction';
    }

    if (paymentInfo.rno != 0) { // no receipt number if invoked from APDTest.html
      try { // Log to icverifylog
        notifyServer(true, clientRequest, amsResponse, false, false, false, function() {}, function() {});
      } catch (err) {}
    }

    if (!errorMsg) { // Void was successful
      updateMessage('Success reversing ' + transactionType + ' [VOIDED]. Please try ' + transactionType + ' again.');
      isBusy = false;
      return false;
    }

    // If void was cancelled or timed out then continue on to try CREDIT instead
    if (errorMsg.toLowerCase().indexOf('cancelled') >= 0) {
      notifyServer(true, clientRequest, amsResponse, false, false, false, function() {}, function() {});
      retryReverseTransactionAttempt++;
      if (!paymentInfo.isRefund) {
        // We're going to fall through and try to do a CREDIT, tell the user to not try to cancel again
        updateMessage('Please do not cancel PIN Pad prompts trying to reverse transaction. The transaction must be reversed in order to avoid a double ' + (!paymentInfo.isRefund ? 'payment' : 'refund') + '.');
      }
    }
  } catch (err) {
    errorMsg = 'Error voiding ' + transactionType + ': ' + err.message;
  }

  // Void didn't work.
  // If it was a SALE then try to issue CREDIT through the pin pad. ANE-47827

  if (!paymentInfo.isRefund) {
    // Void of SALE failed, try to issue a CREDIT instead
    // Code lifted from requestInput and tweaked for this special usage.

    APDSetErrorMessage(errorMsg + '... trying to issue CREDIT to card instead...');

    errorMsg = null;
    amsResponse = null;
    clientRequest = null;

    try {
      // Call applet method to initialize request object
      clientRequest = initClientRequest(true, paymentInfo.isManualEntry);
      // Send the request to the ACTIVE Payment Device library now (via applet and JNI bridge) and get response
      amsResponse = clientRequest.processAPDRefund(isDebitCard);

    } catch (err) {
      errorMsg = 'Input exception: ' + err.message;
    }

    // if response is null, that means some error happend in AN side, the request has not been sent to AMS yet.
    if (!amsResponse) {
      errorMsg = 'No response from AMS PinPad Payment Device library';
    }

    if (!errorMsg) {
      if (amsResponse.getCallStatus() == null || amsResponse.getCallStatus() != '0') {
        errorMsg = 'Invalid call status trying to credit the card';
      }
    }

    if (!errorMsg) {
      if ((userErrorMsg = amsResponse.getUserErrorMessage()) && userErrorMsg != 'Approved') {
        errorMsg = userErrorMsg;
      }
    }

    if (!errorMsg) {
      // Process the response from the device
      try {
        // AMS ActivePinPad library (used for Moneris) doesn't respect TenderType, we may be expecting debit card but get credit card (or vice versa).
        updateCardTypeWhenProcess(clientRequest, amsResponse);
      } catch (err) {
        // Handle error, void the card transaction now
        handleServerError('Error applying ' + transactionType + ': ' + err.message);
      }
    }

    if (paymentInfo.rno != 0) { // no receipt number if invoked from APDTest.html
      try {
        // Log to icverifylog
        notifyServer(true, clientRequest, amsResponse, false, false, false, function() {}, function() {});
      } catch (err) {}
    }

    if (!errorMsg) {
      // Credit was successful
      APDSetErrorMessage('Success reversing ' + transactionType + '. Please try ' + transactionType + ' again.', 2);
      isBusy = false;
      return false;
    }
    if (errorMsg.toLowerCase().indexOf('cancelled') >= 0) {
      // Send 'logOnly' true
      notifyServer(true, clientRequest, amsResponse, false, false, false, function() {}, function() {});
      retryReverseTransactionAttempt++;
    }
  }

  if (amsResponse && amsResponse.getLastFourDigits()) {
    // ANE-41214 Notify the server of the error. If was payment reverse because of previous error then
    // send 'logOnly' FALSE so the server will post the payment as credit on customer account
    if (!paymentInfo.isRefund) {
      isFailedReverseTransaction = true;
      notifyServer(false, clientRequest, amsResponse, false, false, false, handleServerNotifySuccess, function() {});
      APDSetErrorMessage('Unable to reverse previous payment attempt....credit issued to customer account. Please try payment again.');
    } else {
      // Send 'logOnly' true
      notifyServer(true, clientRequest, amsResponse, false, false, false, function() {}, function() {});
      APDSetErrorMessage('Unable to reverse previous card refund attempt. Use Front Desk "Adjust Balance" function to debit customer account to remove $' + paymentInfo.orderAmount + ' balance on account.Unable to reverse previous refund attempt, ' + errorMsg + '; customer account should be manually adjusted.\nPlease try refund again.');
    }
  } else {
    APDSetErrorMessage('Unable to reverse previous ' + transactionType + ' attempt: ' + errorMsg + '. Please try ' + transactionType + ' again.');
  }

  // Failed to VOID and/or CREDIT, return error
  return errorMsg;
}

/*
 *  Make applet request to CAPTURE transaction through Active Payment Device library. Used for a credit card if AVS verification enabled
 *  and verification succeeded with initial AUTH request.
 */
function doAppletCaptureRequest(amsWalletId, amsReferenceNumber) {
  var amsResponse = null;
  var userErrorMsg = '';
  var amsResultCode = null;

  try {
    // Call applet method to initialize request object
    var clientRequest = initClientRequest(false, paymentInfo.isManualEntry);
    // Send the request to the ACTIVE Payment Device library now (via applet and JNI bridge) and get response
    clientRequest.setAccountID(amsWalletId);
    clientRequest.setReferenceID(amsReferenceNumber);
    amsResponse = clientRequest.processAPDCapture();

    if (!amsResponse) {

      APDSetErrorMessage('No response from ACTIVE Payment Device library for CAPTURE request');
      return;
    }

    userErrorMsg = amsResponse.getUserErrorMessage();
    // Process the response
    if (userErrorMsg && userErrorMsg != 'Approved') {

      APDSetErrorMessage(userErrorMsg);
      if (paymentInfo.rno != 0) { // no receipt number if invoked from APDTest.html
        // Error, write to server icverifylog
        amsResultCode = parseInt(amsResponse.getTransactionResultCode());
        if (!isNaN(amsResultCode) && amsResultCode > 0 && amsResponse.getLastFourDigits().length) {
          notifyServer(true, clientRequest, amsResponse, false, false, false, function() {}, function() {});
        }
      }

      return;
    } else {
      updateMessage(userErrorMsg + ' ... Processing capture ...')
    }

    if (paymentInfo.rno != 0) { // no receipt number if invoked from APDTest.html
      // Send Ajax request to server with data. If capture is for earlier AUTH for AVS verification then server will process the payment or credit.
      notifyServer(isCapturePending ? false : true, clientRequest, amsResponse, false, isCapturePending, false, handleServerNotifySuccess, handleServerNotifyError);
    } else {
      isBusy = false;
    }
  } catch (err) {
    APDSetErrorMessage('Error capturing payment: ' + err.message)
  }
}

/*
 * Handle error making Ajax request to notify server.
 * Unless we were already reversing a payment, send APD library a request to void the payment
 * since we couldn't apply it on the server.
 */
function handleServerError(error) {
  if (!AMSResponse) {
    return;
  }

  APDSetErrorMessage('Server error processing transaction: ' + error);

  if (isReversingTransaction) {
    // Error notifying server of reversed transaction, nothing more to do here. Return and wait for next swipe.
    isReversingTransaction = false;
    isBusy = false;
    return;
  }

  if (isWalletSave) {
    // Error notifying server of wallet save, nothing more to do
    isBusy = false;
    return;
  }

  APDSetErrorMessage('Reversing card transaction...Card transaction is being reversed now...');
  // Since the server got an error trying to apply the payment on the server, void the payment. User will need to retry.
  reverseTransaction(AMSResponse.getAccountID(), AMSResponse.getAMSTransactionID());
}

// Call applet method to initialize request object
function initClientRequest(isGenerateTransactionId, isSetManualEntry) {
  var clientRequest = null;
  // Call applet method to initialize request object
  clientRequest = document.APDInterfaceApplet.APDStartTransaction();

  clientRequest.setOrderID(paymentInfo.orderId);
  clientRequest.setOrderAmount(paymentInfo.orderAmount);
  clientRequest.setOrderDescriptor(paymentInfo.orderDescriptor);

  if (isGenerateTransactionId) {
    clientTransactionId = document.APDInterfaceApplet.generateClientId();
  }
  clientRequest.setClientTransactionID(clientTransactionId);

  if (isSetManualEntry) {
    clientRequest.setManualEntry(isSetManualEntry);
  }

  return clientRequest;
}

function doAddressVerify(clientRequest) {
  var isDebitCard = paymentInfo.isDebitCard;
  var isRefund = paymentInfo.isRefund;
  var avsFullAddr = paymentInfo.avsFullAddr;
  var cardholderAddr = paymentInfo.cardholderAddr;
  var avsZip = paymentInfo.avsZip;
  var cardholderZip = paymentInfo.cardholderZip;

  if (!isDebitCard && !isRefund && !isWalletSave) {
    if (avsFullAddr && cardholderAddr) {
      // site.verisignUseAvs() is enabled
      clientRequest.setCCAddress(cardholderAddr);
      doAVS = true;
    }

    if ((avsFullAddr || avsZip) && cardholderZip) {
      clientRequest.setCCZip(cardholderZip);
      doAVS = true;
    }
  }
}


//if we were expecting a credit card but got debit card (or vice versa), update the type.
function updateCardTypeWhenProcess(clientRequest, amsResponse) {
  var isUnexpectedCardtype = false;
  var cardType = amsResponse.getCardType();
  var isDebitCard = paymentInfo.isDebitCard;

  if ((isDebitCard && cardType != 'DEBIT' && cardType != 'Interac') || (!isDebitCard && (cardType == 'Interac' || cardType == 'DEBIT'))) {
    isUnexpectedCardtype = true;
    // Switch the tender type so server notification will have the right type
    paymentInfo.isDebitCard = isDebitCard = !isDebitCard;
    clientRequest.setTenderType(isDebitCard ? 'DEBIT' : 'CCRETAIL'); // tender types from APD*InterfaceApplet.java
  }
  // If card wasn't processed as the requested tender type then alert the user
  if (isUnexpectedCardtype) {
    updateMessage('Note: The input card was actually processed as a ' + (isDebitCard ? 'DEBIT' : 'CREDIT') + ' card.');
  }
}
