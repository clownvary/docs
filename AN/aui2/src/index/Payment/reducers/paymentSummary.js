import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import camelize from 'shared/utils/camelize';
import formatCurrency from '../utils/formatCurrency';

const getInitialState = (initData) => {
  const { paymentSummary } = initData;
  const {
    hasBalance,
    hasPayments,
    totalAmount,
    balanceAmount,
    paidAmount,
    payers,
    refunds,
    totalBalanceAmount
  } = camelize(paymentSummary);

  // only when make payment from reservation detail page
  /* istanbul ignore next */
  return fromJS({
    totalAmount: formatCurrency(totalAmount),
    paidAmount: formatCurrency(paidAmount),
    balanceAmount: formatCurrency(balanceAmount),
    hasBalance,
    hasPayments,
    payers: payers || [],
    refunds: refunds || [],
    totalBalanceAmount
  });
};


export default function getPaymentSummaryReducer(initData) {
  return reducerHandler(getInitialState(initData), {});
}
