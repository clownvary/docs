import {defineMessages} from "react-intl";

export const PREFIX = "app.modules.cart.common.OrderSummary";

/**
 * Common part for ShoppingCart and Checkout page.
 */
export default defineMessages({
  title: {
    id: `${PREFIX}.title`,
    defaultMessage: "Order Summary"
  },
  subtotal: {
    id: `${PREFIX}.subtotal`,
    defaultMessage: "Subtotal"
  },
  taxes: {
    id: `${PREFIX}.taxes`,
    defaultMessage: "Taxes"
  },
  convenienceFee: {
    id: `${PREFIX}.convenienceFee`,
    defaultMessage: "{convenience_fee_label}"
  },
  convenienceFeeDiscount: {
    id: `${PREFIX}.convenienceFeeDiscount`,
    defaultMessage: "{convenience_fee_label} Discount"
  },
  paymentFromAccount: {
    id: `${PREFIX}.paymentFromAccount`,
    defaultMessage: "Payment from Account"
  },
  deferredToPaymentPlan: {
    id: `${PREFIX}.deferredToPaymentPlan`,
    defaultMessage: "Deferred to {payment_plan_label}"
  },
  dueNow: {
    id: `${PREFIX}.dueNow`,
    defaultMessage: "Due Now"
  },
  waiverError: {
    id: `${PREFIX}.waiverError`,
    defaultMessage: "Please check or initial all required waivers."
  },
  required: {
    id: `${PREFIX}.required`,
    defaultMessage: "Required"
  },
  giftCard: {
    id: `${PREFIX}.giftCard`,
    defaultMessage: "{giftCard_label}"
  },
  totalRefund: {
    id: `${PREFIX}.totalRefund`,
    defaultMessage: "Total Refund"
  },
  refundOfPriorEnrollment: {
    id: `${PREFIX}.refundOfPriorEnrollment`,
    defaultMessage: "Refund of Prior Enrollment"
  },
  taxesIncluded: {
    id: `${PREFIX}.taxesIncluded`,
    defaultMessage: "Taxes Included"
  },
  total: {
    id: `${PREFIX}.total`,
    defaultMessage: 'Total'
  },
  dueDate: {
    id: `${PREFIX}.dueDate`,
    defaultMessage: 'DUE DATE'
  },
  amountDue: {
    id: `${PREFIX}.amountDue`,
    defaultMessage: 'AMOUNT DUE'
  },
  amount: {
    id: `${PREFIX}.amount`,
    defaultMessage: 'AMOUNT'
  },
  originalSubtotal: {
    id: `${PREFIX}.originalSubtotal`,
    defaultMessage: 'Original Subtotal'
  },
  coupon: {
    id: `${PREFIX}.coupon`,
    defaultMessage: 'Coupon'
  }
});
