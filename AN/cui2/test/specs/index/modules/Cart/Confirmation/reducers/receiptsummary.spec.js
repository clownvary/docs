import { expect } from 'chai';
import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Cart/Confirmation/consts/actionTypes';
import receiptsummaryReducer from 'index/modules/Cart/Confirmation/reducers/receiptSummary';

describe('index/modules/Cart/Confirmation/reducers/receiptSummary', () => {
  const expectedInitialState = fromJS({
    receiptNumber: [],
    paymentInfo: [],
    orderSummary: [],
    payOnAccount: [],
    participants: [],
    showWidgets: true,
    sharingActivityName: '',
    sharingActivityId: '',
    paymentMethod: [],
    paymentType: ''
  });

  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, receiptsummaryReducer(undefined, {}))).to.be.true;
  });

  it('Should fetch receiptsummary data successfully', () => {
    const { RECEIPTSUMMARY_UI_LIST } = actionTypes;
    const returnState = receiptsummaryReducer(undefined, {
      type: RECEIPTSUMMARY_UI_LIST,
      payload: {
        receiptNumber: 1
      }
    });
    expect(returnState.get('receiptNumber')).to.equal(1);
  });
});
