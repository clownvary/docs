import formatCurrency from '../../../utils/formatCurrency';

/*
  roundCashPaymentType:
    0: No rounding
    1: Nearest (50% is down)
    2: Nearest (50% is up)
    3: Always up
    4: Always down

  roundCashPaymentTo:
    0: 0.05
    1: 0.10
    2: 0.20
    3: 0.25
    4: 0.50
    5: 1.00
*/

export default function getCalculatedChange(paidAmount, formatCashAmount) {
  const paid = formatCurrency((Math.round(parseFloat(paidAmount) * 100)) / 100);
  const cashAmount = parseFloat(formatCashAmount);

  if (paid <= cashAmount) {
    return formatCurrency(0);
  }

  return formatCurrency(((paid * 100) - (cashAmount * 100)) / 100);
}
