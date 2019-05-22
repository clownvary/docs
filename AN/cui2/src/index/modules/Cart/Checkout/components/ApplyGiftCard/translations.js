import {
  defineMessages
} from 'react-intl';

const PREFIX = 'app.modules.cart.Checkout.components.ApplyGiftCard';

export default defineMessages({
  buttonAdd: {
    id: `${PREFIX}.buttonAdd`,
    defaultMessage: 'Apply'
  },
  giftCardInputPlaceHolder: {
    id: `${PREFIX}.giftCardInputPlaceHolder`,
    defaultMessage: '{giftCard_label}'
  },
  deleteGiftCardAriaLabelText: {
    id: `${PREFIX}.deleteGiftCardAriaLabelText`,
    defaultMessage: 'Delete GiftCard'
  }
});
