import React from 'react';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/cancelPermit';
import jsonChangePermitStatus from 'json/Bookings/change_permit_status.json';

jest.mock('react-base-ui/lib/services/dialog');
const dialog = require('react-base-ui/lib/services/dialog');

const initialState = {
  initialData: {
    batchID: 0,
    receiptID: 0
  }
};
describe('shared/actions/cancelPermit', () => {
  let store;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
    __STATIC__ = false;

  });

  afterEach(() => {
    store.clearActions();
    __STATIC__ = true;

  });

  it('gotoRefundDepositFeesPageAction method works fine', () => {
    const {
      gotoRefundDepositFeesPageAction
    } = actions;

    store.dispatch(gotoRefundDepositFeesPageAction())
    const storeActions = store.getActions();
    expect(storeActions.length).toBe(2);
    expect(storeActions[1].type).toEqual('LOCATION_REDIRECT');
    expect(storeActions[1].payload).toEqual({
      url: '/ui.do?method=permitRefund&permit_id=undefined&batch_id=0&receipt_id=0&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined',
      useReplace: undefined,
      win: undefined
    });
  });

  it('changePermitStatusAsycAction method works fine', (done) => {
    const {
      changePermitStatusAsycAction
    } = actions;

    store.dispatch(changePermitStatusAsycAction(1, 'Cancell', false)).then(
      () => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBe(2);
        expect(storeActions[1].type).toEqual(actions.CHANGE_PERMIT_STATUS_SUCCESS);
        expect(storeActions[1].payload).toEqual(jsonChangePermitStatus);
        done()
      }
    )
  });

  it('cancelPermitAsycAction method works fine', (done) => {
    const {
      cancelPermitAsycAction
    } = actions;

    store.dispatch(cancelPermitAsycAction(1, false)).then(
      () => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBe(2);
        expect(storeActions[1].type).toEqual(actions.CHANGE_PERMIT_STATUS_SUCCESS);
        expect(storeActions[1].payload).toEqual(jsonChangePermitStatus);
        done()
      }
    )
  });

  it('gotoReservationDetailPageAction method works fine', () => {
    const {
      gotoReservationDetailPageAction
    } = actions;

    store.dispatch(gotoReservationDetailPageAction(1))
    const storeActions = store.getActions();

    expect(storeActions.length).toBe(2);
    expect(storeActions[1].type).toEqual('LOCATION_REDIRECT');
    expect(storeActions[1].payload).toEqual({
      url: '/ui.do?method=reservationDetail&permit_id=1&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined',
      win: null,
      useReplace: false
    });
  });

  it('reEnterReservationDetailPageAction method works fine', () => {
    const {
      reEnterReservationDetailPageAction
    } = actions;

    store.dispatch(reEnterReservationDetailPageAction())
    const storeActions = store.getActions();

    expect(storeActions.length).toBe(2);
    expect(storeActions[1].type).toEqual('LOCATION_REDIRECT');
    expect(storeActions[1].payload).toEqual({
      url: '/ui.do?method=reloadReservationDetail&batch_id=0&receipt_id=0&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined',
      useReplace: undefined,
      win: undefined
    });
  });

  it('confirmCancelPermit method works fine', () => {
    const {
      confirmCancelPermit
    } = actions;
    const mockConfirm = jest.fn();
    dialog.confirm = mockConfirm;

    confirmCancelPermit('permit', '10001');
    expect(mockConfirm).toBeCalledWith(
      [
        <div className="action-message">
          <span className="action-message-capitalize">permit</span> number: <strong>10001</strong>
        </div>,
        <div className="action-message-warning">
          <span className="icon aaui-alert-warning-icon icon-exclamation" /> Cancelled reservation cannot be modified. Proceed?
        </div>
      ],
      {
        cancelText: "No",
        confirmText: "Yes",
        showCancel: true,
        title: "Cancel permit"
      }
    );
  });

  it('confirmOnlyCancelPermit method works fine', () => {
    const {
      confirmOnlyCancelPermit
    } = actions;
    const mockConfirm = jest.fn();
    dialog.confirm = mockConfirm;
    const permit = 'Permit';

    confirmOnlyCancelPermit(permit);
    expect(mockConfirm.mock.calls[0]).toEqual([
      [<div>Are you sure you want to cancel this {permit.toLocaleLowerCase()}?</div>, <div className="action-message-warning"><span className="icon aaui-alert-warning-icon icon-exclamation" /> Cancelled reservation cannot be modified. Proceed?</div>], {"cancelText": "No", "confirmText": "Yes", "showCancel": true, "title": "Cancel Permit"}
    ]);
  });

  it('confirmCancelWithRefundOrPay method works fine', () => {
    const {
      confirmCancelWithRefundOrPay
    } = actions;
    const mockConfirm = jest.fn();
    dialog.confirm = mockConfirm;
    const permit = 'Permit';

    confirmCancelWithRefundOrPay(permit);
    expect(mockConfirm).toBeCalledWith(
      [
        <div>Are you sure you want to cancel this {permit.toLocaleLowerCase()} after refund fees?</div>,
        <div className="action-message-warning">
          <span className="icon aaui-alert-warning-icon icon-exclamation" /> Cancelled reservation cannot be modified. Proceed?
        </div>
      ],
      {
        cancelText: "No",
        confirmText: "Yes",
        showCancel: true,
        title: "Cancel Permit"
      }
    );
  });

});
