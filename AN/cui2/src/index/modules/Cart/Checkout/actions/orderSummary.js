import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';
import {
  ORDERSUMMARY_UI
} from '../consts/actionTypes';

const uiOrderSummary = createFSA(ORDERSUMMARY_UI);

export const fetchOrderSummary = () => dispatch =>
  API.getOrderSummary({ from: 'checkout' }).then((response) => {
    const { body: { order_summary: orderSummary = {} } } = response;
    dispatch(uiOrderSummary(orderSummary));
    return Promise.resolve(response);
  });
