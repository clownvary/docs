import reducer from 'index/PermitDetail/reducers/addToCart';


describe('index/PermitDetail/reducers/addToCart.js', () => {
  const payload = { body: {
    no_charge: 'true',
    auto_compelete_receipt: 'true',
    receipt_header_id: 1
  } };

  it('should handle PERMIT_ADD_TO_CART_SUCCESS correctly', () => {
    const state = reducer(undefined, {
      type: 'PERMIT_ADD_TO_CART_SUCCESS',
      payload
    });

    expect(state.get('nocharge')).toEqual(payload.body.no_charge);
    expect(state.get('autoCompeleteReceipt')).toEqual(payload.body.auto_compelete_receipt);
    expect(state.get('receiptHeaderId')).toEqual(payload.body.receipt_header_id);
  });

  it('should handle PERMIT_ADD_TO_CART_FAILURE correctly', () => {
    const state = reducer(undefined, {
      type: 'PERMIT_ADD_TO_CART_FAILURE',
      payload
    });

    expect(state.get('nocharge')).toEqual('');
    expect(state.get('autoCompeleteReceipt')).toEqual('');
    expect(state.get('receiptHeaderId')).toEqual(-1);
  })
})
