import { string, payment } from 'src/helper';

const { validation } = payment;
const { isNullOrEmpty } = string;

describe('src/helper', () => {
  it('isNullOrEmpty', () => {
    expect(isNullOrEmpty(null)).toEqual(true);
    expect(isNullOrEmpty('')).toEqual(true);
    expect(isNullOrEmpty('32')).toEqual(false);
  });

  it('/ helper/payment/validation.js/ maskCard function', () => {
    const { maskCard } = validation;

    expect(maskCard('32')).toEqual('xxx32');
    expect(maskCard('32ddd')).toEqual('xxx2ddd');
  });

  it('/ helper/payment/validation.js/ amexCard function', () => {
    const { amexCard } = validation;

    expect(amexCard('32')).toEqual(false);
    expect(amexCard('dd')).toEqual(false);
    expect(amexCard('83')).toEqual(false);
    expect(amexCard('111111111111184')).toEqual(false);
  });

  it('/ helper/payment/validation.js/ visaCard function', () => {
    const { visaCard } = validation;

    expect(visaCard('83')).toEqual(false);
    expect(visaCard('1184')).toEqual(false);
    expect(visaCard('1111111111484')).toEqual(false);
    expect(visaCard('4421111111484')).toEqual(true);
  });

  it('/ helper/payment/validation.js/ dinersCard function', () => {
    const { dinersCard } = validation;

    expect(dinersCard('83')).toEqual(false);
    expect(dinersCard('1184')).toEqual(false);
    expect(dinersCard('1111111111484')).toEqual(false);
    expect(dinersCard('38261111111484')).toEqual(true);
  });

  it('/ helper/payment/validation.js/ cardValidation function', () => {
    const { discoverCard } = validation;

    expect(discoverCard('83')).toEqual(false);
    expect(discoverCard('1184')).toEqual(false);
    expect(discoverCard('1111111111484')).toEqual(false);
    expect(discoverCard('6537111111111484')).toEqual(true);
  });

  it('/ helper/payment/validation.js/ jcbCard function', () => {
    const { jcbCard } = validation;

    expect(jcbCard('83')).toEqual(false);
    expect(jcbCard('1184')).toEqual(false);
    expect(jcbCard('3211111111111484')).toEqual(true);
    expect(jcbCard('2411111111111484')).toEqual(false);
    expect(jcbCard('241111111111484')).toEqual(false);
  });

  it('/ helper/payment/validation.js/ cardValidation function', () => {
    const { cardValidation } = validation;

    expect(cardValidation('83')).toEqual(0);
    expect(cardValidation('1184')).toEqual(0);
    expect(cardValidation('1111111111484')).toEqual(0);
    expect(cardValidation('6537111111111484')).toEqual(5);
    expect(cardValidation('5547111111111484')).toEqual(2);
    expect(cardValidation('343111111111184')).toEqual(3);
    expect(cardValidation('4421111111484')).toEqual(1);
    expect(cardValidation('38261111111484')).toEqual(4);
    expect(cardValidation('3211111111111484')).toEqual(6);
  });
});
