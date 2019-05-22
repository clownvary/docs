import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';

import { FEE_SUMMARY_UI, FEE_SUMMARY_UI_RESET, RECEIPT_NUMBER } from '../consts/actionTypes';

export const uiFeeSummaryAction = createFSA(FEE_SUMMARY_UI);
const uiResetFeeSummaryAction = createFSA(FEE_SUMMARY_UI_RESET);
const receiptNumber = createFSA(RECEIPT_NUMBER);

export const fetchFeeSummary = reno => dispatch =>
  API.getFeeSummary({ reno })
    .then((response) => {
      const { body: { fee_summary: feeSummary } } = response;
      dispatch(uiFeeSummaryAction({ feeSummary }));
      dispatch(receiptNumber({ receiptNumber: feeSummary.reno }));
      return Promise.resolve(response);
    });

export const resetFeeSummary = () => dispatch => dispatch(uiResetFeeSummaryAction());
