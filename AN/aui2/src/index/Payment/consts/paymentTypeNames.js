import * as paymentTypes from './paymentTypes';

export default {
  [paymentTypes.CASH]: 'Cash',
  [paymentTypes.CHECK]: 'Check',
  [paymentTypes.CREDITCARD]: 'Credit Card',
  [paymentTypes.DEBITCARD]: 'Debit Card',
  [paymentTypes.ELECTRONICCHECK]: 'Electronic Check',
  [paymentTypes.CREDIT]: 'Credit Account',
  [paymentTypes.GIFTCARD]: 'Gift Card',

  [paymentTypes.REFUND_CASH]: 'Cash',
  [paymentTypes.REFUND_CHECK]: 'Check',
  [paymentTypes.REFUND_CREDITCARD]: 'Credit Card',
  [paymentTypes.REFUND_ACCOUNT]: 'Account',
  [paymentTypes.REFUND_GIFTCARD]: 'Gift Card',
  [paymentTypes.REFUND_DEBITCARD]: 'Debit Card'
};
