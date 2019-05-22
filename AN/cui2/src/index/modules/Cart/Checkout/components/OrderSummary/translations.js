import { defineMessages } from 'react-intl';

export const PREFIX = 'app.modules.cart.Checkout.components.OrderSummary.Agreement';

/**
 * Common part for ShoppingCart and Checkout page.
 */
export default defineMessages({
  unselectedCard: {
    id: `${PREFIX}.unselectedCard`,
    defaultMessage: 'Please select a payment method.'
  },
  contuneButtonLabel: {
    id: `${PREFIX}.contuneButtonLabel`,
    defaultMessage: 'I ACKNOWLEDGE THAT I HAVE CAREFULLY REVIEWED AND CONSENT TO THE {agreementType} AGREEMENT SET FORTH ABOVE.'
  },
  PADAgreementTitle: {
    id: `${PREFIX}.PADAgreementTitle`,
    defaultMessage: 'Pre-Authorized Debit Agreement'
  },
  ACHAgreementTitle: {
    id: `${PREFIX}.ACHAgreementTitle`,
    defaultMessage: 'Authorization Details'
  },
  agreementDesc: {
    id: `${PREFIX}.agreementDesc`,
    defaultMessage: 'ENTIRE {agreementType} AGREEMENT MUST BE READ THROUGH BEFORE COMPLETING YOUR ORDER'
  },
  currentChargePaymentPlan: {
    id: `${PREFIX}.currentChargePaymentPlan`,
    defaultMessage: 'Current Charge'
  },
  dueDatePaymentPlan: {
    id: `${PREFIX}.dueDatePaymentPlan`,
    defaultMessage: 'Due Date'
  },
  amountDuePaymentPlan: {
    id: `${PREFIX}.amountDuePaymentPlan`,
    defaultMessage: 'Amount Due'
  },
  subtotalPaymentPlan: {
    id: `${PREFIX}.subtotalPaymentPlan`,
    defaultMessage: 'Subtotal:'
  },
  textPaymentPlan: {
    id: `${PREFIX}.textPaymentPlan`,
    defaultMessage: 'Payment Plan for'
  },
  balancePaymentPlan: {
    id: `${PREFIX}.balancePaymentPlan`,
    defaultMessage: 'Balance'
  },
  wcag_checkbox_label: {
    id: `${PREFIX}.wcag_checkbox_label`,
    defaultMessage: 'Space'
  },
  unselectedSecondaryCard: {
    id: `${PREFIX}.unselectedSecondaryCard`,
    defaultMessage: 'Please select a secondary payment method.'
  }
});
