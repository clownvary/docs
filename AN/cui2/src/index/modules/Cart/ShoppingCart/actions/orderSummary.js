import { createFSA } from 'react-base-ui/lib/utils';
import { updateShoppingCart } from 'index/components/Master/actions';
import API from '../api';


import {
  ORDERSUMMARY_UI
} from '../consts/actionTypes';


const uiOrderSummary = createFSA(ORDERSUMMARY_UI);

export const fetchOrderSummary = () => dispatch =>
  API.getOrderSummary({ from: 'shoppingcart' }).then((response) => {
    const { body: { order_summary: orderSummary = {} } } = response;
    dispatch(uiOrderSummary(orderSummary));
    dispatch(updateShoppingCart(orderSummary.cart_count));
  });
