import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Confirmation.ReceiptTransaction';

export default defineMessages({
  labelsRecurring: {
    id: `${PREFIX}.labelsRecurring`,
    defaultMessage: 'Recurring'
  },
  payOnAccountBalance: {
    id: `${PREFIX}.payOnAccountBalance`,
    defaultMessage: 'PAID ON ACCOUNT BALANCE'
  },
  balancesOnReceipts: {
    id: `${PREFIX}.balancesOnReceipts`,
    defaultMessage: 'Outstanding balances on receipt(s):'
  },
  transferLabel: {
    id: `${PREFIX}.transferLabel`,
    defaultMessage: 'TRANSFER'
  },
  withdrawalLabel: {
    id: `${PREFIX}.withdrawalLabel`,
    defaultMessage: 'WITHDRAWAL'
  },
  noPurchaser: {
    id: `${PREFIX}.noPurchaser`,
    defaultMessage: 'Purchaser must print and deliver.'
  }
});
