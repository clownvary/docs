import { fromJS } from 'immutable';

const generateCreditCardsIds = creditCards =>
  fromJS(creditCards).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));

const generateTempCreditCardId = (typeId, cardNumber, ccSaveForFurture, customerId, payerId) =>
  `${typeId}_${cardNumber}${ccSaveForFurture && customerId === payerId ? '' : '_isTemped'}`;

const generateEChecksIds = eChecks =>
  fromJS(eChecks).map(ecp => ecp.set('id', `${ecp.get('account_number')}_${ecp.get('routing_number')}`));

const generateTepmECheckId = (
  accountNumber, routingNumber, ecpSavedForFurtureUse, customerId, payerId
) => `${accountNumber}_${routingNumber}${ecpSavedForFurtureUse && customerId === payerId ? '' : '_isTemped'}`;

const getLastFourNumber = (number) => {
  const trimedNumber = number.replace(/\s+$/g, '');
  const digitsToShow = trimedNumber.length > 4 ? 4 : trimedNumber.length;
  return trimedNumber.substring(trimedNumber.length - digitsToShow);
};

export default {
  generateCreditCardsIds,
  generateTempCreditCardId,
  generateEChecksIds,
  generateTepmECheckId,
  getLastFourNumber
};
