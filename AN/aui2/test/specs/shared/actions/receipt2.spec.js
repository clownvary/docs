import {
  cancelReceipt,
  cancelReceiptAsyncAction
} from 'shared/actions/receipt';

jest.mock('shared/utils/syncRequest', () => jest.fn(params => params.success({
  headers: {
    response_code: "0002",
    response_message: 'message'
  }
})));

describe('shared -> actions -> receipt2', () => {
  const batchID = 0;
  const receiptID = 0;

  test('cancelReceipt should work fine, when the voidDraft is default value', () => {
    const result = cancelReceipt(batchID, receiptID);

    expect(result.success).toBe(false);
    expect(result.response_code).toBe('0002');
    expect(result.response_message).toBe('message');
  });
});
