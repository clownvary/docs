import configurateStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Confirmation/actions/permitConfirmation';

describe('index/Confirmation/actions/permitConfirmation', () => {
  it('Should fetchPermitConfirmation method works fine', (done) => {
    const mockStore = configurateStore(middlewares);
    const store = mockStore({});

    const receiptHeaderID = 123;
    store.dispatch(actions.fetchPermitConfirmation(receiptHeaderID)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action =>
        action.type === actions.FETCH_PERMIT_CONFIRMATION_SUCCESS));
      const confirmation = storeActions
        .filter(action => action.type === actions.FETCH_PERMIT_CONFIRMATION_SUCCESS)[0];
      expect(confirmation.payload.body.permit_confirmation.receipt_header_id).toBe(receiptHeaderID);
      done();
    });
  });
});
