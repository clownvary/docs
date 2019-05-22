import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Confirmation.ReceiptTotalAmount';

export default defineMessages({
  subtotal: {
    id: `${PREFIX}.subotal`,
    defaultMessage: 'Subtotal'
  },
  taxes: {
    id: `${PREFIX}.taxes`,
    defaultMessage: 'Taxes'
  },
  convenienceFee: {
    id: `${PREFIX}.convenienceFee`,
    defaultMessage: '{convenience_fee_label}'
  },
  convenienceFeeDiscount: {
    id: `${PREFIX}.convenienceFeeDiscount`,
    defaultMessage: '{convenience_fee_label} Discount'
  },
  paymentFromAccount: {
    id: `${PREFIX}.paymentFromAccount`,
    defaultMessage: 'Payment from Account'
  },
  deferredToPaymentAccount: {
    id: `${PREFIX}.deferredToPaymentAccount`,
    defaultMessage: 'Deferred to {paymentPlan}'
  },
  giftCard: {
    id: `${PREFIX}.giftCard`,
    defaultMessage: '{giftCard_label}'
  },
  total: {
    id: `${PREFIX}.total`,
    defaultMessage: 'Total'
  },
  totalRefund: {
    id: `${PREFIX}.totalRefund`,
    defaultMessage: 'Total Refund'
  }
});
