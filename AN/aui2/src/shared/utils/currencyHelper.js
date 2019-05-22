const formatCurrency = money => `${money >= 0 ? '' : '-'}$${Math.abs(parseFloat(money)).toFixed(2)}`;

const fixedMoney = (money) => {
  if (isNaN(parseFloat(money))) {
    return 0;
  }
  return parseFloat(parseFloat(money).toFixed(2));
};

const fixedMoneyString = (money) => {
  if (isNaN(parseFloat(money))) {
    return '0.00';
  }
  return parseFloat(money).toFixed(2);
};

export default {
  formatCurrency,
  fixedMoney,
  fixedMoneyString
};
