export function getPureNumber(number) {
  return number && number.replace(/[^\d]/g, '');
}

export function formatCardNumber(number, maxLength = 0) {
  let cardNumber = '';

  cardNumber = getPureNumber(number);
  if (cardNumber.length > maxLength) {
    cardNumber = maxLength ? cardNumber.substr(0, maxLength) : cardNumber;
  }
  cardNumber = cardNumber.replace(/.{4}(?=.)/g, '$& ');

  return cardNumber;
}
