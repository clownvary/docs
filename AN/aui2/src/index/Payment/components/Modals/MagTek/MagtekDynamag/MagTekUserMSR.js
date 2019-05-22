/* eslint-disable */

const MagTekUserMSR = function (setInfoMessage, setErrorMessage) {
  const applet_frame = null;

  /*
   * Called by input page to request credit card swipe or cleaning up after a swipe
   */
  let callerFn = null;
  let callerKey = null;

  let that;

  return {
    magTekInputReset(fn, key) {
      const that = this;
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
        // Wait a second to give the dialog time to be positioned and status message displayed before call to library
        setTimeout(() => {
          that.doDelayedDeviceInputStart();
        }, 500); // 1/2 second
      }
    },

    magTekStatusCallback(status_code, msg) {
      if (status_code == 0) {
        // user cancelled or timeout waiting for swipe
      } else if (status_code == 1) {
        that.magTekSetErrorMessage(msg, status_code); // error
      } else if (status_code == 2) {
        that.magTekSetInfoMessage(msg); // info
      } else if (status_code == 5) {
        that.magTekSetErrorMessage('', status_code);
      }
    },

    doDelayedDeviceInputStart() {
      // if (isXNETHost()) {
      //   // We're running in XNet, use PostMessage to send request to iframe containing the applet
      //   var json_data = {
      //     messageType: 'MagtekDeviceRequest',
      //     RequestorID: getXNETHostFrameId(),
      //     MagtekRequest: 'deviceInputStart',
      //     callerKey: callerKey
      //   };
      //   PostMessageToXnet(json_data, 2);
      // } else {
      //   that = this;
      //   window.magTekApplet.deviceInputStart(this.magTekStatusCallback, callerFn, callerKey);
      // }
      that = this;
      if (window.magTekApplet && window.magTekApplet.deviceInputStart) {
        window.magTekApplet.deviceInputStart(this.magTekStatusCallback, callerFn, callerKey);
      } else {
        this.magTekSetErrorMessage('Unable to initialize MagTek USBHID library or communicate with device.');
      }
    },

    /*
     * If running in XNet then handle request from the static applet iframe containing MagTekAppletMSR or MagTekCabMSR, passed on from XNet
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
          console.error(`MagTekUserIMSF.handleXNetRequest; error: ${err.description}.`);
        }
      }
    },

    magTekSetErrorMessage(msg, status_code) {
      if (setErrorMessage) {
        setErrorMessage(msg, false, status_code);
      }
    },

    magTekSetInfoMessage(msg) {
      if (setInfoMessage) {
        setInfoMessage(msg);
      }
    }
  };
};

export default MagTekUserMSR;
