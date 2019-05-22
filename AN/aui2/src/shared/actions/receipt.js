import URL from '../urls';
import syncAjax from '../utils/syncRequest';
import parseResponse from '../api/parseResponse';
import getDynamicUrl from '../utils/getDynamicUrl';

export function cancelReceipt(batchID, receiptID, voidDraft = true) {
  const url = getDynamicUrl(URL.cancelReceipt, {
    batchID,
    receiptID,
    voidDraft
  });
  /**
   * TODO
   * we have to use sync way to do it now. Since the ajax
   * request will be canceled if page is redirected.
   * if fail to call api here, we should throw the error.
   */

  const result = {
    success: false,
    response_code: '',
    response_message: ''
  };

  syncAjax({
    url,
    type: 'post',
    error: (xmlHttpRequest, statusText) => {
      result.success = false;
      result.response_message = statusText;
    },
    success: (data) => {
      if (data && data.headers && !parseResponse(data.headers)) {
        result.success = false;
        result.response_code = data.headers.response_code;
        result.response_message = data.headers.response_message;
      } else {
        result.success = true;
      }
    }
  });

  return result;
}


export function cancelReceiptAsyncAction(batchID, receiptID, voidDraft = true) {
  const url = getDynamicUrl(URL.cancelReceipt, {
    batchID,
    receiptID,
    voidDraft
  });

  return {
    types: ['', '', ''],
    promise: api => api.post(url)
  };
}
