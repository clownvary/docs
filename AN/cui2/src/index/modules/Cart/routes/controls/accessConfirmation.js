import getRoutPathWithOrg from 'shared/utils/getRoutPathWithOrg';
import { fetchTransactionsAction } from '../../../Cart/Confirmation/actions/receiptSummary';

const accessConfirmation = (replace, callback, store) => {
  store.dispatch(fetchTransactionsAction()).then((response) => {
    const { body: { order_summary: { confirmation_valid: confirmationValid } } } = response;
    if (!confirmationValid) {
      replace(getRoutPathWithOrg('newcart'));
    }
    callback();
  });
};

export default accessConfirmation;
