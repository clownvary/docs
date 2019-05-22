import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  FETCH_PERMIT_CONFIRMATION_SUCCESS
} from '../actions/permitConfirmation';

const initialState = fromJS({
  // if permit_number is not empty, it's permit-modify,
  // otherwise it's new reservation
  permitNumber: null,
  autoPrintPermits: false,
  autoPrintReceipts: false,
  email: '',
  receiptHeaderID: '',
  permitOwnerName: '',
  customerName: '',
  companyName: '',
  permitTransactions: [],
  automaticReceiptEmail: false,
  receiptNumber: ''
});

const handlers = {
  [FETCH_PERMIT_CONFIRMATION_SUCCESS](state, { payload: { body: data } }) {
    const confirmation = data.permit_confirmation;

    return state.withMutations((s) => {
      s.set('permitNumber', confirmation.permit_number);
      s.set('autoPrintPermits', confirmation.auto_print_permits);
      s.set('autoPrintReceipts', confirmation.auto_print_receipts);
      s.set('email', confirmation.email);
      s.set('receiptHeaderID', confirmation.receipt_header_id);
      s.set('permitOwnerName', confirmation.permit_owner_name);
      s.set('customerName', (`${confirmation.first_name} ${confirmation.last_name}`).trim());
      s.set('companyName', confirmation.company_name);
      s.set('permitTransactions', fromJS(confirmation.permit_transactions));
      s.set('automaticReceiptEmail', confirmation.automatic_receipt_email);
      s.set('receiptNumber', confirmation.receipt_number);
    });
  }
};

export default reducerHandler(initialState, handlers);
