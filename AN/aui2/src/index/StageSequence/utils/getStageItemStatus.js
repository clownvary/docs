import { stageStatus, stepItemStatus } from '../consts/stageStatus';

export default (stepItemList) => {
  const isStepItemError = stepItemList.some(({ status }) => status === stageStatus.DENIED);
  if (isStepItemError) {
    return stepItemStatus.ERROR;
  }

  const isStepItemProcess = stepItemList.some(({ status }) =>
    status === stageStatus.PROGRESS_NO_EMAIL || status === stageStatus.PROGRESS);

  if (isStepItemProcess) {
    return stepItemStatus.PROCESS;
  }

  const isStepItemApproved = stepItemList.every(({ status }) => status === stageStatus.APPROVED);

  if (isStepItemApproved) {
    return stepItemStatus.FINISH;
  }

  return stepItemStatus.WAIT;
};
