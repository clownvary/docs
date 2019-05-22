export const PERMIT_STATUS = {
  Denied: 1,
  Cancelled: 5,
  Completed: 7
};

export const PERMIT_STATUS_OBJECT = {
  Cancelled: {
    status_type: 0,
    status_id: 5,
    status_text: 'Cancelled',
    permit_status_action: -1,
    stage_id: -1,
    transaction_stage_id: -1
  }
};

export const isCancelled = permitStatusValue => permitStatusValue === PERMIT_STATUS.Cancelled;
export const isDenied = permitStatusValue => permitStatusValue === PERMIT_STATUS.Denied;
export const isCompleted = permitStatusValue => permitStatusValue === PERMIT_STATUS.Completed;

export default {
  PERMIT_STATUS,
  PERMIT_STATUS_OBJECT,
  isCancelled
};
