import { push } from 'index/actions/router';
import API from '../api';

export const redirectToConfirmAction = () => dispatch =>
 dispatch(push('newcart/checkout/confirmation'));

export const acceptAAOfferAsyncAction = () => dispatch => (
  API.acceptAAOffer()
  .then(() => dispatch(redirectToConfirmAction()))
);
