/* eslint-disable */
/* global getXNETHostFrameId, PostMessageToXnet */

import DateTimeFormat from 'shared/utils/DateTimeFormat';
import {
  cardValidation,
  generateCCWalletIDFromEncryptedInput,
  isDisableMagtekPCIEnhancement,
  doGetSecureWalletFromEncryptedDeviceInput
} from '../../../../utils/magtekFun';

import {
  getValidCardTypeId,
  maskCard
} from '../../../../utils/creditCardHelper';

const MagTekCabMSR = function (setCradInfo, generateWalletID, cardTypeList, reciveAMSWalletIDCallback) {
  let magtek_device_open = false;
  let initialized = false;
  let initialize_timeout = false;

  let _request_key = '';
  let _encTrack2 = '';
  let _encMP = '';
  let _encMPStatus = '';
  let _encKSN = '';
  let _encCardType = '';
  let _encBlockType = '';
  let _encCCExpiry = '';
  let _encAccountHolder = '';
  let _encAccountZip = '';
  let _CcNumMasked = '';
  let _AMSWalletID = '';
  let _CcCardType = 0;

  let fnStatusCallback = null;
  let fnFormCallback = null;
  let ccFormKey = null;
  let magtek_init_timer = null;
  let last_error_msg = '';

  let _cardInfo = {};
  let _warnInfo = '';

  return {
    /*
     *  This is the function that callers should use to get card swipe from user
     */
    deviceInputStart(fnStatus, fnData, key) {
      fnStatusCallback = fnStatus;
      fnFormCallback = fnData;
      ccFormKey = key;

      _encTrack2 = '';
      _encMP = '';
      _encMPStatus = '';
      _encKSN = '';
      _encCardType = '';
      _encBlockType = '';
      _encCCExpiry = '';
      _encAccountHolder = '';
      _encAccountZip = '';
      _AMSWalletID = '';
      _CcNumMasked = '';
      _CcCardType = 0;
      _warnInfo = '';

      // Check if the applet/device has already been initialized
      if (!magtek_device_open) {
        if (!initialized && (initialize_timeout || !this.GetDeviceState())) {
          this.magTekSetErrorMessage('Unable to initialize MagTek USBHID library or communicate with device.');
          return;
        }
        this.magTekSetInfoMessage('Opening device...');
        this.OpenDevice();
      }
      if (magtek_device_open) {
        this.magTekSetInfoMessage('Please swipe the card...'); // tell user that card can be swiped again
      }
    },

    /*
     *  Called to clean up after input sucessfully received or function cancelled
     */
    deviceInputEnd() {
      fnStatusCallback = null;
      fnFormCallback = null;
      ccFormKey = null;

      _encTrack2 = '';
      _encMP = '';
      _encMPStatus = '';
      _encKSN = '';
      _encCardType = '';
      _encBlockType = '';
      _encCCExpiry = '';
      _encAccountHolder = '';
      _encAccountZip = '';
      _AMSWalletID = '';
      _CcNumMasked = '';
      _CcCardType = 0;

      if (magtek_device_open) {
        this.CloseDevice();
      }
    },

    /*
     *  Function that callers should use to get current status message.
     */
    getStatusMessage() {
      if (magtek_device_open) {
        return 'Please swipe the card...';
      }
      if (last_error_msg.length > 0) return last_error_msg;
      if (!magtek_device_open) {
        // return 'Opening device...';
        this.magTekSetInfoMessage('Opening device...');
      }
      return '';
    },

    magTekSetErrorMessage(msg) {
      last_error_msg = '';
      // Pass status to caller
      if (typeof (fnStatusCallback) === 'undefined' || fnStatusCallback == null) return;
      fnStatusCallback(1, msg);  // status 1 == error
    },

    magTekSetInfoMessage(msg) {
      last_error_msg = msg;
      // Pass status to caller
      if (typeof (fnStatusCallback) === 'undefined' || fnStatusCallback == null) return;
      fnStatusCallback(2, msg);  // status 2 == info
    },

    processCardData() {
      _request_key = ''; // it's a new swipe, clear the previous request key in case reply to earlier request comes in while processing new swipe
      let PAN = '';
      let cc_exp_month = null;
      let cc_exp_year = null;
      let cardholder_name = null;

      const device = document.getElementById('USBHID');

      // First try to get PAN and expiration data by parsing Track2 data (refer to http://en.wikipedia.org/wiki/Magnetic_stripe_card)
      const track2 = device.getTrackMasked(2);
      const track2_segments = track2.split('=');
      if (track2_segments.length >= 2) {
        // Get PAN from track2 data
        if (track2_segments[0].length > 4) {
          PAN = track2_segments[0].substring(1, track2_segments[0].length);
        }
        // Get card expiration from track2 data
        if (track2_segments[1].length >= 4) {
          cc_exp_month = track2_segments[1].substring(2, 4);
          cc_exp_year = track2_segments[1].substring(0, 2);
        }
      }

      // Now try to get cardholder name from Track1 data. Also, if didn't get PAN or expiration date
      // from Track2 data then try to get those from Track1 too. Note: some valid cards will have a
      // format (e.g. %E) where the Track1 data doesn't provice valid PAN or expiration date appropriate
      // for our needs but does provide cardholder name.
      const track1 = device.getTrackMasked(1);
      if (track1.length > 2) {
        // Track1 data is a format we can parse
        const track1_segments = track1.split('^');
        if (track1_segments.length == 3) { // expecting 3 segments in track1 data
          // Get cardholder from track1 data (note: only available in track1, not track2)
          cardholder_name = track1_segments[1];

          if (track1.substring(0, 2) == '%B') {
            // If necessary, get PAN from track1 data
            if ((PAN == null || PAN.length == 0) && track1_segments[0].length > 4) {
              PAN = track1_segments[0].substring(2, track1_segments[0].length);
            }
            // If necessary, get expiration date from track1 data
            if ((cc_exp_month == null || cc_exp_month.length == 0 || cc_exp_year == null || cc_exp_year.length == 0) && track1_segments[2].length >= 4) {
              cc_exp_month = track1_segments[2].substring(2, 4);
              cc_exp_year = track1_segments[2].substring(0, 2);
            }
          }
        }
      }

      // Validate cart indicative data
      if (PAN == null || PAN.length == 0) {
        // alert('Invalid account number read from card');
        this.magTekSetErrorMessage('Invalid account number read from card.');
        return false;
      }
      PAN = PAN.replace(/[^0-9]/g, ''); // strip alpha

      if (cc_exp_month == null || cc_exp_month.length == 0 || cc_exp_year == null || cc_exp_year.length == 0) {
        // alert('Invalid expiration date read from card');
        this.magTekSetErrorMessage('Invalid expiration date read from card.');
        return false;
      }

      // Set values from parsed data now
      _encCCExpiry = `${cc_exp_month}/${cc_exp_year}`;
      _encAccountHolder = cardholder_name !== null ? cardholder_name.trim() : '';

      _CcNumMasked = maskCard(PAN);
      const card_validation_code = cardValidation(PAN);
      if (card_validation_code == 0) {
        // alert('Invalid card type');
        this.magTekSetErrorMessage('Invalid card type.');
        return false;
      }

      this.magTekSetInfoMessage('Encrypting credit card...');
      _CcCardType = getValidCardTypeId(card_validation_code, cardTypeList);
      if (_CcCardType == 0) {
        // alert('Unsupported credit card');
        this.magTekSetErrorMessage('Unsupported credit card.');
        return false;
      }

      // Set remaining values from device
      _encTrack2 = device.getTrack(2);
      _encMPStatus = device.MPrintStatus;
      _encMP = device.MagnePrintDataHexString();
      _encKSN = device.DUKPTKSN;
      _encCardType = '1';     // per AMS 4.3 API: always pass 1
      _encBlockType = '1';    // per AMS 4.3 API: 1 == MagenSafe V4/V5 compatible device, 2 == IPAD v1 device

      // console.log('Card Number: ' + PAN + '\nCard Expiration: ' + _encCCExpiry + '\nAccountHolder: ' +
      //   cardholder_name +  '\nMasked Card Number: ' + _CcNumMasked + '\nCard Type: ' + _CcCardType);
      _cardInfo = { cardNumber: PAN, cardType: _CcCardType, expirationDate: _encCCExpiry, maskCard: _CcNumMasked };
      const result = generateCCWalletIDFromEncryptedInput(_encCCExpiry, _encAccountHolder, '', _CcNumMasked, _encTrack2, '', _encMP, _encMPStatus, _encKSN, _encCardType, _encBlockType, '', null, _request_key);
      // if(generateWalletID) {
      //   generateWalletID(_cardInfo,this.SetWalletIDNotification.bind(this));
      // }

      _request_key = `${DateTimeFormat.getFullServerTodayDate().getTime()}_${_CcNumMasked}`;

      const accountIDParams = {
        custtranid: 'ANCustTranID',
        enctrack1: encodeURIComponent(''),
        enctrack2: encodeURIComponent(_encTrack2),
        mp: encodeURIComponent(_encMP),
        mpstatus: encodeURIComponent(_encMPStatus),
        ksn: encodeURIComponent(_encKSN),
        ct: _encCardType,
        bt: _encBlockType,
        csc: encodeURIComponent(''),
        exp: _encCCExpiry,
        ah: encodeURIComponent(_encAccountHolder),
        time: DateTimeFormat.getFullServerTodayDate().getTime(),
        key: _request_key,
        zip: ''
      };

      if (result && result.validate) {
        _warnInfo = result.msg;
        if (isDisableMagtekPCIEnhancement() && generateWalletID) {
          generateWalletID(_cardInfo, accountIDParams, this.SetWalletIDNotification.bind(this));
        } else {
          doGetSecureWalletFromEncryptedDeviceInput(
            _encTrack2, '', _encMP, _encMPStatus, _encKSN, _encCardType, _encBlockType, '', _encCCExpiry, '', _encAccountHolder,
            this.AMSWalletIDCallback.bind({
              _self: this,
              _cardInfo
            }), _request_key
          );
        }
      } else {
        this.magTekSetErrorMessage(result.msg);
      }
      return true;
    },

    AMSWalletIDCallback(requestKey, requestTime, statusCode, walletID, maskedCardNumber, cardType, errorMsg){
      if (reciveAMSWalletIDCallback && walletID && !errorMsg) {
        reciveAMSWalletIDCallback(walletID, this._cardInfo);
      }
      this._self.SetWalletIDNotification(walletID, requestKey, errorMsg, statusCode);
    },

     // Callback to process wallet ID in response from server ajax request
    SetWalletIDNotification(wallet_id, request_key, error, statusCode) {
      if (fnFormCallback == null) {
        return; // nobody cares anymore, just return
      }

      // if (request_key != _request_key) {
      //   return; // just ignore reply for request other than current one -- maybe user swiped card again while first swipe still being processed
      // }

      // _request_key = ''; // have reply, clear the key

      if (error && error != null && typeof (error).toLowerCase() === 'string' && error.length > 0) {
        if (typeof(statusCode) != 'undefined' && statusCode == 5 && typeof(fnStatusCallback) != 'undefined' && fnStatusCallback != null) {
          fnStatusCallback(5, "");
          return;
        }
        console.error(error);
        if (isDisableMagtekPCIEnhancement()) {
          this.magTekSetInfoMessage('Please swipe the card again...');
        } else {
           this.magTekSetErrorMessage(error);
        }
        return;
      }

      // Validate wallet id
      if (wallet_id == null || wallet_id.length == 0 || wallet_id == 'null') {
        console.error('Failure encrypting credit card data, please try again.');
        this.magTekSetInfoMessage('Please swipe the card again...');
        return;
      }
      this.magTekSetInfoMessage('Finishing...');
      setCradInfo(_cardInfo, _warnInfo);
      // Pass wallet id to caller
      if (fnFormCallback) fnFormCallback(ccFormKey, wallet_id, _CcNumMasked, _encCCExpiry, _CcCardType, _encAccountHolder, _encAccountZip);
    },
    /*
     * Functions to communicate with the device
     */
    OpenDevice() {
      if (initialize_timeout) {
        this.magTekSetErrorMessage('Unable to initialize MagTek USBHID library or communicate with device.');
        return;
      }

      try {
        if (!document.getElementById('USBHID').PortOpen) {
          document.getElementById('USBHID').PortOpen = true;
        }
        if (!document.getElementById('USBHID').PortOpen) {
          this.magTekSetErrorMessage('Unable to open device.');
          return;
        }
        magtek_device_open = true;
      } catch (err) {
        console.error(`Error opening MagTek USBHID device: ${err}.`);
        this.magTekSetErrorMessage('Unable to open device.');
        return;
      }
      this.magTekSetInfoMessage('Device is open.');
    },

    CloseDevice() {
      try {
        if (document.getElementById('USBHID').PortOpen) {
          document.getElementById('USBHID').PortOpen = false;
        }
      } catch (err) {

      }
      magtek_device_open = false;
    },

    GetDeviceState() {
      const that = this;

      magtek_init_timer = setTimeout(() => {
        that.GetDeviceStateTimeout();
      }, 10000);// 10 seconds
      this.OpenDevice();

      try {
        const devIn = '14';
        const devOut = '';
        document.getElementById('USBHID').USBSwipe_Command(devIn, devOut);
        deviceState = document.getElementById('USBHID').SwipeCommandOutput;
        let deviceState = deviceState.replace(/ /g, '');
        initialized = true;
      } catch (err) {
        this.magTekSetErrorMessage(`Error getting device state: ${err}.`);
      }

      this.CloseDevice();
      return initialized;
    },

    GetDeviceStateTimeout() {
      if (!initialized) {
        initialize_timeout = true;
      }
    },

    /*
     * If running in XNet then handle request from sdi page
     */
    handleXNetRequest(args) {
      try {
        const originalRequestorId = args.RequestorID;

        if (args.MagtekRequest == 'deviceInputStart') {
          this.deviceInputStart(
            (status, message) => { // status 1 == error, 2 == info
              // Callback for status update. Post message back to the requestor.
              const json_data = {
                messageType: 'MagtekClientMessage',
                RequestorID: getXNETHostFrameId(),
                TargetID: originalRequestorId,
                MagtekMessageType: 'Status',
                opstatus: status,
                opmessage: message
              };
              // Must set level 2, parent is iframe 'magtekdeviceinterface' hosted in XNet, parent.parent is the XNet frame listening for messages
              PostMessageToXnet(json_data, 2);
            },
            (key, accountID, maskedCC, cardExpiry, cardType, accountHolder, accountZip) => {
              // Callback to process data from the device. Post message back to the requestor.
              const json_data = {
                messageType: 'MagtekClientMessage',
                RequestorID: getXNETHostFrameId(),
                TargetID: originalRequestorId,
                MagtekMessageType: 'Data',
                key,
                accountID,
                maskedCC,
                cardExpiry,
                cardType,
                accountHolder,
                accountZip
              };
              // Must set level 2, parent is iframe 'magtekdeviceinterface' hosted in XNet, parent.parent is the XNet frame listening for messages
              PostMessageToXnet(json_data, 2);
            },
            args.callerKey);
        } else if (args.MagtekRequest == 'deviceInputEnd') {
          this.deviceInputEnd();
        }
      } catch (err) {
        if (console) {
          console.error(`MagTekCabMSF.handleXNetRequest; error: ${err.description}.`);
        }
      }
    }
  };
};

export default MagTekCabMSR;
