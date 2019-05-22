/* eslint-disable */
import DateTimeFormat from 'shared/utils/DateTimeFormat';

// Javascript code to generate a UUID (RFC4122 version 4 compliant)
export function randomUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
}

// //////////////////////////////////////////////////////////////////
//
//  Determine credit card types
//
// //////////////////////////////////////////////////////////////////
const cc_validation_visa = 1;
const cc_validation_mc = 2;
const cc_validation_amex = 3;
const cc_validation_diners = 4;
const cc_validation_discover = 5;
const cc_validation_jcb = 6;

const cc_validation_to_card_type = ['1', '5', 'Visa', '1', '3', 'Visa', '2', '2', 'MasterCard', '3', '4', 'American Express',];

export function cardValidation(cc) {
  // remove all space in the credit card number
  cc = cc.replace(/\s/g, '');
  if (masterCard(cc)) return cc_validation_mc;
  if (amexCard(cc)) return cc_validation_amex;
  if (visaCard(cc)) return cc_validation_visa;
  if (dinersCard(cc)) return cc_validation_diners;
  if (discoverCard(cc)) return cc_validation_discover;
  if (jcbCard(cc)) return cc_validation_jcb;
  return 0;
}

function masterCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length != 16) return false;
  return cc.indexOf('51') == 0
    || cc.indexOf('52') == 0
    || cc.indexOf('53') == 0
    || cc.indexOf('54') == 0
    || cc.indexOf('55') == 0;
}

function amexCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length != 15) return false;
  return cc.indexOf('34') == 0
    || cc.indexOf('37') == 0;
}

function visaCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length != 13 && cc.length != 16) return false;
  return cc.indexOf('4') == 0;
}

function dinersCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length != 14) return false;
  return cc.indexOf('300') == 0
    || cc.indexOf('301') == 0
    || cc.indexOf('302') == 0
    || cc.indexOf('303') == 0
    || cc.indexOf('304') == 0
    || cc.indexOf('305') == 0
    || cc.indexOf('36') == 0
    || cc.indexOf('38') == 0;
}

function discoverCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length != 16) return false;
  return cc.indexOf('6011') == 0
    || cc.indexOf('622') == 0
    || cc.indexOf('64') == 0
    || cc.indexOf('65') == 0;
}

function jcbCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length == 16 && cc.indexOf('3') == 0) return true;
  if (cc.length != 15) return false;
  return cc.indexOf('2131') == 0 || cc.indexOf('1800') == 0;
}

function validChecksum(my_cc_number) {
  let check_sum = 0;
  let odd_toggle = false;
  let i = 0;
  let digit;
  for (i = my_cc_number.length - 1; i >= 0; i--, odd_toggle = !odd_toggle) {
    digit = parseInt(my_cc_number.charAt(i), 10);
    if (isNaN(digit)) return false;
    if (odd_toggle) {
      if (digit * 2 > 9) {
        check_sum += 1 + (digit * 2) % 10;
      } else {
        check_sum += digit * 2;
      }
    } else {
      check_sum += digit;
    }
  }
  return (check_sum % 10) == 0;
}

function isInteger(elemVal) {
  for (let i = 0; i < elemVal.length; i++) {
    if (isNaN(parseInt(elemVal.charAt(i)))) {
      return false;
    }
  }
  return true;
}

function validExpiryValue(expiry_value, msg, field, pastAllowed) {
  const result = { validate: true, msg: '' };

  if (expiry_value.length == 0) {
      // return true;
    return result;
  }


  let month = 0;
  let year = 0;
  let index;
  if ((index = expiry_value.indexOf('/')) > 0) {
    if ((index != 1 && index != 2) || index + 1 >= expiry_value.length || expiry_value.lastIndexOf('/') != index) {
            // alert(msg+' contains invalid date');
            // return false;
      result.validate = false;
      result.msg = `${msg} contains invalid date.`;
      return result;
    }
    month = expiry_value.substring(0, index);
    year = expiry_value.substring(index + 1);
  } else if (expiry_value.length == 3 || expiry_value.length == 5) {
    month = expiry_value.substring(0, 1);
    year = expiry_value.substring(1);
  } else if (expiry_value.length == 4 || expiry_value.length == 6) {
    month = expiry_value.substring(0, 2);
    year = expiry_value.substring(2);
  } else {
            // alert(msg+' contains invalid date');
            // return false;
    result.validate = false;
    result.msg = `${msg} contains invalid date.`;
    return result;
  }

  if (!isInteger(month) || isNaN(parseInt(month)) || month < 1 || month > 12) {
        // alert(msg+' month is invalid');
        // return false;
    result.validate = false;
    result.msg = `${msg} month is invalid.`;
    return result;
  }

  if (!isInteger(year) || isNaN(parseInt(year))) {
        // alert(msg+' year is invalid');
        // return false;
    result.validate = false;
    result.msg = `${msg} year is invalid.`;
    return result;
  }

  if (year.length == 2) year = `20${year}`;

  const this_year = DateTimeFormat.getServerTodayDate().getFullYear();
  if (year > this_year + 10) {
        // alert(msg+' year is more than 10 years in the future');
        // return false;
    result.validate = false;
    result.msg = `${msg} year is more than 10 years in the future.`;
    return result;
  }

  if (field && field.value != null && typeof (field) !== 'undefined') {
    field.value = `${(month.length == 1 ? '0' : '') + month}/${year}`;
  }

  if (month == 12) {
    month = 0;
    year++;
  }

  const expdate = new Date();
  expdate.setFullYear(year, month, 1); // first day of month following expiration
  if (!pastAllowed) {
    if (expdate < DateTimeFormat.getServerTodayDate()) {
            // alert(msg+' is in the past');
            // return false; // expiration date is in the past
      result.validate = false;
      result.msg = `${msg} is in the past.`;
      return result;
    }
  }

    // return true;
  return result;
}

