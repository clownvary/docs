import createFSA from 'react-base-ui/lib/utils/createFSA';
import { clearAll } from 'shared/utils/messages';
import { isValidationErrorFromApi } from 'shared/utils/apiError';

import { fetchCartPageDataAsyncAction } from './common';

import API from '../api';
import {
  DONATIONS_UI_AMOUNT,
  DONATIONS_UI_CAMPAIGN,
  DONATIONS_UI_LIST
} from '../consts/actionTypes';

const uiDonationsAction = createFSA(DONATIONS_UI_LIST);


export const changeAmountAction = createFSA(DONATIONS_UI_AMOUNT);
export const changeCampaignAction = createFSA(DONATIONS_UI_CAMPAIGN);

export const fetchQuickDonationAction = () => (dispatch, getState) => {
  const configurations = getState().configurations;
  if (configurations.get('enable_quick_donation_in_cart') && configurations.get('allow_donations_online')) {
    return API.getQuickDonation().then((response) => {
      const donations = response.body.donations;
      dispatch(uiDonationsAction(donations));
    });
  }

  return false;
};

export const submitQuickDonationAction = () => (dispatch, getState) => {
  const quickdonation = getState().modules.Cart.ShoppingCart.quickdonation;
  const dueAmount = `${quickdonation.get('amount')}`;
  const campaignId = quickdonation.get('selectedCampaignValue');

  clearAll();

  return API.setQuickDonation({
    body: {
      due_amount: dueAmount,
      campaign_id: campaignId
    } })
    .catch((error) => {
      if (isValidationErrorFromApi(error)) {
        dispatch(fetchCartPageDataAsyncAction());
      }
      return Promise.reject(error);
    })
    .then(() => {
      dispatch(changeAmountAction(null));
      dispatch(changeCampaignAction(null));
      return dispatch(fetchCartPageDataAsyncAction());
    });
};
