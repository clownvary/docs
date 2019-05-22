import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';
import { RECEIPTSUMMARY_UI_LIST } from '../consts/actionTypes';

const uiReceiptSummaryAction = createFSA(RECEIPTSUMMARY_UI_LIST);

export const fetchTransactionsAction = () => dispatch =>
  API.getReceiptSummary().then((response) => {
    const {
      body: {
        receipt_number: receiptNumber,
        show_widgets: showWidgets,
        payment_info: paymentInfo,
        order_summary: orderSummary,
        pay_on_account: payOnAccount,
        sharing_activity_name: sharingActivityName,
        sharing_activity_id: sharingActivityId,
        payment_method: paymentMethod,
        payment_type: paymentType,
        participants
      }
    } = response;

    dispatch(uiReceiptSummaryAction({
      receiptNumber,
      paymentInfo,
      orderSummary,
      payOnAccount,
      participants,
      showWidgets,
      sharingActivityName,
      sharingActivityId,
      paymentMethod,
      paymentType
    }));
    return Promise.resolve(response);
  });
