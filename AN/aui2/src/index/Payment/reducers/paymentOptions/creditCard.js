import { fromJS } from 'immutable';
import find from 'lodash/find';
import reducerHandler from 'shared/utils/reducerHandler';
import { paymentTypes, newOptions } from '../../consts';

export const USE_NEW_CARD_ENTITY = {
  value: newOptions.NEW_OPTION_VALUE,
  text: 'Use new card'
};

const getInitialState = (initData) => {
  const { paymentOptions, isRefund } = initData;
  /* istanbul ignore next */
  const creditCardType = isRefund ?
    paymentTypes.REFUND_CREDITCARD : paymentTypes.CREDITCARD;
  const creditCardOption = find(paymentOptions, item => item.id === creditCardType);
  /* istanbul ignore next */
  const creditCardLabel = creditCardOption ? creditCardOption.name : 'credit card';

  return fromJS({
    isRefund,
    creditCardLabel,
    defaultOtherNumber: '' // be used refund to a new credit card.
  });
};

const handlers = {};

export default function getCreditCardReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
