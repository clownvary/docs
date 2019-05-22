/* eslint-disable */

const MagTekUserIPAD = function (setInfoMessage, disMtBtns, showMagtekHelp, setInputManual, getInputManual, setErrorMessage) {
  const applet_frame = null;

  /*
   * Called by input page to request credit card swipe or cleaning up after a swipe
   */
  let callerFn = null;
  let callerKey = null;
  let _manual_input = false;
  var setInfoMessage = setInfoMessage;
  var disMtBtns = disMtBtns;
  var showMagtekHelp = showMagtekHelp;
  var setInputManual = setInputManual;
  var getInputManual = getInputManual;
  var setErrorMessage = setErrorMessage;
  let that;

  return {
    magTekInputReset(fn, key) {
      that = this;
      if (key == null || typeof (key) === 'undefined') {
        // if (isXNETHost()) {
        //   // We're running in XNet, use PostMessage to send request to iframe containing the applet
        //   var json_data = {
        //     messageType: 'MagtekDeviceRequest',
        //     RequestorID: getXNETHostFrameId(),
        //     MagtekRequest: 'deviceInputEnd'
        //   };
        //   PostMessageToXnet(json_data, 2);
        // } else {
        //   window.magTekApplet.deviceInputEnd(); // disconnect/cleanup
        // }
        window.magTekApplet.deviceInputEnd(); // disconnect/cleanup
      } else {
        callerFn = fn;
        callerKey = key;
        // _manual_input = $('#magtek_ipad_input_manual').val() === 'true';
        _manual_input = getInputManual() === 'true';
        if (_manual_input) {
          this.magTekSetInfoMessage('Enter credit card data now...<br>Use pin pad to cancel.');
        } else {
          this.magTekSetInfoMessage('Please swipe the card now...<br>Use pin pad to cancel.');
        }
        this.enableModeButtons(false);
        // Wait a second to give the dialog time to be positioned and status message displayed before call to library
        setTimeout(() => {
          that.doDelayedDeviceInputStart();
        }, 500); // 1/2 second
      }
    },

    doRequestInput(manual_input) {
      that = this;
      _manual_input = manual_input;
      if (_manual_input) {
        this.magTekSetInfoMessage('Enter credit card data now...<br>Use pin pad to cancel.');
      } else {
        this.magTekSetInfoMessage('Please swipe the card now...<br>Use pin pad to cancel.');
      }
      this.enableModeButtons(false);

      // Wait a second to give the dialog time to be positioned and status message displayed before call to library
      setTimeout(() => {
        that.doDelayedDeviceInputStart();
      }, 500); // 1/2 second
    },

    doDelayedDeviceInputStart() {
      /* if (isXNETHost()) {
         // We're running in XNet, use PostMessage to send request to iframe containing the applet
         var json_data = {
           messageType: 'MagtekDeviceRequest',
           RequestorID: getXNETHostFrameId(),
           MagtekRequest: 'deviceInputStart',
           callerKey: callerKey,
           isManualInput: _manual_input
         };
         PostMessageToXnet(json_data, 2);
       } else {
         that = this;
         window.magTekApplet.deviceInputStart(this.magTekStatusCallback, callerFn, callerKey, _manual_input);
       }*/
      if (window.magTekApplet) {
        that = this;
        window.magTekApplet.deviceInputStart(this.magTekStatusCallback, callerFn, callerKey, _manual_input);
      } else {
        this.magTekSetErrorMessage('Unable to initialize library.');
      }
    },

    /*
     * If running in XNet then handle request from the static applet iframe containing MagTekAppletIPAD or MagTekCabIPAD, passed on from XNet
     */
    handleXNetMessage(args) {
      try {
        if (args.MagtekMessageType == 'Data') {
          // Payment data back from APD Pinpad device input
          callerFn(args.key,
            args.accountID,
            args.maskedCC,
            args.cardExpiry,
            args.cardType,
            args.accountHolder,
            args.accountZip);
        } else if (args.MagtekMessageType == 'Status') {
          // Status message from APD PinPad page
          this.magTekStatusCallback(args.opstatus, args.opmessage);
        }
      } catch (err) {
        if (console) {
          console.error(`MagTekUserIPAD.handleXNetRequest; error: ${err.description}`);
        }
      }
    },

    magTekStatusCallback(status_code, msg) {
      if (status_code == 0) {
        // user cancelled or timeout waiting for swipe
        that.magTekSetErrorMessage(msg, status_code);
        that.enableModeButtons(true);
      } else if (status_code == 1) {
        that.magTekSetErrorMessage(msg, status_code); // error
      } else if (status_code == 2) {
        that.magTekSetInfoMessage(msg); // info
      } else if (status_code == 5) {
        that.magTekSetErrorMessage('', status_code);
      }
    },

    magTekSetErrorMessage(msg, status_code) {
      if (setErrorMessage) {
        // setInfoMessage(msg);
        setErrorMessage(msg, false, status_code);
        that.enableModeButtons(true);
      }
    },

    magTekSetInfoMessage(msg) {
      if (setInfoMessage) {
        setInfoMessage(msg);
      }
    },

    enableModeButtons(enable) {
      if (enable) {
        if (disMtBtns) {
          disMtBtns(false);
        }
        showMagtekHelp(true);
      } else {
        if (disMtBtns) {
          disMtBtns(true);
        }
        showMagtekHelp(false);
      }
    }
  };
};

export default MagTekUserIPAD;
