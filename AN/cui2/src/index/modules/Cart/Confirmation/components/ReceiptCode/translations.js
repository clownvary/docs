import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Confirmation.ReceiptCode';

export default defineMessages({
  title: {
    id: `${PREFIX}.title`,
    defaultMessage: 'Your receipt #{item_number} has been completed!'
  },
  receiptMessage: {
    id: `${PREFIX}.receiptMessage`,
    defaultMessage: 'You will receive a confirmation email shortly.'
  },
  receiptPrint: {
    id: `${PREFIX}.receiptPrint`,
    defaultMessage: 'View printable receipt'
  },
  receiptShare: {
    id: `${PREFIX}.receiptShare`,
    defaultMessage: 'Share to'
  },
  sharedText: {
    id: `${PREFIX}.sharedText`,
    defaultMessage: 'I just signed up for {activityName}. Check it out!'
  }
});
