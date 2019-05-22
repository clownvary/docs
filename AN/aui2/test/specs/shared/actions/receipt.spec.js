import {
  cancelReceipt,
  cancelReceiptAsyncAction
} from 'shared/actions/receipt';

jest.mock('shared/utils/syncRequest', () =>
  jest.fn(params => {
    params.error();
    params.success({
      headers: {
        response_code: "0000"
      }
    });
  })
);

describe('shared -> actions -> receipt', () => {
  const batchID = 0;
  const receiptID = 0;
  const voidDraft = false;

  test('cancelReceipt should work fine', () => {
    const result = cancelReceipt(batchID, receiptID, voidDraft);

    expect(result.success).toBe(true);
    expect(result.response_code).toBe('');
    expect(result.response_message).toBe(undefined);
  });

  test('cancelReceiptAsyncAction should work fine', () => {
    const API = {
      post: jest.fn()
    };

    cancelReceiptAsyncAction(batchID, receiptID);
    const result = cancelReceiptAsyncAction(batchID, receiptID, voidDraft);
    result.promise(API);

    expect(typeof result.promise).toBe('function');
  });
});
