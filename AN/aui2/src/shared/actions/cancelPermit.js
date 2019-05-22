import React from 'react';
import { confirm } from 'react-base-ui/lib/services/dialog';
import { redirect } from 'shared/actions/route';
import { pages } from 'shared/consts';
import URL from '../urls';

export const CHANGE_PERMIT_STATUS_SUCCESS = 'CHANGE_PERMIT_STATUS_SUCCESS';
export const CHANGE_PERMIT_STATUS_FAILURE = 'CHANGE_PERMIT_STATUS_FAILURE';

export const gotoRefundDepositFeesPageAction = (permitID, params) => (dispatch, getState) => {
  const { batchID, receiptID } = getState().initialData;

  dispatch(redirect(pages.buildUrl(pages.refundDepositsPage, {
    permit_id: permitID,
    batch_id: batchID || 0,
    receipt_id: receiptID || 0,
    ...params
  })));
};


export const changePermitStatusAsycAction = (permitID, status, isLock) => ({
  types: ['', CHANGE_PERMIT_STATUS_SUCCESS, CHANGE_PERMIT_STATUS_FAILURE],
  promise: (api, dispatch, getState) => {
    const { batchID = 0, receiptID = 0 } = getState().initialData;
    return api.post(URL.changePermitStatus, {
      body: {
        permit_id: permitID,
        batch_id: batchID,
        receipt_id: receiptID,
        status_type: status.status_type,
        status_id: status.status_id,
        status_text: status.status_text,
        permit_status_action: status.permit_status_action,
        stage_id: status.stage_id,
        transaction_stage_id: status.transaction_stage_id,
        check_permit_lock: isLock
      }
    });
  }
});

export const cancelPermitAsycAction = (permitId, isLock) => {
  const status = { status_type: 0,
    status_id: 5,
    status_text: 'Cancelled',
    permit_status_action: -1,
    stage_id: -1,
    transaction_stage_id: -1 };
  return dispatch => dispatch(changePermitStatusAsycAction(permitId, status, isLock));
};

export const gotoReservationDetailPageAction = (permitID, params = {}) =>
  dispatch => dispatch(
    redirect(
      pages.buildUrl(
        pages.reservationDetailPage,
        {
          permit_id: permitID,
          ...params
        }
      ),
      null,
      false
    )
  );

export const reEnterReservationDetailPageAction = (params = {}) =>
  (dispatch, getState) => {
    const { batchID, receiptID } = getState().initialData;

    return dispatch(redirect(
      pages.buildUrl(pages.reloadReservationDetailPage, {
        batch_id: batchID,
        receipt_id: receiptID,
        ...params
      })
    ));
  };

/* eslint-disable react/jsx-filename-extension */

const cancelledWarning = (
  <div className="action-message-warning">
    <span className="icon aaui-alert-warning-icon icon-exclamation" /> Cancelled reservation cannot be modified. Proceed?
  </div>
);

export const confirmCancelPermit = (permitWording, permitNumber) => confirm(
  [
    <div className="action-message">
      <span className="action-message-capitalize">{permitWording.toLowerCase()}</span> number: <strong>{permitNumber}</strong>
    </div>,
    cancelledWarning
  ],
  {
    title: `Cancel ${permitWording}`,
    showCancel: true,
    cancelText: 'No',
    confirmText: 'Yes'
  }
);

export const confirmOnlyCancelPermit = capitalizePermitWording => confirm(
  [
    <div>Are you sure you want to cancel this {capitalizePermitWording.toLowerCase()}?</div>,
    cancelledWarning
  ],
  {
    title: `Cancel ${capitalizePermitWording}`,
    showCancel: true,
    cancelText: 'No',
    confirmText: 'Yes'
  }
);

export const confirmCancelWithRefundOrPay = capitalizePermitWording => confirm(
  [
    <div>Are you sure you want to cancel this {
      capitalizePermitWording.toLowerCase()
    } after refund fees?</div>,
    cancelledWarning
  ],
  {
    title: `Cancel ${capitalizePermitWording}`, // need confirm
    showCancel: true,
    cancelText: 'No',
    confirmText: 'Yes'
  }
);
/* eslint-enable react/jsx-filename-extension */
