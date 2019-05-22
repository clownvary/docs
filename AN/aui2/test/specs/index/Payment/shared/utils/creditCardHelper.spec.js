import {
  getCardTypeSystemIdByCardTypeId,
  getValidCardTypeId,
  getCardTypeSystemIdByName,
  formatExpirationDate,
  maskCard,
  getCardTypeIdByCardTypeName,
  validExpiryValue
} from 'index/Payment/utils/creditCardHelper';

describe('index/Payment/utils/creditCardHelper', () => {
  const creditCardTypeList = [
    { id: 122, card_type_id: 1, card_type: 'Visa' },
    { id: 219, card_type_id: 2, card_type: 'MasterCard' }
  ];

  it('getCardTypeIdByCardTypeName method should work fine', () => {
    expect(getCardTypeIdByCardTypeName('Visa')).toEqual(1);
    expect(getCardTypeIdByCardTypeName('Mastercard')).toEqual(2);
    expect(getCardTypeIdByCardTypeName('Amex')).toEqual(3);
    expect(getCardTypeIdByCardTypeName('American')).toEqual(3);
    expect(getCardTypeIdByCardTypeName('AX')).toEqual(3);
    expect(getCardTypeIdByCardTypeName('Dinersclub')).toEqual(4);
    expect(getCardTypeIdByCardTypeName('Diners')).toEqual(4);
    expect(getCardTypeIdByCardTypeName('Discover')).toEqual(5);
    expect(getCardTypeIdByCardTypeName('DI')).toEqual(5);
    expect(getCardTypeIdByCardTypeName('JCB')).toEqual(6);
    expect(getCardTypeIdByCardTypeName('others')).toEqual(0);
  });

  it('getCardTypeSystemIdByCardTypeId method should work fine', () => {
    expect(getCardTypeSystemIdByCardTypeId(2, creditCardTypeList)).toEqual(219);
    expect(getCardTypeSystemIdByCardTypeId(3, creditCardTypeList)).toEqual(3);
  });

  it('getValidCardTypeId method should work fine', () => {
    expect(getValidCardTypeId(2, creditCardTypeList)).toEqual(2);
    expect(getValidCardTypeId(3, creditCardTypeList)).toEqual(0);
  });

  it('getCardTypeSystemIdByName method should work fine', () => {
    expect(getCardTypeSystemIdByName('MasterCard', creditCardTypeList)).toEqual(219);
    expect(getCardTypeSystemIdByName('JCB', creditCardTypeList)).toEqual(0);
  });


  it('formatExpirationDate method should work fine', () => {
    expect(formatExpirationDate(5, 18)).toEqual('05/18');
    expect(formatExpirationDate(11, 18)).toEqual('11/18');
  });

  it('maskCard method should work fine', () => {
    expect(maskCard('')).toEqual('');
    expect(maskCard('772')).toEqual('xxx772');
    expect(maskCard('6227003818130876221')).toEqual('xxx6221');
  });

  it('validExpiryValue method should work fine', () => {
    const prefix = 'auto payment plan';
    expect(validExpiryValue('12/2030', prefix, new Date(2018, 11, 26))).toEqual({
      expireMsg: 'auto payment plan year is more than 10 years in the future',
      isCCExpired: true
    });
    expect(validExpiryValue('12/2021', prefix, new Date(2018, 11, 26))).toEqual({
      isCCExpired: false
    });
    expect(validExpiryValue('11/2018', prefix, new Date(2018, 11, 26))).toEqual({
      expireMsg: 'auto payment plan is in the past',
      isCCExpired: true
    });

    expect(validExpiryValue()).toEqual({
      isCCExpired: false
    });
    expect(validExpiryValue('62030', prefix, new Date(2018, 11, 26))).toEqual({
      expireMsg: 'auto payment plan year is more than 10 years in the future',
      isCCExpired: true
    });
    expect(validExpiryValue('112018', prefix, new Date(2018, 11, 26))).toEqual({
      expireMsg: 'auto payment plan is in the past',
      isCCExpired: true
    });
    expect(validExpiryValue('7112018', prefix, new Date(2018, 11, 26))).toEqual({
      expireMsg: 'auto payment plan contains invalid date',
      isCCExpired: true
    });
    expect(validExpiryValue('7t2018', prefix, new Date(2018, 11, 26))).toEqual({
      expireMsg: 'auto payment plan month is invalid',
      isCCExpired: true
    });
    expect(validExpiryValue('1120t8', prefix, new Date(2018, 11, 26))).toEqual({
      expireMsg: 'auto payment plan year is invalid',
      isCCExpired: true
    });
    expect(validExpiryValue('518', prefix, new Date(2018, 11, 26))).toEqual({
      expireMsg: 'auto payment plan is in the past',
      isCCExpired: true
    });
  })
});
