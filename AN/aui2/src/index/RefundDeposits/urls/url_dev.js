const rootUrl = window.__environment__.ROOT_URL;

export default {
  refundDeposits: `${rootUrl}/json/RefundDeposits/refund_deposits.json`,
  getFeeTaxAndDiscount: `${rootUrl}/json/RefundDeposits/fee_tax_discount.json`
};
