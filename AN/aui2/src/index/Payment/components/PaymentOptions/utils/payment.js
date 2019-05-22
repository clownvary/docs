import store from '../../../store';
import formatCurrency from '../../../utils/formatCurrency';
import { getFormatAmount } from '../../../utils/splitOptions';

export function getTotalAssignExceptKey(key) {
  const options = store.getState().paymentOptions.options.toJS().data;
  let totalAssignExceptKey = 0;

  options.forEach((option, index) => {
    if (key !== index) {
      totalAssignExceptKey += parseFloat(getFormatAmount(option, option.activeVal));
    }
  });

  return totalAssignExceptKey;
}

function getTotal() {
  const { payment } = store.getState();
  const isPaymentActionValid = payment.get('isPaymentActionValid');
  const paymentTotal = payment.get('total');
  const paynowAmount = payment.get('payNow');

  return parseFloat(isPaymentActionValid ? paynowAmount : paymentTotal);
}

export function getTotalAssign(key, amount) {
  let totalAssign = 0;
  const totalAssignExceptKey = getTotalAssignExceptKey(key);
  /* eslint-disable */
  amount = parseFloat(amount);
  if (isNaN(amount)) {
    amount = 0;
  }
  /* eslint-enable */

  totalAssign = totalAssignExceptKey + parseFloat(amount);
  return totalAssign;
}

export function getDefaultAmount(key) {
  const total = getTotal();
  const defaultAmount = total - getTotalAssign(key);
  return formatCurrency(defaultAmount);
}

export function getRemaining(key, amount = 0) {
  const total = getTotal();
  const balance = total - getTotalAssign(key, amount);

  if (balance < 0) {
    return balance;
  }

  return {
    remaining: formatCurrency(parseFloat(balance))
  };
}

export function getPrevRemaining() {
  return store.getState().payment.get('remaining');
}
