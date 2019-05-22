// ANE-27696 Digital Signature - (User Story 10) Print Waivers During the Transaction
export function PopupWindowWithMenu(mypage, myname, w, h, scroll) {
  const offset = 20;
  let winl = screen.width - parseInt(w, 10);
  /* istanbul ignore if */
  if ((parseFloat(w) + parseFloat(offset)) < screen.width) {
    winl = (screen.width - parseInt(w, 10) - offset) / 2;
  }
  const wint = (screen.height - parseInt(h, 10)) / 2;
  const winprops = `height=${h},width=${w},top=${wint},left=${winl},toolbar=yes,menubar=yes,scrollbars=${scroll},resizable`;

  const url = mypage.indexOf('?') > 0
    ? `${mypage}&popup_window=yes`
    : `${mypage}?popup_window=yes`;

  const win = window.open(url, myname, winprops);
  try {
    parseInt(navigator.appVersion, 10) >= 4 && win.window.focus();
  } catch (err) {
    console.log(err.message);
  }
}

function openWindow(path) {
  PopupWindowWithMenu(`${path}servlet/LoadingContent.sdi?oc=UploadedFile`, 'Waiver', '800', '600', 'yes');
}

function showWaiverContent(
  uploadfileidWaiver, transactionstageID, signature, stageID, stageVersion, akamaiDirectory, eventID
) {
  let url = `${akamaiDirectory}servlet/displayWaiver.sdi?oc=UploadedFile&uploadedfile_id=${uploadfileidWaiver}&transactionstage_id=${transactionstageID}&stage_version=${stageVersion}&stage_id=${stageID}`;
  if (eventID > 0) {
    url = `${url}&permit_event_id=${eventID}`;
  }

  const form = $('<form target="Waiver" />');
  form.attr('action', url);
  form.attr('method', 'post');
  const input1 = $('<input type="hidden" name="signature" />');
  input1.attr('value', signature);
  form.append(input1);
  form.appendTo('body');
  form.css('display', 'none');
  form.submit();
  $(form).remove();
}

export function waiverNameClick(
  waiverName, stageID, stageVersion, signVal, akamaiDirectory, eventID,
  transactionstageID = -1
) {
  const signature = signVal;
       // var uploadfileid_waiver_ele=$('#'+transactionstageID+'uploadfile_waiver');
  const uploadfileidWaiver = '-1';
       // if(uploadfileidWaiver.length > 0){
       //    uploadfileidWaiver = $(uploadfileidWaiver).val();
       // }
  openWindow(akamaiDirectory);
  showWaiverContent(uploadfileidWaiver, transactionstageID, signature, stageID,
    stageVersion, akamaiDirectory, eventID);
}

export function viewAttachment(mypage, myname, w, h, scroll) {
  PopupWindowWithMenu(mypage, myname, w, h, scroll);
}

export function waiverCheckBoxClick(waiverName, enableDigitalSignature, waiverIndex,
  transactionstageID) {
  let digitalSignatureEnabled = false;
  let _transactionstageID;
  if (enableDigitalSignature) digitalSignatureEnabled = true;
  if (digitalSignatureEnabled) {
    const sigBase64 = $(`#${waiverIndex}SigBase64`).val();
    if (sigBase64 === '') {
      if ($(`#${waiverIndex}waiverCheckBox`).is(':checked')) {
        /* eslint-disable no-alert */
        /* istanbul ignore else */
        if (confirm('You haven\'t collected the signed waiver. Are you sure you want to continue?')) {
          return { cancel: false, checked: true };
        }
        $(`#${waiverIndex}waiverCheckBox`).attr('checked', false);
        return { cancel: true, checked: false };
      }
    } else if (confirm('Are you sure you want to clear the signature collected?')) {
      _transactionstageID = transactionstageID || 0;
      $(`#${waiverIndex}SigBase64`).val('');
      /* istanbul ignore if */
      if (_transactionstageID > 0) {
        $(`#${waiverIndex}uploadfile_waiver`).val('0');
      }
      return { cancel: false, checked: false };
    } else {
      $(`#${waiverIndex}waiverCheckBox`).attr('checked', true);
      return { cancel: true, checked: true };
    }
  } else {
    _transactionstageID = transactionstageID || 0;
    $(`#${waiverIndex}SigBase64`).val('');
    if (_transactionstageID > 0) {
      $(`#${waiverIndex}uploadfile_waiver`).val('0');
    }
  }
  return { cancel: false, checked: false };
}
