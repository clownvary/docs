const rootUrl = window.__environment__.ROOT_URL;

export default {
  refundDeposits: `${rootUrl}/rest/permit/refund`,
  getFeeTaxAndDiscount: `${rootUrl}/rest/permit/previewrefund`
};
