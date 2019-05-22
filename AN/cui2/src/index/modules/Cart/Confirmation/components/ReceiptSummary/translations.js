import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Confirmation.ReceiptSummary';

export default defineMessages({
  title: {
    id: `${PREFIX}.title`,
    defaultMessage: 'Receipt Summary'
  },
  receiptPaymentInformation: {
    id: `${PREFIX}.receiptPaymentInformation`,
    defaultMessage: 'Payment Information'
  },
  creditCard: {
    id: `${PREFIX}.creditCard`,
    defaultMessage: 'Credit Card'
  },
  electronicCheck: {
    id: `${PREFIX}.electronicCheck`,
    defaultMessage: 'Electronic {checkLabel}'
  }
});
