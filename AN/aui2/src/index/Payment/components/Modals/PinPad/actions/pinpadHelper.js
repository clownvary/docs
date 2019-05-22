export default function getUrlsForPinpad() {
  const rootUrl = window.__environment__.ROOT_URL;
  const devUrls = {
    getAPDInfo: `${rootUrl}/json/Payment/getAPDInfo.json`,
    getAPDPaymentInfo: `${rootUrl}/json/Payment/apdPaymentInfo.json`,
    getAPDServerStatus: `${rootUrl}/json/Payment/getAPDServerStatus.json`,
    processAPDResponse: `${rootUrl}/json/Payment/processAPDResponse.json`,
    cancelCardPayment: `${rootUrl}/json/Payment/cancelCardPayment.json`,
    cardLeaveBalance: `${rootUrl}/json/Payment/cardleavebalance.json`,
    ccexpireinfo: `${rootUrl}/json/Payment/ccexpireinfo.json`
  };
  const prodUrls = {
    getAPDInfo: `${rootUrl}/rest/receiptpayment/apdinfo`,
    getAPDPaymentInfo: `${rootUrl}/rest/receiptpayment/apdpaymentinfo`,
    getAPDServerStatus: `${rootUrl}/rest/receiptpayment/apdserverstatus`,
    processAPDResponse: `${rootUrl}/rest/receiptpayment/processapdresponse`,
    cancelCardPayment: `${rootUrl}/rest/receiptpayment/cancelcardpayment`,
    cardLeaveBalance: `${rootUrl}/rest/receiptpayment/cardleavebalance`,
    ccexpireinfo: `${rootUrl}/rest/receiptpayment/ccexpireinfo`
  };

  // istanbul ignore next
  return __STATIC__ ? devUrls : prodUrls;
}
