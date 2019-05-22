import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Checkout';

export default defineMessages({
  title: {
    id: `${PREFIX}.title`,
    defaultMessage: 'Check Out'
  },
  payment_title: {
    id: `${PREFIX}.payment_title`,
    defaultMessage: 'Payment Information'
  }
});
