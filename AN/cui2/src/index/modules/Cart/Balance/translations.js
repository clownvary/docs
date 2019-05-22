import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Balance';

export default defineMessages({
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
  }
});
