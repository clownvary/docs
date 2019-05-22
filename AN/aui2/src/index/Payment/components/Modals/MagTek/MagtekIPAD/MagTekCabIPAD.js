/* eslint-disable */

/* global ipad, VBArray, getXNETHostFrameId, PostMessageToXnet */
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import {
  cardValidation,
  generateCCWalletIDFromEncryptedInput,
  isDisableMagtekPCIEnhancement,
  doGetSecureWalletFromEncryptedDeviceInput
} from '../../../../utils/magtekFun';
import {
  maskCard,
  getValidCardTypeId
} from '../../../../utils/creditCardHelper';

const MagTekCabIPAD = function (setCradInfo, generateWalletID, cardTypeList, reciveAMSWalletIDCallback) {
  let magtek_applet_initialized = false;
  let magtek_device_ready = false;
  let magtek_init_timer = null;
  let magtek_init_timed_out = false;
  let magtek_timed_out_timer = null;

  let _request_key = '';
  let _encTrack2 = '';
  let _encMP = '';
  let _encMPStatus = '';
  let _encKSN = '';
  let _encCardType = '';
  let _encBlockType = '';
  let _encCSC = '';
  let _encCCExpiry = '';
  let _encAccountHolder = '';
  let _encAccountZip = '';
  let _AMSWalletID = '';
  let _CcNumMasked = '';
  let _CcCardType = 0;

  let fnStatusCallback = null;
  let _manual_input = false;
  let fnFormCallback = null;
  let ccFormKey = null;
  let waiting_for_input = false;

  const magtek_msg_cancelled = 3;
  const magtek_msg_thank_you = 4;
  const magtek_msg_processing = 6;
  const magtek_msg_please_wait = 7;

  let _cardInfo = {};
  let _warnInfo = '';
  let _is_timeout = false;
  return {
    /*
     *  This is the function that callers should use to get card input from user (swipe or manual).
     */
    deviceInputStart(fnStatus, fnData, key, manual_input) {
      fnStatusCallback = fnStatus;
      fnFormCallback = fnData;
      ccFormKey = key;

      _encTrack2 = '';
      _encMP = '';
      _encMPStatus = '';
      _encKSN = '';
      _encCardType = '';
      _encBlockType = '';
      _encCSC = '';
      _encCCExpiry = '';
      _encAccountHolder = '';
      _encAccountZip = '';
      _AMSWalletID = '';
      _CcNumMasked = '';
      _CcCardType = 0;
      _cardInfo = {};
      _warnInfo = '';
      if (typeof (manual_input) !== 'undefined') _manual_input = manual_input;
      // if (magtek_init_timer != null) return; // already trying to initialize

      this.doRequestInput();
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
      _encCSC = '';
      _encCCExpiry = '';
      _encAccountHolder = '';
      _encAccountZip = '';
      _AMSWalletID = '';
      _CcNumMasked = '';
      _CcCardType = 0;

      // Close device and cleanup
      // DeviceCancelOperation();
      this.DeviceEndSession();
      this.DeviceClose();
    },

    magTekSetErrorMessage(msg) {
      // Pass status to caller
      if (typeof (fnStatusCallback) === 'undefined' || fnStatusCallback == null) return;
      fnStatusCallback(1, msg); // status 1 == error
    },

    magTekSetInfoMessage(msg) {
      // Pass status to caller
      if (typeof (fnStatusCallback) === 'undefined' || fnStatusCallback == null) return;
      fnStatusCallback(2, msg); // status 2 == info
    },

    doInit() {
      const that = this;
      magtek_init_timed_out = false;
      magtek_timed_out_timer = setTimeout(() => {
        that.magTekInitTimeout();
      }, 30000); // total init time should be within 30 seconds
      this.GetLibStatus();
    },

    magTekInitTimeout() {
      if (magtek_applet_initialized) return;

      magtek_init_timed_out = true;
      magtek_init_timer = null;
      _is_timeout = true;
      this.magTekSetErrorMessage('Timeout waiting, please try again.');
    },

    GetLibStatus() {
      const that = this;
      magtek_init_timer = null;

      try {
        var iResult = 1;
        // var iResult = document.JMTIPADLIB.MTIPADLibStatus();
        var iResult = ipad.IsLibReady();

        if (iResult == 0) {
          magtek_applet_initialized = true;
          if (fnFormCallback) { // If caller is waiting for input then call doRequestInput()
            this.doRequestInput();
          }
          return;
        }

        // if (magtek_init_timed_out || iResult != 1) {
        if (iResult != 1) {
          this.magTekSetErrorMessage('Unable to initialize device communication.');
          return;
        }
      } catch (err) {
        this.magTekSetErrorMessage(`Unable to initialize library: ${err.description}.`);
      }

      // Restart the timer to wait some more for applet status
      magtek_init_timer = setTimeout(() => {
        that.GetLibStatus();
      }, 4000); // 4 seconds
    },

    doRequestInputDelayed() {
      const that = this;
      setTimeout(() => {
        that.doRequestInput();
      }, 20);
    },

    doRequestInput() {
      // DeviceCancelOperation(); // cancel previous device function
      this.DeviceEndSession(); // redisplays 'welcome' message on device
      _is_timeout = false;
      if (!fnFormCallback || fnFormCallback == null) return; // nobody is listening

      // Open the device if not already open
      if (!magtek_device_ready) {
        // Open the device
        this.DeviceOpen();
        if (!magtek_device_ready) {
          // magTekSetErrorMessage('Unable to open device ...trying again...');
          // doRequestInputDelayed();
          this.magTekSetErrorMessage('Unable to open device.');
          return;
        }
      } else {
        // Check if the device is still connected
        if (ipad.GetDeviceConnectionStatus() == 0) {
          // Device is no longer connected
          this.magTekSetErrorMessage('Device is not available.');
          this.deviceInputEnd();
          return;
        }
      }

      let data = null;
      waiting_for_input = true;
      if (_manual_input) {
        this.magTekSetInfoMessage('Enter credit card data now...<br>Use pin pad to cancel.');
        data = this.DeviceRequestManualCard();
      } else {
        this.magTekSetInfoMessage('Please swipe the card now...<br>Use pin pad to cancel.');
        data = this.DeviceRequestCard();
      }
      waiting_for_input = false;

      // Get the operation status return code
      // var op_status = document.JMTIPADLIB.getOpStatusCode();
      const op_status = ipad.GetOpStatus();
      if (op_status == 0) { // user swiped card or manually entered card
        if (this.processCardData(data, _manual_input)) {
          // processCardData validation successful. Now waiting for SetWalletIDNotification callback to be invoked.
          return;
        }
        if (ipad.GetDeviceConnectionStatus() == 0) {
          // Device is no longer connected
          this.magTekSetErrorMessage('Device is not available.');
          this.deviceInputEnd();
          return;
        }
      } else if (op_status == 1) { // user canceled operation on IPAD keypad
        fnStatusCallback(0, 'User cancelled, please try again.');
      } else if (op_status == 2) { // timeout waiting for input
        _is_timeout = true;
        fnStatusCallback(0, 'Timeout waiting, please try again.');
      }

      // Nofify caller that we're not waiting for input any more
      // if (typeof(fnStatusCallback) != 'undefined' && fnStatusCallback != null) {
      //   fnStatusCallback(0, 'User cancelled or timeout waiting, please try again.');  // status = cancelled or timed out
      // }

      this.DeviceEndSession(); // redisplays 'welcome' message on device
    },

    processCardData(CardData, manual_input) {
      if (CardData == null || CardData.Track2 == null || CardData.Track1 == null) {
        // alert('Card data not read. Please try again.');
        this.magTekSetErrorMessage('Card data not read, please try again.');
        return false;
      }

      this.magTekSetInfoMessage('Encrypting credit card...');
      this.DeviceDisplayMessage(magtek_msg_please_wait);

      // CardData.CardType: CardTypeOther=0, CardTypeFinancial=1,CardTypeAAMVA=2, CardTypeManual=3, CardTypeUnknown=4
      // CardData.CardStatus: CardStatusOK=0, CardStatusErr_Trk1=0x02, CardStatusErr_Trk2 = 0x04, CardStatusErr_Trk3 = 0x08
      _request_key = ''; // it's new data, clear the previous request key in case reply to earlier request comes in while processing

      let PAN = null;
      let cc_exp_month = null;
      let cc_exp_year = null;
      let cardholder_name = null;

      // First try to get PAN and expiration data by parsing Track2 data (refer to http://en.wikipedia.org/wiki/Magnetic_stripe_card)
      const track2_segments = CardData.Track2.split('=');
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
      if (CardData.Track1.length > 2) {
        // Track1 data is a format we can parse
        const track1_segments = CardData.Track1.split('^');
        if (track1_segments.length == 3) { // expecting 3 segments in track1 data
          // Get cardholder from track1 data (note: only available in track1, not track2)
          cardholder_name = track1_segments[1];

          if ((manual_input && CardData.Track1.substring(0, 2) == '%M') ||
            (!manual_input && CardData.Track1.substring(0, 2) == '%B')) {
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

      /*
       var CardResponse = '\nTrack1='+ CardData.Track1 + '\nTrack2='+ CardData.Track2 + '\nTrack3='+ CardData.Track3;
       CardResponse +=  '\nEncTrack1='+ CardData.EncTrack1 + '\nEncTrack2='+ CardData.EncTrack2 + '\nEncTrack3='+ CardData.EncTrack3;
       CardResponse +=  '\nEncMP='+ CardData.EncMP + '\nKSN='+ CardData.KSN;
       CardResponse +=  '\nMPSTS='+ CardData.MPSTS + '\nCardType='+ CardData.CardType;
       CardResponse +=  '\nPAN='+ PAN;
       alert(CardResponse);
       */
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
      _encAccountHolder = cardholder_name != null ? cardholder_name.trim() : '';

      _CcNumMasked = maskCard(PAN);
      const card_validation_code = cardValidation(PAN);
      if (card_validation_code == 0) {
        // alert('Invalid card type');
        this.magTekSetErrorMessage('Invalid card type.');
        return false;
      }
      _CcCardType = getValidCardTypeId(card_validation_code, cardTypeList);
      if (_CcCardType == 0) {
        // alert('Unsupported credit card');
        this.magTekSetErrorMessage('Unsupported credit card.');
        return false;
      }

      // Set remaining values from device
      _encTrack2 = CardData.EncTrack2; // Track2
      _encMPStatus = CardData.MPSTS; // CardData.EncMPStatus;
      _encMP = manual_input ? '0' : CardData.EncMP;
      _encKSN = CardData.KSN;
      _encCardType = '1'; // per AMS 4.3 API: always pass 1
      _encBlockType = '2'; // per AMS 4.3 API: 1 == MagenSafe V4/V5 compatible device, 2 == IPAD v1 device

      _cardInfo = { cardNumber: PAN, cardType: _CcCardType, expirationDate: _encCCExpiry, maskCard: _CcNumMasked };
      const result = generateCCWalletIDFromEncryptedInput(_encCCExpiry, _encAccountHolder, '', _CcNumMasked, _encTrack2, '', _encMP, _encMPStatus, _encKSN, _encCardType, _encBlockType, '', null, _request_key);
      // Make AMS request to get wallet ID. Callback function will close the dialog.
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
        if (isDisableMagtekPCIEnhancement() && generateWalletID && !_is_timeout) {
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
        this.DeviceEndSession();
      }
      return true; // waiting for callback to handle response
    },

    AMSWalletIDCallback(requestKey, requestTime, statusCode, walletID, maskedCardNumber, cardType, errorMsg){
      if (reciveAMSWalletIDCallback && walletID && !errorMsg) {
        reciveAMSWalletIDCallback(walletID, this._cardInfo);
      }
      this._self.SetWalletIDNotification(walletID, requestKey, errorMsg, statusCode);
    },

    // Callback to process wallet ID in response from server ajax request
    SetWalletIDNotification(wallet_id, request_key, error, statusCode) {
      this.DeviceEndSession();
      if (fnFormCallback == null || _is_timeout) {
        return; // nobody cares anymore, just return
      }

      // if (request_key != _request_key) {
      //   return; // just ignore reply for request other than current one -- maybe user swiped card again while first swipe still being processed
      // }

      // _request_key = ''; // have reply, clear the key

      if (error && error != null && typeof (error).toLowerCase() === 'string' && error.length > 0) {
        if (typeof(statusCode) != 'undefined' && statusCode == 5 && typeof(fnStatusCallback) != 'undefined' && fnStatusCallback != null) {
          fnStatusCallback(5, "");  // connection error
        } else {
          // alert(error);
          this.magTekSetErrorMessage(error);
          // doRequestInput();
          // Nofify caller that we're not waiting for input any more
          if (isDisableMagtekPCIEnhancement() && typeof (fnStatusCallback) !== 'undefined' && fnStatusCallback != null) {
            fnStatusCallback(0, ''); // status = cancelled or timed out
          }
        }
        this.DeviceEndSession(); // redisplays 'welcome' message on device
        return;
      }

      // Validate wallet id
      if (wallet_id == null || wallet_id.length == 0 || wallet_id == 'null') {
        // alert('Failure encrypting credit card data. Please try again.');
        this.magTekSetErrorMessage('Failure encrypting credit card data, please try again.');
        // doRequestInput();
        // Nofify caller that we're not waiting for input any more
        if (typeof (fnStatusCallback) !== 'undefined' && fnStatusCallback != null) {
          fnStatusCallback(0, ''); // status = cancelled or timed out
        }
        this.DeviceEndSession(); // redisplays 'welcome' message on device
        return;
      }
      this.magTekSetInfoMessage('Finishing...');
      this.DeviceDisplayMessage(magtek_msg_thank_you, 5);
      clearTimeout(magtek_timed_out_timer);
      setCradInfo(_cardInfo, _warnInfo);
      // Pass wallet id to caller
      // fnFormCallback(ccFormKey, wallet_id, _CcNumMasked, _encCCExpiry, _CcCardType, _encAccountHolder, _encAccountZip);
    },

    // Javascript methods to interface to device (see JMTIPADLIB.js for examples of all available)


    //-------------------------------------------------
    // Usage:
    //      Establish communucation with IPAD device
    //-------------------------------------------------
    DeviceOpen() {
      if (magtek_device_ready) return;

      try {
        // magTekSetInfoMessage('Opening device ...');
        // var iResult = document.JMTIPADLIB.MTIPADOpen();
        const iResult = ipad.open();

        if (iResult == 1) {
          magtek_device_ready = true;
          return;
        }

        magtek_device_ready = false;
      } catch (err) {
        this.magTekSetErrorMessage(`Error opening device: ${err.description}.`);
      }
    },

    DeviceClose() {
      if (!magtek_device_ready) return;
      magtek_device_ready = false;
      try {
        // var iResult = document.JMTIPADLIB.MTIPADClose();
        const iResult = ipad.close();
        if (iResult != 1) {
          // alert('Close IPAD failed. RC = ' + iResult);
        }
      } catch (err) {}
    },

    DeviceEndSession() {
      if (!magtek_device_ready) return;
      try {
        // Displays 'Welcome' message on device
        // document.JMTIPADLIB.MTIPADEndSession('0');
        ipad.EndSession(0);
      } catch (err) {}
    },

    DeviceCancelOperation() {
      if (!magtek_device_ready) return;
      try {
        // document.JMTIPADLIB.MTIPADCancelOperation();
        // alert('TODO DeviceCancelOperation');
        this.magTekSetErrorMessage('TODO DeviceCancelOperation.');
      } catch (err) {}
    },

    DeviceDisplayMessage(message_id, display_num_seconds) {
      if (!display_num_seconds) display_num_seconds = 0;
      // var iResult = document.JMTIPADLIB.MTIPADDisplayMsg(display_num_seconds, message_id);
      // TODO CALL MAGTEK.DLL FUNCTION
    },

    DeviceRequestCard(retry) {
      // request card
      const wait_seconds = 30;
      const msg_id = retry ? 3 : 1; // 1=='Swipe Card', 2=='Please Swipe Card', 3=='Please Swipe Again'
      const buzzer = retry ? 2 : 1; // 0, 1, or 2 tones
      // CardInfo = document.JMTIPADLIB.MTIPADRequestCard(wait_seconds, msg_id, buzzer, opStatus, CardInfo);

      // var ccStatus = ipad.RequestCard(10,1,0);
      const ccStatus = ipad.RequestCard(wait_seconds, msg_id, buzzer);
      if (ccStatus != 0) {
        return null;
      }

      const opStatus = ipad.GetOpStatus();
      const data = ipad.GetCardData();

      const jsCardData = new VBArray(data);
      const cardData = new Object();
      cardData.Track1 = jsCardData.getItem(20, 1);
      cardData.Track2 = jsCardData.getItem(21, 1);
      cardData.CardType = jsCardData.getItem(3, 1);
      cardData.EncTrack1 = jsCardData.getItem(23, 1);
      cardData.EncTrack2 = jsCardData.getItem(24, 1);
      cardData.EncTrack3 = jsCardData.getItem(25, 1);
      cardData.EncMP = jsCardData.getItem(26, 1);
      cardData.MPSTS = jsCardData.getItem(19, 1);
      cardData.KSN = jsCardData.getItem(27, 1);
      /*
       var CardResponse = '\nTrack1='+ cardData.Track1 + '\nTrack2='+ cardData.Track2 + '\nTrack3='+ cardData.Track3;
       CardResponse +=  '\nEncTrack1='+ cardData.EncTrack1 + '\nEncTrack2='+ cardData.EncTrack2 + '\nEncTrack3='+ cardData.EncTrack3;
       CardResponse +=  '\nEncMP='+ cardData.EncMP + '\nKSN='+ cardData.KSN;
       CardResponse +=  '\nMPSTS='+ cardData.MPSTS + '\nCardType='+ cardData.CardType;
       alert(CardResponse);
       */
      return cardData;
    },

    DeviceRequestManualCard() {
      // request manual input
      const wait_seconds = 90; //
      const buzzer = 1; // 0, 1, or 2 tones
      // CardInfo = document.JMTIPADLIB.MTIPADRequestManualCardData(wait_seconds, buzzer, opStatus, CardInfo);
      const ccStatus = ipad.RequestManualCardData(45, 1);
      if (ccStatus != 0) {
        return null;
      }

      const opStatus = ipad.GetOpStatus();
      const data = ipad.GetCardData();

      const jsCardData = new VBArray(data);
      const cardData = new Object();
      cardData.Track1 = jsCardData.getItem(20, 1);
      cardData.Track2 = jsCardData.getItem(21, 1);
      cardData.CardType = jsCardData.getItem(3, 1);
      cardData.EncTrack1 = jsCardData.getItem(23, 1);
      cardData.EncTrack2 = jsCardData.getItem(24, 1);
      cardData.EncTrack3 = jsCardData.getItem(25, 1);
      cardData.EncMP = jsCardData.getItem(26, 1);
      cardData.MPSTS = jsCardData.getItem(19, 1);
      cardData.KSN = jsCardData.getItem(27, 1);
      /*
       var CardResponse = '\nTrack1='+ cardData.Track1 + '\nTrack2='+ cardData.Track2 + '\nTrack3='+ cardData.Track3;
       CardResponse +=  '\nEncTrack1='+ cardData.EncTrack1 + '\nEncTrack2='+ cardData.EncTrack2 + '\nEncTrack3='+ cardData.EncTrack3;
       CardResponse +=  '\nEncMP='+ cardData.EncMP + '\nKSN='+ cardData.KSN;
       CardResponse +=  '\nMPSTS='+ cardData.MPSTS + '\nCardType='+ cardData.CardType;
       alert(CardResponse);
       */
      return cardData;
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
            args.callerKey,
            args.isManualInput);
        } else if (args.MagtekRequest == 'deviceInputEnd') {
          this.deviceInputEnd();
        }
      } catch (err) {
        if (console) {
          console.error(`MagTekCabIPAD.handleXNetRequest; error: ${err.description}`);
        }
      }
    }
  };
};


export default MagTekCabIPAD;
