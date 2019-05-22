import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import {
  FETCH_PERMIT_FEE_SUCCESS,
  DECORATE_FACILITY
} from '../actions/permitFee';

const initialState = fromJS({
  eventFee: fromJS({}),
  facilityFees: fromJS([]),
  subTotal: 0,
  taxes: [],
  total: 0,
  description: '',
  amountPaid: 0,
  dueNow: 0,
  refundAmount: 0,
  allFacilities: fromJS({})
});

const handlers = {

  [FETCH_PERMIT_FEE_SUCCESS](state, { payload: { body: data } }) {
    const feeData = convertCasingPropObj(data.reservation_fee);
    let eventFee = {};
    let summaryFee = {};
    let facilityFees = [];

    eventFee = Object.assign({}, feeData.eventFee);
    summaryFee = feeData.feeSummary;
    facilityFees = feeData.eventFee.facilityFees;
    delete eventFee.facilityFees;

    const { allowAddFee, allowEditFee, allowDeleteFee, allowResetFees } = feeData;
    return state.withMutations((s) => {
      s.set('eventFee', fromJS(eventFee));
      s.set('facilityFees', fromJS(facilityFees));
      s.set('subTotal', summaryFee.subTotal);
      s.set('taxes', fromJS(summaryFee.taxes));
      s.set('total', summaryFee.total);
      s.set('amountPaid', summaryFee.amountPaid);
      s.set('dueNow', summaryFee.dueNow);
      s.set('refundAmount', summaryFee.refundAmount);
      s.set('feeActionStatus', { allowAddFee, allowEditFee, allowDeleteFee, allowResetFees });
    });
  },

  [DECORATE_FACILITY](state, { payload: { eventFee, feeSummary, eventIndex, eventSummary } }) {
    const allFacilities = state.get('allFacilities').toJS();
    allFacilities[`event_${eventIndex}`] = { eventFee, feeSummary, eventSummary };
    return state.set('allFacilities', fromJS(allFacilities));
  }
};

export default reducerHandler(initialState, handlers);
