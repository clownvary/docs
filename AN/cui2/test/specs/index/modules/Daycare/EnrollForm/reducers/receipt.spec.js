import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import receiptReducer from 'index/modules/Daycare/EnrollForm/reducers/receipt';

describe('index/modules/Daycare/EnrollForm/reducers/receipt', () => {
  const initialState = fromJS({
    receiptNumber: 0
  });

  it('Should return the expected initial state', () => {
    expect(is(initialState, receiptReducer(undefined, {}))).toBeTruthy();
  });

  it('Should save receipt number correctly', () => {
    const { RECEIPT_NUMBER } = actionTypes;
    const receiptNumber = 2;

    const returnState = receiptReducer(initialState, {
      type: RECEIPT_NUMBER,
      payload: { receiptNumber }
    });
    expect(returnState.get('receiptNumber')).toEqual(receiptNumber);

    const errorReceiptNumberState = receiptReducer(returnState, {
      type: RECEIPT_NUMBER,
      payload: { receiptNumber: '' }
    });
    expect(errorReceiptNumberState.get('receiptNumber')).toEqual(receiptNumber);
  });
});
