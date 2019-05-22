const formatAmount = (beforeAmount) => {
  if (!beforeAmount && beforeAmount !== 0) {
    return '';
  }
  const amount = typeof beforeAmount === 'string' ? parseFloat(beforeAmount) : beforeAmount;
  const negative = amount < 0;
  const absAmount = Math.abs(amount);
  const formattedAmount = absAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return `${negative ? '-' : ''}${formattedAmount}`;
};

export default formatAmount;
