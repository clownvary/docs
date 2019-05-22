import {
  getDigitalStyleByDiscountType,
  getParticipantsString
} from 'index/modules/Cart/ShoppingCart/components/Coupon/util.js';

describe('index/modules/Cart/ShoppingCart/components/Coupon/util/getDigitalStyleByDiscountType', () => {
  it('Return currency if discountType is 0', () => {
    const style = getDigitalStyleByDiscountType(0);
    expect(style).toEqual('currency');
  });

  it('Return percent if discountType is 1', () => {
    const style = getDigitalStyleByDiscountType(1);
    expect(style).toEqual('percent');
  });

  it('Return undefined if discountType is not 0 or 1', () => {
    const style = getDigitalStyleByDiscountType();
    expect(style).toEqual(undefined);

    const style2 = getDigitalStyleByDiscountType(5);
    expect(style2).toEqual(undefined);
  });
});

describe('index/modules/Cart/ShoppingCart/components/Coupon/util/getParticipantsString', () => {
  it('Return formate as expect if first name, middle name and last name have value', () => {
    const exampleNames = [
      {
        first_name: 'Nara',
        middle_name: 'No.',
        last_name: 'Zhang'
      },
      {
        first_name: 'Shino',
        middle_name: 'No.',
        last_name: 'Du'
      }
    ];
    const name = getParticipantsString(exampleNames);
    const expectString = `${exampleNames[0].first_name} ${exampleNames[0].middle_name} ${exampleNames[0].last_name}`
                          + ', '
                          + `${exampleNames[1].first_name} ${exampleNames[1].middle_name} ${exampleNames[1].last_name}`;
    expect(name).toEqual(expectString);
  });

  it('Return formate as expect if first name is empty but middle name and last name have value', () => {
    const exampleNames = [
      {
        first_name: '',
        middle_name: 'No.',
        last_name: 'Zhang'
      },
      {
        first_name: '',
        middle_name: 'No.',
        last_name: 'Du'
      }
    ];
    const name = getParticipantsString(exampleNames);
    const expectString = `${exampleNames[0].middle_name} ${exampleNames[0].last_name}`
                          + ', '
                          + `${exampleNames[1].middle_name} ${exampleNames[1].last_name}`;
    expect(name).toEqual(expectString);
  });

  it('Return formate as expect if middle name is empty but first name and last name have value', () => {
    const exampleNames = [
      {
        first_name: 'Nara',
        middle_name: '',
        last_name: 'Zhang'
      },
      {
        first_name: 'Shino',
        middle_name: '',
        last_name: 'Du'
      }
    ];
    const name = getParticipantsString(exampleNames);
    const expectString = `${exampleNames[0].first_name} ${exampleNames[0].last_name}`
                          + ', '
                          + `${exampleNames[1].first_name} ${exampleNames[1].last_name}`;
    expect(name).toEqual(expectString);
  });

  it('Return formate as expect if first name and middle name are empty but last name have value', () => {
    const exampleNames = [
      {
        first_name: '',
        middle_name: '',
        last_name: 'Zhang'
      },
      {
        first_name: '',
        middle_name: '',
        last_name: 'Du'
      }
    ];
    const name = getParticipantsString(exampleNames);
    const expectString = `${exampleNames[0].last_name}`
                          + ', '
                          + `${exampleNames[1].last_name}`;
    expect(name).toEqual(expectString);
  });

  it('Return formate as expect if last name is empty but first name and middle name have value', () => {
    const exampleNames = [
      {
        first_name: 'Nara',
        middle_name: 'No.',
        last_name: ''
      },
      {
        first_name: 'Shino',
        middle_name: 'No.',
        last_name: ''
      }
    ];
    const name = getParticipantsString(exampleNames);
    const expectString = `${exampleNames[0].first_name} ${exampleNames[0].middle_name}`
                          + ', '
                          + `${exampleNames[1].first_name} ${exampleNames[1].middle_name}`;
    expect(name).toEqual(expectString);
  });

  it('Return formate as expect if last name ,first name and middle name are all empty', () => {
    const exampleNames = [
      {
        first_name: '',
        middle_name: '',
        last_name: ''
      },
      {
        first_name: '',
        middle_name: '',
        last_name: ''
      }
    ];
    const name = getParticipantsString(exampleNames);
    const expectString = '';
    expect(name).toEqual(expectString);
  });
});
