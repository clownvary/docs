import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Checkout.components.Coupon';

export default defineMessages({
  placeHolder: {
    id: `${PREFIX}.placeholder`,
    defaultMessage: 'Enter coupon code'
  },
  couponCodeLabel: {
    id: `${PREFIX}.couponCodeLabel`,
    defaultMessage: 'No.{couponCode}'
  },
  participantsLabel: {
    id: `${PREFIX}.participantsLabel`,
    defaultMessage: 'For {participants}'
  },
  participantsLabelWithOnly: {
    id: `${PREFIX}.participantsLabelWithOnly`,
    defaultMessage: 'For {participants} only'
  }
});
