import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';

import {
  FEE_SUMMARY
} from '../actions/feeSummary';


const getInitialState = (initData) => {
  const {
    reservationDetail
  } = initData;

  const reservations = convertCasingPropObj(reservationDetail);

  return fromJS({
    feeSummary: fromJS(reservations.feeSummary)
  });
};

const handlers = {

  [FEE_SUMMARY](state, { payload: { feeSummary } }) {
    return state.set('feeSummary', fromJS(feeSummary));
  }

};

export default function getFeeSummaryReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