export function generateCCWalletIDFromEncryptedInput(ccexp, ccaccountholder, ccaccountzip, ccmasked, enctrack2, enctrack1, encmp, encmpstatus, encksn, enccardtype, encblocktype, enccsc, fnNotificationCallback, requestKey) {
  const result = { validate: true, msg: '' };
    // Do validations
  if (ccexp == null || ccexp.length == 0) {
        // alert('Error: Card data is missing expiration date');
        // return true; // done
    result.validate = false;
    result.msg = 'Error: Card data is missing expiration date.';
    return result;
  }
  const validExpiryValueResult = validExpiryValue(ccexp, 'Card Expiration');
  if (!validExpiryValueResult.validate) return validExpiryValueResult;

    // if(!validExpiryValue(ccexp,'Card Expiration')) return true;

    //  Need the account holder
  if (ccaccountholder.length == 0) {
        // alert('Card data missing account holder name');
        // return true; // done
        // alert('Warning: Card data is missing account holder name. Please swipe a different card if you do not wish to accept this card.');
        // continue on, servlet generateAMSAccountId will use payer custome rname
    result.validate = true;
    result.msg = 'Card data is missing account holder name. Please swipe a different card if you do not wish to accept this card.';
    return result;
  }
    // if(fnNotificationCallback){
    //   fnNotificationCallback();
    // }
    // return false; // not done yet, waiting for response. walletIDCallback will process.
  return result;
}

let _addedSecureWalletIframe = false;
let _waitingForSecureWalletIframeLoad = false;

export const doGetSecureWalletFromEncryptedDeviceInput = (
  enctrack2, enctrack1, encmp, encmpstatus, encksn, enccardtype,
  encblocktype, enccsc, ccexp, ccaccountzip, ccaccountholder, AMSWalletIDCallback, requestKey
) => {
	// Send the request to the AMS dll. Call method in the ANET SecureWallet page. That page will call the client-side AMS dll to get a wallet ID.
	try {
    // Find the iframe that contains the SecureWallet applet
    var applet_frame = findFrame("secure_wallet_interface");
    if (typeof(applet_frame)!='undefined' && applet_frame != null) {
      _waitingForSecureWalletIframeLoad = false;
      applet_frame.getSecureWalletFromEncryptedDeviceInput(
        AMSWalletIDCallback, enctrack2, enctrack1,
        encmp, encmpstatus, encksn,
        enccardtype, encblocktype, enccsc,
        ccexp, ccaccountzip, ccaccountholder,
        requestKey, new Date().getTime()
      );
      return;
    }
      // Iframe not found, we must be in a popup window.
    if (!_addedSecureWalletIframe) {
      // Have not done it yet so inject the SecureWalletApplet page into a new iframe in the popup window
      var el = $("<iframe id='secure_wallet_interface' name='secure_wallet_interface' style='width:0;height:0;' scrolling='no' frameborder='0' src='SecureWalletInterface.sdi'></iframe>");
      $("body").append(el);
      _addedSecureWalletIframe = true;
      _waitingForSecureWalletIframeLoad = true;
      // Set short delay to give iframe contents time to load, then try this call again
      setTimeout(function() {
        doGetSecureWalletFromEncryptedDeviceInput(
          enctrack2, enctrack1, encmp, encmpstatus, encksn, enccardtype,
          encblocktype, enccsc, ccexp, ccaccountzip, ccaccountholder,
          AMSWalletIDCallback
        );
      }, 2000); // 2 seconds
      // Set longer timer for total time to wait for the iframe to load
      setTimeout(function() {
        if (_waitingForSecureWalletIframeLoad) {
          alert("Timeout waiting for secure_wallet_interface frame to load");
        }
        _waitingForSecureWalletIframeLoad=false;
      }, 20000); // 20 seconds
    } else if (_waitingForSecureWalletIframeLoad) {
      // Still waiting for applet to load in the new injected iframe, set short timer again to wait a bit longer and then try this call again
      setTimeout(function() {
        doGetSecureWalletFromEncryptedDeviceInput(
          enctrack2, enctrack1, encmp, encmpstatus, encksn, enccardtype,
          encblocktype, enccsc, ccexp, ccaccountzip, ccaccountholder,
          AMSWalletIDCallback
        );
      }, 2000); // 2 seconds
    } else {
      // Already tried to load applet in new iframe and waited for 20 seconds before gave up
      alert("secure_wallet_interface frame not found");
    }
  } catch(err){
    alert("Error trying to get wallet ID for card: " + err.description);
  }
}

export const isDisableMagtekPCIEnhancement = () => (window.__payment__.__initialState__.disableMagtekPCIEnhancement || false);

export const retrieveCommunicationIframe = () => {
  if (!isDisableMagtekPCIEnhancement()) {
    return;
  }
  const appletFrame = findFrame("magtekdeviceinterface");
  if (!appletFrame) {
    console.log("[AUI Redesign]: Injecting magtekdeviceinterface iframe to load applet in window.");
    const el = $("<iframe id='magtekdeviceinterface' name='magtekdeviceinterface' style='visibility:hidden;width:0;height:0;' scrolling='no' frameborder='0' src='magtekDeviceInterface.sdi'></iframe>");
    $("body").append(el);
  }
}
