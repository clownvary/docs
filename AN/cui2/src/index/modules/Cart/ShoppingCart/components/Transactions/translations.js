import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.ShoppingCart.Transactions';
export default defineMessages({
  bubble: {
    id: `${PREFIX}.bubble`,
    defaultMessage: '{item_number} {items_wording}, {sub_total} in total.'
  },
  tableThDescription: {
    id: `${PREFIX}.tableThDescription`,
    defaultMessage: 'DESCRIPTION'
  },
  tableThCount: {
    id: `${PREFIX}.tableThCount`,
    defaultMessage: 'COUNT'
  },
  tableThDueDate: {
    id: `${PREFIX}.tableThDueDate`,
    defaultMessage: 'DUE DATE'
  },
  tableThAmountDue: {
    id: `${PREFIX}.tableThAmountDue`,
    defaultMessage: 'AMOUNT DUE'
  },
  tableThQty: {
    id: `${PREFIX}.tableThQty`,
    defaultMessage: 'QTY'
  },
  tableThUnitFee: {
    id: `${PREFIX}.tableThUnitFee`,
    defaultMessage: 'UNIT FEE'
  },
  tableThAmount: {
    id: `${PREFIX}.tableThAmount`,
    defaultMessage: 'AMOUNT'
  },
  labelsIncomplete: {
    id: `${PREFIX}.labelsIncomplete`,
    defaultMessage: 'Incomplete'
  },
  labelsRecurring: {
    id: `${PREFIX}.labelsRecurring`,
    defaultMessage: 'Recurring'
  },
  nameUnspecified: {
    id: `${PREFIX}.nameUnspecified`,
    defaultMessage: 'Unspecified'
  },
  editTransactionAriaLabelText: {
    id: `${PREFIX}.editTransactionAriaLabelText`,
    defaultMessage: 'edit transaction'
  },
  deleteTransactionAriaLabelText: {
    id: `${PREFIX}.deleteTransactionAriaLabelText`,
    defaultMessage: 'delete transaction'
  },
  payOnAccountBalance: {
    id: `${PREFIX}.payOnAccountBalance`,
    defaultMessage: 'PAID ON ACCOUNT BALANCE'
  },
  balancesOnReceipts: {
    id: `${PREFIX}.balancesOnReceipts`,
    defaultMessage: 'Outstanding balances on receipt(s):'
  },
  payOnAccountWarning: {
    id: `${PREFIX}.payOnAccountWarning`,
    defaultMessage: 'Your account has an unpaid balance. It is automatically added to your cart.'
  },
  originalPayer: {
    id: `${PREFIX}.originalPayer`,
    defaultMessage: 'ORIGINAL PAYER'
  },
  refundTo: {
    id: `${PREFIX}.refundTo`,
    defaultMessage: 'REFUND TO'
  },
  amount: {
    id: `${PREFIX}.amount`,
    defaultMessage: 'AMOUNT'
  },
  yourRefund: {
    id: `${PREFIX}.yourRefund`,
    defaultMessage: 'Your Refund'
  },
  refundFee: {
    id: `${PREFIX}.refundFee`,
    defaultMessage: 'Refund Fee'
  },
  finalRefundtoYou: {
    id: `${PREFIX}.finalRefundtoYou`,
    defaultMessage: 'Final Refund to You'
  },
  transferOutfrom: {
    id: `${PREFIX}.transferOutfrom`,
    defaultMessage: 'Transfer out from'
  },
  transferTo: {
    id: `${PREFIX}.transferTo`,
    defaultMessage: 'Transfer to'
  },
  subtotalForPackage: {
    id: `${PREFIX}.subtotalForPackage`,
    defaultMessage: 'Subtotal for Package'
  },
  transferFee: {
    id: `${PREFIX}.transferFee`,
    defaultMessage: 'Transfer Fee'
  },
  packageRelated: {
    id: `${PREFIX}.packageRelated`,
    defaultMessage: 'Package Related'
  },
  transferLabel: {
    id: `${PREFIX}.transferLabel`,
    defaultMessage: 'TRANSFER'
  },
  withdrawalLabel: {
    id: `${PREFIX}.withdrawalLabel`,
    defaultMessage: 'WITHDRAWAL'
  },
  noCharges: {
    id: `${PREFIX}.noCharges`,
    defaultMessage: 'No charges'
  },
  subtotalPerParticipant: {
    id: `${PREFIX}.subtotalPerParticipant`,
    defaultMessage: 'Subtotal per participant'
  },
  seatAmount: {
    id: `${PREFIX}.seatAmount`,
    defaultMessage: 'Number of seats'
  },
  youNeedtoPay: {
    id: `${PREFIX}.youNeedtoPay`,
    defaultMessage: 'You Need to Pay'
  },
  noPurchaser: {
    id: `${PREFIX}.noPurchaser`,
    defaultMessage: 'Purchaser must print and deliver.'
  },
  refundPriorEnrollment: {
    id: `${PREFIX}.refundPriorEnrollment`,
    defaultMessage: 'Refund of Prior Enrollment'
  },
  usePaymentPlan: {
    id: `${PREFIX}.usePaymentPlan`,
    defaultMessage: 'Use {payment_plan_label}'
  },
  totalPaymentPlan: {
    id: `${PREFIX}.totalPaymentPlan`,
    defaultMessage: 'Total'
  }
});
