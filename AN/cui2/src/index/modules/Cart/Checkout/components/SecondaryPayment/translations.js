import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Checkout.SeondaryPayment';

export default defineMessages({
  title: {
    id: `${PREFIX}.title`,
    defaultMessage: 'Secondary Payment Method for Future Charges'
  },
  paymentTips: {
    id: `${PREFIX}.paymentTips`,
    defaultMessage: 'If the primary payment method fails, then the secondary payment method will be charged using the same billing address.'
  }
});
