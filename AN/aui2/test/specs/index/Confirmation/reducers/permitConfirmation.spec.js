/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { is, fromJS } from 'immutable';
import { FETCH_PERMIT_CONFIRMATION_SUCCESS } from 'index/Confirmation/actions/permitConfirmation';
import reducers from 'index/Confirmation/reducers/permitConfirmation';

import confirmationResponse from 'json/PermitConfirmation/permit_confirmation.json';

describe('index/Confirmation/reducers/permitConfirmation', () => {

  const initialState = fromJS({
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

  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(initialState, state)).toBe(true);
  });

  it('Should fetch permit confirmation success', () => {
    const state = reducers(initialState, {
      type: FETCH_PERMIT_CONFIRMATION_SUCCESS,
      payload: confirmationResponse
    });
    const confirmation = confirmationResponse.body.permit_confirmation;
    expect(state.get('permitNumber')).toBe(confirmation.permit_number);
    expect(state.get('autoPrintPermits')).toBe(confirmation.auto_print_permits);
    expect(state.get('autoPrintReceipts')).toBe(confirmation.auto_print_receipts);
    expect(state.get('email')).toBe(confirmation.email);
    expect(state.get('receiptHeaderID')).toBe(confirmation.receipt_header_id);
    expect(state.get('permitOwnerName')).toBe(confirmation.permit_owner_name);
    expect(state.get('permitNumber')).toBe(confirmation.permit_number);
    expect(state.get('customerName')).toBe((`${confirmation.first_name} ${confirmation.last_name}`).trim());
    expect(state.get('companyName')).toBe(confirmation.company_name);
    expect(is(state.get('permitTransactions'), fromJS(confirmation.permit_transactions))).toBe(true);
    expect(state.get('receiptNumber')).toBe(confirmation.receipt_number);
  });
});
