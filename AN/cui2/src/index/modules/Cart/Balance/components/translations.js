import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Balance';

export default defineMessages({
  info: {
    id: `${PREFIX}.info`,
    defaultMessage: 'Outstanding balances for <strong>{customerName}</strong> as of {balanceDate}'
  },
  receipt: {
    id: `${PREFIX}.receipt`,
    defaultMessage: 'Receipt'
  },
  dateIssued: {
    id: `${PREFIX}.dateIssued`,
    defaultMessage: 'Date Issued'
  },
  nextPaymentDate: {
    id: `${PREFIX}.nextPaymentDate`,
    defaultMessage: 'Next Payment Date'
  },
  originalBalance: {
    id: `${PREFIX}.originalBalance`,
    defaultMessage: 'Original Balance'
  },
  currentBalance: {
    id: `${PREFIX}.currentBalance`,
    defaultMessage: 'Current Balance'
  },
  paymentAmount: {
    id: `${PREFIX}.paymentAmount`,
    defaultMessage: 'Payment Amount'
  },
  remainingBalance: {
    id: `${PREFIX}.remainingBalance`,
    defaultMessage: 'Remaining Balance'
  },
  subtotal: {
    id: `${PREFIX}.subtotal`,
    defaultMessage: 'Subtotal'
  },
  maxError: {
    id: `${PREFIX}.maxError`,
    defaultMessage: 'Please enter a value less than or equal to '
  },
  minError: {
    id: `${PREFIX}.minError`,
    defaultMessage: 'Please enter a value greater than or equal to '
  },
  nextError: {
    id: `${PREFIX}.nextError`,
    defaultMessage: 'Oops! Please fix the highlighted error(s) and try again.'
  },
  receiptInputMsg: {
    id: `${PREFIX}.receiptInputMsg`,
    defaultMessage: 'You has an unpaid balance of {max}. Please specify a payment amount less than or equal to {max}. '
  },
  receiptInputRequiredMsg: {
    id: `${PREFIX}.receiptInputRequiredMsg`,
    defaultMessage: 'You has an unpaid balance of {max}. A required minimum payment of {min} will be needed to complete the online transaction.'
  },
  requireMinPaymentAmount: {
    id: `${PREFIX}.requireMinPaymentAmount`,
    defaultMessage: 'The required minimum payment of {requireMinPayment} will be needed to complete the online transaction.'
  }
});
