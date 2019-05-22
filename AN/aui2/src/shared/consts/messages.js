export const SUCCESS = 'success';
export const WARN = 'warning';
export const DANGER = 'danger';
export const ERROR = 'error';
export const INFO = 'info';


export const messageKey = 'message_code';

export const reservationDetails = {
  refundDeposits_Claim_Success: {
    code: 1,
    type: SUCCESS,
    value: 'Security deposit has been claimed successfully.'
  },
  confirmReservationDetailChange_Success: {
    code: 2,
    type: SUCCESS,
    value: 'Changes have been saved successfully.'
  },
  paymentByReservationDetailActionBar_Success: {
    code: 3,
    type: SUCCESS,
    value: 'Payment succeeded.'
  },
  modifyPaymentPlanByReservationDetailActionBar_Success: {
    code: 4,
    type: SUCCESS,
    value: 'Changes have been saved successfully.'
  },
  // This message shall only be displayed when users cancel a permit from reservation detail page
  cancelPermitInRD_Success: {
    code: 5,
    type: SUCCESS,
    value: 'Success. Reservation has been cancelled.'
  },
  cancelPermitWithRefundOrPay_Success: {
    code: 6,
    type: SUCCESS,
    value: 'Success. Fees have been refunded. Reservation has been cancelled.'
  },
  // Only refund or pay happen, permit is not cancelled
  refundOrPayWithoutCancel_Success: { // ANE-76935
    code: 7,
    type: SUCCESS,
    value: 'Success. Fees have been refunded.'
  }
};

export const leavePagePrompt = 'If you continue, your pending receipt will be cancelled. Are you sure you want to leave the page?';
