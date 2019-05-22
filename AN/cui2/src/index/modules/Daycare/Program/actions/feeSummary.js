import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';

import { ESTIMATE_PRICE } from '../consts/actionTypes';

const uiEstimatePriceAction = createFSA(ESTIMATE_PRICE);

export const fetchEstimatePrice = programId => dispatch => API.getEstimatePrice({ programId })
  .then((response) => {
    const { body: estimate } = response;
    dispatch(uiEstimatePriceAction({ estimate }));
    return Promise.resolve(response);
  });
